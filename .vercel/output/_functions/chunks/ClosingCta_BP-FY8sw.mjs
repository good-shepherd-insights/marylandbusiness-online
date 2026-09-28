import { C as addAttribute, N as createAstro, b as renderTemplate, f as renderComponent, x as maybeRenderHead } from "./jsx-runtime_CgLb4yc8.mjs";
import { t as createComponent } from "./astro-component_D1QvgdDd.mjs";
import "./compiler_DxiFqWHW.mjs";
import { t as $$Icon } from "./components_nK_Mjrbt.mjs";
import { n as sanityImageUrl } from "./client_uFEOuo7D.mjs";
//#region src/components/sections/AboutHeader.astro
createAstro("https://marylandbusiness.online");
var $$AboutHeader = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$AboutHeader;
	const { breadcrumbRoot, breadcrumbCurrent, badge, heading, intro } = Astro.props.header;
	return renderTemplate`${heading && renderTemplate`${maybeRenderHead($$result)}<header class="about-header" data-astro-cid-pprmy4l7><div class="about-header-inner" data-astro-cid-pprmy4l7>${(breadcrumbRoot || breadcrumbCurrent) && renderTemplate`<nav class="about-breadcrumb" aria-label="Breadcrumb" data-astro-cid-pprmy4l7>${breadcrumbRoot && renderTemplate`<span class="about-breadcrumb-root" data-astro-cid-pprmy4l7>${breadcrumbRoot}</span>`}${breadcrumbRoot && breadcrumbCurrent && renderTemplate`${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:chevron-right",
		"data-astro-cid-pprmy4l7": true
	})}`}${breadcrumbCurrent && renderTemplate`<span class="about-breadcrumb-current" data-astro-cid-pprmy4l7>${breadcrumbCurrent}</span>`}</nav>`}${badge && renderTemplate`<span class="about-badge" data-astro-cid-pprmy4l7>${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:flag",
		"data-astro-cid-pprmy4l7": true
	})}<span data-astro-cid-pprmy4l7>${badge}</span></span>`}<h1 data-astro-cid-pprmy4l7>${heading}</h1>${intro && renderTemplate`<p data-astro-cid-pprmy4l7>${intro}</p>`}</div></header>`}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/sections/AboutHeader.astro", void 0);
//#endregion
//#region src/components/sections/StatStrip.astro
createAstro("https://marylandbusiness.online");
var $$StatStrip = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$StatStrip;
	const { stats } = Astro.props.statStrip;
	const validStats = (stats ?? []).filter((s) => s.value);
	return renderTemplate`${validStats.length > 0 && renderTemplate`${maybeRenderHead($$result)}<section class="stat-strip" data-astro-cid-ohwsqlja><div class="stat-strip-inner" data-astro-cid-ohwsqlja>${validStats.map((stat) => renderTemplate`<div class="stat-item" data-astro-cid-ohwsqlja>${stat.value && renderTemplate`<span class="stat-value" data-astro-cid-ohwsqlja>${stat.value}</span>`}${stat.label && renderTemplate`<span class="stat-label" data-astro-cid-ohwsqlja>${stat.label}</span>`}</div>`)}</div></section>`}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/sections/StatStrip.astro", void 0);
//#endregion
//#region src/components/sections/Origin.astro
createAstro("https://marylandbusiness.online");
var $$Origin = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Origin;
	const { image, imageAlt, eyebrow, heading, paragraphs } = Astro.props.origin;
	const validParagraphs = (paragraphs ?? []).filter(Boolean);
	return renderTemplate`${(heading || validParagraphs.length > 0) && renderTemplate`${maybeRenderHead($$result)}<section class="origin" data-astro-cid-pxg22oht><div class="origin-inner" data-astro-cid-pxg22oht><div class="origin-grid" data-astro-cid-pxg22oht><div class="origin-media" data-astro-cid-pxg22oht>${image?.asset && renderTemplate`<img${addAttribute(sanityImageUrl(image, { width: 1200 }), "src")}${addAttribute(`${sanityImageUrl(image, { width: 600 })} 1x, ${sanityImageUrl(image, { width: 1200 })} 2x`, "srcset")}${addAttribute(imageAlt ?? "", "alt")} loading="lazy" data-astro-cid-pxg22oht>`}</div><div class="origin-content" data-astro-cid-pxg22oht>${eyebrow && renderTemplate`<span class="origin-eyebrow" data-astro-cid-pxg22oht>${eyebrow}</span>`}${heading && renderTemplate`<h2 data-astro-cid-pxg22oht>${heading}</h2>`}${validParagraphs.map((text) => text && renderTemplate`<p data-astro-cid-pxg22oht>${text}</p>`)}</div></div></div></section>`}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/sections/Origin.astro", void 0);
//#endregion
//#region src/components/sections/MissionBand.astro
createAstro("https://marylandbusiness.online");
var $$MissionBand = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$MissionBand;
	const { eyebrow, statement } = Astro.props.missionBand;
	return renderTemplate`${statement && renderTemplate`${maybeRenderHead($$result)}<section class="mission" data-astro-cid-45ievmhu><div class="mission-inner" data-astro-cid-45ievmhu>${eyebrow && renderTemplate`<span class="mission-eyebrow" data-astro-cid-45ievmhu>${eyebrow}</span>`}<p class="mission-statement" data-astro-cid-45ievmhu>${statement}</p></div></section>`}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/sections/MissionBand.astro", void 0);
