export interface SanityImage {
  asset: { _ref: string };
  alt?: string;
}

/** Reusable listing component objects (mirror schemaTypes/components). */
export interface ListingAddress {
  street?: string;
  city?: string;
  region?: string;
  postalCode?: string;
}

export interface HourSpan {
  day?: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
  opens?: string;
  closes?: string;
}

export interface Amenity {
  icon?: string;
  label?: string;
}

export interface Achievement {
  icon?: string;
  label?: string;
  subLabel?: string;
}

export interface MenuItem {
  name?: string;
  price?: number;
  description?: string;
  image?: SanityImage;
  badge?: 'chefsSignature' | 'glutenFree' | 'seasonal';
}

export interface MenuCategory {
  label?: string;
  items?: MenuItem[] | null;
}

export interface ListingEvent {
  month?: string;
  day?: number;
  title?: string;
  time?: string;
  venue?: string;
  ctaLabel?: string;
  ctaLink?: string;
}

export interface QaItem {
  question?: string;
  answer?: string;
}

export interface TeamMember {
  name?: string;
  role?: string;
  bio?: string;
  avatar?: SanityImage;
  ctaLabel?: string;
  ctaLink?: string;
}

export interface Promotion {
  eyebrow?: string;
  heading?: string;
  note?: string;
  ctaLabel?: string;
  ctaLink?: string;
  tone?: 'coupon' | 'giftCard';
}

export type PriceRange = '$' | '$$' | '$$$' | '$$$$';

export interface SanityListing {
  _id: string;
  _type: 'listing';
  name?: string;
  slug: { current: string };
  description?: string;
  subcategory?: SanitySubcategory | null;
  county?: SanityCounty | null;
  city?: SanityCity | null;
  rankLine?: string;
  priceRange?: PriceRange;
  featured?: boolean;
  breadcrumbRoot?: string;
  reviewCountSingularLabel?: string;
  reviewCountPluralLabel?: string;
  image?: SanityImage;
  gallery?: SanityImage[] | null;
  videoStill?: SanityImage;
  videoHeading?: string;
  videoLabel?: string;
  videoEyebrow?: string;
  videoCaption?: string;
  videoDuration?: string;
  videoUrl?: string;
  aboutHeading?: string;
  about?: SanityBody;
  whyChooseUsHeading?: string;
  whyChooseUs?: SanityBody;
  amenitiesHeading?: string;
  amenities?: Amenity[] | null;
  achievementsHeading?: string;
  achievementsSub?: string;
  achievements?: Achievement[] | null;
  menuHeading?: string;
  menuNote?: string;
  menuCtaLabel?: string;
  menuUrl?: string;
  menu?: MenuCategory[] | null;
  eventsHeading?: string;
  events?: ListingEvent[] | null;
  qaHeading?: string;
  qaAskLabel?: string;
  qaQuestionPrefix?: string;
  qaAnswerPrefix?: string;
  qa?: QaItem[] | null;
  teamHeading?: string;
  team?: TeamMember[] | null;
  promotions?: Promotion[] | null;
  reviewsHeading?: string;
  verifiedVisitLabel?: string;
  ratingStarLabel?: string;
  pulseBookedText?: string;
  pulseCapacityText?: string;
  pulseWaitText?: string;
  editorialHeading?: string;
  editorialSub?: string;
  editorialCtaLabel?: string;
  /** Dereferenced from the listing-owned `stories[]` array. */
  editorialStories?: SanityEditorialStoryDoc[] | null;
  similarHeading?: string;
  similar?: SanityListing[] | null;
  phone?: string;
  website?: string;
  directionsUrl?: string;
  address?: ListingAddress;
  hours?: HourSpan[] | null;
  geo?: { lat?: number; lng?: number };
  ctaPrimaryLabel?: string;
  ctaPrimaryUrl?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryUrl?: string;
  phoneLabel?: string;
  websiteLabel?: string;
  addressLabel?: string;
  directionsLabel?: string;
  verificationHeading?: string;
  taxStatusLabel?: string;
  licenseLabel?: string;
  lastAuditLabel?: string;
  openNowLabel?: string;
  closedLabel?: string;
  closesAtLabel?: string;
  opensAtLabel?: string;
  taxStatus?: 'active' | 'invalid';
  licenseNumber?: string;
  lastAudit?: string;
  /** Dereferenced from the listing-owned `reviews[]` / `pulse[]` arrays. */
  reviews?: SanityReview[] | null;
  pulse?: SanityPulse | null;
}

