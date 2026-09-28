import {defineField, defineType} from 'sanity'

/** Verification / ranking methodology section (census 13 §4). */
export const homeMethodology = defineType({
  name: 'homeMethodology',
  title: 'Home Methodology',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 2}),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [{type: 'methodStep'}],
    }),
  ],
  preview: {
    select: {title: 'heading', sub: 'eyebrow'},
    prepare({title, sub}) {
      return {title: title ?? 'Home Methodology', subtitle: sub}
    },
  },
})
