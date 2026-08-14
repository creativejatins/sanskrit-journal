# CLAUDE.md

Read `docs/PROJECT.md` first. This file is the operating rules.

## Documents

| File | Holds |
|---|---|
| `/CLAUDE.md` | this file — operating rules |
| `docs/PROJECT.md` | what the site is, stack, copyright position |
| `docs/CONTENT-MODEL.md` | the seven collections and their fields |
| `docs/SOURCES.md` | source registry — short codes, editions, verified pages |
| `docs/DECISIONS.md` | dated log of decisions taken and why |

**Standing order.** When a decision is made that would be re-argued in three months —
a tool choice, a URL structure, a field shape, a rejected alternative — add a dated line to
`docs/DECISIONS.md` and say so. The parked project's real cost was not wrong decisions but
good ones that were forgotten and then re-litigated.

## The one rule that matters

**Never write Sanskrit.** Not a धातु form, not a सन्धि, not an example sentence, not a
translation, not a sūtra number, not a "corrected" spelling of something the owner typed.

Sanskrit enters this repo only from a source the owner has read, with a locator recorded.
Claude's job is to build the machinery that holds it, and to review what the owner enters
against sources — never to supply the content.

This matters more here than in a normal project: the owner is a beginner and cannot yet
catch a plausible-looking error. A wrong form published on a public domain is worse than a
missing one.

If a field needs a Sanskrit value and the owner has not supplied one, leave it empty and
say so.

## Provenance

Every entry in every collection carries a source. No exceptions, including reference rows.

- `source_type`: `print` or `video`
- `source`: a short code from `docs/SOURCES.md`
- `locator`: page number for print, `mm:ss` for video

A timestamp is a video's page number. An entry without a locator cannot be re-verified and
should not be written.

## Data rules that keep the future migration cheap

This content is expected to import into the parked relational schema
(`sanskrit-api`, tag `schema-draft-7`) in roughly a year. Three rules protect that, and all
three are about data quality rather than storage — storage was never the hard part.

1. **Controlled fields, never free text**, for anything with a fixed list — गण, पद,
   `source_type`, topics. Use `fields.select` with fixed options, or
   `fields.relationship` into a collection. A free-text गण becomes भ्वादि, भ्वादिः and
   Bhvādi across three months, and no import can tell they are one thing.
2. **Slugs are permanent.** Keystatic's relationship field stores a slug as a static string
   with no cascade — rename an entry and every reference to it silently breaks. Decide a
   slug at creation and never change it.
3. **Provenance on every row**, per above. It is the one thing that cannot be reconstructed
   later.

## Scope discipline

- **No database.** No Postgres, no Directus, no ORM, no D1. Content is files in Git.
- **No API.** That project is parked deliberately, not forgotten.
- **No schema design.** If a modelling question feels big, it belongs in the parked repo's
  documents, not here.
- Do not import, copy or reference files from the `sanskrit-api` repo.

**When to revisit:** when a needed query is a join that client-side filtering cannot
express, or when the data must be served programmatically to other people. Raise it; do not
act on it.

## Working method

Carried from the parked project because it earned its place there.

- **Verify, do not assert.** Grep or read the file rather than recalling what it says.
- **Record checks that held**, not only findings. A passed check is information.
- **Recommend with reasoning.** The owner prefers a recommendation he can accept or reject
  over an open question handed back to him.
- **Scope work into runs.** A pass touching fifteen files is where things start
  contradicting themselves. Split it and say what each run covers.
- **Report what changed, per file**, and flag anything a pass leaves inconsistent.
- After any correction, scan forward — the same error tends to reappear one section along.

## Style

- The owner is terse. Do not over-explain and do not ask for context that is in these files.
- Devanagari and Gujarati appear inline in prose. Do not transliterate them away.
- Commit messages: what changed and why, present tense.

## Copyright

The site is public. Following a syllabus order is fine; reproducing a book's explanations,
exercises or example sentences is not. Never paste source text into an entry as a draft to
be reworded later — that draft ends up shipped.
