# Official Keys Hub — Project Summary & Backup Guide

Written: 19 Sep 2026. Use this to back up the current site and as a blueprint for starting another store.

---

## 1. What the site is

- **Business:** Official Keys Hub — an independent startup reseller of genuine Microsoft licenses (Windows, Office, Server, Visio, Project, SQL Server, Visual Studio) and security software keys.
- **Founded:** 2025. Honest positioning: "a young, independent startup", "a few hundred satisfied customers". No inflated numbers anywhere on the site.
- **Domain:** https://www.officialkeyshub.com (Vercel)
- **Repo:** github.com/adnanevandetta-del/officialkeyshub
- **Local folder:** C:\Users\selen\officialkeyshub
- **Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind 3.4, deployed on Vercel. No database; everything customer-side is browser storage.

## 2. Business details (one consistent set everywhere)

| Item | Value |
|---|---|
| Public name | Official Keys Hub |
| Email | officialkeyshub@gmail.com (only email used) |
| Phone / WhatsApp | +1 (601) 975-6129 — `wa.me/16019756129` (US number, only number used) |
| Location | Stockholm, Sweden (general only — no street address, no postal code) |
| Founded | 2025 |
| PayPal payments | officialkeyshub@gmail.com |
| USDT wallet | `0x615d993a8c18975a8f29adc23914bacf398c7e81` — network **BSC (BEP20)** |
| Proof of USDT payment | Customer emails a screenshot to officialkeyshub@gmail.com |

Where these live in code: `app/lib/payment.ts` (PayPal email, USDT address/network, proof email), `app/layout.tsx` (Store JSON-LD), `app/components/Footer.tsx`, `Contact.tsx`, `WhatsAppButton.tsx`, `public/llms.txt`, `public/llms-full.txt`, and the About/FAQ/Terms/Privacy/Refund/Licensing pages.

## 3. Features built

**Storefront**
- 79 products across categories: Bundles, Windows, Office, Server, Visio, Project, SQL Server, Visual Studio, Security. Catalog in `app/lib/catalog.ts` (prices are strings like "$38.99").
- Generated box-style product images with the store name, made on the fly by `app/api/product-image/route.ts` (helper: `app/lib/productImage.ts`, `IMG_VERSION` busts caches).
- Homepage billboard carousel of product boxes, product cards, category tabs.
- **Build-your-own bundle** (`BundleBuilder.tsx`): pick 2–3 products, $5 off each.
- **Bundles tab:** solid orange button, different from the other categories. On phones the category row glides slowly to the right in a loop (CSS animation, pauses on press). Desktop shows a normal wrapped row.
- Slim "Buy Now" popup (thumbnail, price, PayPal, USDT, WhatsApp, link to full product page). PayPal logo kept on Buy Now buttons.
- Product images fit inside cards (`object-contain`).
- Individual product pages `/products/[slug]` with schema, breadcrumbs, FAQ.

**Payments and orders**
- PayPal (`paypalPaymentUrl`, `_xclick` link to the store email).
- **USDT direct to wallet:** `UsdtPay.tsx` shows amount, network, address with copy buttons, then an "Email payment proof" link.
- Cart in localStorage; checkout page records an order before redirecting to pay.
- Promo: `KEYS20-XXXX` = 20% off, generated per email on login (legacy `KEYS30` codes still accepted). `app/lib/promo.ts`.

**Account (real, device-only)**
- Login, profile, orders, licenses pages use browser storage (`okh_account`, `okh_orders`, `okh_promo`, event `okh-data-changed`). Helpers in `app/lib/account.ts`. Only real order status is shown; keys are never displayed on the site (delivered by email/WhatsApp).
- Orders can be marked received/cancelled/removed; data can be exported/cleared.

**Branding**
- Logo mark used as tab icon (`app/icon.svg`, `apple-icon.*`, `favicon.ico`), logo `public/logo.png`.
- Colors: dark navy theme, emerald promo bar, orange "Hub" in the logo.

## 4. SEO and trust work

- Metadata: `metadataBase`, per-page canonicals (no root canonical — it would be inherited by every page), OG + Twitter images.
- Share images: `public/og-image.jpg` (1200×630) and 79 per-product images in `public/og/{slug}.jpg`.
- Structured data: Store (name, logo, image, phone, email, foundingDate 2025, city/country only), WebSite with SearchAction, Product + Breadcrumb + FAQ on product pages. No fake `aggregateRating`.
- `sitemap.ts` (submit `https://www.officialkeyshub.com/sitemap.xml` to Google Search Console and Bing Webmaster Tools), `robots.ts` (blocks /api, /admin, /private, /checkout, /orders, /profile, /login).
- `llms.txt` and `llms-full.txt` for AI assistants.
- 14 blog posts, each with a self-referencing canonical.
- Google Search Console showed "blocked by robots.txt" from an old crawl (Aug 23). The live robots.txt now allows everything important; re-test the live URL and request indexing.

