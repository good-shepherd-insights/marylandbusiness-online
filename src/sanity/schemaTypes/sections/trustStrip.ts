import {defineField, defineType} from 'sanity'
import {trustSignal} from '../components/trustSignal'

/**
 * Trust strip section document — centered row of trust signals (icon +
 * label), composed of trustSignal components. Referenced by page documents
 * (currently home).
 */
export const trustStrip = defineType({
  name: 'trustStrip',
  title: 'Trust Strip',
  type: 'document',
  fields: [
    defineField({
      name: 'signals',
      title: 'Signals',
      type: 'array',
      of: [{type: 'trustSignal'}],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {signals: 'signals'},
    prepare({signals}) {
      const first = Array.isArray(signals) ? signals[0] : undefined
      return {title: 'Trust Strip', subtitle: first?.label ?? ''}
    },
  },
})