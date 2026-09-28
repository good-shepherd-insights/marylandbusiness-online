import { t as loadQuery } from "./load-query_D2hfNkWw.mjs";
import { n as sanityImageUrl } from "./client_uFEOuo7D.mjs";
//#region src/lib/directory/paths.ts
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
/** Minimum listings per path level (0 listings → off, always). */
var MIN_LISTINGS = {
	"geo-county": 1,
	"geo-city": 1,
	type: 1,
	"type-county": 2,
	"type-city": 2
};
/** One listing row per path key it belongs to. */
function pathKeysOf(row) {
	const geo = [];
	const type = [];
	if (row.county) {
		geo.push(row.county.slug);
		if (row.city) geo.push(`${row.county.slug}/${row.city.slug}`);
	}
	if (row.subcategory) {
		const leaf = row.subcategory.slug;
		const parentSlug = row.subcategory.parent?.slug;
		const root = parentSlug ? `${parentSlug}/${leaf}` : leaf;
		type.push(root);
		if (row.county) {
			type.push(`${root}/${row.county.slug}`);
			if (row.city) type.push(`${root}/${row.county.slug}/${row.city.slug}`);
		}
	}
	return {
		geo,
		type
	};
}
/** Sanity slug fields arrive as {current} objects — flatten to strings. */
var normSlug = (s) => typeof s === "string" ? s : s?.current ?? "";
async function fetchIndex() {
	const listings = await loadQuery({ query: `*[_type == "listing" && defined(slug.current)]{
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
    }` });
	const normCombos = (c) => ({
		mode: c.mode,
		intro: c.intro,
		note: c.note,
		county: { slug: normSlug(c.county?.slug) },
		city: c.city ? { slug: normSlug(c.city?.slug) } : null
	});
	return (listings.data ?? []).map((row) => ({
		...row,
		slug: normSlug(row.slug),
		subcategory: row.subcategory ? {
			...row.subcategory,
			slug: normSlug(row.subcategory.slug),
			parent: row.subcategory.parent ? {
				slug: normSlug(row.subcategory.parent.slug),
				name: row.subcategory.parent.name,
				description: row.subcategory.parent.description
			} : null,
			combos: (row.subcategory.combos ?? []).map(normCombos)
		} : null,
		county: row.county ? {
			...row.county,
			slug: normSlug(row.county.slug)
		} : null,
		city: row.city ? {
			...row.city,
			slug: normSlug(row.city.slug)
		} : null
	}));
}
/** Compute the full path index: every candidate combination + gate state. */
async function buildDirectoryIndex() {
	const rows = await fetchIndex();
	const candidates = /* @__PURE__ */ new Map();
	const add = (path, kind, row, meta) => {
		const entry = candidates.get(path) ?? {
			kind,
			rows: [],
			meta
		};
		entry.rows.push(row);
		if (meta) entry.meta = meta;
		candidates.set(path, entry);
	};
	for (const row of rows) {
		if (row.subcategory?.parent?.slug) {
			const p = row.subcategory.parent;
			add(p.slug, "type", row, {
				_id: `parent-${p.slug}`,
				name: p.name,
				slug: p.slug,
				description: p.description
			});
		}
		const { geo, type } = pathKeysOf(row);
		for (const p of geo) add(p, p.includes("/") ? "geo-city" : "geo-county", row, p.includes("/") ? row.city ?? null : row.county ?? null);
		for (const p of type) {
			const depth = (p.match(/\//g)?.length ?? 0) + 1;
			add(p, depth <= 2 ? "type" : depth === 3 ? "type-county" : "type-city", row, row.subcategory);
		}
	}
	const states = [];
	const open = /* @__PURE__ */ new Map();
	const listingsByPath = /* @__PURE__ */ new Map();
	const listingBySlug = new Map(rows.map((row) => [row.slug, row]));
	for (const [path, { kind, rows: comboRows, meta }] of candidates) {
		const count = comboRows.length;
		const segs = path.split("/");
		const combo = kind === "type-county" || kind === "type-city" ? (meta?.combos ?? []).find((c) => c.county.slug === segs[2] && (c.city ? c.city.slug === segs[3] : kind === "type-county")) : void 0;
		const label = kind === "geo-county" ? comboRows[0].county?.name ?? path : kind === "geo-city" ? comboRows[0].city?.name ?? path : meta?.name ?? path;
		const description = kind === "geo-county" ? comboRows[0].county?.description ?? null : kind === "geo-city" ? comboRows[0].city?.description ?? null : meta?.description ?? null;
		const entityCopyOk = kind === "type-county" || kind === "type-city" ? true : Boolean(description && description.trim());
		const comboCopyOk = kind === "type-county" || kind === "type-city" ? Boolean(combo?.intro?.trim()) : true;
		const min = MIN_LISTINGS[kind];
		let status;
		let reason;
		if (combo?.mode === "exclude") {
			status = "off";
			reason = "excluded by combo override";
		} else if (combo?.mode === "include" && count > 0) {
			status = "on";
			reason = "included by combo override";
		} else if (count === 0) {
			status = "off";
			reason = "no listings";
		} else if (count < min) {
			status = "off";
			reason = `needs ${min} listings, has ${count}`;
		} else if (!entityCopyOk) {
			status = "off";
			reason = "missing entity description (unique copy)";
		} else if (!comboCopyOk) {
			status = "off";
			reason = "missing combo intro copy";
		} else {
			status = "on";
			reason = "mechanical gate passed";
		}
		const state = {
			path,
			kind,
			status,
			reason,
			count,
			label,
			description
		};
		states.push(state);
		if (status === "on") {
			open.set(path, state);
			listingsByPath.set(path, comboRows);
		}
	}
	states.sort((a, b) => a.path.localeCompare(b.path));
	return {
		states,
		open,
		listingsByPath,
		listingBySlug,
		rows
	};
}
/** Qualifying geo county hubs (sidebar / county pages). */
async function getGeoCountyHubs() {
	const { states } = await buildDirectoryIndex();
	return states.filter((s) => s.kind === "geo-county" && s.status === "on");
}
/** Qualifying type (category) hubs. */
async function getTypeHubs() {
	const { states } = await buildDirectoryIndex();
	return states.filter((s) => s.kind === "type" && s.status === "on");
}
/** All hub options for filter UIs: counties + categories that qualify. */
async function getFilterOptions() {
	return (await Promise.all([getGeoCountyHubs(), getTypeHubs()])).flat().map((s) => ({
		label: s.label,
		value: s.kind === "type" ? s.path.split("/").pop() : s.path.split("/")[0]
	}));
}
/** All county entities, alphabetical — the hub County dropdown options
* (tag eligibility is independent of listings). */
async function getCountyOptions() {
	const { data } = await loadQuery({ query: `*[_type == "county"] | order(name asc){name, "slug": slug.current}` });
	return (data ?? []).map((c) => ({
		label: c.name,
		slug: normSlug(c.slug)
	})).filter((c) => c.slug);
}
/** All categories, alphabetical — the hub Category dropdown options. */
async function getCategoryOptions() {
	const { data } = await loadQuery({ query: `*[_type == "category"] | order(name asc){name, "slug": slug.current}` });
	return (data ?? []).map((c) => ({
		label: c.name,
		slug: normSlug(c.slug)
	})).filter((c) => c.slug);
}
var pretty = (slug) => slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
/** HubBusiness wire shape for a row (rating computed, image URL baked). */
function toHubBusiness(row) {
	const ratings = (row.ratings ?? []).map((r) => r.rating ?? 0).filter((n) => n > 0);
	const reviewCount = ratings.length;
	return {
		_id: row._id,
		name: row.name,
		slug: { current: row.slug },
		description: row.description ?? void 0,
		image: row.image ?? void 0,
		imageUrl: row.image ? sanityImageUrl(row.image, { width: 200 }) : null,
		taxStatus: row.taxStatus ?? void 0,
		ctaPrimaryLabel: row.ctaPrimaryLabel ?? void 0,
		ctaPrimaryUrl: row.ctaPrimaryUrl ?? void 0,
		phone: row.phone ?? void 0,
		city: row.city ? {
			name: row.city.name,
			slug: row.city.slug
		} : null,
		county: row.county ? {
			name: row.county.name,
			slug: row.county.slug
		} : null,
		geo: row.geo ?? null,
		rating: reviewCount > 0 ? ratings.reduce((sum, n) => sum + n, 0) / reviewCount : 0,
		reviewCount,
		subcategory: row.subcategory ? {
			name: row.subcategory.name,
			slug: row.subcategory.slug,
			parent: row.subcategory.parent ? {
				name: row.subcategory.parent.name,
				slug: row.subcategory.parent.slug
			} : null
		} : null,
		priceRange: row.priceRange,
		hours: row.hours ?? null
	};
}
/** City rows with counts (Region Focus pane), busiest first. */
function citiesOf(rows) {
	const byCity = /* @__PURE__ */ new Map();
	for (const row of rows) {
		if (!row.city) continue;
		const hit = byCity.get(row.city.slug) ?? {
			name: row.city.name,
			slug: row.city.slug,
			count: 0
		};
		hit.count += 1;
		byCity.set(row.city.slug, hit);
	}
	return [...byCity.values()].sort((a, b) => b.count - a.count);
}
/** Entity display name for a slug, taken from the path's own rows. */
function nameOf(rows, pick) {
	for (const row of rows) {
		const name = pick(row);
		if (name) return name;
	}
}
/** Chips pre-applied by a gate-passing path: one per trailing segment the
* path fixes (county / city / subcategory). */
function pathFiltersOf(state, rows) {
	const segs = state.path.split("/");
	if (state.kind === "geo-county") return [{
		type: "county",
		slug: segs[0],
		label: nameOf(rows, (r) => r.county?.name) ?? pretty(segs[0])
	}];
	if (state.kind === "geo-city") return [{
		type: "county",
		slug: segs[0],
		label: nameOf(rows, (r) => r.county?.name) ?? pretty(segs[0])
	}, {
		type: "city",
		slug: segs[1],
		label: nameOf(rows, (r) => r.city?.name) ?? pretty(segs[1])
	}];
	if (state.kind === "type" && !state.path.includes("/")) return [{
		type: "cat",
		slug: segs[0],
		label: nameOf(rows, (r) => r.subcategory?.parent?.name) ?? pretty(segs[0])
	}];
	const sub = {
		type: "sub",
		slug: segs[1] ?? segs[0],
		label: nameOf(rows, (r) => r.subcategory?.name) ?? pretty(segs[1] ?? segs[0])
	};
	if (state.kind === "type") return [sub];
	const county = {
		type: "county",
		slug: segs[2],
		label: nameOf(rows, (r) => r.county?.name) ?? pretty(segs[2])
	};
	if (state.kind === "type-county") return [sub, county];
	return [
		sub,
		county,
		{
			type: "city",
			slug: segs[3],
			label: nameOf(rows, (r) => r.city?.name) ?? pretty(segs[3])
		}
	];
}
function hubForIndex(index, path) {
	const state = index.open.get(path);
	if (!state) return void 0;
	const rows = index.listingsByPath.get(path) ?? [];
	return {
		state,
		hub: hubDataOf(index, state.label, rows),
		filters: pathFiltersOf(state, rows)
	};
}
/** Real header stats, computed from the index every request — never
* stored, never faked: listings in scope, distinct cities, directory
* total. Keys match the client-side recomputation in HubDiscovery. */
function hubDataOf(index, label, rows) {
	const cities = citiesOf(rows);
	return {
		label,
		businesses: rows.map(toHubBusiness),
		cities,
		stats: [
			{
				value: String(rows.length),
				label: "Listings"
			},
			{
				value: String(cities.length),
				label: "Cities"
			},
			{
				value: String(index.rows.length),
				label: "Total"
			}
		]
	};
}
/** Hub view rooted at `/` — the landing for chip-carrying redirects whose
* segment has no gate path yet (zero-listing entities, bare categories).
* Scope: the whole directory; the `?af=` chips narrow it client-side. */
async function getGlobalHubView() {
	const index = await buildDirectoryIndex();
	const state = {
		path: "",
		kind: "type",
		status: "on",
		reason: "hub root",
		count: index.rows.length,
		label: "Directory",
		description: null
	};
	return {
		state,
		hub: hubDataOf(index, state.label, index.rows),
		filters: []
	};
}
var entityMeta = "{name, \"slug\": slug.current}";
async function resolveEntities(segs) {
	const [s0, s1 = "", s2 = "", s3 = ""] = segs;
	const { data } = await loadQuery({
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
		params: {
			s0,
			s1,
			s2,
			s3
		}
	});
	return data ?? void 0;
}
/** Slug resolved → {slug, label} chip parts; unresolved → undefined. */
var ent = (e) => e && e.slug ? {
	slug: e.slug,
	label: e.name ?? pretty(e.slug)
} : void 0;
var narrowRedirect = (base, filters) => ({
	kind: "narrow",
	redirectTo: filters.length ? `${base}?af=${encodeURIComponent(filters.map((f) => `${f.type}~${f.slug}~${f.label}`).join(","))}` : base,
	filters
});
/** Three-tier resolution for a requested directory path (route files).
* open → render the hub; narrow → 301 to the best gate path carrying the
* request (nearest ancestor + `?af=` chips, or a bare tag's own hub
* landing); invalid (no entity, no listing) → redirect, no chip. */
async function resolveDirectoryPath(path) {
	const segs = path.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);
	if (segs.length === 0 || segs.length > 4) return {
		kind: "invalid",
		redirectTo: "/"
	};
	const index = await buildDirectoryIndex();
	const view = hubForIndex(index, segs.join("/"));
	if (view) return {
		kind: "open",
		path: segs.join("/"),
		view
	};
	const fallback = (() => {
		for (let i = segs.length - 1; i >= 1; i -= 1) {
			const prefix = segs.slice(0, i).join("/");
			if (index.open.has(prefix)) return `/${prefix}`;
		}
		return "/";
	})();
	const ents = await resolveEntities(segs);
	if (!ents) return {
		kind: "invalid",
		redirectTo: fallback
	};
	const county = ents.county.map(ent);
	const city = ents.city.map(ent);
	const cat = ent(ents.cat);
	const subAt = (i) => {
		const raw = ents.sub[i];
		return raw && raw.slug ? {
			slug: raw.slug,
			label: raw.name ?? pretty(raw.slug),
			parentSlug: raw.parent?.slug ?? null
		} : void 0;
	};
	if (segs.length === 1) {
		const countyEnt = county[0];
		const cityEnt = ent(ents.city0);
		if (countyEnt) return narrowRedirect("/", [{
			type: "county",
			...countyEnt
		}]);
		if (cityEnt) {
			const hostRows = index.rows.filter((r) => r.city?.slug === cityEnt.slug && r.county?.slug);
			if (hostRows.length > 0) {
				const byCounty = /* @__PURE__ */ new Map();
				for (const r of hostRows) byCounty.set(r.county.slug, (byCounty.get(r.county.slug) ?? 0) + 1);
				let bestSlug = "";
				let bestCount = 0;
				for (const [slug, count] of byCounty) if (count > bestCount) {
					bestSlug = slug;
					bestCount = count;
				}
				const bestCounty = hostRows.find((r) => r.county?.slug === bestSlug).county;
				const combo = `${bestCounty.slug}/${cityEnt.slug}`;
				if (index.open.has(combo)) return {
					kind: "narrow",
					redirectTo: `/${combo}`,
					filters: []
				};
				return narrowRedirect("/", [{
					type: "county",
					slug: bestCounty.slug,
					label: bestCounty.name
				}, {
					type: "city",
					...cityEnt
				}]);
			}
			return narrowRedirect("/", [{
				type: "city",
				...cityEnt
			}]);
		}
		if (cat) return narrowRedirect("/", [{
			type: "cat",
			...cat
		}]);
		const sub0 = subAt(0);
		if (sub0) {
			if (sub0.parentSlug) {
				const combo = `${sub0.parentSlug}/${sub0.slug}`;
				if (index.open.has(combo)) return {
					kind: "narrow",
					redirectTo: `/${combo}`,
					filters: []
				};
			}
			return narrowRedirect("/", [{
				type: "sub",
				...sub0
			}]);
		}
		const listing = index.listingBySlug.get(segs[0]);
		if (listing?.county?.slug && listing.city?.slug) return {
			kind: "narrow",
			redirectTo: `/${listing.county.slug}/${listing.city.slug}/${listing.slug}`,
			filters: []
		};
		return {
			kind: "invalid",
			redirectTo: fallback
		};
	}
	let filters = null;
	if (segs.length === 2) {
		if (county[0] && city[0]) filters = [{
			type: "county",
			...county[0]
		}, {
			type: "city",
			...city[0]
		}];
		else if (cat && subAt(1)?.parentSlug === cat.slug) filters = [{
			type: "sub",
			...subAt(1)
		}];
	} else if (segs.length === 3) {
		if (cat && subAt(1)?.parentSlug === cat.slug && county[1]) filters = [{
			type: "sub",
			...subAt(1)
		}, {
			type: "county",
			...county[1]
		}];
	} else if (segs.length === 4) {
		if (cat && subAt(1)?.parentSlug === cat.slug && county[1] && city[1]) filters = [
			{
				type: "sub",
				...subAt(1)
			},
			{
				type: "county",
				...county[1]
			},
			{
				type: "city",
				...city[1]
			}
		];
	}
	if (!filters) return {
		kind: "invalid",
		redirectTo: fallback
	};
	return narrowRedirect(fallback, filters);
}
async function getRowsForCombo(filters) {
	const rows = await fetchIndex();
	const hit = rows.filter((row) => (!filters.cat || row.subcategory?.parent?.slug === filters.cat) && (!filters.sub || row.subcategory?.slug === filters.sub) && (!filters.county || row.county?.slug === filters.county) && (!filters.city || row.city?.slug === filters.city));
	return {
		businesses: hit.map(toHubBusiness),
		cities: citiesOf(hit),
		total: rows.length
	};
}
//#endregion
export { getGeoCountyHubs as a, resolveDirectoryPath as c, getFilterOptions as i, getCategoryOptions as n, getGlobalHubView as o, getCountyOptions as r, getRowsForCombo as s, buildDirectoryIndex as t };
