# Sources

Every entry cites one of these by short code. Add a source here **before** citing it.

The short code is what goes in an entry's `source` field. Codes are permanent.

---

## Syllabus

### `BAPS-1`, `BAPS-2`, `BAPS-3` — and `BAPS-4` reserved

**प्रमुखसंस्कृत-अध्ययनम्** — the syllabus the owner is examined on.
लेखकः — साधु आत्मतृप्तदासः.
प्रकाशकः — BAPS स्वामिनारायण-संस्कृत-महाविद्यालयः, सारङ्गपुरम् (BAPS Swaminarayan Sanskrit
Mahavidyalay, Sarangpur – 382450, India).
Inspirer — Mahant Swami Maharaj.

Named on the imprint of भाग २ and भाग ३ (identical in both): Content Editor Sadhu
Bhaktisagardas; Contributing Editors Sadhu Gnannayandas, Harikrushna Pedhadiya, Harsh
Vinchhi; Content Researchers Tirth Patel, Jeet Soni, Pratik Patel, Dhruv Raval, Harsh
Zinzuvadiya, Harsh Patel; Copy Editor Sadhu Dharmasetudas; Layout Editors Sadhu
Dharmasetudas and Harsh Vinchhi; Production Editor Sadhu Gnantruptdas.

**Second Edition, July 2024** — as printed on भाग २ and भाग ३.

Rights as printed: Copyright © Swaminarayan Sanskrit Mahavidyalay, all rights reserved,
excepting brief quotations in reviews and articles. See `docs/PROJECT.md` for the position
this project takes.

**Three books, one continuous syllabus.** A fourth is expected around Nov 2026 – Jan 2027.

| Code | Book | वर्ग | Printed pages | Course |
|---|---|---|---|---|
| `BAPS-1` | प्रथमो भागः | 1–14 | 1–119 | Year 1, book 1 |
| `BAPS-2` | द्वितीयो भागः | 15–28 | 1–232+ | Year 1, book 2 |
| `BAPS-3` | तृतीयो भागः | 29–41 | 5–301 | Year 2, book 1 |
| `BAPS-4` | *(reserved)* | 42– | | Year 2, book 2 |

वर्ग numbering runs continuously across all three books and does not restart. Page numbering
restarts in each book, so a locator is only meaningful with its book code.

**Locator format:** `p. 31`. The book is carried by the `source` code, never repeated in the
locator.

#### Scan files are not citation units

The PDFs are ZIP archives of JPEGs, one book split across several files. **Never cite a scan
file.** Cite the book code and the printed page. This table is a finding aid only.

| Book | File | Printed pages | Verified |
|---|---|---|---|
| `BAPS-1` | પ્રથમ ભાગ 1 | 1–55 (file pages 3–57; 1–2 are the अनुक्रमणिका) | yes |
| | પ્રથમ ભાગ 2 | 56–119 | yes |
| `BAPS-2` | દ્વિતીય ભાગ 1 | 1–43 (file pages 1–10 are front matter) | yes |
| | દ્વિતીય ભાગ 2 | 44–101 | yes |
| | દ્વિતીય ભાગ 3 | 102–140 | **no — interpolated** |
| | દ્વિતીય ભાગ 4 | 141–144 | yes |
| | દ્વિતીય ભાગ 5 | 145–197 | yes |
| | દ્વિતીય ભાગ 6 | 198–244 | yes |
| `BAPS-3` | Book031 | 5–37 (file pages 1–14 are front matter) | yes |
| | Book032 | 38–89 | yes |
| | Book033 | 90–149 | **no — interpolated** |
| | Book034 | 150–194 | **no — interpolated** |
| | Book035 | 195–243 | **no — interpolated** |
| | Book036 | 244–301 | **no — interpolated** |

`BAPS-1` and `BAPS-2` carry an OCR text layer. `BAPS-3` does not; its pages must be read as
images.

#### Verified pages

- `BAPS-1` p. 10 — ભાષાનાં અંગો, the five parts of speech, with a worked example sentence.
  Confirmed present at that page in the अनुक्रमणिका. This is the page `vocabulary.word_type`
  cites.
- `BAPS-1` pp. 1–2 (अनुक्रमणिका), p. 6 (a स्वाધ્યાય), p. 31 (ધાતુસંગ્રહ opening), p. 119 (last page).
- `BAPS-2` title page and imprint; अनुक्रमणिका; pp. 44, 141, 145, 198.
- `BAPS-3` title page and imprint; अनुक्रमणिका; pp. 38.

#### Known defects in the printed अनुक्रमणिका

`BAPS-1` and `BAPS-2` contents pages matched the body on every page checked — four of four.

`BAPS-3` contents is **not** reliable. Two discrepancies found on the two pages checked:
वर्ग 41 is listed at a page later than its own first sub-heading, and महद्रूपाणि is listed at a
page later than where the heading actually appears. **Take locators for `BAPS-3` from the
printed page itself, never from its contents listing.**

#### Gaps

