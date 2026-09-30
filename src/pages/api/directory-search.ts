import type { APIRoute } from 'astro';
import { getCategoryOptions, getCountyOptions, resolveDirectoryPath } from '@lib/directory/paths';

/** Native hero form: validate CMS slugs, then use the directory's county
 * gate and existing category chip contract. Parent category + county is
 * not a directory path; category filters narrow the county hub instead. */
export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData();
  const [counties, categories] = await Promise.all([getCountyOptions(), getCategoryOptions()]);
  const county = counties.find((option) => option.slug === form.get('county'));
  const category = categories.find((option) => option.slug === form.get('category'));
  if (!county || !category) {
    return new Response('Choose a valid county and category.', { status: 400 });
  }

  const resolution = await resolveDirectoryPath(county.slug);
  if (resolution.kind === 'invalid') {
    return redirect(resolution.redirectTo, 303);
  }

  const destination = new URL(
    resolution.kind === 'open' ? `/${resolution.path}` : resolution.redirectTo,
    request.url,
  );
  // `/` renders the marketing home page, which has no hub to narrow, so it
  // gets a clean redirect rather than a chip string nothing would read.
  if (destination.pathname === '/') return redirect('/', 303);
  const categoryFilter = `cat~${category.slug}~${category.label}`;
  const existingFilters = destination.searchParams.get('af');
  destination.searchParams.set('af', existingFilters ? `${existingFilters},${categoryFilter}` : categoryFilter);
  return redirect(`${destination.pathname}${destination.search}`, 303);
};
