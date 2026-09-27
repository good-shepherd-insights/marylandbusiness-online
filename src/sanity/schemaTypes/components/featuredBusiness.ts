import {defineField, defineType} from 'sanity'
import {rejectInvisibleChars} from '../validation/strings'

/**
 * Featured business card component — one Yelp-style business card inside the
 * featuredBusinesses section.
 */
export const featuredBusiness = defineType({
  name: 'featuredBusiness',
  title: 'Featured Business',
  type: 'object',
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
      name: 'badgeLabel',
      title: 'Badge label',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'Overlay badge on the image, e.g. "Verified"',
    }),
    defineField({
      name: 'badgeTone',
      title: 'Badge tone',
      type: 'string',
      options: {
        list: [
          {title: 'Verified (gold)', value: 'verified'},
          {title: 'Dark (inverted)', value: 'dark'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Business name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ratingStat',
      title: 'Rating stat line',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'As shown next to the stars, e.g. "4.8 • 124 Reviews"',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
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
    defineField({
      name: 'ctaIcon',
      title: 'Secondary action icon',
      type: 'string',
      validation: (rule) => rule.required().custom(rejectInvisibleChars),
      description: 'Iconify icon name (tabler set, e.g. tabler:phone)',
    }),
  ],
  preview: {
    select: {title: 'title', rating: 'ratingStat', category: 'category'},
    prepare({title, rating, category}) {
      return {title: title ?? '', subtitle: rating ? `${category ?? ''} — ${rating}` : category ?? ''}
    },
  },
})
