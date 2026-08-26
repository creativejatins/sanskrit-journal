# Run 2 — color, contrast, links, base element styles

Scope: color tokens, a WCAG contrast check, link states, and base HTML element defaults
(headings, paragraphs, lists, blockquote, rule, selection, focus). Nothing else.

## Read first

`/CLAUDE.md`, then `docs/PROJECT.md`, then the **2026-08-18 entries** in `docs/DECISIONS.md`.
Three govern this run directly:

- **Light palette. Dark mode deferred, not rejected.** Cool, pale, restrained; body text
  near-black at full contrast. Do not add a `prefers-color-scheme` branch — that reopens a
  decision this run does not own.
- **A Sanskrit form is set one way, everywhere.** One face, one weight, one color, in every
  position — headword, paradigm cell, heading, inline in prose. This run must not color a
  Sanskrit form to mark it as a link, a heading, or anything else. If a Devanagari or
  Gujarati string is ever the content of an `<a>`, the link still needs a non-color
  affordance (underline), but its color stays the body text color.
- **No synthesized italics for Devanagari or Gujarati.** Neither script has an italic
  tradition and no italic cut was purchased for either. Base element styles must stop the
  browser from faking one on `<em>`/`<i>` for Indic-language content — nothing in Run 1
  addressed this because it is a base-styles concern, not a `@font-face` one.

If anything here contradicts the log, the log wins — say so rather than choosing.

## The rule that overrides this brief

**Never write Sanskrit.** Base-element and link demos use `src/data/specimen.yaml`,
read-only, exactly as Run 1b used it — nothing added, nothing corrected. English chrome text
for headings/paragraphs/list demos may be written freely; it is not Sanskrit and is not
claimed as real journal content.

---

## 1. Color tokens

Add a color section to `tokens.css`, alongside the existing type tokens. Cool, pale,
restrained, per the 2026-08-18 decision:

- `--color-bg`, `--color-surface` (a step below bg, for provenance strips / quote blocks)
- `--color-text` (near-black), `--color-text-muted` (secondary text — provenance lines,
  captions)
- `--color-border` (decorative rules/dividers — no contrast floor, it carries no meaning on
  its own) and `--color-border-strong` (a second, darker border token for interactive
  component edges — inputs, focus fallback — which does carry a 3:1 floor under WCAG 1.4.11)
- `--color-link`, `--color-link-hover`
- `--color-focus` — for `:focus-visible`, not `:focus`; `outline: none` without a
  `:focus-visible` replacement is not acceptable here.

No accent color beyond link/focus. "Restrained" means resisting the urge to add one for
topic tags or similar — that is a page-template decision, out of scope here.

No visited-link color. Record the reasoning either way in the report.

## 2. Contrast — compute, don't eyeball

For every foreground/background pairing that carries text (text/bg, text/surface,
muted/bg, muted/surface, link/bg, link/surface, link-hover/bg) and every UI-boundary pairing
(border-strong/bg), compute the WCAG relative-luminance contrast ratio from the chosen hex
values — same "measure, don't assume" discipline as Run 1b's ink measurement. Report each
ratio against the applicable floor (4.5:1 normal text, 3:1 large text and UI components,
noting AAA at 7:1 where a pairing clears it). A failing pairing gets a revised value, not a
footnote.

## 3. Links

Default state underlined — WCAG 1.4.1, color alone must not carry the affordance. Hover and
`:focus-visible` states. No separate visited state (see §1).

**The Sanskrit-link override:** any element in `lang="hi"` or `lang="gu"` keeps
`color: var(--color-text)` even inside an `<a>`; only the underline/hover/focus affordances
change. Write this as a real rule in `base.css`, not just a comment — there is no page using
it yet, but the rule needs to exist before the first cross-reference link does.

## 4. Base element styles — `src/styles/base.css`, new file

