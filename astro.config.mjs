// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const apercu = process.env.CAPIA_APERCU === '1';

export default defineConfig({
  site: 'https://cap-ia.pro',
  trailingSlash: 'never',
  build: {
    format: 'file',
    inlineStylesheets: 'never',
  },
  integrations: apercu ? [] : [
    sitemap({
      filter: (page) => !page.includes('/merci') && !page.includes('/outils/'),
    }),
  ],
  devToolbar: { enabled: false },
});
