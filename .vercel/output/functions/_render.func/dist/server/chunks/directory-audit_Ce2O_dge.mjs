import { r as __exportAll } from "./rolldown-runtime_DWOOXAbm.mjs";
import { t as buildDirectoryIndex } from "./paths_PJNqNWPZ.mjs";
//#region src/pages/directory-audit.json.ts
var directory_audit_json_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GET = async () => {
	const { states } = await buildDirectoryIndex();
	return new Response(JSON.stringify({
		generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
		states
	}, null, 2), { headers: { "content-type": "application/json; charset=utf-8" } });
};
//#endregion
//#region \0virtual:astro:page:src/pages/directory-audit.json@_@ts
var page = () => directory_audit_json_exports;
//#endregion
export { page };
