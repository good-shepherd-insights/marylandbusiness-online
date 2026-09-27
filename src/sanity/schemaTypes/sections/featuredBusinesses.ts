import {defineField, defineType} from 'sanity'
import {featuredBusiness} from '../components/featuredBusiness'

/**
 * Featured businesses section document — eyebrow/heading/description header
 * plus a grid of featuredBusiness cards. Carousel arrows are presentation
 * (CSS), not CMS data. Referenced by page documents (currently home).
 */
export const featuredBusinesses = defineType({
  name: 'featuredBusinesses',
  title: 'Featured Businesses',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'businesses',
      title: 'Businesses',
      type: 'array',
      of: [{type: 'featuredBusiness'}],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {heading: 'heading', businesses: 'businesses'},
    prepare({heading, businesses}) {
      const count = Array.isArray(businesses) ? businesses.length : 0
      return {title: heading ?? 'Featured Businesses', subtitle: count ? `${count} businesses` : ''}
    },
  },
})
