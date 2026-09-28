import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from 'astro/loaders';

// Local MDX pages: landing copy and blog index. These embed Astro components
// (<Search/>, <Grid/>), so they stay as files rather than Sanity documents.
const pages = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/data/pages" }),
  schema: ({ image }) => z.object({
    image: image().optional(),
    title: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  pages,
};