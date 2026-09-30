import { loadQuery } from './load-query';
import type { PerspectiveCookie } from './load-query';

import type {
  BlogEntry,
  ListingEntry,
  SanityAboutPage,
  SanityResourcesPage,
  SanityBlogPost,
  SanityHomePage,
  SanityImage,
  SanityListing,
  SanitySiteSettings,
  SanityDirectoryPage,
  SanityHowItWorksPage,
  SanityCategoryIndexGroup,
} from './types';

const listingProjection = /* groq */ `
  _id,
  _type,
  name,
  slug,
  description,
  image,
  featured,
  subcategory->{_id,_type,name,slug,parent->{_id,_type,name,slug}},
  county->{_id,_type,name,slug},
  city->{_id,_type,name,slug}
`;

/** Minimal projection for OG image routes: name + cover only. */
export async function getListingForOg(
  slug: string,
  perspectiveCookie?: PerspectiveCookie,
): Promise<{ name?: string; description?: string; image?: SanityImage } | undefined> {
  // Detail routes pass the nested URL (county/city/listing); the listing's
  // own slug is the last segment.
  const flatSlug = slug.split('/').pop() ?? slug;
  const { data } = await loadQuery<{
    name?: string;
    description?: string;
    image?: SanityImage;
  } | null>({
    query: `*[_type == "listing" && slug.current == $slug][0]{name, description, image{asset,alt}}`,
    params: { slug: flatSlug },
    perspectiveCookie,
  });
  return data ?? undefined;
}

/** Full BusinessDetails projection: every listing field, plus listing-owned
 * content (reviews/pulse/stories) dereferenced from its reference arrays. */
const listingDetailProjection = /* groq */ `
  _id,
  _type,
  name,
  slug,
  description,
  subcategory->{_id,_type,name,slug,parent->{_id,_type,name,slug}},
  county->{_id,_type,name,slug},
  city->{_id,_type,name,slug},
  rankLine,
  priceRange,
  featured,
  breadcrumbRoot,
  reviewCountSingularLabel,
  reviewCountPluralLabel,
  image{asset,alt},
  gallery[]{asset,alt},
  videoStill{asset,alt},
  videoHeading,
  videoLabel,
  videoEyebrow,
  videoCaption,
  videoDuration,
  videoUrl,
  aboutHeading,
  about,
  whyChooseUsHeading,
  whyChooseUs,
  amenitiesHeading,
  amenities[]{icon,label},
  achievementsHeading,
  achievementsSub,
  achievements[]{icon,label,subLabel},
  menuHeading,
  menuNote,
  menuCtaLabel,
  menuUrl,
  menu[]{label,items[]{name,price,description,image{asset,alt},badge}},
  eventsHeading,
  events[]{month,day,title,time,venue,ctaLabel,ctaLink},
  qaHeading,
  qaAskLabel,
  qaQuestionPrefix,
  qaAnswerPrefix,
  qa[]{question,answer},
  teamHeading,
  team[]{name,role,bio,avatar{asset,alt},ctaLabel,ctaLink},
  promotions[]{eyebrow,heading,note,ctaLabel,ctaLink,tone},
  reviewsHeading,
  verifiedVisitLabel,
  ratingStarLabel,
  pulseBookedText,
  pulseCapacityText,
  pulseWaitText,
  editorialHeading,
  editorialSub,
  editorialCtaLabel,
  // Listing-owned content (user-stated model): element-wise dereference of
  // the listing's own reference arrays.
  "editorialStories": stories[]->{_id, _type, title, slug, tag, date, excerpt, ctaLabel, ctaIcon, image{asset,alt}} | order(date desc),
  similarHeading,
  // similar is an array of references: element-wise dereference.
  "similar": similar[]->{_id,_type,name,slug,description,image{asset,alt},featured,priceRange,subcategory->{_id,_type,name,slug,parent->{_id,_type,name,slug}},county->{_id,_type,name,slug}},
  phone,
  website,
  directionsUrl,
  address{street,city,region,postalCode},
  hours[]{day,opens,closes},
  geo{lat,lng},
  ctaPrimaryLabel,
  ctaPrimaryUrl,
  ctaSecondaryLabel,
  ctaSecondaryUrl,
  phoneLabel,
  websiteLabel,
  addressLabel,
  directionsLabel,
  verificationHeading,
  taxStatusLabel,
  licenseLabel,
  lastAuditLabel,
  openNowLabel,
  closedLabel,
  closesAtLabel,
  opensAtLabel,
  taxStatus,
  licenseNumber,
  lastAudit,
  "reviews": reviews[]->{_id, _type, name, rating, title, body, date, avatar{asset,alt}, verifiedVisit, sourceName, sourceUrl} | order(date desc),
  "pulse": pulse[]-> | order(observedAt desc)[0]{
    _id, _type, booked, capacityPct, waitMinutes, observedAt
  }
`;

