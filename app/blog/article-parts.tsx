import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { getProductByName, pickAdProducts, savingsPercent } from "../lib/blogAds";
import { getProductBoxImage } from "../lib/productImage";
import { lifecycleGroups, daysLeft, formatEnd } from "../lib/lifecycle";
import type { BlogListItem } from "../lib/blog-static";

// Building blocks for the MDX article layout: table of contents, sidebar
// widgets and related reading. Everything here comes from real data (the
// article's own headings, the live catalog, the lifecycle table), so each page
// gets different sidebar content instead of the same boilerplate.

/** URL-safe id for a heading, shared by the TOC and the rendered <h2>. */
export function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[`*_]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Plain text of React children (for ids on MDX headings). */
export function textOf(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (typeof node === "object" && "props" in node) {
    return textOf((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

/** The article's "## " headings, in order, for the table of contents. */
export function tocFromMdx(mdx: string): { id: string; text: string }[] {
  return [...mdx.matchAll(/^##\s+(.+)$/gm)].map((m) => {
    const text = m[1].replace(/[*_`]/g, "").trim();
    return { id: headingId(text), text };
  });
}

/** Colour accents per category, so guides, comparisons and buying posts look distinct. */
export const categoryTheme: Record<string, { chip: string; band: string; icon: string }> = {
  Guide: { chip: "bg-sky-100 text-sky-800", band: "from-sky-50 via-white to-cyan-50", icon: "fa-compass" },
  Comparison: { chip: "bg-violet-100 text-violet-800", band: "from-violet-50 via-white to-indigo-50", icon: "fa-scale-balanced" },
  Buying: { chip: "bg-emerald-100 text-emerald-800", band: "from-emerald-50 via-white to-teal-50", icon: "fa-bag-shopping" },
  Activation: { chip: "bg-amber-100 text-amber-800", band: "from-amber-50 via-white to-orange-50", icon: "fa-key" },
};
export const themeFor = (category?: string) => categoryTheme[category ?? ""] ?? categoryTheme.Guide;

export function TableOfContents({ items, className = "" }: { items: { id: string; text: string }[]; className?: string }) {
  if (items.length < 3) return null;
  return (
    <nav aria-label="On this page" className={className}>
      <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-3">On this page</p>
      <ol className="space-y-2 text-sm border-l-2 border-gray-100">
        {items.map((h) => (
          <li key={h.id}>
            <a href={`#${h.id}`} className="block -ml-0.5 border-l-2 border-transparent pl-3 text-gray-600 hover:border-sky-500 hover:text-sky-700">
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Compact product card for the sidebar: the product this article is about. */
export function SidebarProduct({ name, topic }: { name?: string; topic: string }) {
  const p = (name && getProductByName(name)) || pickAdProducts(topic, 1)[0];
  if (!p) return null;
  const save = savingsPercent(p);
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-3">Used in this guide</p>
      <Link href={`/products/${p.slug}`} className="flex items-center gap-4 group">
        <Image src={getProductBoxImage(p.name)} alt={`${p.name} product box`} width={564} height={780} unoptimized className="w-16 h-auto drop-shadow-md" />
        <div className="min-w-0">
          <p className="font-bold text-gray-900 leading-snug group-hover:text-sky-700">{p.name}</p>
          <p className="mt-1">
            <span className="text-xl font-black text-gray-900">{p.price}</span>{" "}
            {save > 0 && <span className="text-xs font-bold text-emerald-700">save {save}%</span>}
          </p>
        </div>
      </Link>
      <Link
        href={`/products/${p.slug}`}
        className="mt-4 block w-full rounded-lg bg-blue-700 py-2.5 text-center text-sm font-black text-white hover:bg-blue-800"
      >
        View deal
      </Link>
      <p className="mt-2 text-center text-[11px] text-gray-500">Emailed after payment · 30-day money-back</p>
    </div>
  );
}

/** "Support ending soon" widget from the lifecycle table: live and useful on any article. */
export function SupportEndingSoon() {
  const today = new Date();
  const rows = lifecycleGroups
    .flatMap((g) => g.rows)
    .filter((r) => !r.endLabel && daysLeft(r.end, today) >= 0)
    .sort((a, b) => a.end.localeCompare(b.end))
    .slice(0, 3);
  if (!rows.length) return null;
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-amber-800 mb-3">
        <i className="fas fa-calendar-xmark mr-1" /> Support ending soon
      </p>
      <ul className="space-y-2.5 text-sm">
        {rows.map((r) => (
          <li key={r.product} className="flex items-baseline justify-between gap-2">
            <span className="font-semibold text-gray-900">{r.product}</span>
            <span className="whitespace-nowrap text-gray-600">{daysLeft(r.end, today)} days</span>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-[11px] text-gray-500">Next: {rows[0] && formatEnd(rows[0])}</p>
      <Link href="/microsoft-end-of-support" className="mt-3 inline-block text-sm font-bold text-amber-800 hover:underline">
        All end-of-support dates →
      </Link>
    </div>
  );
}

export function KeyFinderNudge() {
  return (
    <Link
      href="/key-finder"
      className="block rounded-2xl bg-gradient-to-br from-[#071836] to-[#0369a1] p-5 text-white hover:shadow-lg transition-shadow"
    >
      <p className="text-xs font-bold uppercase tracking-wide text-sky-200 mb-1">Not sure which key?</p>
      <p className="font-bold leading-snug">Answer 2 questions and get the right Windows or Office license.</p>
      <span className="mt-3 inline-block text-sm font-bold text-sky-200">Try the key finder →</span>
    </Link>
  );
}

/** Three more articles, same category first. */
export function RelatedArticles({ items }: { items: BlogListItem[] }) {
  if (!items.length) return null;
  return (
    <section aria-label="Keep reading" className="mt-14">
      <h2 className="text-2xl font-bold text-gray-900 mb-5">Keep reading</h2>
      <div className="grid gap-5 sm:grid-cols-3">
        {items.map((a) => {
          const t = themeFor(a.category);
          return (
            <Link
              key={a.slug}
              href={`/blog/${a.slug}`}
              className="group flex flex-col rounded-2xl border border-gray-200 bg-white overflow-hidden hover:-translate-y-0.5 hover:shadow-md transition-all"
            >
              <div className={`h-28 bg-gradient-to-br ${t.band} flex items-center justify-center`}>
                <Image src={a.image} alt="" width={564} height={780} unoptimized className="h-24 w-auto object-contain drop-shadow-md" />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <span className={`self-start rounded-full px-2.5 py-0.5 text-[11px] font-bold ${t.chip}`}>{a.category}</span>
                <p className="mt-2 font-bold text-gray-900 leading-snug group-hover:text-sky-700">{a.title}</p>
                <p className="mt-auto pt-2 text-xs text-gray-500">{a.readTime} read</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
