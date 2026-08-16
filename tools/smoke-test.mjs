/**
 * Røgtest af hele sitet i en rigtig browser.
 *
 * Siden renderes af dc-runtimet i browseren, så en test der kun læser HTML-
 * filerne ser næsten ingenting. Derfor køres hver side i Chromium, og der
 * kontrolleres på den færdige DOM.
 *
 *   npm i playwright && npx playwright install chromium
 *   python3 -m http.server 8123 &
 *   node tools/smoke-test.mjs [http://127.0.0.1:8123]
 *
 * Exit 0 = alt grønt. Exit 1 = mindst én fejl.
 */
import { chromium } from 'playwright';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';

/* axe-core er valgfri. Er den installeret, køres den også. */
let AXE = null;
try {
  AXE = readFileSync(createRequire(import.meta.url).resolve('axe-core/axe.min.js'), 'utf8');
} catch { /* springes over */ }

const BASE = (process.argv[2] || 'http://127.0.0.1:8123').replace(/\/$/, '');

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
const FRAGMENTS = ['SiteNav.dc.html', 'SiteFooter.dc.html', 'ReviewCarousel.dc.html'];

/* Skabelontekst, der aldrig må nå produktion. */
const PLACEHOLDER = /\[\s*inds[æa]t[^\]]*\]|\{\{|\bTODO\b|\blorem ipsum\b/i;

const failures = [];
const notes = [];
const fail = (page, msg) => failures.push(`${page}: ${msg}`);

/* PLAYWRIGHT_CHROMIUM sættes, hvis miljøet har en forudinstalleret browser,
   der ikke matcher playwright-pakkens egen build. */
const browser = await chromium.launch(
  process.env.PLAYWRIGHT_CHROMIUM ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM } : {}
);

async function load(ctx, path) {
  const page = await ctx.newPage();
  const consoleErrors = [];
  const netErrors = [];
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning') consoleErrors.push(`${m.type()}: ${m.text()}`);
  });
  page.on('pageerror', (e) => consoleErrors.push('pageerror: ' + e.message));
  page.on('requestfailed', (r) => netErrors.push(`${r.url()} ${r.failure()?.errorText}`));
  page.on('response', (r) => {
    if (r.status() >= 400) netErrors.push(`${r.url()} -> ${r.status()}`);
  });
  const resp = await page.goto(`${BASE}/${path}`, { waitUntil: 'networkidle' });
  return { page, consoleErrors, netErrors, status: resp?.status() };
}

/* ── 1. Hver side: rendering, konsol, netværk, skabelontekst, overskrifter ── */
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const internalTargets = new Set();

