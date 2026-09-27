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
	const { header, label } = Astro.props;
	const hasContent = Boolean(header.breadcrumbRoot || header.liveBadgeLabel || label);
	return renderTemplate`${hasContent && renderTemplate`${maybeRenderHead($$result)}<header class="hub-header shrink-0 bg-[#FAF7F2] border-b border-[var(--border)] px-6 py-6 lg:px-8" data-astro-cid-sqvfzu4f><div class="max-w-[1600px] mx-auto flex flex-col lg:flex-row justify-between lg:items-end gap-0 lg:gap-6" data-astro-cid-sqvfzu4f><div class="flex-1" data-astro-cid-sqvfzu4f><nav class="flex items-center gap-1 lg:gap-2 mb-2 lg:mb-3 text-[8px] lg:text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--foreground)]" data-astro-cid-sqvfzu4f>${header.breadcrumbRoot && renderTemplate`<a href="/" data-astro-cid-sqvfzu4f>${header.breadcrumbRoot}</a>`}${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:chevron-right",
		"class": "w-2 h-2 opacity-40",
		"data-astro-cid-sqvfzu4f": true
	})}<span class="text-[var(--primary)]" data-astro-cid-sqvfzu4f>${label}</span></nav><div class="flex items-center gap-4 mb-4 lg:mb-0" data-astro-cid-sqvfzu4f><h1 class="text-2xl lg:text-4xl font-extrabold text-[var(--card-foreground)] tracking-tight uppercase leading-tight" data-astro-cid-sqvfzu4f>${label}${header.headingSuffix ? ` ${header.headingSuffix}` : ""}</h1>${header.liveBadgeLabel && renderTemplate`<div class="hidden lg:flex bg-[var(--secondary)]/10 border border-[var(--secondary)]/20 px-3 py-1 items-center gap-2" data-astro-cid-sqvfzu4f><span class="relative flex h-2 w-2" data-astro-cid-sqvfzu4f><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" data-astro-cid-sqvfzu4f></span><span class="relative inline-flex rounded-full h-2 w-2 bg-green-500" data-astro-cid-sqvfzu4f></span></span><span class="text-[9px] font-bold text-[var(--card-foreground)] uppercase tracking-widest" data-astro-cid-sqvfzu4f>${header.liveBadgeLabel}</span></div>`}</div></div>${(header.stats?.length ?? 0) > 0 && renderTemplate`<div class="flex w-full lg:w-auto gap-4 lg:gap-12 border-t border-b lg:border-t-0 lg:border-b-0 border-[var(--border)] py-4 lg:py-0 lg:border-l lg:pl-12" data-astro-cid-sqvfzu4f>${header.stats.map((stat) => renderTemplate`<div class="hub-stat flex-1 lg:flex-none text-center" data-astro-cid-sqvfzu4f><span class="hub-stat-value block text-lg lg:text-xl font-extrabold text-[var(--card-foreground)]" data-astro-cid-sqvfzu4f>${stat.value}</span><span class="block text-[8px] lg:text-[9px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest" data-astro-cid-sqvfzu4f>${stat.label}</span></div>`)}</div>`}</div></header>`}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/sections/HubHeader.astro", void 0);
//#endregion
//#region src/components/sections/HubDiscovery.astro
createAstro("https://marylandbusiness.online");
var $$HubDiscovery = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$HubDiscovery;
	const { discovery, hub, filters = [], counties = [] } = Astro.props;
	const businesses = hub.businesses.filter((b) => b.name && b.slug);
	const mapPoints = businesses.filter((b) => typeof b.geo?.lat === "number" && typeof b.geo?.lng === "number").map((b) => ({
		id: b._id,
		name: b.name ?? "",
		lat: b.geo.lat,
		lng: b.geo.lng
	}));
	const canExpand = Boolean(discovery.interactiveMapLabel) && mapPoints.length > 0;
	function stars(rating) {
		const full = Math.floor(rating);
		return {
			full,
			half: rating - full >= .5
		};
	}
	const rowAttrs = (b) => ({
		"data-row": true,
		"data-id": b._id,
		"data-name": b.name ?? "",
		"data-county": b.county?.slug ?? "",
		"data-city": b.city?.slug ?? "",
		"data-cat": b.subcategory?.parent?.slug || b.subcategory?.slug || "",
		"data-cat-label": b.subcategory?.parent?.name || b.subcategory?.name || "",
		"data-sub": b.subcategory?.slug ?? ""
	});
	return renderTemplate`${maybeRenderHead($$result)}<div class="hub-split flex flex-1 min-h-0 flex-col lg:flex-row overflow-hidden" data-hub${addAttribute(JSON.stringify(filters), "data-defaults")}${addAttribute(JSON.stringify(counties), "data-counties")} data-astro-cid-y7uj7gyq><!-- Map pane: 200px strip on mobile (design 11), full pane on desktop (design 10) --><section data-map-shell class="hub-map relative overflow-hidden flex flex-col bg-[#F5F4F2] border-b border-[var(--border)] lg:border-b-0 h-[200px] shrink-0 lg:h-auto lg:shrink lg:flex-1" data-astro-cid-y7uj7gyq><div data-gmap class="gmap absolute inset-0"${addAttribute(JSON.stringify(mapPoints), "data-points")} aria-hidden="true" data-astro-cid-y7uj7gyq></div><div class="map-controls absolute top-6 left-6 z-10 hidden lg:flex flex-col gap-2" data-astro-cid-y7uj7gyq><div class="bg-white border border-[var(--border)] p-1 flex gap-1" data-astro-cid-y7uj7gyq>${discovery.mapToggleMapLabel && renderTemplate`<button type="button" data-maptype="roadmap" class="map-toggle-btn is-active px-4 py-2 text-[10px] font-bold uppercase tracking-widest" data-astro-cid-y7uj7gyq>${discovery.mapToggleMapLabel}</button>`}${discovery.mapToggleSatelliteLabel && renderTemplate`<button type="button" data-maptype="hybrid" class="map-toggle-btn px-4 py-2 text-[10px] font-bold uppercase tracking-widest" data-astro-cid-y7uj7gyq>${discovery.mapToggleSatelliteLabel}</button>`}</div>${discovery.regionFocusHeading && hub.cities.length > 0 && renderTemplate`<div class="region-focus hidden lg:block bg-white border border-[var(--border)] p-4 w-64 shadow-xl" data-astro-cid-y7uj7gyq><h4 class="text-[10px] font-extrabold uppercase tracking-widest mb-4 border-b pb-2" data-astro-cid-y7uj7gyq>${discovery.regionFocusHeading}</h4><div class="space-y-3" data-city-list data-astro-cid-y7uj7gyq>${hub.cities.map((city) => renderTemplate`<label class="flex items-center gap-3 cursor-pointer" data-astro-cid-y7uj7gyq><input type="checkbox" checked${addAttribute(city.slug, "data-city-check")} class="accent-[var(--primary)]" data-astro-cid-y7uj7gyq><span class="text-[10px] font-bold uppercase" data-astro-cid-y7uj7gyq>${city.name} (${city.count})</span></label>`)}</div></div>`}</div>${canExpand && renderTemplate`<button type="button" data-map-expand class="map-expand-btn z-10 lg:hidden" data-astro-cid-y7uj7gyq>${discovery.interactiveMapLabel}</button>`}${discovery.interactiveMapCloseLabel && renderTemplate`<button type="button" data-map-close class="map-close-btn z-[70]"${addAttribute(discovery.interactiveMapCloseLabel, "aria-label")} data-astro-cid-y7uj7gyq>${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:x",
		"class": "w-4 h-4",
		"data-astro-cid-y7uj7gyq": true
	})}</button>`}</section><!-- List pane --><aside class="hub-list-pane w-full lg:w-[500px] border-t lg:border-t-0 lg:border-l border-[var(--border)] bg-[#FAF7F2] flex flex-col" data-astro-cid-y7uj7gyq><!-- Mobile sticky filter bar (design 11, user-stated 2026-09-27) --><div class="lg:hidden sticky top-0 z-40 bg-white border-b border-[var(--border)]" data-astro-cid-y7uj7gyq><div class="p-3 flex gap-2 overflow-x-auto no-scrollbar" data-astro-cid-y7uj7gyq>${discovery.categoryFilterLabel && renderTemplate`<button type="button" data-cat-toggle class="btn-outline px-4 py-2 whitespace-nowrap flex items-center gap-2" aria-expanded="false" data-astro-cid-y7uj7gyq>${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:filter",
		"class": "w-[10px] h-[10px]",
		"data-astro-cid-y7uj7gyq": true
	})}${discovery.categoryFilterLabel}</button>`}${counties.length > 0 && renderTemplate`<button type="button" data-county-toggle class="btn-outline px-4 py-2 whitespace-nowrap flex items-center gap-2" aria-expanded="false" data-astro-cid-y7uj7gyq>${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:map-pin",
		"class": "w-[10px] h-[10px]",
		"data-astro-cid-y7uj7gyq": true
	})}${discovery.regionFocusHeading ?? "County"}</button>`}${discovery.clearFiltersLabel && renderTemplate`<button type="button" data-clear class="btn-outline px-4 py-2 whitespace-nowrap text-[var(--primary)]" data-astro-cid-y7uj7gyq>${discovery.clearFiltersLabel}</button>`}</div><div class="hidden px-3 pb-3 flex-wrap gap-2" data-chips-mobile data-astro-cid-y7uj7gyq></div><div class="hidden border-t border-[var(--border)] p-3" data-cat-menu-mobile data-astro-cid-y7uj7gyq></div><div class="hidden border-t border-[var(--border)] p-3" data-county-menu-mobile data-astro-cid-y7uj7gyq></div></div><!-- Desktop filter header (design 10, user-stated 2026-09-27: Category + County dropdowns, no price/open/verified) --><div class="hidden lg:block p-6 border-b border-[var(--border)] shrink-0" data-astro-cid-y7uj7gyq><div class="flex items-center justify-between mb-6" data-astro-cid-y7uj7gyq>${discovery.browseHeading && renderTemplate`<h2 class="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--card-foreground)]" data-astro-cid-y7uj7gyq>${discovery.browseHeading}</h2>`}${discovery.clearFiltersLabel && renderTemplate`<button type="button" data-clear class="text-[10px] font-bold text-[var(--primary)] uppercase tracking-widest" data-astro-cid-y7uj7gyq>${discovery.clearFiltersLabel}</button>`}</div><div class="grid grid-cols-2 gap-2" data-astro-cid-y7uj7gyq>${discovery.categoryFilterLabel && renderTemplate`<div class="relative" data-astro-cid-y7uj7gyq><button type="button" data-cat-toggle class="btn-outline py-3 w-full flex items-center gap-2 justify-center" aria-expanded="false" data-astro-cid-y7uj7gyq>${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:filter",
		"class": "w-[10px] h-[10px]",
		"data-astro-cid-y7uj7gyq": true
	})}${discovery.categoryFilterLabel}</button><div data-cat-menu class="hidden absolute top-full left-0 right-0 mt-1 bg-white border border-[var(--border)] z-30 max-h-64 overflow-y-auto custom-scrollbar" data-astro-cid-y7uj7gyq></div></div>`}${counties.length > 0 && renderTemplate`<div class="relative" data-astro-cid-y7uj7gyq><button type="button" data-county-toggle class="btn-outline py-3 w-full flex items-center gap-2 justify-center" aria-expanded="false" data-astro-cid-y7uj7gyq>${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:map-pin",
		"class": "w-[10px] h-[10px]",
		"data-astro-cid-y7uj7gyq": true
	})}${discovery.regionFocusHeading ?? "County"}</button><div data-county-menu class="hidden absolute top-full left-0 right-0 mt-1 bg-white border border-[var(--border)] z-30 max-h-64 overflow-y-auto custom-scrollbar" data-astro-cid-y7uj7gyq></div></div>`}</div><div class="mt-4 flex flex-wrap gap-2" data-astro-cid-y7uj7gyq><span class="contents" data-chips data-astro-cid-y7uj7gyq></span></div></div><div class="hub-list flex-1 overflow-y-auto custom-scrollbar" data-list data-astro-cid-y7uj7gyq>${businesses.map((b) => {
		const s = stars(b.rating);
		const attrs = rowAttrs(b);
		return renderTemplate`<article class="business-list-item p-4 lg:p-6"${addAttribute(b._id, "data-biz")}${spreadAttributes(attrs)} data-astro-cid-y7uj7gyq><div class="flex gap-4 lg:gap-6" data-astro-cid-y7uj7gyq>${b.imageUrl && renderTemplate`<div class="w-20 h-20 lg:w-24 lg:h-24 shrink-0 bg-[#F8F7F6] overflow-hidden border border-[var(--border)]" data-astro-cid-y7uj7gyq><img class="w-full h-full object-cover grayscale lg:grayscale-0"${addAttribute(b.imageUrl, "src")}${addAttribute(b.image?.alt ?? b.name ?? "", "alt")} loading="lazy" data-astro-cid-y7uj7gyq></div>`}<div class="flex-1 min-w-0" data-astro-cid-y7uj7gyq><div class="flex justify-between items-start mb-1 lg:mb-2 gap-2" data-astro-cid-y7uj7gyq>${b.name && renderTemplate`<h3 class="text-xs lg:text-sm font-extrabold text-[var(--card-foreground)] uppercase tracking-tight truncate" data-astro-cid-y7uj7gyq>${b.name}</h3>`}</div>${b.reviewCount > 0 && renderTemplate`<div class="flex items-center gap-2 mb-2 lg:mb-3" data-astro-cid-y7uj7gyq><div class="yelp-rating flex items-center gap-px" data-astro-cid-y7uj7gyq>${Array.from({ length: 5 }).map((_, i) => renderTemplate`${renderComponent($$result, "Icon", $$Icon, {
			"name": i < s.full ? "tabler:star" : i === s.full && s.half ? "tabler:star-half" : "tabler:star",
			"class": `w-[10px] lg:w-[11px] h-[10px] lg:h-[11px] ${i < s.full || i === s.full && s.half ? "star-full" : "star-empty"}`,
			"data-astro-cid-y7uj7gyq": true
		})}`)}</div><span class="text-[8px] lg:text-[9px] font-bold uppercase text-[var(--muted-foreground)] tracking-widest" data-astro-cid-y7uj7gyq>${b.rating.toFixed(1)} (${b.reviewCount})</span></div>`}${b.description && renderTemplate`<p class="text-[10px] lg:text-[11px] text-[var(--foreground)] mb-3 lg:mb-4 line-clamp-2 leading-relaxed" data-astro-cid-y7uj7gyq>${b.description}</p>`}<div class="flex gap-2" data-astro-cid-y7uj7gyq>${b.ctaPrimaryLabel && b.ctaPrimaryUrl && renderTemplate`<a class="btn-primary flex-1 py-2.5"${addAttribute(b.ctaPrimaryUrl, "href")} data-astro-cid-y7uj7gyq>${b.ctaPrimaryLabel}</a>`}${b.phone && renderTemplate`<a class="w-9 h-9 lg:w-10 lg:h-10 border border-[var(--border)] flex items-center justify-center text-[var(--card-foreground)] shrink-0"${addAttribute(`tel:${b.phone.replace(/[^0-9+]/g, "")}`, "href")}${addAttribute(b.name, "aria-label")} data-astro-cid-y7uj7gyq>${renderComponent($$result, "Icon", $$Icon, {
			"name": "tabler:phone",
			"class": "w-[10px] h-[10px]",
			"data-astro-cid-y7uj7gyq": true
		})}</a>`}</div></div></div></article>`;
	})}<div data-empty hidden class="p-10 text-center" data-astro-cid-y7uj7gyq><button type="button" data-empty-clear class="btn-outline px-6 py-3" data-astro-cid-y7uj7gyq>${discovery.clearFiltersLabel}</button></div></div>${discovery.expertiseHeading && (discovery.expertiseStats?.length ?? 0) > 0 && renderTemplate`<div class="p-6 bg-[#F3EFE8] border-t border-[var(--border)] shrink-0" data-astro-cid-y7uj7gyq><h4 class="text-[9px] lg:text-[10px] font-extrabold uppercase tracking-[0.2em] mb-4 text-[var(--primary)]" data-astro-cid-y7uj7gyq>${discovery.expertiseHeading}</h4><div class="flex flex-col gap-2 lg:grid lg:grid-cols-2 lg:gap-4" data-astro-cid-y7uj7gyq>${discovery.expertiseStats.map((stat) => renderTemplate`<div class="flex items-center justify-between gap-4 p-3 lg:block bg-white border border-[var(--border)]" data-astro-cid-y7uj7gyq><span class="block text-[8px] lg:text-[10px] font-extrabold uppercase tracking-widest text-[var(--muted-foreground)] lg:text-[var(--card-foreground)] lg:mb-1" data-astro-cid-y7uj7gyq>${stat.label}</span><span class="block text-[9px] lg:text-xs font-bold text-[var(--card-foreground)] text-right lg:text-left" data-astro-cid-y7uj7gyq>${stat.value}</span></div>`)}</div></div>`}</aside></div>${renderScript($$result, "/Users/dev/Projects/marylandbusiness-online/src/components/sections/HubDiscovery.astro?astro&type=script&index=0&lang.ts")}`;
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
