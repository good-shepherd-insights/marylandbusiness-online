import {defineField, defineType} from 'sanity'

/**
 * Review — standalone content-entity document attributed back to its original
 * source via sourceUrl (href). Listing-owned: `listing.reviews[]` holds the
 * reference (user-stated 2026-09-26 model); no child-side listing field.
 */
export const review = defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Reviewer Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (rule) => rule.required().min(1).max(5).integer(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'verifiedVisit',
      title: 'Verified Visit',
      type: 'boolean',
    }),
    defineField({
      name: 'sourceName',
      title: 'Source Name',
      type: 'string',
      description: 'e.g. Google, Yelp',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Source URL',
      type: 'url',
      description: 'Attribution link back to the original review',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {name: 'name', rating: 'rating', title: 'title', sourceName: 'sourceName'},
    prepare({name, rating, title, sourceName}) {
      return {title: title ?? name ?? 'Review', subtitle: [name, rating ? `${rating}★` : '', sourceName].filter(Boolean).join(' · ')}
    },
  },
})