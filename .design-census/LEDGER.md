# Design Census Ledger — cross-pass source of truth

Project: marylandbusiness-online. Design: UX Pilot `9CGLhn7IuWzEhRoEnKtp`
("Maryland Business Online - Home", 1440w). Repo state at first pass:
Astro 7 + Sanity (project `j5pgwhz4`, dataset `production`), SSR on Vercel,
dev port 4324.

## Tiering model (derived from repo, 2026-09-26)
`src/sanity/schemaTypes/` four tiers:
- `components/` — smallest reusable object types (heroHeadingSegment,
  heroImage, heroSelectOption, trustSignal, countyHub, listingAddress,
  hourSpan, amenity, achievement, menuItem, menuCategory, listingEvent,
  qaItem, teamMember, promotion).
- `sections/` — one file per section, composes components (hero, trustStrip,
  countyHubs).
- `pages/` — one file per page document, composes sections (home, blogPost).
- `entities/` — content entities (listing reworked here 2026-09-26; category,
  county, review, pulse, editorialStory — see 07-listings-schema.md).
New sections/components follow exactly this pattern and register in
`schemaTypes/index.ts` between the corresponding tier imports.

## Repo facts (resolved each pass, recorded here for traceability)
- Types module: `src/lib/sanity/types.ts`; queries: `src/lib/sanity/queries.ts`.
- Section components: `src/components/sections/<Name>.astro` (props = CMS object,
  render nothing when absent/empty, scoped styles + local CSS tokens).
- Page wiring: `src/pages/[...slug].astro` (home branch renders sections).
- Icons: tabler via astro-icon; verify every name against
  `node_modules/@iconify-json/tabler/icons.json` before component/seed writes.
- Studio: embedded at `/admin`; draft/visual editing live (perspective cookie).
- Data seeding: write token from `.env` (never printed); verify published AND
  drafts perspectives after writes (V-06).

## Sections status
| # | Section | Census | Schema | Component | Wired | Seeded |
|---|---------|--------|--------|-----------|-------|--------|
| 2 | hero | n/a (pre-existing) | ✅ | ✅ Hero.astro | ✅ | ✅ (pre-existing) |
| 3 | trustStrip | n/a (pre-existing) | ✅ | ✅ TrustStrip.astro | ✅ | ✅ (pre-existing) |
| 4 | countyHubs | n/a (pre-existing) | ✅ | ✅ CountyHubs.astro | ✅ | ✅ (pre-existing) |
| 5 | featuredBusinesses | ✅ 05-featured-business.md | ✅ | ✅ FeaturedBusinesses.astro | ✅ | ✅ (2026-09-26: 3 cards, 3 assets) |
| 6 | editorial | ✅ 06-editorial.md | ✅ | ✅ Editorial.astro | ✅ | ✅ (2026-09-26: quote + 2 stories, 1 asset) |
| 10 | resources page (6 sections) | ✅ 10-resources.md | ✅ | ✅ ResourcesIntro/RegulatoryUpdates/FeaturedPrograms/CountyJump/ResourceDirectory/AlertSignup | ✅ static route `/resources` | ✅ (2026-09-26: 4 updates, 3 programs, 6 cards, 3 deadlines) |
| 7 | socialFeed | ✅ 07-social-feed.md | ✅ | ✅ SocialFeed.astro | ✅ | ✅ (2026-09-26: 4 items, 4 avatars) |

## Seeding record (2026-09-26)
- Architecture at seed time: user's refactor live — sections are standalone
  documents; `home` references them; GROQ dereferences with `->`.
- Seeded docs by fixed `_id` (`featuredBusinesses`, `editorial`, `socialFeed`);
  `home` patched with `setIfMissing` references; all six references verified.
- 8 images uploaded via `client.assets.upload` (design placeholder URLs
  re-uploaded into Sanity assets; asset ids recorded in git history of this
  pass, not repeated here).
- CTA links seeded as `https://example.com/...` placeholders (design had `#`).
- Copy verbatim from census files; icons only from verified tabler mappings.
- V-06 check: stale `drafts.home` (pre-refactor shape) deleted; verified
  `remaining stale drafts: []` across all seven doc types.

## Listings schema seed (2026-09-26, second pass)

See `07-listings-schema.md` for the full record. 6 entity docs written in one
atomic mutate; 7 template listings wiped; 14 images uploaded as Sanity assets;
icon names verified against installed tabler set; placeholder-URL policy and
review-attribution decisions documented in the census. Draft-shadow check
clean (only preview-url-secrets + one pre-existing blogPost draft remain).

