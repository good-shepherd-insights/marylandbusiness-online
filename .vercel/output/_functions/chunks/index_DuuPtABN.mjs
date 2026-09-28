import { r as __exportAll } from "./rolldown-runtime_DWOOXAbm.mjs";
import { N as createAstro, b as renderTemplate, f as renderComponent, x as maybeRenderHead } from "./jsx-runtime_CgLb4yc8.mjs";
import { t as createComponent } from "./astro-component_D1QvgdDd.mjs";
import "./page-ssr_CDjLlKbJ.mjs";
import "./compiler_DxiFqWHW.mjs";
import { t as $$BaseLayout } from "./BaseLayout_D7NwmmmV.mjs";
import { a as getDirectoryPage, f as getSiteSettings } from "./queries_BlgXXG8z.mjs";
import { n as $$Navbar, t as $$Footer } from "./sora_B4VQ4_VB.mjs";
import { c as resolveDirectoryPath, n as getCategoryOptions, r as getCountyOptions } from "./paths_PJNqNWPZ.mjs";
import { n as $$HubDiscovery, r as $$HubHeader, t as $$HubBasic } from "./HubBasic_DOjFtIf5.mjs";
import { perspectiveCookieName } from "@sanity/preview-url-secret/constants";
//#region src/pages/[category]/[subcategory]/[county]/[city]/index.astro
var _city__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://marylandbusiness.online");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const { category, subcategory, county, city } = Astro.params;
	const perspectiveCookie = Astro.cookies.get(perspectiveCookieName)?.value;
	const settings = await getSiteSettings(perspectiveCookie);
	const [countyOptions, categoryOptions] = await Promise.all([getCountyOptions(), getCategoryOptions()]);
	const dir = await resolveDirectoryPath(`${category}/${subcategory}/${county}/${city}`);
	const view = dir?.kind === "open" ? dir.view : void 0;
	const directoryPage = view ? await getDirectoryPage(perspectiveCookie) : void 0;
	const hasChrome = Boolean(view && directoryPage?.hubHeader && directoryPage.hubDiscovery);
	if (dir?.kind === "narrow" || dir?.kind === "invalid") return new Response(null, {
		status: 301,
		headers: { Location: dir.redirectTo }
	});
	if (!view) return new Response(null, {
		status: 301,
		headers: { Location: "/" }
	});
	return renderTemplate`${hasChrome && view ? renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": `${view.hub.label} ${directoryPage.hubHeader?.headingSuffix ?? ""}`.trim(),
		"description": view.state.description ?? void 0,
		"slug": city
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="hub-page min-h-dvh bg-[#FAF7F2] flex flex-col overflow-hidden" style="font-family: 'Sora Variable', 'Sora', sans-serif;">${settings && renderTemplate`${renderComponent($$result, "Navbar", $$Navbar, { "settings": settings })}`}${renderComponent($$result, "HubHeader", $$HubHeader, {
		"header": directoryPage.hubHeader,
		"label": view.hub.label,
		"stats": view.hub.stats
	})}${renderComponent($$result, "HubDiscovery", $$HubDiscovery, {
		"discovery": directoryPage.hubDiscovery,
		"hub": view.hub,
		"filters": view.filters,
		"counties": countyOptions,
		"categories": categoryOptions
	})}${settings && renderTemplate`${renderComponent($$result, "Footer", $$Footer, { "settings": settings })}`}</div>` })}` : view ? renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": view.hub.label,
		"description": view.state.description ?? void 0,
		"slug": city
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "HubBasic", $$HubBasic, {
		"label": view.hub.label,
		"description": view.state.description,
		"hub": view.hub
	})}${settings && renderTemplate`${renderComponent($$result, "Footer", $$Footer, { "settings": settings })}`}` })}` : null}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/pages/[category]/[subcategory]/[county]/[city]/index.astro", void 0);
var $$file = "/Users/dev/Projects/marylandbusiness-online/src/pages/[category]/[subcategory]/[county]/[city]/index.astro";
var $$url = "/[category]/[subcategory]/[county]/[city]";
//#endregion
//#region \0virtual:astro:page:src/pages/[category]/[subcategory]/[county]/[city]/index@_@astro
var page = () => _city__exports;
//#endregion
export { page };