- box-sizing reset, `html`/`body` background and text color from tokens
- `body` line-height from `--line-height`, font-family Noto Sans (chrome default; per-element
  Indic overrides stay a page-template concern per Run 1b's own tokens.css note)
- headings `h1`–`h4`: Noto Serif, per the standing serif-heading rule
- paragraphs: `max-width: var(--measure)`
- lists: sane margin/padding, `list-style-position: outside`
- `blockquote`: distinct treatment (uses `--color-surface`) — this is the element the one
  permitted short BAPS quotation (`docs/PROJECT.md`) would render in, so give it a visible
  citation slot (`cite` styling), not just a generic indent
- `hr`: `--color-border`
- `::selection`: token-driven, not the browser default
- `:focus-visible`: `--color-focus` outline, on every focusable element, replacing any
  `outline: none`
- `:lang(hi), :lang(gu) { font-synthesis: none; }` (or the narrower
  `font-synthesis-style: none` if support requires) — stops browser-faked oblique on `<em>`/
  `<i>` for both Indic scripts, per the no-synthesized-italics decision

No Tailwind, no CSS framework — consistent with Run 1/1b.

## 5. Demonstrate — dev-only `/color/`, not linked, not in the production build

Same pattern as `/specimen/`: `prerender = true`, 404 in `PROD`, `noindex`.

- Palette swatches, each labelled with its token name, hex value and computed contrast ratio
  against the pairing(s) it is used in
- Base elements rendered with placeholder English chrome text: `h1`–`h4`, a paragraph at
  `--measure`, an unordered and ordered list, a `blockquote` with a `cite`, an `hr`
- Links in default/hover/focus-visible, plus one Devanagari and one Gujarati specimen string
  (from `specimen.yaml`, read-only) wrapped in an `<a>` to demonstrate the color-override
  rule
- An `<em>` around a Devanagari and a Gujarati specimen string, to visually confirm no
  synthesized slant appears

## 6. Verify, then report

- Recompute each contrast ratio in the report and confirm it matches what ships
- Confirm no `<a lang="hi">` / `<a lang="gu">` on the page resolves a computed color other
  than `--color-text`
- Confirm computed `font-style` stays `normal` on the Devanagari/Gujarati `<em>` demos (no
  synthesized oblique)
- Re-run the block-consistency check is not applicable here (no new Sanskrit strings) — say
  so rather than skipping silently

---

## Out of scope (Run 2)

Page templates, `labels.yaml`, any content entry, table/paradigm styling
(`docs/DECISIONS.md` already specifies that separately, and it wants real page templates to
land in), the contact form and its validation states, the Cloudflare adapter. Raise if
blocking; do not act.

## Report (Run 2)

Per file changed, what and why. Contrast ratios computed, before and after any revision.
Checks that held, not only findings.

**Color, unlike Run 1b's metrics, has no external ground truth to compute toward** — the
palette is a proposal the owner needs to see rendered, the same way Run 1b's `size-adjust`
values were. Say so rather than declaring the run finished; `/color/` is what he opens to
confirm it.

---

## Run 2b — dark mode

No longer deferred. The 2026-08-18 "Light palette" decision deferred dark for a stated
reason — light-on-dark blooms, and Devanagari's शिरोरेखा is the stroke most exposed to that —
not because dark itself was rejected. Run 2b picks the deferral back up rather than reopening
the reasoning behind it.

### Scope

- Light stays the default token set; nothing in §1–§4 above changes.
- Dark as a `[data-theme="dark"]` override block in `tokens.css`, same design language as
  light (cool, deep, restrained) rather than an unrelated second palette.
- Applied two ways: `@media (prefers-color-scheme: dark)`, guarded by
  `:not([data-theme="light"])` so an explicit light choice still beats a dark system
  preference; and `:root[data-theme="dark"]`, the manual override, which wins regardless of
  system preference. The two blocks carry identical values by construction — a future edit to
  one without the other is the failure mode to watch for, flagged in the file itself.
- Full contrast table re-run for the dark palette, same pairings and floors as §2, shown on
  `/color/` next to the light table rather than replacing it.
- A visual check of the Devanagari शिरोरेखा at body size (16px, Noto Sans Devanagari 400, the
  only body weight shipped) on the dark background, light and dark side by side.

### The rule that overrides this brief

Same as Run 2: never write Sanskrit. The शिरोरेखा check reuses `specimen.yaml`, read-only.

### Out of scope

A persisted toggle (localStorage/cookie) — the toggle added to `/color/` is a dev-page
preview control only, not a component; persistence is a page-template concern. Acquiring a
heavier Devanagari weight cut, if the dim in `--color-text` turns out not to be enough — that
is a bigger, separate decision (new font files, a new subsetting pass, new `unicode-range`
entries) and Run 2b does not decide it unilaterally.

### Report

What the शिरोरेखा looked like on dark, measured where measurement was possible, not only
described. Both contrast tables. Whether the dim already applied is proposed as sufficient or
whether a further step is flagged for the owner to decide.

**Ends at the same visual check as Run 2 and Run 1b** — the palette is a proposal until the
owner has looked at both themes on `/color/`.

---

## Run 2b adjustment — from the owner's visual check

`--color-text` at 13.67:1 read well for headings and labels but harsh over a full dark-mode
paragraph. Two changes, from the owner directly rather than a fresh design pass:

- **`--color-text` splits into `--color-text` (headings, `strong`/`b`) and
  `--color-text-body` (paragraph copy, and the Sanskrit-link override — see below).** Equal in
  light, which was never harsh enough to need the split. In dark, `--color-text-body` is
  `#c3cad0`, 10.77:1 against `--color-bg` and 9.81:1 against `--color-surface` — inside the
  requested 10–11:1 band, with more headroom above the 4.5:1 AA floor than the heading value
  needs, room to dim further later if it's still harsh.
- **`--color-text-muted` moved in both themes** to clear 7:1 (AAA) on *both* its pairings, not
  only the looser one: light `#4b5563` → `#454e57` (bg 7.29→8.17, surface 6.85→7.67); dark
  `#98a2ac` → `#aab4bd` (bg 6.88→8.47, surface 6.27→7.72). Provenance strips put muted text on
  `--color-surface`, so that pairing is the one that mattered, not the more forgiving `bg` one.
- **`--color-border-strong` untouched** — it already clears its own 3:1 UI floor (WCAG 1.4.11)
  and AAA (7:1) is a text-contrast criterion that doesn't apply to it.

The Sanskrit-link override (`base.css`) now points at `--color-text-body`, not `--color-text`
— reasoned through in the file itself: the "one face, one weight, one colour" decision
(2026-08-18) requires a Sanskrit form to render identically wherever it sits, so it takes the
more bloom-resistant of the two values everywhere, including a future heading-position
headword, rather than only where it happens to sit in body copy today.

`/color/` §7 puts dark heading text and dark body text side by side (English and Devanagari
both) so the difference this adjustment makes is visible directly, not just in the numbers.

**Still a proposal.** Values stand until the owner has looked at both themes again.
