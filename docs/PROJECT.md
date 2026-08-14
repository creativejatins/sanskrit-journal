# sanskritgrammar.com — a Sanskrit learning journal

## What this is

A public record of one person learning Sanskrit, written as it happens.

The owner is studying the **BAPS પ્રમુખસંસ્કૃત-અધ્યયનમ્** (प्रमुखसंस्कृत-अध्ययनम्) syllabus toward
an exam, and reading alongside it — લઘુસિદ્ધાન્તકૌમુદી, પાણિનીય-શિક્ષા, YouTube courses, and
whatever स्तोत्र he happens to be working through. Every lesson understood, every धातु looked
up, every श्लोक broken into सन्धि-विच्छेद gets written down here.

It is a journal, not a reference work. That framing is deliberate and should be visible on
the site itself. The owner is a beginner; entries will contain mistakes; a mistake in a
journal is a correction, not a credibility problem. A beginner reading "these are my notes,
here is the book and page I took them from" is better served than by another
authoritative-sounding grammar summary.

## What this is not (yet)

This project **replaces nothing**. A relational Sanskrit database and commercial API were
designed to Draft 7 and are **parked, not abandoned**, at tag `schema-draft-7` in the
`sanskrit-api` repo. That work stopped for one reason: it stalled on four questions only a
person who can read Sanskrit could answer, and the owner is not yet that person.

**This journal is the pipeline that clears that blocker.** Every entry written here is
content the parked schema was designed to hold. Roughly a year is the expected horizon.

Do not rebuild the API here. Do not add a database here. See `/CLAUDE.md` for when that
changes.

## Who it is for

1. **The owner**, primarily — recall, revision, exam preparation.
2. **Beginners**, secondarily — the site is public and free, and a beginner's notes with
   sources attached are genuinely useful to the next beginner.

## Stack

| | |
|---|---|
| Site | Astro |
| Content editing | Keystatic (local mode for writing, GitHub mode in production) |
| Storage | Markdown and YAML files in Git — **no database** |
| Hosting | Cloudflare Pages |
| Domain | sanskritgrammar.com (already on Cloudflare) |
| Repo | GitHub — **private**; the built site is public |
| Editor | WebStorm |
| Admin protection | Cloudflare Access on `/keystatic` |

The API, when it eventually exists, goes to `api.sanskritgrammar.com`. The journal keeps
the root. Nothing published now should ever have to move.

**Source scans are never committed.** The BAPS volumes are all-rights-reserved; Git history
is permanent, so a private repo makes an accidental commit recoverable rather than harmless.
They live outside the repo and are covered by `.gitignore`.

## Content shape

Collections in two groups. Full field definitions in `docs/CONTENT-MODEL.md`.

**Journal — things written on a day**

- `lessons` — a BAPS syllabus unit, studied and written up
- `texts` — a श्लोक or स्तोत्र broken down: verse, सन्धि-विच्छेद, word by word, translation
- `notes` — anything else: a video, an LSK page, something worked out

**Reference — things accumulated over time**

- `dhatus` — designed for the full Dhātupāṭha across all ten गण, not only what BAPS covers
- `vocabulary`
- `avyayas`
- `topics` — the controlled list that ties everything together

> Under revision. The syllabus reading showed the reference side needs paradigm collections
> the current model has no home for. See `docs/CONTENT-MODEL.md`.

## Sources are merged, never separated

BAPS is a **source**, not a section. When सन्धि is learned from BAPS, then again from
लघुसिद्धान्तकौमुदी, then again from a video, all three entries sit together and are
distinguished by their `source` field.

One store with labels can always be rendered as a BAPS-only view for exam revision. Two
stores can never be merged later. Where sources disagree, record both and adjudicate
neither.

The registry of sources and their short codes is `docs/SOURCES.md`.

## Corrections

The site carries a contact address in the footer. It has **no comment section**, and that is
a decision rather than an omission.

The owner cannot yet judge whether a correction is right. A public comment thread publishes
an unverified claim beneath an entry where it reads as authoritative, and two confident
strangers disagreeing leaves nothing to adjudicate with. A private message keeps the loop
intact: read it, go back to the printed page, check, then fix it in the owner's own words
with the source recorded.

Every correction acted on is a normal edit — same provenance rules as any other entry.

## Copyright

The site is public, so this is distribution rather than private study.

- Following a syllabus **order** is fine. An order of topics is not ownable.
- Reproducing BAPS explanations, exercises or example sentences is **not** fine.
- Method: read the lesson, close the book, write what was understood, then reopen and check
  it was right. Writing *from the page* produces paraphrase; writing *from understanding*
  produces your own words.
- Where a source's exact framing is wanted, quote one short line and cite it.
- Same rule for video: learn from it, write your own notes, cite channel and timestamp.

The BAPS imprint reserves all rights, excepting brief quotations in reviews and articles.
The position above is a considered one taken against that notice, not a permission the books
grant.

## Exercises

Original, and generated from the owner's own verified data rather than written freely.

Once thirty धातुs are entered with गण, पद, अर्थ and a page reference, exercises follow
mechanically from those rows — which गण is this धातु, match धातु to meaning, given the गण
pick the form. Every question and every wrong option is an entry the owner verified from
print, so an exercise can never be more wrong than the data behind it.

This is the parked schema's §9.1 principle, unchanged: options point at real rows, so
distractors stay correct forever.

**Coverage limit.** BAPS's own exercises include translation prompts, which cannot be
generated from reference rows. Generated exercises cover recall, classification and matching
only; translation practice comes from the books and is not reproduced here.
