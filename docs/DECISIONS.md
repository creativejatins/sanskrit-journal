# Decisions

One dated line per decision, newest last. Record the alternative rejected, not only the
choice — the reason is what stops it being re-argued.

---

**2026-08-13 — The API is parked, not abandoned.**
The relational schema reached Draft 7 and stalled on four questions only a Sanskrit reader
could answer. Tagged `schema-draft-7` in the `sanskrit-api` repo. This journal is the
pipeline that clears that blocker, not a replacement for it. Horizon: roughly a year.

**2026-08-13 — Files in Git, not a database.**
Rejected Postgres + Directus. A database earns its keep when content must be queried across
records or served programmatically; neither applies yet, and it costs Git history,
portability and a server to run. Revisit when a needed query is a join, or when the data
must be served to other people.

**2026-08-13 — Keystatic, not Sveltia, not hand-editing.**
Astro-native, generates TypeScript types, actively maintained by Thinkmill; Sveltia is a
public beta with a smaller team. Local mode means writing can start with no OAuth setup.
Against hand-editing: the relationship field gives a picker instead of retyping Devanagari,
which is data integrity, not convenience. Cost: GitHub mode needs server routes and the
Cloudflare adapter, so the site is not purely static. Both store plain markdown, so
switching later costs an afternoon.

**2026-08-13 — Sources merged and labelled, not separated into sections.**
BAPS is a source, not a compartment. One store with labels can be rendered as a BAPS-only
revision view; two stores can never be merged later. Where sources disagree, record both and
adjudicate neither.

**2026-08-13 — Exercises generated from verified data, not written freely.**
Claude can produce plausible wrong Sanskrit and the owner cannot yet catch it. Exercises
derive from entered rows — each already verified against a printed page — so an exercise can
never be more wrong than its data. This is the parked schema's §9.1 principle.

**2026-08-13 — Journal at the apex domain; API subdomain reserved.**
`sanskritgrammar.com` serves the journal. `api.sanskritgrammar.com` is reserved for the
eventual API. Nothing published now should ever need a redirect.

**2026-08-14 — BAPS is three books, not eight volumes.**
The eight PDFs are ZIP archives of JPEGs holding **three** books: प्रथमो भागः (2 files),
द्वितीयो भागः (6 files), तृतीयो भागः (6 files, previously mislabelled in `SOURCES.md` as
लघुसिद्धान्तकौमुदी भैमी व्याख्या). A fourth is expected around Nov 2026 – Jan 2027.
Rejected the old `BAPS-1-1` … `BAPS-2-6` scheme, which encoded the scan-file split into
permanent citation codes: a scan file is a delivery artifact, not a bibliographic unit.
Codes are now `BAPS-1`, `BAPS-2`, `BAPS-3`, with `BAPS-4` reserved.

**2026-08-14 — वर्ग number is the syllabus spine.**
वर्ग numbering runs continuously across the books — 1–14, 15–28, 29–41 — and does not
restart. Page numbering does restart, so a locator is meaningless without its book code.
वर्ग number is therefore a valid global key and book four extends it without a migration.
Verified from the अनुक्रमणिका of all three books.

**2026-08-14 — Repo private, site public.**
Rejected a public repo. The BAPS scans are all-rights-reserved and Git history is permanent,
so a public repo makes any accidental commit irreversible; private makes it recoverable.
Cost: no issues or PRs, so the "corrections welcome" channel moves to a contact route on the
site. Scans stay gitignored regardless — visibility is a setting, history is not.

**2026-08-14 — No comment section; corrections come by private message.**
Rejected giscus (needs a separate public repo, and a GitHub login is a wall for an audience
of BAPS students rather than developers), Cusdis (no reader sign-in at all, and no spam
filter, so every comment needs manual approval) and Disqus (ads and cross-site tracking on
the free tier). Free, serverless and signed-in do not coexist: Talkyard and Remark42 give
real login but need a VPS to self-host or a paid plan to host. The deciding reason is not
cost — the owner cannot yet judge whether a correction is right, and a public thread
publishes an unverified claim beneath an entry where it reads as authoritative. Sign-in
would not fix that: a throwaway Google account is ninety seconds' work, so login deters lazy
spam without identifying anyone. A private message keeps the verification loop intact —
check the printed page, then fix it in the owner's own words. Revisit when the owner can
adjudicate a disputed form; a paid hosted option with real login is then preferred over
Disqus.

