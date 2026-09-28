import {defineField, defineType} from 'sanity'

/**
 * Stat item component — one number + label pair inside the statStrip
 * section.
 */
export const statItem = defineType({
  name: 'statItem',
  title: 'Stat Item',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'As shown, e.g. "25,000+"',
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {value: 'value', label: 'label'},
    prepare({value, label}) {
      return {title: value ?? '', subtitle: label ?? ''}
    },
  },
})
