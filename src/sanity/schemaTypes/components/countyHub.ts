import {defineField, defineType} from 'sanity'

/**
 * County hub component — one county card inside the countyHubs section.
 */
export const countyHub = defineType({
  name: 'countyHub',
  title: 'County Hub',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'businesses',
      title: 'Businesses',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'Active-business stat as shown, e.g. "2.4k Active"',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
      description: 'Hub page URL; card renders without a link when empty',
    }),
  ],
  preview: {
    select: {name: 'name', businesses: 'businesses', icon: 'icon'},
    prepare({name, businesses, icon}) {
      return {title: name ?? '', subtitle: businesses ?? '', subtitle2: icon}
    },
  },
})