## Decisions
- 2026-09-26: Star rows, live-dot pulse, carousel arrows, hover states = CSS
  presentation, never CMS data (V-01/V-03 doctrine).
- 2026-09-26 (rev.): Hover states removed entirely by user order (V-10) —
  none of the design's hover effects were real; do not re-add. Live-dot pulse
  and carousel dots/arrows remain (design-specified).
- 2026-09-26: No modification of existing schema types; three new section
  files + three new component files only.
- Icon mappings recorded per-census; unverified names re-checked at seed time.

## Open questions
- None blocking. Seed images: reuse design's Google-hosted placeholders via
  CMS asset upload (image URLs are ephemeral-ish; re-upload into Sanity assets).

## Render-fix + hardening pass (2026-09-26)

Approved plan (`~/.claude/plans/lexical-seeking-lamport.md`) executed in full:
6 directory cards/layouts fixed off astro:assets onto `sanityImageUrl`;
schema hardened per plan Group B (enum validations ×6, price→number, alt
required ×7 image fields, projection honesty, slim OG query, dropped
initialValues, video block +eyebrow/+caption); editorialStory restructured to
entity doc, 2 stories seeded + Spotlight consumer wired into Listing layout;
orphan `similarHeading` nulled. Verified 0 errors / 0 warnings / 0 schema
warnings; OG PNG and listing page render clean. Deviations logged
VIOLATIONS.md V-11–V-15 (linkless spotlight CTA/cards, chip enum casing,
/tags config-keyed routing). Sanity CLI adopted for reads mid-pass
(`documents query` positional); no mutate command exists — writes stay HTTP.

## About page build + seed (2026-09-26, third pass)

See `08-about.md` for the census. User ordered "build it and seed it end to
end" with explicit constraints: no hardcoding, enums/lists where fitting,
scalable/clean/consistent, no overengineering.

**Modeling decisions (anti-overengineering):**
- Arrays only where editorially variable: stats(4), pillars(4), arms(3),
  partners(4), origin paragraphs(3).
- Plain fields for singular content: aboutHeader (5 fields), missionBand (2
  fields), closingCta (two explicit label/link pairs — a list would erase the
  primary/secondary semantic distinction).
- NO enums needed anywhere: pillar/offer/partner icon tints cycle by position
  (CSS nth-child, TrustStrip pattern); tint-as-data was rejected as
  over-modeling.
- Icon names verified against installed tabler set before seed; 4 designed
  FA icons translated (feather-pointed→feather, map-location-dot→map-2,
  landmark→building-bank, book-bookmark→bookmark, handshake→heart-handshake).
- Zero hover/transition CSS (V-10).

**Wiring discovery:** `src/pages/[county]/index.astro` shadows `[...slug]` for
ALL single-segment URLs (named > rest params) — the /about 404 came from
there, not from [...slug].astro (which never receives single-segment slugs
for about). Fix: named-page branch added to [county]/index.astro; the
duplicate branch in [...slug].astro left (harmless, unreachable via URL).
Future named pages must go through [county]/index.astro's priority chain.

**Seed correction:** paragraphs were first written as Portable Text blocks,
rendering `[object Object]` — schema says array-of-string. Repatched with
`autoGenerateArrayKeys` as plain strings; re-render verified. Seed data must
match schema cardinality exactly (block vs string).

**Verified:** /about 200 with all 37 census strings present; 0 :hover rules in
our sections; `[object Object]` gone; astro check 0 errors/0 warnings; home,
listing, blog routes still 200. 9 docs + 1 asset seeded; all 8 references on
the about page resolve; 0 stale drafts on the nine About types.

## BusinessDetails render pass (2026-09-26, fourth pass)

See `09-business-details.md`. User ordered the page built section by section.
Schema + seed already existed; render layer only — 14 components under
`src/components/listings/` + a `frontmatter._type === "listing"` branch in
`Listing.astro` (two-column: content bands left, sticky Buy Box right, in
design order). No schema changes.

- **Projection fix**: `similar->{...}` → `similar[]->{...}` (field is an
  array of references; the old single-arrow deref silently returned null).
  New-comment-inside-GROQ-template mishap caused a 500 mid-pass; caught by
  dev log, fixed immediately.
- **Seed patch**: `listing.similar` ← the 3 existing seafood listings;
  `similarHeading` set. No drafts shadow.
