import {defineField, defineType} from 'sanity'

/** Street address block for a listing (design buy box: street / city / state / postal). */
export const listingAddress = defineType({
  name: 'listingAddress',
  title: 'Address',
  type: 'object',
  fields: [
    defineField({
      name: 'street',
      title: 'Street',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'postalCode',
      title: 'Postal Code',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {street: 'street', city: 'city', region: 'region'},
    prepare({street, city, region}) {
      return {title: street, subtitle: [city, region].filter(Boolean).join(', ')}
    },
  },
})