# Current path state — 2026-09-26 (post-migration)

Live from `/directory-audit.json` (same qualifying set as routes + sitemap).
Migration executed 2026-09-26 on explicit user go: `listing.city` reference
added, `category.parent` self-ref added, `county-annapolis` deleted,
`county-anne-arundel` + `city-annapolis` created, 4 listings relinked
(county=anne-arundel, city=annapolis), pathRules re-pointed.

## Gate-passing directory paths (5 — corrected grammar 2026-09-26)

`[category]` is a placeholder for the real parent-category slug, not the
literal word "categories". Corrected paths:

| Path | Kind | Listings | Gate | Copy |
|---|---|---|---|---|
| `/anne-arundel` | geo-county | 4 | mechanical | county doc description |
| `/anne-arundel/annapolis` | geo-city | 4 | mechanical | city doc description |
| `/restaurant/seafood` | subcategory | 4 | mechanical | category doc description |
| `/restaurant/seafood/anne-arundel` | subcategory-county | 4 | path rule include | pathRule intro |
| `/restaurant/seafood/anne-arundel/annapolis` | subcategory-city | 4 | path rule include | pathRule intro |

**Code restructured 2026-09-26**: routes now live under
`src/pages/[category]/[subcategory]/…` (depth-3 file also serves the
geographic business detail; depth-1 file carries about/MDX fallback).
Old `/categories/…` paths 404. Hub moved to `/` ("Browse by business type"
section; sidebar Categories link → `/`).

**CMS migrated 2026-09-26 (subcategory = own entity, user-stated)**:
`subcategory` doc type created (name/slug/description/parent→category);
`category.parent` self-ref removed; `subcategory-seafood` created (parent →
`category-restaurant`), 4 listings relinked to `listing.subcategory`,
`category-seafood` deleted, both pathRules repointed to `restaurant/…`. All
5 directory paths + detail URLs live; sitemap = 10 URLs.

Hub `/` always exists (browse by business type). `/categories` hub retires
with the restructure — gate-passing categories link from `/`, zero-listing
ones (Restaurant) render as plain labels, no dead links. The gate filters
subpaths, not the hub listing.

## Detail URLs (4, geographic — spec-conforming)

- `/anne-arundel/annapolis/annapolis-blue-bistro`
- `/anne-arundel/annapolis/chesapeake-catch-grill`
- `/anne-arundel/annapolis/dockside-oyster-house`
- `/anne-arundel/annapolis/severn-raw-bar-crab-deck`

Sitemap carries only these. Flat detail (e.g. `/annapolis-blue-bistro`)
retired from `[county]/index.astro` + sitemap; returns 404.

## Correctly-absent paths (404, by design)

- `/annapolis` — old wrong county doc deleted; Annapolis is a city.
- `/annapolis/<business>` — flat detail retired.
- `/categories/restaurant` — literal "categories" prefix wrong (placeholder
  misread); correct form is `/restaurant`, and Restaurant is the parent
  category with 0 direct listings — gate: zero listings → path never exists.
- Every other county/city/category/combo — 0 listings, never exists.

## Schema state

- `listing.subcategory` → `reference` to `subcategory`, required.
- `subcategory` — own entity (user-stated 2026-09-26): name/slug/description
  + `parent` → `category` (required). Restaurant → Seafood wired.
- `category` — plain parent entity, name/slug/description only.
- Entities: `county`, `city`, `category`, `subcategory` docs.
- pathRules: `restaurant/seafood/anne-arundel`,
  `restaurant/seafood/anne-arundel/annapolis` (include + intro).