/** Referenceable business category (parent type; hub pages). */
export interface SanityCategory {
  _id: string;
  _type: 'category';
  name?: string;
  slug: { current: string };
  description?: string;
}

/** Business subcategory — its own entity; parent supplies the first URL
 * segment (TAGS.md type axis: /restaurant/seafood). */
export interface SanitySubcategory {
  _id: string;
  _type: 'subcategory';
  name?: string;
  slug: { current: string };
  description?: string;
  parent?: SanityCategory | null;
}

/** Referenceable county/place (breadcrumbs, similar filtering, county hubs). */
export interface SanityCounty {
  _id: string;
  _type: 'county';
  name?: string;
  slug: { current: string };
  description?: string;
}

/** Second level of the geographic hierarchy (`/[county]/[city]` paths). */
export interface SanityCity {
  _id: string;
  _type: 'city';
  name?: string;
  slug: { current: string };
  description?: string;
}

/** Standalone review doc, attributed to its original via sourceUrl. */
export interface SanityReview {
  _id: string;
  _type: 'review';
  name?: string;
  rating?: number;
  title?: string;
  body?: string;
  date?: string;
  avatar?: SanityImage;
  verifiedVisit?: boolean;
  sourceName?: string;
  sourceUrl?: string;
}

/** Pulse observation for one listing (future social feature grows from here). */
export interface SanityPulse {
  _id: string;
  _type: 'pulse';
  booked?: number;
  capacityPct?: number;
  waitMinutes?: number;
  observedAt?: string;
}

/** Standalone editorial story document (listing spotlight cards + full pages). */
export interface SanityEditorialStoryDoc {
  _id: string;
  _type: 'editorialStory';
  title?: string;
  slug: { current: string };
  tag?: 'feature' | 'sustainability';
  date?: string;
  excerpt?: string;
  ctaLabel?: string;
  ctaIcon?: string;
  image?: SanityImage;
  body?: SanityBody;
}

export interface SanityBlogPost {
  _id: string;
  _type: 'blogPost';
  title?: string;
  slug: { current: string };
  description?: string;
  publishedAt?: string;
  tags?: string[];
  image?: SanityImage;
  body?: SanityBody;
}

export type SanityBody = Array<{ _type: string; [key: string]: unknown }>;

/** One styled segment of the CMS-composed hero heading. */
export interface HeroHeadingSegment {
  text?: string;
  style?: 'plain' | 'accent' | 'highlight';
}

export interface HeroBadge {
  icon?: string;
  text?: string;
}

export interface HeroImage {
  asset: { _ref: string };
  alt?: string;
}

export interface HeroSelectOption {
  label?: string;
}

export interface HeroContent {
  badge?: HeroBadge | null;
  heading?: HeroHeadingSegment[] | null;
  subheading?: string;
  images?: HeroImage[] | null;
  countyLabel?: string;
  counties?: HeroSelectOption[] | null;
  categoryLabel?: string;
  categories?: HeroSelectOption[] | null;
  searchButtonLabel?: string;
}

export interface TrustSignal {
  icon?: string;
  label?: string;
}

export interface TrustStripContent {
  signals?: TrustSignal[] | null;
}

/** One county card in the county hubs section. */
export interface CountyHub {
  name?: string;
  icon?: string;
  businesses?: string;
  link?: string;
}

export interface CountyHubsContent {
  heading?: string;
  description?: string;
  ctaLabel?: string;
  ctaLink?: string;
  hubs?: CountyHub[] | null;
}

/** One business card in the featured businesses section. */
export interface FeaturedBusiness {
  image?: SanityImage;
  imageAlt?: string;
  badgeLabel?: string;
  badgeTone?: 'verified' | 'dark';
  category?: string;
  title?: string;
  ratingStat?: string;
  description?: string;
  ctaLabel?: string;
  ctaLink?: string;
  ctaIcon?: string;
}

