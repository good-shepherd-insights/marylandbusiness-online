# Census 11 — Directory Page - Mobile (design `ArCZE19jrP26eGm7pQ4L`)

375×1169 viewport, same "MDDirectory - Hub" lineage as census 10 (desktop).
Child of the original hub design; companion to desktop `2XwzGY4xF7i7yOAy0OGj`.

## Section order (mobile)
1. Site nav (60px sticky) — app shell scope, NOT hub sections.
2. Hub header (condensed): breadcrumb 8px (MD › Montgomery), h1 24px
   extrabold uppercase tracking-tight, NO Live Updates badge on mobile.
   Stats: full-width strip, border-t/b, py-4, flex gap-4, items divided by
   border-r; value 18px (2nd value in --primary), label 8px. Short mock
   labels ("Units", "Impact") = mock variance — reuse the CMS stat items.
3. Map preview: fixed 200px strip, border-b; dotted-paper texture
   (#F3EFE8, 20px radial dots) as map placeholder; centered
   "Interactive Map View" btn-outline w/ shadow + card-foreground border;
   2 square crimson markers. Real build: live Google map in the strip,
   button expands to a fullscreen overlay (proper mobile pattern).
4. Filter bar: sticky under nav (top-0 in build), white bg, p-3,
   horizontal scroll chips (no scrollbar): Category, Retail, Services,
   Open Now → build reuses CMS labels: categoryFilterLabel,
   sortFilterLabel, openNowChipLabel, verifiedLabel.
5. Business rows: p-4, gap-4; image 80px + grayscale (mobile-only token);
   title 12px truncate; badge 8px (secondary bg; black badge on row 2 =
   mock variance, keep verified styling); stars 10px, rating text 8px;
   description 10px line-clamp-2; CTA flex-1 py-2.5 + 36px icon button
   (row 2 shows location-dot = mock variance; phone button everywhere).
6. Expertise band: bg #F3EFE8, p-6; heading 9px primary tracking-[0.2em];
   stats stacked rows (flex justify-between, p-3, white, border; label
   muted 8px left, value 9px right). Desktop shows the same data as a
   2-col grid — same CMS expertiseStats, responsive layout only.
7. Site footer — app shell scope.

## Tokens (same family as census 10; deltas only)
- Map paper: #F3EFE8 + dotted radial texture (replaced by live tiles).
- Buttons: radius 0 on mobile (`select, button { border-radius: 0 }`),
  4px on desktop hub — responsive radius via media query.
- Grayscale images below `lg`.
- No hovers anywhere (V-10 holds).

## Icons (fa → tabler)
map-location-dot → live map tiles; chevron-right → tabler:chevron-right;
star / star-half-stroke → tabler:star / tabler:star-half; phone →
tabler:phone; x (close) → tabler:x.

## CMS mapping
- NEW: hubDiscovery.interactiveMapLabel ("Interactive Map View"),
  hubDiscovery.interactiveMapCloseLabel ("Close" for the overlay's
  icon-only button — a11y text must not be hardcoded, V-19 class).
- Everything else reuses hubHeader/hubDiscovery/listing fields; county,
  stats values, rows, ratings, city counts stay computed/seeded data.

## Google Maps mobile behavior (proper)
- Preview strip: real map, lazy-loaded, gestureHandling cooperative
  (page scroll never hijacked), controls off, markers tap → scroll/flash
  the business row.
- "Interactive Map View" → fullscreen fixed overlay: zoom control
  (RIGHT_BOTTOM), Map/Satellite toggle visible, close button (CMS
  label), body scroll locked, window resize dispatched so tiles repaint.
- No key / no pins → 200px quiet strip, button hidden.
