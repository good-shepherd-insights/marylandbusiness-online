import {defineField, defineType} from 'sanity'
import {pillar} from '../components/pillar'

/**
 * Vision pillars section — vision intro plus a grid of pillar cards,
 * composed of pillar components.
 */
export const visionPillars = defineType({
  name: 'visionPillars',
  title: 'Vision Pillars',
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
      name: 'pillars',
      title: 'Pillars',
      type: 'array',
      of: [{type: 'pillar'}],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {heading: 'heading', pillars: 'pillars'},
    prepare({heading, pillars}) {
      const count = Array.isArray(pillars) ? pillars.length : 0
      return {title: heading ?? 'Vision Pillars', subtitle: count ? `${count} pillars` : ''}
    },
  },
})