for (const path of PAGES) {
  const { page, consoleErrors, netErrors, status } = await load(ctx, path);
  if (status !== 200) fail(path, `HTTP ${status}`);

  await page.waitForSelector('#dc-root main, #dc-root footer', { timeout: 15000 })
    .catch(() => fail(path, 'dc-runtimet renderede ikke (#dc-root uden indhold)'));

  for (const e of consoleErrors) fail(path, 'konsol ' + e);
  for (const e of netErrors) fail(path, 'netværk ' + e);

  const lang = await page.getAttribute('html', 'lang');
  if (lang !== 'da') fail(path, `html lang="${lang}" (forventet "da")`);

  const title = await page.title();
  if (!title || title.length < 10) fail(path, 'titel mangler');

  const canonical = await page.getAttribute('link[rel=canonical]', 'href').catch(() => null);
  if (!canonical) fail(path, 'canonical mangler');

  const nCanonical = await page.locator('link[rel=canonical]').count();
  if (nCanonical !== 1) fail(path, `${nCanonical} canonical-tags`);

  const nTitle = await page.locator('head title').count();
  if (nTitle !== 1) fail(path, `${nTitle} <title>-tags`);

  const nDesc = await page.locator('head meta[name=description]').count();
  if (nDesc !== 1) fail(path, `${nDesc} beskrivelses-tags`);

  for (const sel of ['meta[property="og:title"]', 'meta[property="og:image"]',
    'meta[name="twitter:card"]', 'link[rel="icon"]', 'link[rel="apple-touch-icon"]']) {
    if (await page.locator(`head ${sel}`).count() === 0) fail(path, `${sel} mangler`);
  }

  const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
  if (!ld.length) fail(path, 'ingen JSON-LD');
  for (const block of ld) {
    try { JSON.parse(block); } catch (e) { fail(path, 'ugyldig JSON-LD: ' + e.message); }
  }

  const text = await page.locator('body').innerText();
  const hit = text.match(PLACEHOLDER);
  if (hit) fail(path, `skabelontekst i DOM: "${hit[0]}"`);

  const h1 = await page.locator('#dc-root h1').count();
  if (h1 !== 1) fail(path, `${h1} <h1> (forventet 1)`);

  /* Overskriftsniveauer må ikke springe. */
  const levels = await page.$$eval('#dc-root h1,#dc-root h2,#dc-root h3,#dc-root h4',
    (els) => els.map((e) => Number(e.tagName[1])));
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] - levels[i - 1] > 1) {
      fail(path, `overskriftsspring h${levels[i - 1]} → h${levels[i]}`);
      break;
    }
  }

  /* Billeder: alt-attribut skal findes (må gerne være tom for dekoration). */
  const missingAlt = await page.$$eval('#dc-root img',
    (els) => els.filter((e) => e.getAttribute('alt') === null).length);
  if (missingAlt) fail(path, `${missingAlt} <img> uden alt`);

  const brokenImg = await page.$$eval('#dc-root img',
    (els) => els.filter((e) => e.complete && e.naturalWidth === 0).map((e) => e.currentSrc || e.src));
  for (const b of brokenImg) fail(path, 'billede indlæste ikke: ' + b);

  /* Tomme eller døde links og knapper. */
  const badLinks = await page.$$eval('#dc-root a', (els) => els
    .map((e) => ({ href: e.getAttribute('href'), text: e.innerText.trim() }))
    .filter((l) => !l.href || l.href === '#' || /^(mailto:|tel:)\s*$/.test(l.href)));
  for (const l of badLinks) fail(path, `tomt link "${l.text}"`);

  const links = await page.$$eval('#dc-root a[href]', (els) => els.map((e) => e.href));
  for (const l of links) {
    if (l.startsWith(BASE)) internalTargets.add(l.split('#')[0]);
  }

  await page.close();
}

/* ── 2. Interne links skal svare 200 ── */
{
  const page = await ctx.newPage();
  for (const url of internalTargets) {
    const r = await page.request.get(url);
    if (!r.ok()) fail('interne links', `${url} -> ${r.status()}`);
  }
  await page.close();
}

/* ── 3. Fragmenter må ikke indekseres ── */
for (const path of FRAGMENTS) {
  const page = await ctx.newPage();
  const r = await page.goto(`${BASE}/${path}`);
  if (r.status() !== 200) fail(path, `HTTP ${r.status()} — dc-runtimet skal kunne hente den`);
  const robots = await page.getAttribute('meta[name=robots]', 'content').catch(() => null);
  if (!robots || !robots.includes('noindex')) fail(path, 'mangler noindex');
  await page.close();
}

/* ── 4. robots.txt og sitemap.xml ── */
{
  const page = await ctx.newPage();
  const robots = await page.request.get(`${BASE}/robots.txt`);
  if (!robots.ok()) fail('robots.txt', `HTTP ${robots.status()}`);
  else if (!(await robots.text()).includes('Sitemap:')) fail('robots.txt', 'ingen Sitemap-linje');

  const sm = await page.request.get(`${BASE}/sitemap.xml`);
  if (!sm.ok()) fail('sitemap.xml', `HTTP ${sm.status()}`);
  else {
    const xml = await sm.text();
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    if (locs.length !== PAGES.length) fail('sitemap.xml', `${locs.length} URL'er (forventet ${PAGES.length})`);
    for (const f of FRAGMENTS) {
      if (locs.some((l) => l.endsWith(f))) fail('sitemap.xml', `fragment med: ${f}`);
    }
  }
  await page.close();
}

