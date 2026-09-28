# Census 05 — Featured Business Cards ("Trending in Annapolis")

Source: UX Pilot design `9CGLhn7IuWzEhRoEnKtp` ("Maryland Business Online - Home"),
section `<section id="featured">`. Extracted markup: `/tmp/section-featured.html`.

## Anchor
`<section id="featured">` — third content band after hero/trust strip.

## Structure
- Header row: intro (eyebrow, h2, description) left; two round carousel buttons right.
- Grid of 3 business cards, borderless-gap (shared borders via border-t/l on grid + border-r/b on cards).
- Card: image (h-60) with overlay badge top-left + category tag bottom-left; body (title, star rating + stat line, 2-line description, action row: primary button + square icon button).

## Design tokens observed
- Background `#FDFCFB`; card background `#FAF7F2`; icon-button hover bg `#F8F7F6`.
- Border `#E3E0DC`; primary `#9D2235`; secondary `#EAAA00`; card-foreground `#121212`; muted-foreground `#555555`.
- Buttons square-cornered (radius 0); carousel buttons rounded-full. Verified badge: secondary bg, primary icon, 9px 800 uppercase. VET-OWNED badge variant: `#121212` bg, white text, secondary medal icon.

## Exact copy (verbatim)
- Eyebrow: `Hand-Picked for You`
- H2: `Trending in Annapolis`
- Description: `Businesses that have passed our 12-point verification check this month.`
- Card 1: image alt `authentic maryland crab house interior with nautical decor and warm lighting, professional food phot`; badge `VERIFIED`; category `Food & Dining`; title `Annapolis Blue Bistro`; rating `4.8 • 124 Reviews`; body `Historic district gem specializing in authentic jumbo lump crab cakes and local brews since 1982.`; button `Book Table`.
- Card 2: alt `modern boutique shop interior with artisanal maryland products, bright airy retail space`; badge `VERIFIED`; category `Retail`; title `Chesapeake Craft Co.`; rating `5.0 • 89 Reviews`; body `Curated local shop featuring Maryland's finest artisans. From hand-poured candles to custom leather goods.`; button `Shop Products`.
- Card 3: alt `professional smiling small business owner in a modern maryland office environment`; badge `VET-OWNED`; category `Legal`; title `Old Line Legal`; rating `4.9 • 200+ Cases`; body `Dedicated legal support for the Maryland entrepreneurial community. Veteran owned and operated.`; button `Free Consulting`.

## Icons as designed → project (tabler) mapping
- `fa-solid fa-chevron-left` → `tabler:chevron-left` (verified on disk)
- `fa-solid fa-chevron-right` → `tabler:chevron-right` (verified on disk)
- `fa-solid fa-circle-check` (verified badge) → `tabler:circle-check` (verified)
- `fa-solid fa-medal` (VET-OWNED badge) → `tabler:medal` (verify before seed)
- `fa-solid fa-star` / `fa-star-half-stroke` (rating) → `tabler:star` / `tabler:star-half-filled` (verify before seed)
- `fa-solid fa-phone` → `tabler:phone` (verified)
- `fa-solid fa-calendar` (card 3 icon button) → `tabler:calendar` (verify before seed)

## Decomposition notes
- Component: `featuredBusiness` (one card: image+alt, badgeLabel, badgeTone[verified|dark], category, title, rating stat line, description, ctaLabel, ctaIcon).
- Section: `featuredBusinesses` (eyebrow, heading, description; array of featuredBusiness; carousel arrows are presentation-only — fixed CSS/component, not CMS).
