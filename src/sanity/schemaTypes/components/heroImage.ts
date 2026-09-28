import {defineField, defineType} from 'sanity'

/**
 * Hero image — one background carousel image with required alt text.
 */
export const heroImage = defineType({
  name: 'heroImage',
  title: 'Hero image',
  type: 'image',
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})