/* ── 5. Kontaktformularen: alle trin, validering og fejltilstand ── */
try {
  const { page, consoleErrors } = await load(ctx, 'kontakt.dc.html');
  await page.waitForSelector('form');

  await page.getByRole('button', { name: /videre/i }).click();
  if (!(await page.locator('[role=alert]').isVisible())) fail('kontakt', 'trin 1 uden valg gav ingen fejl');

  await page.getByRole('radio', { name: /blive stærkere/i }).check();
  const send = () => page.getByRole('button', { name: /videre|send|saml/i }).click();
  await send();

  /* Symptom-fritekst findes kun, når der er et HTTPS-endepunkt at sende den
     til. Er der ikke, må feltet ikke være der overhovedet. */
  const hasSituation = await page.locator('#situation').count() > 0;
  const endpoint = await page.evaluate(() => ((window.MA_SITE || {}).contact || {}).formEndpoint || '');
  if (hasSituation && !endpoint) fail('kontakt', 'symptomfelt vises uden sikkert endepunkt');
  if (hasSituation) await page.locator('#situation').fill('Jeg har ondt i skulderen, når jeg presser over hovedet.');
  await page.locator('#maal').fill('Træne fire gange om ugen igen.');
  await send();

  await send();
  if (!(await page.locator('[role=alert]').isVisible())) fail('kontakt', 'tomt navn gav ingen fejl');
  if (!(await page.locator('#navn').evaluate((e) => e === document.activeElement))) {
    fail('kontakt', 'fokus blev ikke flyttet til det manglende felt');
  }
  if (await page.locator('#navn').getAttribute('aria-invalid') !== 'true') {
    fail('kontakt', 'aria-invalid blev ikke sat på det manglende felt');
  }

  await page.locator('#navn').fill('Testperson');
  await page.locator('#email').fill('ikke-en-mail');
  await send();
  if (!(await page.locator('[role=alert]').isVisible())) fail('kontakt', 'ugyldig e-mail gav ingen fejl');

  await page.locator('#email').fill('test@eksempel.dk');
  await send();
  if (!(await page.locator('[role=alert]').isVisible())) fail('kontakt', 'manglende samtykke gav ingen fejl');

  await page.locator('#samtykke').check();
  await send();
  await page.waitForTimeout(600);

  const body = await page.locator('body').innerText();
  if (!endpoint && /er sendt|har modtaget dine svar/i.test(body)) {
    fail('kontakt', 'meldte "sendt" uden konfigureret modtager');
  }
  if (!/dine svar/i.test(body)) fail('kontakt', 'sidste trin viste ingen opsamling');

  /* Ingen personoplysninger må ligge i en URL. */
  const hrefs = await page.$$eval('#dc-root a[href]', (els) => els.map((e) => e.getAttribute('href')));
  for (const h of hrefs) {
    if (/test@eksempel\.dk|Testperson|skulderen|Træne fire/i.test(decodeURIComponent(h || ''))) {
      fail('kontakt', 'personoplysninger lagt i en URL: ' + h.slice(0, 80));
    }
  }
  for (const e of consoleErrors) fail('kontakt-flow', 'konsol ' + e);
  await page.close();
} catch (e) {
  fail('kontakt', 'flowet kunne ikke gennemføres: ' + e.message.split('\n')[0]);
}

