import {defineField, defineType} from 'sanity'
import {statItem} from '../components/statItem'

/**
 * Hub discovery section — split-view chrome for the county hub (design 10):
 * map-pane labels, filter header labels/chips, and the county expertise
 * band. Business rows, city counts and the county name are computed from
 * entities at query time — never stored here.
 */
export const hubDiscovery = defineType({
  name: 'hubDiscovery',
  title: 'Hub Discovery',
  type: 'document',
  fields: [
    defineField({
      name: 'browseHeading',
      title: 'Browse Heading',
      type: 'string',
      description: 'e.g. "Browse Directory"',
    }),
    defineField({
      name: 'clearFiltersLabel',
      title: 'Clear Filters Label',
      type: 'string',
      description: 'e.g. "Clear Filters"',
    }),
    defineField({
      name: 'categoryFilterLabel',
      title: 'Category Filter Label',
      type: 'string',
      description: 'e.g. "Category"',
    }),
    defineField({
      name: 'sortFilterLabel',
      title: 'Sort Filter Label',
      type: 'string',
      description: 'e.g. "Price: Low-High"',
    }),
    defineField({
      name: 'openNowChipLabel',
      title: 'Open Now Chip Label',
      type: 'string',
      description: 'e.g. "Open Now"',
    }),
    defineField({
      name: 'verifiedLabel',
      title: 'Verified Label',
      type: 'string',
      description: 'e.g. "Verified" — filter chip and item badge share one source',
    }),
    defineField({
      name: 'mapToggleMapLabel',
      title: 'Map Toggle Label',
      type: 'string',
      description: 'e.g. "Map"',
    }),
    defineField({
      name: 'mapToggleSatelliteLabel',
      title: 'Satellite Toggle Label',
      type: 'string',
      description: 'e.g. "Satellite"',
    }),
    defineField({
      name: 'regionFocusHeading',
      title: 'Region Focus Heading',
      type: 'string',
      description: 'e.g. "Region Focus" — map panel heading above city rows',
    }),
    defineField({
      name: 'interactiveMapLabel',
      title: 'Interactive Map Label',
      type: 'string',
      description: 'e.g. "Interactive Map View" — mobile map-preview expand button (design 11)',
    }),
    defineField({
      name: 'interactiveMapCloseLabel',
      title: 'Interactive Map Close Label',
      type: 'string',
      description: 'e.g. "Close" — a11y label for the fullscreen-map close button (design 11)',
    }),
    defineField({
      name: 'expertiseHeading',
      title: 'Expertise Heading',
      type: 'string',
      description: 'e.g. "County Expertise"',
    }),
    defineField({
      name: 'expertiseStats',
      title: 'Expertise Stats',
      type: 'array',
      of: [{type: 'statItem'}],
    }),
  ],
  preview: {
    select: {title: 'browseHeading', expertise: 'expertiseHeading'},
    prepare({title, expertise}) {
      return {title: title ?? 'Hub Discovery', subtitle: expertise}
    },
  },
})
