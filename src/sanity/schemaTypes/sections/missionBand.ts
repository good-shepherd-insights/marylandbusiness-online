import {defineField, defineType} from 'sanity'

/**
 * Mission band section — full-width mission statement band.
 */
export const missionBand = defineType({
  name: 'missionBand',
  title: 'Mission Band',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'statement',
      title: 'Statement',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {statement: 'statement'},
    prepare({statement}) {
      const firstLine = typeof statement === 'string' ? statement.split(' ').slice(0, 6).join(' ') : ''
      return {title: 'Mission Band', subtitle: firstLine}
    },
  },
})
