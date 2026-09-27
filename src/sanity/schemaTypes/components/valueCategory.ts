import {defineField, defineType} from 'sanity'

/** One "What You Get" category card (census 12 §3). Tile color and icon
 * rotate by index in the component — presentation, not data. */
export const valueCategory = defineType({
  name: 'valueCategory',
  title: 'Value Category',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'items',
      title: 'Included Items',
      type: 'array',
      of: [{type: 'string'}],
    }),
  ],
  preview: {
    select: {title: 'title', sub: 'description'},
    prepare({title, sub}) {
      return {title: title ?? 'Category', subtitle: sub}
    },
  },
})
