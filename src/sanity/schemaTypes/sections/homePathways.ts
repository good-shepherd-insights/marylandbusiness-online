import {defineField, defineType} from 'sanity'

/** Persona pathway nav section (census 13 §2). */
export const homePathways = defineType({
  name: 'homePathways',
  title: 'Home Pathways',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 2}),
    defineField({
      name: 'cards',
      title: 'Pathway Cards',
      type: 'array',
      of: [{type: 'pathwayCard'}],
    }),
  ],
  preview: {
    select: {title: 'heading', sub: 'eyebrow'},
    prepare({title, sub}) {
      return {title: title ?? 'Home Pathways', subtitle: sub}
    },
  },
})
