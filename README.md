# Mike Adelholm — hjemmeside

Statisk site, udgivet med GitHub Pages fra roden af dette repo. Siderne bygges
i browseren af dc-runtimet (`support.js`), og hver side leveres samtidig
pre-renderet, så indholdet er der med det samme — også uden JavaScript.

## Hvad skal rettes hvor

| Skal ændres | Fil |
|---|---|
| E-mail, telefon, svartid, CVR, adresse, formularens modtager | `site-config.js` |
| Anmeldelser (kræver dateret samtykke) | `site-config.js` → `reviews` |
| Sidernes indhold | `<side>.dc.html` mellem `<x-dc>` og `</x-dc>` |
| Navigation, footer, anmeldelseskarrusel | `SiteNav.dc.html`, `SiteFooter.dc.html`, `ReviewCarousel.dc.html` |
| Titler, beskrivelser, canonical, domæne | `tools/build-meta.py` |
| Farver, skrift, afstande | `_ds/…/tokens/` |
| Fælles regler for de importerede fragmenter | `_ds/…/components.css` |

Oplysninger, der mangler, før siden er færdig, står i **[NEEDS_INPUT.md](NEEDS_INPUT.md)**.

## Efter en ændring

```sh
npm install                      # kun første gang
npx playwright install chromium  # kun første gang

npm run serve &                  # http://127.0.0.1:8123
npm run build                    # skriver <head> og pre-renderer alle sider
npm test                         # kører hele sitet igennem i Chromium
```

`npm run build` skal køres, hver gang en sides indhold ændres — ellers ligger
den gamle udgave stadig i `<div id="dc-prerender">`. Rækkefølgen betyder
noget: `build-meta.py` genopbygger dokumenthovedet og fjerner pre-renderen,
`prerender.mjs` lægger den ind igen.

Billeder og ikoner genereres kun, når der kommer nye filer i `assets/`:

```sh
npm run images
```

## Værktøjer

- `tools/build-meta.py` — skriver det statiske `<head>`: titel, beskrivelse,
  canonical, Open Graph, favicons, JSON-LD, CSP. Samler også token-CSS til
  `tokens/bundle.css` og skriver `sitemap.xml` og `robots.txt`. Idempotent.
- `tools/prerender.mjs` — kører hver side i Chromium og lægger den færdige DOM
  ind i filen som statisk HTML. `site.js` fjerner den igen, når React overtager.
- `tools/build-images.mjs` — AVIF/WebP i de bredder, slotsene bruger.
- `tools/build-icons.mjs` — favicon, apple-touch-icon og delebillede.
- `tools/build-picture.py` — pakker `<img>` ind i `<picture>` med `srcset`/`sizes`.
- `tools/smoke-test.mjs` — crawler alle sider i en rigtig browser: konsol- og
  netværksfejl, metadata, JSON-LD, døde links, skabelontekst, kontaktformularen
  (mus og tastatur), pre-render uden JavaScript, `prefers-reduced-motion`,
  responsivt layout fra 320 til 1920 px, kontrast og axe-core.

## Skifte til eget domæne

Ret `SITE_ORIGIN` og `BASE_PATH` i `tools/build-meta.py`, kør `npm run build`.
Canonical, Open Graph og `sitemap.xml` følger med.
