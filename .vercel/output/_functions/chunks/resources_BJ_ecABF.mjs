import { r as __exportAll } from "./rolldown-runtime_DWOOXAbm.mjs";
import { C as addAttribute, N as createAstro, b as renderTemplate, f as renderComponent, x as maybeRenderHead } from "./jsx-runtime_CgLb4yc8.mjs";
import { t as createComponent } from "./astro-component_D1QvgdDd.mjs";
import { t as renderScript } from "./script__Dvm899t.mjs";
import "./page-ssr_CDjLlKbJ.mjs";
import "./compiler_DxiFqWHW.mjs";
import { t as $$BaseLayout } from "./BaseLayout_D7NwmmmV.mjs";
import { d as getResourcesPage, f as getSiteSettings } from "./queries_BlgXXG8z.mjs";
import { t as $$Icon } from "./components_nK_Mjrbt.mjs";
import { n as $$Navbar, t as $$Footer } from "./sora_B4VQ4_VB.mjs";
import { a as getGeoCountyHubs } from "./paths_PJNqNWPZ.mjs";
import { perspectiveCookieName } from "@sanity/preview-url-secret/constants";
//#region src/components/sections/ResourcesIntro.astro
createAstro("https://marylandbusiness.online");
var $$ResourcesIntro = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ResourcesIntro;
	const { intro } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<section class="intro" data-astro-cid-b2vnbuhb><div class="wrap" data-astro-cid-b2vnbuhb><nav class="crumbs" data-astro-cid-b2vnbuhb><span data-astro-cid-b2vnbuhb>${intro.breadcrumbRoot}</span>${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:chevron-right",
		"class": "sep",
		"data-astro-cid-b2vnbuhb": true
	})}<span class="current" data-astro-cid-b2vnbuhb>${intro.title}</span></nav><div class="row" data-astro-cid-b2vnbuhb><div class="lede" data-astro-cid-b2vnbuhb><h1 data-astro-cid-b2vnbuhb>${intro.title}</h1><p data-astro-cid-b2vnbuhb>${intro.introText}</p></div><div class="counter" data-astro-cid-b2vnbuhb><span class="pulse" aria-hidden="true" data-astro-cid-b2vnbuhb></span><span class="counter-label" data-astro-cid-b2vnbuhb>${intro.indexedLabel}</span></div></div><div class="search" data-astro-cid-b2vnbuhb>${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:search",
		"class": "search-icon",
		"data-astro-cid-b2vnbuhb": true
	})}<input type="text"${addAttribute(intro.searchPlaceholder, "placeholder")} data-astro-cid-b2vnbuhb></div></div></section>`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/sections/ResourcesIntro.astro", void 0);
//#endregion
//#region src/components/sections/RegulatoryUpdates.astro
createAstro("https://marylandbusiness.online");
var $$RegulatoryUpdates = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$RegulatoryUpdates;
	const { section } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<section class="reg-updates" data-astro-cid-qurprclt><div class="wrap" data-astro-cid-qurprclt><div class="head" data-astro-cid-qurprclt><div data-astro-cid-qurprclt><span class="eyebrow" data-astro-cid-qurprclt>${section.eyebrow}</span><h2 data-astro-cid-qurprclt>${section.heading}</h2></div><a class="archive"${addAttribute(section.archiveUrl, "href")} data-astro-cid-qurprclt>${section.archiveLabel}</a></div><div class="filters" data-astro-cid-qurprclt>${section.filterLabels.map((label, i) => renderTemplate`<button${addAttribute(["filter", { active: i === 0 }], "class:list")} data-astro-cid-qurprclt>${label}</button>`)}</div><div class="feed" data-astro-cid-qurprclt>${(section.updates ?? []).map((update) => renderTemplate`<article class="update" data-astro-cid-qurprclt><div class="date" data-astro-cid-qurprclt><span class="date-caption" data-astro-cid-qurprclt>${section.dateCaption}</span><span class="date-value" data-astro-cid-qurprclt>${update.effectiveDateText}</span></div><div class="body" data-astro-cid-qurprclt><div class="badges" data-astro-cid-qurprclt><span${addAttribute(["jurisdiction", update.jurisdictionKind], "class:list")} data-astro-cid-qurprclt>${update.jurisdictionLabel}</span><span class="type-chip" data-astro-cid-qurprclt>${update.typeLabel}</span></div><h3 data-astro-cid-qurprclt>${update.title}</h3><p data-astro-cid-qurprclt>${update.description}</p><a class="notice"${addAttribute(update.url, "href")} target="_blank" rel="noopener noreferrer" data-astro-cid-qurprclt>${section.cardLinkLabel}${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:arrow-up-right",
		"class": "notice-icon",
		"data-astro-cid-qurprclt": true
	})}</a></div></article>`)}</div></div></section>`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/sections/RegulatoryUpdates.astro", void 0);
