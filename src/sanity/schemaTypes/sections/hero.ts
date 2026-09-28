import {defineField, defineType} from 'sanity'
import {rejectInvisibleChars} from '../validation/strings'
import {heroHeadingSegment} from '../components/heroHeadingSegment'
import {heroImage} from '../components/heroImage'
import {heroSelectOption} from '../components/heroSelectOption'

/**
 * Hero section — standalone section document, composed of Hero components.
 * Referenced by page documents (currently home); one section doc can be
 * referenced by any number of pages.
 */
export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge',
      description: 'Small trust badge above the heading',
      type: 'object',
      fields: [
        defineField({
          name: 'icon',
          title: 'Icon',
          type: 'string',
          description: 'Iconify icon name (tabler set, e.g. tabler:star)',
          validation: (rule) => rule.custom(rejectInvisibleChars),
        }),
        defineField({
          name: 'text',
          title: 'Text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'array',
      of: [{type: 'heroHeadingSegment'}],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    }),
    defineField({
      name: 'images',
      title: 'Background images (carousel)',
      type: 'array',
      of: [{type: 'heroImage'}],
      description: 'Shown as an auto-advancing background carousel. Order = slide order.',
    }),
    defineField({
      name: 'countyLabel',
      title: 'County select label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'counties',
      title: 'County options',
      type: 'array',
      of: [{type: 'heroSelectOption'}],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'categoryLabel',
      title: 'Category label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Category options',
      type: 'array',
      of: [{type: 'heroSelectOption'}],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'searchButtonLabel',
      title: 'Search button label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {heading: 'heading'},
    prepare({heading}) {
      const first = Array.isArray(heading) ? heading[0] : undefined
      return {title: 'Hero', subtitle: first?.text ?? ''}
    },
  },
})