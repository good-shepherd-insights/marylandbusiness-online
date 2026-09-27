import {defineField, defineType} from 'sanity'

/**
 * Resources page document — singleton under Pages. Holds one `reference`
 * field per section; field order = render order. Zero content of its own.
 */
export const resources = defineType({
  name: 'resources',
  title: 'Resources',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'reference',
      to: [{type: 'resourcesIntro'}],
    }),
    defineField({
      name: 'regulatoryUpdates',
      title: 'Regulatory Updates',
      type: 'reference',
      to: [{type: 'regulatoryUpdates'}],
    }),
    defineField({
      name: 'featuredPrograms',
      title: 'Featured Programs',
      type: 'reference',
      to: [{type: 'featuredPrograms'}],
    }),
    defineField({
      name: 'countyJump',
      title: 'County Jump',
      type: 'reference',
      to: [{type: 'countyJump'}],
    }),
    defineField({
      name: 'resourceDirectory',
      title: 'Resource Directory',
      type: 'reference',
      to: [{type: 'resourceDirectory'}],
    }),
    defineField({
      name: 'alertSignup',
      title: 'Alert Signup',
      type: 'reference',
      to: [{type: 'alertSignup'}],
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title ?? 'Resources'}
    },
  },
})
