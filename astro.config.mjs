// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://sanskritgrammar.com',

  // URLs encode identity, not navigation — see docs/DECISIONS.md.
  // Set now, while nothing is indexed: a page must never be reachable
  // at two addresses.
  trailingSlash: 'always',

  // Cloudflare Workers, per docs/DECISIONS.md 2026-08-14. Keystatic's
  // GitHub mode (production) needs server routes, so `output` stays the
  // Astro default of on-demand rendering with per-page opt-out — every
  // content page is `export const prerender = true` and is emitted as a
  // static file at build time; nothing here forces the whole site static.
  adapter: cloudflare(),

  integrations: [react(), markdoc(), keystatic()],
});
