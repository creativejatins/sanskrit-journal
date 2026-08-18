# Content model

Eight Keystatic collections — `books`, `lessons`, `texts`, `notes`, `dhatus`, `vocabulary`,
`conjugations`, `declensions`, plus `topics` as the spine. Field names below are indicative;
the authoritative definition is `keystatic.config.ts` once written.

**Three principles run through all of it.**

1. Anything with a fixed list is a `select` or a `relationship`, never free text.
2. Every entry carries `source_type`, `source` and `locator`.
3. **Claude does not supply any Sanskrit value.** Every controlled list below is left empty
   with a page reference. See [Values still to be entered](#values-still-to-be-entered).

---

## Conventions

**Field names are ASCII `snake_case`**, never Devanagari. Field names end up in front-matter
keys, TypeScript types and eventually column names; Devanagari keys would work in YAML and
break somewhere downstream.

**Translatable fields carry a language suffix** — `_gu`, `_hi`, `_en`. Fallback order
gu → en → hi. Reference collections use suffixes; journal prose does not (see below).

**IAST is not a language.** It pairs with the Devanagari field, so every collection holding
a Sanskrit headword has both `<thing>` (Devanagari) and `<thing>_iast`. IAST never appears
in the language suffixes.

**Slugs are ASCII-folded IAST with the disambiguator always appended.** Permanent once
created. Patterns in `docs/DECISIONS.md`.

---

## Shared fields — on every collection

| Field | Type | Notes |
|---|---|---|
| `title` | text | |
| `slug` | slug | **permanent once created** |
| `date` | date | when written |
| `source_type` | select | `print` \| `video` |
| `source` | select | short code from `docs/SOURCES.md` |
| `locator` | text | `p. 31`, `14:32`. Never repeats the book — the `source` code carries it |
| `topics` | array of relationship → `topics` | see the `lessons` exception |
| `status` | select | `draft` \| `published` — drafts do not render |

---

## Journal collections

Written on a day, in prose, in Keystatic.

**Journal prose is one language per entry**, marked with a `language` field — not the
suffixed scheme. Requiring three bodies per lesson would leave two empty forever.

### `books` — a BAPS volume

Not prose, but it belongs with `lessons`. A collection rather than a select so book four
lands as an entry, not a config change.

| Field | Type | Notes |
|---|---|---|
| `slug` | slug | `baps-1`, `baps-2`, `baps-3` — matches the `source` code |
| `title_as_printed` | text | as the title page gives it; not translated |
| `part_number` | integer | 1, 2, 3 |
| `course_year` | integer | 1 or 2 — not derivable from `part_number` |
| `edition` | text | |
| `published` | text | as printed |
| `varga_start` | integer | |
| `varga_end` | integer | |
| `page_count` | integer | |

> **Known duplication.** `docs/SOURCES.md` is authoritative for bibliography; this
> collection exists so the site can render syllabus order and वर्ग ranges. The `source`
> select therefore overlaps `books` for BAPS entries. Tolerable now. If a second source ever
> needs structural metadata, the right fix is a `sources` collection with `source` as a
> relationship — raise it then, do not build it now.

### `lessons` — one topic within a वर्ग

**Not one entry per वर्ग.** A वर्ग bundles unrelated topics, so the entry is the topic.

| Field | Type | Notes |
|---|---|---|
| shared fields | | `source` is a BAPS book code |
| `language` | select | `gu` \| `hi` \| `en` |
| `book` | relationship → `books` | |
| `varga` | integer | 1–41 today, continuous across books, extends with book four |
| `sequence_in_varga` | integer | orders several topics inside one वर्ग |
| `topic` | relationship → `topics` | **single and required** — replaces the shared `topics` array here |
| `dhatus_introduced` | array of relationship → `dhatus` | |
| `vocabulary_introduced` | array of relationship → `vocabulary` | |
| `body` | markdown | the owner's own words |

`varga` + `sequence_in_varga` gives syllabus order across the whole course without needing
`book`, which is why `book` is a convenience rather than the sort key.

### `texts` — a श्लोक or स्तोत्र, broken down

One entry holds many verses; each verse holds many words.

| Field | Type | Notes |
|---|---|---|
| shared fields | | |
| `language` | select | of the owner's prose, not of the verse |
| `text_name` | text | |
| `verses` | array of object | repeatable |
| — `number` | text | |
| — `mula` | text | the verse as printed |
| — `sandhi_viccheda` | text | |
| — `words` | array of object | |
| — — `word` | text | |
| — — `analysis` | text | |
| — — `meaning` | text | |
| — `anvaya` | text | |
| — `translation` | text | |
| — `notes` | markdown | |

> **मनोयत्नः passages do not go here.** The thirteen reading pieces across the three books
> are BAPS's own text and reproducing them is exactly what the copyright position forbids.
> Write a `notes` entry *about* one — what was understood, what was looked up — citing book
> and page. This is why no prose-passage collection exists: the gap is real but it must not
> be filled.

### `notes` — anything else

| Field | Type | Notes |
|---|---|---|
| shared fields | | often `source_type: video` |
| `language` | select | |
| `body` | markdown | |

---

## Reference collections

Small YAML files, no prose body. Searchable, sortable, filterable.

**Two authoring routes.** `dhatus`, `vocabulary` and `topics` are entered in Keystatic.
`conjugations` and `declensions` are **not** — they come from a spreadsheet mirroring the
printed table, converted and structurally validated. Typing ninety forms into a web form is
where errors the owner cannot catch get in.

### `dhatus`

Designed for the full Dhātupāṭha across all ten गण, not only what BAPS covers.

| Field | Type | Notes |
|---|---|---|
| shared fields | | |
| `dhatu` | text | Devanagari, as printed |
| `dhatu_iast` | text | |
| `gana` | select | ten options — **empty, from print** |
| `pada` | select | **empty, from print** |
| `kriyapada` | text | the third printed column — the form BAPS prints beside each धातु and expects memorised with it |
| `artha_gu` | text | as the source gives it |
| `artha_hi` | text | |
| `artha_en` | text | |
| `notes` | text | |

**`kriyapada` is new.** BAPS's ધાતુસંગ્રહ is three columns — धातु, अर्थ, and a form — and the
previous model had nowhere to put the third. It is a Sanskrit form, so it is entered from the
page like any other.

> **Entry hazard — read this before entering धातु.** In all three books, **गण and पद are
> section headings, not row values.** A table is titled by पद and introduced as a given गण;
> the rows carry only धातु, अर्थ and the form. Copying a row without carrying the heading down
> is the single most likely way a wrong गण enters this repo, and it recurs in every गण वर्ग
> across the syllabus. **Enter a whole table at a time, not a row at a time**, and record the
> heading's page alongside the row's page where they differ.

**Attributes deferred.** उपधा, इत्, सेट्/अनिट् and the rest are *not* fields yet. They need a
printed धातुपाठ, and attribute sets differ between editions. Adding an empty controlled field
before a source exists invites filling it by inference — and several of these are derivable
by rule, which is precisely the category of value that looks obvious and is wrong. Add each
when the edition is chosen and recorded in `docs/SOURCES.md`.

**Scale note.** Two thousand YAML files are fine for Git and for Astro's build. The pressure
point is Keystatic's admin list view in GitHub mode. Measure rather than predict: at three to
four hundred entries, check whether the list still feels quick. If not, split by गण — a
config change, not a data migration.

### `vocabulary`

Now carries the two axes the syllabus actually organises vocabulary by.

| Field | Type | Notes |
|---|---|---|
| shared fields | | |
| `word` | text | Devanagari |
| `word_iast` | text | |
| `word_type` | select | નામ / વિશેષણ / સર્વનામ / અવ્યય / ક્રિયાપદ — **the five from `BAPS-1` p. 10** |
| `linga` | select | three options — **empty, from print**. Required where `word_type` is a noun |
| `stem_ending` | select | **empty, from print** |
| `meaning_gu` | text | |
| `meaning_hi` | text | |
| `meaning_en` | text | |
| `usage_gu` / `_hi` / `_en` | text, optional | mainly for अव्यय |
| `from_dhatu` | relationship → `dhatus`, optional | |

**`linga` and `stem_ending` are new, and they are the largest gap the syllabus reading
found.** Whole वर्ग are organised by gender and by stem-ending — vowel-final classes through
book one and two, consonant-final classes through book three. Without both fields roughly a
third of book three cannot be represented, and the classification exercises `PROJECT.md`
describes cannot be generated.

### `avyayas` — merged into `vocabulary`

**Decided 2026-08-14. The separate collection is gone.** अव्यय is a `word_type` value, so the
whole class is a filtered view of `vocabulary` — which is what "browse the class whole"
actually needs, and it stays correct as the list grows past what BAPS covers.

The deciding argument was an error mode, not tidiness: two collections holding the same kind
of thing means a word can be entered in both and nothing detects it. `avyaya` / `iast` /
`meaning` duplicated `word` / `word_iast` / `meaning_*` exactly, and the only distinct field,
`usage`, is now optional on `vocabulary`.

Supporting evidence: BAPS marks अव्यय **inline** in its શબ્દસંગ્રહ tables with a bracketed
abbreviation rather than listing them apart (`BAPS-1` p. 119) — the source treats it as a
word type, not a separate list.

### `conjugations` — one printed paradigm table

Grain: one entry per (धातु × derivation × लकार × पद), because that is exactly one printed
table, on one page, with one `source` and one `locator`.

| Field | Type | Notes |
|---|---|---|
| shared fields | | |
| `dhatu` | relationship → `dhatus` | |
| `derivation` | select | **empty, from print** — कर्तरि / कर्मणि–भावे / प्रेरक and later additions |
| `lakara` | select | ten options — **empty, from print** |
| `pada` | select | **empty, from print** |
| `prathama_eka` … `uttama_bahu` | text ×9 | the grid |
| `notes` | text | |

**Why the cells are named `prathama` / `madhyama` / `uttama`.** The Sanskrit पुरुष order is
the reverse of the English one — प्रथम पुरुष is not the English "first person". Naming these
fields `first_person_singular` would embed that mismatch permanently and mislead every future
reader of the data. The field names follow the source's own ordering instead.

**Nine cells, all required.** The validator rejects a partial table. A gap in a printed
paradigm is a fact about the page and belongs in `notes`, not in a silently empty cell.

### `declensions` — one printed शब्दरूप table

Separate from `conjugations` because the grid differs and a shared collection would accept
either shape, leaving the validator nothing to check.

| Field | Type | Notes |
|---|---|---|
| shared fields | | |
| `stem` | text | Devanagari |
| `stem_iast` | text | |
| `stem_class` | select | **empty, from print** — नाम / विशेषण / सर्वनाम / कृदन्त / सङ्ख्या |
| `stem_ending` | select | **empty, from print** |
| `linga` | select | **empty, from print** |
| `from_dhatu` | relationship → `dhatus`, optional | कृदन्त decline but derive from a धातु |
| `prathama_eka` … `sambodhana_bahu` | text ×24 | eight rows × three numbers |
| `notes` | text | |

**कृदन्त live here, not in `conjugations`.** Book three spends four वर्ग on participles and
they take the declension grid across three genders. That is the reason the two collections
exist.

> **The eighth row.** BAPS prints सम्बोधन as an eighth row in its paradigm tables. Whether it
> is a विभक्ति in its own right is a grammatical question; the model mirrors the printed table
> and takes no position. If your reading later says otherwise, that is a `notes` matter, not
> a schema change.

### `topics`

The spine. Ties a BAPS lesson, an LSK page and a video note about one subject together.

| Field | Type | Notes |
|---|---|---|
| `slug` | slug | ASCII, permanent |
| `name_gu` / `_hi` / `_en` | text | |
| `description_gu` / `_hi` / `_en` | text | |
| `first_varga` | integer, optional | where the syllabus first introduces it |

Add topics as they are met. One spelling per topic, always.

**Topics are not one-per-वर्ग.** सन्धि, विभक्ति, अव्यय, तद्धित and विशेषण each recur at
increasing depth across the three books — the syllabus spirals. A topic gathers every pass
over it; `first_varga` records where it started.

---

## Values still to be entered

Every list below is **empty in the config** and must be filled from a printed page before
that field is used. Claude does not supply them, including where Claude has read the scan —
the rule is that the owner has read the page.

| Field | Options | Where to look |
|---|---|---|
| `dhatus.gana` | 10 | a printed धातुपाठ; BAPS names गण at each गण वर्ग heading |
| `dhatus.pada` | 3 | `BAPS-1` p. 31 heading, and the धातुसंग्रह headings in `BAPS-3` |
| `conjugations.lakara` | 10 | outside the syllabus — BAPS teaches four |
| `conjugations.derivation` | 3+ | `BAPS-3` वर्ग 37 and 40 |
| `vocabulary.linga`, `declensions.linga` | 3 | `BAPS-1` from p. 56 |
| `vocabulary.stem_ending`, `declensions.stem_ending` | open | vowel-final in `BAPS-1`/`BAPS-2`; consonant-final in `BAPS-3` वर्ग 30, 35, 39, 41 |
| `declensions.stem_class` | 5 | across all three books |

`vocabulary.word_type` is already filled from `BAPS-1` p. 10 and is the model for the rest:
values in the source's own script, with the page recorded.

### `src/data/labels.yaml` — the eighth blocked list

Not a collection. **Configuration**: a translation table mapping each ASCII field name to the
label shown on the page, in the source's own terms, with English secondary.

```
field_name:
  gu: ""
  hi: ""
  en: ""
```

Covers every field across all nine collections, plus the विभक्ति, वचन and पुरुष names that
head the paradigm tables. It is larger than the seven lists above put together, and it blocks
page templates the way those block `keystatic.config.ts`.

Held as a file rather than a collection because a collection would demand a `source` and
`locator` on each row, and a label is not an entry. The terms in it still come from a printed
page — noting where each set was read, in a comment at the head of the file, is enough.

Decided 2026-08-18. Field *names* remain ASCII `snake_case`; this is a display layer only.

---

## Search and filtering

**The previous claim in this document — that the browser downloads every entry and filters
it — is withdrawn.** It was true for two thousand headwords. With all ten लकार the form count
runs to tens or hundreds of thousands, which is megabytes.

Three layers instead, all built at build time, none of them a database:

1. **Headword index**, shipped to the browser — धातु, गण, पद, अर्थ. A couple of thousand rows,
   a few hundred kilobytes. Filters client-side exactly as before.
2. **Forms**, rendered onto statically generated per-धातु pages. Never shipped as a blob.
3. **Reverse lookup** (a form met in a श्लोक → its धातु), a sharded inverted index generated at
   build. This is the one query that resembles a join, and it is solvable statically because
   the data is read-only and changes only on commit.

Git stays the source of truth. The indexes are derived, disposable and regenerable. The
revisit condition in `/CLAUDE.md` is unchanged.

---

## Validation

The converter for `conjugations` and `declensions` checks **shape, never content**:

- every cell present for the declared grid
- `gana`, `pada`, `lakara`, `linga` each one of the declared options
- `source` a known code, `locator` non-empty
- every relationship resolving to an entry that exists
- no duplicate slug

This is the division of labour in `/CLAUDE.md`: structure is machine-checkable, correctness
is not. A validator pass means the table is well-formed, not that the forms are right. Only
the printed page settles that.

---

## The eventual import

| Here | `schema-draft-7` |
|---|---|
| one file in `content/dhatus/` | one row in `dhatus` |
| `select` for गण | `gana_id` FK → the lookup row with that code |
| `relationship` storing a slug | FK, resolved by slug at import |
| `source` + `locator` | the provenance block — `source_id`, `citation` |
| one file in `content/conjugations/` | one row in the forms table, or nine |
| `_gu` / `_hi` / `_en` suffixed fields | rows in a translations table — `(entity, field, lang, value)` |
| `content/books/` | the syllabus structure tables |

The import is a loop: read the folder, parse the front-matter, `INSERT`. What makes a
migration expensive is data quality, never storage format — which is why the three rules in
`/CLAUDE.md` exist.
