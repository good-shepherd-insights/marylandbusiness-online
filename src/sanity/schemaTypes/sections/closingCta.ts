import {defineField, defineType} from 'sanity'

/**
 * Closing CTA section — dark band with two semantically distinct actions
 * (primary action vs secondary explore), modeled as explicit field pairs,
 * not a list.
 */
export const closingCta = defineType({
  name: 'closingCta',
  title: 'Closing CTA',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'primaryLabel',
      title: 'Primary action label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'primaryLink',
      title: 'Primary action link',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'secondaryLabel',
      title: 'Secondary action label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'secondaryLink',
      title: 'Secondary action link',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {heading: 'heading'},
    prepare({heading}) {
      const firstLine = typeof heading === 'string' ? heading.split(' ').slice(0, 6).join(' ') : ''
      return {title: 'Closing CTA', subtitle: firstLine}
    },
  },
})
