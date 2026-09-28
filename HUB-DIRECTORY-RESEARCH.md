# Research — Directory/Hub on all allowed paths + working filtering

Read-only research, 2026-09-27. No code touched. Goal per user: get the
Directory/Hub (UX-Pilot designs 10/11 — `HubHeader` + `HubDiscovery`) working
on every gate-passing path, and make its filtering functional even where the
corresponding index path does not exist. Sidebar layout is an orphan — not to
be used anywhere; only UX-Pilot census designs are valid UI.

## 1. Where the hub works today

| Gate-passing path | Kind | Route file | Renders today |
|---|---|---|---|
| `/anne-arundel` | geo-county | `src/pages/[category]/index.astro` | Hub chrome (design 10/11) — **only if** `directoryPage.hubHeader` + `directoryPage.hubDiscovery` + `hubData` all present, else orphan Sidebar fallback |
| `/anne-arundel/annapolis` | geo-city | `src/pages/[category]/[subcategory]/index.astro` | Orphan Sidebar + `PureGrid` — no hub, no filters |
| `/restaurant/seafood` | type | same file as above | Same orphan fallback |
| `/restaurant/seafood/anne-arundel` | type-county | `.../[county]/index.astro` | Same orphan fallback (shares file with business detail) |
| `/restaurant/seafood/anne-arundel/annapolis` | type-city | `.../[city]/index.astro` | Same orphan fallback |

The depth-1 gate is `src/pages/[category]/index.astro:44`
(`result?.state.kind === "geo-county"`). Depth 2/3/4 files never import
`HubHeader`/`HubDiscovery` at all.

## 2. Blockers for hub-on-every-allowed-path

1. **`getHubData()` is county-only** (`src/lib/sanity/queries.ts:334`): GROQ
   filters `county->slug.current == $slug` and returns
   `HubData{county, businesses, cities}`. No variant exists for geo-city,
   type, type-county, type-city.
   - Cheapest correct fix: build hub data from
     `buildDirectoryIndex()` / `getPath()` (`src/lib/directory/paths.ts`) —
     `listingsByPath` already holds the exact gate-passing listing rows for
     every open path, so hub listings can never disagree with the gate set
     (TAGS.md auditability rule). Businesses, city counts, and the heading
     label (`state.label`) all derive from one fetch. A generalized GROQ
     query per kind is the alternative but duplicates the gate logic.
2. **County-shaped props**: `HubHeader` takes `countyName`; the page composes
   the title as `${county.name} ${headingSuffix}`. Type paths have no county.
   `state.label` already carries the right label per kind — pass that.
3. **`hub.cities` (Region Focus pane)**: derivable from listing rows
   (distinct city + count). For type-county/type-city combos the list is the
   combo's cities; the pane already hides itself when the list is empty
   (`HubDiscovery.astro`: `hub.cities.length > 0`).
4. **Route branching**: depth-3 file must keep its business-detail fallback
   (`/anne-arundel/annapolis/<business>` resolves there when the combo path
   misses) — hub chrome becomes the combo branch, detail stays the other.
5. **Singleton-absent behavior**: hub chrome renders only when the
   `directoryPage` singleton is seeded. Chrome absence must not 404 the path
   (gate owns existence, not chrome). Needs a decision: render
   heading + list without chrome sections (graceful) vs. current orphan
   Sidebar fallback (retired per user).

## 3. Filtering (design 10/11) — current state: entirely decorative

Present in `HubDiscovery.astro`, none wired:

- Mobile sticky chip bar: Category, Sort, Open Now, Verified — 4 static
  buttons, no handlers.
- Desktop filter header: "Browse Directory" + Clear Filters link, Category
  button, "Price: Low-High" sort button, Open Now + Verified chips rendered
  as static spans (with x icons) that aren't even toggle states.
- Region Focus city checkboxes: all `checked`, no change handler.
- No filter JS exists; the only script is the Google Maps loader/pins.

### Data — everything the filters need already exists in the schema

| Filter | Source | Note |
|---|---|---|
| Category | `listing.subcategory.parent` (category) / `subcategory` | NOT fetched by `getHubData` today |
| Price sort ("Price: Low-High") | `listing.priceRange` — required string from a fixed `PRICE_RANGES` list (`listing.ts:80`) | NOT fetched; sortable if the list is ordinal ($ → $$$$) — verify order at build |
| Open Now | `listing.hours` — required `hourSpan[]` (`listing.ts:484`) | Computable client-side against local time; timezone decision needed (America/New_York) |
| Verified | `review.verifiedVisit` boolean (`review.ts:58`) | Chip maps to "has ≥1 verified-visit review"; NOT fetched |
| City (Region Focus) | `listing.city` | Already fetched |
| Clear Filters | — | Reset all to default |

