import {defineField, defineType} from 'sanity'

/**
 * Editorial section document — MD-Made Stories band: portrait image with
 * quote overlay, heading block, story rows, CTA. Referenced by page
 * documents (currently home). Stories are references to standalone
 * editorialStory documents.
 */
export const editorial = defineType({
  name: 'editorial',
  title: 'Editorial',
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
      name: 'quote',
      title: 'Overlay quote',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'attributionName',
      title: 'Attribution name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'attributionBusiness',
      title: 'Attribution business',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'stories',
      title: 'Stories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'editorialStory'}]}],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA link',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {eyebrow: 'eyebrow', heading: 'heading', stories: 'stories'},
    prepare({eyebrow, heading, stories}) {
      const count = Array.isArray(stories) ? stories.length : 0
      return {title: heading ?? eyebrow ?? 'Editorial', subtitle: count ? `${count} stories` : ''}
    },
  },
})
