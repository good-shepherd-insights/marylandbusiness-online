import {defineField, defineType} from 'sanity'

/** Amenity row: icon + label (design amenities list). */
export const amenity = defineType({
  name: 'amenity',
  title: 'Amenity',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {label: 'label', icon: 'icon'},
    prepare({label, icon}) {
      return {title: label, subtitle: icon}
    },
  },
})