const blogPostProjection = /* groq */ `
  _id,
  _type,
  title,
  slug,
  description,
  publishedAt,
  tags,
  image,
  body
`;

/** All published listings, featured first. */
export async function getListings(
  perspectiveCookie?: PerspectiveCookie,
): Promise<ListingEntry[]> {
  const { data } = await loadQuery<SanityListing[]>({
    query: `*[_type == "listing" && defined(slug.current)] | order(featured desc, name asc){${listingProjection}}`,
    perspectiveCookie,
  });
  return data.map(toListingEntry);
}

/** One listing with its full detail projection (reviews + latest pulse from its own arrays). */
export async function getListing(
  slug: string,
  perspectiveCookie?: PerspectiveCookie,
): Promise<SanityListing | undefined> {
  const { data: doc } = await loadQuery<SanityListing | null>({
    query: `*[_type == "listing" && slug.current == $slug][0]{${listingDetailProjection}}`,
    params: { slug },
    perspectiveCookie,
  });
  return doc ?? undefined;
}

/** All published blog posts, newest first. */
export async function getBlogPosts(
  perspectiveCookie?: PerspectiveCookie,
): Promise<BlogEntry[]> {
  const { data } = await loadQuery<SanityBlogPost[]>({
    query: `*[_type == "blogPost" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc){${blogPostProjection}}`,
    perspectiveCookie,
  });
  return data.map(toBlogEntry);
}

export async function getBlogPost(
  slug: string,
  perspectiveCookie?: PerspectiveCookie,
): Promise<BlogEntry | undefined> {
  const { data: doc } = await loadQuery<SanityBlogPost | null>({
    query: `*[_type == "blogPost" && slug.current == $slug][0]{${blogPostProjection}}`,
    params: { slug },
    perspectiveCookie,
  });
  return doc ? toBlogEntry(doc) : undefined;
}

/** Home page singleton; undefined when the document does not exist yet. */
export async function getHomePage(
  perspectiveCookie?: PerspectiveCookie,
): Promise<SanityHomePage | undefined> {
  const { data } = await loadQuery<SanityHomePage | null>({
    query: `*[_type == "home"][0]{
      _id,
      _type,
      categoriesHeading,
      hero->{
        badge{icon,text},
        heading[]{text,style},
        subheading,
        images[]{asset,alt},
        countyLabel,
        counties[]{label},
        categoryLabel,
        categories[]{label},
        searchButtonLabel
      },
      trustStrip->{
        signals[]{icon,label}
      },
      countyHubs->{
        heading,
        description,
        ctaLabel,
        ctaLink,
        hubs[]{name,icon,businesses,link,image{asset,alt},imageAlt}
      },
      featuredBusinesses->{
        eyebrow,
        heading,
        description,
        businesses[]{
          image{asset,alt},
          imageAlt,
          badgeLabel,
          badgeTone,
          category,
          title,
          ratingStat,
          description,
          ctaLabel,
          ctaLink,
          ctaIcon
        }
      },
      editorial->{
        image{asset,alt},
        imageAlt,
        quote,
        attributionName,
        attributionBusiness,
        eyebrow,
        heading,
        description,
        stories->{title,excerpt},
        ctaLabel,
        ctaLink
      },
      socialFeed->{
        heading,
        liveLabel,
        description,
        items[]{
          avatar{asset,alt},
          name,
          location,
          quote,
          activityLabel,
          activityIcon
        },
        ctaLabel,
        ctaLink
      },
      homeNews->{
        _id, _type, eyebrow, heading, description, pulseLabel,
        archiveLabel, archiveUrl,
        items[]{_key, tag, headline, excerpt, place, timeLabel}
      },
      homePathways->{
        _id, _type, eyebrow, heading, description,
        cards[]{_key, title, description, links[]{_key, label, href}}
      },
      homeCategoryIndex->{
        _id, _type, eyebrow, heading, description
      },
      homeMethodology->{
        _id, _type, eyebrow, heading, description,
        steps[]{_key, title, body}
      },
      homeFaq->{
        _id, _type, eyebrow, heading, description,
        items[]{_key, question, answer}
      }
    }`,
    perspectiveCookie,
  });
  return data ?? undefined;
}

