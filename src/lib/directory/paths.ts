/**
 * Directory path gate (TAGS.md) — the single source of truth for which
 * directory paths exist. Every route, the sitemap and the audit view
 * compute from the same qualifying set produced here.
 *
 * Rules:
 *  - 0 listings → path never exists, regardless of any override.
 *  - Entity-level paths (county, city, subcategory) need the entity's own
 *    description as unique copy.
 *  - Type+geography combinations need `intro` copy from a combo entry on
 *    the subcategory (`subcategory.combos[]` — user-stated model).
 *  - A combo entry can force a combination on (`include`) or off
 *    (`exclude`) — human override, per combination, audited via `note`.
 */
import {loadQuery} from '@lib/sanity/load-query';
import type {HubBusiness, HubCity, HubData, ListingEntry, SanityDirectoryPage, SanityListing} from '@lib/sanity/types';
import {getDirectoryPage, getListing} from '@lib/sanity/queries';
import {sanityImageUrl} from '@lib/sanity/client';

export type PerspectiveCookie = string | undefined;

export type PathKind = 'geo-county' | 'geo-city' | 'type' | 'type-county' | 'type-city';

/** Minimum listings per path level (0 listings → off, always). */
const MIN_LISTINGS: Record<PathKind, number> = {
  'geo-county': 1,
  'geo-city': 1,
  type: 1,
  'type-county': 2,
  'type-city': 2,
};

export interface DirectoryRow {
  _id: string;
  name: string;
  slug: string;
  featured: boolean | null;
  description: string | null;
  image: {asset: unknown; alt: string} | null;
  priceRange: string | null;
  hours: {day: string; opens: string; closes: string}[] | null;
  ratings: {rating: number | null}[] | null;
  taxStatus?: 'active' | 'invalid' | null;
  ctaPrimaryLabel?: string | null;
  ctaPrimaryUrl?: string | null;
  phone?: string | null;
  geo?: {lat: number; lng: number} | null;
  subcategory: {
    _id: string;
    name: string;
    slug: string;
    description: string | null;
    parent: {slug: string; name: string; description: string | null} | null;
    combos: SubcategoryCombo[];
  } | null;
  county: {_id: string; name: string; slug: string; description: string | null} | null;
  city: {_id: string; name: string; slug: string; description: string | null} | null;
}

/** One path-gate combo entry on a subcategory (typed references, no path
 * strings — the path derives from the referenced slugs). */
export interface SubcategoryCombo {
  county: {slug: string};
  city: {slug: string} | null;
  mode: 'include' | 'exclude';
  intro: string | null;
  note: string | null;
}

/** Subcategory subset used to label type paths + gate combos (geo paths
 * pass county/city label metas without combos). */
type EntityMeta = {
  _id: string;
  name: string;
  slug: string;
  description: string | null;
  combos?: SubcategoryCombo[];
} | null;

export interface PathState {
  /** Combination path without leading/trailing slash. */
  path: string;
  kind: PathKind;
  status: 'on' | 'off';
  reason: string;
  count: number;
  label: string;
  description: string | null;
}

export interface DirectoryIndex {
  /** Every candidate combination with its gate state — the audit view. */
  states: PathState[];
  /** Only the qualifying (status on) states, keyed by path. */
  open: Map<string, PathState>;
  /** Listing rows grouped by combination path (geo and type+geo paths). */
  listingsByPath: Map<string, DirectoryRow[]>;
  /** All listing rows by slug — flat business-name resolution. */
  listingBySlug: Map<string, DirectoryRow>;
  /** All listing rows (city→county derivation, etc.). */
  rows: DirectoryRow[];
}

const hasCopy = (s: string | null | undefined) => Boolean(s && s.trim());

/** One listing row per path key it belongs to. */
function pathKeysOf(row: DirectoryRow): {geo: string[]; type: string[]} {
  const geo: string[] = [];
  const type: string[] = [];
  if (row.county) {
    geo.push(row.county.slug);
    if (row.city) geo.push(`${row.county.slug}/${row.city.slug}`);
  }
  if (row.subcategory) {
    // Type path = parent category + subcategory (TAGS.md): /restaurant/seafood.
    // Schema requires a parent; defensively fall back to the leaf alone.
    const leaf = row.subcategory.slug;
    const parentSlug = row.subcategory.parent?.slug;
    const root = parentSlug ? `${parentSlug}/${leaf}` : leaf;
    type.push(root);
    if (row.county) {
      type.push(`${root}/${row.county.slug}`);
      if (row.city) {
        type.push(`${root}/${row.county.slug}/${row.city.slug}`);
      }
    }
  }
  return {geo, type};
}

/** Sanity slug fields arrive as {current} objects — flatten to strings. */
const normSlug = (s: unknown): string =>
  typeof s === 'string' ? s : ((s as {current?: string} | null)?.current ?? '');

