# LISTINGS SCHEMA REQUIREMENTS — draft, NOT approved

Source of truth: UX Pilot design **BusinessDetails** (desktop latest
`yKiTibg7br0HIQXUrrkq`, 1440×1024, hash `5311055db…`, updated 2026-09-26).
Every field below traces to markup in that design. Nothing invented.

Status: DRAFT for confirmation. **No schema/type/query/component/data change
until explicit go** (V-04 / standing instruction).

---

## 1. What the design shows (evidence inventory)

Left column (70%) top → bottom; right column (30%) = buy box.

| # | Block | Information the design carries |
|---|---|---|
| 1 | Breadcrumbs | `Maryland → Annapolis → Seafood` — business sits in a **place** (county/hub) and a **category** |
| 2 | Identity | H1 name; rating `4.8 (124 REVIEWS)` with stars; ranking line `#1 Ranked Seafood in Annapolis`; share + favorite buttons (presentation) |
| 3 | Pulse bar | `12 people booked in the last hour`; `Currently 85% Full — book ahead`; `Wait time: ~10 mins` |
| 4 | Promotions | Coupon card: eyebrow `Support Local Offer`, heading `15% Off Your First Visit`, code line `Use code MDDIRECT15 at checkout`, CTA `Claim Coupon`. Gift card card: eyebrow, heading, desc, CTA `Buy Gift Card` |
| 5 | Gallery | 4-image grid (1 large + 3 small) |
| 6 | Vibe Check | Video still image, eyebrow `Experience the Atmosphere`, heading `Waterfront Dining, Live Kitchen & Golden Hour Views`, duration `0:30`, play overlay |
| 7 | Editorials (`In the Spotlight`) | 2 cards, each: image, tag (`Feature` / `Sustainability`), date, title, excerpt, `Read Full Editorial` → links to editorial pages |
| 8 | Events & Press | Per event: date cell (month `Dec` + day `05`), title, `6:00 PM • Main Dining Hall`, per-event CTA (`Register` / `RSVP`) |
| 9 | About Us | Heading + 2 prose paragraphs |
| 10 | Amenities | Icon + label list (`Free Public Wi-Fi`, `Waterfront Seating`, `Valet Parking`, `Gluten-Free Menu`) |
| 11 | Why Choose Us | Heading + 4 prose paragraphs |
| 12 | Menu | Section heading + sub `Updated Weekly · Full PDF Menu Available` + `View Full Menu` external button; category tabs (`Signature Crab`, `Starters`, `Entrees`, `Beverages`); items: image, name, price `$34`, description, badge (`Chef's Signature` / `Gluten-Free` / `Seasonal`) |
| 13 | Team (`The People Behind the Bistro`) | Per person: avatar, name, role (`Founder & Owner`), bio, per-person CTA (`Message Owner`, `View Chef's Table`, `Book Private Event`) |
| 14 | Achievements (`Maryland Verified Achievements`) | Sub `Independently audited credentials & certifications`; 4 cards: icon, label (`Health Dept. Grade A`), sub (`Inspected Aug 2024`) |
| 15 | Q&A | Heading + `Ask a Question` link; items: question + answer |
| 16 | Reviews (`Customer Sentiment`) | Aggregate `4.8` + stars; distribution bars 5→1 star with `%` values (85/10/3/1/1); individual reviews: avatar, name, `Verified Visit` badge, date, star rating, title, body |
| 17 | Similar (`Other Verified Restaurants in Annapolis`) | 3 cards: image, name, rating `4.5 (812)` — **other listings** |
| 18 | Buy box | Price range `$$$`; open status `Open Now` + `Closes at 10:00 PM`; CTAs `Book a Table` (primary) + `Order Delivery` (outline); **Phone** `(410) 555-0123`; **Website** `bluebistro.md`; **Address** `123 Dock Street / Annapolis, MD 21401` + `Get Directions`; **Verification Data**: `Tax ID Status: Active / Valid`, `License Number: MD-2451-998`, `Last Audit: Aug 2024` |
| 19 | JSON-LD in `<head>` | schema.org `Restaurant`: geo lat/long `38.9784, -76.4922`; `openingHoursSpecification` opens `11:00` closes `22:00` daily |

## 2. Gap vs current listing schema

Current `listing` has exactly: `title`, `slug`, `description`, `tags[]`,
`icon`, `image` (single), `link`, `featured`, `body` (portable text). Preview
title/subtitle/image.

Design requires — all missing today:

- Place + category as structured links (breadcrumbs), not freeform `tags`
- Full contact block: phone, street address (street/city/region/postal),
  separate display + validated website URL, geo coordinates, directions link
- Hours (design shows opens/closes + "Closes at 10:00 PM")
- Price range (`$$$`), rating + review count, rank line
- Gallery (many images, not one), video still + video
- Amenities (icon+label), achievements (icon+label+sub), menu items
  (image+name+price+desc+badge), events (date+time+venue+CTA), Q&A, team
  members (avatar+name+role+bio+CTA), promotions (2-card offers)
