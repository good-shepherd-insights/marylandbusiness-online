import { r as __exportAll } from "./rolldown-runtime_DWOOXAbm.mjs";
import { N as createAstro, b as renderTemplate, f as renderComponent, m as Fragment, x as maybeRenderHead } from "./jsx-runtime_CgLb4yc8.mjs";
import { t as createComponent } from "./astro-component_D1QvgdDd.mjs";
import "./page-ssr_CDjLlKbJ.mjs";
import "./compiler_DxiFqWHW.mjs";
import { t as $$PortableText } from "./lib_DGRe2E4_.mjs";
import { t as $$BaseLayout } from "./BaseLayout_Cjk47rbK.mjs";
import { a as getDirectoryPage, c as getListing, f as getSiteSettings } from "./queries_BlgXXG8z.mjs";
import { n as $$Navbar, t as $$Footer } from "./sora_YXIr58-4.mjs";
import { t as $$Listing } from "./Listing_ztzGp7EH.mjs";
import { c as resolveDirectoryPath, n as getCategoryOptions, r as getCountyOptions } from "./paths_PJNqNWPZ.mjs";
import { n as $$HubDiscovery, r as $$HubHeader, t as $$HubBasic } from "./HubBasic_Cqv7cVFq.mjs";
import { perspectiveCookieName } from "@sanity/preview-url-secret/constants";
//#region src/pages/[category]/[subcategory]/[county]/index.astro
var _county__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://marylandbusiness.online");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const { category, subcategory, county } = Astro.params;
	const perspectiveCookie = Astro.cookies.get(perspectiveCookieName)?.value;
	const settings = await getSiteSettings(perspectiveCookie);
	const [countyOptions, categoryOptions] = await Promise.all([getCountyOptions(), getCategoryOptions()]);
	const dir = await resolveDirectoryPath(`${category}/${subcategory}/${county}`);
	const view = dir?.kind === "open" ? dir.view : void 0;
	const directoryPage = view ? await getDirectoryPage(perspectiveCookie) : void 0;
	Boolean(view && directoryPage?.hubHeader && directoryPage.hubDiscovery);
	if (dir?.kind === "narrow") return new Response(null, {
		status: 301,
		headers: { Location: dir.redirectTo }
	});
	const listing = view ? null : await getListing(county ?? "", perspectiveCookie);
	const matches = listing && listing.county?.slug?.current === category && listing.city?.slug?.current === subcategory;
	if (!view && (!listing || !matches)) {
		const geo = await resolveDirectoryPath(`${category}/${subcategory}`);
		const loc = geo.kind === "open" ? `/${geo.path}` : geo.kind === "narrow" ? geo.redirectTo.split("?")[0] : geo.redirectTo;
		return new Response(null, {
			status: 301,
			headers: { Location: loc }
		});
	}
	return renderTemplate`${renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`hasChrome && view ? (${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": `${view.hub.label} ${directoryPage.hubHeader?.headingSuffix ?? ""}`.trim(),
		"description": view.state.description ?? void 0,
		"slug": county
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
	})}</div>` })}) : view ? (${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": view.hub.label,
		"description": view.state.description ?? void 0,
		"slug": county
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "HubBasic", $$HubBasic, {
		"label": view.hub.label,
		"description": view.state.description,
		"hub": view.hub
	})}` })}) : (${renderComponent($$result, "Listing", $$Listing, {
		"frontmatter": listing,
		"slug": county ?? ""
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "PortableText", $$PortableText, { "value": listing.about ?? [] })}` })})${settings && renderTemplate`${renderComponent($$result, "Footer", $$Footer, { "settings": settings })}`}` })}`}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/pages/[category]/[subcategory]/[county]/index.astro", void 0);
var $$file = "/Users/dev/Projects/marylandbusiness-online/src/pages/[category]/[subcategory]/[county]/index.astro";
var $$url = "/[category]/[subcategory]/[county]";
//#endregion
//#region \0virtual:astro:page:src/pages/[category]/[subcategory]/[county]/index@_@astro
var page = () => _county__exports;
//#endregion
export { page };
