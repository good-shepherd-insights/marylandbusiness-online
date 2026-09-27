/**
 * Audit view (TAGS.md): every candidate directory path with its inputs,
 * outcome and deciding reason — one place to see why a path is on or off.
 * Overrides live in subcategory combo entries (mode + note fields).
 */
import type { APIRoute } from 'astro';
import { buildDirectoryIndex } from '@lib/directory/paths';

export const GET: APIRoute = async () => {
  const { states } = await buildDirectoryIndex();
  return new Response(
    JSON.stringify(
      { generatedAt: new Date().toISOString(), states },
      null,
      2,
    ),
    { headers: { 'content-type': 'application/json; charset=utf-8' } },
  );
};