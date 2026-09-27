import {defineField, defineType} from 'sanity'

/** Regulatory update row — one entry in the Regulatory & Policy Updates feed. */
export const regulatoryUpdate = defineType({
  name: 'regulatoryUpdate',
  title: 'Regulatory Update',
  type: 'object',
  fields: [
    defineField({name: 'effectiveDateText', title: 'Effective Date', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'jurisdictionKind',
      title: 'Jurisdiction Kind',
      type: 'string',
      options: {list: [
        {title: 'State', value: 'state'},
        {title: 'County', value: 'county'},
        {title: 'City', value: 'city'},
      ]},
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'jurisdictionLabel', title: 'Jurisdiction Label', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'typeLabel', title: 'Type Label', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 3, validation: (rule) => rule.required()}),
    defineField({name: 'url', title: 'Official Notice URL', type: 'url', validation: (rule) => rule.required()}),
  ],
  preview: {
    select: {title: 'title', date: 'effectiveDateText', kind: 'jurisdictionKind'},
    prepare({title, date, kind}) {
      return {title: title ?? 'Regulatory Update', subtitle: [date, kind].filter(Boolean).join(' · ')}
    },
  },
})
