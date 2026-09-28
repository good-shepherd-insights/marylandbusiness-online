import {defineField, defineType} from 'sanity'

/**
 * Hero heading segment — one styled segment of the hero heading.
 * Heading = ordered array of these; component owns inter-segment spacing.
 */
export const heroHeadingSegment = defineType({
  name: 'heroHeadingSegment',
  title: 'Heading segment',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          {title: 'Plain', value: 'plain'},
          {title: 'Accent', value: 'accent'},
          {title: 'Highlight (block behind text)', value: 'highlight'},
        ],
        layout: 'radio',
      },
      initialValue: 'plain',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'text', subtitle: 'style'},
  },
})