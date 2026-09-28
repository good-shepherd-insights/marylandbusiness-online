import { C as addAttribute, N as createAstro, b as renderTemplate, f as renderComponent, m as Fragment, x as maybeRenderHead } from "./jsx-runtime_CgLb4yc8.mjs";
import { t as createComponent } from "./astro-component_D1QvgdDd.mjs";
import "./compiler_DxiFqWHW.mjs";
import { t as $$PortableText } from "./lib_DGRe2E4_.mjs";
import { t as $$BaseLayout } from "./BaseLayout_D7NwmmmV.mjs";
import { f as getSiteSettings, p as themeConfig_default } from "./queries_BlgXXG8z.mjs";
import { t as $$Icon } from "./components_nK_Mjrbt.mjs";
import { n as $$Navbar, t as $$Footer } from "./sora_B4VQ4_VB.mjs";
import { n as sanityImageUrl, t as sanityImageSrcSet } from "./client_uFEOuo7D.mjs";
import { defineField, defineType } from "sanity";
//#region src/components/listings/DetailHeader.astro
createAstro("https://marylandbusiness.online");
var $$DetailHeader = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$DetailHeader;
	const { listing } = Astro.props;
	const reviews = listing.reviews ?? [];
	const count = reviews.length;
	const avg = count > 0 ? reviews.reduce((sum, r) => sum + (r.rating ?? 0), 0) / count : 0;
	const fullStars = Math.floor(avg);
	const halfStar = avg - fullStars >= .5;
	return renderTemplate`${listing.name && renderTemplate`${maybeRenderHead($$result)}<header data-astro-cid-rrloo42r><nav class="flex items-center gap-2 mb-4 text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--foreground)]" data-astro-cid-rrloo42r><a href="/" data-astro-cid-rrloo42r>${listing.breadcrumbRoot}</a>${listing.county && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:chevron-right",
		"class": "w-2 h-2 opacity-40",
		"data-astro-cid-rrloo42r": true
	})}<a${addAttribute(`/${listing.county.slug.current}`, "href")} data-astro-cid-rrloo42r>${listing.county.name}</a>` })}`}${listing.subcategory && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:chevron-right",
		"class": "w-2 h-2 opacity-40",
		"data-astro-cid-rrloo42r": true
	})}<span class="text-[var(--primary)]" data-astro-cid-rrloo42r>${listing.subcategory.name}</span>` })}`}</nav><div class="flex items-start justify-between gap-6" data-astro-cid-rrloo42r><div data-astro-cid-rrloo42r><h1 class="text-3xl md:text-5xl font-extrabold text-[var(--card-foreground)] mb-4 leading-tight" data-astro-cid-rrloo42r>${listing.name}</h1><div class="flex items-center gap-4" data-astro-cid-rrloo42r>${count > 0 && renderTemplate`<div class="star-rating flex items-center gap-1" data-astro-cid-rrloo42r>${Array.from({ length: 5 }).map((_, i) => renderTemplate`${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:star",
		"class": `${i < fullStars || i === fullStars && halfStar ? "star-full" : "star-empty"}`,
		"data-astro-cid-rrloo42r": true
	})}`)}<span class="ml-2 text-sm font-bold text-[var(--card-foreground)]" data-astro-cid-rrloo42r>${avg.toFixed(1)} (${count} ${count === 1 ? listing.reviewCountSingularLabel : listing.reviewCountPluralLabel})</span></div>`}${count > 0 && listing.rankLine && renderTemplate`<span class="text-[var(--border)]" data-astro-cid-rrloo42r>|</span>`}${listing.rankLine && renderTemplate`<span class="text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)]" data-astro-cid-rrloo42r>${listing.rankLine}</span>`}</div></div><div class="flex gap-2" data-astro-cid-rrloo42r><button class="w-12 h-12 border border-[var(--border)] flex items-center justify-center" aria-label="Share" data-astro-cid-rrloo42r>${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:share",
		"class": "w-4 h-4",
		"data-astro-cid-rrloo42r": true
	})}</button><button class="w-12 h-12 border border-[var(--border)] flex items-center justify-center" aria-label="Save" data-astro-cid-rrloo42r>${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:heart",
		"class": "w-4 h-4",
		"data-astro-cid-rrloo42r": true
	})}</button></div></div></header>`}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/listings/DetailHeader.astro", void 0);
//#endregion
//#region src/components/listings/PulseBar.astro
createAstro("https://marylandbusiness.online");
var $$PulseBar = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PulseBar;
	const { listing } = Astro.props;
	const pulse = listing.pulse;
	function segments(template, value) {
		if (!template || value == null) return null;
		const [before, ...rest] = template.split("{n}");
		return {
			before,
			after: rest.join("{n}")
		};
	}
	const booked = segments(listing.pulseBookedText, pulse?.booked);
	const capacity = segments(listing.pulseCapacityText, pulse?.capacityPct);
	const wait = segments(listing.pulseWaitText, pulse?.waitMinutes);
	return renderTemplate`${(booked || capacity || wait) && renderTemplate`${maybeRenderHead($$result)}<div id="pulse-bar" class="mt-6 mb-12 flex flex-wrap items-center gap-6 bg-[#121212] px-6 py-4" data-astro-cid-h3x2ltdm><div class="flex items-center gap-2" data-astro-cid-h3x2ltdm><span class="relative flex h-2 w-2" data-astro-cid-h3x2ltdm><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--secondary)] opacity-75" data-astro-cid-h3x2ltdm></span><span class="relative inline-flex rounded-full h-2 w-2 bg-[var(--secondary)]" data-astro-cid-h3x2ltdm></span></span>${booked && renderTemplate`<span class="text-[10px] font-bold text-white uppercase tracking-widest" data-astro-cid-h3x2ltdm>${booked.before}<span class="text-[var(--secondary)]" data-astro-cid-h3x2ltdm>${pulse?.booked}</span>${booked.after}</span>`}</div><span class="hidden md:block w-px h-4 bg-white/20" data-astro-cid-h3x2ltdm></span>${capacity && renderTemplate`<div class="flex items-center gap-2" data-astro-cid-h3x2ltdm>${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:users-group",
		"class": "w-3 h-3 text-[var(--secondary)]",
		"data-astro-cid-h3x2ltdm": true
	})}<span class="text-[10px] font-bold text-white uppercase tracking-widest" data-astro-cid-h3x2ltdm>${capacity.before}<span class="text-[var(--secondary)]" data-astro-cid-h3x2ltdm>${pulse?.capacityPct}</span>${capacity.after}</span></div>`}<span class="hidden md:block w-px h-4 bg-white/20" data-astro-cid-h3x2ltdm></span>${wait && renderTemplate`<div class="flex items-center gap-2" data-astro-cid-h3x2ltdm>${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:clock",
		"class": "w-3 h-3 text-[var(--secondary)]",
		"data-astro-cid-h3x2ltdm": true
	})}<span class="text-[10px] font-bold text-white uppercase tracking-widest" data-astro-cid-h3x2ltdm>${wait.before}<span class="text-[var(--secondary)]" data-astro-cid-h3x2ltdm>${pulse?.waitMinutes}</span>${wait.after}</span></div>`}</div>`}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/listings/PulseBar.astro", void 0);
