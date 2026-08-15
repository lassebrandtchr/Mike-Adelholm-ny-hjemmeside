#!/usr/bin/env python3
"""Skriver det statiske <head> i alle sider.

Siderne renderes af dc-runtimet i browseren. Tidligere lå titel, beskrivelse
og stylesheets inde i <helmet> og blev først sat på plads, når React var
hentet og kørt — det betød dels ingen metadata for crawlere, dels en
render-blokerende kæde HTML → support.js → React → CSS → skrift.

Derfor genereres <head> her i stedet, som almindelig statisk HTML. Scriptet er
idempotent: kør det igen, når SITE_ORIGIN, titler eller beskrivelser skal
ændres.

    python3 tools/build-meta.py
"""
from __future__ import annotations

import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# Skiftes der til eget domæne, rettes kun denne linje — canonical, Open Graph
# og sitemap.xml følger med, når scriptet køres igen.
SITE_ORIGIN = "https://lassebrandtchr.github.io"
BASE_PATH = "/Mike-Adelholm-ny-hjemmeside/"
BASE_URL = SITE_ORIGIN + BASE_PATH

SITE_NAME = "Mike Adelholm"
DS = "_ds/mike-adelholm-design-system-675d4354-f3e6-4d20-81c6-e6bff42594f8"
OG_IMAGE = "assets/og-image.jpg"
OG_IMAGE_ALT = "Mike Adelholm — fysioterapi og online coaching"

TOKEN_CSS = [
    "tokens/fonts.css",
    "tokens/colors.css",
    "tokens/typography.css",
    "tokens/spacing.css",
    "tokens/radius.css",
    "tokens/elevation.css",
    "tokens/motion.css",
    "tokens/shadows.css",
    "tokens/base.css",
]

PRELOAD_FONTS = [
    f"{DS}/assets/fonts/Archivo-latin.woff2",
    f"{DS}/assets/fonts/HankenGrotesk-latin.woff2",
]

# Kun samme-origin-ressourcer indlæses. 'unsafe-eval' er nødvendig, fordi
# dc-runtimet i support.js kompilerer sidernes <script type="text/x-dc"> med
# new Function; 'unsafe-inline' for style, fordi hele designet er skrevet med
# style-attributter og :hover-regler, runtimet injicerer som <style>.
CSP = (
    "default-src 'self'; "
    "script-src 'self' 'unsafe-eval'; "
    "style-src 'self' 'unsafe-inline'; "
    "img-src 'self' data:; "
    "font-src 'self'; "
    "connect-src 'self' https:; "
    "form-action 'self'; "
    "frame-src 'none'; "
    "object-src 'none'; "
    "base-uri 'self'"
)

