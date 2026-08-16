/**
 * Bygger favicon, apple-touch-icon og delebillede (Open Graph) ud fra det
 * eksisterende logomærke. Ingen ny grafik opfindes — badge og farver er
 * sidens egne.
 *
 *   npm i sharp && node tools/build-icons.mjs
 */
import { readFileSync } from 'node:fs';
import sharp from 'sharp';

const DIR = new URL('../assets/', import.meta.url).pathname;
const badge = readFileSync(DIR + 'logo-badge.webp');

/* Faviconet vises oftest på en lys fane-baggrund; badgen har transparent
   baggrund, så den lægges på sidens sorte plade med lidt luft omkring. */
async function icon(size, out, pad) {
  const inner = Math.round(size * (1 - pad * 2));
  const logo = await sharp(badge).resize(inner, inner, { fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  await sharp({
    create: { width: size, height: size, channels: 4,
      background: { r: 8, g: 7, b: 6, alpha: 1 } },
  })
    .composite([{ input: logo, gravity: 'center' }])
    .png()
    .toFile(DIR + out);
  console.log(out, size + 'px');
}

await icon(32, 'favicon-32.png', 0.06);
await icon(192, 'favicon-192.png', 0.08);
await icon(180, 'apple-touch-icon.png', 0.1);

/* Delebillede 1200x630: sidens sorte baggrund med den samme bronzeglød som
   forsidens hero, og logomærket i midten. */
const OG_W = 1200, OG_H = 630;
const bg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${OG_W}" height="${OG_H}">
  <defs>
    <radialGradient id="glow" cx="50%" cy="34%" r="62%">
      <stop offset="0%" stop-color="#c47f47" stop-opacity="0.40"/>
      <stop offset="55%" stop-color="#8c5429" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#080706" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${OG_W}" height="${OG_H}" fill="#080706"/>
  <rect width="${OG_W}" height="${OG_H}" fill="url(#glow)"/>
  <rect x="0" y="0" width="${OG_W}" height="4" fill="#cf8a4f"/>
</svg>`);

const ogLogo = await sharp(badge).resize(360, 360, { fit: 'contain',
  background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();

await sharp(bg)
  .composite([{ input: ogLogo, top: Math.round((OG_H - 360) / 2), left: Math.round((OG_W - 360) / 2) }])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(DIR + 'og-image.jpg');
console.log('og-image.jpg', OG_W + 'x' + OG_H);
