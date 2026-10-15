import type { APIRoute } from 'astro';

// En aperçu (CAPIA_APERCU=1), rien n'est indexable.
export const GET: APIRoute = () => {
  const apercu = process.env.CAPIA_APERCU === '1';
  const contenu = apercu
    ? 'User-agent: *\nDisallow: /\n'
    : 'User-agent: *\nAllow: /\nDisallow: /outils/\n\nSitemap: https://cap-ia.pro/sitemap-index.xml\n';
  return new Response(contenu, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
