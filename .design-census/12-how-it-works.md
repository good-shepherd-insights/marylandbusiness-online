# Census 12 — How it Works (design `RVvHKjae5SwV4XeyJzZj`)

1440×9270 desktop. No mobile companion — responsive per census-11 patterns.
8 content sections + site nav/footer (app shell). Tokens identical to the
family (#FAF7F2 bg, #9D2235 primary, #EAAA00 secondary, #FFB612 accent,
#E3E0DC border, Sora; buttons radius 0 here — this page's own token).

## Sections → schema
1. **hiwHeader** — bg #FDFCFB. Breadcrumb (Maryland › How It Works),
   secondary-bg route badge "From Application to Verified Listing",
   h1 "How Your Business Gets Listed, Verified, and Found", intro ¶,
   CTAs "Start Your Application" (+arrow icon, code) / "See Pricing",
   proof line "25,000+ Verified Businesses · Avg. 4–6 Day Review".
2. **hiwProcess** — eyebrow "The Process", h2 "Five steps from application
   to live listing.", sub ¶, 5 timeline steps (vertical line + 64px dots,
   step 05 dot = secondary gold): num, title, description, 2 meta chips
   (time / owner). Step icons are CODE literals (tabler, by index):
   file-pencil, search, stack-2, broadcast, chart-line.
3. **hiwValue** — eyebrow "What You Get", h2 "A verified listing does more
   than sit in a directory.", sub. 3 categories (tiles rotate by index:
   primary/secondary/dark): Visibility & Discovery, Trust Signals, Tools &
   Insight; each has intro ¶ + 4 check items (strings). Check = tabler:check.
4. **hiwWhy** — eyebrow "Why It Matters", h2 "Maryland businesses have been
   underserved by generic directories." Problem panel (#FDFCFB, chip
   "The Problem", 3 xmark items) vs solution panel (#FAF7F2, chip
   "Why This Directory", 4 check items). Then 3 stats (statItem):
   3.2× / Avg. Local Traffic Lift, 24 / Counties Served, 4–6d /
   Avg. Verification Time. xmark = tabler:x, check = tabler:check.
5. **hiwPricing** — eyebrow "Pricing", h2 "Four plans. Each one builds on
   the last.", sub. 4 plan cards: Featured $99/mo "Get verified and start
   showing up." (5 authored features); Enhanced $159/mo "More placement,
   more proof."; Preferred $297/mo "Priority visibility across the
   directory." badge "Most Popular"; Premier $895/mo "Maximum reach and
   full-service support." CTA per card "Choose {name}".
   CARD ANATOMY (corrected against MCP HTML 2026-09-26): every feature li =
   flex items-start gap-3 with icon — authored: fa-check primary; stubs:
   fa-plus foreground opacity-40 + placeholder-cell on both text spans.
   Upper 3 cards render a dashed divider row after the CTA:
   fa-layer-group (→ tabler:stack-2) secondary + label — CMS field
   `pricingPlan.includesLabel` ("Everything in Featured, plus:" etc.);
   Featured has none. Stub marking = `planFeature.placeholder` boolean
   (check vs plus + placeholder-cell derive from it).
6. **hiwComparison** — eyebrow "Compare Plans", h2 "Every feature, side by
   side." Columns DERIVED from hiwPricing plans (name + price/mo) — no
   duplication. 4 groups: Listing & SEO, Reviews & Hosting, Visibility &
   Trust, Tools & Support. Rows: feature + per-plan cell (check icon or
   short text; text cells render muted-italic per design .placeholder-cell).
   ⚠️ MOCK PLACEHOLDERS seeded as-authored: "Enhanced/Preferred/Premier-tier
   …feature" rows, empty cells, "Standard/Priority/Dedicated" support row —
   flagged for editorial replacement, NOT slop introduced by the build.
7. **hiwFaq** — eyebrow "FAQ", h2 "Common questions about listing your
   business." 8 accordion items (q/a), chevron = tabler:chevron-down,
   open-state rotate + max-height, tiny client script (behavior, not data).
8. **hiwCta** — bg #121212, white text. h2 "Ready to get verified and
   start showing up?" CTAs "Start Your Application" (primary) / "Review
   Pricing Again" (outline-light).

## Icon map (fa → tabler, all code literals)
route→tabler:route, arrow-right→tabler:arrow-right, file-pen→
tabler:file-pencil, magnifying-glass→tabler:search, layer-group→
tabler:stack-2, tower-broadcast→tabler:broadcast, chart-line→
tabler:chart-line, magnifying-glass-location→tabler:map-pin-search†,
shield-check→tabler:shield-check, gauge-high→tabler:gauge, check→
tabler:check, xmark→tabler:x, chevron-right→tabler:chevron-right,
chevron-down→tabler:chevron-down. † verify against @iconify-json/tabler
before use; fallback tabler:search.

## CMS mapping
All copy in section docs above (no validation rules per owner call 2026-09-26);
page `howItWorks` = title + 8 refs in render order. Comparison columns derive
from pricing plans at query/component level. No icons in the CMS (V-18 rule).
Object types: processStep, valueCategory (with string items), planFeature,
pricingPlan (with features[]), comparisonCell, comparisonRow,
comparisonGroup, faqItem — all in components/, registered.
