import { r as __exportAll } from "./rolldown-runtime_DWOOXAbm.mjs";
import { t as buildDirectoryIndex } from "./paths_nDJog9kw.mjs";
//#region src/pages/sitemap.xml.ts
var sitemap_xml_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GET = async ({ site }) => {
	const index = await buildDirectoryIndex();
	const base = (site?.toString() ?? "").replace(/\/$/, "");
	const urls = /* @__PURE__ */ new Set([""]);
	for (const path of index.open.keys()) urls.add(path);
	for (const rows of index.listingsByPath.values()) for (const row of rows) if (row.county && row.city) urls.add(`${row.county.slug}/${row.city.slug}/${row.slug}`);
	const entries = [...urls].map((path) => {
		return `  <url><loc>${`${base}/${path}`}</loc></url>`;
	}).join("\n");
	return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>`, { headers: { "content-type": "application/xml; charset=utf-8" } });
};
//#endregion
//#region \0virtual:astro:page:src/pages/sitemap.xml@_@ts
var page = () => sitemap_xml_exports;
//#endregion
export { page };