export interface FeaturedBusinessesContent {
  eyebrow?: string;
  heading?: string;
  description?: string;
  businesses?: FeaturedBusiness[] | null;
}

/** Dereferenced editorial story row in the editorial section. */
export interface EditorialStory {
  title?: string;
  excerpt?: string;
}

export interface EditorialContent {
  image?: SanityImage;
  imageAlt?: string;
  quote?: string;
  attributionName?: string;
  attributionBusiness?: string;
  eyebrow?: string;
  heading?: string;
  description?: string;
  stories?: EditorialStory[] | null;
  ctaLabel?: string;
  ctaLink?: string;
}

/** One community activity card in the social feed section. */
export interface SocialFeedItem {
  avatar?: SanityImage;
  name?: string;
  location?: string;
  quote?: string;
  activityLabel?: string;
  activityIcon?: string;
}

export interface SocialFeedContent {
  heading?: string;
  liveLabel?: string;
  description?: string;
  items?: SocialFeedItem[] | null;
  ctaLabel?: string;
  ctaLink?: string;
}

export interface SanityHomePage {
  _id: string;
  _type: 'home';
  categoriesHeading?: string;
  hero?: HeroContent | null;
  trustStrip?: TrustStripContent | null;
  countyHubs?: CountyHubsContent | null;
  featuredBusinesses?: FeaturedBusinessesContent | null;
  editorial?: EditorialContent | null;
  socialFeed?: SocialFeedContent | null;
  homeNews?: SanityHomeNews | null;
  homePathways?: SanityHomePathways | null;
  homeCategoryIndex?: SanityHomeCategoryIndex | null;
  homeMethodology?: SanityHomeMethodology | null;
  homeFaq?: SanityHomeFaq | null;
}
/** Census 13 — Home Content Expansion sections. */
export interface SanityNewsItem {
  _key?: string;
  tag?: string;
  headline?: string;
  excerpt?: string;
  place?: string;
  timeLabel?: string;
}
export interface SanityHomeNews {
  _id: string;
  _type: 'homeNews';
  eyebrow?: string;
  heading?: string;
  description?: string;
  pulseLabel?: string;
  archiveLabel?: string;
  archiveUrl?: string;
  items?: SanityNewsItem[] | null;
}
export interface SanityPathwayCard {
  _key?: string;
  title?: string;
  description?: string;
  links?: SanityNavLink[] | null;
}
export interface SanityHomePathways {
  _id: string;
  _type: 'homePathways';
  eyebrow?: string;
  heading?: string;
  description?: string;
  cards?: SanityPathwayCard[] | null;
}
/** One computed column of the category index (census 13 §3): a category and
 * its subcategories, dereferenced at query time by getCategoryTree(). */
export interface SanityCategoryIndexGroup {
  name: string;
  slug: string;
  subcategories?: {name: string; slug: string}[] | null;
}
export interface SanityHomeCategoryIndex {
  _id: string;
  _type: 'homeCategoryIndex';
  eyebrow?: string;
  heading?: string;
  description?: string;
}
export interface SanityMethodStep {
  _key?: string;
  title?: string;
  body?: string;
}
export interface SanityHomeMethodology {
  _id: string;
  _type: 'homeMethodology';
  eyebrow?: string;
  heading?: string;
  description?: string;
  steps?: SanityMethodStep[] | null;
}
export interface SanityHomeFaq {
  _id: string;
  _type: 'homeFaq';
  eyebrow?: string;
  heading?: string;
  description?: string;
  items?: SanityFaqItem[] | null;
}

/** Hub header section — county hub command-center band (census 10). */
export interface SanityHubHeader {
  _id: string;
  _type: 'hubHeader';
  breadcrumbRoot?: string;
  headingSuffix?: string;
  liveBadgeLabel?: string;
  stats?: StatItem[] | null;
}

