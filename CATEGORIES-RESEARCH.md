# Category Research — Maryland Business Directory Initial Taxonomy

Researched 2026-09-27. Purpose: choose a launch category tree (top-level categories + subcategories) for a consumer-facing Maryland local-business directory, grounded in how Yelp and Google Business Profile (GBP) categorize businesses and in local search demand.

---

## 1. Sources consulted

| Source | URL | Date accessed | What it provided |
|---|---|---|---|
| Yelp Fusion API category docs (official) | https://docs.developer.yelp.com/docs/resources-categories | 2026-09-27 | Official Yelp top-level category tree (Active Life, Arts & Entertainment, Automotive, Beauty & Spas, Bicycles, Education, Event Planning & Services, Financial Services, Food, Health & Medical, Home Services, Hotels & Travel, Local Flavor, Local Services, Mass Media, Nightlife, Pets, plus Restaurants, Shopping, Professional Services, Real Estate, Public Services & Government) with subcategory examples. ~1,500+ total categories; Yelp advises re-pulling regularly. |
| Legacy Yelp category tree (GitHub, miguelmota/yelp-categories) | https://github.com/miguelmota/yelp-categories | 2026-09-27 (via search) | The widely-cited 22-top-level Yelp schema (2018-era); used as cross-check for top-level naming. |
| Yelp Open Dataset analyses | https://business.yelp.com/data/resources/open-dataset/ ; academic analysis: Asghar, "Yelp Dataset Challenge: Review Rating Prediction" (arXiv, 2016) | 2026-09-27 (via search) | Restaurants ≈ 34% of businesses in the open dataset — by far the single most-used Yelp category. |
| Yelp Economic Average, Q4 2023 (official Yelp data) | https://business.yelp.com/data/resources/yelp-economic-average-q4-2023/ ; press release via PR Newswire | 2026-09-27 (via search) | Yelp "search demand share": Restaurants 12.1%, Home & Local Services 9.7%, Shopping 7.5%, Beauty & Fitness 4.9%, Health 4.7%, Professional Services 4.2%. Fastest growth: Beauty +14%, Home Services +14%, Professional Services +13%, Hotels & Travel +12%, Restaurants +12%, Fitness +10%. |
| PlePer GBP Categories tool | https://pleper.com/index.php?do=tools&sdo=gmb_categories | 2026-09-27 | Confirms a full GBP category list exists (refreshed ≤3 days), ~4,000 categories, capped at 10 per listing, categories added/removed monthly. Full list is tool-gated (not displayable inline). |
| BrightLocal GBP categories guide | https://www.brightlocal.com/learn/google-business-profile-categories | 2026-09-27 | "There are around 4000 GBP categories"; Google publishes no official full list; primary category = top local ranking factor; 1 primary + up to 9 secondary. |
| Full GBP category list (2026 scrape) | https://github.com/carbondigitalus/gbp-industry-categories (industry-list.txt, 4,047 lines) | 2026-09-27 | Complete Google Business Profile category-name list used to verify the exact GBP name for every subcategory in this document. |
| Local search demand data | Google "near me" / "open now" official top-query lists; Keyhole "near me" keyword volume study (2024) | 2026-09-27 (via search) | Highest-volume local queries: pizza/hotels/restaurants/fast food (~0.7–1.0M/mo each), pharmacy (~535K), dentist (~344K), plumbers (~104K), mechanic (~91K), optometrist (~80K), physio (~65K), chiropractor (~28K). Google's own top-10 "open now" list: restaurants, food, fast food, dentist, hotels, gas station, coffee. |

