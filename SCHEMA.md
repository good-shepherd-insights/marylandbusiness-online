# SCHEMA MAP — how content is modeled and how to add to it

Sanity project `j5pgwhz4` / dataset `production`. Studio served by the astro dev
server at `/admin` (`studioBasePath` in `astro.config.mjs` — the astro daemon on
port 4324 **is** the Studio host; there is no separate sanity process).

All content lives in CMS. No hardcoded copy, no fallback text, no defaults.
Presentation (icon tints, arrows, hover, spacing) belongs in component CSS,
never in data.

## Four tiers

```
TIER 1  components/   objects    smallest reusable pieces, embedded in sections/entities
TIER 2  sections/     documents  standalone section content, singleton _id = type name
TIER 3  pages/        documents  references to sections only — zero content of their own
TIER 4  entities/     documents  content entities the pages link to (listing, category, …)
```

- **components** (`src/sanity/schemaTypes/components/*.ts`) — object types:
  `heroHeadingSegment` (styled inline text segment), `heroImage`,
  `heroSelectOption`, `trustSignal`, `countyHub`, `featuredBusiness`,
  `editorialStory` (now also an entity document), `socialFeedItem`,
  `listingAddress`, `hourSpan`, `amenity`, `achievement`, `menuItem`,
  `menuCategory`, `listingEvent`, `qaItem`, `teamMember`, `promotion`,
  `navLink`, `processStep`, `valueCategory`, `planFeature`, `pricingPlan`,
  `comparisonCell`, `comparisonRow`, `comparisonGroup`, `faqItem`,
  `newsItem`, `pathwayCard`, `methodStep`.
- **sections** (`src/sanity/schemaTypes/sections/*.ts`) — document types:
  `hero`, `trustStrip`, `countyHubs`, `featuredBusinesses`, `editorial`,
  `socialFeed`, `hubHeader`, `hubDiscovery`, `aboutHeader`, `statStrip`,
  `origin`, `missionBand`, `visionPillars`, `offerArms`, `partnerships`,
  `closingCta`, `resourcesIntro`, `regulatoryUpdates`, `featuredPrograms`,
  `countyJump`, `resourceDirectory`, `alertSignup`, `hiwHeader`, `hiwProcess`,
  `hiwValue`, `hiwWhy`, `hiwPricing`, `hiwComparison`, `hiwFaq`, `hiwCta`,
  `homeNews`, `homePathways`, `homeCategoryIndex`, `homeMethodology`,
  `homeFaq`.
  Singleton docs: `_id` equals the
  type name (e.g. doc `hero`). Empty sections still exist as documents — the
  doc list must always identify them, so every preview falls back to its
  schema title.
- **pages** (`src/sanity/schemaTypes/pages/`) — `home` holds one `reference`
  field per section. **Field order on the page = render order.** A null
  reference = section absent from the page (renders nothing). `directoryPage`
  (2026-09-26) references `hubHeader` + `hubDiscovery`; it renders on county
  gate paths (`/anne-arundel`) via `src/pages/[category]/index.astro`, with
  the county name, business rows, ratings and city counts computed from
  entities at query time (`getHubData`) — never stored.
- **entities** (`src/sanity/schemaTypes/entities/*.ts`) — content entities:
  `listing` (full BusinessDetails page, moved from pages/ to entities/
  2026-09-26), `category`, `county`, `review`, `pulse`, `editorialStory`.
  References one-way: listing→category/county, review→listing, pulse→listing.
  Aggregates (rating, review count, distribution, open status, latest pulse)
  are computed at query time by reverse joins — never stored on the entity.
  Full model + seed record: `.design-census/07-listings-schema.md`.

**URL structure (user-stated 2026-09-26):** two axes — type
(`/[categories]/[subcategory]`, optional path-based location tiers) and
geography (county/city hierarchy: `/[county]/[city]/[business]` business
detail). Paths exist only for combinations passing a mechanical gate
(volume, unique copy, demand, per-combo human override); page-level
filtering always available. Requires a new `city` entity + `listing.city`
reference; subcategory modeling proposed (category self-reference);
`/tags/*` and the settings.toml tag list retire. Full record (the single
spec for both axes + gate + auditability): `.design-census/TAGS.md`. Not
built yet.

## Where each tier plugs in

