import { r as __exportAll } from "./rolldown-runtime_DWOOXAbm.mjs";
import { C as addAttribute, N as createAstro, b as renderTemplate, f as renderComponent, m as Fragment, x as maybeRenderHead } from "./jsx-runtime_CgLb4yc8.mjs";
import { t as createComponent } from "./astro-component_D1QvgdDd.mjs";
import { t as renderScript } from "./script__Dvm899t.mjs";
import "./page-ssr_CDjLlKbJ.mjs";
import "./compiler_DxiFqWHW.mjs";
import { t as $$BaseLayout } from "./BaseLayout_D7NwmmmV.mjs";
import { a as getDirectoryPage, f as getSiteSettings, s as getHowItWorksPage, t as getAboutPage } from "./queries_BlgXXG8z.mjs";
import { t as $$Icon } from "./components_nK_Mjrbt.mjs";
import { n as $$Navbar, t as $$Footer } from "./sora_B4VQ4_VB.mjs";
import { c as resolveDirectoryPath, n as getCategoryOptions, r as getCountyOptions } from "./paths_PJNqNWPZ.mjs";
import { n as $$HubDiscovery, r as $$HubHeader, t as $$HubBasic } from "./HubBasic_DOjFtIf5.mjs";
import { a as $$MissionBand, c as $$AboutHeader, i as $$VisionPillars, n as $$Partnerships, o as $$Origin, r as $$OfferArms, s as $$StatStrip, t as $$ClosingCta } from "./ClosingCta_Cjqb5iWI.mjs";
import { perspectiveCookieName } from "@sanity/preview-url-secret/constants";
//#region src/components/sections/HiwHeader.astro
createAstro("https://marylandbusiness.online");
var $$HiwHeader = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$HiwHeader;
	const { header, crumbTail } = Astro.props;
	return renderTemplate`${header.heading && renderTemplate`${maybeRenderHead($$result)}<header class="hiw-header px-4 md:px-12 py-16 md:py-24 border-b border-[var(--border)] bg-[#FDFCFB]" data-astro-cid-z7qdwd4c><div class="max-w-5xl mx-auto" data-astro-cid-z7qdwd4c><nav class="flex items-center gap-2 mb-8 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--foreground)]" data-astro-cid-z7qdwd4c>${header.breadcrumbRoot && renderTemplate`<a href="/" data-astro-cid-z7qdwd4c>${header.breadcrumbRoot}</a>`}${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:chevron-right",
		"class": "w-2 h-2 opacity-40",
		"data-astro-cid-z7qdwd4c": true
	})}<span class="text-[var(--primary)]" data-astro-cid-z7qdwd4c>${crumbTail ?? header.heading}</span></nav>${header.badge && renderTemplate`<span class="inline-flex items-center gap-2 px-4 py-1.5 bg-[var(--secondary)] text-[var(--secondary-foreground)] text-[11px] font-bold tracking-[0.2em] uppercase mb-8" data-astro-cid-z7qdwd4c>${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:route",
		"class": "w-3 h-3",
		"data-astro-cid-z7qdwd4c": true
	})}${header.badge}</span>`}<h1 class="text-4xl md:text-6xl font-extrabold text-[var(--card-foreground)] mb-8 leading-[1.15] tracking-tight max-w-3xl" data-astro-cid-z7qdwd4c>${header.heading}</h1>${header.intro && renderTemplate`<p class="text-lg md:text-xl text-[var(--foreground)] leading-relaxed font-medium max-w-[70ch] mb-12" data-astro-cid-z7qdwd4c>${header.intro}</p>`}<div class="flex flex-col sm:flex-row items-start sm:items-center gap-5" data-astro-cid-z7qdwd4c>${header.ctaPrimaryLabel && renderTemplate`<a href="#pricing" class="btn-primary px-6 md:px-9 py-4 md:py-5 inline-flex items-center gap-3" data-astro-cid-z7qdwd4c>${header.ctaPrimaryLabel}${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:arrow-right",
		"class": "w-3.5 h-3.5",
		"data-astro-cid-z7qdwd4c": true
	})}</a>`}${header.ctaSecondaryLabel && renderTemplate`<a href="#pricing" class="btn-outline-dark px-6 md:px-9 py-4 md:py-5" data-astro-cid-z7qdwd4c>${header.ctaSecondaryLabel}</a>`}</div>${header.proofLine && renderTemplate`<p class="text-[11px] font-bold text-[var(--foreground)] uppercase tracking-widest mt-8" data-astro-cid-z7qdwd4c>${header.proofLine}</p>`}</div></header>`}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/sections/HiwHeader.astro", void 0);
//#endregion
//#region src/components/sections/HiwProcess.astro
createAstro("https://marylandbusiness.online");
var $$HiwProcess = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$HiwProcess;
	const { process } = Astro.props;
	const stepIcons = [
		"tabler:file-pencil",
		"tabler:search",
		"tabler:stack-2",
		"tabler:broadcast",
		"tabler:chart-line"
	];
	const ownerIcons = [
		"tabler:user",
		"tabler:file-check",
		"tabler:user",
		"tabler:settings",
		"tabler:user"
	];
	return renderTemplate`${process.heading && renderTemplate`${maybeRenderHead($$result)}<section id="process" class="hiw-process py-16 md:py-28 px-4 md:px-12 bg-[#FAF7F2]" data-astro-cid-c5rz7coy><div class="max-w-5xl mx-auto" data-astro-cid-c5rz7coy><div class="max-w-2xl mb-16 md:mb-20" data-astro-cid-c5rz7coy>${process.eyebrow && renderTemplate`<span class="text-[var(--primary)] font-extrabold text-xs tracking-[0.2em] uppercase mb-6 block" data-astro-cid-c5rz7coy>${process.eyebrow}</span>`}<h2 class="text-3xl md:text-4xl font-extrabold text-[var(--card-foreground)] mb-6 tracking-tight" data-astro-cid-c5rz7coy>${process.heading}</h2>${process.sub && renderTemplate`<p class="text-lg text-[var(--foreground)] leading-relaxed font-medium" data-astro-cid-c5rz7coy>${process.sub}</p>`}</div><div class="relative" data-astro-cid-c5rz7coy><div class="hidden md:block absolute left-8 top-4 bottom-4 w-[2px] bg-[var(--border)]" data-astro-cid-c5rz7coy></div><div class="flex flex-col gap-12 md:gap-16" data-astro-cid-c5rz7coy>${(process.steps ?? []).map((step, i) => renderTemplate`<div class="relative flex flex-col md:flex-row gap-6 md:gap-8" data-astro-cid-c5rz7coy><div class="flex md:flex-col items-center md:items-center gap-4 md:gap-0 shrink-0" data-astro-cid-c5rz7coy><div${addAttribute(["relative z-10 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center font-extrabold text-xl shrink-0", step.highlight ? "bg-[var(--secondary)] text-[var(--secondary-foreground)]" : "bg-[var(--primary)] text-white"], "class:list")} data-astro-cid-c5rz7coy>${step.num}</div></div><div class="flex-1 pb-2" data-astro-cid-c5rz7coy><div class="flex items-center gap-3 mb-3" data-astro-cid-c5rz7coy>${renderComponent($$result, "Icon", $$Icon, {
		"name": stepIcons[i] ?? "tabler:file-pencil",
		"class": "w-5 h-5 text-[var(--primary)] shrink-0",
		"data-astro-cid-c5rz7coy": true
	})}<h3 class="text-lg md:text-xl font-extrabold text-[var(--card-foreground)] tracking-tight" data-astro-cid-c5rz7coy>${step.title}</h3></div>${step.description && renderTemplate`<p class="text-base text-[var(--foreground)] leading-relaxed mb-4 max-w-prose" data-astro-cid-c5rz7coy>${step.description}</p>`}<div class="flex flex-wrap gap-4 text-[11px] font-extrabold uppercase tracking-widest" data-astro-cid-c5rz7coy>${step.metaTime && renderTemplate`<span class="px-3 py-1.5 border border-[var(--border)] text-[var(--card-foreground)] inline-flex items-center gap-2" data-astro-cid-c5rz7coy>${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:clock",
		"class": "w-3 h-3",
		"data-astro-cid-c5rz7coy": true
	})}${step.metaTime}</span>`}${step.metaOwner && renderTemplate`<span class="px-3 py-1.5 border border-[var(--border)] text-[var(--foreground)] inline-flex items-center gap-2" data-astro-cid-c5rz7coy>${renderComponent($$result, "Icon", $$Icon, {
		"name": ownerIcons[i] ?? "tabler:user",
		"class": "w-3 h-3",
		"data-astro-cid-c5rz7coy": true
	})}${step.metaOwner}</span>`}</div></div></div>`)}</div></div></div></section>`}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/sections/HiwProcess.astro", void 0);
