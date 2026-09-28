import {defineField, defineType} from 'sanity'
import {rejectInvisibleChars} from '../validation/strings'

/**
 * Offer arm component — one of the directory's three connected arms inside
 * the offerArms section. Icon tint cycles by position (CSS), never data.
 */
export const offerArm = defineType({
  name: 'offerArm',
  title: 'Offer Arm',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      validation: (rule) => rule.required().custom(rejectInvisibleChars),
      description: 'Iconify icon name (tabler set, e.g. tabler:building-store)',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA link',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'title', cta: 'ctaLabel'},
    prepare({title, cta}) {
      return {title: title ?? '', subtitle: cta ?? ''}
    },
  },
})
