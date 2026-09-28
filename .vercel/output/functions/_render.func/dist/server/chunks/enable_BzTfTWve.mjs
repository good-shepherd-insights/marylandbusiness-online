import { r as __exportAll } from "./rolldown-runtime_DWOOXAbm.mjs";
import { t as SANITY_API_READ_TOKEN } from "./server_C-J5aRSa.mjs";
import { t as sanityClient } from "./_sanity_client_D-OwYKvr.mjs";
import { perspectiveCookieName } from "@sanity/preview-url-secret/constants";
import { validatePreviewUrl } from "@sanity/preview-url-secret";
//#region src/pages/api/draft-mode/enable.ts
var enable_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GET = async ({ request, cookies, redirect }) => {
	if (!SANITY_API_READ_TOKEN) return new Response("Server misconfigured: missing read token", { status: 500 });
	const clientWithToken = sanityClient.withConfig({ token: SANITY_API_READ_TOKEN });
	const { isValid, redirectTo = "/", studioPreviewPerspective } = await validatePreviewUrl(clientWithToken, request.url);
	if (!isValid) return new Response("Invalid secret", { status: 401 });
	const partitioned = request.headers.get("sec-fetch-dest") === "iframe" && request.headers.get("sec-fetch-site") === "cross-site";
	cookies.set(perspectiveCookieName, studioPreviewPerspective ?? "drafts", {
		httpOnly: false,
		sameSite: "none",
		secure: true,
		path: "/",
		partitioned
	});
	return redirect(redirectTo, 307);
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/draft-mode/enable@_@ts
var page = () => enable_exports;
//#endregion
export { page };
