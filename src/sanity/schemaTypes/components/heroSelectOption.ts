import {defineField, defineType} from 'sanity'

/**
 * Hero select option — one option of a hero select (county/category).
 */
export const heroSelectOption = defineType({
  name: 'heroSelectOption',
  title: 'Option',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'label'},
  },
})