//#endregion
//#region src/components/sections/HiwValue.astro
createAstro("https://marylandbusiness.online");
var $$HiwValue = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$HiwValue;
	const { value } = Astro.props;
	const tileIcons = [
		"tabler:map-pin-search",
		"tabler:shield-check",
		"tabler:gauge"
	];
	return renderTemplate`${value.heading && renderTemplate`${maybeRenderHead($$result)}<section id="what-you-get" class="hiw-value py-16 md:py-28 px-4 md:px-12 bg-[#FDFCFB] border-y border-[var(--border)]" data-astro-cid-i5g2rzap><div class="max-w-7xl mx-auto" data-astro-cid-i5g2rzap><div class="max-w-2xl mb-12 md:mb-16" data-astro-cid-i5g2rzap>${value.eyebrow && renderTemplate`<span class="text-[var(--primary)] font-extrabold text-xs tracking-[0.2em] uppercase mb-6 block" data-astro-cid-i5g2rzap>${value.eyebrow}</span>`}<h2 class="text-3xl md:text-4xl font-extrabold text-[var(--card-foreground)] mb-6 tracking-tight" data-astro-cid-i5g2rzap>${value.heading}</h2>${value.sub && renderTemplate`<p class="text-lg text-[var(--foreground)] leading-relaxed font-medium" data-astro-cid-i5g2rzap>${value.sub}</p>`}</div><div class="grid lg:grid-cols-3 gap-0 border-t border-l border-[var(--border)]" data-astro-cid-i5g2rzap>${(value.categories ?? []).map((cat, i) => renderTemplate`<div class="border-r border-b border-[var(--border)] p-6 md:p-10 bg-[#FAF7F2] flex flex-col" data-astro-cid-i5g2rzap><div class="flex items-center gap-3 mb-4" data-astro-cid-i5g2rzap><div class="w-8 h-8 flex items-center justify-center shrink-0" data-astro-cid-i5g2rzap>${renderComponent($$result, "Icon", $$Icon, {
		"name": tileIcons[i] ?? "tabler:shield-check",
		"class": "w-5 h-5 text-[var(--primary)]",
		"data-astro-cid-i5g2rzap": true
	})}</div><h3 class="text-xl font-extrabold text-[var(--card-foreground)] tracking-tight" data-astro-cid-i5g2rzap>${cat.title}</h3></div>${cat.description && renderTemplate`<p class="text-sm text-[var(--foreground)] leading-relaxed mb-8 max-w-prose" data-astro-cid-i5g2rzap>${cat.description}</p>`}<ul class="flex flex-col gap-4 text-sm text-[var(--foreground)] font-medium" data-astro-cid-i5g2rzap>${(cat.items ?? []).map((item) => renderTemplate`<li class="flex items-start gap-3" data-astro-cid-i5g2rzap>${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:check",
		"class": "w-3.5 h-3.5 text-[var(--primary)] mt-1 shrink-0",
		"data-astro-cid-i5g2rzap": true
	})}<span data-astro-cid-i5g2rzap>${item}</span></li>`)}</ul></div>`)}</div></div></section>`}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/sections/HiwValue.astro", void 0);
//#endregion
//#region src/components/sections/HiwWhy.astro
createAstro("https://marylandbusiness.online");
var $$HiwWhy = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$HiwWhy;
	const { why } = Astro.props;
	return renderTemplate`${why.heading && renderTemplate`${maybeRenderHead($$result)}<section id="why" class="hiw-why py-16 md:py-28 px-4 md:px-12 bg-[#FAF7F2]" data-astro-cid-s5znxix5><div class="max-w-7xl mx-auto" data-astro-cid-s5znxix5><div class="max-w-2xl mb-12 md:mb-16" data-astro-cid-s5znxix5>${why.eyebrow && renderTemplate`<span class="text-[var(--primary)] font-extrabold text-xs tracking-[0.2em] uppercase mb-6 block" data-astro-cid-s5znxix5>${why.eyebrow}</span>`}<h2 class="text-3xl md:text-4xl font-extrabold text-[var(--card-foreground)] mb-6 tracking-tight" data-astro-cid-s5znxix5>${why.heading}</h2></div><div class="grid lg:grid-cols-2 gap-0 border border-[var(--border)] mb-12 md:mb-16" data-astro-cid-s5znxix5><div class="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-[var(--border)] bg-[#FDFCFB]" data-astro-cid-s5znxix5>${why.problemLabel && renderTemplate`<span class="inline-block text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--foreground)] mb-6 px-3 py-1 border border-[var(--border)]" data-astro-cid-s5znxix5>${why.problemLabel}</span>`}<ul class="flex flex-col gap-6 text-base text-[var(--foreground)] leading-relaxed font-medium" data-astro-cid-s5znxix5>${(why.problemItems ?? []).map((item) => renderTemplate`<li class="flex items-start gap-3" data-astro-cid-s5znxix5>${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:x",
		"class": "w-3.5 h-3.5 text-[var(--foreground)] mt-1.5 shrink-0",
		"data-astro-cid-s5znxix5": true
	})}<span data-astro-cid-s5znxix5>${item}</span></li>`)}</ul></div><div class="p-8 md:p-12 bg-[#FAF7F2]" data-astro-cid-s5znxix5>${why.solutionLabel && renderTemplate`<span class="inline-block text-[11px] font-extrabold uppercase tracking-[0.2em] text-white mb-6 px-3 py-1 bg-[var(--primary)]" data-astro-cid-s5znxix5>${why.solutionLabel}</span>`}<ul class="flex flex-col gap-6 text-base text-[var(--card-foreground)] leading-relaxed font-medium" data-astro-cid-s5znxix5>${(why.solutionItems ?? []).map((item) => renderTemplate`<li class="flex items-start gap-3" data-astro-cid-s5znxix5>${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:check",
		"class": "w-3.5 h-3.5 text-[var(--primary)] mt-1.5 shrink-0",
		"data-astro-cid-s5znxix5": true
	})}<span data-astro-cid-s5znxix5>${item}</span></li>`)}</ul></div></div>${(why.stats?.length ?? 0) > 0 && renderTemplate`<div class="grid grid-cols-2 md:grid-cols-3 gap-10 max-w-4xl" data-astro-cid-s5znxix5>${why.stats.map((stat) => renderTemplate`<div data-astro-cid-s5znxix5><span class="block text-4xl md:text-5xl font-extrabold text-[var(--primary)] mb-2" data-astro-cid-s5znxix5>${stat.value}</span><span class="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--foreground)]" data-astro-cid-s5znxix5>${stat.label}</span></div>`)}</div>`}</div></section>`}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/sections/HiwWhy.astro", void 0);
