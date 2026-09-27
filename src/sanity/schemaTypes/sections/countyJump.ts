import {defineField, defineType} from 'sanity'

/** County/City quick-jump strip — chips come from live gate county hubs,
 * never from CMS copy. */
export const countyJump = defineType({
  name: 'countyJump',
  title: 'County Jump',
  type: 'document',
  fields: [
    defineField({name: 'heading', title: 'Heading', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'viewAllLabel', title: 'View All Label', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'viewAllUrl', title: 'View All URL', type: 'url', validation: (rule) => rule.required()}),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {title: title ?? 'County Jump'}
    },
  },
})
