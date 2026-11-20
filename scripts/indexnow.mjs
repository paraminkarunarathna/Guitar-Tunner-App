#!/usr/bin/env node
/**
 * Tell Bing (and Yandex, Seznam, Naver — every IndexNow engine shares
 * submissions) that pages have changed, so they recrawl in hours rather
 * than weeks.
 *
 *   npm run indexnow                      # every URL in the live sitemap
 *   npm run indexnow -- --since 2026-11-20  # only URLs whose <lastmod> is on/after a date
 *   npm run indexnow -- /speed-trainer /string-change-tracker   # specific paths
 *   npm run indexnow -- --dry-run ...     # print what would be sent
 *
 * Run it AFTER the deploy is live: the engines fetch the key file from the
 * site to prove ownership, and crawl the URLs straight away.
 *
 * The key is public by design — it is served at /<key>.txt. It only proves
 * that whoever submits URLs for this host controls the host's files.
 */

const SITE = 'https://www.guitartunepro.com';
const HOST = 'www.guitartunepro.com';
const KEY = '87bd2149a2a253fd6f407187961638ea';
const ENDPOINT = 'https://api.indexnow.org/indexnow';
/** Protocol limit per request. */
const BATCH = 10_000;

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const sinceIndex = args.indexOf('--since');
const since = sinceIndex >= 0 ? args[sinceIndex + 1] : null;
const paths = args.filter((a, i) => !a.startsWith('--') && (sinceIndex < 0 || i !== sinceIndex + 1));

if (since && !/^\d{4}-\d{2}-\d{2}$/.test(since)) {
  console.error('--since needs a date like 2026-11-20');
  process.exit(1);
}

async function sitemapUrls() {
  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) throw new Error(`Could not fetch the sitemap: HTTP ${res.status}`);
  const xml = await res.text();
  const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, body]) => ({
    loc: body.match(/<loc>(.*?)<\/loc>/)?.[1]?.trim(),
    lastmod: body.match(/<lastmod>(.*?)<\/lastmod>/)?.[1]?.trim(),
  }));
  return entries
    .filter((e) => e.loc)
    .filter((e) => !since || (e.lastmod && e.lastmod.slice(0, 10) >= since))
    .map((e) => e.loc);
}

async function main() {
  const urls = paths.length
    ? paths.map((p) => (p.startsWith('http') ? p : `${SITE}${p.startsWith('/') ? '' : '/'}${p}`))
    : await sitemapUrls();

  const own = urls.filter((u) => new URL(u).host === HOST);
  if (!own.length) {
    console.log('No URLs to submit.');
    return;
  }

  // Check the key file is live first; without it every submission is rejected.
  const keyRes = await fetch(`${SITE}/${KEY}.txt`);
  const keyText = keyRes.ok ? (await keyRes.text()).trim() : '';
  if (keyText !== KEY) {
    console.error(`Key file ${SITE}/${KEY}.txt is not live yet (HTTP ${keyRes.status}). Deploy first, then rerun.`);
    process.exit(1);
  }

  console.log(`Submitting ${own.length} URL${own.length === 1 ? '' : 's'} to IndexNow${dryRun ? ' (dry run)' : ''}`);
  for (let i = 0; i < own.length; i += BATCH) {
    const urlList = own.slice(i, i + BATCH);
    if (dryRun) {
      urlList.forEach((u) => console.log(`  ${u}`));
      continue;
    }
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
    });
    // 200 = accepted, 202 = accepted and key validation pending.
    if (res.status === 200 || res.status === 202) {
      console.log(`  batch ${i / BATCH + 1}: accepted (HTTP ${res.status})`);
    } else {
      console.error(`  batch ${i / BATCH + 1}: HTTP ${res.status} ${await res.text()}`);
      process.exitCode = 1;
    }
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
