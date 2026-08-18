// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

// https://astro.build/config
export default defineConfig({
  site: 'https://sanskritgrammar.com',

  // URLs encode identity, not navigation — see docs/DECISIONS.md.
  // Set now, while nothing is indexed: a page must never be reachable
  // at two addresses.
  trailingSlash: 'always',

  integrations: [react(), markdoc(), keystatic()],
});