//#endregion
//#region src/components/listings/Promotions.astro
createAstro("https://marylandbusiness.online");
var $$Promotions = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Promotions;
	const valid = (Astro.props.promotions ?? []).filter((p) => p.heading);
	return renderTemplate`${valid.length > 0 && renderTemplate`${maybeRenderHead($$result)}<section id="promotions" class="mb-12" data-astro-cid-wn5jb22s><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-astro-cid-wn5jb22s>${valid.map((promo) => promo.tone === "coupon" ? renderTemplate`<div class="relative overflow-hidden border-2 border-[var(--primary)] bg-[#FBEAEA] p-8 flex flex-col justify-between" data-astro-cid-wn5jb22s><div class="absolute -right-6 -top-6 w-24 h-24 bg-[rgba(157,34,53,0.1)] rotate-45" data-astro-cid-wn5jb22s></div><div data-astro-cid-wn5jb22s><span class="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[var(--primary)]" data-astro-cid-wn5jb22s>${promo.eyebrow}</span><h4 class="text-2xl font-extrabold text-[var(--card-foreground)] uppercase tracking-tight mt-2 mb-2" data-astro-cid-wn5jb22s>${promo.heading}</h4><p class="text-xs text-[var(--foreground)] font-bold uppercase tracking-widest" data-astro-cid-wn5jb22s>${promo.note}</p></div>${promo.ctaLabel && promo.ctaLink && renderTemplate`<a class="btn-primary w-full py-4 mt-6"${addAttribute(promo.ctaLink, "href")} data-astro-cid-wn5jb22s>${promo.ctaLabel}</a>`}</div>` : renderTemplate`<div class="relative overflow-hidden border-2 border-[var(--card-foreground)] bg-[#FFF8E6] p-8 flex flex-col justify-between" data-astro-cid-wn5jb22s><div class="absolute -right-6 -top-6 w-24 h-24 bg-[rgba(234,170,0,0.2)] rotate-45" data-astro-cid-wn5jb22s></div><div data-astro-cid-wn5jb22s><span class="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[var(--card-foreground)]" data-astro-cid-wn5jb22s>${promo.eyebrow}</span><h4 class="text-2xl font-extrabold text-[var(--card-foreground)] uppercase tracking-tight mt-2 mb-2" data-astro-cid-wn5jb22s>${promo.heading}</h4><p class="text-xs text-[var(--foreground)] font-bold uppercase tracking-widest" data-astro-cid-wn5jb22s>${promo.note}</p></div>${promo.ctaLabel && promo.ctaLink && renderTemplate`<a class="btn-outline w-full py-4 mt-6"${addAttribute(promo.ctaLink, "href")} data-astro-cid-wn5jb22s>${promo.ctaLabel}</a>`}</div>`)}</div></section>`}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/listings/Promotions.astro", void 0);
//#endregion
//#region src/components/listings/GalleryGrid.astro
createAstro("https://marylandbusiness.online");
var $$GalleryGrid = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$GalleryGrid;
	const valid = (Astro.props.images ?? []).filter((img) => img.asset);
	return renderTemplate`${valid.length > 0 && renderTemplate`${maybeRenderHead($$result)}<div class="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-2 md:h-[500px] mb-12" data-astro-cid-sjx4w76o>${valid.map((img, i) => renderTemplate`<div${addAttribute(`photo-grid-item ${i === 0 ? "col-span-2 row-span-2" : i === 1 ? "col-span-2" : ""}`, "class")} data-astro-cid-sjx4w76o><img${addAttribute(sanityImageUrl(img, { width: i === 0 ? 1200 : 600 }), "src")}${addAttribute(img.alt ?? "", "alt")}${addAttribute(i < 2 ? "eager" : "lazy", "loading")} data-astro-cid-sjx4w76o></div>`)}</div>`}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/listings/GalleryGrid.astro", void 0);
//#endregion
//#region src/components/listings/VibeCheckMedia.astro
createAstro("https://marylandbusiness.online");
var $$VibeCheckMedia = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$VibeCheckMedia;
	const { listing } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="relative md:h-[420px] h-64 bg-[#121212] overflow-hidden">${listing.videoStill?.asset && renderTemplate`<img class="w-full h-full object-cover opacity-70"${addAttribute(sanityImageUrl(listing.videoStill, { width: 1600 }), "src")}${addAttribute(listing.videoStill.alt ?? listing.videoHeading ?? "", "alt")} loading="lazy">`}<div class="absolute inset-0 flex items-center justify-center"><div class="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-2xl">${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:player-play",
		"class": "w-6 h-6 text-[var(--primary)] ml-1"
	})}</div></div><div class="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent"><span class="text-[9px] font-bold text-[var(--secondary)] uppercase tracking-[0.2em]">${listing.videoEyebrow}</span><h3 class="text-lg font-extrabold text-white uppercase tracking-tight mt-1">${listing.videoCaption}</h3></div>${listing.videoDuration && renderTemplate`<div class="absolute top-6 right-6 bg-white/90 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-widest text-[var(--card-foreground)]">${listing.videoDuration}</div>`}</div>`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/listings/VibeCheckMedia.astro", void 0);
//#endregion
//#region src/components/listings/VibeCheck.astro
createAstro("https://marylandbusiness.online");
var $$VibeCheck = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$VibeCheck;
	const { listing } = Astro.props;
	const hasMedia = Boolean(listing.videoStill?.asset) || Boolean(listing.videoHeading);
	return renderTemplate`${hasMedia && renderTemplate`${maybeRenderHead($$result)}<section id="vibe-check" data-astro-cid-7yyaem7t><div class="flex items-center justify-between mb-8" data-astro-cid-7yyaem7t><h2 class="text-xl font-extrabold text-[var(--card-foreground)] uppercase tracking-widest" data-astro-cid-7yyaem7t>${listing.videoHeading}</h2>${listing.videoLabel && renderTemplate`<span class="text-[10px] font-bold text-[var(--foreground)] uppercase tracking-widest" data-astro-cid-7yyaem7t>${listing.videoLabel}</span>`}</div>${listing.videoUrl ? renderTemplate`<a${addAttribute(listing.videoUrl, "href")} data-astro-cid-7yyaem7t>${renderComponent($$result, "VibeCheckMedia", $$VibeCheckMedia, {
		"listing": listing,
		"data-astro-cid-7yyaem7t": true
	})}</a>` : renderTemplate`${renderComponent($$result, "VibeCheckMedia", $$VibeCheckMedia, {
		"listing": listing,
		"data-astro-cid-7yyaem7t": true
	})}`}</section>`}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/listings/VibeCheck.astro", void 0);
//#endregion
//#region src/components/listings/Spotlight.astro
createAstro("https://marylandbusiness.online");
var $$Spotlight = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Spotlight;
	const props = Astro.props;
	const { heading, sub, ctaLabel } = props;
	const chipByTag = {
		feature: {
			bg: "var(--primary, #9D2235)",
			fg: "#fff"
		},
		sustainability: {
			bg: "var(--secondary, #EAAA00)",
			fg: "var(--secondary-foreground, #121212)"
		}
	};
	const neutralChip = {
		bg: "var(--card-foreground, #121212)",
		fg: "#fff"
	};
	const dateFmt = new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
		timeZone: "UTC"
	});
	const stories = (props.stories ?? []).filter((s) => s.title && s.date);
	return renderTemplate`${stories.length > 0 && renderTemplate`${maybeRenderHead($$result)}<section class="spotlight" id="editorials" data-astro-cid-yquwnm4m><div class="spotlight-head" data-astro-cid-yquwnm4m><div data-astro-cid-yquwnm4m><h2 class="spotlight-title" data-astro-cid-yquwnm4m>${heading}</h2><p class="spotlight-sub" data-astro-cid-yquwnm4m>${sub}</p></div><span class="spotlight-cta" data-astro-cid-yquwnm4m>${ctaLabel}</span></div><div class="spotlight-grid" data-astro-cid-yquwnm4m>${stories.map((story) => {
		const chip = chipByTag[story.tag ?? ""] ?? neutralChip;
		return renderTemplate`<article class="story-card" data-astro-cid-yquwnm4m><div class="story-media" data-astro-cid-yquwnm4m>${story.image?.asset && renderTemplate`<img class="story-img"${addAttribute(sanityImageUrl(story.image, { width: 640 }), "src")}${addAttribute(sanityImageSrcSet(story.image, 640), "srcset")} width="640" height="320" loading="lazy"${addAttribute(story.image?.alt ?? story.title, "alt")} data-astro-cid-yquwnm4m>`}</div><div class="story-body" data-astro-cid-yquwnm4m><div class="story-meta" data-astro-cid-yquwnm4m><span class="story-chip"${addAttribute(`background:${chip.bg};color:${chip.fg}`, "style")} data-astro-cid-yquwnm4m>${story.tag}</span><span class="story-date" data-astro-cid-yquwnm4m>${story.date ? dateFmt.format(new Date(story.date)) : ""}</span></div><h3 class="story-title" data-astro-cid-yquwnm4m>${story.title}</h3><p class="story-excerpt" data-astro-cid-yquwnm4m>${story.excerpt}</p><span class="story-cta" data-astro-cid-yquwnm4m>${story.ctaLabel}${renderComponent($$result, "Icon", $$Icon, {
			"name": "tabler:arrow-right",
			"data-astro-cid-yquwnm4m": true
		})}</span></div></article>`;
	})}</div></section>`}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/listings/Spotlight.astro", void 0);
//#endregion
//#region src/components/listings/ListingEvents.astro
createAstro("https://marylandbusiness.online");
var $$ListingEvents = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ListingEvents;
	const { listing } = Astro.props;
	const valid = (listing.events ?? []).filter((event) => event.title);
	return renderTemplate`${valid.length > 0 && renderTemplate`${maybeRenderHead($$result)}<section id="events" data-astro-cid-mnbpqdmk><h2 class="text-xl font-extrabold text-[var(--card-foreground)] uppercase tracking-widest mb-8" data-astro-cid-mnbpqdmk>${listing.eventsHeading}</h2><div class="space-y-4" data-astro-cid-mnbpqdmk>${valid.map((event) => renderTemplate`<div class="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 p-6 border border-[var(--border)]" data-astro-cid-mnbpqdmk><div class="flex flex-col items-center justify-center w-16 h-16 bg-[var(--icon-box)] border border-[var(--border)] shrink-0" data-astro-cid-mnbpqdmk><span class="text-[10px] font-bold text-[var(--primary)] uppercase" data-astro-cid-mnbpqdmk>${event.month}</span><span class="text-xl font-extrabold" data-astro-cid-mnbpqdmk>${event.day}</span></div><div class="flex-1" data-astro-cid-mnbpqdmk><h4 class="text-sm font-extrabold uppercase tracking-tight" data-astro-cid-mnbpqdmk>${event.title}</h4><p class="text-xs text-[var(--foreground)] uppercase tracking-widest mt-1" data-astro-cid-mnbpqdmk>${[event.time, event.venue].filter(Boolean).join(" • ")}</p></div>${event.ctaLabel && event.ctaLink && renderTemplate`<a class="btn-outline px-6 py-3"${addAttribute(event.ctaLink, "href")} data-astro-cid-mnbpqdmk>${event.ctaLabel}</a>`}</div>`)}</div></section>`}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/listings/ListingEvents.astro", void 0);
