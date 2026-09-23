# Auto-Blog Playbook — Official Keys Hub

This is the instruction set for the weekly automated blog routine. The routine
writes ONE new SEO blog article that matches the existing site, then opens a PR
for human review (never commits to `main` directly).

## Goal

Publish one genuinely useful, unique, SEO-targeted article per run for the
Official Keys Hub niche (buying/activating genuine Microsoft Windows, Office,
Server, and related software licenses). Fresh, non-duplicate content helps
crawling and indexing.

## Hard rules

1. **One article per run.** Quality over quantity.
2. **Never commit to `main`.** Create a branch `auto-blog/<slug>` and open a
   normal (non-draft) PR.
3. **No duplicate topics.** Before choosing a topic, list existing article
   folders in `app/blog/` and the `blogPosts` array in `app/blog/page.tsx`.
   Pick a topic NOT already covered (see topic bank below; if all are used,
   invent a fresh, closely-related buyer/informational-intent topic).
4. **Match the template exactly** (see "Files to create/update").
5. **Unique, accurate content.** No fabricated statistics, fake reviews, or
   invented legal claims. Reuse the site's real positioning: genuine licenses,
   activates with Microsoft, instant email delivery, 30-day money-back
   guarantee, EU resale rights (UsedSoft v. Oracle), 24/7 WhatsApp/email
   support. Prices: reference the catalog in `app/lib/catalog.ts` if quoting.
6. **Follow the design system.** Invoke the `officialkeyshub-design` skill and
   mirror an existing article (e.g. `app/blog/how-to-activate-windows-11/page.tsx`)
   for layout, classes, and section structure.
7. **Build must pass** (`npm run build`) before opening the PR.

## Files to create / update (all three are required)

1. **`app/blog/<slug>/page.tsx`** — the article. Copy the structure of
   `app/blog/how-to-activate-windows-11/page.tsx`:
   - `export const metadata` with: `alternates.canonical` =
     `https://www.officialkeyshub.com/blog/<slug>`, a unique `title`
     (≤ 60 chars ending with `| Official Keys Hub`), a unique `description`
     (≤ 155 chars), `keywords`, and `openGraph` (`type: "article"`).
   - `Navbar`, `Breadcrumb` (Home / Blog / <short label>), a hero section,
     well-structured body with `<h2>`/`<h3>` headings, and `Footer`.
   - Include a JSON-LD `Article` (and `FAQPage` if the article has an FAQ)
     `<script type="application/ld+json">` block, matching how product pages do
     it in `app/products/[slug]/page.tsx`.
   - 900–1500 words, genuinely helpful, keyword-focused but readable.
   - Add 1–3 internal links to relevant `/products/<slug>` pages or existing
     blog posts.
2. **`app/blog/page.tsx`** — prepend a new object to the `blogPosts` array
   (newest first) with `slug`, `title`, `excerpt`, `category`
   (Buying | Activation | Guides | Licensing), `readTime`, `date`
   (today, format like `Sep 23, 2026`), and an `image` (a relevant
   `images.unsplash.com` URL, `?w=800&q=80`).
3. **`app/sitemap.ts`** — add a `{ url: \`${baseUrl}/blog/<slug>\`, ... }` entry
   to the blog section (changeFrequency `weekly`, priority `0.9`).

## Topic bank (pick the first unused one)

- Windows 10 End of Support 2026: What Are Your Options?
- Is Windows 11 Pro Worth It? Pro vs Home for Real Users (2026)
- How to Check if Your Windows License Is Genuine
- Digital License vs Product Key: What's the Difference?
- How to Find Your Windows Product Key (4 Easy Ways)
- How to Move Your Microsoft Office License to a New PC
- How to Activate Microsoft Project 2021: Step-by-Step
- How to Activate Microsoft Visio 2021: Step-by-Step
- SQL Server 2022 Standard vs Enterprise: Which Do You Need?
- Visual Studio 2022 Professional vs Enterprise Explained
- Visio vs Project: Which Microsoft Tool Is Right for You?
- Cheap Windows Server 2022 Keys: A Buyer's Guide
- How to Upgrade from Windows 10 to Windows 11 Cheaply
- Best Value Antivirus for Windows 11 in 2026
- How to Reinstall Windows Without Losing Your License
- Windows 11 Enterprise vs Pro: Do You Really Need Enterprise?
- How to Fix Common Windows Activation Errors (0xC004…)
- Office 2021 Home & Business vs Pro Plus: What's the Difference?
- Bind Key vs Online Key vs Phone Key: Which Should You Buy?
- How to Install Office 2021 After Buying a Key

## PR

- Branch: `auto-blog/<slug>`
- Title: `blog: <article title>`
- Body: what the article covers, target keyword(s), the 3 files changed, and a
  note that build passed. End with the standard attribution line.
- Do NOT enable auto-merge. Leave it for human review.