/** Live category -> subcategory tree for the home category index (census 13
 * §3). Columns are computed, never seeded: the grid grows as sectors are
 * added in Studio. Subcategory path is /{categorySlug}/{subcategorySlug}. */
export async function getCategoryTree(
  perspectiveCookie?: PerspectiveCookie,
): Promise<SanityCategoryIndexGroup[]> {
  const { data } = await loadQuery<SanityCategoryIndexGroup[]>({
    query: `*[_type == "category" && defined(name) && defined(slug.current)] | order(name asc){
      name,
      "slug": slug.current,
      "subcategories": *[_type == "subcategory" && parent._ref == ^._id && defined(name) && defined(slug.current)] | order(name asc){name, "slug": slug.current}
    }`,
    perspectiveCookie,
  });
  return data ?? [];
}

/** Directory page singleton (county-hub view); undefined when not seeded. */export async function getDirectoryPage(
  perspectiveCookie?: PerspectiveCookie,
): Promise<SanityDirectoryPage | undefined> {
  const { data } = await loadQuery<SanityDirectoryPage | null>({
    query: `*[_type == "directoryPage"][0]{
      _id,
      _type,
      title,
      hubHeader->{
        _id,
        _type,
        breadcrumbRoot,
        headingSuffix,
        liveBadgeLabel,
        stats[]{value,label}
      },
      hubDiscovery->{
        _id,
        _type,
        browseHeading,
        clearFiltersLabel,
        categoryFilterLabel,
        sortFilterLabel,
        openNowChipLabel,
        verifiedLabel,
        mapToggleMapLabel,
        mapToggleSatelliteLabel,
        regionFocusHeading,
        interactiveMapLabel,
        interactiveMapCloseLabel,
        expertiseHeading,
        expertiseStats[]{value,label}
      }
    }`,
    perspectiveCookie,
  });
  return data ?? undefined;
}

/** Site settings singleton; undefined when the document does not exist yet. */
export async function getSiteSettings(
  perspectiveCookie?: PerspectiveCookie,
): Promise<SanitySiteSettings | undefined> {
  const { data } = await loadQuery<SanitySiteSettings | null>({
    query: `*[_type == "siteSettings"][0]{_id, _type, siteTitle, seoName, seoDescription, seoUrl, searchPlaceholder, logoIcon,
      navLinks[]{_key, label, href},
      navCtaLabel,
      navMenuLabel,
      footerBrandBadge,
      footerBrandName,
      footerTagline,
      footerQuickHeading,
      footerQuickLinks[]{_key, label, href},
      footerResourceHeading,
      footerResourceLinks[]{_key, label, href},
      footerLegalName,
      footerLegalLinks[]{_key, label, href}
    }`,
    perspectiveCookie,
  });
  return data ?? undefined;
}

/** About page singleton; undefined when the document does not exist yet. */
export async function getAboutPage(
  perspectiveCookie?: PerspectiveCookie,
): Promise<SanityAboutPage | undefined> {
  const { data } = await loadQuery<SanityAboutPage | null>({
    query: `*[_type == "about"][0]{
      _id,
      _type,
      header->{
        breadcrumbRoot,
        breadcrumbCurrent,
        badge,
        heading,
        intro
      },
      statStrip->{
        stats[]{value,label}
      },
      origin->{
        image{asset,alt},
        imageAlt,
        eyebrow,
        heading,
        paragraphs
      },
      missionBand->{
        eyebrow,
        statement
      },
      visionPillars->{
        eyebrow,
        heading,
        description,
        pillars[]{icon,title,text}
      },
      offerArms->{
        eyebrow,
        heading,
        arms[]{icon,title,text,ctaLabel,ctaLink}
      },
      partnerships->{
        eyebrow,
        heading,
        description,
        ctaLabel,
        ctaLink,
        partners[]{icon,title,text}
      },
      closingCta->{
        heading,
        primaryLabel,
        primaryLink,
        secondaryLabel,
        secondaryLink
      }
    }`,
    perspectiveCookie,
  });
  return data ?? undefined;
}

