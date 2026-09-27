# 10 — Resources page (UX Pilot design family "Resources")

Source: design `P8e6Z5KoVhdXhecI6LlZ` (latest of chain
`VsIp5owEs8jpsZt6zJI7` → `4Nv1Ui58d0Gfw9gqkADP` → `P8e6Z5KoVhdXhecI6LlZ`),
1440×4804, HTML hash `eed7e6d522a23c537ae6cc999de50e8cd529cb60bf6f793561103a8de21b6e12`
(100% read: offset 0 + 20000→42679). Preview:
`https://storage.googleapis.com/uxpilot-auth.appspot.com/screenshots/13f4f37693-5261c874776019e358fe.png`.

Design tokens (as in design HTML): `--background #FAF7F2`, `--foreground
#555555`, `--card #FFFFFF`, `--card-foreground #121212`, `--primary #9D2235`,
`--secondary #EAAA00`, `--secondary-foreground #121212`, `--accent #FFB612`,
`--border #E3E0DC`, font Sora. Radius 0 everywhere. Section bands alternate
`#FAF7F2` / `#FDFCFB` / `#F8F7F6`; toolbar/panel fill `#F3EFE8`; dark band
`#121212`.

User decision 2026-09-26: **icon names stored as CMS text are acceptable;
images are not.** Every seeded icon name verified against
`node_modules/@iconify-json/tabler/icons.json` before write.

## Sections (design order; nav + design footer excluded — repo has its own)

### 1. intro (`#intro`) — section doc `resourcesIntro`
- breadcrumb: "Maryland" › "Resources" (breadcrumb terminal = page title)
- H1: "Maryland Business Resources"
- intro paragraph: "Every state, county, and city program a Maryland business needs — centralized, verified, and kept current with the latest laws and initiatives."
- live counter: pulse dot + "412 Resources Indexed · Updated Daily"
  → `resourcesIndexedLabel` text (the "412" ships with the label as copy;
  real counts are a later data problem, per design it is one label string)
- search input placeholder: "Search grants, licenses, tax forms, agencies, deadlines..."
  icon `search`

### 2. regulatory-updates (`#regulatory-updates`) — section doc `regulatoryUpdates`
- eyebrow: "Stay Current"; H2: "Regulatory & Policy Updates"
- archive link: "View Full Archive"
- jurisdiction filter labels: "All Updates", "State", "County", "City"
- 4 update cards (component `regulatoryUpdate`), fields: effectiveDateText,
  jurisdictionKind (state|county|city), jurisdictionLabel, typeLabel, title,
  description, linkLabel ("Read Official Notice"), url
  1. Jan 1, 2025 · state · "State" · "New Law" · "Minimum Wage Rises to $17.00/hr Statewide" · "The Fair Wage Act of 2024 raises Maryland's minimum wage for all employers regardless of size, eliminating the prior small-business phase-in schedule."
  2. Dec 15, 2024 · county · "Montgomery County" · "New Program" · "$5M Storefront Revitalization Grant Opens for Applications" · "Montgomery County launches a matching-grant program covering up to 50% of exterior renovation costs for small retail and restaurant storefronts in Bethesda, Rockville, and Silver Spring."
  3. Nov 30, 2024 · city · "Baltimore City" · "Deadline" · "Commercial Trash & Recycling Permit Renewal Due" · "All Baltimore City businesses generating commercial waste must renew their Department of Public Works hauling permit before the deadline or face a $250 late filing fee."
  4. Nov 18, 2024 · state · "State" · "Policy Change" · "Maryland One Stop Now Requires Digital Annual Report Filing" · "The Department of Assessments and Taxation will no longer accept paper Annual Reports starting with the 2025 filing cycle — all entities must file through the Maryland One Stop portal."
- card link icon: `arrow-up-right`

### 3. featured-programs (`#featured-programs`) — section doc `featuredPrograms`
- eyebrow: "Editorial Picks"; H2: "Flagship State Programs"
- card link label (shared): "Visit Program"
- 3 program cards (component `flagshipProgram`): icon, iconTint
  (primary|secondary|dark), title, description, url
  1. `users-group` · primary · "Maryland SBDC" · "Free one-on-one business counseling, financial projections, and market research support at 8 regional centers statewide."
  2. `pig-money` · secondary · "MSBDFA Loan Guarantees" · "The Maryland Small Business Development Financing Authority backs loans for businesses owned by socially/economically disadvantaged entrepreneurs."
  3. `file-description` · dark · "Maryland One Stop Portal" · "Register a business, file annual reports, and apply for state licenses and permits through a single unified state portal."

