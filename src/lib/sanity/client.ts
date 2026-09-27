import { sanityClient } from 'sanity:client';
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';

const builder = createImageUrlBuilder(sanityClient);

/**
 * Sanity CDN URL for an image asset, with optional resizing/format params.
 * CDN (imgix) handles width, quality and auto format (webp/avif) — no
 * build-time download needed.
 */
export function sanityImageUrl(
  source: SanityImageSource,
  params: { width?: number; height?: number } = {},
): string {
  let url = builder.image(source).auto('format').quality(80).url();
  if (params.width) url += `&w=${params.width}`;
  if (params.height) url += `&h=${params.height}`;
  return url;
}

/** Responsive srcset for a Sanity image at 1x/2x density. */
export function sanityImageSrcSet(
  source: SanityImageSource,
  width: number,
): string {
  return `${sanityImageUrl(source, { width })} 1x, ${sanityImageUrl(source, { width: width * 2 })} 2x`;
}

export { sanityClient };