//#endregion
//#region src/components/sections/FeaturedPrograms.astro
createAstro("https://marylandbusiness.online");
var $$FeaturedPrograms = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$FeaturedPrograms;
	const { section } = Astro.props;
	const tintClass = {
		primary: "tint-primary",
		secondary: "tint-secondary",
		dark: "tint-dark"
	};
	return renderTemplate`${maybeRenderHead($$result)}<section class="featured-programs" data-astro-cid-k4uiygbz><div class="wrap" data-astro-cid-k4uiygbz><span class="eyebrow" data-astro-cid-k4uiygbz>${section.eyebrow}</span><h2 data-astro-cid-k4uiygbz>${section.heading}</h2><div class="grid" data-astro-cid-k4uiygbz>${(section.programs ?? []).map((program) => renderTemplate`<div class="card" data-astro-cid-k4uiygbz><div${addAttribute(["icon-box", tintClass[program.iconTint]], "class:list")} data-astro-cid-k4uiygbz>${renderComponent($$result, "Icon", $$Icon, {
		"name": `tabler:${program.icon}`,
		"class": "icon",
		"data-astro-cid-k4uiygbz": true
	})}</div><h3 data-astro-cid-k4uiygbz>${program.title}</h3><p data-astro-cid-k4uiygbz>${program.description}</p><a class="visit"${addAttribute(program.url, "href")} target="_blank" rel="noopener noreferrer" data-astro-cid-k4uiygbz>${section.cardLinkLabel}</a></div>`)}</div></div></section>`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/sections/FeaturedPrograms.astro", void 0);
//#endregion
//#region src/components/sections/CountyJump.astro
createAstro("https://marylandbusiness.online");
var $$CountyJump = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$CountyJump;
	const { section } = Astro.props;
	const hubs = await getGeoCountyHubs();
	return renderTemplate`${maybeRenderHead($$result)}<section class="county-jump"${addAttribute(section.heading ?? "Explore by County", "aria-label")} data-astro-cid-7sghmvu4><div class="wrap" data-astro-cid-7sghmvu4><h3 class="county-jump-heading" data-astro-cid-7sghmvu4>${section.heading}</h3><div class="chips" role="list" data-astro-cid-7sghmvu4>${hubs.map((hub) => renderTemplate`<a class="chip"${addAttribute(`/${hub.path}`, "href")} role="listitem" data-astro-cid-7sghmvu4>${hub.label}</a>`)}</div><div class="view-all-row" data-astro-cid-7sghmvu4><a class="view-all"${addAttribute(section.viewAllUrl, "href")} data-astro-cid-7sghmvu4>${section.viewAllLabel}${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:arrow-right",
		"class": "view-all-icon",
		"aria-hidden": "true",
		"data-astro-cid-7sghmvu4": true
	})}</a></div></div></section>`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/sections/CountyJump.astro", void 0);
