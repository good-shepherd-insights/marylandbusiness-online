import {defineField, defineType} from 'sanity'

/** How-It-Works page header (census 12 §1): breadcrumb, badge, h1, intro,
 * dual CTA, proof line. Icons are code literals. */
export const hiwHeader = defineType({
  name: 'hiwHeader',
  title: 'HIW Header',
  type: 'document',
  fields: [
    defineField({name: 'breadcrumbRoot', title: 'Breadcrumb Root', type: 'string'}),
    defineField({name: 'badge', title: 'Badge', type: 'string', description: 'e.g. "From Application to Verified Listing"'}),
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'intro', title: 'Intro', type: 'text', rows: 4}),
    defineField({name: 'ctaPrimaryLabel', title: 'Primary CTA Label', type: 'string'}),
    defineField({name: 'ctaSecondaryLabel', title: 'Secondary CTA Label', type: 'string'}),
    defineField({name: 'proofLine', title: 'Proof Line', type: 'string'}),
  ],
  preview: {
    select: {title: 'heading', sub: 'badge'},
    prepare({title, sub}) {
      return {title: title ?? 'HIW Header', subtitle: sub}
    },
  },
})
