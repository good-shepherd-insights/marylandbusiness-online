import {defineField, defineType} from 'sanity'

/** Resources intro band — breadcrumb, H1, intro copy, indexed counter, search. */
export const resourcesIntro = defineType({
  name: 'resourcesIntro',
  title: 'Resources Intro',
  type: 'document',
  fields: [
    defineField({name: 'breadcrumbRoot', title: 'Breadcrumb Root', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'introText', title: 'Intro Text', type: 'text', rows: 3, validation: (rule) => rule.required()}),
    defineField({name: 'indexedLabel', title: 'Indexed Counter Label', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'searchPlaceholder', title: 'Search Placeholder', type: 'string', validation: (rule) => rule.required()}),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title ?? 'Resources Intro'}
    },
  },
})
