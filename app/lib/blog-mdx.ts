import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { staticBlogPosts, type BlogListItem } from "./blog-static";

// Auto-generated MDX articles live here. Hand-written .tsx articles keep their
// own folders under app/blog/ and always win the route, so MDX slugs must not
// collide with them (we filter those out defensively).
const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

const reservedSlugs = new Set(staticBlogPosts.map((p) => p.slug));

// Drafts are visible in dev and on Vercel Preview deployments (so a PR can be
// reviewed on its preview URL) but hidden in production.
const includeDrafts = process.env.VERCEL_ENV !== "production";

export interface MdxFrontmatter {
  title: string;
  description?: string;
  excerpt?: string;
  category?: string;
  date?: string; // ISO, e.g. "2026-09-23"
  readTime?: string;
  image?: string;
  keywords?: string;
  draft?: boolean;
}

export interface MdxArticle {
  slug: string;
  data: MdxFrontmatter;
  content: string;
}

function formatDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function readAll(): MdxArticle[] {
  let files: string[] = [];
  try {
    files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
  } catch {
    return []; // no content dir yet
  }
  const out: MdxArticle[] = [];
  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "");
    if (reservedSlugs.has(slug)) continue;
    try {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
      const { data, content } = matter(raw);
      out.push({ slug, data: data as MdxFrontmatter, content });
    } catch {
      // skip unreadable / malformed file
    }
  }
  return out;
}

function isVisible(a: MdxArticle): boolean {
  return includeDrafts || a.data.draft !== true;
}

/** Published MDX articles as listing items (for /blog), newest first. */
export function getMdxListItems(): BlogListItem[] {
  return readAll()
    .filter(isVisible)
    .map((a) => ({
      slug: a.slug,
      title: a.data.title ?? a.slug,
      excerpt: a.data.excerpt ?? a.data.description ?? "",
      category: a.data.category ?? "Guide",
      readTime: a.data.readTime ?? "8 min",
      date: formatDate(a.data.date),
      image: a.data.image ?? "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
    }))
    .sort((x, y) => new Date(y.date).getTime() - new Date(x.date).getTime());
}

/** Combined listing: hand-written + MDX, newest first. */
export function getAllBlogListItems(): BlogListItem[] {
  return [...staticBlogPosts, ...getMdxListItems()].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/** One MDX article by slug, or null if missing / not visible / reserved. */
export function getMdxArticle(slug: string): MdxArticle | null {
  if (reservedSlugs.has(slug)) return null;
  const a = readAll().find((x) => x.slug === slug);
  if (!a || !isVisible(a)) return null;
  return a;
}

/** Slugs to statically generate for the [slug] MDX route. */
export function getMdxSlugs(): string[] {
  return readAll().filter(isVisible).map((a) => a.slug);
}