//#endregion
//#region src/components/sections/VisionPillars.astro
createAstro("https://marylandbusiness.online");
var $$VisionPillars = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$VisionPillars;
	const { eyebrow, heading, description, pillars } = Astro.props.visionPillars;
	const validPillars = (pillars ?? []).filter((p) => p?.title);
	return renderTemplate`${(heading || validPillars.length > 0) && renderTemplate`${maybeRenderHead($$result)}<section class="pillars" data-astro-cid-r4wvnwhe><div class="pillars-inner" data-astro-cid-r4wvnwhe><div class="pillars-intro" data-astro-cid-r4wvnwhe>${eyebrow && renderTemplate`<span class="pillars-eyebrow" data-astro-cid-r4wvnwhe>${eyebrow}</span>`}${heading && renderTemplate`<h2 data-astro-cid-r4wvnwhe>${heading}</h2>`}${description && renderTemplate`<p data-astro-cid-r4wvnwhe>${description}</p>`}</div><div class="pillars-grid" data-astro-cid-r4wvnwhe>${validPillars.map((pillar, i) => {
		const defaultIcon = [
			"tabler:compass",
			"tabler:shield",
			"tabler:heart-handshake",
			"tabler:chart-arrows-vertical"
		][i % 4];
		const iconName = pillar.icon?.startsWith("tabler:") ? pillar.icon : defaultIcon;
		return renderTemplate`<div class="pillar-card" data-astro-cid-r4wvnwhe><div class="flex items-center gap-3 mb-4" data-astro-cid-r4wvnwhe><div class="pillar-icon shrink-0" data-astro-cid-r4wvnwhe>${renderComponent($$result, "Icon", $$Icon, {
			"name": iconName,
			"aria-hidden": "true",
			"data-astro-cid-r4wvnwhe": true
		})}</div>${pillar.title && renderTemplate`<h3 data-astro-cid-r4wvnwhe>${pillar.title}</h3>`}</div>${pillar.text && renderTemplate`<p data-astro-cid-r4wvnwhe>${pillar.text}</p>`}</div>`;
	})}</div></div></section>`}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/sections/VisionPillars.astro", void 0);
//#endregion
//#region src/components/sections/OfferArms.astro
createAstro("https://marylandbusiness.online");
var $$OfferArms = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$OfferArms;
	const { eyebrow, heading, arms } = Astro.props.offerArms;
	const validArms = (arms ?? []).filter((a) => a?.title);
	return renderTemplate`${validArms.length > 0 && renderTemplate`${maybeRenderHead($$result)}<section class="offers" data-astro-cid-t7niyqo2><div class="offers-inner" data-astro-cid-t7niyqo2><div class="offers-intro" data-astro-cid-t7niyqo2>${eyebrow && renderTemplate`<span class="offers-eyebrow" data-astro-cid-t7niyqo2>${eyebrow}</span>`}${heading && renderTemplate`<h2 data-astro-cid-t7niyqo2>${heading}</h2>`}</div><div class="offers-grid" data-astro-cid-t7niyqo2>${validArms.map((arm, i) => {
		const defaultIcon = [
			"tabler:rocket",
			"tabler:chart-bar",
			"tabler:world",
			"tabler:shield-check"
		][i % 4];
		const iconName = arm.icon?.startsWith("tabler:") ? arm.icon : defaultIcon;
		return renderTemplate`<div class="offer-card" data-astro-cid-t7niyqo2><div class="flex items-center gap-3 mb-4" data-astro-cid-t7niyqo2><div class="offer-icon shrink-0" data-astro-cid-t7niyqo2>${renderComponent($$result, "Icon", $$Icon, {
			"name": iconName,
			"aria-hidden": "true",
			"data-astro-cid-t7niyqo2": true
		})}</div>${arm.title && renderTemplate`<h3 data-astro-cid-t7niyqo2>${arm.title}</h3>`}</div>${arm.text && renderTemplate`<p data-astro-cid-t7niyqo2>${arm.text}</p>`}${arm.ctaLabel && arm.ctaLink && renderTemplate`<a class="offer-cta"${addAttribute(arm.ctaLink, "href")} data-astro-cid-t7niyqo2><span data-astro-cid-t7niyqo2>${arm.ctaLabel}</span>${renderComponent($$result, "Icon", $$Icon, {
			"name": "tabler:arrow-right",
			"aria-hidden": "true",
			"data-astro-cid-t7niyqo2": true
		})}</a>`}</div>`;
	})}</div></div></section>`}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/sections/OfferArms.astro", void 0);
