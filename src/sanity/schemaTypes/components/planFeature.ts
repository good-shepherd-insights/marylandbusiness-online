import {defineField, defineType} from 'sanity'

/** One feature line on a pricing plan card (census 12 §5). */
export const planFeature = defineType({
  name: 'planFeature',
  title: 'Plan Feature',
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
      name: 'placeholder',
      title: 'Placeholder (stub)',
      type: 'boolean',
      description: 'Design-marked stub rows render muted with a plus icon instead of a check',
      initialValue: false,
    }),
  ],
  preview: {
    select: {title: 'title', sub: 'description'},
    prepare({title, sub}) {
      return {title: title ?? 'Feature', subtitle: sub}
    },
  },
})
