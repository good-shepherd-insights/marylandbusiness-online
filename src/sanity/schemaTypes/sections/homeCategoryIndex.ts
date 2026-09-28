import {defineField, defineType} from 'sanity'

/** Category sitemap section (census 13 §3). The grid is NOT stored here —
 * it is computed from the live category -> subcategory tree at query time
 * (getCategoryTree), so it grows automatically as sectors are added. */
export const homeCategoryIndex = defineType({
  name: 'homeCategoryIndex',
  title: 'Home Category Index',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 2}),
  ],
  preview: {
    select: {title: 'heading', sub: 'eyebrow'},
    prepare({title, sub}) {
      return {title: title ?? 'Home Category Index', subtitle: sub}
    },
  },
})