Note on GBP "most common": Google publishes no usage-count statistics for GBP categories (verified — BrightLocal and PlePer both state Google's full list is unpublished and usage data does not exist publicly). The "most common" list below is therefore triangulated from (a) Google's own published top local queries, (b) keyword-volume data, and (c) every name verified against the full 4,047-category GBP list.

---

## 2. Top ~20 Yelp top-level categories, ranked by how commonly businesses/consumers use them

Ranks 1–7 are ordered by Yelp's own published search-demand share (YEA Q4 2023). Ranks 8–20 have no published Yelp share; they are ordered by listing frequency signals (Yelp Open Dataset composition, the size of each subtree in the official category docs) and general local-SEO consensus — treat 8–20 as directional, not measured.

1. **Restaurants** — 12.1% of Yelp search demand; ~34% of Open-Dataset businesses; dominant on both measures
2. **Home Services** — combined 9.7% with Local Services; +14% YoY demand growth
3. **Local Services** — combined 9.7% with Home Services (movers, locksmiths, storage, cleaning, childcare, funeral)
4. **Shopping** — 7.5% demand share
5. **Beauty & Spas** — 4.9% (Beauty & Fitness bucket); +14% growth; highest growth subcategories (facials +32%, makeup artists +23%, deep-tissue massage +21%)
6. **Health & Medical** — 4.7% demand share
7. **Professional Services** — 4.2% demand share; +13% growth
8. **Food** — cafes, bakeries, coffee/tea, specialty food; inside Yelp's ~86M quarterly food-and-drink searches
9. **Automotive** — large subtree (repair, dealers, gas, towing, parts); no published share
10. **Nightlife** — bars are a Google top-3 "near me" category; Yelp Nightlife overlaps Restaurant/Bars
11. **Fitness** — inside Beauty & Fitness 4.9%; +10% growth
12. **Active Life** — gyms, outdoors, recreation; large subtree
13. **Pets** — vets/grooming/boarding; steady demand
14. **Real Estate** — agents, apartments, inspectors
15. **Financial Services** — banks, insurance, tax (YEA folds into Professional Services 4.2%)
16. **Event Planning & Services** — photographers, venues, caterers, DJs; +12–13% adjacent growth
17. **Hotels & Travel** — hotels are a Google top-2 "near me" query; +12% growth
18. **Arts & Entertainment** — cinemas, museums, venues
19. **Education** — preschools, tutoring, specialized schools
20. **Public Services & Government / Local Flavor / Mass Media / Religious Organizations** — long tail, low commercial usage

---

## 3. Top ~30 most common Google Business Profile categories

Google publishes no usage ranking; ordered by local search demand signals (Google's top "near me"/"open now" queries + keyword volumes), every name verified verbatim against the 2026 full GBP list (4,047 categories).

1. Restaurant
2. Pizza restaurant
3. Italian restaurant
4. Chinese restaurant
5. Mexican restaurant
6. Fast food restaurant
7. Bar
8. Coffee shop
9. Bakery
10. Ice cream shop
11. Hotel
12. Gas station
13. Dentist
14. Doctor
15. Pharmacy
16. Optometrist
17. Chiropractor
18. Physical therapist
19. Urgent care center
20. Auto repair shop
21. Car dealer
22. Car wash
23. Tire shop
24. Towing service
25. Plumber
26. Electrician
27. HVAC contractor
28. Roofing contractor
29. General contractor
30. Landscaper

Next tier (also heavily used, verified names): Lawn care service, Locksmith, Moving service, House cleaning service, Pest control service, Carpet cleaning service, Self-storage facility, Dry cleaner, Hair salon, Hairdresser, Barber shop, Nail salon, Day spa, Massage therapist, Skin care clinic, Tattoo shop, Gym, Fitness center, Yoga studio, Personal trainer, Veterinarian, Pet groomer, Pet store, Real estate agency, Mortgage lender, Property management company, Home inspector, Attorney, Law firm, Insurance agency, Accounting firm, Tax preparation service, Bank, Financial planner, Travel agency, Photographer, Wedding photographer, Event venue, Wedding venue, Caterer, Event planner, Wedding planner, DJ (listed as "Disc jockey" variants), Dance school, Martial arts school, Preschool, Day care center, Driving school, Bed & breakfast, Motel, Campground, RV park, Vacation home rental agency, Funeral home, Winery, Brewery, Cocktail bar, Night club, Sports bar, Butcher shop, Florist, Jewelry store, Hardware store, Furniture store, Grocery store, Supermarket, Cannabis store.

---

## 4. RECOMMENDED INITIAL TAXONOMY

15 top-level categories, 90 subcategories total. Selection criteria applied: (a) frequency on both Yelp and GBP, (b) fit for a consumer-facing local services/dining directory of physical businesses, (c) local search demand. All subcategory names are consumer-facing plain English, Title Case, concrete business types. Every name below has a verified GBP counterpart (exact GBP names shown in section 5).

1. **Restaurants** — American, Pizza, Italian, Mexican, Chinese, Japanese & Sushi, Seafood, Fast Food
2. **Food & Drink** — Bakeries, Coffee & Tea, Donuts, Ice Cream & Desserts, Juice & Smoothies, Delis & Specialty Food
3. **Bars & Nightlife** — Bars, Cocktail Bars, Sports Bars, Breweries & Wineries, Night Clubs
4. **Home Services** — Plumbing, Electrical, HVAC, Roofing, General Contractors & Remodeling, Handyman & Painting, Landscaping & Lawn Care, Pest Control
5. **Local Services** — Movers, Locksmiths, Self Storage, Junk Removal & Hauling, House & Carpet Cleaning, Laundry & Dry Cleaning
6. **Automotive** — Auto Repair & Service, Car Dealers, Tires & Oil Change, Car Wash & Detailing, Towing, Auto Parts & Supplies, Auto Body & Glass
7. **Health & Medical** — Dentists, Doctors & Primary Care, Urgent Care & Hospitals, Pharmacies, Optometrists & Eye Care, Chiropractors & Physical Therapy, Mental Health & Counseling
8. **Beauty & Spas** — Hair Salons, Barbershops, Nail Salons, Day Spas, Massage Therapy, Skin Care & Waxing, Tattoo & Piercing
9. **Fitness & Wellness** — Gyms & Fitness Centers, Yoga & Pilates, Martial Arts & Boxing, Personal Trainers, Dance Studios
10. **Shopping** — Grocery & Supermarkets, Hardware & Home Improvement, Furniture & Home Decor, Clothing & Accessories, Jewelry & Gifts, Antiques & Thrift
11. **Pets** — Veterinarians, Pet Grooming, Pet Boarding & Sitting, Dog Training & Walking, Pet Stores & Supplies
12. **Professional Services** — Attorneys & Law Firms, Accounting & Tax Services, Insurance, Financial Planning, Marketing & IT Services
13. **Real Estate** — Real Estate Agents & Brokers, Apartments & Rentals, Mortgage & Lending, Property Management, Home Inspectors
14. **Events & Weddings** — Event & Wedding Planners, Event Venues, Photographers & Videographers, DJs, Caterers
15. **Hotels & Travel** — Hotels, Motels & B&Bs, Vacation Rentals, Campgrounds & RV Parks, Travel Agencies

### Phase 2 (deliberately left out of launch)

- **Education & Lessons** — Preschools & Day Care, Tutoring, Music & Art Lessons, Driving Schools, Trade Schools (childcare could also join Local Services)
- **Arts & Entertainment** — Cinemas, Bowling, Arcades, Museums, Escape Rooms, Comedy & Live Music Venues
- **Outdoors & Boating (Maryland-specific)** — Marinas, Boat Charters & Rentals, Crab Houses (could live under Restaurants), Fishing Guides, Golf Courses, Water Parks, Parks & Recreation — strong Chesapeake regional play, but niche for launch
- **Senior Care & Home Health** — Home Health Aides, Assisted Living, Hospice
- **Funeral Services** — Funeral Homes, Cemeteries
- **Solar & Energy** — Solar Installers, EV Charging
- **Additional trades** — Flooring, Windows & Doors, Fencing, Garage Doors, Pressure Washing, Tree Services, Pool Services
- **More restaurant cuisines** — Thai, Indian, Vietnamese/Pho, Korean, BBQ, Vegan/Vegetarian, Breakfast & Brunch, Food Trucks
- **Cannabis Dispensaries** — legal in MD; GBP has a "Cannabis store" category; add once content policy is decided
- **Religious Organizations, Public Services & Government, Media/Broadcast** — non-commercial; low directory value at launch
- **Medical specialists** — Dermatologists, Pediatricians, Dentists' specialties (Orthodontists, Oral Surgeons)
- **Retail niches** — Wine & Liquor, Florists standalone, Pet/Animal Shelters, Book Stores, Electronics, Sporting Goods

---

## 5. Platform mapping per recommended category

- **Restaurants** — Yelp: Restaurants (top-level; cuisine subcategories). GBP: Restaurant, Pizza restaurant, Italian restaurant, Chinese restaurant, Mexican restaurant, Japanese restaurant, Sushi restaurant, Seafood restaurant, Fast food restaurant, American restaurant.
- **Food & Drink** — Yelp: Food. GBP: Bakery, Coffee shop, Cafe, Donut shop, Ice cream shop, Dessert shop, Juice shop, Butcher shop, Deli.
- **Bars & Nightlife** — Yelp: Nightlife (+ Bars under Restaurants). GBP: Bar, Cocktail bar, Sports bar, Brewery, Winery, Night club, Karaoke bar.
- **Home Services** — Yelp: Home Services. GBP: Plumber, Electrician, HVAC contractor / Heating contractor / Air conditioning contractor, Roofing contractor, General contractor / Construction company / Bathroom remodeler, Painter, Handyman (verify at intake — GBP list shows related forms), Landscaper, Lawn care service, Pest control service.
- **Local Services** — Yelp: Local Services (Home Services overlaps). GBP: Moving service / Moving and storage service, Locksmith, Self-storage facility, Junk removal? (GBP uses variants — verify), House cleaning service, Carpet cleaning service, Window cleaning service, Dry cleaner / Laundromat.
- **Automotive** — Yelp: Automotive. GBP: Auto repair shop, Car dealer, Used car dealer, Tire shop, Oil change service, Car wash, Towing service, Auto parts store, Auto body shop / Auto glass repair service.
- **Health & Medical** — Yelp: Health & Medical. GBP: Dentist, Dental clinic, Doctor, Medical clinic, Urgent care center, Hospital, Pharmacy, Optometrist, Optician, Chiropractor, Physical therapist, Physical therapy clinic, Mental health clinic.
- **Beauty & Spas** — Yelp: Beauty & Spas. GBP: Hair salon, Hairdresser, Barber shop, Nail salon, Day spa, Spa, Massage therapist, Massage spa, Skin care clinic, Tanning salon, Tattoo shop.
- **Fitness & Wellness** — Yelp: Active Life → Fitness & Instruction (+ Beauty & Spas for massage). GBP: Gym, Fitness center, Yoga studio, Pilates studio, Martial arts school, Personal trainer, Dance school.
- **Shopping** — Yelp: Shopping (+ Food → Specialty Food). GBP: Grocery store, Supermarket, Convenience store, Hardware store, Home improvement store, Furniture store, Clothing store, Shoe store, Jewelry store, Gift shop, Antique store, Thrift store, Butcher shop.
- **Pets** — Yelp: Pets. GBP: Veterinarian, Animal hospital, Pet groomer, Pet store, Pet supply store, Dog trainer, Dog walker, Dog day care center.
- **Professional Services** — Yelp: Professional Services + Financial Services. GBP: Attorney, Lawyer, Law firm, Accounting firm, Accountant, Tax preparation service, Insurance agency, Insurance company, Financial planner, Financial consultant, Bank, Credit union, Marketing agency, Advertising agency, Graphic designer, Computer repair service, Computer service.
- **Real Estate** — Yelp: Real Estate. GBP: Real estate agency, Real estate agent, Mortgage lender, Property management company, Apartment rental agency, Apartment complex, Home inspector, Real estate appraiser.
- **Events & Weddings** — Yelp: Event Planning & Services (+ Arts & Entertainment → Photographers). GBP: Event planner, Wedding planner, Party planner, Event venue, Wedding venue, Banquet hall, Photographer, Wedding photographer, Caterer, Disc jockey (DJ variants).
- **Hotels & Travel** — Yelp: Hotels & Travel. GBP: Hotel, Motel, Bed & breakfast, Inn, Guest house, Resort hotel, Campground, RV park, Vacation home rental agency, Travel agency.

---

## Method and caveats

- Yelp's own numbers (section 2, ranks 1–7) are search-demand share, not business counts; business-count data comes from the Open Dataset (Restaurants ≈ 34%).
- GBP usage frequency is not published by Google; section 3 is demand-triangulated, with every name verified against the full 2026 GBP list (4,047 categories).
- A handful of GBP names are marked "verify at intake" (e.g., Handyman, Junk removal): the scraped list contains close variants, and Google adds/removes categories monthly — re-verify against PlePer or the GBP API `categories:batchGet` endpoint before building slug mappings.
- Maryland weighting applied: Seafood as a first-class restaurant subcategory (Chesapeake), Outdoors & Boating flagged as the top Phase-2 regional differentiator.
