# sanskrit-journal

A public record of one person learning Sanskrit — [sanskritgrammar.com](https://sanskritgrammar.com).

BAPS **પ્રમુખસંસ્કૃત-અધ્યયનમ્** as the spine, with લઘુસિદ્ધાન્તકૌમુદી, પાણિનીય-શિક્ષા and
video courses alongside. Lessons, श्लोक breakdowns, and growing reference lists of धातु,
vocabulary and अव्यय — each entry citing the book and page, or the video and timestamp, it
came from.

These are a learner's notes, not a reference work.

**This repository is private; the site it builds is public.** See `docs/DECISIONS.md`.

## Corrections

Spotted an error? Please write — the address is in the site footer. Corrections are
genuinely welcome and get checked against the source before anything changes.

There is no comment section, deliberately. An unverified correction sitting under an entry
is worse than no correction at all when the author cannot yet adjudicate it. See
`docs/DECISIONS.md`.

## Stack

Astro · Keystatic · Cloudflare Pages. Content is markdown and YAML in this repo — no
database.

## Running locally

```bash
npm install
npm run dev
```

Site at `localhost:4321`, editor at `localhost:4321/keystatic` (local mode — writes straight
to `src/content/`).

## Source scans

**Never commit them.** The BAPS volumes are all-rights-reserved and Git history is
permanent — a private repo makes a mistake recoverable, not harmless. Scans live outside the
repo and are covered by `.gitignore`.

## Documents

| File | Holds |
|---|---|
| `CLAUDE.md` | operating rules for Claude Code |
| `docs/PROJECT.md` | what this is, stack, copyright position |
| `docs/CONTENT-MODEL.md` | collections and their fields |
| `docs/SOURCES.md` | source registry — short codes and verified pages |
| `docs/DECISIONS.md` | dated log of decisions and open questions |

## Licence

Code: see `LICENSE`. Content: **to be decided** — see `docs/DECISIONS.md`.
