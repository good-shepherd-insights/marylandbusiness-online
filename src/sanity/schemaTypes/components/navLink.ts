import {defineField, defineType} from 'sanity'

/** One nav/footer link — label + href, reused by the navbar and footer
 * link columns in siteSettings. */
export const navLink = defineType({
  name: 'navLink',
  title: 'Nav Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
    }),
    defineField({
      name: 'href',
      title: 'Href',
      type: 'string',
      description: 'Internal path (e.g. /resources) or anchor',
    }),
  ],
  preview: {
    select: {title: 'label', subtitle: 'href'},
    prepare({title, subtitle}) {
      return {title: title ?? 'Link', subtitle}
    },
  },
})
