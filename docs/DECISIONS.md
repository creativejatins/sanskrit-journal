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
Implemented as a Cloudflare function rather than a hosted form service: it is
stateless, so it stays inside the no-database rule, and corrections — the input to the
verification loop — stay under the owner's control. Cost: an email-sending service and about
an hour more work. A dedicated address, never a personal one.
*Amended 2026-08-18: this originally read "a Cloudflare Pages Function", written before the
Workers decision later the same day. On Workers it is a route in the Worker, not a Pages
Function. The design is unchanged; only the mechanism named was wrong.*

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

**2026-08-18 — Noto across all three scripts; serif headings, sans body.**
Body text, data and every Sanskrit form: Noto Sans, Noto Sans Devanagari, Noto Sans
Gujarati. Headings and chrome: Noto Serif, Noto Serif Devanagari, Noto Serif Gujarati.
The deciding criterion is that **Gujarati's nearest neighbour on the page is Devanagari, not
Latin** — a reference entry puts a Gujarati gloss one row from a Hindi one, so disagreement
between the two Indic faces is the visible failure. Noto is the only collection with Latin,
Devanagari and Gujarati co-designed.
Rejected **Rasa** for Gujarati: a good face, but drawn against a Latin companion rather than
a Devanagari one.
Rejected **Tiro Devanagari Sanskrit**, and the reason is worth recording because it will be
rediscovered. It is on paper the ideal face for this site — Hudson and Ross, originating in
the Murty Classical Library types, traditional conjuncts, Vedic accent support, a Latin
subset carrying transliteration diacritics. Two facts rule it out: the Tiro Indic collection
has **no Gujarati** (Bangla, three Devanagari cuts, Gurmukhi, Kannada, Malayalam, Sinhala,
Tamil, Telugu), so adopting it puts two unrelated Indic faces on every reference page; and it
ships regular and italic only, no bold.
Sans for body is not only a stroke-robustness argument. Verified against `BAPS-1` p. 31: the
book sets both scripts in a modern, lightly modulated style with horizontal half-form
conjuncts and no traditional stacked ligatures. A learner mapping screen to printed page
should not have to cross a typographic gap as well.

**2026-08-18 — A Sanskrit form is set one way, everywhere.**
One face, one weight, one colour — Noto Sans Devanagari — wherever it appears: headword,
paradigm cell, heading, inline in prose. This generalises the standing rule against colouring
a Sanskrit form. A headword is a heading by position but **data** by nature, and if it renders
serif as a title and sans in the cell below it, the same form looks like two things on one
page. Overrides the serif-heading rule wherever the two conflict.

**2026-08-18 — Fonts self-hosted, static cuts, subsets merged.**
Rejected linking Google's CSS API. Cache partitioning ended the cross-site cache benefit and
it costs two connections before first text paint, but the deciding reason is narrower: the
metric-reconciliation plan requires editing `@font-face` descriptors — `size-adjust`,
`ascent-override`, `unicode-range` — and the CDN hands you a stylesheet you do not control.
Files come from Fontsource for versioning; the `@font-face` block is written by hand.
Static packages, not `@fontsource-variable/`: two weights are wanted, and two static cuts are
smaller than one variable file carrying a width axis that will never be used.
The Indic packages' own `latin` subsets are **excluded** — copying them puts a second Latin in
the stack and makes the `unicode-range` binding ambiguous, which is the failure the binding
exists to prevent.
Latin `latin` and `latin-ext` are **merged into one file per weight** with `pyftsubset`.
Fontsource splits them so a site that never uses accented characters can skip the second file;
IAST appears on every reference page here, so the split buys two requests for content that
always both load.
No synthesised italics for Devanagari or Gujarati — neither script has an italic tradition and
an oblique shears the शिरोरेखा.
**Font binaries are committed.** They are OFL and the repo is their proper home. The
never-commit rule is about the BAPS scans, not about assets generally. `OFL.txt` travels with
the files, as the licence requires.

**2026-08-18 — Light palette. Dark mode deferred, not rejected.**
Cool, pale, restrained; body text near-black at full contrast. Dark is deferred for a reason
specific to this site rather than taste: light-on-dark blooms, so strokes thicken optically
and counters close. Devanagari at 400 on a near-black ground smears conjuncts and thickens the
शिरोरेखा toward a bar — dark is the **harder** mode for this script, not the easier one.
Recorded because a dark mockup will look good again and this will otherwise be re-argued. When
it returns it is a token swap plus its own contrast pass, possibly at a heavier Devanagari
weight, and it comes after light rather than instead of it.

**2026-08-18 — How a reference entry presents.**
Settled together because they are one page's worth of decisions:
**Provenance sits above the headword**, as a thin line — source code, page, date. It reads as
a filing reference before the reader meets the word, which is the right order for a claim
about the whole entry.
**Glosses are stacked full-width labelled rows**, one per language, never columns. Three
columns of Devanagari or Gujarati give roughly ten characters a line.
**Empty fields render their label with an em-dash**, never hidden. The journal is honest about
its gaps.
**No drop caps.** Devanagari has no floatable first letter — the headline stroke runs
continuously and a matra can precede the consonant it modifies.
**Paradigm tables render at full height** — eight rows for `declensions`, including सम्बोधन —
so the shape does not change when real data lands. No horizontal banding: it competes with
Devanagari's headline stroke. On mobile, horizontal scroll with a sticky first column;
stacking destroys the grid, and the grid is what is being memorised.
**No unsourced data visualisations.** Generalised from a generated mockup that displayed a
corpus-frequency chart: no source, no locator, unverifiable, and therefore impossible under the
provenance rule. Anything on the page is a row someone can re-check.