async function fetchIndex(): Promise<DirectoryRow[]> {
  const listings = await loadQuery<DirectoryRow[]>({
    query: `*[_type == "listing" && defined(slug.current)]{
      _id, name, slug, featured, description,
      priceRange, hours, taxStatus,
      ctaPrimaryLabel, ctaPrimaryUrl, phone,
      geo{lat,lng},
      image{asset,alt},
      "ratings": reviews[]->{rating},
      subcategory->{_id,name,slug,description,parent->{slug,name,description},
        combos[]{mode,intro,note,county->{slug},city->{slug}}},
      county->{_id,name,slug,description},
      city->{_id,name,slug,description}
    }`,
  });
  const normCombos = (c: {county: unknown; city: unknown; mode: 'include' | 'exclude'; intro: string | null; note: string | null}): SubcategoryCombo => ({
    mode: c.mode,
    intro: c.intro,
    note: c.note,
    county: {slug: normSlug((c.county as {slug?: unknown} | null)?.slug)},
    city: c.city ? {slug: normSlug((c.city as {slug?: unknown} | null)?.slug)} : null,
  });
  const rows = (listings.data ?? []).map((row) => ({
    ...row,
    slug: normSlug(row.slug),
    subcategory: row.subcategory
      ? {
          ...row.subcategory,
          slug: normSlug(row.subcategory.slug),
          parent: row.subcategory.parent
            ? {
                slug: normSlug(row.subcategory.parent.slug),
                name: row.subcategory.parent.name,
                description: row.subcategory.parent.description,
              }
            : null,
          combos: (row.subcategory.combos ?? []).map(normCombos),
        }
      : null,
    county: row.county ? {...row.county, slug: normSlug(row.county.slug)} : null,
    city: row.city ? {...row.city, slug: normSlug(row.city.slug)} : null,
  }));
  return rows;
}