/* ── 5b. Kontaktformularen med tastatur alene ── */
try {
  const { page } = await load(ctx, 'kontakt.dc.html');
  await page.waitForSelector('form');
  await page.locator('#fokus-staerkere').focus();
  await page.keyboard.press('ArrowDown');
  const picked = await page.evaluate(() =>
    document.querySelector('input[name="fokus"]:checked')?.value || '');
  if (!picked) fail('kontakt/tastatur', 'piletast valgte ingen radioknap');

  /* Enter i formularen skal sende — ikke bare gøre ingenting. */
  await page.keyboard.press('Enter');
  await page.waitForTimeout(400);
  const step2 = await page.locator('#maal').count();
  if (!step2) fail('kontakt/tastatur', 'Enter gik ikke videre til næste trin');
  await page.close();
} catch (e) {
  fail('kontakt/tastatur', e.message.split('\n')[0]);
}

/* ── 5c. Pre-render: indhold og navigation uden JavaScript ── */
for (const [path, w] of [['index.html', 1280], ['index.html', 375], ['index.html', 320],
  ['kontakt.dc.html', 375], ['viden.dc.html', 1280]]) {
  const c = await browser.newContext({ javaScriptEnabled: false, viewport: { width: w, height: 900 } });
  const page = await c.newPage();
  await page.goto(`${BASE}/${path}`);
  const over = await page.evaluate(() =>
    document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (over > 1) fail(`${path} @${w} uden JS`, `vandret overløb ${over}px`);
  /* Kun én af navigationens to udgaver må være synlig ad gangen. */
  const navs = await page.$$eval('#dc-prerender header',
    (els) => els.filter((e) => e.getBoundingClientRect().width > 0).length);
  if (navs !== 1) fail(`${path} @${w} uden JS`, `${navs} synlige navigationer`);
  const text = await page.locator('body').innerText();
  if (text.trim().length < 800) fail(path, `kun ${text.trim().length} tegn uden JavaScript`);
  if (PLACEHOLDER.test(text)) fail(path, 'skabelontekst i pre-render');
  /* Kun det synlige tæller: <x-dc> med råskabelonen bliver i dokumentet,
     fordi dc-runtimet læser den derfra, men den er skjult med CSS. */
  if (await page.locator('#dc-prerender h1').count() !== 1) fail(path, 'pre-render mangler præcis ét h1');
  if (await page.locator('#dc-prerender a[href]').count() < 8) fail(path, 'pre-render mangler navigation');
  const raw = await page.locator('x-dc').evaluate((e) => getComputedStyle(e).display).catch(() => 'none');
  if (raw !== 'none') fail(path, 'råskabelonen er synlig uden JavaScript');
  await c.close();
}

/* ── 5d. prefers-reduced-motion: alt indhold skal stå fast og synligt ── */
{
  const c = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
  const page = await c.newPage();
  await page.goto(`${BASE}/index.html`, { waitUntil: 'networkidle' });
  await page.waitForSelector('#dc-root main');
  const hidden = await page.$$eval('#dc-root [data-reveal],#dc-root [data-grow]',
    (els) => els.filter((e) => Number(getComputedStyle(e).opacity) < 0.9).length);
  if (hidden) fail('reduced-motion', `${hidden} elementer står usynlige`);
  await c.close();
}

/* ── 5e. Mobilnavigationen skal kunne åbnes og lukkes ── */
{
  const c = await browser.newContext({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true });
  const page = await c.newPage();
  const errs = [];
  page.on('pageerror', (e) => errs.push(e.message));
  await page.goto(`${BASE}/index.html`, { waitUntil: 'networkidle' });
  await page.waitForSelector('#dc-root main');
  const closed = await page.locator('#dc-root a:visible').count();
  await page.locator('#dc-root header button').first().click();
  await page.waitForTimeout(500);
  const open = await page.locator('#dc-root a:visible').count();
  if (open <= closed) fail('mobilnav', 'burgermenuen åbnede ikke');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);
  if (await page.locator('#dc-root a:visible').count() !== closed) {
    fail('mobilnav', 'Escape lukkede ikke menuen igen');
  }
  for (const e of errs) fail('mobilnav', 'konsol ' + e);
  await c.close();
}

