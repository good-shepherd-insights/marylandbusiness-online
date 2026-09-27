import {defineField, defineType} from 'sanity'

/**
 * Editorial story — standalone content-entity document. Attributed cards on
 * listings ("In the Spotlight") and future full editorial pages both pull
 * from this doc. Listing-owned via `listing.stories[]` (user-stated
 * 2026-09-26 model).
 */
export const editorialStory = defineType({
  name: 'editorialStory',
  title: 'Editorial Story',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
      options: {
        list: [
          {title: 'Feature', value: 'feature'},
          {title: 'Sustainability', value: 'sustainability'},
        ],
      },
      validation: (rule) =>
        rule
          .required()
          .custom(
            (value) =>
              ['feature', 'sustainability'].includes(value as string) ||
              'Tag must be one of: feature, sustainability',
          ),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Card CTA Label',
      type: 'string',
      description: 'e.g. "Read Full Editorial"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
  preview: {
    select: {title: 'title', tag: 'tag', date: 'date'},
    prepare({title, tag, date}) {
      return {title: title ?? 'Editorial Story', subtitle: [tag, date].filter(Boolean).join(' · ')}
    },
  },
})