//#endregion
//#region src/components/sections/HiwPricing.astro
createAstro("https://marylandbusiness.online");
var $$HiwPricing = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$HiwPricing;
	const { pricing } = Astro.props;
	return renderTemplate`${pricing.heading && renderTemplate`${maybeRenderHead($$result)}<section id="pricing" class="hiw-pricing py-16 md:py-28 px-4 md:px-12 bg-[#FDFCFB] border-y border-[var(--border)]" data-astro-cid-3ln4wpvx><div class="max-w-7xl mx-auto" data-astro-cid-3ln4wpvx><div class="max-w-2xl mb-12 md:mb-16" data-astro-cid-3ln4wpvx>${pricing.eyebrow && renderTemplate`<span class="text-[var(--primary)] font-extrabold text-xs tracking-[0.2em] uppercase mb-6 block" data-astro-cid-3ln4wpvx>${pricing.eyebrow}</span>`}<h2 class="text-3xl md:text-4xl font-extrabold text-[var(--card-foreground)] mb-6 tracking-tight" data-astro-cid-3ln4wpvx>${pricing.heading}</h2>${pricing.sub && renderTemplate`<p class="text-lg text-[var(--foreground)] leading-relaxed font-medium" data-astro-cid-3ln4wpvx>${pricing.sub}</p>`}</div><div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6" data-astro-cid-3ln4wpvx>${(pricing.plans ?? []).map((plan) => renderTemplate`<div${addAttribute(["price-card bg-[#FAF7F2] p-6 md:p-8 flex flex-col", plan.badge ? "featured-plan relative" : ""], "class:list")} data-astro-cid-3ln4wpvx>${plan.badge && renderTemplate`<span class="plan-badge" data-astro-cid-3ln4wpvx>${plan.badge}</span>`}<h3 class="text-sm font-extrabold text-[var(--card-foreground)] tracking-[0.15em] mb-4" data-astro-cid-3ln4wpvx>${plan.name}</h3><div class="mb-1" data-astro-cid-3ln4wpvx><span class="text-4xl font-extrabold text-[var(--card-foreground)]" data-astro-cid-3ln4wpvx>${plan.price}</span><span class="text-sm font-bold text-[var(--foreground)]" data-astro-cid-3ln4wpvx>${plan.period}</span></div>${plan.tagline && renderTemplate`<p class="text-xs text-[var(--foreground)] font-medium mb-8 max-w-prose" data-astro-cid-3ln4wpvx>${plan.tagline}</p>`}${plan.ctaLabel && renderTemplate`<a href="#" class="btn-outline-dark text-center px-6 py-4 mb-8" data-astro-cid-3ln4wpvx>${plan.ctaLabel}</a>`}${plan.includesLabel && renderTemplate`<div class="flex items-center gap-2 mb-5 pb-5 border-b border-dashed border-[var(--border)]" data-astro-cid-3ln4wpvx>${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:stack-2",
		"class": "w-3 h-3 text-[var(--secondary)] shrink-0",
		"data-astro-cid-3ln4wpvx": true
	})}<span class="text-[11px] font-extrabold uppercase tracking-widest text-[var(--card-foreground)]" data-astro-cid-3ln4wpvx>${plan.includesLabel}</span></div>`}<ul class="flex flex-col gap-5 text-sm text-[var(--card-foreground)] font-medium flex-1" data-astro-cid-3ln4wpvx>${(plan.features ?? []).map((feature) => renderTemplate`<li data-astro-cid-3ln4wpvx><div class="flex items-start gap-3" data-astro-cid-3ln4wpvx>${feature.placeholder ? renderTemplate`${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:plus",
		"class": "w-3.5 h-3.5 text-[var(--foreground)] opacity-40 mt-1 shrink-0",
		"data-astro-cid-3ln4wpvx": true
	})}` : renderTemplate`${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:check",
		"class": "w-3.5 h-3.5 text-[var(--primary)] mt-1 shrink-0",
		"data-astro-cid-3ln4wpvx": true
	})}`}<div data-astro-cid-3ln4wpvx><span${addAttribute(["font-extrabold block", feature.placeholder && "placeholder-cell"], "class:list")} data-astro-cid-3ln4wpvx>${feature.title}</span>${feature.description && renderTemplate`<span${addAttribute(["text-xs text-[var(--foreground)] leading-relaxed", feature.placeholder && "placeholder-cell"], "class:list")} data-astro-cid-3ln4wpvx>${feature.description}</span>`}</div></div></li>`)}</ul></div>`)}</div></div></section>`}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/sections/HiwPricing.astro", void 0);
//#endregion
//#region src/components/sections/HiwComparison.astro
createAstro("https://marylandbusiness.online");
var $$HiwComparison = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$HiwComparison;
	const { comparison, plans } = Astro.props;
	return renderTemplate`${comparison.heading && renderTemplate`${maybeRenderHead($$result)}<section id="comparison" class="hiw-comparison py-16 md:py-28 px-4 md:px-12 bg-[#FAF7F2]" data-astro-cid-vcnmbqtc><div class="max-w-7xl mx-auto" data-astro-cid-vcnmbqtc><div class="max-w-2xl mb-12 md:mb-16" data-astro-cid-vcnmbqtc>${comparison.eyebrow && renderTemplate`<span class="text-[var(--primary)] font-extrabold text-xs tracking-[0.2em] uppercase mb-6 block" data-astro-cid-vcnmbqtc>${comparison.eyebrow}</span>`}<h2 class="text-3xl md:text-4xl font-extrabold text-[var(--card-foreground)] mb-6 tracking-tight" data-astro-cid-vcnmbqtc>${comparison.heading}</h2></div><div class="border border-[var(--border)] overflow-x-auto" data-astro-cid-vcnmbqtc><table class="comparison-table w-full border-collapse min-w-[720px]" data-astro-cid-vcnmbqtc><thead data-astro-cid-vcnmbqtc><tr data-astro-cid-vcnmbqtc><th class="text-left p-5 text-[11px] font-extrabold uppercase tracking-widest text-[var(--foreground)] w-1/3" data-astro-cid-vcnmbqtc>Feature</th>${plans.map((plan) => renderTemplate`<th${addAttribute(["text-center p-5 text-[11px] font-extrabold uppercase tracking-widest", plan.badge ? "text-[var(--primary)]" : "text-[var(--card-foreground)]"], "class:list")} data-astro-cid-vcnmbqtc>${plan.name}<br data-astro-cid-vcnmbqtc><span class="text-[var(--foreground)] font-bold normal-case tracking-normal text-xs" data-astro-cid-vcnmbqtc>${plan.price}${plan.period}</span></th>`)}</tr></thead><tbody data-astro-cid-vcnmbqtc>${(comparison.groups ?? []).map((group) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<tr class="group-row" data-astro-cid-vcnmbqtc><td${addAttribute(plans.length + 1, "colspan")} class="p-4 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--primary)]" data-astro-cid-vcnmbqtc>${group.title}</td></tr>${(group.rows ?? []).map((row) => renderTemplate`<tr data-astro-cid-vcnmbqtc><td class="text-left p-5 text-xs font-bold text-[var(--card-foreground)]" data-astro-cid-vcnmbqtc>${row.feature}</td>${(row.cells ?? []).map((cell) => renderTemplate`<td class="text-center p-5" data-astro-cid-vcnmbqtc>${cell.kind === "check" ? renderTemplate`${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:check",
		"class": "w-3.5 h-3.5 text-[var(--primary)] inline-block",
		"data-astro-cid-vcnmbqtc": true
	})}` : renderTemplate`<span class="placeholder-cell text-xs" data-astro-cid-vcnmbqtc>${cell.text ?? ""}</span>`}</td>`)}</tr>`)}` })}`)}</tbody></table></div></div></section>`}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/sections/HiwComparison.astro", void 0);
