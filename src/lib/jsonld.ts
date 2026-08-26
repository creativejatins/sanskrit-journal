/**
 * JSON-LD is generated from data that already exists, never hand-written
 * (docs/DECISIONS.md, 2026-08-14). This run adds the two site-level types
 * only — `WebSite` and `Person` — built from src/data/site.ts so the
 * structured data can't say anything the site chrome itself doesn't.
 * Entry-level types (`DefinedTerm`, `LearningResource`, `CreativeWork`,
 * `BreadcrumbList`) come with the collection templates, out of scope here
 * (docs/runs/RUN-3-shell.md).
 */

import { AUTHOR_NAME, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '../data/site';

export function getPersonJsonLd() {
  return {
    '@type': 'Person',
    name: AUTHOR_NAME,
  };
}

/**
 * No credential, title or honorific on the Person (docs/DECISIONS.md,
 * 2026-08-26) — the object above has a name and nothing else, which is the
 * point, not an omission to fill in later.
 */
export function getWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: 'en',
    author: getPersonJsonLd(),
    publisher: getPersonJsonLd(),
  };
}
