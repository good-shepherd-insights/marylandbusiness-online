import {defineField, defineType} from 'sanity'

/**
 * Blog page document — singleton under Pages (the blog index). Skeleton now;
 * fields are added once the Blog design's real schema is mapped. Individual
 * posts are separate `blogPost` documents (hidden from the sidebar).
 */
export const blogPage = defineType({
  name: 'blogPage',
  title: 'Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title ?? 'Blog'}
    },
  },
})
