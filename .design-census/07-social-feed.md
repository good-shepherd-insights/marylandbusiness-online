# Census 07 — Live Social Validation Feed ("The Social Pulse")

Source: UX Pilot design `9CGLhn7IuWzEhRoEnKtp`, section `<section id="social">`.
Extracted markup: `/tmp/section-social.html`.

## Anchor
`<section id="social">` — last content band before footer.

## Structure
- Header row: h2 + description left; "Live Activity" indicator right (pulsing dot — presentation, CSS).
- Grid of 4 feed cards, borderless-gap, dark section (`#121212`, white/5 cards, white/10 borders).
- Card: avatar + name + location; star row; italic quote; footer row with activity icon + label.
- Below grid: centered ghost CTA button (border white/20).

## Design tokens observed
- Section bg `#121212`, text white; card bg `white/5`; borders `white/10`.
- Accent (stars, live dot) `#FFB612`; secondary `#EAAA00`; muted grays `#9CA3AF`/`#6B7280` (gray-400/500 as used by design).
- Feed item left border 4px secondary; hover border-left primary (CSS only).

## Exact copy (verbatim)
- H2: `The Social Pulse`
- Description: `See what's happening across Maryland's small business community in real-time. Verified reviews, bookings, and success stories.`
- Live label: `Live Activity`
- Item 1: name `Sarah T.`; location `Silver Spring, MD`; quote `"Found the perfect handcrafted MD flag gift at Chesapeake Craft. The service was unmatched!"`; activity `Purchased`.
- Item 2: name `Marcus L.`; location `Annapolis, MD`; quote `"Annapolis Blue Bistro serves the best cream of crab in the state. Just finished an amazing meal."`; activity `Booked`.
- Item 3: name `Janet D.`; location `Frederick, MD`; quote `"Old Line Legal made my LLC filing stress-free. Proud to support a veteran-owned business."`; activity `Consulted`.
- Item 4: name `David W.`; location `Baltimore, MD`; quote `"This directory is how I find all my local contractors. Just booked an electrician in minutes!"`; activity `Service`.
- CTA: `Join Community`

## Icons as designed → project (tabler) mapping
- `fa-solid fa-star` (rating row) → `tabler:star-filled` (verify before seed; design shows filled stars)
- `fa-solid fa-bag-shopping` (Purchased) → `tabler:shopping-bag` (verified)
- `fa-solid fa-utensils` (Booked) → `tabler:tools-kitchen-2` (verify before seed)
- `fa-solid fa-shield-check` (Consulted) → `tabler:shield-check` (verified)
- `fa-solid fa-bolt` (Service) → `tabler:bolt` (verified)

## Decomposition notes
- Component: `socialFeedItem` (avatar image+alt, name, location, quote, activityLabel, activityIcon).
- Section: `socialFeed` (heading, description, items[], ctaLabel).
- Star row is presentation (fixed 5 stars, CSS) — no per-item rating data in CMS. Live pulsing dot is CSS, not CMS.
