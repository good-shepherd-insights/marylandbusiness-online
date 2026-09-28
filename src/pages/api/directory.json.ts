/**
 * Directory filter widening (HUB-DIRECTORY-RESEARCH.md §5.3): the hub page
 * ships only its own path's rows; removing a filter chip fetches the wider
 * combination here. Client-side filtering only — ungated by design
 * (TAGS.md), responds to GET with JSON and never creates indexable URLs.
 */
import {getRowsForCombo, type ComboFilters} from '@lib/directory/paths';
import type {APIRoute} from 'astro';

export const GET: APIRoute = async ({url}) => {
  const pick = (key: string) => url.searchParams.get(key)?.trim() || undefined;
  const filters: ComboFilters = {
    cat: pick('cat'),
    sub: pick('sub'),
    county: pick('county'),
    city: pick('city'),
  };
  const result = await getRowsForCombo(filters);
  return new Response(JSON.stringify(result), {
    headers: {'content-type': 'application/json; charset=utf-8'},
  });
};
