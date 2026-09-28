/**
 * Shared string guards for schema fields. Icon names must be clean ASCII:
 * invisible characters (zero-width spaces/joiners, BOM, direction
 * overrides, soft hyphen) survive Studio pastes and break astro-icon
 * lookups at render. Applied to every icon field; API and seed writes fail
 * validation when contaminated.
 */
const INVISIBLE = /[\u200B-\u200F\u2060-\u2064\u206A-\u206F\uFEFF\u00AD\u202A-\u202E\u180E\uFFF9-\uFFFB]/

export function rejectInvisibleChars(value: string | undefined) {
  if (!value) return true
  return (
    !INVISIBLE.test(value) ||
    'Contains invisible characters (zero-width spaces/joiners, BOM, direction marks). Retype the value or paste as plain text.'
  )
}
