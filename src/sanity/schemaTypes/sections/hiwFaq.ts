import {defineField, defineType} from 'sanity'

/** FAQ accordion section (census 12 §7). */
export const hiwFaq = defineType({
  name: 'hiwFaq',
  title: 'HIW FAQ',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'items', title: 'Items', type: 'array', of: [{type: 'faqItem'}]}),
  ],
  preview: {
    select: {title: 'heading', sub: 'eyebrow'},
    prepare({title, sub}) {
      return {title: title ?? 'HIW FAQ', subtitle: sub}
    },
  },
})
