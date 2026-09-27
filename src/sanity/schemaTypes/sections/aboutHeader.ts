import {defineField, defineType} from 'sanity'

/**
 * About header section — breadcrumb, badge, page title, intro paragraph.
 */
export const aboutHeader = defineType({
  name: 'aboutHeader',
  title: 'About Header',
  type: 'document',
  fields: [
    defineField({
      name: 'breadcrumbRoot',
      title: 'Breadcrumb root',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'breadcrumbCurrent',
      title: 'Breadcrumb current',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {heading: 'heading', breadcrumb: 'breadcrumbCurrent'},
    prepare({heading, breadcrumb}) {
      return {title: heading ?? 'About Header', subtitle: breadcrumb ?? ''}
    },
  },
})
