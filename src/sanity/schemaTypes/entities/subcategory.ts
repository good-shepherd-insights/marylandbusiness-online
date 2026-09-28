import {defineField, defineType} from 'sanity'

/**
 * Subcategory — its own entity (user-stated 2026-09-26), not a variant of
 * category. Seafood under Restaurant, e.g. Listings reference their
 * subcategory; the parent supplies the first URL segment (TAGS.md type
 * axis: /restaurant/seafood).
 */
export const subcategory = defineType({
  name: 'subcategory',
  title: 'Subcategory',
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
    defineField({
      name: 'parent',
      title: 'Parent Category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (rule) => rule.required(),
    }),
    // Path-gate combos managed at the subcategory level (user-stated
    // 2026-09-26 model): typed references replace the standalone pathRule
    // string keys; the path is derived from the referenced slugs at read.
    defineField({
      name: 'combos',
      title: 'Path Combos',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'combo',
          title: 'Combo',
          fields: [
            defineField({
              name: 'county',
              title: 'County',
              type: 'reference',
              to: [{type: 'county'}],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'city',
              title: 'City (optional — omit for county-level combo)',
              type: 'reference',
              to: [{type: 'city'}],
            }),
            defineField({
              name: 'mode',
              title: 'Mode',
              type: 'string',
              options: {
                list: [
                  {title: 'Include — force path on', value: 'include'},
                  {title: 'Exclude — force path off', value: 'exclude'},
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'intro',
              title: 'Intro (unique combo copy)',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'note',
              title: 'Audit Note',
              type: 'string',
              description: 'Why this combo was forced on/off, and by whom',
            }),
          ],
          preview: {
            select: {county: 'county->name', city: 'city->name', mode: 'mode'},
            prepare({county, city, mode}) {
              return {title: [county, city].filter(Boolean).join(' › '), subtitle: mode}
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {name: 'name', description: 'description', parent: 'parent->name'},
    prepare({name, description, parent}) {
      return {title: name ?? 'Subcategory', subtitle: [parent, description].filter(Boolean).join(' — ')}
    },
  },
})
