import { _ as renderSlot, b as renderTemplate, x as maybeRenderHead } from "./jsx-runtime_CgLb4yc8.mjs";
import { t as createComponent } from "./astro-component_D1QvgdDd.mjs";
import "./compiler_DxiFqWHW.mjs";
//#region src/components/app/Prose.astro
var $$Prose = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<main class="max-w-none font-display prose prose-zinc dark:prose-invert prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900 prose-a:hover:text-primary-400 prose-a:font-normal prose-a:no-underline prose-a:border-dashed prose-a:border-b prose-a:hover:border-solid prose-a:hover:border-primary-400 prose-headings:text-gray-800 dark:prose-headings:text-gray-100 prose-a:border-gray-400 dark:prose-a:border-gray-400 dark:prose-a:hover:border-primary-400">${renderSlot($$result, $$slots["default"])}</main>`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/app/Prose.astro", void 0);
//#endregion
//#region src/components/app/AppShell.astro
var $$AppShell = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<div>${renderSlot($$result, $$slots["default"])}</div>`;
}, "/Users/dev/Projects/marylandbusiness-online/src/components/app/AppShell.astro", void 0);
//#endregion
export { $$Prose as n, $$AppShell as t };
