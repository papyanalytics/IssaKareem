import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = process.env.SITE_URL;

export default defineConfig({
  output: 'static',
  base: process.env.GITHUB_ACTIONS === 'true' ? '/IssaKareem/' : '/',
  server: {
    host: 'localhost',
    port: 4321,
    strictPort: true,
  },
  ...(site ? { site, integrations: [sitemap()] } : {}),
});