# Run 1b — metric reconciliation and tokens

Supersedes the stub §1b in `RUN-1-typography.md`. Run 1a is closed and committed.

## Read first

`/CLAUDE.md`, then the **ten 2026-08-18 entries** in `docs/DECISIONS.md`. Four of them govern
this run directly:

- one Indic family per element, driven by `lang`
- `size-adjust` from rendered ink, not `sxHeight`
- typo metrics govern; win metrics disregarded
- a Sanskrit form is set one way, everywhere

If anything here contradicts the log, the log wins — say so rather than choosing.

## The rule that overrides this brief

**Never write Sanskrit.** `src/data/specimen.yaml` is the only source of script text in this
run.

Do not add to it, edit it, extend it, or correct anything in it. Every string was verified by
codepoint after five accidental script mixes were caught during entry; a well-meant fix
silently breaks that guarantee. If the strings do not give the coverage a step needs, say so
and stop — do not supply more.

The IAST row and the cmap grid are **generated**, never typed. That is what makes them
permissible: enumerating a font's own contents is not authoring text.

---

## 1. Wire `specimen.yaml` into `/specimen/`

Each slot rendered with a `lang` attribute that resolves to exactly one Indic family. Label
each with its slot name so the page is readable.

**The mixed line is marked up one `<span>` per token**, each carrying its own `lang`. It is
the only place in the repo where scripts share a line, so it is the live test of the
one-family-per-element rule. Do not wrap it in a single element with a two-family stack.

## 2. Generate the IAST row

Every codepoint in the Latin `unicode-range` already declared in `fonts.css`, rendered as
isolated characters separated by spaces. No words, no sequences. Read the range from the
file; do not retype it.

## 3. Generate the cmap grid

Every codepoint in the Devanagari and Gujarati ranges, taken from each font's cmap, at three
sizes. Isolated vowel signs will render on a dotted circle — that is correct and expected,
not a defect.

## 4. Measure from rendered ink

Use the canvas technique that settled the danda in the 1a follow-up. At one fixed
`font-size`, with all overrides still neutral, report in pixels:

- Latin x-height, from the Latin font's own lowercase `x`
- Devanagari शिरोरेखा-to-baseline, from `devanagari.plain`
- Gujarati body height, from `gujarati.plain`
- the tallest ink above baseline and deepest below, from the `tall` and `deep` slots in
  both scripts, per family

`plain` is the slot that matters for the first three: no marks above or below to confuse the
measurement. `sxHeight` is nominal on both Indic families — 536 on five of six, copied
rather than measured — so it plays no part here.

## 5. Propose the overrides — as proposals

`size-adjust` per Indic family, so measured body height matches Latin x-height.

`ascent-override`, `descent-override`, `line-gap-override` so all six families share one line
box, sized to contain the extremes measured in step 4. Noto Serif Devanagari is the outlier:
930/-625, a 1555 box against Serif Latin's 1362, all at unitsPerEm 1000.

Report as one table: current value, proposed value, resulting line box, per family. Replace
the `TODO 1b` comments in `fonts.css`.

## 6. One line-height

Unitless, tuned to Devanagari, applied to every script. Report what Latin looks like at that
value — it will read slightly airy, and that is the accepted trade, not a bug to correct.

## 7. `tokens.css`

Modular scale with few steps, measure, spacing. Hand-written custom properties. No Tailwind,
no CSS framework, no color tokens — color is Run 2.

## 8. Verify, then report

- Measure the mixed line token by token and confirm each renders from the intended face.
  Measure the ink; do not assume from the markup.
- Confirm no element on the page declares two Indic families.
- Re-run the block-consistency check over `specimen.yaml` and confirm it still passes.

---

## Out of scope

Color, page templates, `labels.yaml`, any content, the Cloudflare adapter. Raise if blocking;
do not act.

## Report

Per file changed, what and why. Checks that held, not only findings. Pixel measurements before
and after.

**This run ends at a visual check, not a number.** The owner opens `/specimen/` and says
whether the Gujarati sits right against the Devanagari and whether the Latin looks undersized
beside both. Values stand as proposals until he has looked. Say so in the report rather than
declaring the run finished.

Note in the report that `/specimen/` is verified against `astro dev` only — `astro build`
still fails on the missing Cloudflare adapter, which is pre-existing and out of scope.
