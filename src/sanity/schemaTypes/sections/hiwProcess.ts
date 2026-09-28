import {defineField, defineType} from 'sanity'

/** Process timeline section (census 12 §2). Icons per step are code. */
export const hiwProcess = defineType({
  name: 'hiwProcess',
  title: 'HIW Process',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'sub', title: 'Subheading', type: 'text', rows: 3}),
    defineField({name: 'steps', title: 'Steps', type: 'array', of: [{type: 'processStep'}]}),
  ],
  preview: {
    select: {title: 'heading', sub: 'eyebrow'},
    prepare({title, sub}) {
      return {title: title ?? 'HIW Process', subtitle: sub}
    },
  },
})
