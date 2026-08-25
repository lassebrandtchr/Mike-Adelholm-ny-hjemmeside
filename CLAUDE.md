# Mike Adelholm — hjemmeside

Statisk site udgivet med GitHub Pages fra repo-roden. Siderne bygges i browseren
af dc-runtimet (`support.js`) og leveres samtidig pre-renderet, så indholdet er
der uden JavaScript. Dansk site.

## Kommandoer
```bash
npm install                      # kun første gang
npx playwright install chromium  # kun første gang

npm run serve      # http://127.0.0.1:8123
npm run build      # = meta + prerender. SKAL køres efter enhver indholdsændring
npm test           # smoke-test hele sitet i Chromium
npm run images     # kun når der er nye filer i assets/
```

**Rækkefølgen i `build` betyder noget:** `build-meta.py` genopbygger `<head>` og
fjerner pre-renderen, `prerender.mjs` lægger den ind igen. Glemmer man `build`,
ligger den gamle udgave stadig i `<div id="dc-prerender">`.

## Hvad rettes hvor
| Skal ændres | Fil |
|---|---|
| E-mail, telefon, svartid, CVR, adresse, formularmodtager | `site-config.js` |
| Anmeldelser (kræver dateret samtykke) | `site-config.js` → `reviews` |
| Sidernes indhold | `<side>.dc.html`, mellem `<x-dc>` og `</x-dc>` |
| Nav, footer, anmeldelseskarrusel | `SiteNav.dc.html`, `SiteFooter.dc.html`, `ReviewCarousel.dc.html` |
| Titler, beskrivelser, canonical, domæne | `tools/build-meta.py` |
| Farver, skrift, afstande | `_ds/…/tokens/` |
| Fælles regler for fragmenter | `_ds/…/components.css` |

## Værktøjer i tools/
`build-meta.py` (head, tokens/bundle.css, sitemap.xml, robots.txt — idempotent) ·
`prerender.mjs` (Chromium → statisk DOM i filen) · `build-images.mjs` (AVIF/WebP) ·
`build-icons.mjs` · `build-picture.py` (`<img>` → `<picture>` med srcset) ·
`smoke-test.mjs` (konsol/netværksfejl, metadata, JSON-LD, døde links, formular
med mus og tastatur, no-JS, reduced-motion, 320-1920 px, kontrast, axe-core)

## Regler
- Anmeldelser må kun ligge i `site-config.js` med dateret samtykke.
- Manglende oplysninger står i `NEEDS_INPUT.md` — udfyld dem, opfind dem ikke.
- Eget domæne: ret `SITE_ORIGIN` og `BASE_PATH` i `tools/build-meta.py`, kør build.
- `.claude/`, `.impeccable/` og `deploy.command` er gitignored med vilje.

Repo: lassebrandtchr/Mike-Adelholm-ny-hjemmeside · Deploy: GitHub Pages fra roden
