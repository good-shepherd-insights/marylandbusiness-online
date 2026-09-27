# Sanity CMS integration — research findings

Repo: `marylandbusiness-online` (Astro 7.3.5, static output, content-collections data layer)

## Current data architecture (what Sanity must plug into)

All listing/blog/page content flows through Astro content collections:

- `src/content.config.ts` — defines `directory`, `pages`, `blog` collections
- `src/lib/loaders/index.ts` — `createDirectoryCollection()` switches loader by
  `settings` `directoryData.source.name`: `mock | sheets | json | csv | airtable | notion`, fallback glob-markdown
- `src/lib/getRootPages.ts` / `getListings.ts` — `getCollection()` consumers
- Schema: `src/validation/directory.ts` — `directorySchema(imageSchema)`: title, description, tags, icon, image, link, featured
- Search is client-side over rendered grid (nanostores store.js) — no server search to migrate
- OG routes (`src/pages/og/`) read entries via `getEntry` — collection-shaped, so they keep working if Sanity output lands in a collection
- Vue islands (`UiTagSelect`, `UiTagGrid`) read tags from rendered DOM, not data layer

Key point: **anything that lands in a content collection keeps the whole site working** — pages, OG images, tags, search. Sanity integration is therefore a loader problem first.

## Option A — official `@sanity/astro` integration (3.5.1)

Verified current: peerDeps include `astro ^7.0.0`, `@sanity/client ^7 || ^8`, `sanity ^3.99–^6`.

Provides:
- `sanity:client` virtual module (preconfigured client)
- Embedded Studio route (`studioBasePath: '/admin'`) — requires `@astrojs/react` + `react` deps
- Visual Editing + stega (SSR + Presentation tool) — not relevant for a static directory build
- Docs: [introduction](https://www.sanity.io/docs/astro/introduction), [configure](https://www.sanity.io/docs/astro/configure-sanity-astro), [embedded studio](https://www.sanity.io/docs/astro/embedding-studio-in-astro), [plugin page](https://www.sanity.io/plugins/sanity-astro)

Costs: pulls React + sanity + styled-components into a Vue-island project. Heavy if Studio not embedded. Known caveat (from Sanity's own docs): no Live Content API equivalent, no cache revalidation — static builds need rebuild-per-content-change.

## Option B — headless client only (pattern already in user's own repos)

`~/projects/goodshepherdinsights-website` (Astro 6) uses exactly this:
- `@sanity/client` ^7.25 + `@sanity/image-url` ^2.1
- `src/lib/sanity/client.ts` — `createClient({ projectId, dataset, apiVersion, useCdn: false })`, env `PUBLIC_SANITY_PROJECT_ID` / `PUBLIC_SANITY_DATASET`
- Per-type GROQ query modules (`blog.ts`, `pages.ts`, `siteGlobals.ts`, …), typed result interfaces
- No Studio in repo (Studio hosted elsewhere / sanity.io)

Latest: `@sanity/client` 8.7.0, `@sanity/image-url` 2.1.1, `sanity` 6.16.0.

## Option C — content-collection loader (best fit for THIS repo)

Two candidates:
1. **`@arraypress/sanity-loader-astro`** 1.0.1 — verified peerDeps: `astro ^5||^6||^7`, `@sanity/client ^6||^7` (NOT ^8). Plugs GROQ into `defineCollection()`:
   `loader: sanityLoader({ type: 'listing' })` or custom `query`/`map`, `idField` defaults `slug.current`. Env: `SANITY_PROJECT_ID` / `SANITY_DATASET`. MIT. Small/community — 1.0.x, single maintainer (arraypress).
2. **Custom loader** (~100 lines) using Astro's [Content Loader API](https://docs.astro.build/en/reference/content-loader-reference/): `load()` fetches GROQ, `parseData()` against existing `directorySchema`, `generateDigest()` for incremental rebuilds. No new dependency beyond `@sanity/client`.

The johal.in article mentions `@astrojs/sanity` with a loader — **does not exist on npm** (E404, verified). Do not plan around it.

## Recommendation

Hybrid B + C, matching the in-house GSI pattern:

1. `pnpm add @sanity/client @sanity/image-url` (no react, no studio in repo initially — Studio hosted at sanity.io, or embedded later as phase 2)
2. New loader `src/lib/loaders/sanity.ts` implementing Astro Content Loader API: GROQ `*[_type == "listing"]`, map Sanity docs → existing `directorySchema` shape (title, description, tags, icon, image → image URL or asset ref, featured, link), `slug.current` as id
3. Add `source === 'sanity'` branch in `createDirectoryCollection()` — keeps every other source working, zero consumer changes
4. Env: `PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET` (+ `SANITY_API_READ_TOKEN` if drafts/private dataset)
5. Images: either pass CDN URLs (skip Astro `<Image>` optimization, simplest) or download at build in loader for `astro:assets` processing
6. `blog` / `pages` collections: same loader pattern if they move to Sanity too

If Studio editing UX (Visual Editing, draft previews) is wanted later, add `@sanity/astro` + `@astrojs/react` at that point — integration is additive, not a rewrite.

Alternative shortcut: `@arraypress/sanity-loader-astro` skips writing the loader, at cost of community dependency + rigid mapping. Worth prototyping first to validate schema mapping, then replace with in-house loader if needed.

## Open decisions for user

1. Does a Sanity project/dataset already exist, or create new? (project ID needed)
2. Studio: hosted on sanity.io, embedded `/admin` (needs React), or defer?
3. Which collections move: `directory` only, or also `blog` + `pages` (site copy like about/faq)?
4. Where does `settings.toml` theme/UI config live after migration — stays file-based (recommended: only content moves, config stays)?
5. Image handling: raw CDN URLs vs build-time download for Astro optimization?
6. Deploy target build hook: content changes in Sanity must trigger rebuild (Sanity webhook → deploy platform).

## Sources

- [@sanity/astro on npm](https://www.npmjs.com/package/@sanity/astro) — peer deps verified
- [Sanity + Astro docs hub](https://www.sanity.io/docs/astro)
- [Configuring @sanity/astro](https://www.sanity.io/docs/astro/configure-sanity-astro)
- [Embedding Studio in Astro](https://www.sanity.io/docs/astro/embedding-studio-in-astro)
- [Official plugin page](https://www.sanity.io/plugins/sanity-astro)
- [Astro Content Loader API reference](https://docs.astro.build/en/reference/content-loader-reference/)
- [@arraypress/sanity-loader-astro](https://www.pkgstats.com/pkg:@arraypress/sanity-loader)
- Astro CMS guide: https://docs.astro.build/en/guides/cms/sanity/