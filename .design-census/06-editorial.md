# Census 06 — Editorial "Local Expertise" (MD-Made Stories)

Source: UX Pilot design `9CGLhn7IuWzEhRoEnKtp`, section `<section id="editorial">`.
Extracted markup: `/tmp/section-editorial.html`.

## Anchor
`<section id="editorial">` — after featured business cards.

## Structure
- Two-column grid (lg:2col, 24 gap): left = large portrait image (640px) with an overlay caption card pinned bottom (quote, avatar, name, business); right = eyebrow w/ left border, huge h2, paragraph, two story-link rows (icon box + title + description), primary CTA button.

## Design tokens observed
- Background `#FAF7F2`; story-row bg `#F8F7F6`; icon box white w/ border `#E3E0DC`.
- Primary `#9D2235`; secondary `#EAAA00`; card-foreground `#121212`; muted-foreground `#555555`.
- Eyebrow: primary text, 4px left border in primary, pl-4. Avatar grayscale round. Image border `#E3E0DC`.

## Exact copy (verbatim)
- Overlay quote: `"This directory changed how I reach my neighbors."`
- Attribution: `Elena Rossi` / `Rossi Glassworks`
- Eyebrow: `MD-Made Stories`
- H2 (two lines): `Support the Makers` <br> `of the Free State.`
- Paragraph: `We solve the 'thin content' problem of generic directories. Our editorial team hand-curates stories from every zip code in Maryland, giving you the context you need to buy local.`
- Story row 1: title `The Waterman's Guide`; body `Where to find the freshest catch directly from the Chesapeake bay, vetted for sustainability.`
- Story row 2: title `Harvesting the Shore`; body `A deep dive into Eastern Shore agriculture and the small farms feeding our state.`
- CTA: `Explore Editorial Hub`

## Icons as designed → project (tabler) mapping
- `fa-solid fa-anchor` (row 1) → `tabler:anchor` (verified on disk)
- `fa-solid fa-wheat-awn` (row 2) → `tabler:wheat` (verify before seed)

## Decomposition notes
- Component: `editorialStory` (one row: icon, title, description).
- Section: `editorial` (image+alt, quote, attributionName, attributionBusiness, eyebrow, heading, description, stories[], ctaLabel).
- Heading line break: presentational — heading stored as plain string; if two-line rendering needed, component owns it. Whitespace never in data (V-01 rule).
