import {defineField, defineType} from 'sanity'
import {countyHub} from '../components/countyHub'

/**
 * County hubs section document — "Explore Maryland Hubs" header plus a grid
 * of county cards, composed of countyHub components. Referenced by page
 * documents (currently home).
 */
export const countyHubs = defineType({
  name: 'countyHubs',
  title: 'County Hubs',
  type: 'document',
  fields: [
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
      name: 'ctaLabel',
      title: 'CTA label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA link',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'hubs',
      title: 'Hubs',
      type: 'array',
      of: [{type: 'countyHub'}],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {heading: 'heading', hubs: 'hubs'},
    prepare({heading, hubs}) {
      const count = Array.isArray(hubs) ? hubs.length : 0
      return {title: heading ?? 'County Hubs', subtitle: count ? `${count} hubs` : ''}
    },
  },
})