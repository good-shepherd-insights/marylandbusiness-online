import {defineField, defineType} from 'sanity'

/** One feature row of the comparison table (census 12 §6). One cell per
 * plan column — the columns come from hiwPricing.plans. */
export const comparisonRow = defineType({
  name: 'comparisonRow',
  title: 'Comparison Row',
  type: 'object',
  fields: [
    defineField({
      name: 'feature',
      title: 'Feature',
      type: 'string',
    }),
    defineField({
      name: 'cells',
      title: 'Cells (one per plan)',
      type: 'array',
      of: [{type: 'comparisonCell'}],
    }),
  ],
  preview: {
    select: {title: 'feature'},
    prepare({title}) {
      return {title: title ?? 'Row'}
    },
  },
})
