import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import satori from 'satori';
import { getListingForOg, getSiteSettings } from '../../lib/sanity/queries';
import { getEntry } from 'astro:content';
import { sanityImageUrl } from '../../lib/sanity/client';
import type { SanityImage } from '../../lib/sanity/types';
import config from '@util/themeConfig';

const boldFontPath = 'node_modules/@fontsource/gabarito/files/gabarito-latin-700-normal.woff' as const;
const regularFontPath = 'node_modules/@fontsource/gabarito/files/gabarito-latin-400-normal.woff' as const;

interface Props {
  params: { slug: string };
}

/** Fetch a Sanity cover image as a base64 data URI for satori. */
async function fetchCoverAsDataUri(image: SanityImage | undefined): Promise<string | null> {
  if (!image?.asset) return null;
  try {
    const url = sanityImageUrl(image, { width: 400 });
    const res = await fetch(url);
    if (!res.ok) return null;
    const buffer = Buffer.from(await res.arrayBuffer());
    const type = res.headers.get('content-type') ?? 'image/png';
    return `data:${type};base64,${buffer.toString('base64')}`;
  } catch {
    return null;
  }
}

function getStaticCoverDataUri(): string | null {
  try {
    const buffer = fs.readFileSync(path.resolve('public/default-listing-image.png'));
    return `data:image/png;base64,${buffer.toString('base64')}`;
  } catch {
    return null;
  }
}

export async function GET({ params }: Props) {
  const settings = await getSiteSettings();
  const title = settings?.siteTitle ?? config.general.title;
  const { slug } = params;

  const listing = slug ? await getListingForOg(slug) : undefined;
  const pageEntry = await getEntry('pages', slug ?? 'index');

  // 404 when the route doesn't resolve to any content; an entry without a
  // frontmatter title (e.g. index.mdx) falls back to the site title.
  if (!listing && !pageEntry) {
    return new Response('Not found', { status: 404 });
  }

  const titleText = listing?.name ?? pageEntry?.data.title ?? title;

  // using custom font files
  const GabartitoSansBold = fs.readFileSync(path.resolve(boldFontPath));
  const GabaritoSansRegular = fs.readFileSync(
    path.resolve(regularFontPath),
  );

  const cover =
    (await fetchCoverAsDataUri(listing?.image)) ??
    (listing ? null : getStaticCoverDataUri());

  const image = cover ? {
    type: 'img',
    props: {
      src: cover,
    },
  } : {
    type: 'div',
    props: {
      tw: 'bg-gray-200 rounded-full',
    },
  };

  const html = {
    type: 'div',
    props: {
      children: [
        {
          type: 'div',
          props: {
            tw: 'w-[200px] h-[200px] flex rounded-3xl overflow-hidden',
            children: [
              image
            ],
          },
        },
        {
          type: 'div',
          props: {
            tw: 'pl-10 shrink flex flex-col max-w-xl',
            children: [
              {
                type: 'div',
                props: {
                  tw: 'text-zinc-800',
                  style: {
                    fontSize: '48px',
                    fontFamily: 'Gabarito Bold',
                  },
                  children: titleText,
                },
              },
              {
                type: 'div',
                props: {
                  tw: 'text-zinc-500 mt-2',
                  style: {
                    fontSize: '18px',
                    fontFamily: 'Gabarito Regular',
                  },
                  children: listing?.description ?? titleText,
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            tw: 'absolute right-[40px] bottom-[40px] flex items-center',
            children: [
              {
                type: 'div',
                props: {
                  tw: 'text-gray-900 text-4xl',
                  style: {
                    fontFamily: 'Gabarito Bold',
                  },
                  children: `${title}`,
                },
              },
            ],
          },
        },
      ],
      tw: 'w-full h-full flex items-center justify-center relative px-22',
      style: {
        background: '#fff',
        fontFamily: 'Gabarito Regular',
      },
    },
  };

  // Satori's React JSX types don't fit a plain-object element tree; structure is validated at runtime.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const svg = await satori(html as any, {
    width: 1200,
    height: 600,
    fonts: [
      {
        name: 'Gabarito Bold',
        data: GabartitoSansBold.buffer,
        style: 'normal',
      },
      {
        name: 'Gabarito Regular',
        data: GabaritoSansRegular.buffer,
        style: 'normal',
      },
    ],
  });

  const png = await sharp(Buffer.from(svg), { density: 72 }).png().toBuffer();

  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  });
}