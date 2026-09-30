import {defineField, defineType} from 'sanity'

/** One persona pathway card (census 13 §2). Icon + tint render from the card
 * position in the component — never stored (icon doctrine V-18). Link hrefs
 * reuse the shared navLink object. */
export const pathwayCard = defineType({
  name: 'pathwayCard',
  title: 'Pathway Card',
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
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{type: 'navLink'}],
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
      description: 'Optional banner photo above the card content (variation 6A); card renders without it when empty',
    }),
    defineField({
      name: 'imageAlt',
      title: 'Photo alt text',
      type: 'string',
      description: 'Describe the photo for screen readers',
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title ?? 'Pathway'}
    },
  },
})
