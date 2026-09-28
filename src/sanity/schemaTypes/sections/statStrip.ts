import {defineField, defineType} from 'sanity'
import {statItem} from '../components/statItem'

/**
 * Stat strip section — dark band of stat items (value + label), composed of
 * statItem components.
 */
export const statStrip = defineType({
  name: 'statStrip',
  title: 'Stat Strip',
  type: 'document',
  fields: [
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [{type: 'statItem'}],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {stats: 'stats'},
    prepare({stats}) {
      const first = Array.isArray(stats) ? stats[0] : undefined
      return {title: 'Stat Strip', subtitle: first?.value ?? ''}
    },
  },
})