//#endregion
//#region src/components/sections/ResourceDirectory.astro
createAstro("https://marylandbusiness.online");
var $$ResourceDirectory = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ResourceDirectory;
	const { section } = Astro.props;
	const badgeTintClass = {
		primary: "badge-primary",
		secondary: "badge-secondary",
		dark: "badge-dark"
	};
	const iconTintClass = {
		primary: "icon-tint-primary",
		secondary: "icon-tint-secondary"
	};
	return renderTemplate`${maybeRenderHead($$result)}<section class="directory" id="resource-directory" data-astro-cid-u5iy4xpx><div class="wrap" data-astro-cid-u5iy4xpx><div class="head" data-astro-cid-u5iy4xpx><h2 data-astro-cid-u5iy4xpx>${section.heading}</h2><span class="count" data-astro-cid-u5iy4xpx>${section.countLabel}</span><span class="count" data-visible-count hidden data-astro-cid-u5iy4xpx></span></div><div class="toolbar" data-astro-cid-u5iy4xpx><div class="toolbar-row" data-toolbar data-astro-cid-u5iy4xpx><div class="search" data-astro-cid-u5iy4xpx>${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:search",
		"class": "search-icon",
		"data-astro-cid-u5iy4xpx": true
	})}<input type="text"${addAttribute(section.searchPlaceholder, "placeholder")} data-astro-cid-u5iy4xpx></div><div class="selects" data-astro-cid-u5iy4xpx><div class="select-box" data-astro-cid-u5iy4xpx><select data-filter="jurisdiction"${addAttribute(section.jurisdictionOptions[0], "aria-label")} data-astro-cid-u5iy4xpx><option value="" data-astro-cid-u5iy4xpx>${section.jurisdictionOptions[0]}</option>${section.jurisdictionOptions.slice(1).map((option) => renderTemplate`<option${addAttribute(option, "value")} data-astro-cid-u5iy4xpx>${option}</option>`)}</select>${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:chevron-down",
		"class": "select-icon",
		"data-astro-cid-u5iy4xpx": true
	})}</div><div class="select-box" data-astro-cid-u5iy4xpx><select data-filter="type"${addAttribute(section.typeOptions[0], "aria-label")} data-astro-cid-u5iy4xpx><option value="" selected disabled hidden data-astro-cid-u5iy4xpx>${section.typeOptions[0]}</option>${section.typeOptions.slice(1).map((option) => renderTemplate`<option${addAttribute(option, "value")} data-astro-cid-u5iy4xpx>${option}</option>`)}</select>${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:chevron-down",
		"class": "select-icon",
		"data-astro-cid-u5iy4xpx": true
	})}</div><div class="select-box" data-astro-cid-u5iy4xpx><select data-filter="sort"${addAttribute(section.sortOptions[0], "aria-label")} data-astro-cid-u5iy4xpx>${section.sortOptions.map((option) => renderTemplate`<option data-astro-cid-u5iy4xpx>${option}</option>`)}</select>${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:chevron-down",
		"class": "select-icon",
		"data-astro-cid-u5iy4xpx": true
	})}</div><button class="reset" data-reset data-astro-cid-u5iy4xpx>${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:arrow-back-up",
		"class": "reset-icon",
		"data-astro-cid-u5iy4xpx": true
	})}${section.resetLabel}</button></div></div><div class="active-row" data-active-row hidden data-astro-cid-u5iy4xpx><span class="active-label" data-astro-cid-u5iy4xpx>Active:</span><span class="chips" data-active-chips data-astro-cid-u5iy4xpx></span></div></div><div class="layout" data-astro-cid-u5iy4xpx><aside class="rail" data-astro-cid-u5iy4xpx><div class="sticky" data-astro-cid-u5iy4xpx><h4 data-astro-cid-u5iy4xpx>${section.categoryHeading}</h4><nav class="categories" data-astro-cid-u5iy4xpx>${section.categories.map((category, i) => renderTemplate`<a href="#resources"${addAttribute(["category", { active: i === 0 }], "class:list")}${addAttribute(category, "data-category-filter")} data-astro-cid-u5iy4xpx>${category}</a>`)}</nav><h4 class="rail-gap" data-astro-cid-u5iy4xpx>${section.typeHeading}</h4><div class="type-options" data-astro-cid-u5iy4xpx>${section.railTypeOptions.map((type) => renderTemplate`<label class="type-option" data-astro-cid-u5iy4xpx><input type="checkbox"${addAttribute(type, "value")} data-type-checkbox data-astro-cid-u5iy4xpx>${type}</label>`)}</div><div class="calendar" data-astro-cid-u5iy4xpx><h4 class="calendar-heading" data-astro-cid-u5iy4xpx>${section.calendarHeading}</h4><div class="deadlines" data-astro-cid-u5iy4xpx>${(section.deadlines ?? []).map((deadline) => renderTemplate`<div class="deadline" data-astro-cid-u5iy4xpx><div data-astro-cid-u5iy4xpx><p class="deadline-title" data-astro-cid-u5iy4xpx>${deadline.title}</p><p class="deadline-org" data-astro-cid-u5iy4xpx>${deadline.org}</p></div><span class="deadline-date" data-astro-cid-u5iy4xpx>${deadline.dateLabel}</span></div>`)}</div></div></div></aside><div class="grid" data-astro-cid-u5iy4xpx>${(section.cards ?? []).map((card) => renderTemplate`<article class="card"${addAttribute(card.category, "data-category")}${addAttribute(card.typeBadge, "data-type")}${addAttribute(card.jurisdictionKind, "data-kind")}${addAttribute(`${card.title} ${card.jurisdiction} ${card.description}`.toLowerCase(), "data-search")} data-astro-cid-u5iy4xpx><div class="card-top" data-astro-cid-u5iy4xpx><div${addAttribute(["card-icon", iconTintClass[card.iconTint]], "class:list")} data-astro-cid-u5iy4xpx>${renderComponent($$result, "Icon", $$Icon, {
		"name": `tabler:${card.icon}`,
		"class": "card-icon-svg",
		"data-astro-cid-u5iy4xpx": true
	})}</div><span${addAttribute(["badge", badgeTintClass[card.badgeTint]], "class:list")} data-astro-cid-u5iy4xpx>${card.typeBadge}</span></div><h3 data-astro-cid-u5iy4xpx>${card.title}</h3><p class="jurisdiction" data-astro-cid-u5iy4xpx>${card.jurisdiction}</p><p class="description" data-astro-cid-u5iy4xpx>${card.description}</p><a class="visit"${addAttribute(card.url, "href")} target="_blank" rel="noopener noreferrer" data-astro-cid-u5iy4xpx>${section.cardLinkLabel}${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:arrow-right",
		"class": "visit-icon",
		"data-astro-cid-u5iy4xpx": true
	})}</a></article>`)}</div></div><div class="load-more-row" data-astro-cid-u5iy4xpx><button class="load-more" data-astro-cid-u5iy4xpx>${section.loadMoreLabel}</button></div></div></section>${renderScript($$result, "/Users/dev/Projects/marylandbusiness-online/src/components/sections/ResourceDirectory.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/sections/ResourceDirectory.astro", void 0);
//#endregion
//#region src/components/sections/AlertSignup.astro
createAstro("https://marylandbusiness.online");
var $$AlertSignup = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$AlertSignup;
	const { section } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<section class="alert-signup" data-astro-cid-mg3dgvel><div class="wrap" data-astro-cid-mg3dgvel>${renderComponent($$result, "Icon", $$Icon, {
		"name": `tabler:${section.icon}`,
		"class": "bell",
		"data-astro-cid-mg3dgvel": true
	})}<h2 data-astro-cid-mg3dgvel>${section.heading}</h2><p data-astro-cid-mg3dgvel>${section.description}</p><form class="form" method="post" action="#" data-astro-cid-mg3dgvel><input type="email"${addAttribute(section.emailPlaceholder, "placeholder")} data-astro-cid-mg3dgvel><button type="submit" data-astro-cid-mg3dgvel>${section.buttonLabel}</button></form></div></section>`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/sections/AlertSignup.astro", void 0);
