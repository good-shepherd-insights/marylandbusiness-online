import { r as __exportAll } from "./rolldown-runtime_DWOOXAbm.mjs";
import { o as getRowsForCombo } from "./paths_nDJog9kw.mjs";
//#region src/pages/api/directory.json.ts
/**
* Directory filter widening (HUB-DIRECTORY-RESEARCH.md §5.3): the hub page
* ships only its own path's rows; removing a filter chip fetches the wider
* combination here. Client-side filtering only — ungated by design
* (TAGS.md), responds to GET with JSON and never creates indexable URLs.
*/
var directory_json_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GET = async ({ url }) => {
	const pick = (key) => url.searchParams.get(key)?.trim() || void 0;
	const filters = {
		cat: pick("cat"),
		sub: pick("sub"),
		county: pick("county"),
		city: pick("city")
	};
	const result = await getRowsForCombo(filters);
	return new Response(JSON.stringify(result), { headers: { "content-type": "application/json; charset=utf-8" } });
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/directory.json@_@ts
var page = () => directory_json_exports;
//#endregion
export { page };
