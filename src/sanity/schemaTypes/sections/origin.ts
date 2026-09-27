import {defineField, defineType} from 'sanity'

/**
 * Origin section — "Why We Exist" band: image, eyebrow, heading, variable
 * number of paragraphs.
 */
export const origin = defineType({
  name: 'origin',
  title: 'Origin',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'imageAlt',
      title: 'Image alt text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'paragraphs',
      title: 'Paragraphs',
      type: 'array',
      of: [{type: 'string'}],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {eyebrow: 'eyebrow', heading: 'heading'},
    prepare({eyebrow, heading}) {
      return {title: heading ?? 'Origin', subtitle: eyebrow ?? ''}
    },
  },
})
