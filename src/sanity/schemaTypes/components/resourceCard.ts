import {defineField, defineType} from 'sanity'

/** Resource card — one entry in the Full Resource Directory grid. */
export const resourceCard = defineType({
  name: 'resourceCard',
  title: 'Resource Card',
  type: 'object',
  fields: [
    defineField({name: 'icon', title: 'Icon (tabler name)', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'iconTint',
      title: 'Icon Tint',
      type: 'string',
      options: {list: [
        {title: 'Primary', value: 'primary'},
        {title: 'Secondary', value: 'secondary'},
      ]},
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'typeBadge', title: 'Type Badge', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'badgeTint',
      title: 'Badge Tint',
      type: 'string',
      options: {list: [
        {title: 'Primary', value: 'primary'},
        {title: 'Secondary', value: 'secondary'},
        {title: 'Dark', value: 'dark'},
      ]},
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'jurisdiction', title: 'Jurisdiction', type: 'string', validation: (rule) => rule.required()}),
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
    defineField({name: 'category', title: 'Category', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 2, validation: (rule) => rule.required()}),
    defineField({name: 'url', title: 'Resource URL', type: 'url', validation: (rule) => rule.required()}),
  ],
  preview: {
    select: {title: 'title', badge: 'typeBadge', jurisdiction: 'jurisdiction'},
    prepare({title, badge, jurisdiction}) {
      return {title: title ?? 'Resource Card', subtitle: [badge, jurisdiction].filter(Boolean).join(' · ')}
    },
  },
})
