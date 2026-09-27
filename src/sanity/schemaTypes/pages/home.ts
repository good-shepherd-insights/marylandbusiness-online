import {defineField, defineType} from 'sanity'

/**
 * Home page document — assembles page-level sections by reference. Sections
 * are standalone documents (see ../sections/); order on the page follows the
 * field order here.
 */
export const home = defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'reference',
      to: [{type: 'hero'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'trustStrip',
      title: 'Trust Strip',
      type: 'reference',
      to: [{type: 'trustStrip'}],
    }),
    defineField({
      name: 'countyHubs',
      title: 'County Hubs',
      type: 'reference',
      to: [{type: 'countyHubs'}],
    }),
    defineField({
      name: 'featuredBusinesses',
      title: 'Featured Businesses',
      type: 'reference',
      to: [{type: 'featuredBusinesses'}],
    }),
    defineField({
      name: 'editorial',
      title: 'Editorial',
      type: 'reference',
      to: [{type: 'editorial'}],
    }),
    defineField({
      name: 'socialFeed',
      title: 'Social Feed',
      type: 'reference',
      to: [{type: 'socialFeed'}],
    }),
    defineField({
      name: 'homeNews',
      title: 'News Feed (census 13)',
      type: 'reference',
      to: [{type: 'homeNews'}],
    }),
    defineField({
      name: 'homePathways',
      title: 'Pathways (census 13)',
      type: 'reference',
      to: [{type: 'homePathways'}],
    }),
    defineField({
      name: 'homeCategoryIndex',
      title: 'Category Index (census 13)',
      type: 'reference',
      to: [{type: 'homeCategoryIndex'}],
    }),
    defineField({
      name: 'homeMethodology',
      title: 'Methodology (census 13)',
      type: 'reference',
      to: [{type: 'homeMethodology'}],
    }),
    defineField({
      name: 'homeFaq',
      title: 'FAQ (census 13)',
      type: 'reference',
      to: [{type: 'homeFaq'}],
    }),
    defineField({
      name: 'categoriesHeading',
      title: 'Categories Heading',
      type: 'string',
      description: 'Heading above the "browse by business type" category list',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {heading: 'hero->heading'},
    prepare({heading}) {
      const first = Array.isArray(heading) ? heading[0] : undefined
      return {title: 'Sections', subtitle: first?.text ?? ''}
    },
  },
})