**2026-08-14 — Contact form, not a published address.**
A form at `/contact/`, linked from the foot of every entry, rather than a `mailto:` link.
A raw address in public markup gets scraped and the resulting spam cannot be filtered at
source; the form is the address's protection. The per-entry link passes the entry's slug,
`source` and `locator` as hidden fields, so a correction arrives already carrying the book
and page needed to re-check it — that is the point of the design, not a convenience.
Rejected a form repeated on every page (visual noise on a journal, and it competes with the
content) in favour of one form plus a per-entry link.
Spam defence in three free layers: honeypot field, Cloudflare Turnstile, and rate limiting on
the endpoint. Turnstile over Google reCAPTCHA because the site carries no tracking and should
not start now.
Implemented as a Cloudflare Pages Function rather than a hosted form service: it is
stateless, so it stays inside the no-database rule, and corrections — the input to the
verification loop — stay under the owner's control. Cost: an email-sending service and about
an hour more work. A dedicated address, never a personal one.

**2026-08-14 — Primary language: Gujarati content, English chrome.**
Content fields sourced from BAPS are written in Gujarati, its own language. Site chrome,
slugs and filenames are English. Fallback order gu → en → hi; Hindi fills in as LSK and
video material arrives. **IAST is not a fourth locale** — it is a transliteration of the
Sanskrit and pairs with the Devanagari field, not with the translations; treating it as a
language would put Sanskrit in the locale switcher. Journal prose is written in one language
per entry and marked, not required in three: rejected mandatory tri-lingual bodies because
one beginner writing up 41 वर्ग while sitting an exam would either leave two empty forever or
stop writing.

**2026-08-14 — Slugs are ASCII-folded IAST, with the disambiguator always appended.**
Slugs are filenames and URLs both, and diacritics carry Unicode normalisation differences
between macOS and Linux that would silently break relationship fields. Full IAST keeps its
own field. Patterns: `topics` a plain word; `dhatus` `<iast>-<gana>`; `vocabulary`
`<iast>-<gender>`; paradigms `<dhatu-slug>--<derivation>--<lakara>--<pada>`.
The disambiguator is appended **always, even where nothing collides yet** — adding it only on
collision gives the first entry a bare slug and its homograph a suffixed one, and that
asymmetry is permanent. ASCII folding makes this more necessary, not less: ś, ṣ and s all
fold to `s`, so collisions full IAST would avoid will occur.

**2026-08-14 — Derived build-time indexes are not a database.**
Clarifies the no-database rule rather than reversing it. With all ten लकार the form count runs
to tens or hundreds of thousands, so `CONTENT-MODEL.md`'s claim that the browser downloads
everything and filters it no longer holds. The fix is not Postgres: ship a lightweight
headword index client-side, render forms onto statically generated per-धातु pages, and
generate a sharded inverted index at build for reverse lookup (form → धातु), which is the one
query that resembles a join. Git stays the source of truth; the indexes are derived,
disposable and regenerable. Rejected D1 and SQLite-as-storage. The revisit condition in
`/CLAUDE.md` is unchanged.

**2026-08-14 — Bulk reference data is not authored in Keystatic.**
Prose — `lessons`, `texts`, `notes` — is authored in Keystatic, which is what it is good at.
Paradigms and धातु attributes are filled in a spreadsheet mirroring the printed table's shape,
converted to YAML by script and **validated on structure**: all cells present, गण one of the
ten, `source` and `locator` non-empty, no relationship pointing at a nonexistent entry.
Rejected typing ninety forms per धातु into a web form — miserable, error-prone, and the errors
are exactly the kind the owner cannot catch. The validator checks shape without supplying
content, which is the division of labour `/CLAUDE.md` sets out. A wrong form still needs eyes
on the printed page.

**2026-08-14 — Paradigm grain is one printed table.**
One entry per (धातु × derivation × लकार × पद). The principle: **storage grain matches the grain
at which a source can be cited** — a printed paradigm table is exactly one धातु, one लकार, one
पद, on one page, and therefore exactly one `source` + `locator`. Rejected nesting paradigms
inside the धातु entry, which would force लट् from BAPS and लृट् from LSK to share one
provenance field — a lie on at least one of them — and would make every edit rewrite a large
file. The derivation axis (कर्तरि / कर्मणि–भावे / प्रेरक, extensible) is present from the start
because book three teaches कर्मणि and प्रेरक, and without it the first कर्मणि table collides
with its कर्तरि counterpart on the same slug.