/** Hub discovery section — split-view chrome (census 10). */
export interface SanityHubDiscovery {
  _id: string;
  _type: 'hubDiscovery';
  browseHeading?: string;
  clearFiltersLabel?: string;
  categoryFilterLabel?: string;
  sortFilterLabel?: string;
  openNowChipLabel?: string;
  verifiedLabel?: string;
  mapToggleMapLabel?: string;
  mapToggleSatelliteLabel?: string;
  regionFocusHeading?: string;
  interactiveMapLabel?: string;
  interactiveMapCloseLabel?: string;
  expertiseHeading?: string;
  expertiseStats?: StatItem[] | null;
}

/** Directory page singleton — county-hub view; references only. */
export interface SanityDirectoryPage {
  _id: string;
  _type: 'directoryPage';
  title?: string;
  hubHeader?: SanityHubHeader | null;
  hubDiscovery?: SanityHubDiscovery | null;
}

/** One business row of the hub discovery list (computed per county). */
export interface HubBusiness {
  _id: string;
  name?: string;
  slug: { current: string };
  description?: string;
  image?: SanityImage;
  /** Pre-built CDN URL (width 200) so client-side row rendering needs no
   * image-builder dependency. */
  imageUrl?: string | null;
  taxStatus?: 'active' | 'invalid';
  ctaPrimaryLabel?: string;
  ctaPrimaryUrl?: string;
  phone?: string;
  city?: { name?: string; slug?: string } | null;
  county?: { name?: string; slug?: string } | null;
  geo?: { lat: number; lng: number } | null;
  rating: number;
  reviewCount: number;
  /** Category axis (subcategory + its parent) for client-side filtering. */
  subcategory?: {
    name: string;
    slug: string;
    parent?: { name: string; slug: string } | null;
  } | null;
  priceRange?: string | null;
  hours?: { day: string; opens: string; closes: string }[] | null;
}

/** Hub render data for any gate-passing path kind: heading label, the
 * path's business rows, and city rows with counts (Region Focus). */
export interface HubData {
  label: string;
  businesses: HubBusiness[];
  cities: HubCity[];
  /** Real, computed header stats (listing counts) — replaces the CMS
   * demo numbers in the header stat blocks. */
  stats: { value: string; label: string }[];
}

export interface HubCity {
  name: string;
  slug: string;
  count: number;
}

/** Site-wide identity singleton (tab title, SEO/social meta, search placeholder). */
export interface SanityNavLink {
  _key?: string;
  label?: string;
  href?: string;
}

export interface SanitySiteSettings {
  _id: string;
  _type: 'siteSettings';
  siteTitle?: string;
  seoName?: string;
  seoDescription?: string;
  seoUrl?: string;
  searchPlaceholder?: string;
  logoIcon?: string;
  navLinks?: SanityNavLink[] | null;
  navCtaLabel?: string;
  navMenuLabel?: string;
  footerBrandBadge?: string;
  footerBrandName?: string;
  footerTagline?: string;
  footerQuickHeading?: string;
  footerQuickLinks?: SanityNavLink[] | null;
  footerResourceHeading?: string;
  footerResourceLinks?: SanityNavLink[] | null;
  footerLegalName?: string;
  footerLegalLinks?: SanityNavLink[] | null;
}

/* ---------- About page content ---------- */

export interface AboutHeaderContent {
  breadcrumbRoot?: string;
  breadcrumbCurrent?: string;
  badge?: string;
  heading?: string;
  intro?: string;
}

export interface StatItem {
  value?: string;
  label?: string;
}

export interface StatStripContent {
  stats?: StatItem[] | null;
}

export interface OriginContent {
  image?: SanityImage;
  imageAlt?: string;
  eyebrow?: string;
  heading?: string;
  paragraphs?: string[] | null;
}

export interface MissionBandContent {
  eyebrow?: string;
  statement?: string;
}

export interface Pillar {
  icon?: string;
  title?: string;
  text?: string;
}

export interface VisionPillarsContent {
  eyebrow?: string;
  heading?: string;
  description?: string;
  pillars?: Pillar[] | null;
}

export interface OfferArm {
  icon?: string;
  title?: string;
  text?: string;
  ctaLabel?: string;
  ctaLink?: string;
}

