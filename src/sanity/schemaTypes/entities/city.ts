import {defineField, defineType} from 'sanity'

/** City — the second level of the geographic hierarchy. Referenced by
 * listing; `/[county]/[city]` paths resolve against it. */
export const city = defineType({
  name: 'city',
  title: 'City',
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
      description: 'Unique intro copy — required for the city path to exist.',
    }),
  ],
  preview: {
    select: {name: 'name', description: 'description'},
    prepare({name, description}) {
      return {title: name ?? 'City', subtitle: description ?? ''}
    },
  },
})