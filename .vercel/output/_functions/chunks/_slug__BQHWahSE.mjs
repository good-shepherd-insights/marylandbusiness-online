import { r as __exportAll } from "./rolldown-runtime_DWOOXAbm.mjs";
import { N as createAstro, _ as renderSlot, b as renderTemplate, f as renderComponent, x as maybeRenderHead } from "./jsx-runtime_CgLb4yc8.mjs";
import { t as createComponent } from "./astro-component_D1QvgdDd.mjs";
import "./page-ssr_CDjLlKbJ.mjs";
import "./compiler_DxiFqWHW.mjs";
import { t as $$PortableText } from "./lib_DGRe2E4_.mjs";
import { t as $$BaseLayout } from "./BaseLayout_D7NwmmmV.mjs";
import { f as getSiteSettings, n as getBlogPost, p as themeConfig_default } from "./queries_BlgXXG8z.mjs";
import { n as $$Prose, t as $$AppShell } from "./AppShell_ROKySnsH.mjs";
import { perspectiveCookieName } from "@sanity/preview-url-secret/constants";
//#region src/layouts/Article.astro
createAstro("https://marylandbusiness.online");
var $$Article = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Article;
	const { frontmatter, slug } = Astro.props;
	const settings = await getSiteSettings();
	const title = frontmatter?.title || settings?.siteTitle || themeConfig_default.general.title;
	const description = frontmatter?.description;
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": title,
		"description": description,
		"slug": slug
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "AppShell", $$AppShell, {}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="max-w-2xl w-full mx-auto py-20">${renderComponent($$result, "AppProse", $$Prose, {}, { "default": ($$result) => renderTemplate`${renderSlot($$result, $$slots["default"])}` })}</div>` })}` })}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/layouts/Article.astro", void 0);
//#endregion
//#region src/pages/blog/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://marylandbusiness.online");
var $$Slug = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const perspectiveCookie = Astro.cookies.get(perspectiveCookieName)?.value;
	const { slug } = Astro.params;
	const entry = slug ? await getBlogPost(slug, perspectiveCookie) : void 0;
	if (!entry) return Astro.redirect("/404");
	return renderTemplate`${renderComponent($$result, "Article", $$Article, {
		"frontmatter": entry.data,
		"slug": slug
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "PortableText", $$PortableText, { "value": entry.body ?? [] })}` })}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/pages/blog/[slug].astro", void 0);
var $$file = "/Users/dev/Projects/marylandbusiness-online/src/pages/blog/[slug].astro";
var $$url = "/blog/[slug]";
//#endregion
//#region \0virtual:astro:page:src/pages/blog/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
