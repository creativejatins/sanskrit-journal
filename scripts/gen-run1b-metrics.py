#!/usr/bin/env python3
"""Generator for src/data/generated/{cmap,metrics}.generated.json (Run 1b,
docs/runs/RUN-1B-metrics.md). Output is gitignored — regenerate after any
change to src/styles/fonts.css or the font files in public/fonts/.

Requires fontTools (`pip install fonttools`), not a project dependency.

Run from repo root: python3 scripts/gen-run1b-metrics.py .
"""
import json
import re
import sys
from pathlib import Path

from fontTools.ttLib import TTFont

REPO = Path(__file__).resolve()
# repo root is passed as argv[1]
REPO = Path(sys.argv[1]) if len(sys.argv) > 1 else Path.cwd()
FONTS_CSS = REPO / "src/styles/fonts.css"
FONTS_DIR = REPO / "public/fonts"
OUT_DIR = REPO / "src/data/generated"

CSS = FONTS_CSS.read_text()

# Parse each @font-face block: family, style, weight, src url, unicode-range
block_re = re.compile(r"@font-face\s*\{([^}]*)\}", re.S)
prop_re = re.compile(r"([a-zA-Z-]+)\s*:\s*([^;]+);")

faces = []
for block in block_re.findall(CSS):
    props = {}
    for name, val in prop_re.findall(block):
        props[name.strip()] = val.strip()
    if "font-family" in props:
        faces.append(props)

def parse_range(range_str):
    """'U+0000-00FF, U+0304, ...' -> sorted set of codepoints."""
    cps = set()
    for token in range_str.split(","):
        token = token.strip()
        m = re.match(r"U\+([0-9A-Fa-f]+)-([0-9A-Fa-f]+)$", token)
        if m:
            lo, hi = int(m.group(1), 16), int(m.group(2), 16)
            cps.update(range(lo, hi + 1))
            continue
        m = re.match(r"U\+([0-9A-Fa-f]+)$", token)
        if m:
            cps.add(int(m.group(1), 16))
            continue
        raise ValueError(f"unparsed unicode-range token: {token!r}")
    return cps

def family_key(props):
    fam = props["font-family"].strip("'\"")
    weight = props.get("font-weight", "400")
    style = props.get("font-style", "normal")
    return f"{fam} {weight} {style}"

def src_path(props):
    m = re.search(r"url\('([^']+)'\)", props.get("src", ""))
    if not m:
        raise ValueError(f"no src url in {props}")
    rel = m.group(1).lstrip("/")
    return REPO / "public" / rel

# ---- cmap intersection: Devanagari + Gujarati, Sans + Serif, weight 400 ----
targets = [
    "Noto Sans Devanagari 400 normal",
    "Noto Serif Devanagari 400 normal",
    "Noto Sans Gujarati 400 normal",
    "Noto Serif Gujarati 400 normal",
]

cmap_report = {}
for props in faces:
    key = family_key(props)
    if key not in targets:
        continue
    path = src_path(props)
    font = TTFont(str(path))
    cmap = set(font.getBestCmap().keys())
    declared = parse_range(props["unicode-range"])
    intersection = sorted(declared & cmap)
    only_declared = sorted(declared - cmap)
    cmap_report[key] = {
        "file": path.name,
        "declared_count": len(declared),
        "cmap_count": len(cmap),
        "intersection_count": len(intersection),
        "intersection": intersection,
        "declared_not_in_cmap": only_declared,
    }

OUT_DIR.mkdir(parents=True, exist_ok=True)
cmap_out = {
    "devanagari": {
        "sans": cmap_report["Noto Sans Devanagari 400 normal"]["intersection"],
        "serif": cmap_report["Noto Serif Devanagari 400 normal"]["intersection"],
    },
    "gujarati": {
        "sans": cmap_report["Noto Sans Gujarati 400 normal"]["intersection"],
        "serif": cmap_report["Noto Serif Gujarati 400 normal"]["intersection"],
    },
}
(OUT_DIR / "cmap.generated.json").write_text(json.dumps(cmap_out, indent=2) + "\n")

# Report any declared-but-glyphless codepoints — a check worth surfacing.
for key, rep in cmap_report.items():
    if rep["declared_not_in_cmap"]:
        print(f"NOTE: {key} ({rep['file']}) declares but has no glyph for: "
              f"{[hex(c) for c in rep['declared_not_in_cmap']]}", file=sys.stderr)

# ---- Latin coverage check (verify, don't assert) ----
latin_targets = ["Noto Sans 400 normal", "Noto Serif 400 normal"]
for props in faces:
    key = family_key(props)
    if key not in latin_targets:
        continue
    path = src_path(props)
    font = TTFont(str(path))
    cmap = set(font.getBestCmap().keys())
    declared = parse_range(props["unicode-range"])
    missing = sorted(declared - cmap)
    if missing:
        print(f"NOTE: {key} ({path.name}) declares but has no glyph for: "
              f"{[hex(c) for c in missing]}", file=sys.stderr)
    else:
        print(f"OK: {key} — full declared range has glyphs", file=sys.stderr)

# ---- metrics table, all six 400-weight families ----
metric_targets = [
    "Noto Sans 400 normal",
    "Noto Sans Devanagari 400 normal",
    "Noto Sans Gujarati 400 normal",
    "Noto Serif 400 normal",
    "Noto Serif Devanagari 400 normal",
    "Noto Serif Gujarati 400 normal",
]
metrics = {}
for props in faces:
    key = family_key(props)
    if key not in metric_targets:
        continue
    path = src_path(props)
    font = TTFont(str(path))
    head = font["head"]
    hhea = font["hhea"]
    os2 = font["OS/2"]
    metrics[key] = {
        "file": path.name,
        "unitsPerEm": head.unitsPerEm,
        "hhea_ascender": hhea.ascender,
        "hhea_descender": hhea.descender,
        "hhea_lineGap": hhea.lineGap,
        "os2_typoAscender": os2.sTypoAscender,
        "os2_typoDescender": os2.sTypoDescender,
        "os2_typoLineGap": os2.sTypoLineGap,
        "os2_winAscent": os2.usWinAscent,
        "os2_winDescent": os2.usWinDescent,
        "sxHeight": getattr(os2, "sxHeight", None),
        "sCapHeight": getattr(os2, "sCapHeight", None),
        "fsSelection_useTypoMetrics": bool(os2.fsSelection & 0x80),
    }

(OUT_DIR / "metrics.generated.json").write_text(json.dumps(metrics, indent=2) + "\n")

print(json.dumps(metrics, indent=2))
