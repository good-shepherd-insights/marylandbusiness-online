import {defineField, defineType} from 'sanity'

/** Glanceable news-wire section (census 13 §1). */
export const homeNews = defineType({
  name: 'homeNews',
  title: 'Home News Feed',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 2}),
    defineField({name: 'pulseLabel', title: 'Pulse Label', type: 'string'}),
    defineField({name: 'archiveLabel', title: 'Archive Link Label', type: 'string'}),
    defineField({name: 'archiveUrl', title: 'Archive Link URL', type: 'string'}),
    defineField({
      name: 'items',
      title: 'News Items',
      type: 'array',
      of: [{type: 'newsItem'}],
    }),
  ],
  preview: {
    select: {title: 'heading', sub: 'eyebrow'},
    prepare({title, sub}) {
      return {title: title ?? 'Home News Feed', subtitle: sub}
    },
  },
})