- **`BAPS-1` has no imprint.** Its scan opens at the अनुक्रमणिका and ends at p. 119 with no
  title page and no colophon. Author, edition and date are unrecorded and cannot be
  recovered from these files — they need the physical book. Until then, do not assume it
  matches भाग २ and भाग ३.
- `BAPS-2`'s final printed page is unconfirmed; 232 is the last page named in its contents
  and the scan runs to roughly 244.

---

## शिक्षा

### `PS-MAHATO` — primary शिक्षा source

पाणिनीय-शिक्षा, विस्तृत शोधपूर्ण हिन्दी व्याख्या.
सम्पादक एवं हिन्दी व्याख्याकार: विद्यासागर डॉ. दामोदर महतो.
Motilal Banarsidass, Delhi. प्रथम संस्करण 1990, पुनर्मुद्रण 1999.
Scan marked CC-0 — Gurukul Kangri University Haridwar Collection, digitised by
S3 Foundation USA.

Pages read: ix–xii (the sixty-four वर्ण enumeration), xi (यम, with four authorities quoted).

### `PS-KALIDAS` — confirming शिक्षा source

पाणिनीयशिक्षा, त्रिनयन संस्कृतभाष्य + चिन्तामणि हिन्दी भाषान्तर.
भाष्यकृत्: अवस्थी बच्चूलालो ज्ञानोपाह्वः.
भाष्य-भाषान्तरकारः सम्पादकश्च: बालकृष्णः शर्मा. सहसम्पादकः: सन्तोषः पण्ड्या.
प्रकाशकः: श्रीनिवासरथः, उज्जयिनीस्थ-कालिदास-अकादेमी-निदेशकः.
आचार्यकुलप्रकाशनम्. **विक्रमसंवत् २०५०** (Gregorian equivalent spans two years; not recorded).

Pages read: 16 (enumeration), 58 (चत्वारो यमाः).

---

## व्याकरण

### `LSK-GPS`

लघुसिद्धान्तकौमुदी, श्रीमद्वरदराजाचार्यप्रणीता.
श्रीधरमुखोल्लासिनी-हिन्दी-व्याख्यासमन्विता.
व्याख्याकारः: गोविन्द प्रसाद शर्मा (गोविन्दाचार्यः). चौखम्बा.

Pages read: संज्ञाप्रकरणम् opening (the fourteen माहेश्वरसूत्राणि, एषामन्त्या इतः,
हकारादिष्वकार उच्चारणार्थः, लण्मध्ये त्वित्संज्ञकः), pp. 3, 5, 6.

---

## Video

### `DEVVANI`

**devvani sanskritam** — YouTube, channel `UC_GCTK6v1eIIpyfXyVsKz-g`.
Self-described scope: spoken Sanskrit, Sanskrit grammar, conversation, Pāṇinian grammar —
संस्कृत संभाषण, संस्कृत व्याकरण, पाणिनीय व्याकरण.

Locator format: `Video title — mm:ss`. Record the video URL on the entry.

---

## Wanted

Sources needed but not yet held. Nothing here may be cited.

The reference collections are deliberately not bounded by the syllabus — all ten गण, all ten
लकार, the whole अव्यय class. The provenance rule admits no exception, so **each of these is a
blocker, not a wish list**: nothing outside the books can be entered until its source is
chosen and recorded here.

- **A printed धातुपाठ**, for गण, पद and the attribute set (उपधा, इत्, सेट्/अनिट् and the rest).
  The syllabus teaches roughly half the गण and four of the ten लकार, so the attributes and
  the remaining paradigms must come from outside it. Edition matters — attribute sets differ
  between them. Pick one and record it here before any attribute field is added to
  `dhatus`.
- **An अव्यय source.** BAPS gives two अव्ययसंग्रह lists (`BAPS-1` pp. 48 and 115) and marks
  अव्यय inline elsewhere. That covers the syllabus, not the class. A अव्यय listing from a
  grammar or कोश is needed before the collection can claim to be complete.
- **A कोश for vocabulary.** Needed for words beyond the शब्दसंग्रह lists, and for meanings in
  Hindi where BAPS gives only Gujarati. Record which edition, and note that a कोश's glosses
  are authored text — enter the sense, not the wording.
- **A paradigm source for the six लकार BAPS does not teach.** `LSK-GPS` may serve; confirm it
  gives full tables rather than derivations before relying on it.

---

## Excluded

### धातुरत्नाकर — मुनि लावण्यविजय, जैनग्रन्थप्रकाशक सभा

**Do not cite for paradigms.** It follows Hemacandra's grammar, not Pāṇini's. Entering its
forms alongside Pāṇinian ones puts two incompatible grammars in one list with nothing
recording which is which.

Carried forward from the parked project, where this was a settled decision.

---

## Adding a source

1. Short code, permanent, uppercase.
2. Full title as printed, in its own script.
3. Every named contributor with the role the title page gives them.
4. Publisher, year as printed.
5. For scans: licence and who digitised it.
6. For video: channel, channel ID, and the locator format.
7. For a multi-file scan: the file → printed page mapping, marking which boundaries were
   verified by eye and which were interpolated.
