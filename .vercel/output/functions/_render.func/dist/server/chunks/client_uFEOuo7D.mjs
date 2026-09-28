import { t as sanityClient } from "./_sanity_client_D-OwYKvr.mjs";
import { createImageUrlBuilder } from "@sanity/image-url";
//#region src/lib/sanity/client.ts
var builder = createImageUrlBuilder(sanityClient);
/**
* Sanity CDN URL for an image asset, with optional resizing/format params.
* CDN (imgix) handles width, quality and auto format (webp/avif) — no
* build-time download needed.
*/
function sanityImageUrl(source, params = {}) {
	let url = builder.image(source).auto("format").quality(80).url();
	if (params.width) url += `&w=${params.width}`;
	if (params.height) url += `&h=${params.height}`;
	return url;
}
/** Responsive srcset for a Sanity image at 1x/2x density. */
function sanityImageSrcSet(source, width) {
	return `${sanityImageUrl(source, { width })} 1x, ${sanityImageUrl(source, { width: width * 2 })} 2x`;
}
//#endregion
export { sanityImageUrl as n, sanityImageSrcSet as t };