**2026-08-18 — Field labels are in the source's own terms; English is secondary.**
Site chrome stays English — nav, search, buttons — per the primary-language decision. Field
*labels* are not chrome. विभक्ति and वचन names, paradigm headers and collection field labels
display in the source's own terms, with English small, secondary or on hover. Rendering
"Nominative / Singular" makes the owner translate in his head between the site and the book he
is examined on. `CONTENT-MODEL.md` already set this precedent by naming the person cells
प्रथम / मध्यम / उत्तम.
Field *names* stay ASCII `snake_case`. This is a display layer only.
Held in **`src/data/labels.yaml`, configuration rather than a collection.** A collection would
demand provenance rows for what is really a name-to-label translation table.
**It ships empty.** Every non-English value in it is a term from a printed page, so it is an
eighth blocked controlled list — and the largest, covering every field across nine
collections. Listed under Open below.

**2026-08-18 — Design-tool output is reference only; nothing from it enters the repo.**
Shuffle and Stitch are used to see arrangement, density and hierarchy. No markup, no CSS, no
colour values and no text are copied — the token layer and the metric overrides are the design
system, and generated utility classes bypass both.
The rule is not fastidiousness. Asked explicitly and repeatedly not to, a generator produced
invented Devanagari, IAST, paradigm cells and a page citation, all of it plausible and none of
it reviewable. That is exactly the error the owner cannot yet catch, and mockup text has a way
of surviving into a real page. Screenshots, not markup.

**2026-08-18 — One Indic family per element, driven by `lang`.**
Noto's Devanagari and Gujarati ranges overlap on U+0951-0952, U+0964-0965, U+200C-200D,
U+20B9, U+25CC and U+A830-A839. Overlapping ranges resolve by position in the `font-family`
list, not by specificity, so any stack naming both families renders those codepoints
non-deterministically.
Rejected fix: stripping the shared codepoints from the Gujarati range. It looks correct and
is wrong. `unicode-range` gates which codepoints a face may serve **at all**, not merely how
a stack resolves — stripping U+0964 stopped Gujarati using its own danda even in an element
naming only Gujarati. Gujarati's danda is 597 units against Devanagari's 622, drawn shorter
to match Gujarati's proportions, and the strip discarded it. Rendered before and after in
Chrome and measured by canvas ink: 179px against 186px.
Adopted instead: **every element declares exactly one Indic family, driven by the `lang`
attribute.** The ranges then never compete and each script keeps its own punctuation. If a
combined Indic stack ever becomes unavoidable, Devanagari goes first.
Recorded because the rejected fix will look right again to anyone meeting the overlap
without knowing what `unicode-range` does.

**2026-08-18 — `size-adjust` is tuned from rendered ink, not from `sxHeight`.**
`sxHeight` reads 536 on five of six families, including both Indic ones. Devanagari has no
x-height; the field is nominal. The height that must match Latin x-height is
शिरोरेखा-to-baseline, which appears in no metrics table and has to be measured from rendered
ink — the same canvas technique that settled the danda. Run 1b therefore ends at a visual
check rather than a computed value.

**2026-08-18 — Typo metrics govern; win metrics are disregarded.**
`fsSelection` bit 7 (USE_TYPO_METRICS) is set in all six 400 files, and the OS/2 typo values
match hhea throughout. Browsers honouring the bit take typo, so the win values — which
diverge sharply, Noto Sans Devanagari at 1348/558 against 896/-408 — never reach the page and
are not tuned against.
The gap the overrides must close, all at unitsPerEm 1000: Latin 1069/-293; Sans Devanagari
and Gujarati 896/-408; Serif Devanagari 930/-625, a 1555 line box against Serif Latin's 1362.
Co-design gave shape harmony, not metric harmony, as the font-stack entry predicted.

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
- [ ] **`src/data/labels.yaml`** — the display labels for every field across nine
      collections, plus the विभक्ति, वचन and पुरुष names used as paradigm headers. Blocking
      for page templates the way the seven lists are blocking for the config, and larger
      than all seven together. Same rule: from a printed page, never from Claude.
- [ ] **Block-consistency validation in the CSV → YAML validator.** Every character in a
      field must sit in the Unicode block its language declares. Five accidental script
      mixes appeared across twelve specimen strings during entry — a Gujarati word ending
      in a Devanagari character, a Devanagari word switching mid-token, two words joined
      without a space. None was visible by eye; all were found by codepoint check. The
      risk is highest on long compounds, which is most of `dhatus` and `declensions`.
      A five-line check catches all of it; without it the same error publishes silently.
      This is a requirement for the validator, not a new decision.
- [ ] **Author identity in JSON-LD.** Whether the `Person` behind the site is named, and
      under what name. Affects every page's structured data.
- [ ] **JetBrains licence.** WebStorm currently shows a non-commercial-use badge. This
      project has a commercial API in its future; the parked project removed OrbStack for
      the same reason. Confirm the position and record it.

## Closed

- [x] **Specimen strings for the type run** — supplied 2026-08-24, in
      `src/data/specimen.yaml`. Ten slots plus a mixed-script line, each verified
      block-consistent by codepoint. The IAST row and cmap grid are generated
      mechanically from the `unicode-range` declarations rather than typed, so no
      transliteration is authored. Unblocks Run 1b.
- [x] **`Book031`–`Book036`** — confirmed as तृतीयो भागः, recoded `BAPS-3`. 2026-08-14.
- [x] **Primary language** — decided 2026-08-14, above.
- [x] **Slug convention** — decided 2026-08-14, above.
- [x] **URL structure** — decided 2026-08-14, above.
- [x] **`avyayas`** — merged into `vocabulary` 2026-08-14, above.