- Open-now status + rating aggregates computed at render (structured hours +
  review docs), never stored (V-01 doctrine). Live ping dot design-exempt.
- Zero hover/transition CSS in all 14 components (V-10).

**Verified:** `/anne-arundel/annapolis/annapolis-blue-bistro` 200, 47/47
seeded strings, computed 5.0 avg, 0 :hover in scoped styles, astro check
0/0, home/about/county/blog 200. Flagged (not fixed, by design): similar
cards linkless (city slugs not in projection); pre-existing AppShell
`sr-only` `[object Object]` chrome bug noted.

## BusinessDetails design-fidelity pass (2026-09-26, fifth pass)

First render (fourth pass) was built from the design markup but styled with
hand-rolled CSS and never visually compared — V-17. This pass enforced the
new SKILL gate (design referenced before AND after):

- Extracted the design's OWN stylesheet from the UX Pilot design HTML
  (`yKiTibg7br0HIQXUrrkq`): Sora font, exact design-system classes.
- **No global CSS** (user order): every rule lives scoped in each section
  component; Sora loaded via `@fontsource-variable/sora` (new dep, repo
  pattern) + wrapper font-style; zero hover/transition (design's hover
  rules intentionally dropped, V-10 standing).
- Design-system values now exact: btn 12px/2px-outline/radius-0; buy-box
  sticky 100px, #FAF7F2, 2px dark border, 12px offset shadow, 40px padding;
  stars 14px accent #FFB612; rating bars 8px #EEE with accent fill +
  design opacity fade (1/.6/.4/.2/.2); qa-item 24px rows with borders;
  photo-grid-item bordered; section rhythm 64px/64px + 1px bottom border
  with design overrides (promotions 0/0, vibe-check pb-0, similar
  borderless); pulse nested in intro block (24/48); "30-Second Walkthrough"
  renders from seeded `videoLabel`; Spotlight aligned to the same rhythm.
- Chrome DevTools MCP verification on the live page: computed styles for
  font, buy-box, section paddings/borders, buttons, stars, bars, qa rows —
  all equal to the design stylesheet values; no horizontal overflow; buy
  box inside aside bounds; zero template chrome in the tree.
- Full-page Chrome screenshot: `.design-census/chrome-mcp-verified.png`.
- astro check 0 errors / 0 warnings.
- Button fix (same pass): scoped button rules had dropped display:block +
  text-align:center, so anchor CTAs with w-full (coupon cards, buy box)
  collapsed to text width — the "shifted/mangled" defect. Restored; Chrome
  MCP re-verified: promo CTAs 339px full-card, buy-box CTAs 270px full
  width, event/menu CTAs content-width per design; contact rows 270px.
- Buy Box scale-down (same pass, user order): box was 747px vs 642px
  viewport — bottom unreachable under sticky. Scaled properly (padding
  40→20, tier/CTA/contact/verification spacing tightened, price text-3xl→
  text-2xl, CTAs py-5→py-3, icon-box 2rem→1.75rem, body text 13px).
  Result: 541px tall, fully visible under 64px sticky top with 37px spare.
  Verified via Chrome MCP; screenshot refreshed.
- Hardcode-to-CMS migration pass (user order): every content string +
  icon on the BusinessDetails render layer moved into the CMS.
  listing +32 fields (breadcrumb root/separator, share/save, review count
  labels, rating icon, pulse templates x3 + icons x2, verified-visit +
  star labels, QA prefixes, video play icon, menu CTA icon, buy box
  labels/icons x18), editorialStory +ctaLabel/ctaIcon (seeded x2), badge
  + tax-status display values now read from their schema enum titles
  (single source of truth, exported BADGES / TAX_STATUSES).
  Components now render zero literal content: DetailHeader, PulseBar
  (template split on {n}), QaSection, ReviewsSection, VibeCheckMedia,
  MenuSection, Spotlight, BuyBox. Fixed double-tilde in wait template
  during verification. astro check 0/0; Chrome MCP: 22/22 CMS strings on
  page, 20 star icons, 4 buy-box icons, play icon present. Re-audit scan:
  only remaining literals are the template-era tabler:arrow-up-right in
  TitleHeader + Listing MDX branch (pre-existing template legacy, not
  listing content).
