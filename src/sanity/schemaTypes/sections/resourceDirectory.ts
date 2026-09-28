import {defineField, defineType} from 'sanity'

/** Full Resource Directory — toolbar, filter rail, compliance calendar,
 * resource card grid. */
export const resourceDirectory = defineType({
  name: 'resourceDirectory',
  title: 'Resource Directory',
  type: 'document',
  fields: [
    defineField({name: 'heading', title: 'Heading', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'countLabel', title: 'Count Label', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'searchPlaceholder', title: 'Toolbar Search Placeholder', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'jurisdictionOptions',
      title: 'Jurisdiction Filter Options',
      type: 'array',
      of: [{type: 'string'}],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'typeOptions',
      title: 'Resource Type Options',
      type: 'array',
      of: [{type: 'string'}],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'railTypeOptions',
      title: 'Rail Resource Type Options',
      type: 'array',
      of: [{type: 'string'}],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'sortOptions',
      title: 'Sort Options',
      type: 'array',
      of: [{type: 'string'}],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({name: 'resetLabel', title: 'Reset Label', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'categoryHeading', title: 'Category Rail Heading', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'string'}],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({name: 'typeHeading', title: 'Type Rail Heading', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'calendarHeading', title: 'Calendar Heading', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'deadlines',
      title: 'Upcoming Deadlines',
      type: 'array',
      of: [{type: 'deadlineEntry'}],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({name: 'cardLinkLabel', title: 'Card Link Label', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'cards',
      title: 'Resource Cards',
      type: 'array',
      of: [{type: 'resourceCard'}],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({name: 'loadMoreLabel', title: 'Load More Label', type: 'string', validation: (rule) => rule.required()}),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {title: title ?? 'Resource Directory'}
    },
  },
})
