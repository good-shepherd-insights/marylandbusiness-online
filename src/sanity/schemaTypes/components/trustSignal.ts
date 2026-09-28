import {defineField, defineType} from 'sanity'
import {rejectInvisibleChars} from '../validation/strings'

/**
 * Trust signal component — one icon + label pair, reused inside the
 * trustStrip section.
 */
export const trustSignal = defineType({
  name: 'trustSignal',
  title: 'Trust Signal',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      validation: (rule) => rule.required().custom(rejectInvisibleChars),
      description: 'Iconify icon name (tabler set, e.g. tabler:certificate)',
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {icon: 'icon', label: 'label'},
    prepare({icon, label}) {
      return {title: label ?? '', subtitle: icon ?? ''}
    },
  },
})