- Icon doctrine pivot (user edit + this pass): icons are code chrome —
  literal tabler names in components; the CMS icon-field indirection
  (ratingIcon, phoneIcon, etc.) removed from schema/types/queries and the
  12 orphaned seeded values unset on the listing doc. Labels, sentences,
  templates and counts stay CMS-driven. Fixed ReviewsSection star rows
  stacking vertically (Tailwind preflight svg display:block; rows lacked
  flex) — added flex items-center gap-1 to aggregate + per-review rows;
  MCP geometry check: 3 rows x 5 svgs, same top, left-to-right. Dropped
  duplicate Icon import in Spotlight and the stale videoPlayIcon gate in
  VibeCheckMedia (user had already reverted the rest). astro check 0/0.
- Final audit + console-trace pass: scanned full render layer (listings
  components, Listing layout, listing routes) for hardcoded content —
  clean. Remaining literals are tabler icon names (allowed per icon
  pivot), aria-label "Share"/"Save" (flagged, user decision), and the
  home-page heading "Browse by business type" (home scope, no CMS field).
  Traced the long-standing console TypeError to
  components/analytics/Posthog.astro — template analytics boots with
  undefined POSTHOG_API_HOST and crashes on api_host.replace. Guarded
  init behind key+host check. Dev server restarted --force; console now
  0 errors/warnings; page 200; 8/8 spot strings; 3/3 star rows
  horizontal; buy box fits viewport.
- Home hardcode fix (user order): "Browse by business type" heading on
  the home category list moved into the CMS as flat `categoriesHeading`
  on the home singleton (page-owns-its-chrome-labels pattern). Schema +
  projection + type + [...slug].astro rewire + seeded + verified on the
  live home page. Source tree now contains zero instances of the literal.
- Audit fixes 1+2 (user order): (1) SocialFeed "Live Activity" badge is
  now CMS content — `liveLabel` required field on the socialFeed section
  doc, seeded, rendered via home.socialFeed; dot stays CSS. (2)
  SidebarTags template nav ("Home/Categories/Counties") orphaned from
  SidebarShell (default showSidebar removed) — category hub pages
  (/restaurant/seafood verified) no longer render any sidebar nav;
  SidebarTags.astro now importer-less like Footer/Navbar.
  astro check 0 warnings; home badge verified via Chrome MCP.
- Site settings migration (user order, interim values): new siteSettings
  singleton (siteTitle, seoName, seoDescription, seoUrl, searchPlaceholder,
  logoIcon) registered in the pages tier. getSiteSettings() with TOML
  fallbacks wired into BaseLayout (tab title, meta/OG/twitter tags; the
  hardcoded "Astro description" duplicate meta removed; twitter:domain now
  derived from seoUrl instead of the demo codeagents.dev), Listing +
  Article title fallbacks, both OG image routes, getOGImage (optional
  baseUrl), Search placeholder. Seeded interim identity: "Maryland
  Business Directory" — seoUrl + final copy await real values (Studio-
  editable). Fixed two pre-existing share-image bugs surfaced by the pass:
  OG route 404 for nested listing URLs (flat-slug resolution) and home
  og:image /og/undefined.png (ogSlug ?? index). Verified: tab title CMS,
  og bistro 200 (151KB PNG), og index 200, astro check 0 warnings.
- Invisible-char guard (user order, lean): shared rejectInvisibleChars()
  validator in schemaTypes/validation/strings.ts wired into every icon
  field in the schema (partner, featuredBusiness.ctaIcon,
  socialFeedItem.activityIcon, offerArm, pillar, trustSignal, hero badge,
  siteSettings.logoIcon). Studio and sanity-validate writes now reject
  icon names carrying zero-width/BOM/direction characters. Unit-checked
  7/7 (clean names pass, poisoned fail); astro check 0 warnings. Audit
  context: full dataset (92 docs incl. drafts) + source tree scanned —
  zero invisible chars anywhere; the pasted tabler:phone overlay was a
  stale artifact, no live source.

## Resources pass decisions (2026-09-26)
- Page doc `resources` + 6 section docs (singleton _id = type name) + 4
  component objects; static route `src/pages/resources.astro` — named pages
  never enter `[category]` (user-ordered).
- Icon names as CMS text = user-approved exception to V-18 (icons
  acceptable text, images not); all seeded names verified on disk.
- County-jump chips come from live gate hubs (only Anne Arundel passes
  today — sparse by design, NOT seeded fake jurisdictions).
- Design's toolbar "Active:" chips = client-side filter state, not content
  (TAGS.md) — intentionally not rendered; logged as intentional deviation.
- Card link labels ("Visit Program", "Visit Resource", "Read Official
  Notice") are section-level single-source fields, not per-card.
