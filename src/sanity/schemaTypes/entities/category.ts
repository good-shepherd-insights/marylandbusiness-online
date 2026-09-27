import {defineField, defineType} from 'sanity'

/** Business category — referenceable so breadcrumbs, similar-listing filters and hub pages link to it. */
export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {name: 'name', description: 'description'},
    prepare({name, description}) {
      return {title: name ?? 'Category', subtitle: description ?? ''}
    },
  },
})