function toListingEntry(doc: SanityListing): ListingEntry {
  return {
    id: doc.slug.current,
    collection: 'directory',
    data: {
      name: doc.name,
      slug: doc.slug.current,
      description: doc.description,
      image: doc.image,
      featured: doc.featured,
      subcategory: doc.subcategory ?? null,
      county: doc.county ?? null,
      city: doc.city ?? null,
    },
  };
}

function toBlogEntry(doc: SanityBlogPost): BlogEntry {
  return {
    id: doc.slug.current,
    collection: 'blog',
    data: {
      title: doc.title,
      description: doc.description,
      tags: doc.tags,
      image: doc.image,
    },
    publishedAt: doc.publishedAt,
    body: doc.body,
  };
}
/** Resources page singleton; undefined when the document does not exist yet. */
export async function getResourcesPage(
  perspectiveCookie?: PerspectiveCookie,
): Promise<SanityResourcesPage | undefined> {
  const { data } = await loadQuery<SanityResourcesPage | null>({
    query: `*[_type == "resources"][0]{
      _id,
      _type,
      title,
      intro->{
        breadcrumbRoot,
        title,
        introText,
        indexedLabel,
        searchPlaceholder
      },
      regulatoryUpdates->{
        eyebrow,
        heading,
        archiveLabel,
        archiveUrl,
        filterLabels,
        dateCaption,
        cardLinkLabel,
        updates[]{
          _key,
          effectiveDateText,
          jurisdictionKind,
          jurisdictionLabel,
          typeLabel,
          title,
          description,
          url
        }
      },
      featuredPrograms->{
        eyebrow,
        heading,
        cardLinkLabel,
        programs[]{
          _key,
          icon,
          iconTint,
          title,
          description,
          url
        }
      },
      countyJump->{
        heading,
        viewAllLabel,
        viewAllUrl
      },
      resourceDirectory->{
        heading,
        countLabel,
        searchPlaceholder,
        jurisdictionOptions,
        typeOptions,
        railTypeOptions,
        sortOptions,
        resetLabel,
        categoryHeading,
        categories,
        typeHeading,
        calendarHeading,
        deadlines[]{
          _key,
          title,
          org,
          dateLabel
        },
        cardLinkLabel,
        cards[]{
          _key,
          icon,
          iconTint,
          typeBadge,
          badgeTint,
          title,
          jurisdiction,
          jurisdictionKind,
          category,
          description,
          url
        },
        loadMoreLabel
      },
      alertSignup->{
        icon,
        heading,
        description,
        emailPlaceholder,
        buttonLabel
      }
    }`,
    perspectiveCookie,
  });
  return data ?? undefined;
}

/** How It Works page singleton (census 12); undefined when not seeded.
 * Comparison columns derive from the pricing plans — projected once here. */
export async function getHowItWorksPage(
  perspectiveCookie?: PerspectiveCookie,
): Promise<SanityHowItWorksPage | undefined> {
  const { data } = await loadQuery<SanityHowItWorksPage | null>({
    query: `*[_type == "howItWorks"][0]{
      _id,
      _type,
      title,
      hiwHeader->{
        _id, _type, breadcrumbRoot, badge, heading, intro,
        ctaPrimaryLabel, ctaSecondaryLabel, proofLine
      },
      hiwProcess->{
        _id, _type, eyebrow, heading, sub,
        steps[]{_key, num, title, description, metaTime, metaOwner, highlight}
      },
      hiwValue->{
        _id, _type, eyebrow, heading, sub,
        categories[]{_key, title, description, items}
      },
      hiwWhy->{
        _id, _type, eyebrow, heading,
        problemLabel, problemItems, solutionLabel, solutionItems,
        stats[]{_key, value, label}
      },
      hiwPricing->{
        _id, _type, eyebrow, heading, sub,
        plans[]{_key, name, price, period, tagline, ctaLabel, badge, includesLabel,
          features[]{_key, title, description, placeholder}}
      },
      hiwComparison->{
        _id, _type, eyebrow, heading,
        groups[]{_key, title, rows[]{_key, feature, cells[]{_key, kind, text}}}
      },
      hiwFaq->{
        _id, _type, eyebrow, heading,
        items[]{_key, question, answer}
      },
      hiwCta->{
        _id, _type, heading, ctaPrimaryLabel, ctaSecondaryLabel
      }
    }`,
    perspectiveCookie,
  });
  return data ?? undefined;
}