`getHubData`'s projection must add: `subcategory{name,slug,parent{slug,name}}`,
`priceRange`, `hours`, and verified-visit presence (GROQ aggregate, e.g.
`"verified": count(reviews[verifiedVisit == true]) > 0`).

### Pattern to reuse — already proven in this repo

`src/components/sections/ResourceDirectory.astro` implements the exact
client-side filter model this needs and carries the governing comment:
"Client-side filtering only (TAGS.md): never generates URLs, never indexed."
It already solved the repo-specific gotchas: JS-created nodes need
`:global()` styles, `.card { display:flex }` defeats the `hidden` attribute
(needs an explicit `[hidden]{display:none}` override), placeholder options
must carry empty values, chips dedupe by label, reset restores defaults.
Reuse that model; stamp each business row with `data-category`, `data-city`,
`data-price`, `data-verified`, `data-hours` (or a compact JSON blob).

### Core model (user-stated 2026-09-27): the path IS the filter state

- One hub UI for every path; the path determines the initial filter state.
  Not every path is indexable, but every path works the same way.

**Three tiers (user-stated 2026-09-27):**

1. **Gate-passing** — renders at its own URL, segments pre-applied as
   active chips (`/anne-arundel/annapolis` loads with "Anne Arundel" +
   "Annapolis" set). Indexable, in sitemap, unique copy.
2. **Structurally valid but gate-off** — entities resolve, content not
   sufficient to index safely. Clean redirect to the nearest gate-passing
   ancestor (`/anne-arundel/annapolis` → `/anne-arundel`) while applying
   the requested combo's chips client-side. User keeps the narrowed view;
   Google sees only the canonical indexable URL — no doorway pages.
   Replaces TAGS.md's "gate-off = 404" for resolvable combos.
3. **Garbage / mispelled / unresolvable** — redirect to the hub with no
   active filtering (nothing resolvable to apply).

- Chips are removable. Removing one widens scope client-side on the same
  URL; strip all of them and the user is browsing the entire directory.
  Removing/adding chips never creates a URL — below-gate combos stay
  ungated, unindexed, canonical to the parent page.
- Paths therefore serve two roles at once: **SEO index drivers** (gate,
  sitemap, unique copy) and **preset active filters** — the payload per page
  is only that path's listing subset, not the whole directory. Chip removal
  that widens scope loads the wider set as needed.
- Filtering details follow from this directly: filter controls operate on
  the loaded rows (category, price sort, open-now from `hours` vs site's
  local Maryland time, verified = has verified-visit reviews, city
  checkboxes), rows and their map pins hide/show together, active chips
  render in the chip row with per-chip remove, Clear Filters resets to the
  path's default state.

## 4. Build notes (no open questions remaining)

- Chrome-absent fallback when `directoryPage` isn't seeded: render heading +
  list without chrome sections — the gate owns path existence, not chrome.

## 5. Implementation shape (when given the go)

1. Extend `getHubData` → path-aware: hub payload = the path's own listing
   rows (from `buildDirectoryIndex`), stamped with category, priceRange,
   hours, verified-visit, city.
2. `HubHeader`: accept `state.label` (rename prop or map at call site).
3. `HubDiscovery`: seed the chip row from the path segments (pre-applied
   filters), wire Category / Sort / Open Now / Verified / city checkboxes /
   Clear Filters client-side; pins and rows hide/show together; Clear
   Filters returns to the path's default state. Scope-widening chip removal
   loads the wider listing set as needed (payload = path subset first).
4. Route files: depth 1 renders hub for its geo-county paths; depth 2 hub
   for geo-city + type; depth 3 hub for type-county with detail fallback
   intact; depth 4 hub for type-city. Delete orphan Sidebar fallbacks.
5. Redirect tiers in the route files: gate-passing → render; resolvable
   combo → redirect to nearest gate-passing ancestor + seed its chips
   client-side; unresolvable → bare redirect to the hub. No 404s in the
   geo/combo space.
6. Sitemap/audit untouched — gate set unchanged; redirects and filtering
   add no URLs.
