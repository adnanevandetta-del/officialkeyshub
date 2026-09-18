---
name: officialkeyshub-design
description: >-
  The design system for the Official Keys Hub website (this Next.js repo): the
  exact color palette/theme, typography, component conventions, and the page &
  blog-article templates. Use this skill whenever you add or restyle ANY UI on
  this site — a new page, section, card, button, badge, modal, or blog article,
  or when the user mentions colors, theme, styling, "make it match", template,
  layout, or the look of the site — even if they don't say "design system".
  Following it keeps new work visually consistent with the rest of the site.
---

# Official Keys Hub — Design System

A dark, futuristic e-commerce site selling Microsoft license keys, built with
**Next.js 15 App Router + React 19 + TypeScript + Tailwind CSS**. This skill is
the source of truth for how it looks. Match it when creating or editing UI so
the site stays coherent.

## The core idea (read this first)

Two colors carry meaning, and mixing them up breaks the design:

- **Windows blue = brand & everything ambient** — headings, links, badges,
  glows, borders, the background aurora, accents.
- **Emerald green = "buy" actions only** — Buy Now, Add to Cart, checkout /
  Complete Order, and WhatsApp purchase buttons. Green means "go / convert."
  Nothing decorative is green.
- **Prices are white.** Not blue, not green. The struck-through original price
  is `text-white/40`.

If you remember nothing else: blue brand, green buy, white prices. The theme
deliberately **pairs Windows blue with emerald green** — the ambient accents
(the `.gradient-text` heading highlight, `.btn-primary`, the body aurora, the
scrollbar, `.neon-border`) blend blue → green, so green is now part of the
brand mood, not only the buy CTAs.

## Color palette

The canvas is near-black navy; accents are a deep Microsoft-azure blue.

| Role | Value | Tailwind | Notes |
|------|-------|----------|-------|
| Page background | `#05060b` | — | `--bg`; near-black navy |
| Elevated surface | `#0a0d16` | — | `--bg-elev` |
| Navbar / cart panel | `#0a0e1a` | `bg-[#0a0e1a]` | dark, NOT colored |
| **Primary accent (Windows blue)** | `#0284c7` | `sky-600` | `--accent`, glows, `.gradient-text` |
| Accent light | `#0ea5e9` | `sky-500` | brighter hovers/icons |
| Accent deep | `#0369a1` | `sky-700` | pressed/darker |
| **Purchase CTA** | — | `from-emerald-500 to-emerald-600` | hover `emerald-600/700` |
| Prices | `#ffffff` | `text-white` | struck price `text-white/40` |
| Body text | `#e7ecf5` | — | `--text` |
| Muted text | `#94a3b8` | `slate-400` | `--text-muted` |
| Borders | `rgba(255,255,255,.09)` | `border-white/10` | hairline on dark |
| Glow | `rgba(2,132,199,.45)` | — | `--glow` |

Use Tailwind `sky-*` classes for blue accents. The palette was intentionally
deepened from bright sky to `sky-600`/`sky-700` for a Microsoft-blue feel — keep
new accents in that darker range (`sky-500`–`sky-700`), not the light `sky-300/400`.

### Brand-locked colors — never recolor these

These are third-party brand colors. Recoloring them to match the theme makes the
site look wrong or untrustworthy. Leave them exactly as-is:

- WhatsApp `#25D366` · Trustpilot `#00b67a` · PayPal `#009CDE` + `#3b82f6`
- USDT `#26a17b` · Visa `#1a1f71` · Stripe `#635bff`
- The Microsoft four-color tiles in the logo (red/green/blue/yellow)

### Status colors

Danger/error `red-500`, warning/highlight `yellow-400`, success uses the emerald
family. Light article pages (see below) use light tints like `bg-sky-50`,
`bg-blue-50` — those are correct on white backgrounds; don't darken them.

## Typography

- **Headings** (`h1`–`h4`, `.font-display`): STIX Two Text, **italic + bold** —
  the "Mathematical Bold Italic" display look. Applied globally in `globals.css`
  and available as the `.font-math` class for one-off elements (navbar, logo,
  buttons). Loaded via `next/font/google` in `app/layout.tsx` as `--font-math`.
- **Body**: Inter (`next/font/google`), set on `<body>`.
- **`.gradient-text`**: despite the name it's a **solid** accent color
  (`#0284c7`, no gradient) — used to highlight one phrase inside a heading. Do
  NOT use it for prices (prices stay solid white).

## Reusable utilities (in `globals.css`)

- `.glass` / `.glass-strong` — dark translucent panels for cards and modals.
  Prefer these over ad-hoc `bg-white/5` for anything card-like.