//#endregion
//#region src/components/sections/HiwFaq.astro
createAstro("https://marylandbusiness.online");
var $$HiwFaq = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$HiwFaq;
	const { faq } = Astro.props;
	return renderTemplate`${faq.heading && renderTemplate`${maybeRenderHead($$result)}<section id="faq" class="hiw-faq py-16 md:py-28 px-4 md:px-12 bg-[#FDFCFB] border-t border-[var(--border)]" data-astro-cid-wxzqpr2l><div class="max-w-4xl mx-auto" data-astro-cid-wxzqpr2l><div class="mb-12 md:mb-16" data-astro-cid-wxzqpr2l>${faq.eyebrow && renderTemplate`<span class="text-[var(--primary)] font-extrabold text-xs tracking-[0.2em] uppercase mb-6 block" data-astro-cid-wxzqpr2l>${faq.eyebrow}</span>`}<h2 class="text-3xl md:text-4xl font-extrabold text-[var(--card-foreground)] mb-6 tracking-tight" data-astro-cid-wxzqpr2l>${faq.heading}</h2></div><div class="border-t border-[var(--border)]" data-astro-cid-wxzqpr2l>${(faq.items ?? []).map((item, i) => renderTemplate`<div${addAttribute(["faq-item border-b border-[var(--border)]", i === 0 && "open"], "class:list")} data-astro-cid-wxzqpr2l><button type="button" class="faq-question w-full flex items-center justify-between py-6 text-left" data-astro-cid-wxzqpr2l><h3 class="text-base font-extrabold text-[var(--card-foreground)] pr-8" data-astro-cid-wxzqpr2l>${item.question}</h3>${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:chevron-down",
		"class": "faq-chevron w-4 h-4 text-[var(--foreground)] shrink-0",
		"data-astro-cid-wxzqpr2l": true
	})}</button><div class="faq-answer" data-astro-cid-wxzqpr2l>${item.answer && renderTemplate`<p class="text-sm text-[var(--foreground)] leading-relaxed pb-6 pr-4 md:pr-10" data-astro-cid-wxzqpr2l>${item.answer}</p>`}</div></div>`)}</div></div></section>`}${renderScript($$result, "/Users/dev/Projects/marylandbusiness-online/src/components/sections/HiwFaq.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/sections/HiwFaq.astro", void 0);
//#endregion
//#region src/components/sections/HiwCta.astro
createAstro("https://marylandbusiness.online");
var $$HiwCta = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$HiwCta;
	const { cta } = Astro.props;
	return renderTemplate`${cta.heading && renderTemplate`${maybeRenderHead($$result)}<section id="closing-cta" class="hiw-cta py-16 md:py-24 px-4 md:px-12 bg-[#121212] text-white" data-astro-cid-tix5auvn><div class="max-w-5xl mx-auto text-center" data-astro-cid-tix5auvn><h2 class="text-3xl md:text-5xl font-extrabold mb-8 tracking-tight leading-[1.15]" data-astro-cid-tix5auvn>${cta.heading}</h2><div class="flex flex-col sm:flex-row items-center justify-center gap-4" data-astro-cid-tix5auvn>${cta.ctaPrimaryLabel && renderTemplate`<a href="#pricing" class="btn-primary px-10 py-5" data-astro-cid-tix5auvn>${cta.ctaPrimaryLabel}</a>`}${cta.ctaSecondaryLabel && renderTemplate`<a href="#pricing" class="btn-outline-light px-10 py-5" data-astro-cid-tix5auvn>${cta.ctaSecondaryLabel}</a>`}</div></div></section>`}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/sections/HiwCta.astro", void 0);
