import {defineField, defineType} from 'sanity'

/** Featured Programs strip — flagship state program cards. */
export const featuredPrograms = defineType({
  name: 'featuredPrograms',
  title: 'Featured Programs',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'heading', title: 'Heading', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'cardLinkLabel', title: 'Card Link Label', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'programs',
      title: 'Programs',
      type: 'array',
      of: [{type: 'flagshipProgram'}],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {title: title ?? 'Featured Programs'}
    },
  },
})
