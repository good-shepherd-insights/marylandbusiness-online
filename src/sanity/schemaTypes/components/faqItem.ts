import {defineField, defineType} from 'sanity'

/** One FAQ accordion item (census 12 §7). Accordion behavior lives in the
 * component script — the data is only question + answer. */
export const faqItem = defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'object',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {title: 'question'},
    prepare({title}) {
      return {title: title ?? 'Question'}
    },
  },
})