//#endregion
//#region src/pages/resources.astro
var resources_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Resources,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://marylandbusiness.online");
var $$Resources = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Resources;
	const perspectiveCookie = Astro.cookies.get(perspectiveCookieName)?.value;
	const page = await getResourcesPage(perspectiveCookie);
	const settings = await getSiteSettings(perspectiveCookie);
	const hasContent = Boolean(page?.intro || page?.regulatoryUpdates || page?.featuredPrograms || page?.countyJump || page?.resourceDirectory || page?.alertSignup);
	if (!page || !hasContent) return new Response("Not found", { status: 404 });
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": ($$result) => renderTemplate`${settings && renderTemplate`${renderComponent($$result, "Navbar", $$Navbar, { "settings": settings })}`}${page.intro && renderTemplate`${renderComponent($$result, "ResourcesIntro", $$ResourcesIntro, { "intro": page.intro })}`}${page.regulatoryUpdates && renderTemplate`${renderComponent($$result, "RegulatoryUpdates", $$RegulatoryUpdates, { "section": page.regulatoryUpdates })}`}${page.featuredPrograms && renderTemplate`${renderComponent($$result, "FeaturedPrograms", $$FeaturedPrograms, { "section": page.featuredPrograms })}`}${page.countyJump && renderTemplate`${renderComponent($$result, "CountyJump", $$CountyJump, { "section": page.countyJump })}`}${page.resourceDirectory && renderTemplate`${renderComponent($$result, "ResourceDirectory", $$ResourceDirectory, { "section": page.resourceDirectory })}`}${page.alertSignup && renderTemplate`${renderComponent($$result, "AlertSignup", $$AlertSignup, { "section": page.alertSignup })}`}${settings && renderTemplate`${renderComponent($$result, "Footer", $$Footer, { "settings": settings })}`}` })}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/pages/resources.astro", void 0);
var $$file = "/Users/dev/Projects/marylandbusiness-online/src/pages/resources.astro";
var $$url = "/resources";
//#endregion
//#region \0virtual:astro:page:src/pages/resources@_@astro
var page = () => resources_exports;
//#endregion
export { page };
