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

---

## Open — decide before the first entry publishes

- [ ] **URL structure.** `/lessons/<slug>/`, `/dhatus/<slug>/`, `/texts/<slug>/` or
      otherwise. Expensive to change after a year of indexing. Record it here once fixed.
- [ ] **Content licence.** The site is free to use; that needs saying explicitly. Pick one,
      put it in the repo and the site footer.
- [ ] **Slug convention** for `dhatus` and `vocabulary`. Permanent once created — Keystatic
      relationship fields store a slug with no cascade.
- [ ] **`Book031`–`Book036`** — confirm what these volumes are and give them real source
      codes in `docs/SOURCES.md`.
- [ ] **JetBrains licence.** WebStorm currently shows a non-commercial-use badge. This
      project has a commercial API in its future; the parked project removed OrbStack for
      the same reason. Confirm the position and record it.
