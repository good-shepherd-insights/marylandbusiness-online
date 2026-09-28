import {defineField, defineType} from 'sanity'

/**
 * How It Works page document — singleton under Pages. References only;
 * field order = render order (census 12).
 */
export const howItWorks = defineType({
  name: 'howItWorks',
  title: 'How It Works',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'hiwHeader',
      title: 'Header',
      type: 'reference',
      to: [{type: 'hiwHeader'}],
    }),
    defineField({
      name: 'hiwProcess',
      title: 'Process',
      type: 'reference',
      to: [{type: 'hiwProcess'}],
    }),
    defineField({
      name: 'hiwValue',
      title: 'What You Get',
      type: 'reference',
      to: [{type: 'hiwValue'}],
    }),
    defineField({
      name: 'hiwWhy',
      title: 'Why It Matters',
      type: 'reference',
      to: [{type: 'hiwWhy'}],
    }),
    defineField({
      name: 'hiwPricing',
      title: 'Pricing',
      type: 'reference',
      to: [{type: 'hiwPricing'}],
    }),
    defineField({
      name: 'hiwComparison',
      title: 'Comparison',
      type: 'reference',
      to: [{type: 'hiwComparison'}],
    }),
    defineField({
      name: 'hiwFaq',
      title: 'FAQ',
      type: 'reference',
      to: [{type: 'hiwFaq'}],
    }),
    defineField({
      name: 'hiwCta',
      title: 'Closing CTA',
      type: 'reference',
      to: [{type: 'hiwCta'}],
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title ?? 'How It Works'}
    },
  },
})
