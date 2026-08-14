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

Nine collections in two groups. Full field definitions in `docs/CONTENT-MODEL.md`.

**Journal — things written on a day**

- `books` — a BAPS volume: वर्ग range, edition, course year
- `lessons` — **one topic within a वर्ग**, studied and written up
- `texts` — a श्लोक or स्तोत्र broken down: verse, सन्धि-विच्छेद, word by word, translation
- `notes` — anything else: a video, an LSK page, something worked out

**Reference — things accumulated over time**

- `dhatus` — the full Dhātupāṭha across all ten गण, not only what BAPS covers
- `vocabulary` — including अव्यय, which is a word type rather than a separate list
- `conjugations` — one printed paradigm table per entry
- `declensions` — शब्दरूप, and the कृदन्त that decline like them
- `topics` — the controlled list that ties everything together

**The reference side is not bounded by the syllabus.** All ten गण, all ten लकार, the whole
अव्यय class. BAPS teaches roughly half the गण and four of the ten लकार; the rest is learned
from other sources and entered on the same terms. Nothing may be entered from a source that
is not first recorded in `docs/SOURCES.md` — that rule has no exception, so the sources come
before the ambition.

## Sources are merged, never separated

BAPS is a **source**, not a section. When सन्धि is learned from BAPS, then again from
लघुसिद्धान्तकौमुदी, then again from a video, all three entries sit together and are
distinguished by their `source` field.

One store with labels can always be rendered as a BAPS-only view for exam revision. Two
stores can never be merged later. Where sources disagree, record both and adjudicate
neither.

The registry of sources and their short codes is `docs/SOURCES.md`.

## Corrections

The site carries a contact form, linked from the foot of every entry. It has **no comment section**, and that is
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
- **Nothing from the books is reproduced.** Not an explanation, not an example sentence, not
  a સ્વાધ્યાય question, not a reading passage, not a table copied as printed.
- Method: read the lesson, close the book, write what was understood, then reopen and check
  it was right. Writing *from the page* produces paraphrase; writing *from understanding*
  produces your own words.
- Where a source's exact framing is wanted, quote one short line and cite it. Rarely.
- Same rule for video: learn from it, write your own notes, cite channel and timestamp.

**What is not reproduction.** A धातु with its गण, पद and meaning is a fact of the language,
not authored expression, and the same is true of a paradigm's cells. These are entered with a
page citation. What is authored — and therefore off limits — is the explaining, the choosing
of examples, the exercises and the reading passages.

The BAPS imprint reserves all rights, excepting brief quotations in reviews and articles.
The position above is a considered one taken against that notice, not a permission the books
grant.

## Exercises — deferred

**Not in the first version.** A journal with no entries has nothing to generate from.

The approach, when it returns, is unchanged and remains sound: exercises are generated from
the owner's own verified rows, never written freely. Once roughly thirty धातु are entered
with गण, पद, अर्थ and a page reference, questions follow mechanically from those rows — which
गण is this धातु, match धातु to meaning. Every question and every wrong option is an entry the
owner verified from print, so an exercise can never be more wrong than the data behind it.
This is the parked schema's §9.1 principle: options point at real rows, so distractors stay
correct forever.

**Deferring this is a scope call, not a copyright one.** Generating questions from the
owner's own data was never an infringement risk. Reproducing BAPS's સ્વાધ્યાય is — but a
question *format*, such as match-the-meaning or fill-the-blank, is not ownable; only specific
content is. Worth stating plainly so the feature is not later abandoned for a reason that
was never true.

**Coverage limit when it returns.** Translation prompts cannot be generated from reference
rows. Generated exercises would cover recall, classification and matching only.
