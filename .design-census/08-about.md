# Census 08 — About page

Source: UX Pilot design `SZAJAZ1z2L13x34PjXMU` ("MDDirectory - About",
parentId `p51b9m1xaeXHKtVVKqP0`), desktop 1440w, total height 5332px.
Design hash `5b89251ffeddaa25b69eaeb3b92dbe16c77402389b47e873783d206b7b251c76`.
Nav + footer are global chrome, not page sections.

## Design tokens observed (same palette as home; no new tokens)
Background `#FAF7F2` / `#FDFCFB`; dark band `#121212`; primary `#9D2235`;
secondary `#EAAA00`; accent `#FFB612`; border `#E3E0DC`; icon-box `#F8F7F6`;
foreground `#555555`; card-foreground `#121212`. Square corners everywhere.

## Sections (8 content bands between nav and footer)

### 1. Page header (id=page-header) — plain fields, no arrays
- Breadcrumb: root `Maryland`, current `About` (chevron separator)
- Badge (secondary bg): `Official Business Directory for the Free State`
- H1: `About Maryland Business Direct`
- Intro paragraph: `Maryland Business Direct is the state's centralized home for verified local businesses, in-depth local editorial, and every state, county, and city resource a Maryland business owner needs — built so residents can trust who they're buying from, and business owners have one place to be found, funded, and supported.`

### 2. Stat strip (id=stats) — dark #121212 band, 4-item array
- `25,000+` / `Verified Businesses`
- `24` / `Counties Covered`
- `412` / `Resources Indexed`
- `100%` / `MD-Made Only`
Values secondary-tinted, labels gray-400. Array component `statItem(value,label)`.

### 3. Origin / Why We Exist (id=why-we-exist) — image + paragraphs array
- Image alt: `wide editorial photograph of a maryland small business storefront on a historic main street, warm af`
- Eyebrow: `Why We Exist`
- H2: `Local business info in Maryland was scattered, thin, and impossible to trust.`
- P1: `Before this directory, finding a genuinely local, reliable business in Maryland meant piecing together outdated listings, generic review sites with no verification, and a maze of separate county and state websites for anything related to permits, licensing, or funding.`
- P2: `We built Maryland Business Direct to close that gap with three things most directories skip: a real verification pipeline behind every listing, editorial depth instead of thin auto-generated pages, and a single home for the state, county, and city resources business owners are otherwise forced to hunt down one agency at a time.`
- P3: `The result is a directory residents can actually trust, and a growth channel business owners can actually rely on.`
Paragraphs as text-block array (count may vary) — not three bespoke fields.

### 4. Mission band (id=mission) — primary band, 2 fields, no array
- Eyebrow: `Our Mission`
- Statement: `"To make it effortless for every Marylander to find a business they can trust, and for every Maryland business to be found, verified, and supported — regardless of zip code."`

### 5. Vision + pillars (id=vision-pillars) — intro + 4-item pillar array
- Eyebrow: `Our Vision`
- H2: `A Maryland where "local" always means verified.`
- Paragraph: `We're working toward a state where no Maryland business — from a single Eastern Shore boat dock to a Baltimore City law firm — is invisible online, and no resident has to guess whether a business claiming to be "local" actually is. Four principles guide how we build toward that.`
- Pillar 1: icon `fa-shield-check`, title `Verification First`, text `Every listing passes a documented check against state and local records before it earns a verified badge — no self-reported claims taken at face value.`
- Pillar 2: icon `fa-feather-pointed`, title `Editorial Over Thin Listings`, text `We invest in real reporting on Maryland's business community instead of generic auto-generated directory pages with no substance.`
- Pillar 3: icon `fa-map-location-dot`, title `Every County Represented`, text `From Garrett to Worcester, we treat every one of Maryland's 24 jurisdictions as a first-class hub, not an afterthought to the big metros.`
- Pillar 4: icon `fa-landmark`, title `Built With the State in Mind`, text `We design around how Maryland's actual laws, agencies, and county structures work, so what we publish stays accurate and genuinely useful.`
Icon tints cycle primary/secondary/dark by position — CSS nth-child (TrustStrip
pattern), zero tint fields in schema.