//#endregion
//#region src/pages/[category]/index.astro
var _category__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://marylandbusiness.online");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const { category } = Astro.params;
	const perspectiveCookie = Astro.cookies.get(perspectiveCookieName)?.value;
	const about = category === "about" ? await getAboutPage(perspectiveCookie) : void 0;
	const howItWorks = category === "how-it-works" ? await getHowItWorksPage(perspectiveCookie) : void 0;
	const settings = await getSiteSettings(perspectiveCookie);
	const [countyOptions, categoryOptions] = await Promise.all([getCountyOptions(), getCategoryOptions()]);
	const dir = about || howItWorks ? null : await resolveDirectoryPath(category ?? "");
	const view = dir?.kind === "open" ? dir.view : void 0;
	const directoryPage = view ? await getDirectoryPage(perspectiveCookie) : void 0;
	const hasChrome = Boolean(view && directoryPage?.hubHeader && directoryPage.hubDiscovery);
	if (dir?.kind === "narrow" || dir?.kind === "invalid") return new Response(null, {
		status: 301,
		headers: { Location: dir.redirectTo }
	});
	if (!about && !howItWorks && !view) return new Response(null, {
		status: 301,
		headers: { Location: "/" }
	});
	return renderTemplate`${about ? renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": ($$result) => renderTemplate`${settings && renderTemplate`${renderComponent($$result, "Navbar", $$Navbar, { "settings": settings })}`}${about.header && renderTemplate`${renderComponent($$result, "AboutHeader", $$AboutHeader, { "header": about.header })}`}${about.statStrip && renderTemplate`${renderComponent($$result, "StatStrip", $$StatStrip, { "statStrip": about.statStrip })}`}${about.origin && renderTemplate`${renderComponent($$result, "Origin", $$Origin, { "origin": about.origin })}`}${about.missionBand && renderTemplate`${renderComponent($$result, "MissionBand", $$MissionBand, { "missionBand": about.missionBand })}`}${about.visionPillars && renderTemplate`${renderComponent($$result, "VisionPillars", $$VisionPillars, { "visionPillars": about.visionPillars })}`}${about.offerArms && renderTemplate`${renderComponent($$result, "OfferArms", $$OfferArms, { "offerArms": about.offerArms })}`}${about.partnerships && renderTemplate`${renderComponent($$result, "Partnerships", $$Partnerships, { "partnerships": about.partnerships })}`}${about.closingCta && renderTemplate`${renderComponent($$result, "ClosingCta", $$ClosingCta, { "closingCta": about.closingCta })}`}${settings && renderTemplate`${renderComponent($$result, "Footer", $$Footer, { "settings": settings })}`}` })}` : howItWorks ? renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": howItWorks.title,
		"slug": category
	}, { "default": ($$result) => renderTemplate`${settings && renderTemplate`${renderComponent($$result, "Navbar", $$Navbar, { "settings": settings })}`}${howItWorks.hiwHeader && renderTemplate`${renderComponent($$result, "HiwHeader", $$HiwHeader, {
		"header": howItWorks.hiwHeader,
		"crumbTail": howItWorks.title
	})}`}${howItWorks.hiwProcess && renderTemplate`${renderComponent($$result, "HiwProcess", $$HiwProcess, { "process": howItWorks.hiwProcess })}`}${howItWorks.hiwValue && renderTemplate`${renderComponent($$result, "HiwValue", $$HiwValue, { "value": howItWorks.hiwValue })}`}${howItWorks.hiwWhy && renderTemplate`${renderComponent($$result, "HiwWhy", $$HiwWhy, { "why": howItWorks.hiwWhy })}`}${howItWorks.hiwPricing && renderTemplate`${renderComponent($$result, "HiwPricing", $$HiwPricing, { "pricing": howItWorks.hiwPricing })}`}${howItWorks.hiwComparison && howItWorks.hiwPricing && renderTemplate`${renderComponent($$result, "HiwComparison", $$HiwComparison, {
		"comparison": howItWorks.hiwComparison,
		"plans": howItWorks.hiwPricing.plans ?? []
	})}`}${howItWorks.hiwFaq && renderTemplate`${renderComponent($$result, "HiwFaq", $$HiwFaq, { "faq": howItWorks.hiwFaq })}`}${howItWorks.hiwCta && renderTemplate`${renderComponent($$result, "HiwCta", $$HiwCta, { "cta": howItWorks.hiwCta })}`}${settings && renderTemplate`${renderComponent($$result, "Footer", $$Footer, { "settings": settings })}`}` })}` : hasChrome && view ? renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": `${view.hub.label} ${directoryPage.hubHeader?.headingSuffix ?? ""}`.trim(),
		"description": view.state.description ?? void 0,
		"slug": category
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
		"slug": category
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "HubBasic", $$HubBasic, {
		"label": view.hub.label,
		"description": view.state.description,
		"hub": view.hub
	})}${settings && renderTemplate`${renderComponent($$result, "Footer", $$Footer, { "settings": settings })}`}` })}` : null}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/pages/[category]/index.astro", void 0);
var $$file = "/Users/dev/Projects/marylandbusiness-online/src/pages/[category]/index.astro";
var $$url = "/[category]";
//#endregion
//#region \0virtual:astro:page:src/pages/[category]/index@_@astro
var page = () => _category__exports;
//#endregion
export { page };
