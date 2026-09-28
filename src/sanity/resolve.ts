/**
 * Maps document types to the frontend URL the Presentation Tool previews
 * (per-type resolver objects: select fields, then resolve to locations).
 */
export const resolve = {
  locations: {
    listing: {
      select: { title: 'name', slug: 'slug.current' },
      resolve: (value: { title?: string; slug?: string } | null) =>
        value?.slug
          ? {
              locations: [
                { title: value.title ?? 'Listing', href: `/${value.slug}` },
              ],
            }
          : null,
    },
    blogPost: {
      select: { title: 'title', slug: 'slug.current' },
      resolve: (value: { title?: string; slug?: string } | null) =>
        value?.slug
          ? {
              locations: [
                {
                  title: value.title ?? 'Blog post',
                  href: `/blog/${value.slug}`,
                },
              ],
            }
          : null,
    },
    home: {
      select: { title: 'title' },
      resolve: () => ({ locations: [{ title: 'Home', href: '/' }] }),
    },
    about: {
      select: { title: 'title' },
      resolve: () => ({ locations: [{ title: 'About', href: '/about' }] }),
    },
  },
};