import {defineField, defineType} from 'sanity'
import {rejectInvisibleChars} from '../validation/strings'

/**
 * Social feed item component — one community activity card inside the
 * socialFeed section.
 */
export const socialFeedItem = defineType({
  name: 'socialFeedItem',
  title: 'Social Feed Item',
  type: 'object',
  fields: [
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'activityLabel',
      title: 'Activity label',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'As shown in the card footer, e.g. "Purchased"',
    }),
    defineField({
      name: 'activityIcon',
      title: 'Activity icon',
      type: 'string',
      validation: (rule) => rule.required().custom(rejectInvisibleChars),
      description: 'Iconify icon name (tabler set, e.g. tabler:shopping-bag)',
    }),
  ],
  preview: {
    select: {name: 'name', location: 'location', activity: 'activityLabel'},
    prepare({name, location, activity}) {
      return {title: name ?? '', subtitle: location ? `${location} — ${activity ?? ''}` : activity ?? ''}
    },
  },
})