/* ── 5f. Anmeldelseskarrusellen med rigtige data ──────────────────────────
   Listen er tom i produktion, så koden bag ville ellers aldrig blive kørt.
   Her lægges tre anmeldelser ind — én bevidst meget lang — for at fange den
   fejl, auditten fandt: indhold, der faldt ud over kortets bund. */
{
  const c = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await c.addInitScript(() => {
    const fixture = [
      { quote: 'Kort udsagn nummer et.', name: 'A', context: 'Online coaching', consentDate: '2026-01-01' },
      { quote: 'Et markant længere udsagn, der fylder betydeligt mere plads end det første, netop for at se om kortene stadig kan rumme deres eget indhold uden at teksten falder ud over kanten af pladen.', name: 'B', context: 'Styrke & performance', consentDate: '2026-01-02' },
      { quote: 'Tredje udsagn.', name: 'C', context: 'Smerter', consentDate: '2026-01-03' },
    ];
    const iv = setInterval(() => {
      if (window.MA_SITE) { window.MA_SITE.reviews = fixture; clearInterval(iv); }
    }, 5);
  });
  const page = await c.newPage();
  const errs = [];
  page.on('pageerror', (e) => errs.push(e.message));
  await page.goto(`${BASE}/resultater.dc.html`, { waitUntil: 'networkidle' });
  await page.waitForSelector('#dc-root article[data-slide]', { timeout: 15000 })
    .catch(() => fail('karrusel', 'anmeldelserne blev ikke renderet'));
  await page.waitForTimeout(1200);
  if (await page.locator('#dc-root article[data-slide]').count() !== 3) {
    fail('karrusel', 'forkert antal anmeldelser');
  }
  for (const [w, h] of [[375, 812], [768, 1024], [1363, 936], [1920, 1080]]) {
    await page.setViewportSize({ width: w, height: h });
    await page.waitForTimeout(700);
    const over = await page.$$eval('#dc-root article[data-slide]', (cards) => {
      let worst = 0;
      for (const card of cards) {
        const bottom = card.getBoundingClientRect().bottom;
        for (const kid of card.children) {
          worst = Math.max(worst, kid.getBoundingClientRect().bottom - bottom);
        }
      }
      return Math.round(worst);
    });
    if (over > 1) fail('karrusel', `indhold stikker ${over}px ud af kortet @${w}`);
  }
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.locator('#dc-root [role=group]').first().focus();
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(500);
  const status = (await page.locator('#dc-root [aria-live=polite]').last().innerText()).toLowerCase();
  if (!/2 af 3/.test(status)) fail('karrusel', 'piletast skiftede ikke anmeldelse');
  for (const e of errs) fail('karrusel', 'konsol ' + e);
  await c.close();
}