### 4. county-jump (`#county-jump`) — section doc `countyJump`
- heading: "Jump to Your County or City"
- chips: county/city names are live gate data (county hubs), never CMS copy
- footer link: "View All 24 Jurisdictions" (icon `arrow-right`)

### 5. resource-directory (`#resource-directory`) — section doc `resourceDirectory`
- H2: "Full Resource Directory"; count label: "412 Resources"
- toolbar: search placeholder "Search this directory by keyword, agency, or program name..."
  (`search`); jurisdiction select options: "All Jurisdictions", "State of Maryland",
  "Montgomery County", "Baltimore City", "Anne Arundel County", "Howard County";
  type select: "Resource Type", "Form", "Portal", "Grant", "Guide", "Hotline",
  "Legal Aid"; sort select: "Sort: Most Relevant", "Sort: A–Z", "Sort: Recently
  Added", "Sort: Jurisdiction"; reset button "Reset" (`arrow-back-up`);
  active-filter chips: "Starting a Business", "Grants & Funding" (`x-mark`)
  → selects are client-side filters (per TAGS.md: client-side, never indexed);
  static options seed only
- filter rail: "Category" nav — "Starting a Business", "Licensing & Permits",
  "Taxes & Finance", "Grants & Funding", "Legal Aid", "Employment & Labor Law",
  "County / City Programs", "Veteran / Minority / Women-Owned";
  "Resource Type" checkboxes — "Form", "Portal", "Grant", "Guide", "Hotline"
- compliance calendar (`#compliance-calendar`, component `deadlineEntry`):
  heading "Upcoming Deadlines"
  1. "Annual Report Filing" · "All Entities" · "Apr 15"
  2. "Sales & Use Tax (Q1)" · "Comptroller of MD" · "Apr 20"
  3. "Food Service License Renewal" · "County Health Dept." · "May 01"
- 6 resource cards (component `resourceCard`): icon, iconTint
  (primary|secondary), typeBadge, badgeTint (primary|secondary|dark), title,
  jurisdiction, description, url; shared link label "Visit Resource" (`arrow-right`)
  1. `file-description` · primary · "Portal" · primary · "Maryland One Stop Business Portal" · "State of Maryland" · "Register a new entity, renew licenses, and file annual reports in one unified system."
  2. `pig-money` · secondary · "Grant" · secondary · "Small, Minority & Women-Owned Fund" · "MD Dept. of Commerce" · "Low-interest capital access loans for qualifying small and disadvantaged businesses."
  3. `shield-check` · primary · "Legal Aid" · dark · "Maryland Volunteer Lawyers Service" · "Statewide Nonprofit" · "Free legal consultations for qualifying small business owners on entity formation and contracts."
  4. `receipt` · primary · "Guide" · primary · "Sales & Use Tax Filing Guide" · "Comptroller of Maryland" · "Step-by-step breakdown of registration, filing frequency, and exemption certificates."
  5. `phone-call` · secondary · "Hotline" · dark · "Business Express Answer Line" · "MD Dept. of Commerce" · "Direct phone line for licensing questions, routed to the correct state agency in one call."
  6. `file-invoice` · primary · "Form" · primary · "Anne Arundel County Health Permit Application" · "Anne Arundel County" · "Required food-service permit application and inspection scheduling form."
- load more label: "Load More Resources"

### 6. alert-signup (`#alert-signup`) — section doc `alertSignup`
- dark band (#121212), icon `bell`
- H2: "Get Notified When Maryland Business Laws Change"
- paragraph: "One email digest whenever a new law, deadline, or funding program is added to this page. No spam, unsubscribe anytime."
- email input placeholder: "YOUR EMAIL ADDRESS"; button: "Subscribe to Alerts"

## Icon map (design Font Awesome → project tabler, all verified on disk)
people-group→users-group · sack-dollar→pig-money · file-signature→file-description ·
receipt→receipt · phone-volume→phone-call · building-shield→shield-check ·
bell→bell · magnifying-glass→search · arrow-right→arrow-right ·
arrow-up-right-from-square→arrow-up-right · chevron-down→chevron-down ·
xmark→x-mark · arrow-rotate-left→arrow-back-up

## Not in design
No photographs anywhere on the page (icons only) — no image fields in schema.
