import { C as addAttribute, N as createAstro, b as renderTemplate, f as renderComponent, i as spreadAttributes, x as maybeRenderHead } from "./jsx-runtime_CgLb4yc8.mjs";
import { t as createComponent } from "./astro-component_D1QvgdDd.mjs";
import { t as renderScript } from "./script__Dvm899t.mjs";
import "./compiler_DxiFqWHW.mjs";
import { t as $$Icon } from "./components_nK_Mjrbt.mjs";
//#region src/components/sections/HubHeader.astro
createAstro("https://marylandbusiness.online");
var $$HubHeader = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$HubHeader;
	const { header, label, stats } = Astro.props;
	const statBlocks = stats && stats.length > 0 ? stats : header.stats ?? [];
	const hasContent = Boolean(header.breadcrumbRoot || header.liveBadgeLabel || label);
	return renderTemplate`${hasContent && renderTemplate`${maybeRenderHead($$result)}<header class="hub-header shrink-0" data-astro-cid-sqvfzu4f><div class="hub-header-inner" data-astro-cid-sqvfzu4f><div class="hub-header-main" data-astro-cid-sqvfzu4f><nav aria-label="Breadcrumb navigation" class="hub-breadcrumb" data-astro-cid-sqvfzu4f>${header.breadcrumbRoot && renderTemplate`<a href="/" class="hub-breadcrumb-root" data-astro-cid-sqvfzu4f>${header.breadcrumbRoot}</a>`}${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:chevron-right",
		"class": "hub-breadcrumb-sep",
		"aria-hidden": "true",
		"data-astro-cid-sqvfzu4f": true
	})}<span class="hub-breadcrumb-current" aria-current="page" data-astro-cid-sqvfzu4f>${label}</span></nav><div class="hub-title-row" data-astro-cid-sqvfzu4f><h1 class="hub-title" data-astro-cid-sqvfzu4f>${label}${header.headingSuffix ? ` ${header.headingSuffix}` : ""}</h1>${header.liveBadgeLabel && renderTemplate`<div class="hub-live-badge" role="status"${addAttribute(`${header.liveBadgeLabel} — directory is active`, "aria-label")} data-astro-cid-sqvfzu4f><span class="hub-live-dot" aria-hidden="true" data-astro-cid-sqvfzu4f><span class="hub-live-dot-core" data-astro-cid-sqvfzu4f></span></span><span class="hub-live-label" data-astro-cid-sqvfzu4f>${header.liveBadgeLabel}</span></div>`}</div></div>${statBlocks.length > 0 && renderTemplate`<div class="hub-stats" aria-label="Hub statistics" data-astro-cid-sqvfzu4f>${statBlocks.map((stat, index) => renderTemplate`<div class="hub-stat"${addAttribute(stat.primary || !stats && index === 1 ? "" : void 0, "data-stat-primary")} data-astro-cid-sqvfzu4f><span class="hub-stat-value"${addAttribute(index, "data-stat")} data-astro-cid-sqvfzu4f>${stat.value}</span><span class="hub-stat-label" data-astro-cid-sqvfzu4f>${stat.label}</span></div>`)}</div>`}</div></header>`}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/sections/HubHeader.astro", void 0);
//#endregion
//#region src/components/sections/HubDiscovery.astro
createAstro("https://marylandbusiness.online");
var $$HubDiscovery = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$HubDiscovery;
	const { discovery, hub, filters = [], counties = [], categories = [] } = Astro.props;
	const businesses = hub.businesses.filter((b) => b.name && b.slug);
	const mapPoints = businesses.filter((b) => typeof b.geo?.lat === "number" && typeof b.geo?.lng === "number").map((b) => ({
		id: b._id,
		name: b.name ?? "",
		lat: b.geo.lat,
		lng: b.geo.lng
	}));
	const canExpand = Boolean(discovery.interactiveMapLabel) && mapPoints.length > 0;
	const hasMapPoints = mapPoints.length > 0;
	function stars(rating) {
		const full = Math.floor(rating);
		return {
			full,
			half: rating - full >= .5
		};
	}
	const detailHref = (b) => b.county?.slug && b.city?.slug && b.slug?.current ? `/${b.county.slug}/${b.city.slug}/${b.slug.current}` : void 0;
	const rowAttrs = (b) => ({
		"data-row": true,
		"data-id": b._id,
		"data-name": b.name ?? "",
		"data-county": b.county?.slug ?? "",
		"data-city": b.city?.slug ?? "",
		"data-cat": b.subcategory?.parent?.slug || b.subcategory?.slug || "",
		"data-cat-label": b.subcategory?.parent?.name || b.subcategory?.name || "",
		"data-sub": b.subcategory?.slug ?? "",
		"data-slug": b.slug?.current ?? ""
	});
	return renderTemplate`${maybeRenderHead($$result)}<div class="hub-split flex flex-1 min-h-0 flex-col lg:flex-row overflow-hidden" data-hub${addAttribute(JSON.stringify(filters), "data-defaults")}${addAttribute(JSON.stringify(counties), "data-counties")}${addAttribute(JSON.stringify(categories), "data-categories")}${addAttribute(JSON.stringify(hub.stats), "data-initial-stats")} data-astro-cid-y7uj7gyq><!-- Map pane --><section id="hub-map-shell" data-map-shell class="hub-map relative overflow-hidden flex flex-col bg-[#F5F4F2] border-b border-[var(--border)] lg:border-b-0 h-[200px] shrink-0 lg:h-auto lg:shrink lg:flex-1" aria-label="Business locations map" data-astro-cid-y7uj7gyq><div data-gmap class="gmap absolute inset-0"${addAttribute(JSON.stringify(mapPoints), "data-points")} aria-hidden="true" data-astro-cid-y7uj7gyq></div><!-- Map-empty placeholder (E-2): shown when no geo data available -->${!hasMapPoints && renderTemplate`<div class="map-empty-state" data-astro-cid-y7uj7gyq>${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:map-off",
		"class": "w-8 h-8 mb-2 opacity-40",
		"aria-hidden": "true",
		"data-astro-cid-y7uj7gyq": true
	})}<p data-astro-cid-y7uj7gyq>No map locations available for this area</p></div>`}<div class="map-controls absolute top-6 left-6 z-10 hidden lg:flex flex-col gap-2" data-astro-cid-y7uj7gyq><div class="bg-white border border-[var(--border)] p-1 flex gap-1" data-astro-cid-y7uj7gyq>${discovery.mapToggleMapLabel && renderTemplate`<button type="button" data-maptype="roadmap" class="map-toggle-btn is-active" data-astro-cid-y7uj7gyq>${discovery.mapToggleMapLabel}</button>`}${discovery.mapToggleSatelliteLabel && renderTemplate`<button type="button" data-maptype="hybrid" class="map-toggle-btn" data-astro-cid-y7uj7gyq>${discovery.mapToggleSatelliteLabel}</button>`}</div>${discovery.regionFocusHeading && hub.cities.length > 0 && renderTemplate`<div class="region-focus hidden lg:block bg-white border border-[var(--border)] p-4 w-64" data-astro-cid-y7uj7gyq><h3 class="region-focus-heading" data-astro-cid-y7uj7gyq>${discovery.regionFocusHeading}</h3><div class="space-y-3" data-city-list data-astro-cid-y7uj7gyq>${hub.cities.map((city) => renderTemplate`<label class="city-label" data-astro-cid-y7uj7gyq><input type="checkbox" checked${addAttribute(city.slug, "data-city-check")} class="accent-[var(--primary)] w-4 h-4" data-astro-cid-y7uj7gyq><span class="city-label-text" data-astro-cid-y7uj7gyq>${city.name} (${city.count})</span></label>`)}</div></div>`}</div>${canExpand && renderTemplate`<button type="button" data-map-expand class="map-expand-btn z-10 lg:hidden" aria-controls="hub-map-shell"${addAttribute(`${discovery.interactiveMapLabel} — tap to expand`, "aria-label")} data-astro-cid-y7uj7gyq>${discovery.interactiveMapLabel}</button>`}${discovery.interactiveMapCloseLabel && renderTemplate`<button type="button" data-map-close class="map-close-btn z-[70]"${addAttribute(discovery.interactiveMapCloseLabel, "aria-label")} aria-controls="hub-map-shell" data-astro-cid-y7uj7gyq>${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:x",
		"class": "w-4 h-4",
		"aria-hidden": "true",
		"data-astro-cid-y7uj7gyq": true
	})}</button>`}</section><!-- List pane --><section class="hub-list-pane w-full lg:w-[500px] border-t lg:border-t-0 lg:border-l border-[var(--border)] bg-[#FAF7F2] flex flex-col" aria-label="Business directory" data-astro-cid-y7uj7gyq><!-- A-4: live status region for filter result announcements --><div role="status" aria-live="polite" aria-atomic="true" class="sr-only" data-status data-astro-cid-y7uj7gyq></div><!-- E-1: error banner (hidden by default; shown by JS on API fail) --><div class="hub-error-banner" data-error-banner hidden role="alert" data-astro-cid-y7uj7gyq>${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:alert-triangle",
		"class": "w-4 h-4 shrink-0",
		"aria-hidden": "true",
		"data-astro-cid-y7uj7gyq": true
	})}<span data-error-msg data-astro-cid-y7uj7gyq>Couldn't refresh results — showing previous list</span><button type="button" data-error-retry class="hub-error-retry" data-astro-cid-y7uj7gyq>Try again</button></div><!-- Mobile sticky filter bar --><div class="lg:hidden sticky top-0 z-40 bg-white border-b border-[var(--border)]" data-astro-cid-y7uj7gyq><div class="mobile-filter-bar" data-astro-cid-y7uj7gyq>${discovery.categoryFilterLabel && renderTemplate`<button type="button" data-cat-toggle id="cat-toggle-mobile" class="btn-outline whitespace-nowrap flex items-center gap-2" aria-expanded="false" aria-controls="cat-menu-mobile" data-astro-cid-y7uj7gyq>${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:filter",
		"class": "w-3 h-3",
		"aria-hidden": "true",
		"data-astro-cid-y7uj7gyq": true
	})}${discovery.categoryFilterLabel}</button>`}${counties.length > 0 && renderTemplate`<button type="button" data-county-toggle id="county-toggle-mobile" class="btn-outline whitespace-nowrap flex items-center gap-2" aria-expanded="false" aria-controls="county-menu-mobile" data-astro-cid-y7uj7gyq>${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:map-pin",
		"class": "w-3 h-3",
		"aria-hidden": "true",
		"data-astro-cid-y7uj7gyq": true
	})}${discovery.regionFocusHeading ?? "County"}</button>`}${discovery.clearFiltersLabel && renderTemplate`<button type="button" data-clear class="btn-outline whitespace-nowrap hub-clear-btn" data-astro-cid-y7uj7gyq>${discovery.clearFiltersLabel}</button>`}</div><!-- D-2: flex-wrap chips row (not overflow-x, so no clip) --><div class="px-3 pb-3 hidden" data-chips-mobile data-astro-cid-y7uj7gyq></div><div id="cat-menu-mobile" class="hidden border-t border-[var(--border)] p-3 max-h-[50vh] overflow-y-auto custom-scrollbar" data-cat-menu-mobile data-astro-cid-y7uj7gyq></div><div id="county-menu-mobile" class="hidden border-t border-[var(--border)] p-3 max-h-[50vh] overflow-y-auto custom-scrollbar" data-county-menu-mobile data-astro-cid-y7uj7gyq></div></div><!-- Desktop filter header --><div class="hidden lg:block p-6 border-b border-[var(--border)] shrink-0" data-astro-cid-y7uj7gyq><div class="flex items-center justify-between mb-5" data-astro-cid-y7uj7gyq>${discovery.browseHeading && renderTemplate`<h2 class="browse-heading" data-astro-cid-y7uj7gyq>${discovery.browseHeading} <span class="browse-count" data-count data-astro-cid-y7uj7gyq>0</span></h2>`}${discovery.clearFiltersLabel && renderTemplate`<button type="button" data-clear class="hub-clear-btn-desktop" data-astro-cid-y7uj7gyq>${discovery.clearFiltersLabel}</button>`}</div><div class="grid grid-cols-2 gap-2" data-astro-cid-y7uj7gyq>${discovery.categoryFilterLabel && renderTemplate`<div class="relative" data-astro-cid-y7uj7gyq><button type="button" data-cat-toggle id="cat-toggle-desktop" class="btn-outline w-full flex items-center gap-2 justify-center" aria-expanded="false" aria-controls="cat-menu-desktop" data-astro-cid-y7uj7gyq>${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:filter",
		"class": "w-3 h-3",
		"aria-hidden": "true",
		"data-astro-cid-y7uj7gyq": true
	})}${discovery.categoryFilterLabel}</button><div id="cat-menu-desktop" data-cat-menu class="hidden absolute top-full left-0 right-0 mt-1 bg-white border border-[var(--border)] z-30 max-h-64 overflow-y-auto custom-scrollbar" data-astro-cid-y7uj7gyq></div></div>`}${counties.length > 0 && renderTemplate`<div class="relative" data-astro-cid-y7uj7gyq><button type="button" data-county-toggle id="county-toggle-desktop" class="btn-outline w-full flex items-center gap-2 justify-center" aria-expanded="false" aria-controls="county-menu-desktop" data-astro-cid-y7uj7gyq>${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:map-pin",
		"class": "w-3 h-3",
		"aria-hidden": "true",
		"data-astro-cid-y7uj7gyq": true
	})}${discovery.regionFocusHeading ?? "County"}</button><div id="county-menu-desktop" data-county-menu class="hidden absolute top-full left-0 right-0 mt-1 bg-white border border-[var(--border)] z-30 max-h-64 overflow-y-auto custom-scrollbar" data-astro-cid-y7uj7gyq></div></div>`}</div><div class="mt-4 flex flex-col gap-2" data-chips-wrap data-astro-cid-y7uj7gyq><div class="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-[var(--muted-foreground)]" data-astro-cid-y7uj7gyq><span data-chips-label data-astro-cid-y7uj7gyq>No filters active · showing everything</span><span class="h-px flex-1 bg-[var(--border)]" data-astro-cid-y7uj7gyq></span></div><div class="flex flex-wrap gap-2" data-chips data-astro-cid-y7uj7gyq></div></div></div><!-- Business list --><div class="hub-list flex-1 overflow-y-auto custom-scrollbar" data-list aria-label="Business listings" data-astro-cid-y7uj7gyq>${businesses.map((b, idx) => {
		const s = stars(b.rating);
		const attrs = rowAttrs(b);
		const href = detailHref(b);
		const isFirst = idx === 0;
		return renderTemplate`<article class="business-list-item p-4 lg:p-6"${addAttribute(b._id, "data-biz")}${spreadAttributes(attrs)} data-astro-cid-y7uj7gyq><div class="flex gap-4 lg:gap-5" data-astro-cid-y7uj7gyq>${b.imageUrl && (href ? renderTemplate`<a${addAttribute(href, "href")} class="biz-img-wrap shrink-0" tabindex="-1" aria-hidden="true" data-astro-cid-y7uj7gyq><img class="biz-img"${addAttribute(b.imageUrl, "src")} alt=""${addAttribute(isFirst ? "eager" : "lazy", "loading")}${addAttribute(isFirst ? "high" : void 0, "fetchpriority")} data-astro-cid-y7uj7gyq></a>` : renderTemplate`<div class="biz-img-wrap shrink-0" data-astro-cid-y7uj7gyq><img class="biz-img"${addAttribute(b.imageUrl, "src")} alt=""${addAttribute(isFirst ? "eager" : "lazy", "loading")}${addAttribute(isFirst ? "high" : void 0, "fetchpriority")} data-astro-cid-y7uj7gyq></div>`)}<div class="flex-1 min-w-0" data-astro-cid-y7uj7gyq><div class="mb-1 lg:mb-2" data-astro-cid-y7uj7gyq>${b.name && (href ? renderTemplate`<a${addAttribute(href, "href")} class="biz-name" data-astro-cid-y7uj7gyq>${b.name}</a>` : renderTemplate`<span class="biz-name" data-astro-cid-y7uj7gyq>${b.name}</span>`)}</div>${b.reviewCount > 0 && renderTemplate`<div class="flex items-center gap-2 mb-2 lg:mb-3" data-astro-cid-y7uj7gyq><div class="yelp-rating flex items-center gap-px" role="img"${addAttribute(`${b.rating.toFixed(1)} out of 5 stars`, "aria-label")} data-astro-cid-y7uj7gyq>${Array.from({ length: 5 }).map((_, i) => renderTemplate`${renderComponent($$result, "Icon", $$Icon, {
			"name": i < s.full ? "tabler:star-filled" : i === s.full && s.half ? "tabler:star-half-filled" : "tabler:star",
			"class": `star-icon ${i < s.full || i === s.full && s.half ? "star-full" : "star-empty"}`,
			"aria-hidden": "true",
			"data-astro-cid-y7uj7gyq": true
		})}`)}</div><span class="rating-text" data-astro-cid-y7uj7gyq>${b.rating.toFixed(1)} <span class="rating-count" data-astro-cid-y7uj7gyq>(${b.reviewCount})</span></span></div>`}${b.description && renderTemplate`<p class="biz-description" data-astro-cid-y7uj7gyq>${b.description}</p>`}<div class="flex gap-2 items-center" data-astro-cid-y7uj7gyq>${b.ctaPrimaryLabel && b.ctaPrimaryUrl && renderTemplate`<a class="btn-primary flex-1"${addAttribute(b.ctaPrimaryUrl, "href")} data-astro-cid-y7uj7gyq>${b.ctaPrimaryLabel}</a>`}${b.phone && renderTemplate`<a class="phone-btn"${addAttribute(`tel:${b.phone.replace(/[^0-9+]/g, "")}`, "href")}${addAttribute(`Call ${b.name}`, "aria-label")} data-astro-cid-y7uj7gyq>${renderComponent($$result, "Icon", $$Icon, {
			"name": "tabler:phone",
			"class": "w-4 h-4",
			"aria-hidden": "true",
			"data-astro-cid-y7uj7gyq": true
		})}</a>`}</div></div></div></article>`;
	})}<div data-empty hidden class="p-10 text-center" data-astro-cid-y7uj7gyq>${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:search-off",
		"class": "w-8 h-8 mx-auto mb-3 text-[var(--border)]",
		"aria-hidden": "true",
		"data-astro-cid-y7uj7gyq": true
	})}<p class="empty-label" data-empty-labels data-astro-cid-y7uj7gyq></p><button type="button" data-empty-clear class="btn-outline px-6 mt-3" data-astro-cid-y7uj7gyq>${discovery.clearFiltersLabel}</button></div></div>${discovery.expertiseHeading && (discovery.expertiseStats?.length ?? 0) > 0 && renderTemplate`<div class="expertise-band p-5 bg-[#F3EFE8] border-t border-[var(--border)] shrink-0" data-astro-cid-y7uj7gyq><h3 class="expertise-heading" data-astro-cid-y7uj7gyq>${discovery.expertiseHeading}</h3><div class="flex flex-col gap-2 lg:grid lg:grid-cols-2 lg:gap-3" data-astro-cid-y7uj7gyq>${discovery.expertiseStats.map((stat) => renderTemplate`<div class="expertise-stat" data-astro-cid-y7uj7gyq><span class="expertise-stat-label" data-astro-cid-y7uj7gyq>${stat.label}</span><span class="expertise-stat-value" data-astro-cid-y7uj7gyq>${stat.value}</span></div>`)}</div></div>`}</section></div>${renderScript($$result, "/Users/dev/Projects/marylandbusiness-online/src/components/sections/HubDiscovery.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/sections/HubDiscovery.astro", void 0);
//#endregion
//#region src/components/sections/HubBasic.astro
createAstro("https://marylandbusiness.online");
var $$HubBasic = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$HubBasic;
	const { label, description, hub } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="min-h-dvh bg-[#FAF7F2] text-[#121212]" style="font-family: 'Sora Variable', 'Sora', sans-serif;"><div class="max-w-3xl mx-auto px-6 py-16"><h1 class="text-3xl lg:text-4xl font-extrabold uppercase tracking-tight">${label}</h1>${description && renderTemplate`<p class="mt-4 max-w-prose text-[#555] leading-relaxed">${description}</p>`}<ul class="mt-10 divide-y divide-[#e3e0dc] border-y border-[#e3e0dc]">${hub.businesses.map((b) => renderTemplate`<li class="py-4"><span class="block text-sm font-extrabold uppercase tracking-tight">${b.name}</span>${b.city?.name && renderTemplate`<span class="text-[10px] font-bold uppercase tracking-widest text-[#555]">${b.city.name}</span>`}${b.description && renderTemplate`<p class="mt-1 text-xs text-[#555] leading-relaxed">${b.description}</p>`}${b.ctaPrimaryUrl && renderTemplate`<a class="mt-2 inline-block text-[10px] font-bold uppercase tracking-widest text-[#9d2235]"${addAttribute(b.ctaPrimaryUrl, "href")}>${b.ctaPrimaryLabel}</a>`}</li>`)}</ul></div></div>`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/sections/HubBasic.astro", void 0);
//#endregion
export { $$HubDiscovery as n, $$HubHeader as r, $$HubBasic as t };