**Honesty pass (Sep 2026)**
- Removed all invented numbers: 10K/50K customers, 25K sales, 4+ years, 120+ countries, 4.8★, "Trusted since 2022", "registered business".
- About page now: founded 2025, startup, "a few hundred satisfied customers", "Where we are today" box, and a "How We Do Business" section with the brand image.
- Removed the six invented customer reviews and all Trustpilot branding (there is no Trustpilot page). Homepage section is now "Buy with Confidence" (30-day guarantee, activates on Microsoft's servers, help when needed); the Reviews page has "What you can count on" plus a form that sends real reviews to WhatsApp. Add real reviews only when real customers write them.
- `app/components/TrustpilotBanner.tsx` still contains fake "3,234 reviews" but is not used anywhere. Do not enable it.

## 5. Repo map (important files)

```
app/
  layout.tsx            metadata, JSON-LD, global shell
  page.tsx              home (canonical "/")
  sitemap.ts / robots.ts
  about, faq, licensing, privacy, terms, refund-policy, payment-methods,
  partner-program, activation-guide, setup-guide, version-check, reviews, blog/*
  products/ , products/[slug]/
  checkout/, login/, profile/, orders/
  api/product-image/route.ts   SVG box generator
  lib/  catalog.ts payment.ts promo.ts account.ts productImage.ts
  components/  Products, ProductBillboard, ProductBuySection, BundleBuilder,
               UsdtPay, OrderList, CartModal, Footer, Contact, WhatsAppButton,
               CustomerReviews, CategoryBar, Navbar, PromoBanner, ProfileButton ...
public/  logo.png, og-image.jpg, og/*.jpg, llms.txt, llms-full.txt, products/*
next.config.ts, vercel.json, .env.example
```

## 6. Status when this summary was written

- All edits above are saved in the local project folder.
- **Not yet pushed to GitHub/Vercel** at the time of writing — the live site may still show the older version until you run the push commands in section 8.
- After pushing: re-test the live URL in Search Console, submit the sitemap, check the tab icon, Bundles tab, USDT checkout, profile/orders at phone size, and the About/Reviews pages.

## 7. Still to do (owner tasks)

1. Push to GitHub and confirm the Vercel deploy is green.
2. Search Console: add a Domain property, submit the sitemap, request indexing for the home page and top products. Same in Bing Webmaster Tools.
3. Make sure `officialkeyshub.com` (no www) redirects permanently to `www.officialkeyshub.com` in Vercel Domains.
4. Collect real reviews (ask each buyer); publish only real ones. Consider a real Trustpilot/Google Business profile later, and only then show its rating.
5. Confirm the "24/7 support" claim is something you can keep.
6. If you are formally registered as a business in Sweden, say so on the About page.
7. Unique text for the top product pages, Merchant Center feed, Article schema for blog posts, more backlinks (see `BACKLINK-STRATEGY.md`, `BACKLINK-TARGETS.md`).
8. Run PageSpeed Insights and the Rich Results Test after deploy.

## 8. Backup commands (PowerShell)

Full code backup with git (recommended):

```
cd C:\Users\selen\officialkeyshub
git add -A
git commit -m "Backup: honest startup story, USDT, bundles, SEO, business details"
git push
git tag backup-2026-09-19
git push origin backup-2026-09-19
```

A restorable ZIP copy on your PC (skips heavy folders):

```
cd C:\Users\selen
Compress-Archive -Path officialkeyshub\app, officialkeyshub\public, officialkeyshub\package.json, officialkeyshub\package-lock.json, officialkeyshub\next.config.ts, officialkeyshub\vercel.json, officialkeyshub\tsconfig.json, officialkeyshub\tailwind.config.ts, officialkeyshub\postcss.config.mjs, officialkeyshub\.env.example, officialkeyshub\*.md -DestinationPath officialkeyshub-backup-2026-09-19.zip
```

Restore later: unzip into a new folder, run `npm install`, then `npm run dev`. Keep `.env.local` (analytics IDs) separately; it is not in the repo.

## 9. Starting another site from this one

1. Copy the backup folder to a new folder, delete `.git`, run `git init`, create a new GitHub repo and a new Vercel project.
2. Search-and-replace the identity: "Official Keys Hub", "officialkeyshub", domain, email, phone/WhatsApp, PayPal email, USDT address, founding year, city.
3. Replace `public/logo.png`, `app/icon.svg`, `apple-icon.*`, `favicon.ico`, `og-image.jpg`, `public/og/*`, the brand colors in `tailwind.config.ts` / `globals.css`, and the product image generator's branding in `route.ts`.
4. Edit `app/lib/catalog.ts` for the new products; regenerate `public/og/*` and the sitemap follows automatically.
5. Rewrite About, FAQ, Terms, Privacy, Refund and blog posts for the new business. Keep the same honesty rules: no invented customer counts, reviews, ratings or registrations.
6. Set new environment values from `.env.example` (`NEXT_PUBLIC_SITE_URL`, GA/GTM IDs, WhatsApp number).
7. Set up new Search Console / Bing properties and submit the new sitemap.

## 10. Working notes (for future edits)

- Client-side data lives only in the visitor's browser: there is no server database, so orders, profiles and promo codes are per device.
- Next.js merges metadata shallowly: set canonicals per page, never in the root layout.
- Bump `IMG_VERSION` in `productImage.ts` whenever the box design changes.
- Close open editor tabs without saving before committing edits made outside your editor, so an old open copy can't overwrite them.
- Safety: never put passwords, card numbers or API keys into the site or into chats.