export interface OfferArmsContent {
  eyebrow?: string;
  heading?: string;
  arms?: OfferArm[] | null;
}

export interface Partner {
  icon?: string;
  title?: string;
  text?: string;
}

export interface PartnershipsContent {
  eyebrow?: string;
  heading?: string;
  description?: string;
  ctaLabel?: string;
  ctaLink?: string;
  partners?: Partner[] | null;
}

export interface ClosingCtaContent {
  heading?: string;
  primaryLabel?: string;
  primaryLink?: string;
  secondaryLabel?: string;
  secondaryLink?: string;
}

export interface SanityAboutPage {
  _id: string;
  _type: 'about';
  header?: AboutHeaderContent | null;
  statStrip?: StatStripContent | null;
  origin?: OriginContent | null;
  missionBand?: MissionBandContent | null;
  visionPillars?: VisionPillarsContent | null;
  offerArms?: OfferArmsContent | null;
  partnerships?: PartnershipsContent | null;
  closingCta?: ClosingCtaContent | null;
}

/**
 * Collection-entry-shaped view of a Sanity document, so components written
 * for `astro:content` entries (`item.id`, `item.data.*`) keep working.
 */
export interface ListingEntry {
  id: string;
  collection: 'directory';
  data: {
    name?: string;
    slug?: string;
    description?: string;
    image?: SanityImage;
    featured?: boolean;
    subcategory?: SanitySubcategory | null;
    county?: SanityCounty | null;
    city?: SanityCity | null;
  };
}

export interface BlogEntry {
  id: string;
  collection: 'blog';
  data: {
    title?: string;
    description?: string;
    tags?: string[];
    image?: SanityImage;
  };
  publishedAt?: string;
  body?: SanityBody;
}
// ── Resources page ──────────────────────────────────────────────────────────

export type JurisdictionKind = 'state' | 'county' | 'city';
export type IconTint = 'primary' | 'secondary' | 'dark';

export interface RegulatoryUpdate {
  _key: string;
  effectiveDateText: string;
  jurisdictionKind: JurisdictionKind;
  jurisdictionLabel: string;
  typeLabel: string;
  title: string;
  description: string;
  url: string;
}

export interface RegulatoryUpdatesContent {
  eyebrow: string;
  heading: string;
  archiveLabel: string;
  archiveUrl: string;
  filterLabels: string[];
  dateCaption: string;
  cardLinkLabel: string;
  updates: RegulatoryUpdate[] | null;
}

export interface FlagshipProgram {
  _key: string;
  icon: string;
  iconTint: IconTint;
  title: string;
  description: string;
  url: string;
}

export interface FeaturedProgramsContent {
  eyebrow: string;
  heading: string;
  cardLinkLabel: string;
  programs: FlagshipProgram[] | null;
}

export interface CountyJumpContent {
  heading: string;
  viewAllLabel: string;
  viewAllUrl: string;
}

export interface DeadlineEntry {
  _key: string;
  title: string;
  org: string;
  dateLabel: string;
}

export interface ResourceCardItem {
  _key: string;
  icon: string;
  iconTint: 'primary' | 'secondary';
  typeBadge: string;
  badgeTint: IconTint;
  title: string;
  jurisdiction: string;
  jurisdictionKind: JurisdictionKind;
  category: string;
  description: string;
  url: string;
}

export interface ResourceDirectoryContent {
  heading: string;
  countLabel: string;
  searchPlaceholder: string;
  jurisdictionOptions: string[];
  typeOptions: string[];
  railTypeOptions: string[];
  sortOptions: string[];
  resetLabel: string;
  categoryHeading: string;
  categories: string[];
  typeHeading: string;
  calendarHeading: string;
  deadlines: DeadlineEntry[] | null;
  cardLinkLabel: string;
  cards: ResourceCardItem[] | null;
  loadMoreLabel: string;
}

export interface ResourcesIntroContent {
  breadcrumbRoot: string;
  title: string;
  introText: string;
  indexedLabel: string;
  searchPlaceholder: string;
}

