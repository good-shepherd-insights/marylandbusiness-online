import {defineField, defineType} from 'sanity'

/** Closed badge set: picker + API-write validation share the same values. */
export const BADGES = [
  {title: "Chef's Signature", value: 'chefsSignature'},
  {title: 'Gluten-Free', value: 'glutenFree'},
  {title: 'Seasonal', value: 'seasonal'},
]

/** One dish: name, numeric price, description, image, optional badge tone (design menu items). */
export const menuItem = defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      options: {list: BADGES},
      validation: (rule) =>
        rule.custom(
          (value) =>
            !value ||
            BADGES.some((b) => b.value === value) ||
            `Badge must be one of: ${BADGES.map((b) => b.value).join(', ')}`,
        ),
    }),
  ],
  preview: {
    select: {name: 'name', price: 'price', badge: 'badge'},
    prepare({name, price, badge}) {
      return {title: name, subtitle: price != null ? `$${price}` : undefined}
    },
  },
})