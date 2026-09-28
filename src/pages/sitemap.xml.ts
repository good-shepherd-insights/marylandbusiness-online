/**
 * Sitemap derived from the same qualifying set as the routes (TAGS.md):
 * only gate-passing paths, plus business detail URLs at the listing's
 * geographic path `/<county>/<city>/<business>`. Listings without full
 * location data get no detail URL (flat detail does not exist).
 */
import type { APIRoute } from 'astro';
import { buildDirectoryIndex } from '@lib/directory/paths';

export const GET: APIRoute = async ({ site }) => {
  const index = await buildDirectoryIndex();
  const base = (site?.toString() ?? '').replace(/\/$/, '');

  const urls = new Set<string>(['']);
  for (const path of index.open.keys()) urls.add(path);

  for (const rows of index.listingsByPath.values()) {
    for (const row of rows) {
      if (row.county && row.city) urls.add(`${row.county.slug}/${row.city.slug}/${row.slug}`);
    }
  }

  const entries = [...urls]
    .map((path) => {
      const loc = `${base}/${path}`;
      return `  <url><loc>${loc}</loc></url>`;
    })
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>`,
    { headers: { 'content-type': 'application/xml; charset=utf-8' } },
  );
};