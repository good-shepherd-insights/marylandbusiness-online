import {defineField, defineType} from 'sanity'

/** "Why It Matters" contrast section (census 12 §4): problem vs solution
 * panels + 3 proof stats. */
export const hiwWhy = defineType({
  name: 'hiwWhy',
  title: 'HIW Why',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'problemLabel', title: 'Problem Panel Label', type: 'string'}),
    defineField({name: 'problemItems', title: 'Problem Items', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'solutionLabel', title: 'Solution Panel Label', type: 'string'}),
    defineField({name: 'solutionItems', title: 'Solution Items', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'stats', title: 'Proof Stats', type: 'array', of: [{type: 'statItem'}]}),
  ],
  preview: {
    select: {title: 'heading', sub: 'eyebrow'},
    prepare({title, sub}) {
      return {title: title ?? 'HIW Why', subtitle: sub}
    },
  },
})
