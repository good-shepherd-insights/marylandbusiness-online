# Census 13 — Home Content Expansion (design `eCLIzpc6YQX6IWXMoSHA`, v2)

Source: UX Pilot `eCLIzpc6YQX6IWXMoSHA` ("MDDirectory - Home Content Expansion", 1440×4578,
child of `WIQuhIbVTXLizf9QhWEi`). Component set of 5 sections appended to the home page
after SocialFeed, in the design's internal order. Design-authored preview footer is NOT
a section (footer remains unauthorized, V-20).

Tokens (same system as rest of site): bg `#FAF7F2`, card `#FFFFFF`, fg `#555555`,
card-fg `#121212`, primary `#9D2235`, secondary `#EAAA00`, border `#E3E0DC`,
font Sora, square corners (border-radius 0), micro-eyebrows 10px/800/tracking-[0.2em].

---

## §1 Daily Maryland News Feed (`news-feed` → `homeNews`)

- `py-24 px-4 md:px-12 bg-[#FAF7F2]`, `max-w-7xl`; header flex col→row, items-end, mb-16.
- Left: 32×2px primary bar + eyebrow **"Daily News Wire"** (primary, 10px, 800, 0.2em, upper);
  h2 **"Maryland Business Pulse"** (4xl/5xl, 800, `#121212`, mb-6);
  sub **"Today's essential headlines for local commerce, policy, and community activity."** (lg, `#555`).
- Right: pulsing gold dot (`animate-ping`) + **"Refreshed 9:00 AM Daily"** (10px, 800, gold, 0.2em, upper).
- White bordered list; each row `p-6 md:p-8` flex col→row gap-6 items-center:
  - Tag chip (w-32 col, shrink): 8px 800 0.15em upper, 2px/8px pad, 1px border.
    Tone per row index — 1: primary (red text/border/5% bg), 2: blue-700, 3: green-700, 4: orange-700.
    **Tone is a frontend literal map by index — never stored in CMS.**
  - Headline (lg, 700, `#121212`, hover primary) + excerpt (sm, `#555`, line-clamp-1).
  - Right col: place (10px, 700, upper, widest) + time label (9px, 700, muted, upper, widest).
- Bottom band `bg-[#F8F7F6]` centered: **"Browse Full News Archive"** + arrow (10px 800 0.2em upper).

Design rows (seeded as authored):
1. Openings / "Chesapeake Craft Co. Expands with Second Storefront in Historic Annapolis" /
   "The local artisan retailer brings curated Maryland-made goods to the harbor district." /
   Anne Arundel Co. / 2 Hours Ago
2. Economy / "Maryland Small Business Lending Sees Q1 Uptick as Rates Stabilize" /
   "Community banks report increased application volume for commercial expansion loans across the shore." /
   Statewide / Today, 7:14 AM
3. Events / "Baltimore Restaurant Week Returns with Over 40 Verified Local Participants" /
   "Annual dining event highlights the city's culinary diversity with fixed-price menu specials." /
   Baltimore City / Yesterday
4. Policy / "New Tax Credits for Veteran-Owned Businesses Set to Take Effect July 1st" /
   "Legislation aims to support Maryland's 60,000 veteran entrepreneurs with payroll relief." /
   Montgomery Co. / Yesterday

## §2 Start Here Curated Pathways (`pathways` → `homePathways`)

- `py-24 px-4 md:px-12 bg-white border-y`, `max-w-7xl`; header max-w-2xl mb-16:
  eyebrow **"Guided Discovery"**, h2 **"How can we help you today?"**,
  sub **"Select the path that matches your needs for tailored local guidance."**
- Grid md:3 gap-8. Card: `p-10` 1px border white bg, hover: border darkens + `translateY(-4px)`.
  Icon box 12×12 centered mb-8 (tone by index, frontend literal): 1 red 5%/10% tint, icon primary;
  2 gold 10%/20% tint, icon `#121212`; 3 `#121212` 5%/10% tint, icon `#121212`.
  **Icons are frontend tabler literals by position (fa-house-user → `tabler:home-2`,
  fa-shield-halved → `tabler:shield-check`, fa-briefcase → `tabler:briefcase`) — never in CMS (V-18).**
  h3 xl 800 uppercase mb-4; body sm mb-8; `mt-auto` stack of link-buttons (space-y-3):
  `p-3 bg-[#FAF7F2]` 1px border, xs 700, label left + chevron-right right.

Design cards (seeded as authored; link hrefs mapped to real routes — flagged):
1. **New to Maryland** — "Settling into the Free State? Start by exploring your specific county
   hub to find the essential services and shops that define your new community."
   Links: "Find My County Hub" (→ `/`), "Read Local Stories" (→ `/blog`).
2. **Find a Trusted Pro** — "Need someone you can rely on? Every business in our directory is
   cross-checked against state registries so you can hire with total confidence."
   Links: "Browse Verified Categories" (→ `/`), "Learn About Verification" (→ `/how-it-works`).
3. **I Own a Business** — "Ready to grow your local footprint? Get your business verified and
   listed where Maryland residents are actually looking for your services."
   Links: "Start Your Application" (→ `/how-it-works`), "Business Owner FAQ" (→ `/how-it-works`).

