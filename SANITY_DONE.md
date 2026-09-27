# Sanity integration — done

## What's built
- Sanity-hosted data (project `j5pgwhz4`, dataset `production`), SSR everywhere
- Embedded Studio at `/admin` (structure + presentation/vision tools)
- Visual Editing wired (stega, `/admin` studioUrl) — needs token + CORS to activate
- Data layer: `src/lib/sanity/{client,types,queries}.ts` (GROQ, image CDN URLs, entry-shaped wrappers)
- Schemas: `listing`, `blogPost` (src/sanity/schemaTypes/)
- Rewired routes: `[...slug].astro`, `blog/[slug].astro`, `tags/[slug].astro`, both OG image routes (satori+sharp, Sanity covers fetched as data URI)
- Removed: airtable/mock/sheet/notion loaders, old lib/loaders, old validation files
- `pnpm build` green. Dev (port 4324): `/` 200, `/admin` 200, `/blog` 200, `/og/index.png` 200 (1200x600 PNG), missing content → 404

## Your setup steps (blocked on you)
1. Content: dataset is **empty**. Create listings/blog posts in `/admin`, or I can seed from `src/data/directory/directory.json` on your go.
2. Read token: create at sanity.io/manage → API → Tokens (Viewer), add as `SANITY_API_READ_TOKEN` (enables draft preview/visual editing).
3. CORS: sanity.io/manage → API → CORS → add `http://localhost:4324` + your prod URL (allow credentials).
4. Vercel: env vars `SANITY_API_READ_TOKEN`, `PUBLIC_SITE_URL` (= prod URL); Node runtime will be 24 (local is 25 — harmless).

## Known gaps
- `site` in astro.config.mjs is still `https://bestmeditationapps.com` — set real domain before deploy.
- Sitemap: integration emits nothing under full SSR — needs a custom `sitemap.xml` endpoint later.
- `useCdn:false` (needed for drafts); can flip to CDN for prod published-only traffic.
- Red→yellow gradient: cancelled, not built.
## Visual editing audit (2026-09-25)
Done: stega studioUrl=/admin, useCdn:false, SSR, VisualEditing client:only in BaseLayout, presentationTool, SANITY_API_READ_TOKEN env field.

Missing vs official docs (sanity.io/docs/astro/astro-visual-editing):
1. Draft-mode routes: /api/draft-mode/enable (validatePreviewUrl from @sanity/preview-url-secret — dep not installed) + /disable, CHIPS cookies.
2. Perspective-aware queries: loadQuery() switching published/drafts + resultSourceMap:'withKeyArraySelector' — queries currently plain fetch, no drafts.
3. previewUrl origin falls back localhost:4321 but dev runs 4324 — set PUBLIC_SITE_URL in .env.
4. CORS origins (sanity.io/manage) — user-side.
5. Docs recommend custom React wrapper (perspective cookies + history sync) over built-in @sanity/astro component.

## Visual editing — built (2026-09-25)
- `src/lib/sanity/load-query.ts` — published/drafts perspective switch, resultSourceMap, stega, token
- Draft-mode routes: `/api/draft-mode/enable` (validatePreviewUrl, CHIPS cookies) + `/disable`
- `SanityVisualEditing.tsx` — full wrapper: history sync, perspective cookie, refresh reload; mounted in BaseLayout only when draft cookie present, with `DisableDraftMode.tsx` exit button
- All query call sites (pages + Grid/Search components) pass perspective cookie
- `src/sanity/resolve.ts` — listing → /{slug}, blogPost → /blog/{slug}
- previewUrl origin: PUBLIC_SITE_URL (.env has http://localhost:4324); tsconfig jsx react-jsx fix
- Deps added: @sanity/preview-url-secret, @sanity/visual-editing

## How to use visual editing (once content exists)
1. Create Viewer token at sanity.io/manage → API → Tokens → uncomment `SANITY_API_READ_TOKEN` in `.env` (prod: Vercel env var)
2. Add CORS origin `http://localhost:4324` (+ prod URL, allow credentials) at sanity.io/manage → API → CORS
3. Dev: open `http://localhost:4324/admin` → Presentation tab → edits overlay live; drafts show before publish; "Exit draft mode" button bottom-left
4. Stega encodes editor links in rendered text — visual overlays click straight into the field

## Proof (2026-09-25, verified live)
Seeded 9 docs: 6 published listings (calm, headspace, insight-timer, buddhify, smiling-mind, meditopia), 1 draft-only listing (serenity), 1 published post (hello-maryland), 1 draft-only post (draft-post).

Verified:
- /calm, /blog/hello-maryland, /tags/meditation → 200 (published)
- /serenity + /blog/draft-post → 302→404 published; 200 with draft perspective cookie ("Serenity (draft only)" renders)
- /api/draft-mode/enable without secret → 401 (token wired); with Presentation-generated secret → sets perspective cookie
- CORS origin http://localhost:4324 added via management API (id 3176360)
- Viewer token "marylandbusiness-dev" created, lives only in .env

Fixed along the way: secret env resolves from process.env (Vercel adapter path), so astro.config loads .env via documented vite loadEnv. import.meta.env doesn't carry secrets.

## To test visual editing yourself
1. Open http://localhost:4324/admin → Presentation tab
2. It loads the live site in preview iframe with draft mode
3. Click any text on the page → editor opens that field; edits save to drafts instantly
4. Toggle "Published vs drafts" perspective in the preview header
