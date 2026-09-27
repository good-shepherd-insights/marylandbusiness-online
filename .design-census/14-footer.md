# Census 14 — Global Footer

Sources: desktop `9CGLhn7IuWzEhRoEnKtp` ("Maryland Business Online - Home", the canonical
home design) `<footer id="footer">`; mobile variant `rRl8hcSvE8wdYJYtZuzu` (Home 375px)
centered stack — same content, collapses naturally via responsive grid. Authorized by user
2026-09-27 ("build the footer") after V-20 revert. Global component, lives on `siteSettings`
(same pattern as navbar), rendered at the end of every page.

## Desktop anatomy

`<footer class="bg-[#FAF7F2] py-24 px-4 md:px-12 border-t border-[var(--border)]">`
- Grid `md:grid-cols-4 gap-16`, `max-w-7xl mx-auto`:
  - **Brand block (col-span-2)**: logo lockup — w-10 h-10 `--primary` square, white extrabold
    text **"MD"** + **"BusinessDirect"** 2xl 800 uppercase; below: tagline
    **"Official conversion engine for Maryland small businesses."** (xs, fg, max-w-md, bold,
    uppercase, tracking-widest).
  - **"Quick Links"** column: h4 10px 800 card-fg uppercase 0.2em mb-8; ul gap-4, 11px 700
    uppercase tracking-widest: Counties · Categories · Stories.
  - **"Resources"** column: All Resources · Certifications · Support · Verification.
- **Bottom bar**: `mt-24 pt-10 border-t`, flex col→row justify-between items-center gap-6,
  9px 700 muted uppercase 0.3em: **"© 2024 Maryland Business Direct."** left; right links
  **Privacy · Terms**.

## Mobile variant (375px)

Centered stack: logo square mx-auto, tagline "Official Directory for Maryland", one row of
links (Counties · Categories · Privacy), "© 2024 MD BUSINESS DIRECT". Covered by the same
component collapsing (grid stacks, bottom bar centers). Tagline wording differs between
designs — desktop is canonical (CMS-editable anyway).

## Data mapping (seeded values)

- Brand badge "MD" + name "BusinessDirect" + tagline = CMS strings (no hardcoded brand).
- Quick Links (design hrefs `#`): Counties → `/` (hubs live on home), Categories → `/`
  (category index on home), Stories → `/blog` (parked page, matches navbar).
- Resources (design hrefs `Resources__desktop.html`): All Resources → `/resources`,
  Certifications → `/resources`, Verification → `/how-it-works`; **Support has no real route →
  seeded without href, renders as non-link text** (no dead `#` links).
- Legal: "Maryland Business Direct" = CMS string; **year rendered dynamically** (design's
  "2024" goes stale). Privacy/Terms have no routes → seeded without href, non-link text,
  flagged for future pages.
- No icons anywhere in the footer design (no socials) — nothing to map.

## Census strings (render-exactly-once per page)

BusinessDirect · Official conversion engine for Maryland small businesses. · Quick Links ·
Resources · All Resources · Certifications · Support · Verification · Privacy · Terms ·
Maryland Business Direct

## Schema (on `siteSettings`, no validation rules per standing decision)

`footerBrandBadge`, `footerBrandName`, `footerTagline`, `footerQuickHeading`,
`footerQuickLinks[] (navLink)`, `footerResourceHeading`, `footerResourceLinks[] (navLink)`,
`footerLegalName`, `footerLegalLinks[] (navLink)`.
