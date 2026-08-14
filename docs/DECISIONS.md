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
of BAPS students rather than developers), Cusdis (self-hosting needs a server and database,
against scope discipline; no spam filter, so every comment needs manual approval) and Disqus
(ads and tracking). The deciding reason is not cost: the owner cannot yet judge whether a
correction is right, and a public thread publishes an unverified claim beneath an entry
where it reads as authoritative. A private message keeps the verification loop intact —
check the printed page, then fix it in the owner's own words. Revisit when the owner can
adjudicate a disputed form; giscus with a dedicated public comments repo is then the
preferred option.

---

## Open — decide before the first entry publishes

- [ ] **Primary language.** Multilingual is Gujarati / Hindi / English, plus IAST as a
      transliteration paired with Devanagari — not a fourth locale. Proposed: Gujarati for
      BAPS-sourced content fields, English for chrome and slugs, fallback gu → en → hi.
      Journal prose is written in one language per entry, not required in three.
- [ ] **Slug convention** for `dhatus`, `vocabulary`, `topics` and the paradigm collections.
      Permanent once created — Keystatic relationship fields store a slug with no cascade.
      Proposed: ASCII-folded IAST throughout, with the disambiguator always appended even
      when nothing collides yet.
- [ ] **URL structure.** `/lessons/<slug>/`, `/dhatus/<slug>/`, `/texts/<slug>/` or
      otherwise. Expensive to change after a year of indexing. Record it here once fixed.
- [ ] **Content licence.** The site is free to use; that needs saying explicitly. A private
      repo does not defer this — the content is published either way. Pick one, put it in
      the repo and the site footer.
- [ ] **Contact address** for corrections, to go in the site footer.
- [ ] **A printed धातुपाठ** — needed for गण, पद and the attribute set (उपधा, इत्,
      सेट्/अनिट्). Attribute sets differ between editions; pick one and record it in
      `docs/SOURCES.md` before any attribute field is added to `dhatus`.
- [ ] **JetBrains licence.** WebStorm currently shows a non-commercial-use badge. This
      project has a commercial API in its future; the parked project removed OrbStack for
      the same reason. Confirm the position and record it.

## Closed

- [x] **`Book031`–`Book036`** — confirmed as तृतीयो भागः, recoded `BAPS-3`. 2026-08-14.
