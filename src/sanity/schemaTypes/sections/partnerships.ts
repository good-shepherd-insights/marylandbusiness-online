import {defineField, defineType} from 'sanity'
import {partner} from '../components/partner'

/**
 * Partnerships section — intro + CTA plus a grid of partner cards, composed
 * of partner components.
 */
export const partnerships = defineType({
  name: 'partnerships',
  title: 'Partnerships',
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
      type: 'text',
      rows: 3,
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
      name: 'partners',
      title: 'Partners',
      type: 'array',
      of: [{type: 'partner'}],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {heading: 'heading', partners: 'partners'},
    prepare({heading, partners}) {
      const count = Array.isArray(partners) ? partners.length : 0
      return {title: heading ?? 'Partnerships', subtitle: count ? `${count} partners` : ''}
    },
  },
})
