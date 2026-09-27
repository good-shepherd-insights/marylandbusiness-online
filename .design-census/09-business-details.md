# Census 09 — BusinessDetails render pass

Source: UX Pilot design `yKiTibg7br0HIQXUrrkq` (1440×7488; full HTML extracted
from the MCP tool log). Schema + seed already existed (07-listings-schema.md);
this pass built the render layer only.

## Design → seeded-field mapping (all verified in dataset before build)
| Design band | Component (src/components/listings/) | Consumes |
|---|---|---|
| Breadcrumbs + H1 + rating + rank | DetailHeader.astro | name, county->, category->, computed avg/count from reviews, rankLine |
| Real-time pulse bar | PulseBar.astro | pulse (reverse-pulled): booked, capacityPct, waitMinutes |
| Promotions & coupons | Promotions.astro | promotions[2] (tone enum → coupon solid / gift outline) |
| Photo gallery mosaic | GalleryGrid.astro | gallery[4] (positional CSS spans, no data) |
| Vibe Check video | VibeCheck.astro | videoStill, videoHeading/Eyebrow/Caption/Duration; videoUrl null → static still |
| Editorials | Spotlight.astro (pre-existing) | editorialStories reverse-pull |
| Events & press | ListingEvents.astro | events[2]: month/day/time/venue/cta |
| About Us + Amenities | AboutAmenities.astro | aboutHeading, about (Portable Text), amenities[4] (icons `tabler:`+seeded bare name) |
| Why Choose Us | WhyChooseUs.astro | whyChooseUsHeading, whyChooseUs (Portable Text) |
| Menu & Signature Dishes | MenuSection.astro | menu[1 category / 4 items]; badge enum → dark/green/gold chips (display casing in component) |
| The People Behind | TeamSection.astro | team[3]: avatar/role/bio/cta |
| Verified achievements | AchievementsWall.astro | achievements[4]: icon (tabler), label, subLabel |
| Questions & Answers | QaSection.astro | qa[] (Q:/A: prefixes are markup, per 07 census) |
| Customer Sentiment | ReviewsSection.astro | reviews reverse-pull: avg/stars/distribution computed at render (never stored), verifiedVisit chips |
| Other Verified Restaurants | SimilarGrid.astro | similar[]-> after projection fix + seed patch below |
| Buy Box (right rail) | BuyBox.astro | priceRange, open-now computed from hours (America/New_York), ctaPrimary/Secondary, phone/website/address/directionsUrl, taxStatus/licenseNumber/lastAudit |

## Changes made this pass
- 14 new components + one layout branch; no schema changes.
- `src/layouts/Listing.astro`: new branch keyed on `frontmatter._type ===
  "listing"` (two-column grid, sticky buy box); MDX branches untouched.
- **Projection bug found + fixed** (`queries.ts`): `similar` is an array of
  references; the old `similar->{...}` dereference returned null. Now
  `similar[]->{...}`.
- **Seed patch** (one mutate): `listing.similar` ← 3 existing seafood
  listings (chesapeake-catch-grill, dockside-oyster-house, severn-raw-bar-crab-deck);
  `similarHeading` ← design string. Verified on published perspective; no
  drafts shadow.
- Zero `:hover`/transition CSS in every new component (V-10). Live ping dot
  kept (design-specified, LEDGER exemption).

## Open notes (flagged, not absorbed)
- Similar cards render **without links**: detail paths need city slugs the
  current projection doesn't pull (projection fix can add `city->{slug}`
  later).
- `[object Object]` in the **global AppShell header** `sr-only` social-link
  label is pre-existing template chrome, untouched this pass.
- Detail route lives at `/{county.slug}/{city.slug}/{listing.slug}`
  (= `/anne-arundel/annapolis/annapolis-blue-bistro`); flat
  `/annapolis-blue-bistro` is not a route.

## Verified
`/anne-arundel/annapolis/annapolis-blue-bistro` 200 with 47/47 seeded
strings across all 15 bands; computed avg 5.0 (2 reviews); 0 `:hover` rules
in new scoped CSS; `astro check` 0 errors / 0 warnings; home, /about,
county, blog regression 200.
