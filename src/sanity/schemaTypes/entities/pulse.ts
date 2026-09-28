import {defineField, defineType} from 'sanity'

/**
 * Pulse — live business-activity figures (design pulse bar: booked count,
 * capacity %, wait minutes). One document per observation; listing-owned via
 * `listing.pulse[]` (user-stated 2026-09-26 model).
 * Presentation strings (templates, tone) live in the component, never here.
 */
export const pulse = defineType({
  name: 'pulse',
  title: 'Pulse',
  type: 'document',
  fields: [
    defineField({
      name: 'booked',
      title: 'Booked',
      type: 'number',
      description: 'People booked in the last hour',
      validation: (rule) => rule.required().min(0).integer(),
    }),
    defineField({
      name: 'capacityPct',
      title: 'Capacity %',
      type: 'number',
      description: 'Current capacity used, 0–100',
      validation: (rule) => rule.required().min(0).max(100),
    }),
    defineField({
      name: 'waitMinutes',
      title: 'Wait Minutes',
      type: 'number',
      description: 'Current estimated wait, 0 = no wait',
      validation: (rule) => rule.required().min(0).integer(),
    }),
    defineField({
      name: 'observedAt',
      title: 'Observed At',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {booked: 'booked', capacityPct: 'capacityPct', waitMinutes: 'waitMinutes', observedAt: 'observedAt'},
    prepare({booked, capacityPct, waitMinutes, observedAt}) {
      return {
        title: 'Pulse',
        subtitle: `${booked ?? 0} booked · ${capacityPct ?? 0}% full · ~${waitMinutes ?? 0} min${observedAt ? ` · ${observedAt}` : ''}`,
      }
    },
  },
})