| Tier | Schema file | Register in | Types | Query | Render |
|---|---|---|---|---|---|
| component | `schemaTypes/components/<name>.ts` | `schemaTypes/index.ts` (components block) | `src/lib/sanity/types.ts` | via its section's projection | via its section component |
| section | `schemaTypes/sections/<name>.ts` | `schemaTypes/index.ts` (sections block) + add to `SECTION_TYPES` in `src/sanity/structure.ts` | `src/lib/sanity/types.ts` | dereference in the page query | `src/components/sections/<Name>.astro` |
| page | `schemaTypes/pages/<name>.ts` | `schemaTypes/index.ts` (pages block) + location in `src/sanity/resolve.ts` | `src/lib/sanity/types.ts` | new query in `src/lib/sanity/queries.ts` | `src/pages/[...slug].astro` inside `BaseLayout` |
| entity | `schemaTypes/entities/<name>.ts` | `schemaTypes/index.ts` (entities block) | `src/lib/sanity/types.ts` | new query in `src/lib/sanity/queries.ts` | page/layout that renders the entity |

## Adding a new section (the full recipe)

1. **Component objects first** — decompose into the smallest reusable object
   types, new file per object in `components/`. Styled inline text = segment
   array (text + style); the component inserts inter-segment spaces,
   whitespace never lives in the data.
2. **Section document** — `sections/<name>.ts`, `type: 'document'`, every copy
   field `required()`, arrays `required().min(1)`, no defaults. Preview:
   `select` content fields, `prepare` returns content-derived title with the
   schema title as fallback when empty.
3. **Register** in `schemaTypes/index.ts` and add the type name to
   `SECTION_TYPES` in `src/sanity/structure.ts`.
4. **Page reference** — add one `defineField` (`type: 'reference'`,
   `to: [{type: '<name>'}]`) on the page doc, positioned in render order.
5. **Types** — interfaces in `src/lib/sanity/types.ts`, exactly the schema
   fields, nothing extra.
6. **Query** — extend the page's GROQ projection with `<name>->{…}`, selecting
   only rendered fields.
7. **Component** — `src/components/sections/<Name>.astro`. Props = CMS object.
   Optional field renders nothing. Scoped `<style>` + local tokens only, no
   Tailwind, no imports from other sections. CMS icon names via astro-icon.
   Wire into `src/pages/[...slug].astro` behind the null check.
8. **Seed** — write token from `.env` (never printed). HTTP mutate
   `POST /v2025-01-01/data/mutate/production`; array items need unique `_key`;
   only schema fields. After writing, re-fetch and check **both** perspectives
   (published AND no stale draft shadowing it).
9. **Verify** — restart daemon (`npx astro dev stop && npx astro dev start
   --port 4324`, it serves stale code otherwise), `curl` the page for the
   section markup, `npx astro check` 0 errors, `npx sanity schema validate`
   0 errors 0 warnings.

Adding a component or page follows the same shape through the table above.

## Rules that gate changes

- **Existing schema edit/rename/delete: explicit per-change go required.**
  New files: no gate. Schema is contract.
- Icon names: only verified Iconify names (check
  `node_modules/@iconify-json/tabler/icons.json`), never invented.
- No commits (not a git repo). `.env` values never echoed.
- Failures/deviations get logged in `VIOLATIONS.md` the same session.

## Current state (2026-09-26)

- Seeded + linked on home: `hero`, `trustStrip`, `countyHubs`,
  `featuredBusinesses`, `editorial`, `socialFeed`.
- Entities seeded: `category` (Seafood), `county` (Annapolis),
  `listing` (annapolis-blue-bistro), 2 `review`s, 1 `pulse` observation,
  2 `editorialStory` documents. 7 template listings wiped.
- Schema hardened + render-fixed 2026-09-26 (enum validations, price number,
  required alts, honest projections, slim OG query, video eyebrow/caption,
  editorialStory→entity, Spotlight consumer). Full record:
  `.design-census/07-listings-schema.md`. Deviations: VIOLATIONS.md V-11–V-15.
