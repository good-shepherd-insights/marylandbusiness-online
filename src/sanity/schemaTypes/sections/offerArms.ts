import {defineField, defineType} from 'sanity'
import {offerArm} from '../components/offerArm'

/**
 * Offer arms section — "What We Offer" band: intro plus a grid of offer
 * arms, composed of offerArm components.
 */
export const offerArms = defineType({
  name: 'offerArms',
  title: 'Offer Arms',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'arms',
      title: 'Arms',
      type: 'array',
      of: [{type: 'offerArm'}],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {heading: 'heading', arms: 'arms'},
    prepare({heading, arms}) {
      const count = Array.isArray(arms) ? arms.length : 0
      return {title: heading ?? 'Offer Arms', subtitle: count ? `${count} arms` : ''}
    },
  },
})
