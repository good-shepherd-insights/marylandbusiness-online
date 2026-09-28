import { t as SANITY_API_READ_TOKEN } from "./server_C-J5aRSa.mjs";
import { t as sanityClient } from "./_sanity_client_D-OwYKvr.mjs";
//#region src/lib/sanity/load-query.ts
function parsePerspective(raw) {
	if (!raw) return void 0;
	const decoded = decodeURIComponent(raw);
	if (decoded.startsWith("[")) try {
		return JSON.parse(decoded);
	} catch {
		return;
	}
	return decoded;
}
/**
* Draft-mode-aware fetch: published perspective normally, the requested
* perspective (with source maps + stega) when the Presentation Tool's
* perspective cookie is present. Requires SANITY_API_READ_TOKEN in drafts.
*/
async function loadQuery({ query, params, perspectiveCookie = void 0 }) {
	const draftMode = perspectiveCookie ? true : false;
	if (draftMode && !SANITY_API_READ_TOKEN) throw new Error("The `SANITY_API_READ_TOKEN` environment variable is required during Visual Editing.");
	const perspective = draftMode ? parsePerspective(perspectiveCookie) ?? "drafts" : "published";
	const { result, resultSourceMap } = await sanityClient.fetch(query, params ?? {}, {
		filterResponse: false,
		perspective,
		resultSourceMap: draftMode ? "withKeyArraySelector" : false,
		stega: draftMode,
		...draftMode ? { token: SANITY_API_READ_TOKEN } : {}
	});
	return {
		data: result,
		sourceMap: resultSourceMap,
		perspective
	};
}
//#endregion
export { loadQuery as t };