### 6. What We Offer (id=what-we-offer) — 3-item offer array
- Eyebrow: `What We Offer`
- H2: `One directory, three connected arms.`
- Arm 1: icon `fa-store` (primary tint), title `Verified Business Directory`, text `Search by county and category to find businesses that have passed our verification process, complete with ratings, credentials, and real listing detail.`, CTA `Explore Counties` → Hub page
- Arm 2: icon `fa-newspaper` (secondary tint), title `MD-Made Editorial Stories`, text `Original, deeply reported stories on Maryland's business community — sourcing investigations, founder profiles, and practical consumer guides.`, CTA `Read the Stories` → Editorial page
- Arm 3: icon `fa-book-bookmark` (dark tint), title `Centralized Resources Hub`, text `Every state, county, and city program, grant, license, and legal resource in one searchable place — kept current with new laws and initiatives.`, CTA `Browse Resources` → Resources page
Icon tint cycle = CSS position (primary → secondary → dark), no data field.

### 7. Partnerships (id=partnerships) — intro block + 4-item partner array
- Eyebrow: `Partnerships`
- H2: `We're built to grow with Maryland's institutions, not around them.`
- Paragraph: `This directory works best as shared infrastructure. We're actively seeking partners who can help us verify faster, cover more ground, and keep every resource we publish accurate.`
- CTA: `Become a Partner` → `mailto:partnerships@marylandbusinessdirect.gov`
- Partner 1: icon `fa-building-columns` (primary), title `Economic Development Offices`, text `State, county, and city offices can integrate directly so new programs and policy changes appear in our Resources hub the moment they go live.`
- Partner 2: icon `fa-handshake` (secondary), title `Chambers of Commerce`, text `Co-branded member verification and featured placement for chamber members across every county we cover.`
- Partner 3: icon `fa-people-group` (dark), title `Small Business Associations`, text `Joint programming, editorial features, and referral pipelines for association members seeking visibility and funding.`
- Partner 4: icon `fa-database` (primary), title `Verification & Data Partners`, text `Licensing boards and registries that help us confirm business legitimacy faster and more comprehensively statewide.`
Icon tint cycles by position (CSS), no data field.

### 8. Closing CTA (id=closing-cta) — dark band, 2 semantic field pairs, no array
- H2: `Whether you're building a business or backing one — this is your directory.`
- Primary action label: `List Your Business`
- Secondary action label: `Explore the Directory`

## Icons as designed → project (tabler) mapping
- `fa-flag` (badge) → `tabler:flag` ✓ verified
- `fa-shield-check` (pillar 1, partner variants) → `tabler:shield-check` ✓
- `fa-feather-pointed` (pillar 2) → `tabler:feather` (closest verified; pointed variant absent from installed set)
- `fa-map-location-dot` (pillar 3) → `tabler:map-2` (map-location-dot absent)
- `fa-landmark` (pillar 4) → `tabler:building-bank` (landmark absent)
- `fa-store` (offer 1) → `tabler:building-store` ✓
- `fa-newspaper` (offer 2) → `tabler:news` ✓
- `fa-book-bookmark` (offer 3) → `tabler:bookmark` (book-bookmark absent)
- `fa-building-columns` (partner 1) → `tabler:building-bank` ✓
- `fa-handshake` (partner 2) → `tabler:heart-handshake` (handshake absent)
- `fa-people-group` (partner 3) → `tabler:users-group` ✓
- `fa-database` (partner 4) → `tabler:database` ✓
- `fa-chevron-right` (breadcrumb) → `tabler:chevron-right` ✓
- `fa-arrow-right` (CTA arrows) → `tabler:arrow-right` ✓

## V-10 note
The design's CSS contains hover states (`.pillar-card:hover`, button
inversions). Per V-10 standing rule these are NOT transcribed: zero
hover/transition CSS in the built components.

## Decomposition summary
- Components (4): `statItem`(value,label), `pillar`(icon,title,text),
  `offerArm`(icon,title,text,ctaLabel,ctaLink),
  `partner`(icon,title,text).
- Sections (8, standalone documents): `aboutHeader`, `statStrip`,
  `origin`, `missionBand`, `visionPillars`, `offerArms`, `partnerships`,
  `closingCta` — no enum needed anywhere (tints are position-CSS); no
  forced arrays on singular content (header/mission/closing are plain
  fields; closing CTA's two buttons are two semantic field pairs).
