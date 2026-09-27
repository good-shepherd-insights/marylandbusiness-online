import { C as addAttribute, N as createAstro, b as renderTemplate, f as renderComponent, x as maybeRenderHead } from "./jsx-runtime_CgLb4yc8.mjs";
import { t as createComponent } from "./astro-component_D1QvgdDd.mjs";
import { t as renderScript } from "./script__Dvm899t.mjs";
import "./compiler_DxiFqWHW.mjs";
import { t as $$Icon } from "./components_nK_Mjrbt.mjs";
//#region src/components/app/Navbar.astro
createAstro("https://marylandbusiness.online");
var $$Navbar = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Navbar;
	const { settings } = Astro.props;
	const links = settings.navLinks ?? [];
	return renderTemplate`${links.length > 0 && renderTemplate`${maybeRenderHead($$result)}<nav class="site-navbar sticky top-0 z-50 bg-white border-b border-[var(--border)] h-16 md:h-[72px] flex items-center px-4 md:px-12 justify-between" data-astro-cid-lkuq4vvm><!-- Reserved: vector logo goes here --><div class="w-10 h-10 shrink-0" aria-hidden="true" data-astro-cid-lkuq4vvm></div><div class="hidden lg:flex items-center gap-10 font-bold text-[11px] uppercase tracking-widest text-[var(--foreground)]" data-astro-cid-lkuq4vvm>${links.map((link) => link.label && renderTemplate`<a${addAttribute(link.href ?? "#", "href")} data-astro-cid-lkuq4vvm>${link.label}</a>`)}</div><div class="flex items-center gap-4" data-astro-cid-lkuq4vvm>${settings.navCtaLabel && renderTemplate`<a href="#" class="btn-primary px-3 py-2 text-[10px] md:px-6 md:py-4 md:text-xs" data-astro-cid-lkuq4vvm>${settings.navCtaLabel}</a>`}<button type="button" class="mobile-toggle lg:hidden p-1" aria-label="Menu" data-astro-cid-lkuq4vvm>${renderComponent($$result, "Icon", $$Icon, {
		"name": "tabler:menu",
		"class": "w-5 h-5 text-[var(--card-foreground)]",
		"data-astro-cid-lkuq4vvm": true
	})}</button></div><div class="mobile-panel hidden absolute top-full left-0 right-0 bg-white border-b border-[var(--border)] flex-col px-4 py-4" data-astro-cid-lkuq4vvm>${links.map((link) => link.label && renderTemplate`<a${addAttribute(link.href ?? "#", "href")} class="py-3 font-bold text-[11px] uppercase tracking-widest text-[var(--foreground)]" data-astro-cid-lkuq4vvm>${link.label}</a>`)}</div></nav>`}${renderScript($$result, "/Users/dev/Projects/marylandbusiness-online/src/components/app/Navbar.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/app/Navbar.astro", void 0);
//#endregion
export { $$Navbar as t };
