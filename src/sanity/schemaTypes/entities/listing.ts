import {defineField, defineType} from 'sanity'
import {listingAddress} from '../components/listingAddress'
import {hourSpan} from '../components/hourSpan'
import {amenity} from '../components/amenity'
import {achievement} from '../components/achievement'
import {menuCategory} from '../components/menuCategory'
import {listingEvent} from '../components/listingEvent'
import {qaItem} from '../components/qaItem'
import {teamMember} from '../components/teamMember'
import {promotion} from '../components/promotion'

/** Closed value sets: `options.list` drives the Studio picker, `custom()` also
 * guards API/seed writes — arbitrary values fail validation either way. */
const PRICE_RANGES = ['$', '$$', '$$$', '$$$$']
export const TAX_STATUSES = [
  {title: 'Active / Valid', value: 'active'},
  {title: 'Invalid', value: 'invalid'},
]

/**
 * Listing — business content-entity document. One document drives the full
 * BusinessDetails page. Open status, closing time, rating, review count and
 * the rating distribution are computed at render time from structured data
 * (hours, review docs) — never stored here.
 */
export const listing = defineType({
  name: 'listing',
  title: 'Listing',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subcategory',
      title: 'Subcategory',
      type: 'reference',
      to: [{type: 'subcategory'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'county',
      title: 'County',
      type: 'reference',
      to: [{type: 'county'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'reference',
      to: [{type: 'city'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'rankLine',
      title: 'Rank Line',
      type: 'string',
      description: 'e.g. "#1 Ranked Seafood in Annapolis"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'priceRange',
      title: 'Price Range',
      type: 'string',
      options: {list: PRICE_RANGES},
      validation: (rule) =>
        rule
          .required()
          .custom(
            (value) =>
              PRICE_RANGES.includes(value as string) ||
              `Price range must be one of: ${PRICE_RANGES.join(', ')}`,
          ),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
    }),

    // Detail-page chrome — labels + icons are content, never hardcoded
    defineField({
      name: 'breadcrumbRoot',
      title: 'Breadcrumb Root',
      type: 'string',
      description: 'e.g. "Maryland" — root crumb above the listing name',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'reviewCountSingularLabel',
      title: 'Review Count Singular Label',
      type: 'string',
      description: 'e.g. "REVIEW"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'reviewCountPluralLabel',
      title: 'Review Count Plural Label',
      type: 'string',
      description: 'e.g. "REVIEWS"',
      validation: (rule) => rule.required(),
    }),

    // Gallery
    defineField({
      name: 'image',
      title: 'Primary Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', title: 'Alt text', type: 'string', validation: (rule) => rule.required()}),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [defineField({name: 'alt', title: 'Alt text', type: 'string', validation: (rule) => rule.required()})],
        },
      ],
    }),

    // Vibe Check video
    defineField({
      name: 'videoStill',
      title: 'Video Still',
      type: 'image',
      fields: [
        defineField({name: 'alt', title: 'Alt text', type: 'string', validation: (rule) => rule.required()}),
      ],
    }),
    defineField({
      name: 'videoHeading',
      title: 'Video Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'videoLabel',
      title: 'Video Label',
      type: 'string',
      description: 'e.g. "30-Second Walkthrough"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'videoEyebrow',
      title: 'Video Eyebrow',
      type: 'string',
      description: 'e.g. "Experience the Atmosphere"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'videoCaption',
      title: 'Video Caption',
      type: 'string',
      description: 'e.g. "Waterfront Dining, Live Kitchen & Golden Hour Views"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'videoDuration',
      title: 'Video Duration',
      type: 'string',
      description: 'e.g. 0:30',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
    }),

    // About / Why Choose Us
    defineField({
      name: 'aboutHeading',
      title: 'About Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'about',
      title: 'About',
      type: 'array',
      of: [{type: 'block'}],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'whyChooseUsHeading',
      title: 'Why Choose Us Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'whyChooseUs',
      title: 'Why Choose Us',
      type: 'array',
      of: [{type: 'block'}],
      validation: (rule) => rule.required().min(1),
    }),

    // Amenities / Achievements
    defineField({
      name: 'amenitiesHeading',
      title: 'Amenities Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [{type: 'amenity'}],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'achievementsHeading',
      title: 'Achievements Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'achievementsSub',
      title: 'Achievements Sub',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'achievements',
      title: 'Achievements',
      type: 'array',
      of: [{type: 'achievement'}],
      validation: (rule) => rule.required().min(1),
    }),

    // Menu
    defineField({
      name: 'menuHeading',
      title: 'Menu Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'menuNote',
      title: 'Menu Note',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'menuCtaLabel',
      title: 'Menu CTA Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'menuUrl',
      title: 'Menu URL',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'menu',
      title: 'Menu',
      type: 'array',
      of: [{type: 'menuCategory'}],
      validation: (rule) => rule.required().min(1),
    }),

    // Events
    defineField({
      name: 'eventsHeading',
      title: 'Events Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'events',
      title: 'Events',
      type: 'array',
      of: [{type: 'listingEvent'}],
      validation: (rule) => rule.required().min(1),
    }),

    // Q&A
    defineField({
      name: 'qaHeading',
      title: 'Q&A Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'qaAskLabel',
      title: 'Q&A Ask Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'qaQuestionPrefix',
      title: 'Q&A Question Prefix',
      type: 'string',
      description: 'e.g. "Q:"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'qaAnswerPrefix',
      title: 'Q&A Answer Prefix',
      type: 'string',
      description: 'e.g. "A:"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'qa',
      title: 'Q&A',
      type: 'array',
      of: [{type: 'qaItem'}],
      validation: (rule) => rule.required().min(1),
    }),

    // Team
    defineField({
      name: 'teamHeading',
      title: 'Team Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'team',
      title: 'Team',
      type: 'array',
      of: [{type: 'teamMember'}],
      validation: (rule) => rule.required().min(1),
    }),

    // Promotions
    defineField({
      name: 'promotions',
      title: 'Promotions',
      type: 'array',
      of: [{type: 'promotion'}],
    }),

    // Reviews section headings (aggregate + distribution computed from review docs)
    defineField({
      name: 'reviewsHeading',
      title: 'Reviews Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'verifiedVisitLabel',
      title: 'Verified Visit Label',
      type: 'string',
      description: 'Chip label for verified reviews, e.g. "Verified Visit"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ratingStarLabel',
      title: 'Rating Star Label',
      type: 'string',
      description: 'Distribution row label, e.g. "Star"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pulseBookedText',
      title: 'Pulse Booked Text',
      type: 'string',
      description: 'Template with {n} placeholder, e.g. "{n} people booked in the last hour"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pulseCapacityText',
      title: 'Pulse Capacity Text',
      type: 'string',
      description: 'Template with {n} placeholder, e.g. "Currently {n}% Full — book ahead"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pulseWaitText',
      title: 'Pulse Wait Text',
      type: 'string',
      description: 'Template with {n} placeholder, e.g. "Wait time: ~{n} mins"',
      validation: (rule) => rule.required(),
    }),
    // Listing owns its content (user-stated model): reviews, pulse and
    // stories are managed from the listing as reference arrays.
    defineField({
      name: 'reviews',
      title: 'Reviews',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'review'}]}],
    }),
    defineField({
      name: 'pulse',
      title: 'Pulse Observations',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'pulse'}]}],
    }),
    defineField({
      name: 'stories',
      title: 'Editorial Stories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'editorialStory'}]}],
    }),

    // Editorial ("In the Spotlight") — stories are listing-owned via
    // `stories[]` (user-stated 2026-09-26 model).
    defineField({
      name: 'editorialHeading',
      title: 'Editorial Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'editorialSub',
      title: 'Editorial Sub',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'editorialCtaLabel',
      title: 'Editorial CTA Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'similarHeading',
      title: 'Similar Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'similar',
      title: 'Similar Listings',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'listing'}]}],
    }),

    // Contact + buy box
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'directionsUrl',
      title: 'Directions URL',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'listingAddress',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'hours',
      title: 'Hours',
      type: 'array',
      of: [{type: 'hourSpan'}],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'geo',
      title: 'Geo Coordinates',
      type: 'geopoint',
    }),
    defineField({
      name: 'ctaPrimaryLabel',
      title: 'Primary CTA Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaPrimaryUrl',
      title: 'Primary CTA URL',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaSecondaryLabel',
      title: 'Secondary CTA Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaSecondaryUrl',
      title: 'Secondary CTA URL',
      type: 'url',
      validation: (rule) => rule.required(),
    }),

    // Buy box chrome — labels + icons are content, never hardcoded
    defineField({
      name: 'phoneLabel',
      title: 'Buy Box Phone Label',
      type: 'string',
      description: 'e.g. "Phone"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'websiteLabel',
      title: 'Buy Box Website Label',
      type: 'string',
      description: 'e.g. "Website"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'addressLabel',
      title: 'Buy Box Address Label',
      type: 'string',
      description: 'e.g. "Address"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'directionsLabel',
      title: 'Buy Box Directions Label',
      type: 'string',
      description: 'e.g. "Get Directions"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'verificationHeading',
      title: 'Buy Box Verification Heading',
      type: 'string',
      description: 'e.g. "Verification Data"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'taxStatusLabel',
      title: 'Buy Box Tax Status Label',
      type: 'string',
      description: 'e.g. "Tax ID Status" — display values come from the TAX_STATUSES enum titles',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'licenseLabel',
      title: 'Buy Box License Label',
      type: 'string',
      description: 'e.g. "License Number"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'lastAuditLabel',
      title: 'Buy Box Last Audit Label',
      type: 'string',
      description: 'e.g. "Last Audit"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'openNowLabel',
      title: 'Buy Box Open Now Label',
      type: 'string',
      description: 'e.g. "Open Now"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'closedLabel',
      title: 'Buy Box Closed Label',
      type: 'string',
      description: 'e.g. "Closed"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'closesAtLabel',
      title: 'Buy Box Closes At Label',
      type: 'string',
      description: 'e.g. "Closes at"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'opensAtLabel',
      title: 'Buy Box Opens At Label',
      type: 'string',
      description: 'e.g. "Opens at"',
      validation: (rule) => rule.required(),
    }),

    // Verification data
    defineField({
      name: 'taxStatus',
      title: 'Tax ID Status',
      type: 'string',
      options: {list: TAX_STATUSES},
      validation: (rule) =>
        rule
          .required()
          .custom(
            (value) =>
              TAX_STATUSES.some((o) => o.value === value) ||
              `Tax ID status must be one of: ${TAX_STATUSES.map((o) => o.value).join(', ')}`,
          ),
    }),
    defineField({
      name: 'licenseNumber',
      title: 'License Number',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'lastAudit',
      title: 'Last Audit',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {name: 'name', subcategory: 'subcategory->name', county: 'county->name', city: 'city->name', media: 'image'},
    prepare({name, subcategory, county, city, media}) {
      return {
        title: name ?? 'Listing',
        subtitle: [subcategory, county, city].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})