- `.glow-emerald` (a soft accent glow — despite the legacy name it now glows in
  the accent color), `.neon-border` (gradient hairline), `.btn-primary`.
- `.animate-spin-slow` / `-rev`, `.animate-shimmer`, `.animate-float-blob`, etc.
  for the futuristic motion.
- **Global rule `* { max-width: 100% }`** protects against horizontal overflow
  site-wide. It also caps absolutely-positioned dropdowns to their parent width —
  when a dropdown/menu looks squished, add `max-w-none` to it instead of removing
  the global rule.

## Component conventions

- **Container width**: homepage sections and the navbar use
  `max-w-7xl mx-auto px-4` so their left edges line up. Reuse it.
- **Cards**: `rounded-xl`/`rounded-2xl`, dark glass, `border border-white/10`,
  hover raises the border to an accent tint (`hover:border-sky-600/40`).
- **Primary buy button**: `bg-gradient-to-r from-emerald-500 to-emerald-600
  text-white font-black rounded-lg hover:from-emerald-600 hover:to-emerald-700`.
- **Secondary/brand button**: sky gradient or `.btn-primary`.
- **Badges/pills**: `bg-sky-600/20 border border-sky-600/30 text-sky-500`,
  small uppercase bold.
- **Icons**: Font Awesome 6, **self-hosted** — imported in `app/layout.tsx`
  (`@fortawesome/fontawesome-free/css/all.min.css`). Do NOT add a CDN `<link>`;
  the CDN is blocked and every icon goes blank if you rely on it.

## Images

- Product imagery is **generated on the fly** by `app/api/product-image/route.ts`
  via `getProductImage(name)` (`app/lib/productImage.ts`) — a branded SVG per
  product. Use it instead of stock photos for products; it's always on-brand,
  always loads, and copyright-safe.
- Every `next/image` for product/SVG art needs the **`unoptimized`** prop —
  Next's optimizer rasterizes SVGs and they turn blurry otherwise.
- External photos (blog thumbnails from `images.unsplash.com`) must be listed in
  `next.config` `remotePatterns`. Verify a URL returns HTTP 200 before using it —
  broken Unsplash IDs are a recurring problem.

## Page template

Standard content pages compose:

```tsx
<Navbar />
<div className="pt-20 ...">
  <Breadcrumb items={breadcrumbItems} />
  {/* sections */}
</div>
<Footer />
```

Homepage sections sit on the dark canvas; standalone info/blog pages use a white
content area (`bg-white`) with a light tinted hero.

## Blog article template

New articles live at `app/blog/<slug>/page.tsx` as **server components**. Follow
the shape of the existing articles (e.g. `app/blog/activate-windows-11-key/`):

1. `import Navbar, Footer, Breadcrumb`, `Link`, `type { Metadata }`.
2. Export `metadata` with `title`, `description`, `keywords`,
   `alternates.canonical` (`https://officialkeyshub.com/blog/<slug>`), and
   `openGraph`.
3. Build a JSON-LD object with `@graph: [Article, FAQPage]` and render it via
   `<script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />`
   at the top of the returned fragment. The `FAQPage` `mainEntity` must mirror
   the visible FAQ so the two never drift.
4. Light hero (`bg-gradient-to-br from-blue-50 to-indigo-50` or `sky-50`), a
   category pill, date/read-time, gradient headline, then `prose` content.
5. A closing CTA section and a "Related reading" block linking 2–4 other
   articles (internal links help SEO and avoid keyword cannibalization).
6. **Wire it up**: add an entry to the `blogPosts` array in `app/blog/page.tsx`
   (with a verified-200 image URL) AND a `<baseUrl>/blog/<slug>` entry in
   `app/sitemap.ts`.

FAQ/Q&A pages must include `FAQPage` JSON-LD covering every visible question.

## Responsive

Mobile-first. The homepage billboard is a two-column `lg:` grid on desktop and
stacks on mobile, where content is centered (`text-center lg:text-left`) and the
buy CTA sits under the product. Prefer `lg:` for the desktop/mobile split and
keep phone layouts centered and compact.

## When editing colors site-wide

The accent is applied through Tailwind `sky-*` classes in components plus hex
tokens in `globals.css` (`--accent`, `--glow`, `.gradient-text`, scrollbar,
`body` aurora, `.btn-primary`, `.neon-border`). A global recolor means updating
both the Tailwind classes (across `app/**/*.tsx`) and those hex tokens — and
leaving the brand-locked colors and the emerald buy buttons untouched.
