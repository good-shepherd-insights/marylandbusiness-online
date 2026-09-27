import {defineField, defineType} from 'sanity'

/** Comparison table section (census 12 §6). Columns derive from
 * hiwPricing.plans; this doc owns the eyebrow/heading + feature groups. */
export const hiwComparison = defineType({
  name: 'hiwComparison',
  title: 'HIW Comparison',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'groups', title: 'Feature Groups', type: 'array', of: [{type: 'comparisonGroup'}]}),
  ],
  preview: {
    select: {title: 'heading', sub: 'eyebrow'},
    prepare({title, sub}) {
      return {title: title ?? 'HIW Comparison', subtitle: sub}
    },
  },
})
