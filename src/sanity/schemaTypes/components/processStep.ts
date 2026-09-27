import {defineField, defineType} from 'sanity'

/** One timeline step of the How-It-Works process band (census 12 §2).
 * Step icons are frontend literals — never stored. */
export const processStep = defineType({
  name: 'processStep',
  title: 'Process Step',
  type: 'object',
  fields: [
    defineField({
      name: 'num',
      title: 'Number',
      type: 'string',
      description: 'e.g. "01"',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'metaTime',
      title: 'Meta — Time',
      type: 'string',
      description: 'e.g. "~10 Minutes"',
    }),
    defineField({
      name: 'metaOwner',
      title: 'Meta — Owner',
      type: 'string',
      description: 'e.g. "You Complete This"',
    }),
    defineField({
      name: 'highlight',
      title: 'Highlight (gold dot)',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {num: 'num', subtitle: 'title'},
    prepare({num, subtitle}) {
      return {title: num ? `${num}` : 'Step', subtitle}
    },
  },
})