//#endregion
//#region src/components/listings/AboutAmenities.astro
createAstro("https://marylandbusiness.online");
var $$AboutAmenities = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$AboutAmenities;
	const { listing } = Astro.props;
	const hasAbout = Array.isArray(listing.about) && listing.about.length > 0;
	const amenities = (listing.amenities ?? []).filter((a) => a.label);
	return renderTemplate`${(hasAbout || amenities.length > 0) && renderTemplate`${maybeRenderHead($$result)}<section id="about" data-astro-cid-t5suyztp>${listing.aboutHeading && renderTemplate`<h2 class="text-xl font-extrabold text-[var(--card-foreground)] mb-6" data-astro-cid-t5suyztp>${listing.aboutHeading}</h2>`}<div class="grid grid-cols-1 md:grid-cols-3 gap-12" data-astro-cid-t5suyztp>${hasAbout && renderTemplate`<div class="md:col-span-2 prose-content space-y-5" data-astro-cid-t5suyztp>${renderComponent($$result, "PortableText", $$PortableText, {
		"value": listing.about ?? [],
		"data-astro-cid-t5suyztp": true
	})}</div>`}${amenities.length > 0 && renderTemplate`<div data-astro-cid-t5suyztp><h4 class="text-[10px] font-extrabold uppercase tracking-widest text-[var(--foreground)] mb-3" data-astro-cid-t5suyztp>${listing.amenitiesHeading}</h4><ul class="grid grid-cols-1 gap-2 text-xs font-bold text-[var(--card-foreground)] uppercase tracking-tight" data-astro-cid-t5suyztp>${amenities.map((amenity) => renderTemplate`<li class="flex items-center gap-2" data-astro-cid-t5suyztp>${amenity.label}</li>`)}</ul></div>`}</div></section>`}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/listings/AboutAmenities.astro", void 0);
//#endregion
//#region src/components/listings/WhyChooseUs.astro
createAstro("https://marylandbusiness.online");
var $$WhyChooseUs = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$WhyChooseUs;
	const { listing } = Astro.props;
	const hasBody = Array.isArray(listing.whyChooseUs) && listing.whyChooseUs.length > 0;
	return renderTemplate`${(listing.whyChooseUsHeading || hasBody) && renderTemplate`${maybeRenderHead($$result)}<section id="why-choose-us" data-astro-cid-an5m2bh7>${listing.whyChooseUsHeading && renderTemplate`<h2 class="text-xl font-extrabold text-[var(--card-foreground)] mb-6" data-astro-cid-an5m2bh7>${listing.whyChooseUsHeading}</h2>`}${hasBody && renderTemplate`<div class="prose-content space-y-5 max-w-3xl" data-astro-cid-an5m2bh7>${renderComponent($$result, "PortableText", $$PortableText, {
		"value": listing.whyChooseUs ?? [],
		"data-astro-cid-an5m2bh7": true
	})}</div>`}</section>`}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/listings/WhyChooseUs.astro", void 0);
//#endregion
//#region src/sanity/schemaTypes/components/menuItem.ts
/** Closed badge set: picker + API-write validation share the same values. */
var BADGES = [
	{
		title: "Chef's Signature",
		value: "chefsSignature"
	},
	{
		title: "Gluten-Free",
		value: "glutenFree"
	},
	{
		title: "Seasonal",
		value: "seasonal"
	}
];
defineType({
	name: "menuItem",
	title: "Menu Item",
	type: "object",
	fields: [
		defineField({
			name: "name",
			title: "Name",
			type: "string",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "price",
			title: "Price",
			type: "number",
			validation: (rule) => rule.required().min(0)
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "string",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "image",
			title: "Image",
			type: "image",
			fields: [defineField({
				name: "alt",
				title: "Alt Text",
				type: "string",
				validation: (rule) => rule.required()
			})]
		}),
		defineField({
			name: "badge",
			title: "Badge",
			type: "string",
			options: { list: BADGES },
			validation: (rule) => rule.custom((value) => !value || BADGES.some((b) => b.value === value) || `Badge must be one of: ${BADGES.map((b) => b.value).join(", ")}`)
		})
	],
	preview: {
		select: {
			name: "name",
			price: "price",
			badge: "badge"
		},
		prepare({ name, price, badge }) {
			return {
				title: name,
				subtitle: price != null ? `$${price}` : void 0
			};
		}
	}
});
//#endregion
//#region src/components/listings/MenuSection.astro
createAstro("https://marylandbusiness.online");
var $$MenuSection = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$MenuSection;
	const { listing } = Astro.props;
	const categories = (listing.menu ?? []).filter((cat) => (cat.items ?? []).length > 0);
	const chipByBadge = {
		chefsSignature: "bg-[var(--card-foreground)] text-white",
		glutenFree: "bg-green-700 text-white",
		seasonal: "bg-[var(--secondary)] text-[var(--secondary-foreground)]"
	};
	const badgeLabel = Object.fromEntries(BADGES.map((b) => [b.value, b.title]));
	function chipClass(item) {
		return chipByBadge[item.badge ?? ""] ?? "bg-[var(--card-foreground)] text-white";
	}
	return renderTemplate`${categories.length > 0 && renderTemplate`${maybeRenderHead($$result)}<section id="menu" data-astro-cid-zq5ljnxp><div class="flex items-center justify-between mb-8" data-astro-cid-zq5ljnxp><div data-astro-cid-zq5ljnxp><h2 class="text-xl font-extrabold text-[var(--card-foreground)] uppercase tracking-widest" data-astro-cid-zq5ljnxp>${listing.menuHeading}</h2><p class="text-[10px] font-bold text-[var(--foreground)] uppercase tracking-widest mt-1" data-astro-cid-zq5ljnxp>${listing.menuNote}</p></div>${listing.menuCtaLabel && listing.menuUrl && renderTemplate`<a class="btn-outline px-6 py-3"${addAttribute(listing.menuUrl, "href")} data-astro-cid-zq5ljnxp>${listing.menuCtaLabel} ${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:arrow-right",
		"class": "w-2.5 h-2.5 ml-2 inline-block",
		"data-astro-cid-zq5ljnxp": true
	})}</a>`}</div>${categories.map((cat) => renderTemplate`<div data-astro-cid-zq5ljnxp><div class="flex gap-2 mb-8 border-b border-[var(--border)]" data-astro-cid-zq5ljnxp>${cat.label && renderTemplate`<button class="px-5 py-3 text-[10px] font-extrabold uppercase tracking-widest border-b-2 border-[var(--primary)] text-[var(--primary)]" data-astro-cid-zq5ljnxp>${cat.label}</button>`}</div><div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6" data-astro-cid-zq5ljnxp>${(cat.items ?? []).map((item) => renderTemplate`<div class="flex gap-4 items-start pb-6 border-b border-[var(--border)]" data-astro-cid-zq5ljnxp>${item.image?.asset && renderTemplate`<div class="w-20 h-20 shrink-0 border border-[var(--border)] overflow-hidden" data-astro-cid-zq5ljnxp><img class="w-full h-full object-cover"${addAttribute(sanityImageUrl(item.image, { width: 160 }), "src")}${addAttribute(item.image.alt ?? item.name ?? "", "alt")} loading="lazy" data-astro-cid-zq5ljnxp></div>`}<div class="flex-1" data-astro-cid-zq5ljnxp><div class="flex justify-between items-start mb-1" data-astro-cid-zq5ljnxp><h4 class="text-sm font-extrabold uppercase tracking-tight" data-astro-cid-zq5ljnxp>${item.name}</h4>${item.price != null && renderTemplate`<span class="text-sm font-extrabold text-[var(--primary)]" data-astro-cid-zq5ljnxp>$${item.price}</span>`}</div><p class="text-xs text-[var(--foreground)] leading-relaxed" data-astro-cid-zq5ljnxp>${item.description}</p>${item.badge && renderTemplate`<span${addAttribute(`inline-block mt-2 text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 ${chipClass(item)}`, "class")} data-astro-cid-zq5ljnxp>${badgeLabel[item.badge] ?? item.badge}</span>`}</div></div>`)}</div></div>`)}</section>`}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/listings/MenuSection.astro", void 0);
//#endregion
//#region src/components/listings/TeamSection.astro
createAstro("https://marylandbusiness.online");
var $$TeamSection = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$TeamSection;
	const { listing } = Astro.props;
	const valid = (listing.team ?? []).filter((member) => member.name);
	return renderTemplate`${valid.length > 0 && renderTemplate`${maybeRenderHead($$result)}<section id="team" data-astro-cid-7hg7l6j3><h2 class="text-xl font-extrabold text-[var(--card-foreground)] uppercase tracking-widest mb-8" data-astro-cid-7hg7l6j3>${listing.teamHeading}</h2><div class="grid grid-cols-1 md:grid-cols-3 gap-8" data-astro-cid-7hg7l6j3>${valid.map((member) => renderTemplate`<div class="border border-[var(--border)] p-8 flex flex-col items-center text-center" data-astro-cid-7hg7l6j3><div class="w-24 h-24 rounded-full overflow-hidden border-2 border-[var(--primary)] mb-5" data-astro-cid-7hg7l6j3>${member.avatar?.asset && renderTemplate`<img${addAttribute(sanityImageUrl(member.avatar, { width: 192 }), "src")}${addAttribute(member.avatar.alt ?? member.name ?? "", "alt")} class="w-full h-full object-cover" loading="lazy" data-astro-cid-7hg7l6j3>`}</div><h4 class="text-sm font-extrabold uppercase tracking-tight mb-1" data-astro-cid-7hg7l6j3>${member.name}</h4><span class="text-[9px] font-bold text-[var(--primary)] uppercase tracking-widest mb-4" data-astro-cid-7hg7l6j3>${member.role}</span><p class="text-xs text-[var(--foreground)] leading-relaxed mb-5" data-astro-cid-7hg7l6j3>${member.bio}</p>${member.ctaLabel && member.ctaLink && renderTemplate`<a class="text-[10px] font-extrabold uppercase tracking-widest text-[var(--card-foreground)] border-b-2 border-[var(--card-foreground)] pb-1"${addAttribute(member.ctaLink, "href")} data-astro-cid-7hg7l6j3>${member.ctaLabel}</a>`}</div>`)}</div></section>`}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/listings/TeamSection.astro", void 0);
