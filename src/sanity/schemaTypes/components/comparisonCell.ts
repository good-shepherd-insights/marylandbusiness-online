import {defineField, defineType} from 'sanity'

/** One comparison-table cell (census 12 §6). kind "check" renders the
 * included icon (frontend literal); kind "text" renders the text muted —
 * the design's .placeholder-cell treatment. */
export const comparisonCell = defineType({
  name: 'comparisonCell',
  title: 'Comparison Cell',
  type: 'object',
  fields: [
    defineField({
      name: 'kind',
      title: 'Kind',
      type: 'string',
      options: {list: ['check', 'text']},
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      description: 'Only for kind "text"',
    }),
  ],
  preview: {
    select: {kind: 'kind', text: 'text'},
    prepare({kind, text}) {
      return {title: kind === 'check' ? '✓ included' : (text ?? '(empty)')}
    },
  },
})
