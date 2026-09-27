import {defineField, defineType} from 'sanity'

/** "What You Get" section (census 12 §3). Tile colors/icons rotate by
 * category index in the component. */
export const hiwValue = defineType({
  name: 'hiwValue',
  title: 'HIW Value',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'sub', title: 'Subheading', type: 'text', rows: 3}),
    defineField({name: 'categories', title: 'Categories', type: 'array', of: [{type: 'valueCategory'}]}),
  ],
  preview: {
    select: {title: 'heading', sub: 'eyebrow'},
    prepare({title, sub}) {
      return {title: title ?? 'HIW Value', subtitle: sub}
    },
  },
})
