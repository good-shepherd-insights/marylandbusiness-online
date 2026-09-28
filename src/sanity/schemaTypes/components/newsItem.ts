import {defineField, defineType} from 'sanity'

/** One glanceable news row (census 13 §1). The colored tag tone is a
 * frontend literal map by row position — never stored (no colors in CMS). */
export const newsItem = defineType({
  name: 'newsItem',
  title: 'News Item',
  type: 'object',
  fields: [
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'string',
    }),
    defineField({
      name: 'place',
      title: 'Place Label',
      type: 'string',
    }),
    defineField({
      name: 'timeLabel',
      title: 'Time Label',
      type: 'string',
    }),
  ],
  preview: {
    select: {title: 'headline', sub: 'tag'},
    prepare({title, sub}) {
      return {title: title ?? 'News item', subtitle: sub}
    },
  },
})
