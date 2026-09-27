import {defineField, defineType} from 'sanity'

/** One numbered methodology item (census 13 §4). The number badge renders
 * from the item position in the component — not stored. */
export const methodStep = defineType({
  name: 'methodStep',
  title: 'Method Step',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 4,
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title ?? 'Step'}
    },
  },
})