- Review aggregate + distribution + individual reviews
- Open status + closing time; verification data (tax status, license no.,
  last audit); pulse-bar figures

Also design uses **no fallback copy** — every string above is content.

## 3. Proposed model (draft, for discussion)

Tiers per SCHEMA.md: reusable pieces = components (objects); listing =
document (entity, like editorialStory today but standalone). Listing detail
page renders one listing document — not a home-style section composition.

**New component objects** (components/, one file each):
- `listingAddress` — street, city, region, postalCode (labels fixed)
- `listingHours` — daily opens/closes (or per-day structure — open question Q4)
- `listingContact` — phone, website, directions URL (or flat fields on listing — Q5)
- `menuCategory` — label + array of `menuItem`
- `menuItem` — name, price, description, image, badge (label + tone select)
- `listingEvent` — month, day, title, time, venue, ctaLabel, ctaLink
- `qaItem` — question, answer
- `teamMember` — name, role, bio, avatar image, ctaLabel, ctaLink
- `achievement` — icon, label, subLabel
- `amenity` — icon, label
- `promotion` — eyebrow, heading, note, ctaLabel, ctaLink (tone presentation)
- `review` — name, date, rating, title, body, avatar image, verifiedVisit
- `editorialLink` — image, tag, date, title, excerpt, link (or reference to
  real editorial docs — Q2)

**Listing document fields** (draft):
`name` (display title), `slug`, `description`, `category` (string now —
see Q1), `county`/`hub` (string now — see Q1), `rankLine`, `priceRange`
(select `$ $$$$`), `rating` number, `reviewCount` number, `featured`,
`image` (primary) + `gallery[]` image, `videoStill` image + `videoLabel` +
`videoHeading` + `videoDuration`, `amenities[]`, `achievements[]`,
`about` (portable text / paragraphs), `whyChooseUs` (paragraphs), `menu[]`
(menuCategory), `events[]`, `qa[]`, `team[]`, `promotions[]`,
`reviews[]` + ratingDistribution (`dist5`…`dist1` numbers), `phone`,
`website`, `address` (listingAddress), `hours` (listingHours), `geo` (lat/
lng), `openStatusText` (e.g. `Open Now`) + `closingNote` (`Closes at
10:00 PM`) — or computed from hours (Q3), `pulse` (booked/capacity/wait —
Q6), `verification` (taxStatus, licenseNumber, lastAudit), `ctaPrimary`
(label+url), `ctaSecondary` (label+url), `similar` — references to other
listing docs (Q7), `menuPdfUrl` + `menuNote` + `menuCtaLabel`,
`qaAskLabel`.

Previews per V-08: title from `name`, subtitle from category/place; schema
title fallback.

## 4. Open questions — need answers before building

1. **Category & county**: freeform strings, or new document types
   (`category`, `county`) so similar-listings and hub pages can link? County
   hubs exist today only as objects inside the `countyHubs` *section* doc —
   not linkable entities. Design breadcrumbs need both. Recommend: separate
   referenceable docs; but that is a bigger model change.
2. **Editorial links on listing**: real references to editorial story docs
   (are stories becoming standalone docs?) or re-entered card content?
3. **Open status**: computed from hours data, or editor-entered text?
   (Design shows both a status line and a closing time.)
4. **Hours granularity**: single daily opens/closes (JSON-LD example is
   daily) or per-day-of-week?
5. **Contact block**: one component object vs flat fields on listing.
6. **Pulse bar**: CMS-editable fields, or dynamic/live later? If CMS:
   three fields (`pulseBooked`, `pulseCapacity`, `pulseWait`) — content is
   verbatim strings, e.g. `12 people booked in the last hour` may be
   structured (number + template) or one text line.
7. **Similar listings**: references to other `listing` docs (cross-page
   links, dedupe) — recommend references.
8. **Menu badge tones**: design shows 3 tones (dark `Chef's Signature`,
   green `Gluten-Free`, gold `Seasonal`). Fixed CSS tones selected by value
   in CMS (presentation stays CSS) — confirm tone set.
9. **Reviews**: stored on the listing as array, or standalone `review`
   documents? If reviews ever get their own pages or moderation, docs; if
   only rendered here, array. Design shows only render-in-place.
10. **Migration**: current 7 listing docs are meditation-app template
    leftovers (Buddhify, Calm, Insight Timer, Meditopia, Smiling Mind,
    headspace-slug "Squirtle", serenity draft). Replace with real Maryland
    content, or keep and re-field? All have `image: null`, `icon: null`.
11. **Mobile design** `426Sq4RtQEvBpdqJ16ub` not yet read — desktop assumed
    superset of fields. Read before building.
12. **Body field**: current portable-text `body` — does About/Why Choose Us
    replace it, or keep `body` and add structured paragraphs?

## 5. What building would touch (if approved — nothing done yet)

New: ~13 component files, 1 section file (`listings/listing.ts` or rename —
Q on naming), registration, types, listing query, listing detail route +
component(s), seed data. Existing `listing` fields would be modified
(dropped/renamed/retyped) — that is V-04-gated: needs explicit per-change go.