//#endregion
//#region src/components/listings/AchievementsWall.astro
createAstro("https://marylandbusiness.online");
var $$AchievementsWall = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$AchievementsWall;
	const { listing } = Astro.props;
	const valid = (listing.achievements ?? []).filter((a) => a.label);
	return renderTemplate`${valid.length > 0 && renderTemplate`${maybeRenderHead($$result)}<section id="achievements" class="bg-[#F3EFE8] -mx-6 px-6 md:-mx-16 md:px-16" data-astro-cid-zsc2j4er><h2 class="text-xl font-extrabold text-[var(--card-foreground)] uppercase tracking-widest mb-2" data-astro-cid-zsc2j4er>${listing.achievementsHeading}</h2><p class="text-[10px] font-bold text-[var(--foreground)] uppercase tracking-widest mb-8" data-astro-cid-zsc2j4er>${listing.achievementsSub}</p><div class="grid grid-cols-2 md:grid-cols-4 gap-4" data-astro-cid-zsc2j4er>${valid.map((achievement) => renderTemplate`<div class="bg-white border border-[var(--border)] p-6 flex flex-col items-center text-center" data-astro-cid-zsc2j4er><span class="text-[10px] font-extrabold uppercase tracking-widest mb-1" data-astro-cid-zsc2j4er>${achievement.label}</span><span class="text-[8px] font-bold text-[var(--foreground)] uppercase tracking-widest" data-astro-cid-zsc2j4er>${achievement.subLabel}</span></div>`)}</div></section>`}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/listings/AchievementsWall.astro", void 0);
//#endregion
//#region src/components/listings/QaSection.astro
createAstro("https://marylandbusiness.online");
var $$QaSection = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$QaSection;
	const { listing } = Astro.props;
	const valid = (listing.qa ?? []).filter((item) => item.question && item.answer);
	return renderTemplate`${valid.length > 0 && renderTemplate`${maybeRenderHead($$result)}<section id="qa" data-astro-cid-m6hc3q6f><div class="flex items-center justify-between mb-8" data-astro-cid-m6hc3q6f><h2 class="text-xl font-extrabold text-[var(--card-foreground)] uppercase tracking-widest" data-astro-cid-m6hc3q6f>${listing.qaHeading}</h2>${listing.qaAskLabel && renderTemplate`<span class="text-[10px] font-bold text-[var(--primary)] uppercase tracking-widest" data-astro-cid-m6hc3q6f>${listing.qaAskLabel}</span>`}</div><div class="space-y-2" data-astro-cid-m6hc3q6f>${valid.map((item) => renderTemplate`<div class="qa-item" data-astro-cid-m6hc3q6f><p class="font-bold text-[var(--card-foreground)] mb-2" data-astro-cid-m6hc3q6f>${listing.qaQuestionPrefix} ${item.question}</p><p class="text-sm text-[var(--foreground)]" data-astro-cid-m6hc3q6f>${listing.qaAnswerPrefix} ${item.answer}</p></div>`)}</div></section>`}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/listings/QaSection.astro", void 0);
