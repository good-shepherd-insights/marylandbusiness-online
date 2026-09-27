import {defineField, defineType} from 'sanity'

/** Compliance calendar deadline — one row in the Upcoming Deadlines widget. */
export const deadlineEntry = defineType({
  name: 'deadlineEntry',
  title: 'Deadline Entry',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'org', title: 'Organization', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'dateLabel', title: 'Date Label', type: 'string', validation: (rule) => rule.required()}),
  ],
  preview: {
    select: {title: 'title', date: 'dateLabel'},
    prepare({title, date}) {
      return {title: title ?? 'Deadline', subtitle: date}
    },
  },
})
