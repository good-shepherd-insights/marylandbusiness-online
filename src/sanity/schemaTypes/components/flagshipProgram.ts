import {defineField, defineType} from 'sanity'

/** Flagship program card — one card in the Featured Programs strip. */
export const flagshipProgram = defineType({
  name: 'flagshipProgram',
  title: 'Flagship Program',
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
        {title: 'Dark', value: 'dark'},
      ]},
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 3, validation: (rule) => rule.required()}),
    defineField({name: 'url', title: 'Program URL', type: 'url', validation: (rule) => rule.required()}),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
      description: 'Optional photo shown above the card with the content overlapping it (variation 3D); card renders without it when empty',
    }),
    defineField({
      name: 'imageAlt',
      title: 'Photo alt text',
      type: 'string',
      description: 'Describe the photo for screen readers',
    }),
  ],
  preview: {
    select: {title: 'title', icon: 'icon'},
    prepare({title, icon}) {
      return {title: title ?? 'Flagship Program', subtitle: icon}
    },
  },
})
