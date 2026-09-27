import { C as addAttribute, N as createAstro, _ as renderSlot, a as renderTransition, b as renderTemplate, f as renderComponent, m as Fragment, n as createVNode, r as __astro_tag_component__, x as maybeRenderHead } from "./jsx-runtime_CgLb4yc8.mjs";
import { t as createComponent } from "./astro-component_D1QvgdDd.mjs";
import { t as renderScript } from "./script__Dvm899t.mjs";
import "./compiler_DxiFqWHW.mjs";
import { f as getSiteSettings, p as themeConfig_default, r as getBlogPosts, u as getListings } from "./queries_FWj6Z0Gm.mjs";
import { t as $$Icon } from "./components_nK_Mjrbt.mjs";
import { n as sanityImageUrl, t as sanityImageSrcSet } from "./client_uFEOuo7D.mjs";
import { r as getFilterOptions } from "./paths_nDJog9kw.mjs";
import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderList, ssrRenderSlot } from "vue/server-renderer";
import { perspectiveCookieName } from "@sanity/preview-url-secret/constants";
import { useStore } from "@nanostores/vue";
import { atom } from "nanostores";
//#region src/components/directory/cards/BulletCard.astro
createAstro("https://marylandbusiness.online");
var $$BulletCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$BulletCard;
	const { myItem, href } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<a${addAttribute(href, "href")}><div class="flex flex-row gap-2.5 items-center">${myItem.image ? renderTemplate`<img class="h-5 w-5 flex-shrink-0"${addAttribute(sanityImageUrl(myItem.image, {
		width: 40,
		height: 40
	}), "src")}${addAttribute(sanityImageSrcSet(myItem.image, 40), "srcset")} width="20" height="20" loading="lazy"${addAttribute(myItem.image?.alt ?? myItem.name, "alt")}>` : renderTemplate`${renderComponent($$result, "Icon", $$Icon, {
		"class": "h-5 w-5 flex-shrink-0 text-gray-200 dark:text-gray-700",
		"name": "tabler:circle-filled"
	})}`}<span class="font-semibold dark:text-gray-50 whitespace-nowrap card-title">${myItem.name}</span>${renderComponent($$result, "Icon", $$Icon, {
		"class": "h-5 w-5 flex-shrink-0 text-gray-500 dark:text-gray-300",
		"name": "tabler:minus"
	})}<span class="text-gray-500 dark:text-gray-300 truncate text-sm shrink card-description">${myItem.description}</span></div></a>`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/directory/cards/BulletCard.astro", void 0);
//#endregion
//#region src/components/directory/FeaturedTag.astro
var $$FeaturedTag = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<span class="absolute text-sm ml-4 font-medium py-0.5 group-hover:border-primary-500 -top-3 border border-gray-300 rounded-full bg-white px-3.5 text-gray-600 dark:bg-gray-800 dark:border-gray-500 dark:text-white">${themeConfig_default.directoryUI.featured.labelForCard}</span>`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/directory/FeaturedTag.astro", void 0);
//#endregion
//#region src/components/directory/cards/RectangleCard.astro
createAstro("https://marylandbusiness.online");
var $$RectangleCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$RectangleCard;
	const { myItem, href } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<a${addAttribute(href, "href")} class="block h-full border border-gray-200 dark:border-gray-500 hover:border-gray-400 hover:border-solid dark:hover:border-gray-300 rounded relative group transition-all duration-300">${myItem.featured ? renderTemplate`${renderComponent($$result, "DirectoryFeaturedTag", $$FeaturedTag, { "class": "ml-6" })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`` })}`}${myItem.image ? renderTemplate`<img class="w-full h-48 rounded-t object-cover"${addAttribute(sanityImageUrl(myItem.image, {
		width: 800,
		height: 400
	}), "src")}${addAttribute(sanityImageSrcSet(myItem.image, 800), "srcset")} width="800" height="400" loading="lazy"${addAttribute(myItem.image?.alt ?? myItem.name, "alt")}>` : renderTemplate`<div class="w-full h-48 px-2 text-center flex justify-center items-center rounded-t font-bold text-2xl bg-gray-200 dark:bg-gray-600">${myItem.name}</div>`}<div class="p-6"><h3 class="m-0 text-lg font-semibold dark:text-gray-50 card-title">${myItem?.name}</h3><p class="line-clamp-4 mt-2 card-description">${myItem.description}</p></div></a>`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/directory/cards/RectangleCard.astro", void 0);
//#endregion
//#region src/components/directory/cards/SmallHorizontalCard.astro
createAstro("https://marylandbusiness.online");
var $$SmallHorizontalCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SmallHorizontalCard;
	const { myItem, href } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<a class="relative flex items-center bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded-lg"${addAttribute(href, "href")}>${myItem.featured ? renderTemplate`${renderComponent($$result, "DirectoryFeaturedTag", $$FeaturedTag, { "class": "ml-6" })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`` })}`}<div class="flex-none mr-3 rounded-none w-16 h-16 overflow-hidden">${myItem.image ? renderTemplate`<img class="w-16 h-16 object-cover"${addAttribute(sanityImageUrl(myItem.image, {
		width: 128,
		height: 128
	}), "src")}${addAttribute(sanityImageSrcSet(myItem.image, 128), "srcset")} width="64" height="64" loading="lazy"${addAttribute(myItem.image?.alt ?? myItem.name, "alt")}>` : renderTemplate`<div class="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>`}</div><div class="flex-grow"><div class="flex items-center justify-between mb-0.5"><h3 class="font-bold line-clamp-1 text-ellipsis overflow-hidden card-title">${myItem.name}</h3></div><p class="text-sm md:text-xs text-gray-600 dark:text-gray-400 line-clamp-2 card-description">${myItem.description}</p></div></a>`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/directory/cards/SmallHorizontalCard.astro", void 0);