//#endregion
//#region src/components/listings/ReviewsSection.astro
createAstro("https://marylandbusiness.online");
var $$ReviewsSection = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ReviewsSection;
	const { listing } = Astro.props;
	const reviews = (listing.reviews ?? []).filter((r) => r.body || r.title);
	const count = reviews.length;
	const avg = count > 0 ? reviews.reduce((sum, r) => sum + (r.rating ?? 0), 0) / count : 0;
	const fullStars = Math.floor(avg);
	const halfStar = avg - fullStars >= .5;
	const distribution = [
		5,
		4,
		3,
		2,
		1
	].map((stars) => {
		const n = reviews.filter((r) => r.rating === stars).length;
		return {
			stars,
			pct: count > 0 ? Math.round(n / count * 100) : 0
		};
	});
	const dateFmt = new Intl.DateTimeFormat("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
		timeZone: "UTC"
	});
	return renderTemplate`${count > 0 && renderTemplate`${maybeRenderHead($$result)}<section id="reviews" data-astro-cid-lpxj2yy3><h2 class="text-xl font-extrabold text-[var(--card-foreground)] uppercase tracking-widest mb-10" data-astro-cid-lpxj2yy3>${listing.reviewsHeading}</h2><div class="flex flex-col md:flex-row gap-10 md:gap-16" data-astro-cid-lpxj2yy3><div class="md:w-[300px]" data-astro-cid-lpxj2yy3><div class="text-5xl font-extrabold text-[var(--card-foreground)] mb-2" data-astro-cid-lpxj2yy3>${avg.toFixed(1)}</div><div class="star-rating flex items-center gap-1 mb-6" data-astro-cid-lpxj2yy3>${Array.from({ length: 5 }).map((_, i) => renderTemplate`${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:star",
		"class": `${i < fullStars || i === fullStars && halfStar ? "star-full" : "star-empty"}`,
		"data-astro-cid-lpxj2yy3": true
	})}`)}</div><div class="space-y-3" data-astro-cid-lpxj2yy3>${distribution.map((row) => renderTemplate`<div class="dist-row flex items-center text-[10px] font-bold uppercase tracking-widest" data-astro-cid-lpxj2yy3><span class="w-12" data-astro-cid-lpxj2yy3>${row.stars} ${listing.ratingStarLabel}</span><div class="rating-bar" data-astro-cid-lpxj2yy3><div class="rating-bar-fill"${addAttribute(`width: ${row.pct}%`, "style")} data-astro-cid-lpxj2yy3></div></div><span class="w-8 text-right" data-astro-cid-lpxj2yy3>${row.pct}%</span></div>`)}</div></div><div class="flex-1 space-y-10" data-astro-cid-lpxj2yy3>${reviews.map((review) => renderTemplate`<div class="border-b border-[var(--border)] pb-8" data-astro-cid-lpxj2yy3><div class="flex items-center gap-3 mb-4" data-astro-cid-lpxj2yy3>${review.avatar?.asset && renderTemplate`<img${addAttribute(sanityImageUrl(review.avatar, { width: 80 }), "src")}${addAttribute(review.avatar.alt ?? review.name ?? "", "alt")} class="w-10 h-10 grayscale border border-[var(--border)]" loading="lazy" data-astro-cid-lpxj2yy3>`}<div data-astro-cid-lpxj2yy3><h4 class="text-xs font-extrabold uppercase tracking-widest" data-astro-cid-lpxj2yy3>${review.name}</h4><div class="flex items-center gap-2" data-astro-cid-lpxj2yy3>${review.verifiedVisit && renderTemplate`<span class="text-[8px] font-bold text-green-600 uppercase border border-green-600 px-2 py-0.5" data-astro-cid-lpxj2yy3>${listing.verifiedVisitLabel}</span>`}${review.date && renderTemplate`<span class="text-[8px] font-bold text-[var(--foreground)] uppercase" data-astro-cid-lpxj2yy3>${dateFmt.format(new Date(review.date))}</span>`}</div></div></div><div class="star-rating flex items-center gap-1 mb-3" data-astro-cid-lpxj2yy3>${Array.from({ length: 5 }).map((_, i) => renderTemplate`${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:star",
		"class": `${i < (review.rating ?? 0) ? "star-full" : "star-empty"}`,
		"data-astro-cid-lpxj2yy3": true
	})}`)}</div><h5 class="font-bold text-[var(--card-foreground)] mb-3" data-astro-cid-lpxj2yy3>${review.title}</h5><p class="text-sm text-[var(--foreground)] leading-relaxed" data-astro-cid-lpxj2yy3>${review.body}</p></div>`)}</div></div></section>`}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/listings/ReviewsSection.astro", void 0);
//#endregion
//#region src/components/listings/SimilarGrid.astro
createAstro("https://marylandbusiness.online");
var $$SimilarGrid = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SimilarGrid;
	const { listing } = Astro.props;
	const valid = (listing.similar ?? []).filter((item) => item.name && item.image?.asset);
	return renderTemplate`${valid.length > 0 && renderTemplate`${maybeRenderHead($$result)}<section id="similar" data-astro-cid-xdwm6syf><h2 class="text-xl font-extrabold text-[var(--card-foreground)] uppercase tracking-widest mb-8" data-astro-cid-xdwm6syf>${listing.similarHeading}</h2><div class="grid grid-cols-1 md:grid-cols-3 gap-6" data-astro-cid-xdwm6syf>${valid.map((item) => renderTemplate`<div class="border border-[var(--border)]" data-astro-cid-xdwm6syf><div class="h-40 overflow-hidden" data-astro-cid-xdwm6syf><img class="w-full h-full object-cover"${addAttribute(sanityImageUrl(item.image, { width: 640 }), "src")}${addAttribute(item.image.alt ?? item.name ?? "", "alt")} loading="lazy" data-astro-cid-xdwm6syf></div><div class="p-4" data-astro-cid-xdwm6syf><h4 class="text-[10px] font-extrabold uppercase tracking-widest" data-astro-cid-xdwm6syf>${item.name}</h4><div class="flex items-center gap-2 mt-1" data-astro-cid-xdwm6syf>${item.subcategory?.name && renderTemplate`<span class="text-[8px] font-bold uppercase text-[var(--foreground)]" data-astro-cid-xdwm6syf>${item.subcategory.name}</span>`}${item.priceRange && renderTemplate`<span class="text-[8px] font-bold uppercase text-[var(--primary)]" data-astro-cid-xdwm6syf>${item.priceRange}</span>`}</div></div></div>`)}</div></section>`}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/listings/SimilarGrid.astro", void 0);
