/**
 * Pre-renderer alle sider.
 *
 * Siderne bygges af dc-runtimet i browseren. Det betyder, at et svar fra
 * serveren ellers kun indeholder <x-dc>-skabelonen: intet synligt indhold,
 * før 200 KB JavaScript er hentet, parset og kørt. Det koster både
 * indlæsningstid og gør indholdet usynligt for alt, der ikke kører
 * JavaScript.
 *
 * Her køres hver side én gang i Chromium, og den færdige DOM lægges ind i
 * filen som almindelig HTML i <div id="dc-prerender">. Browseren maler den
 * med det samme; når React er klar, overtager den, og reservekopien fjernes
 * af site.js.
 *
 *   python3 tools/build-meta.py     # <head> først
 *   node tools/prerender.mjs [http://127.0.0.1:8123]
 *
 * Kør igen, når sidernes indhold ændres. Scriptet er idempotent.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const BASE = (process.argv[2] || 'http://127.0.0.1:8123').replace(/\/$/, '');
const ROOT = fileURLToPath(new URL('..', import.meta.url));

const PAGES = [
  'index.html',
  'online-coaching.dc.html',
  'styrke-performance.dc.html',
  'smerter-genoptraening.dc.html',
  'forloeb.dc.html',
  'resultater.dc.html',
  'om-mike.dc.html',
  'viden.dc.html',
  'kontakt.dc.html',
  'privatliv.dc.html',
];

const MARK_START = '<div id="dc-prerender">';
const MARK_END = '</div><!--/dc-prerender-->';

const browser = await chromium.launch(
  process.env.PLAYWRIGHT_CHROMIUM ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM } : {}
);
/* reducedMotion slår site.js' reveal fra, så snapshottet ikke får
   opacity:0 bagt ind i style-attributterne. */
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  reducedMotion: 'reduce',
});

for (const file of PAGES) {
  const page = await ctx.newPage();
  await page.goto(`${BASE}/${file}`, { waitUntil: 'networkidle' });
  await page.waitForSelector('#dc-root main, #dc-root footer', { timeout: 20000 });

  /* Navigationen vælger mellem bred dok og burgermenu ud fra skærmbredden —
     en JavaScript-tilstand, en statisk fil ikke kan kende. Derfor hentes
     begge udgaver, og CSS vælger imellem dem (se _ds/…/components.css).
     Uden det ville en mobilbruger se den brede dok skåret af i højre side,
     indtil React nåede frem. */
  await page.setViewportSize({ width: 375, height: 812 });
  await page.waitForTimeout(900);
  const narrowHeader = await page.evaluate(() => {
    const h = document.querySelector('#dc-root header');
    return h ? h.outerHTML : '';
  });
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.waitForTimeout(900);

  const html = await page.evaluate((narrow) => {
    const root = document.getElementById('dc-root');
    const copy = root.cloneNode(true);

    const header = copy.querySelector('header');
    if (header && narrow) {
      const wide = document.createElement('div');
      wide.setAttribute('data-pre-wide', '');
      header.replaceWith(wide);
      wide.appendChild(header);

      const narrowBox = document.createElement('div');
      narrowBox.setAttribute('data-pre-narrow', '');
      narrowBox.innerHTML = narrow;
      wide.after(narrowBox);
    }

    /* Attributter, runtimet og animationslaget selv sætter, skal ikke med:
       ellers tror site.js, at reservekopien allerede er behandlet, og
       React ville arve fremmede data-attributter. */
    for (const el of copy.querySelectorAll('[data-ma-ready],[data-ma-kind]')) {
      el.removeAttribute('data-ma-ready');
      el.removeAttribute('data-ma-kind');
    }
    /* Reservekopien er ikke interaktiv. Felter og knapper tages ud af
       tabuleringsrækkefølgen, så tastaturet ikke lander i en død formular
       i det sekund, den er synlig. */
    for (const el of copy.querySelectorAll('input,textarea,select,button')) {
      el.setAttribute('tabindex', '-1');
    }
    return copy.innerHTML;
  }, narrowHeader);

  await page.close();

  const path = ROOT + file;
  let src = readFileSync(path, 'utf8');
  const block = `${MARK_START}${html}${MARK_END}\n`;

  const i = src.indexOf(MARK_START);
  if (i !== -1) {
    const j = src.indexOf(MARK_END, i) + MARK_END.length;
    src = src.slice(0, i) + block.trimEnd() + src.slice(j);
  } else {
    const at = src.indexOf('<x-dc');
    if (at === -1) throw new Error(`${file}: intet <x-dc>`);
    src = src.slice(0, at) + block + src.slice(at);
  }
  writeFileSync(path, src);
  console.log(`${file.padEnd(32)} ${(block.length / 1024).toFixed(0)} KB pre-renderet`);
}

await browser.close();
