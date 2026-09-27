import {defineField, defineType} from 'sanity'

/** Pricing section (census 12 §5). Plans are the single source of truth —
 * the comparison section derives its columns from them. */
export const hiwPricing = defineType({
  name: 'hiwPricing',
  title: 'HIW Pricing',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'sub', title: 'Subheading', type: 'text', rows: 3}),
    defineField({name: 'plans', title: 'Plans', type: 'array', of: [{type: 'pricingPlan'}]}),
  ],
  preview: {
    select: {title: 'heading', sub: 'eyebrow'},
    prepare({title, sub}) {
      return {title: title ?? 'HIW Pricing', subtitle: sub}
    },
  },
})
