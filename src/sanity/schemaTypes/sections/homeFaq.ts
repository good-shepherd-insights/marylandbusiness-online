import {defineField, defineType} from 'sanity'

/** Home FAQ accordion section (census 13 §5). Reuses the shared faqItem
 * object from census 12 — data is only question + answer. */
export const homeFaq = defineType({
  name: 'homeFaq',
  title: 'Home FAQ',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 2}),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{type: 'faqItem'}],
    }),
  ],
  preview: {
    select: {title: 'heading', sub: 'eyebrow'},
    prepare({title, sub}) {
      return {title: title ?? 'Home FAQ', subtitle: sub}
    },
  },
})