**2026-08-14 — Two paradigm collections, not one.**
`conjugations` (3 पुरुष × 3 वचन) and `declensions` (8 विभक्ति × 3 वचन, per लिंग). The syllabus
uses both shapes heavily and कृदन्त take the declension grid, not the conjugation one. A
single collection with optional fields would accept either shape indiscriminately, leaving
the validator — the main reason for the spreadsheet pipeline — with nothing to check.

**2026-08-14 — Controlled lists cover the whole grammar, not the syllabus.**
All ten गण and all ten लकार are options from the start. BAPS teaches roughly half the गण and
four of the ten लकार, and the owner intends to learn the rest from outside it. Sizing the
selects to the syllabus would guarantee a config change later. Values still come from a
printed page, never from Claude.

**2026-08-14 — `books` is a collection, not a select.**
Fields include part number, year of the course, edition, वर्ग range and page count; `lessons`
relates to it. Rejected a fixed select, which is what produced the "eight volumes" error and
would need editing again when book four arrives around Nov 2026 – Jan 2027.

**2026-08-14 — A `lessons` entry is one topic within a वर्ग, not one वर्ग.**
वर्ग bundle unrelated topics — वर्ग 7 covers verb transitivity, writing rules, सन्धि and अव्यय —
so one entry per वर्ग would force four unrelated write-ups into one body. Rejected that in
favour of topic-level entries carrying a `varga` number and the printed page, which also makes
`topics` a genuine one-to-one spine rather than a tag cloud.

**2026-08-14 — `avyayas` merged into `vocabulary`.**
अव्यय is a `word_type` value, not a collection. Rejected the separate collection: its four
fields duplicated `vocabulary`'s exactly apart from `usage`, which is now optional there, and
two collections holding the same kind of thing let a word be entered in both with nothing
detecting it. The "browse the class whole" requirement is met by a filtered view, which also
stays correct as the list grows past what BAPS covers. Supporting evidence: BAPS marks अव्यय
inline in its શબ્દસંગ્રહ tables with a bracketed abbreviation rather than listing them apart
(`BAPS-1` p. 119).

**2026-08-14 — URLs encode identity, not navigation.**
Flat, one segment per collection: `/lessons/<slug>/`, `/dhatus/<slug>/`,
`/vocabulary/<slug>/`, `/declensions/<slug>/`, `/topics/<slug>/`, `/texts/<slug>/`,
`/notes/<slug>/`, `/books/<slug>/`, each with a plural index page.
Rejected nesting lessons under their वर्ग (`/lessons/varga-7/sandhi/`): a topic recurs at
several वर्ग as the syllabus spirals, and nesting bakes one pass's position into a permanent
URL. Ordering is navigation and belongs in a view, not an address — `/syllabus/` renders
वर्ग 1–41 in order and `/syllabus/varga-7/` lists that वर्ग's entries, both linking to the flat
lesson URLs. A lesson slug carries its वर्ग for uniqueness (`varga-07-sandhi`) because the
same topic is written up more than once.
**No locale prefix.** Chrome is English and journal prose is one language per entry, so
`/gu/` would promise a translated page that does not exist and would mislabel a Gujarati
entry sitting under `/en/`. Chrome translation, if it ever happens, is a UI toggle rather
than a second URL space. Reference entries carry all three languages on one page.
`trailingSlash: 'always'`, set explicitly, so a page is never reachable at two addresses.
**Paradigms get no page of their own.** `conjugations` render as anchored sections on the
धातु page (`/dhatus/<slug>/#kartari-lat-parasmaipada`): a paradigm without its धातु is
meaningless to a reader, and tens of thousands of near-identical thin pages would be worse
than useless to crawl. `declensions` do get pages, since a stem is a headword in its own
right.

**2026-08-14 — JSON-LD generated from provenance, never hand-written.**
Every page carries structured data derived from fields that already exist, so it cannot drift
from the content:
`books` → `Book` (author, publisher, bookEdition). `dhatus` and `vocabulary` → `DefinedTerm`
inside a `DefinedTermSet` per collection — the correct schema.org type for terminology, and it
carries `termCode` and `inDefinedTermSet`. `lessons` and `notes` → `LearningResource`, with
`about` pointing at the topic and `learningResourceType` describing what it is. `texts` →
`CreativeWork`. All pages get `BreadcrumbList` and `inLanguage`, the latter straight from the
`language` field.
The provenance block becomes `citation` and `isBasedOn` pointing at the `Book` entity — the
`source` + `locator` pair maps onto it with no extra authoring, which is the reason to do this
at all.
Rejected: marking entries with any type implying authority or credential, and rejected
`FAQPage` and similar engagement-bait types. The site is a beginner's notes and the structured
data must say so; claiming more would be both dishonest and, if a form is wrong, actively
harmful to whoever finds it in a search result.

