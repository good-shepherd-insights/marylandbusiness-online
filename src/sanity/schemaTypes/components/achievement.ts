import {defineField, defineType} from 'sanity'

/** Verified achievement card: icon + label + supporting line (design "Maryland Verified Achievements"). */
export const achievement = defineType({
  name: 'achievement',
  title: 'Achievement',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subLabel',
      title: 'Sub Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {label: 'label', subLabel: 'subLabel'},
    prepare({label, subLabel}) {
      return {title: label, subtitle: subLabel}
    },
  },
})