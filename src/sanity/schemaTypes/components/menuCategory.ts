import {defineField, defineType} from 'sanity'

/** Menu category with tab label and its dishes (design menu tabs). */
export const menuCategory = defineType({
  name: 'menuCategory',
  title: 'Menu Category',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{type: 'menuItem'}],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {label: 'label', items: 'items'},
    prepare({label, items}) {
      const count = Array.isArray(items) ? items.length : 0
      return {title: label, subtitle: `${count} item${count === 1 ? '' : 's'}`}
    },
  },
})