# ── Sider ────────────────────────────────────────────────────────────────────
# slug: URL-stien relativt til BASE_URL. nav: navn i brødkrummer og fallback.
PAGES = {
    "index.html": dict(
        slug="",
        nav="Forside",
        title="Mike Adelholm — bliv stærkere, bevæg dig friere | Online fysioterapi & coaching",
        desc="Online coaching og fysioterapeutisk vejledning i samme forløb. Byg styrke, "
             "få færre begrænsninger og skab fremdrift, der holder. Book en samtale.",
        priority="1.0",
    ),
    "online-coaching.dc.html": dict(
        slug="online-coaching.dc.html",
        nav="Online coaching",
        title="Online coaching — individuel plan og opfølgning | Mike Adelholm",
        desc="Online coaching med individuel plan, check-ins, progression og løbende "
             "tilpasning. Fysioterapeutisk vejledning og træning fra samme person.",
        service="Online coaching",
        priority="0.9",
    ),
    "styrke-performance.dc.html": dict(
        slug="styrke-performance.dc.html",
        nav="Styrke & performance",
        title="Styrke & performance — byg styrke, der holder | Mike Adelholm",
        desc="Holdbar styrke, teknik, kapacitet og tillid til egen krop. Forstå progressiv "
             "overbelastning, dosering, restitution og konsistens — og kom tilbage til din sport.",
        service="Styrke og performance",
        priority="0.9",
    ),
    "smerter-genoptraening.dc.html": dict(
        slug="smerter-genoptraening.dc.html",
        nav="Smerter & genoptræning",
        title="Smerter & genoptræning — tilbage til træning i roligt tempo | Mike Adelholm",
        desc="Smerter under træning, tilbagevendende gener eller usikkerhed om belastning? "
             "Rolig, fysioterapeutisk vejledning og gradueret træning tilbage mod dit niveau.",
        service="Smerter og genoptræning",
        priority="0.9",
        reviewed="2026-08-15",
    ),
    "forloeb.dc.html": dict(
        slug="forloeb.dc.html",
        nav="Sådan foregår et forløb",
        title="Sådan foregår et forløb — fire trin fra spørgsmål til plan | Mike Adelholm",
        desc="Sådan kommer du i gang: du svarer på et par spørgsmål, jeg læser dine svar, "
             "vi tager en samtale, og du får en klar vej frem.",
        priority="0.8",
    ),
    "resultater.dc.html": dict(
        slug="resultater.dc.html",
        nav="Resultater",
        title="Resultater — hvad du kan forvente, og hvad jeg ikke lover | Mike Adelholm",
        desc="Hvad vi følger i et forløb, og hvorfor der hverken står anmeldelser eller "
             "før-og-efter-tal på siden, før de er godkendt af dem, det handler om.",
        priority="0.7",
    ),
    "om-mike.dc.html": dict(
        slug="om-mike.dc.html",
        nav="Om Mike",
        title="Om Mike — fysioterapeut og online coach | Mike Adelholm",
        desc="Tilgang og hvad du kan forvente af mig som fysioterapeut og coach. Én person "
             "hele vejen, faglighed uden fagsprog og ærlighed om, hvad der kan loves.",
        priority="0.8",
    ),
    "viden.dc.html": dict(
        slug="viden.dc.html",
        nav="Viden",
        title="Viden — smerte, belastning og træning forklaret enkelt | Mike Adelholm",
        desc="Korte, brugbare forklaringer om smerte, belastning, restitution og progression. "
             "Skrevet i almindeligt dansk, uden fagsprog og uden løfter.",
        reviewed="2026-08-15",
        priority="0.6",
    ),
    "kontakt.dc.html": dict(
        slug="kontakt.dc.html",
        nav="Kontakt",
        title="Book en samtale | Mike Adelholm",
        desc="Svar på et par spørgsmål om, hvad du gerne vil have hjælp til. Så vender jeg "
             "tilbage, og vi finder ud af, om et forløb er det rigtige næste skridt for dig.",
        priority="0.9",
    ),
    "privatliv.dc.html": dict(
        slug="privatliv.dc.html",
        nav="Privatlivspolitik",
        title="Privatlivspolitik | Mike Adelholm",
        desc="Hvordan oplysninger om dig behandles, hvor længe de gemmes, og hvilke "
             "rettigheder du har.",
        priority="0.3",
    ),
}

# Implementeringsfragmenter. De hentes af dc-runtimet med fetch() og skal derfor
# blive liggende som offentlige filer, men de er ikke sider og må ikke indekseres.
FRAGMENTS = {
    "SiteNav.dc.html": "Sidenavigation (fragment)",
    "SiteFooter.dc.html": "Sidefod (fragment)",
    "ReviewCarousel.dc.html": "Anmeldelseskarrusel (fragment)",
}

NAV_ORDER = [
    "online-coaching.dc.html",
    "styrke-performance.dc.html",
    "smerter-genoptraening.dc.html",
    "forloeb.dc.html",
    "resultater.dc.html",
    "om-mike.dc.html",
    "viden.dc.html",
    "kontakt.dc.html",
]


def esc(s: str) -> str:
    return html.escape(s, quote=True)


def page_url(slug: str) -> str:
    return BASE_URL + slug