- Directory (county-hub) build 2026-09-26 (design 10, census
  `10-directory-hub.md`): `hubHeader` + `hubDiscovery` sections seeded
  (singleton ids `hubHeader`/`hubDiscovery`), `directoryPage` seeded with both
  refs, county gate paths (`/anne-arundel`) render `HubHeader` + `HubDiscovery`
  via `[category]/index.astro` (`getDirectoryPage` + `getHubData`; rating,
  review count, city counts computed at query time). Map pane: Google Maps
  JavaScript API, lazy-loaded client-side; pins from `listing.geo` (geopoint,
  entity data); marker↔list row sync; Map/Satellite toggle wired to CMS
  labels. `PUBLIC_GOOGLE_MAPS_API_KEY` in `.env` (restrict to referrers).
  Brand basemap styling later via Map ID. Parked: 3 listings missing geo.
- Mobile pass 2026-09-26 (design 11 `ArCZE19jrP26eGm7pQ4L`, census
  `11-directory-mobile.md`): HubHeader/HubDiscovery now responsive — 200px
  live map strip with "Interactive Map View" fullscreen expand (new CMS
  fields `interactiveMapLabel`/`interactiveMapCloseLabel` on `hubDiscovery`,
  seeded), sticky filter chip bar, 80px grayscale rows, stacked expertise
  stats, condensed header strip. Desktop (design 10) behavior unchanged.
- How It Works build 2026-09-26 (design `RVvHKjae5SwV4XeyJzZj`, census
  `12-how-it-works.md`): 8 singleton sections (`hiw*`) + 8 component objects
  (processStep, valueCategory, planFeature, pricingPlan, comparisonCell/Row/
  Group, faqItem); `howItWorks` page = title + 8 refs; renders at
  `/how-it-works` (named-page branch). Comparison columns DERIVE from
  hiwPricing plans. ⚠️ Design-authored placeholders seeded as-is
  (Enhanced/Preferred/Premier feature stubs + empty comparison cells +
  "Standard/Priority/Dedicated" support row) — flagged for editorial
  replacement. Reviews seeded for the 3 remaining listings + full required
  fields (address/geo/phone/CTA/hours) — star rows computed.
- Next up: full BusinessDetails page component build (video "Vibe Check",
  menu, reviews, events sections — data is modeled and seeded, no consumers
  yet beyond Spotlight), editorial story route, template-cruft cleanup pass
  (Posthog error, banner copy, config tag list), mobile design read.
- Home Content Expansion build 2026-09-27 (design
  `eCLIzpc6YQX6IWXMoSHA` v2, census `13-home-expansion.md`): 5 singleton
  sections (`homeNews`, `homePathways`, `homeCategoryIndex`,
  `homeMethodology`, `homeFaq`) + 3 component objects (`newsItem`,
  `pathwayCard`, `methodStep`); 5 refs appended on `home` after
  `socialFeed`. Reuses `faqItem` (homeFaq) and `navLink` (pathway links).
  News tag tone + pathway icons/tints + methodology numbering are frontend
  literals by position — never stored. `homeCategoryIndex` stores header
  copy only: the grid is COMPUTED from the live category → subcategory tree
  by `getCategoryTree()` (links to `/{category}/{subcategory}`), so it grows
  as sectors are added in Studio (currently Restaurant → Seafood; the
  design's 6×7 sectors were aspirational and were NOT seeded). Pathway link
  hrefs mapped to real routes (flagged in census 13 for editorial review).
  Global navbar (2026-09-27): `navLink` object + `siteSettings.navLinks`
  render on every route via `Navbar.astro` (home slot = old trust-strip
  position).
- Global footer build 2026-09-27 (design `9CGLhn7IuWzEhRoEnKtp` footer +
  mobile variant `rRl8hcSvE8wdYJYtZuzu`, census `14-footer.md`; authorized
  after V-20 revert): `siteSettings` footer fields (`footerBrandBadge`,
  `footerBrandName`, `footerTagline`, `footerQuickHeading`,
  `footerQuickLinks[]`, `footerResourceHeading`, `footerResourceLinks[]`,
  `footerLegalName`, `footerLegalLinks[]` — all `navLink` arrays), rendered
  by `Footer.astro` at the end of every route (same wiring as navbar,
  including the `Listing` layout and all hub branches). Copyright year is
  dynamic. Links without a real route (Support, Privacy, Terms) render as
  non-link text — no dead `#` anchors; flagged in census 14 for future
  pages. VIOLATIONS.md V-20 remains the record of the unauthorized first
  attempt; this build was user-ordered.