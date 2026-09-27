import {defineField, defineType} from 'sanity'

/** Alert signup band — dark newsletter/alert call-to-action. */
export const alertSignup = defineType({
  name: 'alertSignup',
  title: 'Alert Signup',
  type: 'document',
  fields: [
    defineField({name: 'icon', title: 'Icon (tabler name)', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'heading', title: 'Heading', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 2, validation: (rule) => rule.required()}),
    defineField({name: 'emailPlaceholder', title: 'Email Placeholder', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'buttonLabel', title: 'Button Label', type: 'string', validation: (rule) => rule.required()}),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {title: title ?? 'Alert Signup'}
    },
  },
})