def jsonld(page: str, meta: dict) -> list[dict]:
    """Kun påstande, der også står synligt på siden, markeres op."""
    provider = {
        "@type": "ProfessionalService",
        "@id": BASE_URL + "#virksomhed",
        "name": SITE_NAME,
        "url": BASE_URL,
        "image": BASE_URL + OG_IMAGE,
        "logo": BASE_URL + "assets/logo-badge.webp",
        "description": "Online coaching og fysioterapeutisk vejledning i samme forløb.",
        "founder": {"@id": BASE_URL + "#mike"},
        "availableLanguage": "da",
    }
    person = {
        "@type": "Person",
        "@id": BASE_URL + "#mike",
        "name": "Mike Adelholm",
        "url": BASE_URL + "om-mike.dc.html",
        "image": BASE_URL + "assets/mike-brand-portrait.webp",
        "jobTitle": "Fysioterapeut og online coach",
        "worksFor": {"@id": BASE_URL + "#virksomhed"},
    }

    blocks: list[dict] = []
    if page == "index.html":
        blocks.append({
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "WebSite",
                    "@id": BASE_URL + "#website",
                    "url": BASE_URL,
                    "name": SITE_NAME,
                    "inLanguage": "da-DK",
                    "publisher": {"@id": BASE_URL + "#virksomhed"},
                },
                provider,
                person,
            ],
        })
    else:
        crumbs = [
            {"@type": "ListItem", "position": 1, "name": "Forside", "item": BASE_URL},
            {"@type": "ListItem", "position": 2, "name": meta["nav"],
             "item": page_url(meta["slug"])},
        ]
        graph: list[dict] = [{
            "@type": "BreadcrumbList",
            "@id": page_url(meta["slug"]) + "#brodkrumme",
            "itemListElement": crumbs,
        }]
        if meta.get("service"):
            graph.append({
                "@type": "Service",
                "@id": page_url(meta["slug"]) + "#ydelse",
                "name": meta["service"],
                "serviceType": meta["service"],
                "description": meta["desc"],
                "url": page_url(meta["slug"]),
                "provider": {"@id": BASE_URL + "#virksomhed"},
                "availableChannel": {
                    "@type": "ServiceChannel",
                    "serviceUrl": page_url("kontakt.dc.html"),
                    "availableLanguage": "da",
                },
            })
        if page == "om-mike.dc.html":
            graph.append(person)
        # Sundhedsfagligt indhold: kun de oplysninger, der også står synligt på
        # siden — forfatter og dato for seneste gennemgang. Der markeres
        # bevidst ingen reviewedBy og ingen citations op, før de findes.
        if meta.get("reviewed"):
            graph.append({
                "@type": "Article",
                "@id": page_url(meta["slug"]) + "#artikel",
                "headline": meta["nav"],
                "description": meta["desc"],
                "url": page_url(meta["slug"]),
                "inLanguage": "da-DK",
                "author": {"@id": BASE_URL + "#mike"},
                "publisher": {"@id": BASE_URL + "#virksomhed"},
                "dateModified": meta["reviewed"],
                "isAccessibleForFree": True,
            })
            graph.append(person)
        blocks.append({"@context": "https://schema.org", "@graph": graph})
    return blocks


def build_head(page: str, meta: dict, page_style: str) -> str:
    url = page_url(meta["slug"])
    title, desc = meta["title"], meta["desc"]
    lines = [
        '<meta charset="utf-8">',
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
        f'<meta http-equiv="Content-Security-Policy" content="{esc(CSP)}">',
        f"<title>{esc(title)}</title>",
        f'<meta name="description" content="{esc(desc)}">',
        f'<link rel="canonical" href="{esc(url)}">',
        '<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">',
        '<meta name="theme-color" content="#080706">',
        '<meta name="color-scheme" content="dark">',
        "",
        '<meta property="og:type" content="website">',
        f'<meta property="og:site_name" content="{esc(SITE_NAME)}">',
        '<meta property="og:locale" content="da_DK">',
        f'<meta property="og:title" content="{esc(title)}">',
        f'<meta property="og:description" content="{esc(desc)}">',
        f'<meta property="og:url" content="{esc(url)}">',
        f'<meta property="og:image" content="{esc(BASE_URL + OG_IMAGE)}">',
        '<meta property="og:image:width" content="1200">',
        '<meta property="og:image:height" content="630">',
        f'<meta property="og:image:alt" content="{esc(OG_IMAGE_ALT)}">',
        '<meta name="twitter:card" content="summary_large_image">',
        f'<meta name="twitter:title" content="{esc(title)}">',
        f'<meta name="twitter:description" content="{esc(desc)}">',
        f'<meta name="twitter:image" content="{esc(BASE_URL + OG_IMAGE)}">',
        f'<meta name="twitter:image:alt" content="{esc(OG_IMAGE_ALT)}">',
        "",
        '<link rel="icon" href="assets/favicon-32.png" sizes="32x32" type="image/png">',
        '<link rel="icon" href="assets/favicon-192.png" sizes="192x192" type="image/png">',
        '<link rel="apple-touch-icon" href="assets/apple-touch-icon.png">',
        "",
    ]
    for f in PRELOAD_FONTS:
        lines.append(f'<link rel="preload" href="{f}" as="font" type="font/woff2" crossorigin>')
    for c in TOKEN_CSS:
        lines.append(f'<link rel="stylesheet" href="{DS}/{c}">')
    lines += [
        "",
        "<!-- Rå skabelon skjules, indtil dc-runtimet har renderet. Uden JavaScript",
        "     vises reserveindholdet øverst i dokumentet i stedet. -->",
        "<style>x-dc{display:none}</style>",
    ]
    if page_style:
        lines.append(page_style.strip())
    lines += [
        "",
        "<!-- React hostes lokalt (samme filer som unpkg leverede, samme SRI-hash).",
        "     Alle fire scripts er defer: de hentes parallelt med CSS og køres i",
        "     rækkefølge, når dokumentet er parset. -->",
        '<script defer src="vendor/react-18.3.1.production.min.js"></script>',
        '<script defer src="vendor/react-dom-18.3.1.production.min.js"></script>',
        '<script defer src="site-config.js"></script>',
        '<script defer src="site.js"></script>',
        '<script defer src="support.js"></script>',
        "",
    ]
    for block in jsonld(page, meta):
        lines.append('<script type="application/ld+json">')
        lines.append(json.dumps(block, ensure_ascii=False, indent=2))
        lines.append("</script>")
    return "\n".join(lines)


