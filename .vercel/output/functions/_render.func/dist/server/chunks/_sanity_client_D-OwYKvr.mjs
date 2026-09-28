import { createClient } from "@sanity/client";
//#region \0sanity:client
var sanityClient = createClient({
	"apiVersion": "v2023-08-24",
	"projectId": "j5pgwhz4",
	"dataset": "production",
	"useCdn": false,
	"stega": { "studioUrl": "/admin" }
});
//#endregion
export { sanityClient as t };
