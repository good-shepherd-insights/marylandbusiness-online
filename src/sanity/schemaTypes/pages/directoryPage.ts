import {defineField, defineType} from 'sanity'

/**
 * Directory page document — singleton under Pages: the county-hub view
 * (design 10, "Directory"). Pages hold references only; content lives in
 * the referenced section documents. County name, cities and business rows
 * are entity/computed data resolved by the route.
 */
export const directoryPage = defineType({
  name: 'directoryPage',
  title: 'Directory',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'hubHeader',
      title: 'Hub Header',
      type: 'reference',
      to: [{type: 'hubHeader'}],
    }),
    defineField({
      name: 'hubDiscovery',
      title: 'Hub Discovery',
      type: 'reference',
      to: [{type: 'hubDiscovery'}],
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title ?? 'Directory'}
    },
  },
})