defineType({
	name: "listingAddress",
	title: "Address",
	type: "object",
	fields: [
		defineField({
			name: "street",
			title: "Street",
			type: "string",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "city",
			title: "City",
			type: "string",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "region",
			title: "Region",
			type: "string",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "postalCode",
			title: "Postal Code",
			type: "string",
			validation: (rule) => rule.required()
		})
	],
	preview: {
		select: {
			street: "street",
			city: "city",
			region: "region"
		},
		prepare({ street, city, region }) {
			return {
				title: street,
				subtitle: [city, region].filter(Boolean).join(", ")
			};
		}
	}
});
//#endregion
//#region src/sanity/schemaTypes/components/hourSpan.ts
var DAYS = [
	{
		title: "Monday",
		value: "mon"
	},
	{
		title: "Tuesday",
		value: "tue"
	},
	{
		title: "Wednesday",
		value: "wed"
	},
	{
		title: "Thursday",
		value: "thu"
	},
	{
		title: "Friday",
		value: "fri"
	},
	{
		title: "Saturday",
		value: "sat"
	},
	{
		title: "Sunday",
		value: "sun"
	}
];
defineType({
	name: "hourSpan",
	title: "Hours Span",
	type: "object",
	fields: [
		defineField({
			name: "day",
			title: "Day",
			type: "string",
			options: { list: DAYS },
			validation: (rule) => rule.required().custom((value) => DAYS.some((d) => d.value === value) || `Day must be one of: ${DAYS.map((d) => d.value).join(", ")}`)
		}),
		defineField({
			name: "opens",
			title: "Opens",
			type: "string",
			description: "24h time, e.g. 11:00",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "closes",
			title: "Closes",
			type: "string",
			description: "24h time, e.g. 22:00",
			validation: (rule) => rule.required()
		})
	],
	preview: {
		select: {
			day: "day",
			opens: "opens",
			closes: "closes"
		},
		prepare({ day, opens, closes }) {
			return {
				title: DAYS.find((d) => d.value === day)?.title ?? day,
				subtitle: `${opens} – ${closes}`
			};
		}
	}
});
defineType({
	name: "amenity",
	title: "Amenity",
	type: "object",
	fields: [defineField({
		name: "label",
		title: "Label",
		type: "string",
		validation: (rule) => rule.required()
	})],
	preview: {
		select: {
			label: "label",
			icon: "icon"
		},
		prepare({ label, icon }) {
			return {
				title: label,
				subtitle: icon
			};
		}
	}
});
defineType({
	name: "achievement",
	title: "Achievement",
	type: "object",
	fields: [defineField({
		name: "label",
		title: "Label",
		type: "string",
		validation: (rule) => rule.required()
	}), defineField({
		name: "subLabel",
		title: "Sub Label",
		type: "string",
		validation: (rule) => rule.required()
	})],
	preview: {
		select: {
			label: "label",
			subLabel: "subLabel"
		},
		prepare({ label, subLabel }) {
			return {
				title: label,
				subtitle: subLabel
			};
		}
	}
});
defineType({
	name: "menuCategory",
	title: "Menu Category",
	type: "object",
	fields: [defineField({
		name: "label",
		title: "Label",
		type: "string",
		validation: (rule) => rule.required()
	}), defineField({
		name: "items",
		title: "Items",
		type: "array",
		of: [{ type: "menuItem" }],
		validation: (rule) => rule.required().min(1)
	})],
	preview: {
		select: {
			label: "label",
			items: "items"
		},
		prepare({ label, items }) {
			const count = Array.isArray(items) ? items.length : 0;
			return {
				title: label,
				subtitle: `${count} item${count === 1 ? "" : "s"}`
			};
		}
	}
});
//#endregion
//#region src/sanity/schemaTypes/components/listingEvent.ts
var MONTHS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec"
];
defineType({
	name: "listingEvent",
	title: "Listing Event",
	type: "object",
	fields: [
		defineField({
			name: "month",
			title: "Month",
			type: "string",
			options: { list: MONTHS },
			validation: (rule) => rule.required().custom((value) => MONTHS.includes(value) || `Month must be one of: ${MONTHS.join(", ")}`)
		}),
		defineField({
			name: "day",
			title: "Day",
			type: "number",
			validation: (rule) => rule.required().integer().min(1).max(31)
		}),
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "time",
			title: "Time",
			type: "string",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "venue",
			title: "Venue",
			type: "string",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "ctaLabel",
			title: "CTA Label",
			type: "string",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "ctaLink",
			title: "CTA Link",
			type: "url",
			validation: (rule) => rule.required()
		})
	],
	preview: {
		select: {
			title: "title",
			month: "month",
			day: "day",
			time: "time",
			venue: "venue"
		},
		prepare({ title, month, day, time, venue }) {
			return {
				title,
				subtitle: [
					`${month} ${day}`,
					time,
					venue
				].filter(Boolean).join(" · ")
			};
		}
	}
});
defineType({
	name: "qaItem",
	title: "Q&A Item",
	type: "object",
	fields: [defineField({
		name: "question",
		title: "Question",
		type: "string",
		validation: (rule) => rule.required()
	}), defineField({
		name: "answer",
		title: "Answer",
		type: "string",
		validation: (rule) => rule.required()
	})],
	preview: {
		select: { question: "question" },
		prepare({ question }) {
			return { title: question };
		}
	}
});
defineType({
	name: "teamMember",
	title: "Team Member",
	type: "object",
	fields: [
		defineField({
			name: "name",
			title: "Name",
			type: "string",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "role",
			title: "Role",
			type: "string",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "bio",
			title: "Bio",
			type: "string",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "avatar",
			title: "Avatar",
			type: "image",
			fields: [defineField({
				name: "alt",
				title: "Alt Text",
				type: "string",
				validation: (rule) => rule.required()
			})]
		}),
		defineField({
			name: "ctaLabel",
			title: "CTA Label",
			type: "string",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "ctaLink",
			title: "CTA Link",
			type: "url",
			validation: (rule) => rule.required()
		})
	],
	preview: {
		select: {
			name: "name",
			role: "role"
		},
		prepare({ name, role }) {
			return {
				title: name,
				subtitle: role
			};
		}
	}
});
defineType({
	name: "promotion",
	title: "Promotion",
	type: "object",
	fields: [
		defineField({
			name: "eyebrow",
			title: "Eyebrow",
			type: "string",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "heading",
			title: "Heading",
			type: "string",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "note",
			title: "Note",
			type: "string",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "ctaLabel",
			title: "CTA Label",
			type: "string",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "ctaLink",
			title: "CTA Link",
			type: "url",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "tone",
			title: "Tone",
			type: "string",
			options: { list: [{
				title: "Coupon",
				value: "coupon"
			}, {
				title: "Gift Card",
				value: "giftCard"
			}] },
			validation: (rule) => rule.custom((value) => !value || ["coupon", "giftCard"].includes(value) || "Tone must be one of: coupon, giftCard")
		})
	],
	preview: {
		select: {
			heading: "heading",
			eyebrow: "eyebrow",
			note: "note"
		},
		prepare({ heading, eyebrow, note }) {
			return {
				title: heading,
				subtitle: [eyebrow, note].filter(Boolean).join(" · ")
			};
		}
	}
});
//#endregion
//#region src/sanity/schemaTypes/entities/listing.ts
/** Closed value sets: `options.list` drives the Studio picker, `custom()` also
* guards API/seed writes — arbitrary values fail validation either way. */
var PRICE_RANGES = [
	"$",
	"$$",
	"$$$",
	"$$$$"
];
var TAX_STATUSES = [{
	title: "Active / Valid",
	value: "active"
}, {
	title: "Invalid",
	value: "invalid"
}];
defineType({
	name: "listing",
	title: "Listing",
	type: "document",
	fields: [
		defineField({
			name: "name",
			title: "Name",
			type: "string",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "name",
				maxLength: 96
			},
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "text",
			rows: 3,
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "subcategory",
			title: "Subcategory",
			type: "reference",
			to: [{ type: "subcategory" }],
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "county",
			title: "County",
			type: "reference",
			to: [{ type: "county" }],
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "city",
			title: "City",
			type: "reference",
			to: [{ type: "city" }],
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "rankLine",
			title: "Rank Line",
			type: "string",
			description: "e.g. \"#1 Ranked Seafood in Annapolis\"",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "priceRange",
			title: "Price Range",
			type: "string",
			options: { list: PRICE_RANGES },
			validation: (rule) => rule.required().custom((value) => PRICE_RANGES.includes(value) || `Price range must be one of: ${PRICE_RANGES.join(", ")}`)
		}),
		defineField({
			name: "featured",
			title: "Featured",
			type: "boolean"
		}),
		defineField({
			name: "breadcrumbRoot",
			title: "Breadcrumb Root",
			type: "string",
			description: "e.g. \"Maryland\" — root crumb above the listing name",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "reviewCountSingularLabel",
			title: "Review Count Singular Label",
			type: "string",
			description: "e.g. \"REVIEW\"",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "reviewCountPluralLabel",
			title: "Review Count Plural Label",
			type: "string",
			description: "e.g. \"REVIEWS\"",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "image",
			title: "Primary Image",
			type: "image",
			options: { hotspot: true },
			fields: [defineField({
				name: "alt",
				title: "Alt text",
				type: "string",
				validation: (rule) => rule.required()
			})],
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "gallery",
			title: "Gallery",
			type: "array",
			of: [{
				type: "image",
				options: { hotspot: true },
				fields: [defineField({
					name: "alt",
					title: "Alt text",
					type: "string",
					validation: (rule) => rule.required()
				})]
			}]
		}),
		defineField({
			name: "videoStill",
			title: "Video Still",
			type: "image",
			fields: [defineField({
				name: "alt",
				title: "Alt text",
				type: "string",
				validation: (rule) => rule.required()
			})]
		}),
		defineField({
			name: "videoHeading",
			title: "Video Heading",
			type: "string",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "videoLabel",
			title: "Video Label",
			type: "string",
			description: "e.g. \"30-Second Walkthrough\"",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "videoEyebrow",
			title: "Video Eyebrow",
			type: "string",
			description: "e.g. \"Experience the Atmosphere\"",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "videoCaption",
			title: "Video Caption",
			type: "string",
			description: "e.g. \"Waterfront Dining, Live Kitchen & Golden Hour Views\"",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "videoDuration",
			title: "Video Duration",
			type: "string",
			description: "e.g. 0:30"
		}),
		defineField({
			name: "videoUrl",
			title: "Video URL",
			type: "url"
		}),
		defineField({
			name: "aboutHeading",
			title: "About Heading",
			type: "string",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "about",
			title: "About",
			type: "array",
			of: [{ type: "block" }],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: "whyChooseUsHeading",
			title: "Why Choose Us Heading",
			type: "string",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "whyChooseUs",
			title: "Why Choose Us",
			type: "array",
			of: [{ type: "block" }],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: "amenitiesHeading",
			title: "Amenities Heading",
			type: "string",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "amenities",
			title: "Amenities",
			type: "array",
			of: [{ type: "amenity" }],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: "achievementsHeading",
			title: "Achievements Heading",
			type: "string",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "achievementsSub",
			title: "Achievements Sub",
			type: "string",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "achievements",
			title: "Achievements",
			type: "array",
			of: [{ type: "achievement" }],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: "menuHeading",
			title: "Menu Heading",
			type: "string",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "menuNote",
			title: "Menu Note",
			type: "string",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "menuCtaLabel",
			title: "Menu CTA Label",
			type: "string",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "menuUrl",
			title: "Menu URL",
			type: "url",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "menu",
			title: "Menu",
			type: "array",
			of: [{ type: "menuCategory" }],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: "eventsHeading",
			title: "Events Heading",
			type: "string",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "events",
			title: "Events",
			type: "array",
			of: [{ type: "listingEvent" }],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: "qaHeading",
			title: "Q&A Heading",
			type: "string",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "qaAskLabel",
			title: "Q&A Ask Label",
			type: "string",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "qaQuestionPrefix",
			title: "Q&A Question Prefix",
			type: "string",
			description: "e.g. \"Q:\"",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "qaAnswerPrefix",
			title: "Q&A Answer Prefix",
			type: "string",
			description: "e.g. \"A:\"",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "qa",
			title: "Q&A",
			type: "array",
			of: [{ type: "qaItem" }],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: "teamHeading",
			title: "Team Heading",
			type: "string",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "team",
			title: "Team",
			type: "array",
			of: [{ type: "teamMember" }],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: "promotions",
			title: "Promotions",
			type: "array",
			of: [{ type: "promotion" }]
		}),
		defineField({
			name: "reviewsHeading",
			title: "Reviews Heading",
			type: "string",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "verifiedVisitLabel",
			title: "Verified Visit Label",
			type: "string",
			description: "Chip label for verified reviews, e.g. \"Verified Visit\"",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "ratingStarLabel",
			title: "Rating Star Label",
			type: "string",
			description: "Distribution row label, e.g. \"Star\"",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "pulseBookedText",
			title: "Pulse Booked Text",
			type: "string",
			description: "Template with {n} placeholder, e.g. \"{n} people booked in the last hour\"",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "pulseCapacityText",
			title: "Pulse Capacity Text",
			type: "string",
			description: "Template with {n} placeholder, e.g. \"Currently {n}% Full — book ahead\"",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "pulseWaitText",
			title: "Pulse Wait Text",
			type: "string",
			description: "Template with {n} placeholder, e.g. \"Wait time: ~{n} mins\"",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "reviews",
			title: "Reviews",
			type: "array",
			of: [{
				type: "reference",
				to: [{ type: "review" }]
			}]
		}),
		defineField({
			name: "pulse",
			title: "Pulse Observations",
			type: "array",
			of: [{
				type: "reference",
				to: [{ type: "pulse" }]
			}]
		}),
		defineField({
			name: "stories",
			title: "Editorial Stories",
			type: "array",
			of: [{
				type: "reference",
				to: [{ type: "editorialStory" }]
			}]
		}),
		defineField({
			name: "editorialHeading",
			title: "Editorial Heading",
			type: "string",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "editorialSub",
			title: "Editorial Sub",
			type: "string",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "editorialCtaLabel",
			title: "Editorial CTA Label",
			type: "string",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "similarHeading",
			title: "Similar Heading",
			type: "string",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "similar",
			title: "Similar Listings",
			type: "array",
			of: [{
				type: "reference",
				to: [{ type: "listing" }]
			}]
		}),
		defineField({
			name: "phone",
			title: "Phone",
			type: "string",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "website",
			title: "Website",
			type: "url",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "directionsUrl",
			title: "Directions URL",
			type: "url",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "address",
			title: "Address",
			type: "listingAddress",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "hours",
			title: "Hours",
			type: "array",
			of: [{ type: "hourSpan" }],
			validation: (rule) => rule.required().min(1)
		}),
		defineField({
			name: "geo",
			title: "Geo Coordinates",
			type: "geopoint"
		}),
		defineField({
			name: "ctaPrimaryLabel",
			title: "Primary CTA Label",
			type: "string",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "ctaPrimaryUrl",
			title: "Primary CTA URL",
			type: "url",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "ctaSecondaryLabel",
			title: "Secondary CTA Label",
			type: "string",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "ctaSecondaryUrl",
			title: "Secondary CTA URL",
			type: "url",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "phoneLabel",
			title: "Buy Box Phone Label",
			type: "string",
			description: "e.g. \"Phone\"",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "websiteLabel",
			title: "Buy Box Website Label",
			type: "string",
			description: "e.g. \"Website\"",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "addressLabel",
			title: "Buy Box Address Label",
			type: "string",
			description: "e.g. \"Address\"",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "directionsLabel",
			title: "Buy Box Directions Label",
			type: "string",
			description: "e.g. \"Get Directions\"",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "verificationHeading",
			title: "Buy Box Verification Heading",
			type: "string",
			description: "e.g. \"Verification Data\"",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "taxStatusLabel",
			title: "Buy Box Tax Status Label",
			type: "string",
			description: "e.g. \"Tax ID Status\" — display values come from the TAX_STATUSES enum titles",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "licenseLabel",
			title: "Buy Box License Label",
			type: "string",
			description: "e.g. \"License Number\"",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "lastAuditLabel",
			title: "Buy Box Last Audit Label",
			type: "string",
			description: "e.g. \"Last Audit\"",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "openNowLabel",
			title: "Buy Box Open Now Label",
			type: "string",
			description: "e.g. \"Open Now\"",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "closedLabel",
			title: "Buy Box Closed Label",
			type: "string",
			description: "e.g. \"Closed\"",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "closesAtLabel",
			title: "Buy Box Closes At Label",
			type: "string",
			description: "e.g. \"Closes at\"",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "opensAtLabel",
			title: "Buy Box Opens At Label",
			type: "string",
			description: "e.g. \"Opens at\"",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "taxStatus",
			title: "Tax ID Status",
			type: "string",
			options: { list: TAX_STATUSES },
			validation: (rule) => rule.required().custom((value) => TAX_STATUSES.some((o) => o.value === value) || `Tax ID status must be one of: ${TAX_STATUSES.map((o) => o.value).join(", ")}`)
		}),
		defineField({
			name: "licenseNumber",
			title: "License Number",
			type: "string",
			validation: (rule) => rule.required()
		}),
		defineField({
			name: "lastAudit",
			title: "Last Audit",
			type: "date",
			validation: (rule) => rule.required()
		})
	],
	preview: {
		select: {
			name: "name",
			subcategory: "subcategory->name",
			county: "county->name",
			city: "city->name",
			media: "image"
		},
		prepare({ name, subcategory, county, city, media }) {
			return {
				title: name ?? "Listing",
				subtitle: [
					subcategory,
					county,
					city
				].filter(Boolean).join(" · "),
				media
			};
		}
	}
});
//#endregion
//#region src/components/listings/BuyBox.astro
createAstro("https://marylandbusiness.online");
var $$BuyBox = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$BuyBox;
	const { listing } = Astro.props;
	const hasContent = Boolean(listing.priceRange || listing.ctaPrimaryLabel || listing.ctaSecondaryLabel || listing.phone || listing.website || listing.address);
	function fmtTime(hhmm) {
		if (!hhmm) return "";
		const [h, m] = hhmm.split(":").map(Number);
		return `${h % 12 === 0 ? 12 : h % 12}:${String(m ?? 0).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
	}
	const weekdayToKey = {
		Sun: "sun",
		Mon: "mon",
		Tue: "tue",
		Wed: "wed",
		Thu: "thu",
		Fri: "fri",
		Sat: "sat"
	};
	const parts = new Intl.DateTimeFormat("en-US", {
		timeZone: "America/New_York",
		weekday: "short",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false
	}).formatToParts(/* @__PURE__ */ new Date());
	const get = (type) => parts.find((p) => p.type === type)?.value ?? "";
	const todayKey = weekdayToKey[get("weekday")];
	const now = `${get("hour")}:${get("minute")}`;
	const today = (listing.hours ?? []).find((h) => h.day === todayKey);
	const isOpen = Boolean(today?.opens && today?.closes && now >= today.opens && now <= today.closes);
	const websiteLabel = listing.website?.replace(/^https?:\/\//, "");
	const dateFmt = new Intl.DateTimeFormat("en-US", {
		month: "short",
		year: "numeric",
		timeZone: "UTC"
	});
	const taxTitle = TAX_STATUSES.find((o) => o.value === listing.taxStatus)?.title;
	return renderTemplate`${hasContent && renderTemplate`${maybeRenderHead($$result)}<div class="buy-box" data-astro-cid-b3pza54p>${(listing.priceRange || today) && renderTemplate`<div class="flex items-center justify-between mb-4 pb-4 border-b border-[var(--border)]" data-astro-cid-b3pza54p>${listing.priceRange && renderTemplate`<div class="text-2xl font-extrabold text-[var(--card-foreground)]" data-astro-cid-b3pza54p>${listing.priceRange}</div>`}${today && renderTemplate`<div class="flex flex-col items-end" data-astro-cid-b3pza54p><span${addAttribute(`flex items-center gap-2 text-[11px] font-bold ${isOpen ? "text-green-600" : "text-[var(--primary)]"}`, "class")} data-astro-cid-b3pza54p>${isOpen && renderTemplate`<span class="relative flex h-2 w-2" data-astro-cid-b3pza54p><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" data-astro-cid-b3pza54p></span><span class="relative inline-flex rounded-full h-2 w-2 bg-green-500" data-astro-cid-b3pza54p></span></span>`}${isOpen ? listing.openNowLabel : listing.closedLabel}</span><span class="text-[11px] font-bold text-[var(--foreground)] mt-1" data-astro-cid-b3pza54p>${isOpen ? `${listing.closesAtLabel} ${fmtTime(today.closes)}` : `${listing.opensAtLabel} ${fmtTime(today.opens)}`}</span></div>`}</div>`}${(listing.ctaPrimaryLabel || listing.ctaSecondaryLabel) && renderTemplate`<div class="space-y-2 mb-5" data-astro-cid-b3pza54p>${listing.ctaPrimaryLabel && listing.ctaPrimaryUrl && renderTemplate`<a class="btn-primary w-full py-3 text-[13px]"${addAttribute(listing.ctaPrimaryUrl, "href")} data-astro-cid-b3pza54p>${listing.ctaPrimaryLabel}</a>`}${listing.ctaSecondaryLabel && listing.ctaSecondaryUrl && renderTemplate`<a class="btn-outline w-full py-3 text-[13px]"${addAttribute(listing.ctaSecondaryUrl, "href")} data-astro-cid-b3pza54p>${listing.ctaSecondaryLabel}</a>`}</div>`}<div class="space-y-3 pt-4 border-t border-[var(--border)]" data-astro-cid-b3pza54p>${listing.phone && renderTemplate`<div class="flex items-start gap-4" data-astro-cid-b3pza54p><div class="icon-box icon-box-sm" data-astro-cid-b3pza54p>${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:phone",
		"class": "w-3 h-3",
		"data-astro-cid-b3pza54p": true
	})}</div><div data-astro-cid-b3pza54p><span class="block text-[11px] font-bold text-[var(--foreground)] mb-1" data-astro-cid-b3pza54p>${listing.phoneLabel}</span><a class="block text-[13px] font-extrabold text-[var(--card-foreground)]"${addAttribute(`tel:${listing.phone.replace(/[^0-9+]/g, "")}`, "href")} data-astro-cid-b3pza54p>${listing.phone}</a></div></div>`}${listing.website && renderTemplate`<div class="flex items-start gap-4" data-astro-cid-b3pza54p><div class="icon-box icon-box-sm" data-astro-cid-b3pza54p>${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:world",
		"class": "w-3 h-3",
		"data-astro-cid-b3pza54p": true
	})}</div><div data-astro-cid-b3pza54p><span class="block text-[11px] font-bold text-[var(--foreground)] mb-1" data-astro-cid-b3pza54p>${listing.websiteLabel}</span><a class="block text-[13px] font-extrabold text-[var(--card-foreground)]"${addAttribute(listing.website, "href")} data-astro-cid-b3pza54p>${websiteLabel}</a></div></div>`}${listing.address && renderTemplate`<div class="flex items-start gap-4" data-astro-cid-b3pza54p><div class="icon-box icon-box-sm" data-astro-cid-b3pza54p>${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:map-pin",
		"class": "w-3 h-3",
		"data-astro-cid-b3pza54p": true
	})}</div><div data-astro-cid-b3pza54p><span class="block text-[11px] font-bold text-[var(--foreground)] mb-1" data-astro-cid-b3pza54p>${listing.addressLabel}</span><span class="block text-[13px] font-extrabold text-[var(--card-foreground)] leading-relaxed" data-astro-cid-b3pza54p>${listing.address.street}<br data-astro-cid-b3pza54p>${[
		listing.address.city,
		listing.address.region,
		listing.address.postalCode
	].filter(Boolean).join(", ")}</span>${listing.directionsUrl && renderTemplate`<a class="block text-[11px] font-bold text-[var(--primary)] mt-2"${addAttribute(listing.directionsUrl, "href")} data-astro-cid-b3pza54p>${listing.directionsLabel}</a>`}</div></div>`}</div>${(listing.taxStatus || listing.licenseNumber || listing.lastAudit) && renderTemplate`<div class="mt-4 pt-4 border-t border-[var(--border)] opacity-60" data-astro-cid-b3pza54p><div class="flex items-center justify-between mb-4" data-astro-cid-b3pza54p><h5 class="text-[11px] font-extrabold text-[var(--card-foreground)]" data-astro-cid-b3pza54p>${listing.verificationHeading}</h5>${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:shield-check",
		"class": "w-3 h-3 text-[var(--primary)]",
		"data-astro-cid-b3pza54p": true
	})}</div><div class="space-y-2" data-astro-cid-b3pza54p>${listing.taxStatus && renderTemplate`<div class="flex justify-between text-[11px] font-bold" data-astro-cid-b3pza54p><span class="text-[var(--foreground)]" data-astro-cid-b3pza54p>${listing.taxStatusLabel}</span><span${addAttribute(listing.taxStatus === "active" ? "text-green-600" : "text-[var(--primary)]", "class")} data-astro-cid-b3pza54p>${taxTitle}</span></div>`}${listing.licenseNumber && renderTemplate`<div class="flex justify-between text-[11px] font-bold" data-astro-cid-b3pza54p><span class="text-[var(--foreground)]" data-astro-cid-b3pza54p>${listing.licenseLabel}</span><span class="text-[var(--card-foreground)]" data-astro-cid-b3pza54p>${listing.licenseNumber}</span></div>`}${listing.lastAudit && renderTemplate`<div class="flex justify-between text-[11px] font-bold" data-astro-cid-b3pza54p><span class="text-[var(--foreground)]" data-astro-cid-b3pza54p>${listing.lastAuditLabel}</span><span class="text-[var(--card-foreground)]" data-astro-cid-b3pza54p>${dateFmt.format(new Date(listing.lastAudit))}</span></div>`}</div></div>`}</div>`}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/listings/BuyBox.astro", void 0);
