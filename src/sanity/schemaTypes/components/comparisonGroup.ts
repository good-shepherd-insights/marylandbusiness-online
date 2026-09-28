import {defineField, defineType} from 'sanity'

/** One group band of the comparison table (census 12 §6), e.g.
 * "Listing & SEO". */
export const comparisonGroup = defineType({
  name: 'comparisonGroup',
  title: 'Comparison Group',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Group Title',
      type: 'string',
    }),
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [{type: 'comparisonRow'}],
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title ?? 'Group'}
    },
  },
})
