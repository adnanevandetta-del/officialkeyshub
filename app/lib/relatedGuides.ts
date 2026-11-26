import "server-only";
import type { FlatProduct } from "./catalog";
import { staticBlogPosts, type BlogListItem } from "./blog-static";
import { getMdxListItems } from "./blog-mdx";

// Picks the most relevant blog guides for a product page, so every product
// links to its guides (and Google can crawl from products into the blog).

const TERMS: Record<string, string[]> = {
  windows: ["windows"],
  office: ["office"],
  bundles: ["office", "windows"],
  server: ["server"],
  sql: ["sql"],
  visio: ["visio", "project"],
  project: ["project", "visio"],
  visualstudio: ["visual-studio"],
  antivirus: ["antivirus"],
};

// Useful for any key buyer; used to fill the list when few guides match.
const GENERAL = ["online-key-vs-phone-key-vs-bind-key", "cheap-windows-keys-safe", "microsoft-product-keys-guide"];

export function guidesFor(p: FlatProduct, count = 3): BlogListItem[] {
  const all = [...getMdxListItems(), ...staticBlogPosts];
  const terms = TERMS[p.category] ?? [];
  const name = p.name.toLowerCase();
  const versions = (name.match(/\b(7|8\.1|10|11|2010|2013|2016|2019|2021|2022|2024|2025)\b/g) ?? []).map((v) => v.replace(".", "-"));

  const scored = all
    .map((a) => {
      const slug = a.slug.toLowerCase();
      const title = a.title.toLowerCase();
      let score = 0;
      for (const t of terms) {
        if (slug.includes(t)) score += 3;
        else if (title.includes(t.replace("-", " "))) score += 1;
      }
      if (score > 0) for (const v of versions) if (new RegExp(`(^|-)${v}(-|$)`).test(slug)) score += 2;
      return { a, score };
    })
    .filter((x) => x.score > 0)
    .sort((x, y) => y.score - x.score);

  const picked: BlogListItem[] = [];
  const seen = new Set<string>();
  for (const { a } of scored) {
    if (picked.length === count) break;
    if (!seen.has(a.slug)) {
      picked.push(a);
      seen.add(a.slug);
    }
  }
  for (const slug of GENERAL) {
    if (picked.length === count) break;
    const a = all.find((x) => x.slug === slug);
    if (a && !seen.has(a.slug)) {
      picked.push(a);
      seen.add(a.slug);
    }
  }
  return picked;
}