//#endregion
//#region src/layouts/Listing.astro
createAstro("https://marylandbusiness.online");
var $$Listing = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Listing;
	const { frontmatter, slug } = Astro.props;
	const isListing = frontmatter?._type === "listing";
	const settings = await getSiteSettings();
	const title = frontmatter?.name || settings?.siteTitle || themeConfig_default.general.title;
	const description = frontmatter?.description;
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": title,
		"description": description,
		"slug": slug
	}, { "default": ($$result) => renderTemplate`${settings && renderTemplate`${renderComponent($$result, "Navbar", $$Navbar, { "settings": settings })}`}${isListing && renderTemplate`${maybeRenderHead($$result)}<div class="min-h-screen bg-[#FAF7F2]" style="font-family: 'Sora Variable', 'Sora', sans-serif;"><main class="max-w-[1600px] mx-auto flex flex-col lg:flex-row"><div class="flex-1 px-6 md:px-16 py-12 border-b lg:border-b-0 lg:border-r border-[#e3e0dc]">${renderComponent($$result, "DetailHeader", $$DetailHeader, { "listing": frontmatter })}${renderComponent($$result, "PulseBar", $$PulseBar, { "listing": frontmatter })}${renderComponent($$result, "Promotions", $$Promotions, { "promotions": frontmatter.promotions })}${renderComponent($$result, "GalleryGrid", $$GalleryGrid, { "images": frontmatter.gallery })}${renderComponent($$result, "VibeCheck", $$VibeCheck, { "listing": frontmatter })}${renderComponent($$result, "Spotlight", $$Spotlight, {
		"heading": frontmatter?.editorialHeading ?? "",
		"sub": frontmatter?.editorialSub ?? "",
		"ctaLabel": frontmatter?.editorialCtaLabel ?? "",
		"stories": frontmatter?.editorialStories ?? []
	})}${renderComponent($$result, "ListingEvents", $$ListingEvents, { "listing": frontmatter })}${renderComponent($$result, "AboutAmenities", $$AboutAmenities, { "listing": frontmatter })}${renderComponent($$result, "WhyChooseUs", $$WhyChooseUs, { "listing": frontmatter })}${renderComponent($$result, "MenuSection", $$MenuSection, { "listing": frontmatter })}${renderComponent($$result, "TeamSection", $$TeamSection, { "listing": frontmatter })}${renderComponent($$result, "AchievementsWall", $$AchievementsWall, { "listing": frontmatter })}${renderComponent($$result, "QaSection", $$QaSection, { "listing": frontmatter })}${renderComponent($$result, "ReviewsSection", $$ReviewsSection, { "listing": frontmatter })}${renderComponent($$result, "SimilarGrid", $$SimilarGrid, { "listing": frontmatter })}</div><aside class="w-full lg:w-[450px] shrink-0 px-6 md:px-12 py-12">${renderComponent($$result, "BuyBox", $$BuyBox, { "listing": frontmatter })}</aside></main></div>`}${settings && renderTemplate`${renderComponent($$result, "Footer", $$Footer, { "settings": settings })}`}` })}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/layouts/Listing.astro", void 0);
//#endregion
export { $$Listing as t };