## §3 Category Directory Index (`category-index` → `homeCategoryIndex`) — COMPUTED

- `py-24 px-4 md:px-12 bg-[#FAF7F2]`, `max-w-7xl`; header max-w-2xl mb-16:
  eyebrow **"Deep Directory"**, h2 **"Browse Maryland by Category"**,
  sub **"Direct links to every verified business sector in the state."**
- Grid `cols-2 → md:3 → lg:6`, gap-x-8 gap-y-12. Column: h4 10px 800 primary upper 0.2em,
  border-b pb-2 mb-6; links 13px/500 `#555` block py-1, hover primary + indent 6px.
- **Data honesty (decided): the design's 6 columns × 7 links are aspirational. The live CMS
  category tree holds 1 category (Restaurant → Seafood). The component computes columns from
  the real category → subcategory tree at query time (`getCategoryTree()`); links go to
  `/{category}/{subcategory}`. Grid grows automatically as sectors are added in Studio.
  No invented sectors seeded.**

## §4 How Ranking & Verification Works (`trust-logic` → `homeMethodology`)

- `py-24 px-4 md:px-12 bg-white`, `max-w-5xl`; centered header mb-20:
  eyebrow **"Our Methodology"**, h2 **"Trust is earned, not bought."**,
  sub **"Maryland residents deserve to know exactly how we verify local businesses and how we
  determine who appears first."** (max-w-2xl mx-auto).
- Grid md:2 gap-12; item: flex gap-6; number box 12×12 primary bg white 800 text-xl (value =
  index + 1, frontend); h4 800 uppercase widest mb-3; body sm `#555` leading-relaxed.

Design steps (seeded as authored):
1. **State-Level Verification** — "Every application is manually cross-checked against the
   Maryland State Department of Assessments & Taxation (SDAT) records. We confirm active entity
   standing, local licensing, and physical registration before a \"Verified\" badge is issued.
   Unverified businesses cannot carry our trust mark."
2. **Fair Ranking Algorithm** — "Ranking priority is determined by a combination of profile
   completeness, verification tier, and verified customer feedback signals. While business plans
   affect visibility, they never bypass the verification requirement. A high-tier plan on an
   unverified business will always rank below a verified local peer."
3. **Continuous Monitoring** — "Verification is not a one-time event. We periodically re-verify
   active listings against state databases. If a business lapses in standing or licensing, their
   verified status is automatically suspended until compliance is restored, ensuring you only see
   valid pros."
4. **Zero-Gimmick Reviews** — "We aggregate review signals from multiple verified sources but
   weight local, directory-direct feedback higher. Our anti-spam filters ensure that \"Social
   Pulse\" and rating metrics reflect real resident experiences, not automated or incentivized
   filler."

## §5 Ask Maryland FAQ (`faq` → `homeFaq`) — reuses `faqItem`

- `py-32 px-4 md:px-12 bg-[#FAF7F2] border-t`, `max-w-4xl`; header mb-16:
  eyebrow **"Ask Maryland"**, h2 **"Essential Answers for Residents & Owners"**,
  sub **"Everything you need to know about navigating the Free State's official business hub."**
- Accordion stack space-y-4; item: white bg, 1px border, `p-6`; question row (sm 800 upper
  tight) + chevron-down (rotates 180° when open); answer sm `#555` pt-6, max-height transition.
  First item open by default. Same mechanics as census 12 §7 (HiwFaq) — script scoped to
  `.home-faq` wrapper to avoid cross-component double-binding.

Design items (seeded as authored):
1. Q "How do I know a business is actually local to Maryland?" — A "Look for the \"Verified\"
   badge. This signifies that our team has confirmed their registration with the Maryland SDAT.
   Additionally, \"MD-Made\" tags denote businesses that are not only registered here but were
   founded and are operated by Maryland residents, rather than local franchises of national chains."
2. Q "Does it cost anything for residents to use this directory?" — A "No. Maryland Business
   Direct is 100% free for residents to search, browse, and contact businesses. Our mission is to
   strengthen the state economy by making local discovery seamless and trustworthy for every
   neighbor in the Free State."
3. Q "How often is the news feed updated?" — A "The Maryland Business Pulse news feed is updated
   every business morning at 9:00 AM. We curate headlines specifically relevant to small business
   owners, local shoppers, and regional economic policy to keep our community informed in
   real-time."
4. Q "I'm a business owner. How do I get my \"Verified\" badge?" — A "Simply start a new
   application via the \"List Business\" button. You'll need your EIN and state registration
   details. Once submitted, our team performs the cross-check; most verifications are completed
   within 48-72 business hours."

---

## Render order on home

Hero → Navbar → CountyHubs → FeaturedBusinesses → Editorial → SocialFeed →
**HomeNews → HomePathways → HomeCategoryIndex → HomeMethodology → HomeFaq**.

## Census strings (render-exactly-once check)

Daily News Wire · Maryland Business Pulse · Refreshed 9:00 AM Daily · Browse Full News Archive ·
Guided Discovery · How can we help you today? · New to Maryland · Find a Trusted Pro ·
I Own a Business · Deep Directory · Browse Maryland by Category · Our Methodology ·
Trust is earned, not bought. · State-Level Verification · Ask Maryland ·
Essential Answers for Residents & Owners
