import {defineField, defineType} from 'sanity'
import {rejectInvisibleChars} from '../validation/strings'

/**
 * Site settings singleton — site-wide identity: browser tab title, SEO and
 * social meta, share-image URL, directory search placeholder and the brand
 * icon. Technical config (theme selection, data-source wiring) stays in
 * config/settings.toml. Consumers fall back to the TOML values when this
 * document or a field is unset.
 */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      description: 'Browser tab title and share-image fallback title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seoName',
      title: 'SEO Name',
      type: 'string',
      description: 'Site name for social meta (twitter:title)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      description: 'Meta and social share description',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seoUrl',
      title: 'SEO URL',
      type: 'url',
      description: 'Production origin used for og:url, twitter:url and share images',
    }),
    defineField({
      name: 'searchPlaceholder',
      title: 'Search Placeholder',
      type: 'string',
      description: 'Directory search placeholder; {0} is replaced by the listing count',
    }),
    defineField({
      name: 'logoIcon',
      title: 'Logo Icon',
      type: 'string',
      description: 'Iconify tabler name for the brand mark (optional)',
      validation: (rule) => rule.custom(rejectInvisibleChars),
    }),
    defineField({
      name: 'navLinks',
      title: 'Navbar Links',
      type: 'array',
      of: [{type: 'navLink'}],
      description: 'Global navbar link order = render order',
    }),
    defineField({
      name: 'navCtaLabel',
      title: 'Navbar CTA Label',
      type: 'string',
      description: 'e.g. "List Business +"',
    }),
    defineField({
      name: 'navMenuLabel',
      title: 'Navbar Menu Label',
      type: 'string',
      description: 'A11y label for the mobile menu toggle, e.g. "Menu"',
    }),
    defineField({
      name: 'footerBrandBadge',
      title: 'Footer Brand Badge',
      type: 'string',
      description: 'Short text in the red brand square, e.g. "MD"',
    }),
    defineField({
      name: 'footerBrandName',
      title: 'Footer Brand Name',
      type: 'string',
      description: 'Footer wordmark, e.g. "BusinessDirect"',
    }),
    defineField({
      name: 'footerTagline',
      title: 'Footer Tagline',
      type: 'text',
      rows: 2,
      description: 'Short brand line under the footer wordmark',
    }),
    defineField({
      name: 'footerQuickHeading',
      title: 'Footer Quick Links Heading',
      type: 'string',
      description: 'e.g. "Quick Links"',
    }),
    defineField({
      name: 'footerQuickLinks',
      title: 'Footer Quick Links',
      type: 'array',
      of: [{type: 'navLink'}],
      description: 'Link order = render order; empty href renders non-link text',
    }),
    defineField({
      name: 'footerResourceHeading',
      title: 'Footer Resources Heading',
      type: 'string',
      description: 'e.g. "Resources"',
    }),
    defineField({
      name: 'footerResourceLinks',
      title: 'Footer Resource Links',
      type: 'array',
      of: [{type: 'navLink'}],
      description: 'Link order = render order; empty href renders non-link text',
    }),
    defineField({
      name: 'footerLegalName',
      title: 'Footer Legal Name',
      type: 'string',
      description: 'Copyright line name; the year renders automatically',
    }),
    defineField({
      name: 'footerLegalLinks',
      title: 'Footer Legal Links',
      type: 'array',
      of: [{type: 'navLink'}],
      description: 'e.g. Privacy, Terms; empty href renders non-link text',
    }),
  ],
  preview: {
    select: {title: 'siteTitle', subtitle: 'seoName'},
    prepare({title, subtitle}) {
      return {title: title ?? 'Site Settings', subtitle}
    },
  },
})
