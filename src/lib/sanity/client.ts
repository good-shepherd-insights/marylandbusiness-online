import { sanityClient } from 'sanity:client';
import {
  createImageUrlBuilder,
  type FitMode,
  type SanityImageSource,
} from '@sanity/image-url';

const builder = createImageUrlBuilder(sanityClient);

interface SanityImageUrlParams {
  width?: number;
  height?: number;
  quality?: number;
  fit?: FitMode;
  dpr?: number;
  sharpen?: number;
}

interface SanityImageWidthSrcSetParams extends Omit<SanityImageUrlParams, 'width' | 'height'> {
  aspectRatio?: number;
}

/**
 * Sanity CDN URL for an image asset, with optional resizing/format params.
 * CDN (imgix) handles width, quality and auto format (webp/avif) — no
 * build-time download needed.
 */
export function sanityImageUrl(
  source: SanityImageSource,
  params: SanityImageUrlParams = {},
): string {
  let imageBuilder = builder.image(source).auto('format').quality(params.quality ?? 80);

  if (params.width) imageBuilder = imageBuilder.width(params.width);
  if (params.height) imageBuilder = imageBuilder.height(params.height);
  if (params.fit) imageBuilder = imageBuilder.fit(params.fit);
  if (params.dpr) imageBuilder = imageBuilder.dpr(params.dpr);
  if (params.sharpen) imageBuilder = imageBuilder.sharpen(params.sharpen);

  return imageBuilder.url();
}

/** Responsive srcset for a Sanity image at 1x/2x density. */
export function sanityImageSrcSet(
  source: SanityImageSource,
  width: number,
): string {
  return `${sanityImageUrl(source, { width })} 1x, ${sanityImageUrl(source, { width: width * 2 })} 2x`;
}

/** Width-descriptor srcset for responsive Sanity images with explicit `sizes`. */
export function sanityImageWidthSrcSet(
  source: SanityImageSource,
  widths: number[],
  params: SanityImageWidthSrcSetParams = {},
): string {
  const { aspectRatio, ...urlParams } = params;

  return widths
    .map((width) => {
      const height = aspectRatio ? Math.round(width / aspectRatio) : undefined;
      return `${sanityImageUrl(source, { ...urlParams, width, height })} ${width}w`;
    })
    .join(', ');
}

export { sanityClient };
