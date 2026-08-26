# Run 1 — type foundation

Scope: font files, `@font-face`, metric reconciliation, the specimen page. Nothing else.

## Read first

`/CLAUDE.md`, then `docs/PROJECT.md`, then the **2026-08-18 entries** in `docs/DECISIONS.md`.
The font stack, the subset decisions and the self-hosting rationale are settled there; this
brief implements them and does not reopen them. If something here contradicts
`docs/DECISIONS.md`, the log wins — say so rather than picking one.

## The rule that overrides this brief

**Never write Sanskrit.** Not a form, not a transliteration, not a "sample" word, not filler
in a specimen page, not a placeholder that happens to be a real word.

The specimen page uses strings the owner supplies. If they are absent, leave the placeholder
literals in place, say the page cannot be tuned yet, and stop at 1a. Do not substitute
plausible text to make the page look finished — a generated design tool did exactly that
twice, and the output was convincing and wrong.

---

## Run 1a — proceeds now

### 1. Install

```
@fontsource/noto-sans            @fontsource/noto-serif
@fontsource/noto-sans-devanagari @fontsource/noto-serif-devanagari
@fontsource/noto-sans-gujarati   @fontsource/noto-serif-gujarati
```

Static packages, not `@fontsource-variable/`. **Do not import Fontsource's CSS** — it carries
no metric overrides, and those are the point of the run. The packages are for versioned files
only. Report the resolved version of each.

### 2. Coverage check — do this before anything is subsetted

IAST needs Latin Extended Additional, U+1E00–1EFF, and specifically the combined
macron-plus-dot-below characters.

For each Noto Sans and Noto Serif Latin file, load the font with `fontTools`, read the cmap,
and report **which codepoints in U+1E00–1EFF are present and which are missing**, per file.

Report the result either way. A pass is information.

If anything is missing: stop and report. Do not substitute a different family, and do not
work around it — the family choice is settled and a gap here changes a different decision.

`pyftsubset` silently drops codepoints the source font lacks, which is why this check comes
first rather than after.

### 3. Merge the Latin subsets

Fontsource ships `latin` and `latin-ext` as separate files. IAST appears on every reference
page, so both always load and the split only costs a request.

With `pyftsubset`, build **one Latin file per weight and style** covering Basic Latin,
Latin-1 Supplement, Latin Extended-A, Latin Extended Additional, and the punctuation and
currency the original subsets carried. Report byte sizes before and after.

Three files result for Noto Sans (400, 700, 400-italic) and two for Noto Serif (400, 700).

### 4. Copy into `public/fonts/`

Thirteen `.woff2` in total — five Latin from step 3, plus 400 and 700 for each of the four
Indic families.

**Do not copy the Indic packages' `latin` subsets.** A second Latin in the stack makes the
`unicode-range` binding ambiguous, which is the failure the binding exists to prevent.

Copy `OFL.txt` from one of the packages alongside them. These files are committed — that is
deliberate and recorded; the never-commit rule covers the BAPS scans, not assets.

### 5. Read the metrics — report, do not act

For all six families, extract with `fontTools` and present as one table:
`unitsPerEm`, `hhea` ascender / descender / lineGap, `OS/2` typo and win ascender / descender,
`sxHeight`, `capHeight`.

No `size-adjust` values yet. Noto's Indic families carry noticeably larger default ascent and
descent than Noto Sans Latin, and the size of that gap is what 1b tunes against. Report the
numbers and stop.

### 6. `src/styles/fonts.css`

Hand-written. One `@font-face` per family per weight, with:

- `unicode-range` binding each face to its script. **Take the Indic ranges from the
  `unicode-range` in Fontsource's own shipped CSS rather than typing them from memory**, and
  report which ranges you used.
- `font-display: swap`
- `size-adjust`, `ascent-override`, `descent-override`, `line-gap-override` present as
  declarations, set to neutral values, each with a `TODO 1b` comment

No Tailwind, no CSS framework, no build-time CSS tooling beyond what Astro already does.

### 7. Preload

Three files only: Noto Sans Latin 400, Noto Sans Devanagari 400, Noto Sans Gujarati 400.

### 8. `/specimen/` — dev only

Not in the production build, not linked from anywhere. Renders each family at several sizes,
a mixed-script line, and the Latin diacritics — all from bracketed placeholder literals until
the owner's strings arrive.

---

## Run 1b — blocked on the owner's specimen strings

Tune `size-adjust` on the Indic faces so their body height matches Latin x-height. Set the
metric overrides so all six families share one line box. Pick one line-height, tuned to
Devanagari and applied to every script. Then the size scale, the measure, and `tokens.css`.

**1b ends at a visual check, not a computed value.** The owner opens `/specimen/` and says
whether the Gujarati sits right against the Devanagari. Propose values; do not declare them
settled.

---

## Out of scope

Color, page templates, `labels.yaml`, any content entry, any Keystatic change, the Cloudflare
adapter. Raise them if they block; do not act on them.

## Report

Per file changed, what changed and why. Checks that held, not only findings. Anything the run
leaves inconsistent. Values proposed in 1b are proposals until the owner has looked at them.