//#endregion
//#region src/components/sections/Partnerships.astro
createAstro("https://marylandbusiness.online");
var $$Partnerships = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Partnerships;
	const { eyebrow, heading, description, ctaLabel, ctaLink, partners } = Astro.props.partnerships;
	const validPartners = (partners ?? []).filter((p) => p?.title);
	return renderTemplate`${(heading || validPartners.length > 0) && renderTemplate`${maybeRenderHead($$result)}<section class="partners" data-astro-cid-mspt366o><div class="partners-inner" data-astro-cid-mspt366o><div class="partners-grid" data-astro-cid-mspt366o><div class="partners-intro" data-astro-cid-mspt366o>${eyebrow && renderTemplate`<span class="partners-eyebrow" data-astro-cid-mspt366o>${eyebrow}</span>`}${heading && renderTemplate`<h2 data-astro-cid-mspt366o>${heading}</h2>`}${description && renderTemplate`<p data-astro-cid-mspt366o>${description}</p>`}${ctaLabel && ctaLink && renderTemplate`<a class="partners-cta"${addAttribute(ctaLink, "href")} data-astro-cid-mspt366o><span data-astro-cid-mspt366o>${ctaLabel}</span>${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:arrow-right",
		"data-astro-cid-mspt366o": true
	})}</a>`}</div><div class="partners-cards" data-astro-cid-mspt366o>${validPartners.map((partner, i) => {
		const defaultIcon = [
			"tabler:briefcase",
			"tabler:certificate",
			"tabler:building",
			"tabler:users"
		][i % 4];
		const iconName = partner.icon?.startsWith("tabler:") ? partner.icon : defaultIcon;
		return renderTemplate`<div class="partner-card" data-astro-cid-mspt366o><div class="flex items-center gap-3 mb-3" data-astro-cid-mspt366o><div class="partner-icon shrink-0" data-astro-cid-mspt366o>${renderComponent($$result, "Icon", $$Icon, {
			"name": iconName,
			"aria-hidden": "true",
			"data-astro-cid-mspt366o": true
		})}</div>${partner.title && renderTemplate`<h3 data-astro-cid-mspt366o>${partner.title}</h3>`}</div>${partner.text && renderTemplate`<p data-astro-cid-mspt366o>${partner.text}</p>`}</div>`;
	})}</div></div></div></section>`}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/sections/Partnerships.astro", void 0);
//#endregion
//#region src/components/sections/ClosingCta.astro
createAstro("https://marylandbusiness.online");
var $$ClosingCta = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ClosingCta;
	const { heading, primaryLabel, primaryLink, secondaryLabel, secondaryLink } = Astro.props.closingCta;
	return renderTemplate`${heading && renderTemplate`${maybeRenderHead($$result)}<section class="closing" data-astro-cid-752bvmt4><div class="closing-inner" data-astro-cid-752bvmt4><h2 data-astro-cid-752bvmt4>${heading}</h2><div class="closing-actions" data-astro-cid-752bvmt4>${primaryLabel && primaryLink && renderTemplate`<a class="closing-primary"${addAttribute(primaryLink, "href")} data-astro-cid-752bvmt4>${primaryLabel}</a>`}${secondaryLabel && secondaryLink && renderTemplate`<a class="closing-secondary"${addAttribute(secondaryLink, "href")} data-astro-cid-752bvmt4>${secondaryLabel}</a>`}</div></div></section>`}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/sections/ClosingCta.astro", void 0);
//#endregion
export { $$MissionBand as a, $$AboutHeader as c, $$VisionPillars as i, $$Partnerships as n, $$Origin as o, $$OfferArms as r, $$StatStrip as s, $$ClosingCta as t };
