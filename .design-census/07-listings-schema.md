# 07 — Listings schema (BusinessDetails)

Design source: UX Pilot BusinessDetails, desktop latest `yKiTibg7br0HIQXUrrkq`
(1440×1024, html hash `5311055dba72e1b3a494b37a97e06f3ece7d91b9e8940a6e6a3802496db5bd61`,
updated 2026-09-26). Mobile `426Sq4RtQEvBpdqJ16ub` not yet read — desktop
assumed field superset.

Full verbatim evidence inventory: `LISTINGS_REQUIREMENTS.md` §1 (19 blocks,
every string traced to design markup). This file records the build decisions,
not a copy of it.

## Approved model (user go 2026-09-26 "build it then have a strict audit")

6 entity documents (new `entities/` tier):
- `listing` — rework, moved from `pages/` to `entities/`
- `category` — referenceable (breadcrumbs, similar filtering)
- `county` — referenceable (breadcrumbs, hubs)
- `review` — standalone doc, `sourceUrl` (href attribution), references listing
- `pulse` — standalone doc (future social feature), references listing
- `editorialStory` — object in components/ today → standalone document

10 component objects: `listingAddress`, `hourSpan`, `amenity`,
`achievement`, `menuCategory` (embeds `menuItem`), `menuItem`, `listingEvent`,
`qaItem`, `teamMember`, `promotion`.

Enum selects (fixed value sets, extensible by adding members):
`priceRange` ($–$$$$), `menuItem.badge`, `hourSpan.day` (mon–sun),
`promotion.tone`, `editorialStory.tag`, `listing.taxStatus`.
Computed-not-stored: rating, review count, distribution (reverse GROQ pull),
open status + closing time (from structured hours), pulse.
One-direction references: listing→category/county, review→listing, pulse→listing.

## Icon mapping (verified against node_modules/@iconify-json/tabler/icons.json)

Design shows FA classes; every icon name written to CMS was checked to exist as
a bare key in the installed tabler icon set (keys omit the `tabler:` prefix):

| Design (FA)      | Seed value (tabler) | Used by                       |
|------------------|---------------------|-------------------------------|
| fa-wifi          | `wifi`              | amenity Free Public Wi-Fi     |
| fa-umbrella-beach| `beach`             | amenity Waterfront Seating    |
| fa-car           | `car`               | amenity Valet Parking         |
| fa-leaf          | `leaf`              | amenity Gluten-Free Menu      |
| fa-award         | `award`             | achievement Health Dept. A    |
| fa-landmark-dome | `building-bank`     | achievement Commerce Certified|
| fa-water         | `ripple`            | achievement MD Seafood Cert   |
| fa-people-group  | `users-group`       | achievement MBE Certified     |

## Seed (written 2026-09-26, HTTP mutate, 1 atomic transaction)

Wiped: 7 template listings (6 published `listing-*` + `drafts.listing-serenity`).
Created: `category-seafood`, `county-annapolis`,
`listing-annapolis-blue-bistro`, `review-sarah-thompson`,
`review-james-rivera`, `pulse-annapolis-blue-bistro-001`. All published; zero
draft shadows (remaining drafts in dataset are preview-url-secrets + a
pre-existing blogPost draft).

Seed decisions (all design-derived, none invented beyond noted cases):

- **Placeholder-URL policy**: required `url` fields with no design destination
  (listing `menuUrl`/`directionsUrl`/`ctaPrimaryUrl`/`ctaSecondaryUrl`;
  event `ctaLink` ×2; team `ctaLink` ×3; promotion `ctaLink` ×2) are seeded
  with `https://bluebistro.md` — the design's only real URL (JSON-LD). Editors
  replace later. Documented here so the audit does not flag them as drift.
