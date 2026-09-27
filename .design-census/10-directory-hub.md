# 10 — Directory (County Hub) — design 2XwzGY4xF7i7yOAy0OGj

Source: UX Pilot "Directory" (prompt "MDDirectory - Hub"), desktop 1440,
canvas height 1304 (viewport-locked app layout). Parent: 5qXk16qfV9APyOVMxUCo.
Mobile variant exists (ArCZE19jrP26eGm7pQ4L) — desktop is the build target.

## Sections (design order)
1. NAV (site chrome, "Reused Branding") — SKIP: site nav orphaned by order
   (V-series). Intentional deviation, documented.
2. REGIONAL COMMAND CENTER header (bg #FAF7F2, border-b, px-8 py-6,
   max-w-[1600px]):
   - breadcrumb: "Maryland" (link) + chevron + "Montgomery County" (primary)
     — 9px bold uppercase tracking-[0.2em], mb-3
   - h1 "Montgomery County Hub" text-4xl extrabold uppercase tracking-tight
     + live badge: secondary/10 bg, secondary/20 border, ping dot green,
     "Live Updates" 9px bold uppercase
   - right stats (border-l pl-12, gap-12, hidden lg:flex): 3 stat blocks,
     value text-xl extrabold, label 9px bold muted uppercase:
     2,451/Active Units, $1.2B (primary)/Local Impact, 98%/Compliance
3. SPLIT VIEW .pane-split (calc(100vh - 144px), flex):
   LEFT (flex-1 bg #F5F4F2): map mockup — 400px faint map icon (20% opacity),
   top-left overlay: Map/Satellite toggle (white border box, active dark),
   "Region Focus" panel (w-64 shadow-xl, heading 10px extrabold uppercase
   border-b pb-2, checkbox rows: city name + count, accent primary),
   marker = 12px primary square rotate-45 white border (labeled marker:
   white card 9px extrabold uppercase), zoom plus/minus buttons bottom-right.
   RIGHT (w-[500px] border-l bg #FAF7F2 flex col):
   a) filter header (p-6 border-b): "Browse Directory" 11px extrabold
      uppercase tracking-[0.2em] + "Clear Filters" 10px primary; 2-col grid
      btn-outline py-3: "Category" (filter icon), "Price: Low-High" (sort
      icon); chips mt-4: bg #F3EFE8 border, 9px bold uppercase: "Open Now",
      "Verified" (xmark icon each)
   b) list (flex-1 overflow-y-auto custom-scrollbar): item = .business-list-item
      p-6 border-b, 96px image (border), name text-sm extrabold uppercase,
      verified badge (secondary bg 9px 800 uppercase; item2 variant dark),
      yelp rating stars 11px accent + "4.8 (124)" 9px muted uppercase,
      description 11px line-clamp-2, CTA row: btn-primary flex-1 py-2.5
      text-[10px] (per-listing label) + 40px icon button (phone)
      Design items: Annapolis Blue Bistro (Quick Book), Chesapeake Craft Co.
      (Shop Now), Old Line Legal (Free Consultation), Rockville Roast
      (Order Pickup) — mock rows; real data = county listings.
   c) "County Expertise" band (p-6 bg #F3EFE8 border-t): heading 10px
      extrabold uppercase tracking-[0.2em] primary; 2-col grid of white
      cards p-4: label 10px extrabold uppercase / value xs bold:
      Top Sector → Biotech & Health, Growth Index → +12.4% YoY

## Tokens (design :root — same family as listing page)
--background #FAF7F2, --foreground #555555, --card #FFFFFF,
--card-foreground #121212, --primary #9D2235, --primary-foreground #FFFFFF,
--secondary #EAAA00, --secondary-foreground #121212, --accent #FFB612,
--border #E3E0DC, --font-sans 'Sora' (variable installed), shadow
0 0 32px rgba(18,18,18,0.08). btn-primary radius 4px (NOTE: differs from
listing page radius-0), 11px, uppercase, ls .05em. No transitions/hovers
(V-10 standing rule — design hovers dropped).

## Icon map (font-awesome → tabler, verified in @iconify-json/tabler)
magnifying-glass→search, chevron-right→chevron-right, map-location-dot→map,
plus→plus, minus→minus, filter→filter, sort→sort-descending, xmark→x,
star→star, star-half-stroke→star-half, phone→phone, location-arrow→map-pin
(per-item variance = mock noise; secondary action is tel: → phone for all),
calendar-check→(unused, same rule)

## CMS mapping (no hardcoded text/images; icons = frontend literals)
- directoryPage (pages/, extend skeleton per its own mapping note): title +
  refs hubHeader + hubDiscovery (pages hold references only).
- sections/hubHeader.ts: breadcrumbRoot "Maryland", liveBadgeLabel
  "Live Updates", stats statItem[] (reuse existing component): 2,451/Active
  Units, $1.2B/Local Impact, 98%/Compliance.
- sections/hubDiscovery.ts: browseHeading "Browse Directory",
  clearFiltersLabel "Clear Filters", categoryFilterLabel "Category",
  sortFilterLabel "Price: Low-High", verifiedLabel "Verified" (chip + item
  badge share one source), openNowChipLabel "Open Now",
  mapToggleMapLabel "Map", mapToggleSatelliteLabel "Satellite",
  regionFocusHeading "Region Focus", expertiseHeading "County Expertise",
  expertiseStats statItem[]: Biotech & Health/Top Sector, +12.4% YoY/Growth
  Index.
- County name/breadcrumb current: county entity. City rows + counts:
  computed by grouping county listings on city. Business list: county
  listings (image/name/description/taxStatus→badge/ctaPrimaryLabel/url/
  phone/rating computed from reviews[]->rating). Stats values are content
  (no data source) → CMS per census; counts (cities, list) computed.