//#endregion
//#region src/components/directory/cards/index.astro
createAstro("https://marylandbusiness.online");
var $$Index = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const { item } = Astro.props;
	const myItem = {
		...item,
		...item.data
	};
	const href = (myItem.county?.slug?.current && myItem.city?.slug?.current ? `/${myItem.county.slug.current}/${myItem.city.slug.current}/${myItem.id}` : void 0) ?? `/${myItem.id}`;
	const type = themeConfig_default.directoryUI.grid.type;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(renderTransition($$result, "gtlkyxce", "", `${myItem.id}-card`), "data-astro-transition-scope")} class="listing"${addAttribute([
		myItem.county?.slug?.current,
		myItem.city?.slug?.current,
		myItem.subcategory?.slug?.current
	].filter(Boolean).join(","), "data-tags")}>${type == "icon-list" && renderTemplate`${renderComponent($$result, "BulletCard", $$BulletCard, {
		"myItem": myItem,
		"href": href
	})}`}${type == "rectangle-card-grid" && renderTemplate`${renderComponent($$result, "RectangleCard", $$RectangleCard, {
		"myItem": myItem,
		"href": href
	})}`}${type == "small-card-grid" && renderTemplate`${renderComponent($$result, "SmallHorizontalCard", $$SmallHorizontalCard, {
		"myItem": myItem,
		"href": href
	})}`}</div>`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/directory/cards/index.astro", "self");
//#endregion
//#region src/components/directory/PureGrid.astro
createAstro("https://marylandbusiness.online");
var $$PureGrid = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PureGrid;
	const { listings } = Astro.props;
	const type = themeConfig_default.directoryUI.grid.type;
	const grid = type == "rectangle-card-grid" || type == "small-card-grid";
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(["not-prose grid grid-cols-1 gap-4", { "md:grid-cols-2 lg:grid-cols-4": grid }], "class:list")}>${Array.isArray(listings) && listings.map((e) => renderTemplate`${renderComponent($$result, "DirectoryCard", $$Index, { "item": e })}`)}</div>`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/directory/PureGrid.astro", void 0);
//#endregion
//#region src/components/blog/Grid.astro
createAstro("https://marylandbusiness.online");
var $$Grid = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Grid;
	const perspectiveCookie = Astro.cookies.get(perspectiveCookieName)?.value;
	const blogListings = (await getBlogPosts(perspectiveCookie)).map((value) => ({
		...value,
		id: `blog/${value.id}`
	}));
	return renderTemplate`${renderComponent($$result, "PureGrid", $$PureGrid, {
		"id": "directory-grid",
		"listings": blogListings
	})}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/blog/Grid.astro", void 0);
//#endregion
//#region src/components/hero/SimpleLeftHero.astro
var $$SimpleLeftHero = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<div><h1 class="text-balance">${renderSlot($$result, $$slots["heading"])}</h1><p class="max-w-lg text-md leading-8">${renderSlot($$result, $$slots["description"])}</p></div>`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/hero/SimpleLeftHero.astro", void 0);
//#endregion
//#region src/util/formatString.ts
var formatString = (template, ...args) => {
	return template.replace(/{([0-9]+)}/g, function(match, index) {
		return typeof args[index] === "undefined" ? match : args[index];
	});
};
atom("");
var tags = atom([]);
//#endregion
//#region \0plugin-vue:export-helper
var _plugin_vue_export_helper_default = (sfc, props) => {
	const target = sfc.__vccOpts || sfc;
	for (const [key, val] of props) target[key] = val;
	return target;
};
//#endregion
//#region src/components/ui/tags/Grid.vue
var _sfc_main$1 = /*@__PURE__*/ defineComponent({
	__name: "Grid",
	props: { options: {} },
	setup(__props, { expose: __expose }) {
		__expose();
		const props = __props;
		const selectedTags = useStore(tags);
		function toggleTag(tag) {
			if (!tag) return;
			if (!selectedTags.value.includes(tag)) tags.set([...selectedTags.value, tag]);
			else {
				let filtered = selectedTags.value.filter((e) => e !== tag);
				tags.set([...filtered]);
			}
		}
		const __returned__ = {
			props,
			selectedTags,
			toggleTag
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-wrap gap-2 mt-4" }, _attrs))}><!--[-->`);
	ssrRenderList($setup.props.options, (option) => {
		_push(`<span class="${ssrRenderClass([$setup.selectedTags.includes(option.value) ? "border-primary-500 dark:border-primary-300" : "", "border border-gray-200 rounded-md px-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-900 dark:border-gray-600 cursor-pointer select-none"])}">${ssrInterpolate(option.label)}</span>`);
	});
	_push(`<!--]--></div>`);
}
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/tags/Grid.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var Grid_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
//#endregion
//#region src/components/ui/tags/Select.vue
var _sfc_main = /*@__PURE__*/ defineComponent({
	__name: "Select",
	props: { options: {} },
	setup(__props, { expose: __expose }) {
		__expose();
		const props = __props;
		const selectedTags = useStore(tags);
		function labelFor(value) {
			return props.options.find((o) => o.value === value)?.label ?? value;
		}
		function removeTag(tag) {
			const updatedTags = selectedTags.value.filter((t) => t !== tag);
			tags.set(updatedTags);
		}
		function addTagWithEvent(event) {
			const select = event.target;
			const selectedTag = select.value;
			if (!selectedTag) return;
			if (!selectedTags.value.includes(selectedTag)) tags.set([...selectedTags.value, selectedTag]);
			select.value = "";
		}
		const __returned__ = {
			props,
			selectedTags,
			labelFor,
			removeTag,
			addTagWithEvent
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex m-0 gap-4 mt-4 py-2" }, _attrs))} data-v-ee63ebf7><!--[-->`);
	ssrRenderList($setup.selectedTags, (myTag) => {
		_push(`<div class="${ssrRenderClass([`border-blue-500`, "relative group border-2 shadow-sm font-semibold text-blue-500 bg-blue-600/10 rounded-lg px-1.5 py-1 inline-flex items-center justify-center"])}" data-v-ee63ebf7><span class="absolute text-gray-500 opacity-0 transition-all group-hover:opacity-100 hover:bg-gray-100 flex items-center justify-center -top-4 left-0 bg-white rounded-full h-6 w-6 border dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-800" data-v-ee63ebf7>`);
		ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
		_push(`</span> ${ssrInterpolate($setup.labelFor(myTag))}</div>`);
	});
	_push(`<!--]--><select class="border border-dashed border-gray-300 rounded-lg font-semibold text-gray-500 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-400 focus:ring-primary-500 focus:ring-2 focus:border-none ring-offset-4" data-v-ee63ebf7><option value="" disabled selected data-v-ee63ebf7> Select a filter </option><!--[-->`);
	ssrRenderList($setup.props.options, (option) => {
		_push(`<option${ssrRenderAttr("value", option.value)} data-v-ee63ebf7>${ssrInterpolate(option.label)}</option>`);
	});
	_push(`<!--]--></select></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/tags/Select.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Select_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-ee63ebf7"]]);
//#endregion
//#region src/components/directory/Search.astro
createAstro("https://marylandbusiness.online");
var $$Search = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Search;
	const perspectiveCookie = Astro.cookies.get(perspectiveCookieName)?.value;
	const filterOptions = await getFilterOptions();
	const settings = await getSiteSettings(perspectiveCookie);
	const searchPlaceholder = await getSearchPlaceholder();
	async function getSearchPlaceholder() {
		const placeholder = settings?.searchPlaceholder ?? themeConfig_default.directoryData?.search?.placeholder;
		if (placeholder && placeholder.includes("{0}")) {
			const count = (await getListings(perspectiveCookie)).length;
			return formatString(placeholder, count);
		}
		return placeholder ?? "Search";
	}
	return renderTemplate`${maybeRenderHead($$result)}<div class="mb-10 not-prose"><div class="mt-2 flex rounded-md shadow-sm"><div class="relative flex flex-grow items-stretch focus-within:z-10">${themeConfig_default.directoryUI.search.icon ? renderTemplate`<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">${renderComponent($$result, "Icon", $$Icon, {
		"name": themeConfig_default.directoryUI.search.icon,
		"class": "h-5 w-5 text-gray-400",
		"aria-hidden": "true"
	})}</div>` : ""}<input id="search"${addAttribute(`block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 dark:active:ring-primary-400 dark:bg-gray-700 dark:ring-gray-600 dark:text-gray-200 dark:placeholder:text-gray-400 ${themeConfig_default.directoryUI.search?.icon ? "pl-10" : ""}`, "class")}${addAttribute(searchPlaceholder, "placeholder")}><div class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5"><kbd class="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400 dark:border-gray-500 dark:text-gray-500">⌘K</kbd></div></div></div>${() => {
		if (themeConfig_default.layout.sidebar) return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`` })}`;
		if (themeConfig_default.directoryUI.search.tags.display === "select") return renderTemplate`${renderComponent($$result, "UiTagSelect", Select_default, {
			"client:load": true,
			"options": filterOptions,
			"client:component-hydration": "load",
			"client:component-path": "/Users/dev/Projects/marylandbusiness-online/src/components/ui/tags/Select.vue",
			"client:component-export": "default"
		}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": "tabler:x" })}` })}`;
		if (themeConfig_default.directoryUI.search.tags.display === "show-all") return renderTemplate`${renderComponent($$result, "UiTagGrid", Grid_default, {
			"client:load": true,
			"options": filterOptions,
			"client:component-hydration": "load",
			"client:component-path": "/Users/dev/Projects/marylandbusiness-online/src/components/ui/tags/Grid.vue",
			"client:component-export": "default"
		})}`;
	}}</div>${renderScript($$result, "/Users/dev/Projects/marylandbusiness-online/src/components/directory/Search.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/directory/Search.astro", void 0);
//#endregion
//#region src/data/pages/blog.mdx
function _createMdxContent(props) {
	const _components = Object.assign({ hr: "hr" }, props.components);
	return createVNode(Fragment, { children: [
		createVNode($$SimpleLeftHero, {
			image: "meditation.jpg",
			children: [createVNode("span", {
				slot: "heading",
				children: "The Blog"
			}), createVNode("span", {
				slot: "description",
				children: "Here posts will be written with content related to the keywords of the directory to boost the ranking on search engines."
			})]
		}),
		"\n",
		createVNode(_components.hr, {}),
		"\n",
		createVNode($$Grid, {})
	] });
}
function MDXContent(props = {}) {
	const { wrapper: MDXLayout } = props.components || {};
	return MDXLayout ? createVNode(MDXLayout, Object.assign({}, props, { children: createVNode(_createMdxContent, props) })) : _createMdxContent(props);
}
var frontmatter = {};
function getHeadings() {
	return [];
}
var url = "/blog";
var file = "/Users/dev/Projects/marylandbusiness-online/src/data/pages/blog.mdx";
var Content = (props = {}) => MDXContent({
	...props,
	components: {
		Fragment,
		...props.components
	}
});
Content[Symbol.for("mdx-component")] = true;
Content[Symbol.for("astro.needsHeadRendering")] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/dev/Projects/marylandbusiness-online/src/data/pages/blog.mdx";
__astro_tag_component__(Content, "astro:jsx");
//#endregion
export { Content, Content as default, file, frontmatter, getHeadings, url };
