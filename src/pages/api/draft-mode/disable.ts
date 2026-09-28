import type { APIRoute } from 'astro';
import { perspectiveCookieName } from '@sanity/preview-url-secret/constants';

export const GET: APIRoute = async () => {
  // A partitioned cookie is only cleared by an expiring cookie that carries the
  // same Partitioned attribute, and cookies.delete() emits a single Set-Cookie
  // header per cookie name. Expire both variants directly instead, since either
  // may have been set depending on the browser and context.
  const expired = [
    `${perspectiveCookieName}=`,
    'Path=/',
    'Secure',
    'SameSite=None',
    'Max-Age=0',
  ];

  const headers = new Headers();
  headers.append('Set-Cookie', expired.join('; '));
  headers.append('Set-Cookie', [...expired, 'Partitioned'].join('; '));
  headers.set('Location', '/');

  return new Response(null, { status: 307, headers });
};