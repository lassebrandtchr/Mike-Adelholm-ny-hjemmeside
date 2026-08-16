#!/usr/bin/env python3
"""Pakker sidens <img> ind i <picture> med AVIF- og WebP-varianter.

Varianterne laves af tools/build-images.mjs. Her sættes de ind i markup'en med
et sizes, der matcher det slot, billedet faktisk vises i — så browseren henter
en fil i den bredde, den skal bruge, og ikke en 2000 px original til et
560 px kort.

<picture> får display:contents, så det ikke lægger en ekstra boks ind i
layoutet: <img> bliver ved med at være det element, der positioneres, og alle
eksisterende style-attributter virker uændret.

Scriptet er idempotent — allerede indpakkede billeder springes over.

    python3 tools/build-picture.py
"""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

BAND = "100vw"
CARD = "(min-width:1180px) 560px, (min-width:760px) 46vw, 92vw"

# src → (bredder, sizes). Bredderne skal findes som filer i assets/.
PLAN = {
    "assets/forside-studio.jpg": ([768, 1200, 1600, 2000], BAND),
    "assets/forloeb-trin.jpg": ([768, 1200, 1600, 2000], BAND),
    "assets/resultater-plade.jpg": ([768, 1200, 1600, 2000], BAND),
    "assets/smerter-udstyr.jpg": ([768, 1200, 1600, 2000], BAND),
    "assets/styrke-baren.jpg": ([768, 1200, 1600, 2000], BAND),
    "assets/viden-vaev.jpg": ([768, 1200, 1600], BAND),
    "assets/coaching-plan.jpg": ([480, 760, 1120], CARD),
    "assets/om-mike-fag.jpg": ([480, 760, 1120], CARD),
    "assets/smerter-led.jpg": ([480, 760, 1120], CARD),
    "assets/styrke-plader.jpg": ([480, 760, 1120], CARD),
    "assets/mike-brand-portrait.webp": ([430, 640, 860], "(min-width:560px) 430px, 86vw"),
    "assets/logo-badge-large.webp": ([300, 600], "(max-width:730px) 190px, (min-width:1155px) 300px, 26vw"),
}

# Samme fil optræder i flere slots med vidt forskellig visningsstørrelse.
# Nøglen er en entydig stump af selve img-tagget.
BY_CONTEXT = {
    # EmCare-mærket optræder i to størrelser: et bånd på forsiden og et lille
    # mærke i sidefoden.
    "assets/emcare-sundhed.webp": [
        ("width=\"150\"", [180, 300], "150px"),
        (None, [180, 300, 520], "(max-width:700px) 200px, (min-width:1000px) 260px, 26vw"),
    ],
    "assets/mike-portrait.webp": [
        # Forsidens hero: kortet er højst 460 px bredt.
        ("fetchpriority=\"high\"", [340, 460, 680, 920],
         "(min-width:1180px) 460px, (min-width:760px) 42vw, 92vw"),
        # Rundt portræt i "Om Mike"-sektionen: min(340px, 80vw).
        (None, [340, 460, 680], "(min-width:440px) 340px, 80vw"),
    ],
    "assets/logo-badge.webp": [
        ("width=\"36\"", [64, 128], "36px"),
        ("width=\"44\"", [64, 128], "44px"),
        ("width=\"58\"", [64, 128], "58px"),
        ("width=\"60\"", [64, 128], "60px"),
        (None, [64, 128, 256], "60px"),
    ],
}

IMG_RE = re.compile(r"<img\b[^>]*?>", re.I)
SRC_RE = re.compile(r'src="([^"]+)"')


def srcset(stem: str, ext: str, widths: list[int]) -> str:
    return ", ".join(f"assets/{stem}-{w}.{ext} {w}w" for w in widths)


def plan_for(src: str, tag: str):
    if src in PLAN:
        return PLAN[src]
    for marker, widths, sizes in BY_CONTEXT.get(src, []):
        if marker is None or marker in tag:
            return widths, sizes
    return None


def wrap(html: str) -> tuple[str, int]:
    count = 0

    def repl(m: re.Match) -> str:
        nonlocal count
        tag = m.group(0)
        src_m = SRC_RE.search(tag)
        if not src_m:
            return tag
        src = src_m.group(1)
        found = plan_for(src, tag)
        if not found:
            return tag
        widths, sizes = found
        stem = src.rsplit("/", 1)[-1].rsplit(".", 1)[0]
        widths = [w for w in widths if (ROOT / f"assets/{stem}-{w}.avif").exists()]
        if not widths:
            return tag
        count += 1
        new_tag = tag[:-1].rstrip() + f' sizes="{sizes}">'
        return (
            '<picture style="display:contents">'
            f'<source type="image/avif" sizes="{sizes}" srcset="{srcset(stem, "avif", widths)}">'
            f'<source type="image/webp" sizes="{sizes}" srcset="{srcset(stem, "webp", widths)}">'
            f"{new_tag}</picture>"
        )

    # Spring billeder over, der allerede ligger i en <picture>.
    parts = re.split(r"(<picture\b.*?</picture>)", html, flags=re.S | re.I)
    for i, part in enumerate(parts):
        if i % 2 == 0:
            parts[i] = IMG_RE.sub(repl, part)
    return "".join(parts), count


def main() -> None:
    total = 0
    for path in sorted(ROOT.glob("*.html")):
        html = path.read_text(encoding="utf-8")
        new, n = wrap(html)
        if n:
            path.write_text(new, encoding="utf-8")
            print(f"{path.name}: {n} billeder")
            total += n
    print(f"{total} <img> pakket ind i <picture>.")


if __name__ == "__main__":
    main()
