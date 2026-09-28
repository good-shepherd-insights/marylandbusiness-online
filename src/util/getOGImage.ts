function getBasePath(): string {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:4321';
  }

  return process.env.PUBLIC_SITE_URL ?? '';
}

export function getOGImage(slug: string, baseUrl?: string) {
  const basePath: string = baseUrl ?? getBasePath();
  return `${basePath}/og/${slug}.png`;
}