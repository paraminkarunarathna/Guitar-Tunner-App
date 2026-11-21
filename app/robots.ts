import { MetadataRoute } from 'next';

/** Served at /robots.txt. This file is the source — do not add a static
 *  public/robots.txt, which would conflict with this route.
 *
 *  Deliberately minimal: every page is meant to be crawled. Pages that
 *  should stay out of search results (/offline, /my-progress, /share/*)
 *  carry a noindex meta tag instead, which crawlers can only see if they
 *  are allowed to fetch the page. No `host` line: it is a Yandex-only
 *  directive that Bing and Google ignore, and Bing's tester flags it. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://www.guitartunepro.com/sitemap.xml',
  };
}
