# Run 3 — the layout shell

First run where the styles reach a real page rather than a dev specimen. Runs 1a, 1b and 2
are closed and committed.

## Read first

`/CLAUDE.md`, `docs/PROJECT.md`, then `docs/DECISIONS.md` — the **2026-08-26 entries** settle
site name, navigation, licence, footer and author identity, and the **2026-08-18** entries
settle the type and presentation rules. If anything here contradicts the log, the log wins;
say so rather than choosing.

## The rule that overrides this brief

**Never write Sanskrit.** This run is chrome, and chrome is English — so there should be no
occasion to. Watch for two places the temptation appears:

- **Reference hub links.** The sub-navigation points at `dhatus`, `vocabulary`, `avyaya`,
  `conjugations`, `declensions`. Use those ASCII collection names as the visible labels for
  now. Their real display labels live in `src/data/labels.yaml`, which is empty and blocked
  on the owner. Do not supply Devanagari or Gujarati labels, and do not translate them into
  invented English equivalents.
- **Placeholder content.** The homepage and About page take English placeholder prose. No
  example entries, no sample headwords, no illustrative Sanskrit of any kind.

---

## Step 0 — the Cloudflare adapter

`astro build` currently fails with `NoAdapterInstalled`, pre-existing since Keystatic was
wired in. Fix it first: nothing later in this run is verified until the build passes.

Report which adapter and configuration, and confirm `astro build` completes. `/specimen/` and
`/color/` must stay dev-only and out of the production build — check they are absent from
`dist/`.

## Step 1 — `BaseLayout.astro`

Wires in `fonts.css`, `tokens.css`, `base.css` and the three font preloads. `lang` on
`<html>`, skip link, `<meta>` basics.

**Move the theme toggle here** from `color.astro`. It currently lives on a dev-only page; it
belongs to every page. Behaviour is settled: default follows `prefers-color-scheme`, manual
choice sets `data-theme` on `<html>` and persists.

The toggle must not cause a flash of the wrong theme on first paint.

## Step 2 — header

Wordmark **Sanskrit Grammar**. Tagline carrying the journal framing — a beginner's notes,
with sources. Navigation: **Syllabus · Lessons · Texts · Reference · About**.

`/reference/` is a hub page, not a dropdown, linking the five reference collections.

## Step 3 — footer

- **CC BY 4.0**, linked to the licence
- **Corrections**, linking to `/corrections/`
- **Jatin Soni**

No `mailto:`, no address, anywhere on the site. `/corrections/` is a stub in this run — the
form and its Worker route are a later run. The stub says a form is coming and does not
publish an address.

## Step 4 — the provenance component

One component, used everywhere, rendering source code, locator and date.

Settled shape: it sits **above** the headword as a thin line, reads as a filing reference
before the reader meets the entry, and is visible without dominating. Muted text on a raised
surface — that pairing was tuned in Run 2 specifically for this.

No entries exist yet, so demonstrate it on a dev page with placeholder values.

## Step 5 — JSON-LD

Site level only in this run: `WebSite` and `Person`. The `Person` is Jatin Soni, with **no
credential, title or honorific** — the framing is beginner, and the structured data says
nothing the prose does not.

Per the 2026-08-14 rule, JSON-LD is generated, never hand-written. Entry-level structured
data comes with the collection templates.

## Step 6 — `index.astro`

Replaces Astro's placeholder. Keep it plain: what the site is, in English placeholder prose
the owner will rewrite, and links into Syllabus and Reference.

A recent-entries list belongs here eventually. There are no entries, so build the **empty
state** and make it look deliberate rather than broken — the journal showing what is not done
yet is consistent with its framing.

## Step 7 — About page

Placeholder prose only. The owner writes it. Structure it: what this is, who he is, how
corrections work, what the sources are.

---

## Verify

- `astro build` passes; `/specimen/` and `/color/` absent from `dist/`
- No theme flash on load; toggle persists across navigation
- Contrast ratios unchanged from Run 2 in both themes
- Tab through every page: focus ring visible on all interactive elements
- Nothing in this run renders Devanagari or Gujarati

## Out of scope

Collection templates, `labels.yaml`, the correction form backend, search indexes, entry-level
JSON-LD. Raise if blocking; do not act.

## Report

Per file changed, what and why. Checks that held, not only findings. Flag anything left
inconsistent.

Layout is judged by eye. Say plainly that it stands as a proposal until the owner has opened
it in a browser.