**2026-08-14 — Reference collections are not bounded by the syllabus.**
`dhatus`, `vocabulary` and the paradigm collections hold the whole grammar — all ten गण, all
ten लकार, the full अव्यय class — not only what BAPS teaches. The syllabus is one source among
several, and the parked schema was always designed for the complete Dhātupāṭha.
**Consequence, and it is a blocker rather than a note:** the provenance rule admits no
exception, so nothing outside the books can be entered until a printed source for it is chosen
and recorded in `docs/SOURCES.md`. A धातुपाठ is already listed there as wanted; an अव्यय
source and a कोश for vocabulary are needed on the same terms.

**2026-08-14 — Exercises deferred, on scope grounds rather than copyright.**
Not built for the first version. **This does not reverse the 2026-08-13 decision, and the
reason matters:** generating exercises from the owner's own verified rows was never a
copyright problem. Reproducing BAPS's સ્વાધ્યાય is; question *formats* — fill the blank,
match, classify — are not copyrightable, only specific content is. Exercises are deferred
because a journal with no entries has nothing to generate from, not because the approach was
unsound. Revisit once roughly thirty धातु are entered.

**2026-08-14 — Nothing from the books is reproduced, including exercises.**
Tightens the standing copyright position into a rule with no judgement calls in it: no BAPS
explanation, no example sentence, no સ્વાધ્યાય question, no reading passage, no table copied
as printed. Syllabus *order* is followed, and an order is not ownable. Vocabulary, धातु and
paradigm rows are facts of the language rather than authored expression and are entered with a
page citation — but the surrounding prose is always the owner's own. The BAPS imprint reserves
all rights excepting brief quotation, so the one short quotation allowed by
`docs/PROJECT.md` stays rare and always cited.

**2026-08-14 — Cloudflare Workers, not Pages.**
Reverses the hosting half of the 2026-08-13 stack choice; the rest of that decision stands.
Cloudflare now steers new projects to Workers, but the deciding fact is narrower:
`@astrojs/cloudflare` v12 was the last version supporting Pages — v13 (March 2026) dropped it
for Workers. Keystatic's GitHub mode needs that adapter for server routes, so staying on Pages
would mean pinning to a superseded adapter or migrating with content live. A Pages project
created through the Git integration also cannot switch to Direct Upload afterwards. Taken on
an empty site, where it costs nothing.
Config lives in `wrangler.jsonc` at the repo root — static assets only for now, no Worker
script. `nodejs_compat` and a `main` entry become necessary when the adapter arrives.

---

## Open — decide before the first entry publishes

- [ ] **Content licence.** The site is free to use; that needs saying explicitly. A private
      repo does not defer this — the content is published either way. Pick one, put it in
      the repo and the site footer.
- [ ] **Contact address** for corrections — dedicated, not personal. Plus a footer privacy
      line: the form collects a name and an email address, and that needs disclosing.
- [ ] **Sources for everything outside the syllabus.** Blocking, not optional — nothing can
      be entered without one. A printed धातुपाठ for गण, पद and the attribute set (उपधा, इत्,
      सेट्/अनिट्); attribute sets differ between editions, so pick one. Plus an अव्यय source
      and a कोश for vocabulary. Record each in `docs/SOURCES.md` before entering from it.
- [ ] **The seven empty controlled lists** in `docs/CONTENT-MODEL.md` — गण, पद, लकार, लिंग,
      derivation, stem class, stem ending. `keystatic.config.ts` cannot be finalised without
      them, and Claude does not supply them.
- [ ] **Author identity in JSON-LD.** Whether the `Person` behind the site is named, and
      under what name. Affects every page's structured data.
- [ ] **JetBrains licence.** WebStorm currently shows a non-commercial-use badge. This
      project has a commercial API in its future; the parked project removed OrbStack for
      the same reason. Confirm the position and record it.

## Closed

- [x] **`Book031`–`Book036`** — confirmed as तृतीयो भागः, recoded `BAPS-3`. 2026-08-14.
- [x] **Primary language** — decided 2026-08-14, above.
- [x] **Slug convention** — decided 2026-08-14, above.
- [x] **URL structure** — decided 2026-08-14, above.
- [x] **`avyayas`** — merged into `vocabulary` 2026-08-14, above.