- **Review source attribution**: design shows no review source; `sourceName`
  = "Maryland Business Direct" (the page's own title brand), `sourceUrl` =
  design JSON-LD `@id` `https://marylandbusiness.gov/annapolis-blue-bistro`.
  Both required by schema.
- **Description** (required) = About Us paragraph 1, first sentence.
- **Q:/A: prefixes are presentation markup** in the design; seed stores raw
  question/answer text.
- **Menu**: design shows 4 tab buttons (Signature Crab/Starters/Entrees/
  Beverages) but one active grid; all 4 items seeded under a single
  `menuCategory` labeled "Signature Crab" (the active tab).
- **Hours**: 7 `hourSpan`s mon–sun 11:00–22:00, from design JSON-LD
  (`Mo-Su 11:00-22:00`).
- **lastAudit**: design "Aug 2024" → date `2024-08-01` (date type).
- **James Rivera design half-star 4.5 → rating integer 5** (round half up);
  Sarah Thompson 5. Real computed aggregates (2 reviews → 5.0) intentionally
  differ from the design's mock 4.8 (124) — data integrity over mock fidelity;
  aggregates are computed from review docs, never stored.
- **Avatar alts** (team ×3, review ×2): design attributes carry no alt text;
  seeded with name+role-derived alts (a11y), e.g. "Michael Ferrante, Founder
  and Owner of Annapolis Blue Bistro".
- **videoStill alt**: design attribute truncated mid-word ("guests dinin");
  seeded completed to "guests dining".
- **14 design images** uploaded via MCP dataset upload and referenced by
  asset ref (gallery ×4 incl. primary, videoStill, menu ×4, team ×3,
  review ×2). Editorial (2) + similar-grid (3) design images intentionally not
  seeded — no editorialStory/similar seed this pass.
- **Pulse**: booked 12, capacityPct 85, waitMinutes 10, observedAt
  2026-09-26T12:00:00.000Z — design pulse figures verbatim.
- **QA heading/ask label**: "Questions & Answers" / "Ask a Question" verbatim.

## Consumers of listing fields (compile-compat updates this pass)

- `src/lib/sanity/queries.ts` — projection/toListingEntry rework
- `src/sanity/resolve.ts` — title→name
- `src/layouts/Listing.astro` — frontmatter.title→name, link→website
- `src/components/directory/cards/index.astro` + `RectangleCard.astro` —
  title→name, tag-chip markup removed (tags field no longer exists)
- `src/pages/tags/[slug].astro` — tag filter → category-slug filter
- `src/pages/og/[...slug].png.ts` — data.title→data.name
- `src/pages/[...slug].astro` — body→about portable text

Detail-page render (BusinessDetails components) = separate later passes.
## Render-fix + hardening pass (2026-09-26, approved plan)

- **Consumer fixes**: TitleHeader + RectangleCard switched from astro:assets
  `<Image>` to plain `<img>` + `sanityImageUrl`/`sanityImageSrcSet` (Sanity
  asset refs cannot go through astro:assets). cards/index guard when `link`
  absent. `[...slug].astro` cast dropped (`SanityBody` retyped).
- **Schema hardening (existing-schema, per-change go granted via plan)**:
  list-membership validation added to priceRange, taxStatus, menuItem.badge,
  promotion.tone, editorialStory.tag, hourSpan.day;
  `menuItem.price` string → number; `alt` required on all 7 image fields;
  `_id,_type` added to dereferenced projections; `initialValue`s dropped;
  `getListingForOg` slim projection; video block gained `videoEyebrow` +
  `videoCaption` (required).
- **editorialStory → entity document** (new `entities/editorialStory.ts`,
  listing reference, tag/date/excerpt/image/body); listing detail query
  reverse-pulls stories by `listing._ref`, ordered date desc.
- **Spotlight consumer built**: `src/components/listings/Spotlight.astro`,
  wired into both branches of `src/layouts/Listing.astro`. Renders only when
  stories exist; unknown tag enum values fall back to a neutral chip.
- **Editorial seed**: `editorial-story-dock-street` (feature, 2024-11-15) +
  `editorial-story-maryland-sourced` (sustainability, 2024-10-22); both
  images uploaded fresh (no hash match among unreferenced assets); UTC date
  formatting pinned in the component.
- **similarHeading nulled** on the seeded listing until the 3 similar
  restaurants exist (plan Group A item 6, verified null).
- **video strings settled**: videoHeading "Vibe Check" (section heading),
  videoEyebrow "Experience the Atmosphere", videoCaption "Waterfront Dining,
  Live Kitchen & Golden Hour Views" — verbatim (V-11 record in VIOLATIONS.md).
- Verified: `npx astro check` 0 errors/0 warnings; `npx sanity schema
  validate` 0/0; listing page 200 full HTML; OG PNG 1200×600; no
  UnsupportedImageFormat in dev.log. Deviations: VIOLATIONS.md V-11–V-15
  (linkless spotlight CTA/cards pending editorial route; chip renders raw
  enum casing; /tags/seafood keyed to template config — template cruft).
