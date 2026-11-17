// Ping IndexNow (Bing, Yandex, Seznam, Naver…) with every URL in the live
// sitemap. Bing's index powers ChatGPT search and Microsoft Copilot, so this is
// the fastest way to get new/updated pages seen by AI search.
//
// Usage (after a deploy is live):  npm run indexnow
// Optional: pass specific URLs instead of the whole sitemap:
//   node scripts/indexnow.mjs https://www.officialkeyshub.com/blog/some-post

const HOST = "www.officialkeyshub.com";
const SITE = `https://${HOST}`;
const KEY = "15b20b97d4f4e67d9ed061ecb021ab75"; // must match public/<KEY>.txt
const KEY_LOCATION = `${SITE}/${KEY}.txt`;

async function sitemapUrls() {
  const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const urls = process.argv.slice(2).length ? process.argv.slice(2) : await sitemapUrls();
const extra = [`${SITE}/llms.txt`, `${SITE}/llms-full.txt`];
const urlList = [...new Set([...urls, ...extra])].filter((u) => u.startsWith(SITE));

// Sanity check: IndexNow rejects the batch if the key file isn't reachable.
const keyRes = await fetch(KEY_LOCATION);
if (!keyRes.ok || (await keyRes.text()).trim() !== KEY) {
  console.error(`Key file ${KEY_LOCATION} is missing or wrong — deploy first.`);
  process.exit(1);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
});
console.log(`IndexNow: HTTP ${res.status} for ${urlList.length} URLs`);
if (res.status >= 400) {
  console.error(await res.text());
  process.exit(1);
}