def build_noscript(page: str) -> str:
    """Statisk navigation og næste skridt, når JavaScript ikke kører."""
    items = []
    for p in NAV_ORDER:
        if p == page:
            continue
        items.append(f'<li><a href="{PAGES[p]["slug"] or "./"}">{esc(PAGES[p]["nav"])}</a></li>')
    if page != "index.html":
        items.insert(0, '<li><a href="./">Forside</a></li>')
    nav = "\n      ".join(items)
    return f"""<noscript>
  <div style="font-family:'Hanken Grotesk',system-ui,sans-serif;background:#080706;color:#ede3d4;padding:32px 20px;">
    <div style="max-width:720px;margin:0 auto;">
      <p style="font-family:'Archivo',system-ui,sans-serif;font-weight:900;font-size:28px;text-transform:uppercase;margin:0 0 16px;color:#f3ead9;">{esc(SITE_NAME)}</p>
      <p style="margin:0 0 20px;line-height:1.65;color:#bcae99;">Siden bygges i browseren med JavaScript. Slå JavaScript til for at se den fulde side — indtil da kan du bruge linkene herunder.</p>
      <ul style="margin:0 0 24px;padding-left:20px;line-height:2;">
      {nav}
      </ul>
      <p style="margin:0;line-height:1.65;color:#8c7e6b;">Ved akutte, kraftige eller forværrede symptomer skal du kontakte egen læge, vagtlæge eller 112.</p>
    </div>
  </div>
</noscript>
"""


HELMET_RE = re.compile(r"[ \t]*<helmet>.*?</helmet>\n?", re.S)
STYLE_RE = re.compile(r"<style>.*?</style>", re.S)
# Sidens egen CSS mærkes, så den kan hentes uændret ud af et allerede
# genereret <head>. Tidligere blev den fundet ved at lede efter <style> i
# hovedet, hvilket brød sammen, så snart hovedet indeholdt andet markup.
PAGE_CSS_RE = re.compile(r"<style data-page-css>.*?</style>", re.S)


