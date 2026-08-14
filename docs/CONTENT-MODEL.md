# Content model

Seven Keystatic collections. Field names below are indicative; the authoritative definition
is `keystatic.config.ts` once written.

**Two principles run through all of it.** Anything with a fixed list is a `select` or a
`relationship`, never free text. Every entry carries `source_type`, `source` and `locator`.

---

## Shared fields — on every collection

| Field | Type | Notes |
|---|---|---|
| `title` | text | |
| `slug` | slug | **permanent once created** |
| `date` | date | when written |
| `source_type` | select | `print` \| `video` |
| `source` | select | short code from `docs/SOURCES.md` |
| `locator` | text | `p. 10`, `પાઠ ૩ p. 24`, `14:32` |
| `topics` | array of relationship → `topics` | |
| `status` | select | `draft` \| `published` — drafts do not render |

---

## Journal collections

### `lessons` — a BAPS syllabus unit

| Field | Type | Notes |
|---|---|---|
| shared fields | | `source` will usually be a BAPS volume |
| `book` | select | which volume |
| `lesson_number` | integer | lets the site render in syllabus order |
| `dhatus_introduced` | array of relationship → `dhatus` | |
| `vocabulary_introduced` | array of relationship → `vocabulary` | |
| `body` | markdown | the owner's own words |

### `texts` — a श्लोक or स्तोत्र, broken down

The one genuinely nested collection. One entry holds many verses; each verse holds many
words.

| Field | Type | Notes |
|---|---|---|
| shared fields | | |
| `text_name` | text | विष्णुसहस्रनाम, गणेश अथर्वशीर्ष … |
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

### `notes` — anything else

| Field | Type | Notes |
|---|---|---|
| shared fields | | often `source_type: video` |
| `body` | markdown | |

---

## Reference collections

Each entry is a small YAML file with no prose body. These are the searchable, sortable,
filterable lists.

### `dhatus`

Designed for the full Dhātupāṭha — roughly two thousand entries across ten गण — not only
what BAPS covers.

| Field | Type | Notes |
|---|---|---|
| shared fields | | |
| `dhatu` | text | Devanagari, as printed |
| `iast` | text | |
| `gana` | select | ten fixed options, **from print, filled once** |
| `pada` | select | fixed options |
| `artha` | text | as the source gives it |
| `notes` | text | |

> The ten गण values and the पद values must be entered from a printed page before the config
> is finalised. Claude does not supply them.

**Scale note.** Two thousand YAML files are fine for Git, for Astro's build, and for
client-side filtering. The pressure point is Keystatic's admin list view in GitHub mode.
Measure rather than predict: at three to four hundred entries, check whether the list still
feels quick. If not, split `dhatus` into ten collections by गण — a config change, not a data
migration.

### `vocabulary`

| Field | Type | Notes |
|---|---|---|
| shared fields | | |
| `word` | text | Devanagari |
| `iast` | text | |
| `word_type` | select | नाम / विशेषण / सर्वनाम / अव्यय / क्रियापद — **the five from BAPS ભાગ ૧ p. 10** |
| `meaning` | text | |
| `from_dhatu` | relationship → `dhatus`, optional | |

### `avyayas`

Kept separate from `vocabulary` deliberately — अव्यय is a closed, listable class the owner
wants to browse whole.

| Field | Type | Notes |
|---|---|---|
| shared fields | | |
| `avyaya` | text | |
| `iast` | text | |
| `meaning` | text | |
| `usage` | text | |

### `topics`

The spine. What ties a BAPS lesson, an LSK page and a video note about सन्धि into one place.

| Field | Type |
|---|---|
| `name` | text |
| `slug` | slug |
| `description` | text |

Add topics as they are met. One spelling per topic, always.

---

## Search and filtering

Astro reads all entries at build and emits a JSON index. The browser filters it. Two
thousand धातुs is a couple of hundred kilobytes — instant, no server.

No database is needed for sort, search or filter at this scale. See `/CLAUDE.md` for when
that changes.

---

## The eventual import

Every reference entry maps one-to-one onto the parked schema:

| Here | `schema-draft-7` |
|---|---|
| one file in `content/dhatus/` | one row in `dhatus` |
| `select` for गण | `gana_id` FK → the lookup row with that code |
| `relationship` storing a slug | FK, resolved by slug at import |
| `source` + `locator` | the provenance block — `source_id`, `citation` |

The import is a loop: read the folder, parse the front-matter, `INSERT`. It is short. What
makes a migration expensive is data quality, never storage format — which is why the three
rules in `/CLAUDE.md` exist.
