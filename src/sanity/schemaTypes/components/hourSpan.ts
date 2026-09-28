import {defineField, defineType} from 'sanity'

const DAYS = [
  {title: 'Monday', value: 'mon'},
  {title: 'Tuesday', value: 'tue'},
  {title: 'Wednesday', value: 'wed'},
  {title: 'Thursday', value: 'thu'},
  {title: 'Friday', value: 'fri'},
  {title: 'Saturday', value: 'sat'},
  {title: 'Sunday', value: 'sun'},
]

/** One day's opening window. Open status and closing time are computed from these — never stored. */
export const hourSpan = defineType({
  name: 'hourSpan',
  title: 'Hours Span',
  type: 'object',
  fields: [
    defineField({
      name: 'day',
      title: 'Day',
      type: 'string',
      options: {list: DAYS},
      validation: (rule) =>
        rule
          .required()
          .custom(
            (value) =>
              DAYS.some((d) => d.value === value) ||
              `Day must be one of: ${DAYS.map((d) => d.value).join(', ')}`,
          ),
    }),
    defineField({
      name: 'opens',
      title: 'Opens',
      type: 'string',
      description: '24h time, e.g. 11:00',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'closes',
      title: 'Closes',
      type: 'string',
      description: '24h time, e.g. 22:00',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {day: 'day', opens: 'opens', closes: 'closes'},
    prepare({day, opens, closes}) {
      return {title: DAYS.find((d) => d.value === day)?.title ?? day, subtitle: `${opens} – ${closes}`}
    },
  },
})