import {defineField, defineType} from 'sanity'

/** Promotion card: eyebrow, heading, note (e.g. code line), CTA; tone drives presentation color only (design coupon + gift card cards). */
export const promotion = defineType({
  name: 'promotion',
  title: 'Promotion',
  type: 'object',
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
      name: 'note',
      title: 'Note',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tone',
      title: 'Tone',
      type: 'string',
      options: {
        list: [
          {title: 'Coupon', value: 'coupon'},
          {title: 'Gift Card', value: 'giftCard'},
        ],
      },
      validation: (rule) =>
        rule.custom(
          (value) =>
            !value ||
            ['coupon', 'giftCard'].includes(value as string) ||
            'Tone must be one of: coupon, giftCard',
        ),
    }),
  ],
  preview: {
    select: {heading: 'heading', eyebrow: 'eyebrow', note: 'note'},
    prepare({heading, eyebrow, note}) {
      return {title: heading, subtitle: [eyebrow, note].filter(Boolean).join(' · ')}
    },
  },
})