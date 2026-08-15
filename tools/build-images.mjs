/**
 * Genererer AVIF- og WebP-varianter af sidens fotos i de bredder, slotsene
 * faktisk bruger. Originalfilerne røres ikke — de bliver liggende som
 * <img src>-fallback for browsere uden AVIF/WebP.
 *
 *   npm i sharp && node tools/build-images.mjs
 *
 * Kør scriptet igen, hvis der lægges nye fotos i assets/, og opdatér listen
 * herunder. Filnavnene er <navn>-<bredde>.<format> og bruges direkte i
 * srcset-attributterne i HTML'en.
 */
import { readFileSync, existsSync, statSync } from 'node:fs';
import { basename, extname, join } from 'node:path';
import sharp from 'sharp';

const DIR = new URL('../assets/', import.meta.url).pathname;

/* Bredder pr. billedslot — se sizes-attributterne i HTML'en. */
const PLAN = {
  'forside-studio.jpg': [768, 1200, 1600, 2000],
  'forloeb-trin.jpg': [768, 1200, 1600, 2000],
  'resultater-plade.jpg': [768, 1200, 1600, 2000],
  'smerter-udstyr.jpg': [768, 1200, 1600, 2000],
  'styrke-baren.jpg': [768, 1200, 1600, 2000],
  'viden-vaev.jpg': [768, 1200, 1600],
  'coaching-plan.jpg': [480, 760, 1120],
  'om-mike-fag.jpg': [480, 760, 1120],
  'smerter-led.jpg': [480, 760, 1120],
  'styrke-plader.jpg': [480, 760, 1120],
  'mike-portrait.webp': [340, 460, 680, 920],
  'mike-brand-portrait.webp': [430, 640, 860],
  'logo-badge.webp': [64, 128, 256],
  'logo-badge-large.webp': [300, 600],
};

let made = 0;
for (const [file, widths] of Object.entries(PLAN)) {
  const src = join(DIR, file);
  if (!existsSync(src)) {
    console.warn('mangler:', file);
    continue;
  }
  const stem = basename(file, extname(file));
  const input = readFileSync(src);
  const meta = await sharp(input).metadata();
  for (const w of widths) {
    if (w > meta.width) continue;
    const resized = () => sharp(input).resize({ width: w, withoutEnlargement: true });
    const avif = join(DIR, `${stem}-${w}.avif`);
    const webp = join(DIR, `${stem}-${w}.webp`);
    await resized().avif({ quality: 52, effort: 6 }).toFile(avif);
    await resized().webp({ quality: 78, effort: 6 }).toFile(webp);
    made += 2;
    console.log(
      `${stem}-${w}`.padEnd(30),
      'avif', (statSync(avif).size / 1024).toFixed(1) + 'K',
      'webp', (statSync(webp).size / 1024).toFixed(1) + 'K'
    );
  }
}
console.log(`\n${made} filer skrevet.`);
