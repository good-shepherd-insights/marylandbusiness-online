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
      description: 'Optional active-business stat, e.g. "2.4k Active". Leave empty when no verified count exists.',
    }),
    defineField({
      name: 'image',
      title: 'County photo',
      type: 'image',
      options: {hotspot: true},
      description: 'Full-bleed photo shown on the hub card; hotspot controls the crop focus',
    }),
    defineField({
      name: 'imageAlt',
      title: 'Photo alt text',
      type: 'string',
      description: 'Describe the photo for screen readers, e.g. "Baltimore Inner Harbor at dusk"',
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