/** Compute the full path index: every candidate combination + gate state. */
export async function buildDirectoryIndex(): Promise<DirectoryIndex> {
  const rows = await fetchIndex();

  const candidates = new Map<string, {kind: PathKind; rows: DirectoryRow[]; meta: EntityMeta | null}>();

  const add = (path: string, kind: PathKind, row: DirectoryRow, meta: EntityMeta | null) => {
    const entry = candidates.get(path) ?? {kind, rows: [], meta};
    entry.rows.push(row);
    if (meta) entry.meta = meta;
    candidates.set(path, entry);
  };

  for (const row of rows) {
    // Parent-category path (/[category]): scope = every listing under the
    // category via its subcategories. Slug + copy come from the category
    // doc itself — nothing hardcoded.
    if (row.subcategory?.parent?.slug) {
      const p = row.subcategory.parent;
      add(p.slug, 'type', row, {_id: `parent-${p.slug}`, name: p.name, slug: p.slug, description: p.description});
    }
    const {geo, type} = pathKeysOf(row);
    for (const p of geo) {
      add(p, p.includes('/') ? 'geo-city' : 'geo-county', row, p.includes('/') ? (row.city ?? null) : (row.county ?? null));
    }
    for (const p of type) {
      // Segment count decides kind: 1-2 = type page (parent or subcategory),
      // 3 = +county, 4 = +city.
      const depth = (p.match(/\//g)?.length ?? 0) + 1;
      add(p, depth <= 2 ? 'type' : depth === 3 ? 'type-county' : 'type-city', row, row.subcategory);
    }
  }

  const states: PathState[] = [];
  const open = new Map<string, PathState>();
  const listingsByPath = new Map<string, DirectoryRow[]>();
  const listingBySlug = new Map<string, DirectoryRow>(rows.map((row) => [row.slug, row]));

  for (const [path, {kind, rows: comboRows, meta}] of candidates) {
    const count = comboRows.length;
    // Combo override lives on the subcategory (typed refs, no path strings):
    // match the entry whose county/city slugs equal the path's geo segments.
    const segs = path.split('/');
    const combo =
      kind === 'type-county' || kind === 'type-city'
        ? (meta?.combos ?? []).find(
            (c) =>
              c.county.slug === segs[2] &&
              // A present-but-dangling city ref (empty slug) is a city combo
              // and must not fall back to matching the county-level path.
              (c.city ? c.city.slug === segs[3] : kind === 'type-county'),
          )
        : undefined;
    const label = kind === 'geo-county' ? (comboRows[0].county?.name ?? path)
      : kind === 'geo-city' ? (comboRows[0].city?.name ?? path)
      : (meta?.name ?? path);
    const description = kind === 'geo-county' ? (comboRows[0].county?.description ?? null)
      : kind === 'geo-city' ? (comboRows[0].city?.description ?? null)
      : (meta?.description ?? null);
    const entityCopyOk = kind === 'type-county' || kind === 'type-city' ? true : Boolean(description && description.trim());
    const comboCopyOk = kind === 'type-county' || kind === 'type-city' ? Boolean(combo?.intro?.trim()) : true;
    const min = MIN_LISTINGS[kind];

    let status: 'on' | 'off';
    let reason: string;
    // Human override (TAGS.md gate input 4) beats the mechanical result —
    // only the 0-listings guard is absolute (safety guardrail).
    if (combo?.mode === 'exclude') {
      status = 'off';
      reason = 'excluded by combo override';
    } else if (combo?.mode === 'include' && count > 0) {
      status = 'on';
      reason = 'included by combo override';
    } else if (count === 0) {
      status = 'off';
      reason = 'no listings';
    } else if (count < min) {
      status = 'off';
      reason = `needs ${min} listings, has ${count}`;
    } else if (!entityCopyOk) {
      status = 'off';
      reason = 'missing entity description (unique copy)';
    } else if (!comboCopyOk) {
      status = 'off';
      reason = 'missing combo intro copy';
    } else {
      status = 'on';
      reason = 'mechanical gate passed';
    }

    const state: PathState = {path, kind, status, reason, count, label, description};
    states.push(state);
    if (status === 'on') {
      open.set(path, state);
      listingsByPath.set(path, comboRows);
    }
  }

  states.sort((a, b) => a.path.localeCompare(b.path));
  return {states, open, listingsByPath, listingBySlug, rows};
}

/** Qualifying geo county hubs (sidebar / county pages). */
export async function getGeoCountyHubs(): Promise<PathState[]> {
  const {states} = await buildDirectoryIndex();
  return states.filter((s) => s.kind === 'geo-county' && s.status === 'on');
}

/** Qualifying type (category) hubs. */
export async function getTypeHubs(): Promise<PathState[]> {
  const {states} = await buildDirectoryIndex();
  return states.filter((s) => s.kind === 'type' && s.status === 'on');
}

/** Every category + subcategory doc (the `/` hub lists all, per TAGS.md).
 * Gate-passing subcategories are crawlable links (`/restaurant/seafood`);
 * everything else shows as a plain label. */
export async function getAllCategories(): Promise<{label: string; path: string; crawlable: boolean}[]> {
  const [cats, subs, index] = await Promise.all([
    loadQuery<{name: string; slug: unknown}[]>({
      query: `*[_type == "category"] | order(name asc){name, slug}`,
    }),
    loadQuery<{name: string; slug: unknown; parentSlug: unknown}[]>({
      query: `*[_type == "subcategory"] | order(name asc){name, slug, "parentSlug": parent->slug.current}`,
    }),
    buildDirectoryIndex(),
  ]);
  // Parent categories are never gate paths themselves (type paths are
  // always parent/subcategory) — they render as plain labels on the hub.
  const catRows = (cats.data ?? []).map((c) => ({label: c.name, path: normSlug(c.slug), crawlable: false}));
  const subRows = (subs.data ?? []).map((s) => {
    const slug = normSlug(s.slug);
    const parentSlug = normSlug(s.parentSlug);
    const path = parentSlug ? `${parentSlug}/${slug}` : slug;
    return {label: s.name, path, crawlable: index.open.has(path)};
  });
  return [...catRows, ...subRows];
}

/** All hub options for filter UIs: counties + categories that qualify. */
export async function getFilterOptions(): Promise<{label: string; value: string}[]> {
  const hubs = await Promise.all([getGeoCountyHubs(), getTypeHubs()]);
  return hubs.flat().map((s) => ({label: s.label, value: s.kind === 'type' ? s.path.split('/').pop()! : s.path.split('/')[0]}));
}

/** All county entities, alphabetical — the hub County dropdown options
 * (tag eligibility is independent of listings). */
export async function getCountyOptions(): Promise<{label: string; slug: string}[]> {
  const {data} = await loadQuery<{name: string; slug: unknown}[]>({
    query: `*[_type == "county"] | order(name asc){name, "slug": slug.current}`,
  });
  return (data ?? []).map((c) => ({label: c.name, slug: normSlug(c.slug)})).filter((c) => c.slug);
}

/** All categories, alphabetical — the hub Category dropdown options. */
export async function getCategoryOptions(): Promise<{label: string; slug: string}[]> {
  const {data} = await loadQuery<{name: string; slug: unknown}[]>({
    query: `*[_type == "category"] | order(name asc){name, "slug": slug.current}`,
  });
  return (data ?? []).map((c) => ({label: c.name, slug: normSlug(c.slug)})).filter((c) => c.slug);
}

function toEntry(row: DirectoryRow): ListingEntry {
  return {
    id: row.slug,
    collection: 'directory',
    data: {
      name: row.name,
      slug: row.slug,
      description: row.description ?? '',
      image: (row.image ?? undefined) as ListingEntry['data']['image'],
      featured: row.featured ?? false,
      subcategory: row.subcategory
        ? {_id: row.subcategory._id, _type: 'subcategory', name: row.subcategory.name, slug: {current: row.subcategory.slug}, description: row.subcategory.description ?? undefined}
        : null,
      county: row.county
        ? {_id: row.county._id, _type: 'county', name: row.county.name, slug: {current: row.county.slug}, description: row.county.description ?? undefined}
        : null,
      city: row.city
        ? {_id: row.city._id, _type: 'city', name: row.city.name, slug: {current: row.city.slug}, description: row.city.description ?? undefined}
        : null,
    },
  };
}

/** Gate state + qualifying listings for a combination path; undefined when
 * the path does not exist (routes treat that as 404). */
export async function getPath(path: string): Promise<{state: PathState; listings: ListingEntry[]} | undefined> {
  const index = await buildDirectoryIndex();
  const state = index.open.get(path);
  if (!state) return undefined;
  return {state, listings: (index.listingsByPath.get(path) ?? []).map(toEntry)};
}

/* ------------------------------------------------------------------ *
 * Hub view + three-tier path resolution (HUB-DIRECTORY-RESEARCH.md).
 * The path IS the filter state: gate-passing paths render the hub with
 * their segments pre-applied as chips; valid-but-gate-off combos
 * redirect to the nearest gate-passing ancestor with the requested
 * scope applied client-side (`?af=`); unresolvable slugs redirect bare.
 * ------------------------------------------------------------------ */

/** One pre-applied path filter chip. */
export interface PathFilter {
  type: 'county' | 'city' | 'sub' | 'cat';
  slug: string;
  label: string;
}

export interface HubView {
  state: PathState;
  hub: HubData;
  filters: PathFilter[];
}

export type DirectoryResolution =
  | {kind: 'open'; path: string; view: HubView}
  | {kind: 'narrow'; redirectTo: string; filters: PathFilter[]}
  /** Random / mispelled: 302 to the longest gate-passing ancestor of the
   * requested path (its valid route), else the hub root — never 404, no
   * active filtering. */
  | {kind: 'invalid'; redirectTo: string};

/** Action returned to a directory route — every consumer switch-exhausts
 * on `kind`. Pages never read nullable hub/listing fields; each branch
 * gets the data it needs narrowed. */
export type HubRouteAction =
  | {kind: 'hub'; view: HubView; directoryPage: SanityDirectoryPage | null}
  | {kind: 'redirect'; to: string; status: 301 | 302};

/** 3-segment routes handle both combo hubs and business-detail fallbacks
 * (the third segment may be either a county or a listing slug). */
export type HybridRouteAction =
  | {kind: 'hub'; view: HubView; directoryPage: SanityDirectoryPage | null}
  | {kind: 'detail'; listing: SanityListing}
  | {kind: 'redirect'; to: string; status: 301 | 302};

/** Resolve a 2-segment or 4-segment directory route. Loads the
 * directoryPage only on the open branch so non-hub paths pay nothing
 * for it. Both 'narrow' (gate-off combo) and 'invalid' (unresolvable)
 * resolve to a redirect — TAGS.md tier 2/3 behavior. */
export async function resolveHubRoute(
  path: string,
  perspectiveCookie?: PerspectiveCookie,
): Promise<HubRouteAction> {
  const dir = await resolveDirectoryPath(path);
  if (dir.kind === 'narrow' || dir.kind === 'invalid') {
    return {kind: 'redirect', to: dir.redirectTo, status: 301};
  }
  const directoryPage = (await getDirectoryPage(perspectiveCookie)) ?? null;
  return {kind: 'hub', view: dir.view, directoryPage};
}

/** Resolve a 3-segment directory route. When the directory resolver
 * returns open → hub. When it returns narrow/invalid → try the
 * business-detail fallback (third segment as a listing slug sitting in
 * the requested county+city). Otherwise redirect per the directory
 * resolver's chosen landing. Params accept undefined (Astro types
 * `Astro.params` as possibly-undefined even for required segments);
 * missing segments short-circuit to a root redirect. */
export async function resolveHybridRoute(
  params: {category?: string; subcategory?: string; county?: string},
  perspectiveCookie?: PerspectiveCookie,
): Promise<HybridRouteAction> {
  const {category, subcategory, county} = params;
  if (!category || !subcategory || !county) {
    return {kind: 'redirect', to: '/', status: 301};
  }
  const dir = await resolveDirectoryPath(`${category}/${subcategory}/${county}`);
  if (dir.kind === 'open') {
    const directoryPage = (await getDirectoryPage(perspectiveCookie)) ?? null;
    return {kind: 'hub', view: dir.view, directoryPage};
  }
  const listing = await getListing(county, perspectiveCookie);
  if (
    listing &&
    listing.county?.slug?.current === category &&
    listing.city?.slug?.current === subcategory
  ) {
    return {kind: 'detail', listing};
  }
  return {kind: 'redirect', to: dir.redirectTo, status: 301};
}

const pretty = (slug: string) =>
  slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

/** HubBusiness wire shape for a row (rating computed, image URL baked). */
function toHubBusiness(row: DirectoryRow): HubBusiness {
  const ratings = (row.ratings ?? []).map((r) => r.rating ?? 0).filter((n) => n > 0);
  const reviewCount = ratings.length;
  return {
    _id: row._id,
    name: row.name,
    slug: {current: row.slug},
    description: row.description ?? undefined,
    image: (row.image ?? undefined) as HubBusiness['image'],
    imageUrl: row.image ? sanityImageUrl(row.image as Parameters<typeof sanityImageUrl>[0], {width: 200}) : null,
    taxStatus: row.taxStatus ?? undefined,
    ctaPrimaryLabel: row.ctaPrimaryLabel ?? undefined,
    ctaPrimaryUrl: row.ctaPrimaryUrl ?? undefined,
    phone: row.phone ?? undefined,
    city: row.city ? {name: row.city.name, slug: row.city.slug} : null,
    county: row.county ? {name: row.county.name, slug: row.county.slug} : null,
    geo: row.geo ?? null,
    rating: reviewCount > 0 ? ratings.reduce((sum, n) => sum + n, 0) / reviewCount : 0,
    reviewCount,
    subcategory: row.subcategory
      ? {
          name: row.subcategory.name,
          slug: row.subcategory.slug,
          parent: row.subcategory.parent
            ? {name: row.subcategory.parent.name, slug: row.subcategory.parent.slug}
            : null,
        }
      : null,
    priceRange: row.priceRange,
    hours: row.hours ?? null,
  };
}

/** City rows with counts (Region Focus pane), busiest first. */
function citiesOf(rows: DirectoryRow[]): HubCity[] {
  const byCity = new Map<string, HubCity>();
  for (const row of rows) {
    if (!row.city) continue;
    const hit = byCity.get(row.city.slug) ?? {name: row.city.name, slug: row.city.slug, count: 0};
    hit.count += 1;
    byCity.set(row.city.slug, hit);
  }
  return [...byCity.values()].sort((a, b) => b.count - a.count);
}

/** Entity display name for a slug, taken from the path's own rows. */
function nameOf(rows: DirectoryRow[], pick: (row: DirectoryRow) => string | null | undefined): string | undefined {
  for (const row of rows) {
    const name = pick(row);
    if (name) return name;
  }
  return undefined;
}

/** Chips pre-applied by a gate-passing path: one per trailing segment the
 * path fixes (county / city / subcategory). */
function pathFiltersOf(state: PathState, rows: DirectoryRow[]): PathFilter[] {
  const segs = state.path.split('/');
  if (state.kind === 'geo-county') {
    return [{type: 'county', slug: segs[0], label: nameOf(rows, (r) => r.county?.name) ?? pretty(segs[0])}];
  }
  if (state.kind === 'geo-city') {
    return [
      {type: 'county', slug: segs[0], label: nameOf(rows, (r) => r.county?.name) ?? pretty(segs[0])},
      {type: 'city', slug: segs[1], label: nameOf(rows, (r) => r.city?.name) ?? pretty(segs[1])},
    ];
  }
  // Single-segment type path = the parent category itself; deeper type
  // paths carry the subcategory chip.
  if (state.kind === 'type' && !state.path.includes('/')) {
    return [{type: 'cat', slug: segs[0], label: nameOf(rows, (r) => r.subcategory?.parent?.name) ?? pretty(segs[0])}];
  }
  const sub = {type: 'sub' as const, slug: segs[1] ?? segs[0], label: nameOf(rows, (r) => r.subcategory?.name) ?? pretty(segs[1] ?? segs[0])};
  if (state.kind === 'type') return [sub];
  const county = {type: 'county' as const, slug: segs[2], label: nameOf(rows, (r) => r.county?.name) ?? pretty(segs[2])};
  if (state.kind === 'type-county') return [sub, county];
  return [
    sub,
    county,
    {type: 'city' as const, slug: segs[3], label: nameOf(rows, (r) => r.city?.name) ?? pretty(segs[3])},
  ];
}

/** Hub render data for a gate-passing path, from the same index the gate
 * and sitemap use — hub listings can never disagree with the gate set. */
export async function getHubForPath(path: string): Promise<HubView | undefined> {
  const index = await buildDirectoryIndex();
  return hubForIndex(index, path);
}

function hubForIndex(index: DirectoryIndex, path: string): HubView | undefined {
  const state = index.open.get(path);
  if (!state) return undefined;
  const rows = index.listingsByPath.get(path) ?? [];
  return {
    state,
    hub: hubDataOf(index, state.label, rows),
    filters: pathFiltersOf(state, rows),
  };
}

/** Real header stats, computed from the index every request — never
 * stored, never faked: listings in scope, distinct cities, directory
 * total. Keys match the client-side recomputation in HubDiscovery. */
function hubDataOf(index: DirectoryIndex, label: string, rows: DirectoryRow[]): HubData {
  const cities = citiesOf(rows);
  return {
    label,
    businesses: rows.map(toHubBusiness),
    cities,
    stats: [
      {value: String(rows.length), label: 'Listings'},
      {value: String(cities.length), label: 'Cities'},
      {value: String(index.rows.length), label: 'Total'},
    ],
  };
}

/** Hub view rooted at `/` — the landing for chip-carrying redirects whose
 * segment has no gate path yet (zero-listing entities, bare categories).
 * Scope: the whole directory; the `?af=` chips narrow it client-side. */
export async function getGlobalHubView(): Promise<HubView> {
  const index = await buildDirectoryIndex();
  const state: PathState = {
    path: '',
    kind: 'type',
    status: 'on',
    reason: 'hub root',
    count: index.rows.length,
    label: 'Directory',
    description: null,
  };
  return {
    state,
    hub: hubDataOf(index, state.label, index.rows),
    filters: [],
  };
}

/** One GROQ roundtrip resolving which real entities the requested slugs
 * hit — decides tier 2 (valid combo, redirect + filters) vs tier 3. */
interface ResolvedEntities {
  county: (Partial<{name: string; slug: string}> | null)[];
  city: (Partial<{name: string; slug: string}> | null)[];
  city0: Partial<{name: string; slug: string}> | null;
  cat: Partial<{name: string; slug: string}> | null;
  sub: (Partial<{name: string; slug: string; parent: {name: string; slug: string} | null}> | null)[];
}

const entityMeta = '{name, "slug": slug.current}';

async function resolveEntities(segs: string[]): Promise<ResolvedEntities | undefined> {
  const [s0, s1 = '', s2 = '', s3 = ''] = segs;
  const {data} = await loadQuery<ResolvedEntities>({
    query: `{
      "county": [
        *[_type=="county" && slug.current==$s0][0]${entityMeta},
        *[_type=="county" && slug.current==$s2][0]${entityMeta}
      ],
      "city": [
        *[_type=="city" && slug.current==$s1][0]${entityMeta},
        *[_type=="city" && slug.current==$s3][0]${entityMeta}
      ],
      "city0": *[_type=="city" && slug.current==$s0][0]${entityMeta},
      "cat": *[_type=="category" && slug.current==$s0][0]${entityMeta},
      "sub": [
        *[_type=="subcategory" && slug.current==$s0][0]{name, "slug": slug.current, "parent": parent->{name, "slug": slug.current}},
        *[_type=="subcategory" && slug.current==$s1][0]{name, "slug": slug.current, "parent": parent->{name, "slug": slug.current}}
      ]
    }`,
    params: {s0, s1, s2, s3},
  });
  return data ?? undefined;
}

/** Slug resolved → {slug, label} chip parts; unresolved → undefined. */
const ent = (e: {name?: string; slug?: string} | null | undefined) =>
  e && e.slug ? {slug: e.slug, label: e.name ?? pretty(e.slug)} : undefined;

const narrowRedirect = (base: string, filters: PathFilter[]): DirectoryResolution => ({
  kind: 'narrow',
  redirectTo: filters.length
    ? `${base}?af=${encodeURIComponent(filters.map((f) => `${f.type}~${f.slug}~${f.label}`).join(','))}`
    : base,
  filters,
});

/** Three-tier resolution for a requested directory path (route files).
 * open → render the hub; narrow → 301 to the best gate path carrying the
 * request (nearest ancestor + `?af=` chips, or a bare tag's own hub
 * landing); invalid (no entity, no listing) → redirect, no chip. */
export async function resolveDirectoryPath(path: string): Promise<DirectoryResolution> {
  const segs = path.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  if (segs.length === 0 || segs.length > 4) return {kind: 'invalid', redirectTo: '/'};

  const index = await buildDirectoryIndex();
  const view = hubForIndex(index, segs.join('/'));
  if (view) return {kind: 'open', path: segs.join('/'), view};

  // Longest gate-passing ancestor — the redirect landing route.
  const fallback = (() => {
    for (let i = segs.length - 1; i >= 1; i -= 1) {
      const prefix = segs.slice(0, i).join('/');
      if (index.open.has(prefix)) return `/${prefix}`;
    }
    return '/';
  })();

  const ents = await resolveEntities(segs);
  if (!ents) return {kind: 'invalid', redirectTo: fallback};
  const county = ents.county.map(ent);
  const city = ents.city.map(ent);
  const cat = ent(ents.cat);
  // Subcategory needs its parent slug for grammar validation, kept apart
  // from the chip shape.
  const subAt = (i: 0 | 1) => {
    const raw = ents.sub[i];
    return raw && raw.slug
      ? {slug: raw.slug, label: raw.name ?? pretty(raw.slug), parentSlug: raw.parent?.slug ?? null}
      : undefined;
  };

  /* Single segment: bare tag or flat business name — priority county →
   * city → category → subcategory → listing. The exact-match open case
   * already returned above, so every hit here redirects. */
  if (segs.length === 1) {
    const countyEnt = county[0];
    const cityEnt = ent(ents.city0);
    if (countyEnt) return narrowRedirect('/', [{type: 'county', ...countyEnt}]);
    if (cityEnt) {
      // City's county derives from the listing rows carrying that city.
      // Straddling towns: the county with the most listings wins the bare
      // redirect; the other side keeps its own /county/city path.
      const hostRows = index.rows.filter((r) => r.city?.slug === cityEnt.slug && r.county?.slug);
      if (hostRows.length > 0) {
        const byCounty = new Map<string, number>();
        for (const r of hostRows) byCounty.set(r.county!.slug, (byCounty.get(r.county!.slug) ?? 0) + 1);
        let bestSlug = '';
        let bestCount = 0;
        for (const [slug, count] of byCounty) {
          if (count > bestCount) {
            bestSlug = slug;
            bestCount = count;
          }
        }
        const bestCounty = hostRows.find((r) => r.county?.slug === bestSlug)!.county!;
        const combo = `${bestCounty.slug}/${cityEnt.slug}`;
        if (index.open.has(combo)) return {kind: 'narrow', redirectTo: `/${combo}`, filters: []};
        return narrowRedirect('/', [
          {type: 'county', slug: bestCounty.slug, label: bestCounty.name},
          {type: 'city', ...cityEnt},
        ]);
      }
      return narrowRedirect('/', [{type: 'city', ...cityEnt}]);
    }
    if (cat) return narrowRedirect('/', [{type: 'cat', ...cat}]);
    const sub0 = subAt(0);
    if (sub0) {
      // /[category]/[subcategory] is the TAGS.md form when a parent exists.
      if (sub0.parentSlug) {
        const combo = `${sub0.parentSlug}/${sub0.slug}`;
        if (index.open.has(combo)) return {kind: 'narrow', redirectTo: `/${combo}`, filters: []};
      }
      return narrowRedirect('/', [{type: 'sub', ...sub0}]);
    }
    const listing = index.listingBySlug.get(segs[0]);
    if (listing?.county?.slug && listing.city?.slug) {
      return {
        kind: 'narrow',
        redirectTo: `/${listing.county.slug}/${listing.city.slug}/${listing.slug}`,
        filters: [],
      };
    }
    return {kind: 'invalid', redirectTo: fallback};
  }

  // Interpret the multi-segment grammar; `filters` carry the chips.
  let filters: PathFilter[] | null = null;
  if (segs.length === 2) {
    if (county[0] && city[0]) filters = [{type: 'county', ...county[0]}, {type: 'city', ...city[0]}];
    else if (cat && subAt(1)?.parentSlug === cat.slug) filters = [{type: 'sub', ...subAt(1)!}];
  } else if (segs.length === 3) {
    if (cat && subAt(1)?.parentSlug === cat.slug && county[1])
      filters = [{type: 'sub', ...subAt(1)!}, {type: 'county', ...county[1]}];
  } else if (segs.length === 4) {
    if (cat && subAt(1)?.parentSlug === cat.slug && county[1] && city[1])
      filters = [{type: 'sub', ...subAt(1)!}, {type: 'county', ...county[1]}, {type: 'city', ...city[1]}];
  }
  if (!filters) return {kind: 'invalid', redirectTo: fallback};

  return narrowRedirect(fallback, filters);
}

/** Client-side filter widening (chip removal): the listing rows for an
 * arbitrary combination — ungated, never creates URLs. */
export interface ComboFilters {
  cat?: string;
  sub?: string;
  county?: string;
  city?: string;
}

export async function getRowsForCombo(
  filters: ComboFilters,
): Promise<{businesses: HubBusiness[]; cities: HubCity[]; total: number}> {
  const rows = await fetchIndex();
  const hit = rows.filter(
    (row) =>
      (!filters.cat || row.subcategory?.parent?.slug === filters.cat) &&
      (!filters.sub || row.subcategory?.slug === filters.sub) &&
      (!filters.county || row.county?.slug === filters.county) &&
      (!filters.city || row.city?.slug === filters.city),
  );
  return {businesses: hit.map(toHubBusiness), cities: citiesOf(hit), total: rows.length};
}

/** Best directory URL for a (category, subcategory, county, city) selection,
 * computed against the live gate. Reuses the same open-gate set that drives
 * every route + the sitemap, so an option link on the Hero points exactly
 * where the directory will serve it. No query strings; the path is the
 * state (HUB-DIRECTORY-RESEARCH.md).
 *
 * Always returns a working URL:
 *  - the gate path for that combo if it exists
 *  - the longest gate-passing ancestor with `?af=` chips carrying the
 *    requested scope (HUB-DIRECTORY-RESEARCH.md tier-2) when only the
 *    entities are valid but the gate hasn't approved the combo
 *  - the hub root with `?af=` chips when no gate ancestor exists yet
 *    (the user is first to scope this combo; landing at the hub activates
 *    the chips client-side and the page works end-to-end)
 *
 * No bare tag URL is ever returned. The Hero option link is always a
 * clickable, indexable path. */
export function directoryPathFor(
  sel: { cat?: string; sub?: string; county?: string; city?: string },
  labelBy: Partial<Record<'cat' | 'sub' | 'county' | 'city', string>> = {},
): string {
  const { cat, sub, county, city } = sel;
  // Geographic selections can stand alone (for example, a county card on
  // the home page). Type selections retain their ordered hierarchy.
  const path = cat
    ? [cat, sub, county, city].filter((seg, i, arr) => seg && arr.slice(0, i).every((p) => Boolean(p)))
    : [county, city].filter((seg, i, arr) => seg && arr.slice(0, i).every((p) => Boolean(p)));
  if (!path.length) return '/';
  // Gate approves the full combo → plain path.
  if (gateOpenSync(path.join('/'))) return `/${path.join('/')}`;
  // Tier-2 fallback: nearest open ancestor + `?af=` chips for the full
  // requested scope. If no open ancestor exists yet, land on the hub root
  // with `?af=` so the user gets a working page (HUB-DIRECTORY-RESEARCH.md
  // is silent on the empty-gate case; landing on `/` with `?af=` chips is
  // the same UX the resolver produces for tier-3 "unresolvable" slugs).
  const requested = [cat, sub, county, city].filter(Boolean) as Array<'cat' | 'sub' | 'county' | 'city'>;
  const label = (k: 'cat' | 'sub' | 'county' | 'city', v: string | undefined) =>
    labelBy[k] ?? v?.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) ?? '';
  const af = requested.map((k) => `${k}~${k === 'cat' ? cat : k === 'sub' ? sub : k === 'county' ? county : city}~${label(k, k === 'cat' ? cat : k === 'sub' ? sub : k === 'county' ? county : city)}`).join(',');
  for (let i = requested.length - 1; i >= 0; i -= 1) {
    if (gateOpenSync(path.slice(0, i).join('/'))) {
      const base = path.slice(0, i).join('/');
      const basePath = base ? `/${base}` : '/';
      return af ? `${basePath}?af=${encodeURIComponent(af)}` : basePath;
    }
  }
  return af ? `/?af=${encodeURIComponent(af)}` : '/';
}

/** Sync gate check used by the URL builder at render time (the async
 * `resolveDirectoryPath` reuses the same index for the actual route). */
function gateOpenSync(path: string): boolean {
  if (!path) return true;
  return gateIndexCache.has(path);
}
let gateIndexCache: Set<string> = new Set();

/** The URL to use from the Hero dropdown options. Each link is computed
 * server-side from the same `directoryPathFor` helper, so what the user
 * sees in the address bar after clicking matches what the gate serves. */
export async function directoryOptionHrefs(
  counties: { slug: string; label: string }[],
  categories: { slug: string; label: string }[],
): Promise<{
  counties: Record<string, string>;
  categories: Record<string, string>;
}> {
  const index = await buildDirectoryIndex();
  gateIndexCache = new Set([...index.open.keys()]);
  const countyLabelBy: Record<string, string> = {};
  for (const c of counties) countyLabelBy[c.slug] = c.label;
  const categoryLabelBy: Record<string, string> = {};
  for (const c of categories) categoryLabelBy[c.slug] = c.label;
  // The labelBy map is keyed by the chip *type* ('cat' / 'county' / etc.),
  // not by slug — so we look up by type, then pull the matching CMS label.
  const withCounty = (slug: string) => {
    const label = countyLabelBy[slug] ?? slug;
    return directoryPathFor({ county: slug }, { county: label });
  };
  const withCategory = (slug: string) => {
    const label = categoryLabelBy[slug] ?? slug;
    return directoryPathFor({ cat: slug }, { cat: label });
  };
  const countiesHref: Record<string, string> = {};
  for (const c of counties) countiesHref[c.slug] = withCounty(c.slug);
  const categoriesHref: Record<string, string> = {};
  for (const c of categories) categoriesHref[c.slug] = withCategory(c.slug);
  return { counties: countiesHref, categories: categoriesHref };
}
