import {defineField, defineType} from 'sanity'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** Event row: date cell (month + day), title, time • venue, per-event CTA (design Events & Press). */
export const listingEvent = defineType({
  name: 'listingEvent',
  title: 'Listing Event',
  type: 'object',
  fields: [
    defineField({
      name: 'month',
      title: 'Month',
      type: 'string',
      options: {list: MONTHS},
      validation: (rule) =>
        rule
          .required()
          .custom(
            (value) =>
              MONTHS.includes(value as string) ||
              `Month must be one of: ${MONTHS.join(', ')}`,
          ),
    }),
    defineField({
      name: 'day',
      title: 'Day',
      type: 'number',
      validation: (rule) => rule.required().integer().min(1).max(31),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'title', month: 'month', day: 'day', time: 'time', venue: 'venue'},
    prepare({title, month, day, time, venue}) {
      return {title, subtitle: [`${month} ${day}`, time, venue].filter(Boolean).join(' · ')}
    },
  },
})