/* ── 6. Responsivt: intet vandret overløb, ingen tekst uden for sit kort ── */
const SIZES = [[320, 640], [375, 812], [430, 932], [768, 1024], [1024, 768], [1440, 900], [1920, 1080]];
for (const [w, h] of SIZES) {
  const c = await browser.newContext({ viewport: { width: w, height: h } });
  for (const path of ['index.html', 'kontakt.dc.html', 'resultater.dc.html']) {
    const page = await c.newPage();
    await page.goto(`${BASE}/${path}`, { waitUntil: 'networkidle' });
    await page.waitForSelector('#dc-root main');
    const over = await page.evaluate(() =>
      document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (over > 1) fail(`${path} @${w}`, `vandret overløb ${over}px`);

    /* Berøringsmål på mindst 44px i bredde-under-tablet. */
    if (w < 768) {
      const small = await page.$$eval('#dc-root a, #dc-root button', (els) => els
        .filter((e) => {
          const r = e.getBoundingClientRect();
          return r.width > 0 && r.height > 0 && r.height < 24;
        }).length);
      if (small) notes.push(`${path} @${w}: ${small} klikmål under 24px høje`);
    }
    await page.close();
  }
  await c.close();
}

/* ── 7. Kontrast på almindelig tekst (WCAG 2.2 AA) ── */
{
  const page = await ctx.newPage();
  await page.goto(`${BASE}/index.html`, { waitUntil: 'networkidle' });
  await page.waitForSelector('#dc-root main');
  const bad = await page.evaluate(() => {
    const lum = (c) => {
      const [r, g, b] = c.map((v) => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    /* rgb()/rgba() → [r,g,b,a]. */
    const parse = (s) => {
      const n = (s.match(/[\d.]+/g) || []).map(Number);
      return n.length >= 3 ? [n[0], n[1], n[2], n.length > 3 ? n[3] : 1] : null;
    };
    /* Baggrunden lægges sammen lag for lag opad i træet, så halvgennemsigtige
       flader tælles med. Gradienter kan ikke evalueres — de elementer springes
       over og efterses i stedet manuelt. */
    const bgOf = (el) => {
      const layers = [];
      for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
        const cs = getComputedStyle(n);
        if (cs.backgroundImage && cs.backgroundImage !== 'none') return null;
        const p = parse(cs.backgroundColor);
        if (p && p[3] > 0) {
          layers.push(p);
          if (p[3] === 1) break;
        }
      }
      let base = [8, 7, 6];
      for (let i = layers.length - 1; i >= 0; i--) {
        const [r, g, b, a] = layers[i];
        base = [r * a + base[0] * (1 - a), g * a + base[1] * (1 - a), b * a + base[2] * (1 - a)];
      }
      return base;
    };
    const out = [];
    for (const el of document.querySelectorAll('#dc-root *')) {
      const t = [...el.childNodes].filter((n) => n.nodeType === 3 && n.textContent.trim()).length;
      if (!t) continue;
      const cs = getComputedStyle(el);
      if (cs.webkitTextFillColor === 'rgba(0, 0, 0, 0)' || cs.color === 'rgba(0, 0, 0, 0)') continue;
      const size = parseFloat(cs.fontSize);
      const bold = Number(cs.fontWeight) >= 700;
      const large = size >= 24 || (size >= 18.66 && bold);
      const fg = parse(cs.color);
      const bg = bgOf(el);
      if (!fg || !bg) continue;
      const l1 = lum(fg), l2 = lum(bg);
      const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
      const need = large ? 3 : 4.5;
      if (ratio + 0.01 < need) {
        const round = (c) => c.map((v) => Math.round(v)).join(',');
        out.push(`${cs.color} på rgb(${round(bg)}) = ${ratio.toFixed(2)}:1 (kræver ${need}) — "${el.textContent.trim().slice(0, 40)}"`);
      }
    }
    return [...new Set(out)];
  });
  for (const b of bad) fail('kontrast index.html', b);
  await page.close();
}

/* ── 8. axe-core, hvis den er installeret ── */
if (AXE) {
  const page = await ctx.newPage();
  for (const path of PAGES) {
    await page.goto(`${BASE}/${path}`, { waitUntil: 'networkidle' });
    await page.waitForSelector('#dc-root main, #dc-root footer');
    /* evaluate frem for addScriptTag: sidens CSP tillader ikke inline script. */
    await page.evaluate(AXE);
    const res = await page.evaluate(() => axe.run(document.getElementById('dc-root'), {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] },
    }));
    for (const v of res.violations) {
      fail(path, `axe ${v.id} (${v.impact}, ${v.nodes.length}): ${v.help}`);
    }
  }
  await page.close();
} else {
  notes.push('axe-core ikke installeret — tilgængelighedsreglerne blev ikke kørt');
}

await browser.close();

if (notes.length) {
  console.log('\nNoter:');
  for (const n of notes) console.log('  · ' + n);
}
if (failures.length) {
  console.error(`\n${failures.length} fejl:`);
  for (const f of failures) console.error('  ✗ ' + f);
  process.exit(1);
}
console.log(`\n✓ ${PAGES.length} sider, ${FRAGMENTS.length} fragmenter, ${internalTargets.size} interne links — alt grønt.`);
