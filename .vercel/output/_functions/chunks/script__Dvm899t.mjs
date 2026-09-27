import { w as createRenderInstruction } from "./jsx-runtime_CgLb4yc8.mjs";
//#region node_modules/.pnpm/astro@7.3.5_@types+node@26.6.2_@vercel+functions@3.9.9_ws@8.21.0__jiti@2.7.0_yaml@2.9.1/node_modules/astro/dist/runtime/server/render/script.js
async function renderScript(result, id) {
	const inlined = result.inlinedScripts.get(id);
	let content = "";
	if (inlined != null) {
		if (inlined) content = `<script type="module">${inlined}<\/script>`;
	} else {
		const resolved = await result.resolve(id);
		content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"><\/script>`;
	}
	return createRenderInstruction({
		type: "script",
		id,
		content
	});
}
//#endregion
export { renderScript as t };
