import {defineField, defineType} from 'sanity'

/** Closing CTA band (census 12 §8): dark full-width band, heading + two
 * CTAs. */
export const hiwCta = defineType({
  name: 'hiwCta',
  title: 'HIW Closing CTA',
  type: 'document',
  fields: [
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'ctaPrimaryLabel', title: 'Primary CTA Label', type: 'string'}),
    defineField({name: 'ctaSecondaryLabel', title: 'Secondary CTA Label', type: 'string'}),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {title: title ?? 'HIW Closing CTA'}
    },
  },
})
