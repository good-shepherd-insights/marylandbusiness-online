import {defineField, defineType} from 'sanity'

/**
 * About page document — assembles page-level sections by reference. Sections
 * are standalone documents (see ../sections/); order on the page follows the
 * field order here.
 */
export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'header',
      title: 'Header',
      type: 'reference',
      to: [{type: 'aboutHeader'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'statStrip',
      title: 'Stat Strip',
      type: 'reference',
      to: [{type: 'statStrip'}],
    }),
    defineField({
      name: 'origin',
      title: 'Origin',
      type: 'reference',
      to: [{type: 'origin'}],
    }),
    defineField({
      name: 'missionBand',
      title: 'Mission Band',
      type: 'reference',
      to: [{type: 'missionBand'}],
    }),
    defineField({
      name: 'visionPillars',
      title: 'Vision Pillars',
      type: 'reference',
      to: [{type: 'visionPillars'}],
    }),
    defineField({
      name: 'offerArms',
      title: 'Offer Arms',
      type: 'reference',
      to: [{type: 'offerArms'}],
    }),
    defineField({
      name: 'partnerships',
      title: 'Partnerships',
      type: 'reference',
      to: [{type: 'partnerships'}],
    }),
    defineField({
      name: 'closingCta',
      title: 'Closing CTA',
      type: 'reference',
      to: [{type: 'closingCta'}],
    }),
  ],
  preview: {
    select: {heading: 'header->heading'},
    prepare({heading}) {
      return {title: 'About', subtitle: typeof heading === 'string' ? heading.split(' ').slice(0, 5).join(' ') : ''}
    },
  },
})
