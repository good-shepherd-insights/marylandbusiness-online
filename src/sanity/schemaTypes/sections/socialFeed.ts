import {defineField, defineType} from 'sanity'
import {socialFeedItem} from '../components/socialFeedItem'

/**
 * Social feed section document — dark community band: heading/description
 * plus a grid of socialFeedItem cards and a closing CTA. The live indicator
 * label is content (`liveLabel`); the pulsing dot and star rows are
 * presentation (CSS). Referenced by page documents (currently home).
 */
export const socialFeed = defineType({
  name: 'socialFeed',
  title: 'Social Feed',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'liveLabel',
      title: 'Live Activity Label',
      type: 'string',
      description: 'e.g. "Live Activity" — badge beside the pulsing dot',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Feed items',
      type: 'array',
      of: [{type: 'socialFeedItem'}],
      validation: (rule) => rule.required().min(1),
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
  ],
  preview: {
    select: {heading: 'heading', items: 'items'},
    prepare({heading, items}) {
      const count = Array.isArray(items) ? items.length : 0
      return {title: heading ?? 'Social Feed', subtitle: count ? `${count} items` : ''}
    },
  },
})
