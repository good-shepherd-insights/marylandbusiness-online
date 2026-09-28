import { r as __exportAll } from "./rolldown-runtime_DWOOXAbm.mjs";
import { t as getEntry } from "./_astro_content_d8z6zg91.mjs";
import { f as getSiteSettings, l as getListingForOg, p as themeConfig_default } from "./queries_BlgXXG8z.mjs";
import { n as sanityImageUrl } from "./client_uFEOuo7D.mjs";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import satori from "satori";
//#region src/pages/og/[...slug].png.ts
var ____slug__png_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var boldFontPath = "node_modules/@fontsource/gabarito/files/gabarito-latin-700-normal.woff";
var regularFontPath = "node_modules/@fontsource/gabarito/files/gabarito-latin-400-normal.woff";
/** Fetch a Sanity cover image as a base64 data URI for satori. */
async function fetchCoverAsDataUri(image) {
	if (!image?.asset) return null;
	try {
		const url = sanityImageUrl(image, { width: 400 });
		const res = await fetch(url);
		if (!res.ok) return null;
		const buffer = Buffer.from(await res.arrayBuffer());
		return `data:${res.headers.get("content-type") ?? "image/png"};base64,${buffer.toString("base64")}`;
	} catch {
		return null;
	}
}
function getStaticCoverDataUri() {
	try {
		return `data:image/png;base64,${fs.readFileSync(path.resolve("public/default-listing-image.png")).toString("base64")}`;
	} catch {
		return null;
	}
}
async function GET({ params }) {
	const title = (await getSiteSettings())?.siteTitle ?? themeConfig_default.general.title;
	const { slug } = params;
	const listing = slug ? await getListingForOg(slug) : void 0;
	const pageEntry = await getEntry("pages", slug ?? "index");
	if (!listing && !pageEntry) return new Response("Not found", { status: 404 });
	const titleText = listing?.name ?? pageEntry?.data.title ?? title;
	const GabartitoSansBold = fs.readFileSync(path.resolve(boldFontPath));
	const GabaritoSansRegular = fs.readFileSync(path.resolve(regularFontPath));
	const cover = await fetchCoverAsDataUri(listing?.image) ?? (listing ? null : getStaticCoverDataUri());
	const html = {
		type: "div",
		props: {
			children: [
				{
					type: "div",
					props: {
						tw: "w-[200px] h-[200px] flex rounded-3xl overflow-hidden",
						children: [cover ? {
							type: "img",
							props: { src: cover }
						} : {
							type: "div",
							props: { tw: "bg-gray-200 rounded-full" }
						}]
					}
				},
				{
					type: "div",
					props: {
						tw: "pl-10 shrink flex flex-col max-w-xl",
						children: [{
							type: "div",
							props: {
								tw: "text-zinc-800",
								style: {
									fontSize: "48px",
									fontFamily: "Gabarito Bold"
								},
								children: titleText
							}
						}, {
							type: "div",
							props: {
								tw: "text-zinc-500 mt-2",
								style: {
									fontSize: "18px",
									fontFamily: "Gabarito Regular"
								},
								children: listing?.description ?? titleText
							}
						}]
					}
				},
				{
					type: "div",
					props: {
						tw: "absolute right-[40px] bottom-[40px] flex items-center",
						children: [{
							type: "div",
							props: {
								tw: "text-gray-900 text-4xl",
								style: { fontFamily: "Gabarito Bold" },
								children: `${title}`
							}
						}]
					}
				}
			],
			tw: "w-full h-full flex items-center justify-center relative px-22",
			style: {
				background: "#fff",
				fontFamily: "Gabarito Regular"
			}
		}
	};
	const svg = await satori(html, {
		width: 1200,
		height: 600,
		fonts: [{
			name: "Gabarito Bold",
			data: GabartitoSansBold.buffer,
			style: "normal"
		}, {
			name: "Gabarito Regular",
			data: GabaritoSansRegular.buffer,
			style: "normal"
		}]
	});
	const png = await sharp(Buffer.from(svg), { density: 72 }).png().toBuffer();
	return new Response(png, { headers: { "Content-Type": "image/png" } });
}
//#endregion
//#region \0virtual:astro:page:src/pages/og/[...slug].png@_@ts
var page = () => ____slug__png_exports;
//#endregion
export { page };