export interface AlertSignupContent {
  icon: string;
  heading: string;
  description: string;
  emailPlaceholder: string;
  buttonLabel: string;
}

export interface SanityResourcesPage {
  _id: string;
  _type: 'resources';
  title?: string;
  intro?: ResourcesIntroContent | null;
  regulatoryUpdates?: RegulatoryUpdatesContent | null;
  featuredPrograms?: FeaturedProgramsContent | null;
  countyJump?: CountyJumpContent | null;
  resourceDirectory?: ResourceDirectoryContent | null;
  alertSignup?: AlertSignupContent | null;
}

/* How It Works page (census 12) — section content types. */

export interface SanityHiwHeader {
  _id: string;
  _type: 'hiwHeader';
  breadcrumbRoot?: string;
  badge?: string;
  heading?: string;
  intro?: string;
  ctaPrimaryLabel?: string;
  ctaSecondaryLabel?: string;
  proofLine?: string;
}

export interface SanityProcessStep {
  _key?: string;
  num?: string;
  title?: string;
  description?: string;
  metaTime?: string;
  metaOwner?: string;
  highlight?: boolean;
}

export interface SanityHiwProcess {
  _id: string;
  _type: 'hiwProcess';
  eyebrow?: string;
  heading?: string;
  sub?: string;
  steps?: SanityProcessStep[] | null;
}

export interface SanityValueCategory {
  _key?: string;
  title?: string;
  description?: string;
  items?: string[] | null;
}

export interface SanityHiwValue {
  _id: string;
  _type: 'hiwValue';
  eyebrow?: string;
  heading?: string;
  sub?: string;
  categories?: SanityValueCategory[] | null;
}

export interface SanityHiwWhy {
  _id: string;
  _type: 'hiwWhy';
  eyebrow?: string;
  heading?: string;
  problemLabel?: string;
  problemItems?: string[] | null;
  solutionLabel?: string;
  solutionItems?: string[] | null;
  stats?: StatItem[] | null;
}

export interface SanityPlanFeature {
  _key?: string;
  title?: string;
  description?: string;
  placeholder?: boolean;
}

export interface SanityPricingPlan {
  _key?: string;
  name?: string;
  price?: string;
  period?: string;
  tagline?: string;
  ctaLabel?: string;
  badge?: string;
  includesLabel?: string;
  features?: SanityPlanFeature[] | null;
}

export interface SanityHiwPricing {
  _id: string;
  _type: 'hiwPricing';
  eyebrow?: string;
  heading?: string;
  sub?: string;
  plans?: SanityPricingPlan[] | null;
}

export interface SanityComparisonCell {
  _key?: string;
  kind?: 'check' | 'text';
  text?: string;
}

export interface SanityComparisonRow {
  _key?: string;
  feature?: string;
  cells?: SanityComparisonCell[] | null;
}

export interface SanityComparisonGroup {
  _key?: string;
  title?: string;
  rows?: SanityComparisonRow[] | null;
}

export interface SanityHiwComparison {
  _id: string;
  _type: 'hiwComparison';
  eyebrow?: string;
  heading?: string;
  groups?: SanityComparisonGroup[] | null;
}

export interface SanityFaqItem {
  _key?: string;
  question?: string;
  answer?: string;
}

export interface SanityHiwFaq {
  _id: string;
  _type: 'hiwFaq';
  eyebrow?: string;
  heading?: string;
  items?: SanityFaqItem[] | null;
}

export interface SanityHiwCta {
  _id: string;
  _type: 'hiwCta';
  heading?: string;
  ctaPrimaryLabel?: string;
  ctaSecondaryLabel?: string;
}

export interface SanityHowItWorksPage {
  _id: string;
  _type: 'howItWorks';
  title?: string;
  hiwHeader?: SanityHiwHeader | null;
  hiwProcess?: SanityHiwProcess | null;
  hiwValue?: SanityHiwValue | null;
  hiwWhy?: SanityHiwWhy | null;
  hiwPricing?: SanityHiwPricing | null;
  hiwComparison?: SanityHiwComparison | null;
  hiwFaq?: SanityHiwFaq | null;
  hiwCta?: SanityHiwCta | null;
}
