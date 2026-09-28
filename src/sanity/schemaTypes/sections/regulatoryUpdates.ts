import {defineField, defineType} from 'sanity'

/** Regulatory & Policy Updates feed — jurisdiction-filtered update list. */
export const regulatoryUpdates = defineType({
  name: 'regulatoryUpdates',
  title: 'Regulatory Updates',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'heading', title: 'Heading', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'archiveLabel', title: 'Archive Link Label', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'archiveUrl', title: 'Archive Link URL', type: 'url', validation: (rule) => rule.required()}),
    defineField({
      name: 'filterLabels',
      title: 'Jurisdiction Filter Labels',
      type: 'array',
      of: [{type: 'string'}],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({name: 'dateCaption', title: 'Date Caption', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'cardLinkLabel', title: 'Card Link Label', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'updates',
      title: 'Updates',
      type: 'array',
      of: [{type: 'regulatoryUpdate'}],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {title: title ?? 'Regulatory Updates'}
    },
  },
})