def rewrite(path: Path, page: str, meta: dict, fragment: bool) -> None:
    """Bygger dokumentet op igen: fast skelet + genereret <head> + alt fra
    <x-dc> og ned, som er sidens eget indhold. Kun hovedet ejes af dette
    script; kroppen røres ikke."""
    src = path.read_text(encoding="utf-8")

    # Sidens egen CSS: mærket blok hvis den findes, ellers fra <helmet>
    # (første kørsel), ellers fra tools/page-styles/ (nødspor).
    marked = PAGE_CSS_RE.search(src)
    if marked:
        page_css = marked.group(0)[len("<style data-page-css>"):-len("</style>")]
    else:
        helmet = HELMET_RE.search(src)
        if helmet:
            page_css = "\n".join(
                st[len("<style>"):-len("</style>")] for st in STYLE_RE.findall(helmet.group(0))
            )
        else:
            fallback = ROOT / "tools" / "page-styles" / (page + ".css")
            page_css = fallback.read_text(encoding="utf-8") if fallback.exists() else ""

    page_style = f"<style data-page-css>{page_css.rstrip()}\n</style>" if page_css.strip() else ""

    i = src.find("<x-dc")
    if i == -1:
        raise SystemExit(f"{path.name}: intet <x-dc> — filen kan ikke genopbygges")
    body = src[i:]

    if fragment:
        new_head = (
            '<meta charset="utf-8">\n'
            '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
            "<!-- Implementeringsfragment, ikke en side: hentes af dc-runtimet og må\n"
            "     ikke indekseres. Står derfor heller ikke i sitemap.xml. -->\n"
            '<meta name="robots" content="noindex,nofollow">\n'
            f"<title>{esc(FRAGMENTS[page])}</title>\n"
            + "\n".join(f'<link rel="stylesheet" href="{DS}/{c}">' for c in TOKEN_CSS)
            + "\n<style>x-dc{display:none}</style>\n"
            + (page_style + "\n" if page_style else "")
            + '<script defer src="vendor/react-18.3.1.production.min.js"></script>\n'
              '<script defer src="vendor/react-dom-18.3.1.production.min.js"></script>\n'
              '<script defer src="site-config.js"></script>\n'
              '<script defer src="site.js"></script>\n'
              '<script defer src="support.js"></script>'
        )
        pre = ""
    else:
        new_head = build_head(page, meta, page_style)
        pre = build_noscript(page)

    path.write_text(
        "<!DOCTYPE html>\n"
        '<html lang="da">\n'
        "<head>\n" + new_head + "\n</head>\n"
        "<body>\n" + pre + body,
        encoding="utf-8",
    )


def build_sitemap() -> None:
    urls = []
    for meta in PAGES.values():
        urls.append(
            "  <url>\n"
            f"    <loc>{esc(page_url(meta['slug']))}</loc>\n"
            f"    <priority>{meta['priority']}</priority>\n"
            "  </url>"
        )
    xml = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">\n'
        + "\n".join(urls)
        + "\n</urlset>\n"
    ).replace("www.sitemap.org", "www.sitemaps.org")
    (ROOT / "sitemap.xml").write_text(xml, encoding="utf-8")


def build_robots() -> None:
    (ROOT / "robots.txt").write_text(
        "# Alle crawlere må hente og indeksere siden.\n"
        "User-agent: *\n"
        "Allow: /\n"
        "\n"
        "# Implementeringsfragmenter er ikke sider. De skal kunne hentes af\n"
        "# browseren, men hører ikke til i et søgeresultat.\n"
        "User-agent: *\n"
        "Disallow: /Mike-Adelholm-ny-hjemmeside/SiteNav.dc.html\n"
        "Disallow: /Mike-Adelholm-ny-hjemmeside/SiteFooter.dc.html\n"
        "Disallow: /Mike-Adelholm-ny-hjemmeside/ReviewCarousel.dc.html\n"
        "\n"
        "# Søge-agenter (Googlebot, OAI-SearchBot, Claude-SearchBot, PerplexityBot)\n"
        "# er bevidst ikke blokeret — de er forudsætningen for at blive fundet.\n"
        "#\n"
        "# Vil ejeren frameldes træning af sprogmodeller, fjernes # herunder.\n"
        "# Det påvirker ikke søgning.\n"
        "# User-agent: GPTBot\n"
        "# Disallow: /\n"
        "# User-agent: ClaudeBot\n"
        "# Disallow: /\n"
        "# User-agent: Google-Extended\n"
        "# Disallow: /\n"
        "\n"
        f"Sitemap: {BASE_URL}sitemap.xml\n",
        encoding="utf-8",
    )


def main() -> None:
    for page, meta in PAGES.items():
        rewrite(ROOT / page, page, meta, fragment=False)
        print("head:", page)
    for page in FRAGMENTS:
        rewrite(ROOT / page, page, {}, fragment=True)
        print("head:", page, "(noindex)")
    build_sitemap()
    build_robots()
    print("skrev sitemap.xml og robots.txt")


if __name__ == "__main__":
    main()
