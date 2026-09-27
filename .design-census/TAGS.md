# TAGS — URL structure + path gate (user-stated 2026-09-26)

Single spec for the directory's URL system: two axes (type, geography), the
route grammar, and the safety guardrails deciding which paths exist. Nothing
built until explicit go.

## Two axes

- **Type axis (categories)** — what a business *is*: categories and
  subcategories (e.g. Restaurant → Seafood). Independent of geography.
- **Geography axis (tags)** — where it is: county/city hierarchy. Listings
  carry county + city tags.

## Route grammar

Bracket segments are placeholders replaced by real slugs — never literal
path words. `[category]` is the parent category (e.g. `restaurant`),
`[subcategory]` its child (e.g. `seafood`).

```
/                                      → hub: all categories (browse by business type)
/[category]                            → parent category, e.g. /restaurant
/[category]/[subcategory]              → subcategory, e.g. /restaurant/seafood
/[category]/[subcategory]/[county]     → subcategory scoped to county
                                       → e.g. /restaurant/seafood/anne-arundel
/[category]/[subcategory]/[county]/[city]
                                       → e.g. /restaurant/seafood/anne-arundel/annapolis
/[county]                              → all listings with that county tag
                                       → e.g. /anne-arundel
/[county]/[city]                       → same, scoped to the specific city
                                       → e.g. /anne-arundel/annapolis
/[county]/[city]/[business]            → the business detail page
                                       → e.g. /anne-arundel/annapolis/annapolis-blue-bistro
```

- Path-based location scoping on the category axis exists only for
  combinations that pass the gate (below); otherwise location is page-level
  filtering only.
- Page filtering is always possible on any category page, regardless of gate
  state. Filtering is client-side and never indexed.
- Listing detail path is geographic (`/[county]/[city]/[business]`), not
  category-based — the two axes are alternate discovery routes to the same
  detail pages.

## Path gate (mechanical)

A path segment combination exists only when the gate passes. Gate inputs:

1. **Listing volume** — count of listings in the combination, from a
   build-time reverse GROQ grouping. 0 listings → path must not exist at all
   (404). Threshold (e.g. ≥3) for higher levels TBD at build.
2. **Unique copy** — required per-combination intro field filled. Empty → no
   path. Plus the real data layer (business names, counts, hours) that
   differs per combination — this is the substance Google requires.
3. **Search demand** — the human-input signal: GSC queries actually reaching
   the site (best once live) and/or keyword-tool volume for the combo query.
   Overrides the mechanical default both ways.
4. **Per-combo human override** — each combination can be forced on or off
   by a person, overriding the mechanical result (user-stated 2026-09-26).
   No global kill-switch; control is per combo. The override lives in one
   place (config/CMS doc, not code edits) so toggling is trivial.

Mechanics: build-time script computes the qualifying set; route handlers
return 404 for anything outside it; sitemap is generated from the same set.
No demotion problem — paths never exist unless qualified.

## Auditability (user-stated 2026-09-26: everything easily auditable)

Every path's state is derivable and inspectable:

- **Single-state view**: one query/listing shows every candidate combination
  with its inputs (listing count, copy present/absent, demand note) and its
  outcome (path on / off) plus the deciding reason — mechanical gate or
  human override (which, who set it, when).
- Overrides are recorded as data (value, timestamp, author, note), so any
  path's on/off state traces to a specific human decision or a mechanical
  rule result.
- The qualifying set, the sitemap, and the audit view are all computed from
  the same inputs — no layer can disagree with another.

## Safety guardrails

- 0 listings → path never exists, regardless of demand or copy.
- Page-level filtering always available, never gated, never indexed
  (client-side; no indexable URLs generated).
- Qualifying paths need unique copy — no templated city/county pages (Google
  doorway abuse + scaled content abuse policies).
- Sitemap lists only gate-passing URLs.
- On-page filter combinations (below gate) canonical to the parent page.

## Data model

- `county` — entity exists.
- `city` — entity exists, referenced by listing.
- `category` — parent entity (Restaurant). Plain: name/slug/description.
- `subcategory` — own entity (user-stated 2026-09-26, replaces the earlier
  self-reference proposal): name/slug/description + required `parent`
  reference to `category`. Listings reference their subcategory; the parent
  supplies the first URL segment (`/restaurant/seafood`).
- Listing detail path moves from flat `/<slug>` to
  `/[county]/[city]/[business]` — `[...slug].astro` restructures to the
  geographic hierarchy.

## What retires

- `/tags/*` route and the template tag list in `src/config/settings.toml`
  (breathing/sleep/meditation/yoga/timer) — template cruft.
- Literal `/categories` route prefix and its hub page — wrong reading of the
  `[category]` placeholder (2026-09-26 correction); hub lives at `/`.
- The tag mechanism (card chips, sidebar, live grid filter) reads
  county/city/category from CMS instead of config keys; `data-tags` stamps
  county/city/category slugs.

## Open

- Volume threshold values per path level (county vs city, type-only vs
  type+geo) — set at build.
- Whether city level always present in the path, or optional when county
  entry suffices.
- Subcategory modeling (proposed: category self-reference) — pending go.