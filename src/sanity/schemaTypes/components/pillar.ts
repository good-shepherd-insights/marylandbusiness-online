import {defineField, defineType} from 'sanity'
import {rejectInvisibleChars} from '../validation/strings'

/**
 * Pillar component — one icon + title + text card inside the visionPillars
 * section. Icon tint alternates by position (CSS), never data.
 */
export const pillar = defineType({
  name: 'pillar',
  title: 'Pillar',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      validation: (rule) => rule.required().custom(rejectInvisibleChars),
      description: 'Iconify icon name (tabler set, e.g. tabler:shield-check)',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'title', icon: 'icon'},
    prepare({title, icon}) {
      return {title: title ?? '', subtitle: icon ?? ''}
    },
  },
})
