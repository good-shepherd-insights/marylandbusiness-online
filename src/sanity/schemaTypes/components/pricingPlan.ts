import {defineField, defineType} from 'sanity'

/** One pricing tier card (census 12 §5). The comparison table derives its
 * columns from these plans — single source of truth. */
export const pricingPlan = defineType({
  name: 'pricingPlan',
  title: 'Pricing Plan',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Plan Name',
      type: 'string',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'e.g. "$99"',
    }),
    defineField({
      name: 'period',
      title: 'Period',
      type: 'string',
      description: 'e.g. "/mo"',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      description: 'e.g. "Most Popular" — empty for none',
    }),
    defineField({
      name: 'includesLabel',
      title: 'Includes Label',
      type: 'string',
      description: 'e.g. "Everything in Featured, plus:" — dashed divider above features; empty on the base plan',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'planFeature'}],
    }),
  ],
  preview: {
    select: {title: 'name', price: 'price', period: 'period'},
    prepare({title, price, period}) {
      return {title: title ?? 'Plan', subtitle: price ? `${price}${period ?? ''}` : undefined}
    },
  },
})
