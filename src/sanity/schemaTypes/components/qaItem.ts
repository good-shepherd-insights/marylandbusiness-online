import {defineField, defineType} from 'sanity'

/** Question + answer pair (design Q&A block). */
export const qaItem = defineType({
  name: 'qaItem',
  title: 'Q&A Item',
  type: 'object',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {question: 'question'},
    prepare({question}) {
      return {title: question}
    },
  },
})