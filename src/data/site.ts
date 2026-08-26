/**
 * Site identity constants. Single source for the wordmark, tagline, and
 * author name, so the header, footer and JSON-LD (docs/runs/RUN-3-shell.md)
 * can't drift from each other by editing one and not the others.
 *
 * Settled in docs/DECISIONS.md, 2026-08-26 ("Site name, tagline and
 * navigation" and "The owner is named"). The tagline text itself is NOT
 * settled there — it names the *framing* (a beginner's notes, with sources)
 * but not the exact wording. What is below is placeholder English prose,
 * same standing as the homepage and About-page prose: the owner rewrites it.
 */

export const SITE_NAME = 'Sanskrit Grammar';

export const SITE_TAGLINE = 'A beginner’s notes on Sanskrit — with the book and page for every one of them.';

export const SITE_URL = 'https://sanskritgrammar.com';

export const SITE_DESCRIPTION =
  'A public journal of one person learning Sanskrit — lessons, vocabulary and paradigms, each entered from a printed source with its page recorded.';

/**
 * No credential, title or honorific (docs/DECISIONS.md, 2026-08-26): the
 * framing is beginner, and the structured data must say nothing the prose
 * does not.
 */
export const AUTHOR_NAME = 'Jatin Soni';

export const LICENSE_NAME = 'CC BY 4.0';
export const LICENSE_URL = 'https://creativecommons.org/licenses/by/4.0/';

export const NAV_ITEMS = [
  { label: 'Syllabus', href: '/syllabus/' },
  { label: 'Lessons', href: '/lessons/' },
  { label: 'Texts', href: '/texts/' },
  { label: 'Reference', href: '/reference/' },
  { label: 'About', href: '/about/' },
] as const;

/**
 * The reference hub's five links (docs/runs/RUN-3-shell.md, step 2). Labels
 * are the ASCII collection names on purpose, not a translation into English
 * or into Devanagari/Gujarati — see the brief's "rule that overrides this
 * brief". `avyaya` is not its own Keystatic collection (it is a `word_type`
 * value inside `vocabulary`, docs/DECISIONS.md 2026-08-14) but the brief
 * lists it as a fifth, separate hub link regardless; `/avyaya/` here is a
 * provisional flat path chosen only to match its four siblings' pattern,
 * not a URL decision — that is page-template/content-model territory, out
 * of scope for this run.
 */
export const REFERENCE_LINKS = [
  { label: 'dhatus', href: '/dhatus/' },
  { label: 'vocabulary', href: '/vocabulary/' },
  { label: 'avyaya', href: '/avyaya/' },
  { label: 'conjugations', href: '/conjugations/' },
  { label: 'declensions', href: '/declensions/' },
] as const;
