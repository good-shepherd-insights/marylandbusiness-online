import { C as addAttribute, N as createAstro, S as renderHead, _ as renderSlot, b as renderTemplate, f as renderComponent, m as Fragment } from "./jsx-runtime_CgLb4yc8.mjs";
import { t as createComponent } from "./astro-component_D1QvgdDd.mjs";
import { t as renderScript } from "./script__Dvm899t.mjs";
import "./compiler_DxiFqWHW.mjs";
import { f as getSiteSettings, p as themeConfig_default } from "./queries_BlgXXG8z.mjs";
import { perspectiveCookieName } from "@sanity/preview-url-secret/constants";
//#region src/components/analytics/Posthog.astro
var $$Posthog = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderScript($$result, "/Users/dev/Projects/marylandbusiness-online/src/components/analytics/Posthog.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/analytics/Posthog.astro", void 0);
//#endregion
//#region node_modules/.pnpm/astro@7.3.5_@types+node@26.6.2_@vercel+functions@3.9.9_ws@8.21.0__jiti@2.7.0_yaml@2.9.1/node_modules/astro/components/ClientRouter.astro
createAstro("https://marylandbusiness.online");
var $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ClientRouter;
	const { fallback = "animate" } = Astro.props;
	return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "/Users/dev/Projects/marylandbusiness-online/node_modules/.pnpm/astro@7.3.5_@types+node@26.6.2_@vercel+functions@3.9.9_ws@8.21.0__jiti@2.7.0_yaml@2.9.1/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/dev/Projects/marylandbusiness-online/node_modules/.pnpm/astro@7.3.5_@types+node@26.6.2_@vercel+functions@3.9.9_ws@8.21.0__jiti@2.7.0_yaml@2.9.1/node_modules/astro/components/ClientRouter.astro", void 0);
//#endregion
//#region src/util/getOGImage.ts
function getBasePath() {
	if (process.env.NODE_ENV === "development") return "http://localhost:4321";
	return process.env.PUBLIC_SITE_URL ?? "";
}
function getOGImage(slug, baseUrl) {
	return `${baseUrl ?? getBasePath()}/og/${slug}.png`;
}
//#endregion
//#region src/layouts/BaseLayout.astro
createAstro("https://marylandbusiness.online");
var $$BaseLayout = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$BaseLayout;
	const draftMode = Astro.cookies.has(perspectiveCookieName);
	const settings = await getSiteSettings(Astro.cookies.get(perspectiveCookieName)?.value);
	const { title, slug } = Astro.props;
	const siteTitle = settings?.siteTitle ?? themeConfig_default.general.title;
	const seoName = settings?.seoName ?? themeConfig_default.general.seo?.name;
	const seoDescription = settings?.seoDescription ?? themeConfig_default.general.seo?.description;
	const seoUrl = settings?.seoUrl ?? themeConfig_default.general.seo?.url;
	let seoDomain;
	try {
		seoDomain = seoUrl ? new URL(seoUrl).hostname : void 0;
	} catch {
		seoDomain = void 0;
	}
	const calculatedTitle = title || siteTitle;
	const ogSlug = slug ?? "index";
	return renderTemplate`<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="sitemap" href="/sitemap-index.xml"><meta name="generator"${addAttribute(Astro.generator, "content")}><title>${calculatedTitle}</title><meta name="description"${addAttribute(seoDescription, "content")}><!-- Facebook Meta Tags --><meta property="og:url"${addAttribute(seoUrl, "content")}><meta property="og:type" content="website"><meta property="og:title"${addAttribute(calculatedTitle, "content")}><meta property="og:description"${addAttribute(seoDescription, "content")}><meta property="og:image"${addAttribute(getOGImage(ogSlug, settings?.seoUrl), "content")}><!-- Twitter Meta Tags --><meta name="twitter:card" content="summary_large_image">${seoDomain && renderTemplate`<meta property="twitter:domain"${addAttribute(seoDomain, "content")}>`}<meta property="twitter:url"${addAttribute(seoUrl, "content")}><meta name="twitter:title"${addAttribute(seoName, "content")}><meta name="twitter:description"${addAttribute(seoDescription, "content")}><meta name="twitter:image"${addAttribute(getOGImage(ogSlug, settings?.seoUrl), "content")}>${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderHead($$result)}</head><body class="bg-white dark:bg-gray-900">${renderSlot($$result, $$slots["default"])}${renderComponent($$result, "Posthog", $$Posthog, {})}${draftMode && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "SanityVisualEditing", null, {
		"client:only": "react",
		"client:component-hydration": "only",
		"client:component-path": "@components/SanityVisualEditing",
		"client:component-export": "default"
	})}${renderComponent($$result, "DisableDraftMode", null, {
		"client:only": "react",
		"client:component-hydration": "only",
		"client:component-path": "@components/DisableDraftMode",
		"client:component-export": "default"
	})}` })}`}</body></html>`;
}, "/Users/dev/Projects/marylandbusiness-online/src/layouts/BaseLayout.astro", void 0);
//#endregion
export { $$BaseLayout as t };
