import {defineField, defineType} from 'sanity'
import {statItem} from '../components/statItem'

/**
 * Hub header section — "Regional Command Center" band on the county hub
 * (design 10): breadcrumb root, live-updates badge label, and the county
 * stat blocks. County name itself comes from the county entity; stats are
 * content (no data source) per census 10.
 */
export const hubHeader = defineType({
  name: 'hubHeader',
  title: 'Hub Header',
  type: 'document',
  fields: [
    defineField({
      name: 'breadcrumbRoot',
      title: 'Breadcrumb Root',
      type: 'string',
      description: 'e.g. "Maryland" — root crumb above the county name',
    }),
    defineField({
      name: 'liveBadgeLabel',
      title: 'Live Badge Label',
      type: 'string',
      description: 'e.g. "Live Updates" — badge beside the pulsing dot',
    }),
    defineField({
      name: 'headingSuffix',
      title: 'Heading Suffix',
      type: 'string',
      description: 'Word after the county name in the h1, e.g. "Hub"',
    }),
    defineField({
      name: 'stats',
      title: 'Header Stats',
      type: 'array',
      of: [{type: 'statItem'}],
    }),
  ],
  preview: {
    select: {title: 'liveBadgeLabel', stats: 'stats'},
    prepare({title, stats}) {
      const count = Array.isArray(stats) ? stats.length : 0
      return {title: title ?? 'Hub Header', subtitle: count ? `${count} stats` : ''}
    },
  },
})
