// @ts-check
import { defineConfig, envField } from 'astro/config';
import vue from '@astrojs/vue';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';
import vercel from '@astrojs/vercel';
import { ViteToml } from 'vite-plugin-toml';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';

// .env files are not loaded inside config files (per Astro docs) — load them
// here so secret astro:env variables (SANITY_API_READ_TOKEN) reach
// process.env for the dev server. Production sets these on the host instead.
const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');
for (const [k, v] of Object.entries(env)) {
  if (process.env[k] === undefined) process.env[k] = v;
}

// https://astro.build/config
export default defineConfig({
  site: "https://marylandbusiness.online",
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  output: 'server',
  adapter: vercel(),
  integrations: [
    sanity({
      projectId: 'j5pgwhz4',
      dataset: 'production',
      studioBasePath: '/admin',
      useCdn: false,
      stega: {
        studioUrl: '/admin',
      },
    }),
    vue(),
    react(),
    mdx(),
    icon(),
    sitemap()
  ],
  vite: {
    plugins: [tailwindcss(), ViteToml()],
    // Required by @sanity/visual-editing (per sanity.io/docs astro-visual-editing
    // troubleshooting: "Module resolution errors in development").
    optimizeDeps: {
      include: [
        'react/compiler-runtime',
        'lodash/isObject.js',
        'lodash/groupBy.js',
        'lodash/keyBy.js',
        'lodash/partition.js',
        'lodash/sortedIndex.js',
      ],
    },
  },
  env: {
    schema: {
      POSTHOG_API_KEY: envField.string({ context: "client", access: "public", optional: true }),
      POSTHOG_API_HOST: envField.string({ context: "client", access: "public", optional: true }),
      SANITY_API_READ_TOKEN: envField.string({ context: "server", access: "secret", optional: true }),
      PUBLIC_SITE_URL: envField.string({ context: "client", access: "public", optional: true }),
    }
  }
});