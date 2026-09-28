# Maryland Business Online

Directory + editorial hub for Maryland businesses, backed by Sanity CMS.

Site: https://marylandbusiness.online · Studio: `/admin` · Source: `src/` · CMS data: Sanity project `j5pgwhz4` / dataset `production`.

## Stack

- [Astro 7](https://astro.build/) (SSR, `@astrojs/vercel` adapter)
- [Sanity](https://www.sanity.io/) for content (`@sanity/astro`, embedded Studio at `/admin`, Presentation tool with draft mode)
- [Tailwind CSS 4](https://tailwindcss.com/) via `@tailwindcss/vite`
- Vue 3 + React 19 islands, MDX
- TypeScript, Zod

## Local development

```sh
pnpm install
cp .env.example .env   # if present; otherwise see Environment below
pnpm dev               # http://localhost:4321
```

Sanity Studio runs at <http://localhost:4321/admin> in dev.

## Environment

Set these in `.env` for local dev and on the host for production:

| Variable | Scope | Purpose |
| --- | --- | --- |
| `PUBLIC_SITE_URL` | client | Public site URL |
| `PUBLIC_SANITY_PROJECT_ID` | client | Sanity project id (defaults to `j5pgwhz4`) |
| `PUBLIC_SANITY_DATASET` | client | Sanity dataset (defaults to `production`) |
| `SANITY_API_READ_TOKEN` | server | Read token for previewing drafts / private datasets |
| `POSTHOG_API_KEY` | client, optional | PostHog analytics |
| `POSTHOG_API_HOST` | client, optional | PostHog host |

## Content

Listings, pages, and editorial content live in Sanity — not in the repo. Editors use the embedded Studio at `/admin` to create and publish documents. Drafts render via the Presentation tool's draft mode (`/api/draft-mode/enable`).

Schema definitions: `src/sanity/schemaTypes/` (entities, pages, sections, components, validation).
Studio structure and resolve: `src/sanity/structure.ts`, `src/sanity/resolve.ts`.

## Routes

```
/                                            # home
/[category]                                  # category index
/[category]/[subcategory]                    # subcategory
/[category]/[subcategory]/[county]           # county
/[category]/[subcategory]/[county]/[city]    # city listing
/resources                                   # resource hub
/blog/[slug]                                 # editorial
/[...slug]                                   # catch-all Sanity page
```

Listing path helpers: `src/lib/directory/paths.ts`.

## Build & deploy

```sh
pnpm build    # astro check && astro build → .vercel/output/
```

Deployed on Vercel. Build output is server-rendered (not static) so the Vercel adapter generates `.vercel/output/_functions/`.

## Project docs

- `SANITY_INTEGRATION_RESEARCH.md` — Sanity setup notes
- `SANITY_DONE.md` — completed Sanity work log
- `SCHEMA.md` — content model reference
- `LISTINGS_REQUIREMENTS.md` — listing funnel spec
- `HUB-DIRECTORY-RESEARCH.md`, `CATEGORIES-RESEARCH.md`, `CITIES-RESEARCH.md` — taxonomy + geo research
- `VIOLATIONS.md` — known anti-patterns to avoid
