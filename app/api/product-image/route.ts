import { NextRequest } from "next/server";

// Generates a branded retail-box product image as an SVG for each product —
// the product's own brand badge on top, its glyph, edition and name, and the
// Official Keys Hub shield-key logo along the bottom. Consistent styling,
// accurate to each product, and copyright-safe (no third-party box art).

interface Meta {
  accent: string;
  accent2: string;
  glyph: string; // inline SVG centered around (400,235), ~200px
  brand: string; // small brand label
  tintable: boolean; // Microsoft families get per-product tints; vendors keep exact brand colours
  microsoft: boolean; // genuine Microsoft products get the authentic Microsoft logo badge
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// --- deterministic per-product colour tinting ---------------------------
// Same input name always yields the same output, so every product gets a
// stable, unique-looking image while staying within its brand colour family.
function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0;
  const l = (max + min) / 2;
  const d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return [h, s, l];
}

function hslToHex(h: number, s: number, l: number): string {
  h = ((h % 360) + 360) % 360;
  s = Math.min(1, Math.max(0, s));
  l = Math.min(1, Math.max(0, l));
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const to = (v: number) => Math.round((v + m) * 255).toString(16).padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
}

// Shift a base colour by a bounded, name-seeded amount so products in the
// same family (e.g. every Windows edition) each get a distinct on-brand tint.
function tint(hex: string, seed: number, hueRange = 30): string {
  const [h, s, l] = hexToHsl(hex);
  const dh = ((seed % 1000) / 1000 - 0.5) * 2 * hueRange; // ±hueRange
  const ds = (((seed >> 3) % 100) / 100 - 0.5) * 0.16; // ±0.08
  const dl = (((seed >> 7) % 100) / 100 - 0.5) * 0.14; // ±0.07
  return hslToHex(h + dh, s + ds, l + dl);
}

// Pull a human edition label out of the product name for the top chip.
function editionOf(name: string): string {
  const n = name.toLowerCase();
  const tags: [RegExp, string][] = [
    [/custom bundle/, "Build Your Own"],
    [/datacenter/, "Datacenter"],
    [/enterprise/, "Enterprise"],
    [/professional plus|pro plus|pro\b/, "Professional"],
    [/home\s*&\s*business/, "Home & Business"],
    [/home\s*&\s*student/, "Home & Student"],
    [/business standard/, "Business Standard"],
    [/business/, "Business"],
    [/workstations/, "Workstations"],
    [/standard/, "Standard"],
    [/personal/, "Personal"],
    [/deluxe/, "Deluxe"],
    [/premium/, "Premium"],
    [/maximum/, "Maximum"],
    [/total (security|protection)/, "Total Security"],
    [/internet security/, "Internet Security"],
    [/home/, "Home"],
  ];
  for (const [re, label] of tags) if (re.test(n)) return label;
  const kind = /online key/.test(n) ? "Online Key" : /phone key/.test(n) ? "Phone Key" : /bind key/.test(n) ? "Bind Key" : "";
  return kind || "Genuine";
}

// --- category glyphs (drawn around cx=400, cy=235) ---
const windowsTiles = (c: string) => `
  <g transform="translate(400,235)">
    <rect x="-92" y="-92" width="82" height="82" rx="8" fill="${c}"/>
    <rect x="10" y="-92" width="82" height="82" rx="8" fill="${c}"/>
    <rect x="-92" y="10" width="82" height="82" rx="8" fill="${c}"/>
    <rect x="10" y="10" width="82" height="82" rx="8" fill="${c}"/>
  </g>`;

const officeTiles = `
  <g transform="translate(400,235)">
    <rect x="-92" y="-92" width="82" height="82" rx="8" fill="#D83B01"/>
    <rect x="10" y="-92" width="82" height="82" rx="8" fill="#185ABD"/>
    <rect x="-92" y="10" width="82" height="82" rx="8" fill="#107C41"/>
    <rect x="10" y="10" width="82" height="82" rx="8" fill="#C43E1C"/>
  </g>`;

const cloud = (c: string) => `
  <g transform="translate(400,235)">
    <path d="M-70 30 a45 45 0 0 1 12 -88 a55 55 0 0 1 104 12 a38 38 0 0 1 -6 76 Z" fill="${c}"/>
    <path d="M-70 30 a45 45 0 0 1 12 -88 a55 55 0 0 1 104 12 a38 38 0 0 1 -6 76 Z" fill="#ffffff" opacity="0.12"/>
  </g>`;

const serverRack = (c: string) => `
  <g transform="translate(400,235)">
    <rect x="-80" y="-90" width="160" height="52" rx="8" fill="${c}"/>
    <rect x="-80" y="-26" width="160" height="52" rx="8" fill="${c}"/>
    <rect x="-80" y="38" width="160" height="52" rx="8" fill="${c}"/>
    <circle cx="-58" cy="-64" r="8" fill="#38bdf8"/><rect x="-40" y="-68" width="80" height="8" rx="4" fill="#ffffff" opacity="0.5"/>
    <circle cx="-58" cy="0" r="8" fill="#38bdf8"/><rect x="-40" y="-4" width="80" height="8" rx="4" fill="#ffffff" opacity="0.5"/>
    <circle cx="-58" cy="64" r="8" fill="#38bdf8"/><rect x="-40" y="60" width="80" height="8" rx="4" fill="#ffffff" opacity="0.5"/>
  </g>`;

const database = (c: string) => `
  <g transform="translate(400,235)">
    <ellipse cx="0" cy="-70" rx="78" ry="26" fill="${c}"/>
    <path d="M-78 -70 v140 a78 26 0 0 0 156 0 v-140" fill="${c}"/>
    <ellipse cx="0" cy="-20" rx="78" ry="26" fill="#ffffff" opacity="0.14"/>
    <ellipse cx="0" cy="35" rx="78" ry="26" fill="#ffffff" opacity="0.14"/>
  </g>`;

const diagram = (c: string) => `
  <g transform="translate(400,235)">
    <rect x="-90" y="-80" width="70" height="48" rx="8" fill="${c}"/>
    <rect x="30" y="-80" width="70" height="48" rx="8" fill="${c}"/>
    <rect x="-30" y="40" width="70" height="48" rx="8" fill="${c}"/>
    <path d="M-55 -32 v40 h60 v32 M65 -32 v40 h-60" fill="none" stroke="#ffffff" stroke-opacity="0.5" stroke-width="6"/>
  </g>`;

const barChart = (c: string) => `
  <g transform="translate(400,235)">
    <rect x="-84" y="-10" width="34" height="95" rx="6" fill="${c}"/>
    <rect x="-33" y="-55" width="34" height="140" rx="6" fill="${c}"/>
    <rect x="18" y="-90" width="34" height="175" rx="6" fill="${c}"/>
    <rect x="69" y="-30" width="34" height="115" rx="6" fill="${c}" opacity="0.7"/>
  </g>`;

const codeBrackets = (c: string) => `
  <g transform="translate(400,235)" fill="none" stroke="${c}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round">
    <path d="M-40 -70 L-95 0 L-40 70"/>
    <path d="M40 -70 L95 0 L40 70"/>
    <path d="M12 -78 L-12 78" stroke-width="14"/>
  </g>`;

// Three stacked license boxes with a plus — used for "Custom Bundle" items.
const bundleBoxes = `
  <g transform="translate(400,235)">
    <rect x="-98" y="-2" width="84" height="92" rx="9" fill="#ffffff" opacity="0.92"/>
    <rect x="14" y="-2" width="84" height="92" rx="9" fill="#ffffff" opacity="0.92"/>
    <rect x="-42" y="-96" width="84" height="92" rx="9" fill="#ffffff"/>
    <path d="M-70 44 h28 M-56 30 v28" stroke="#0f766e" stroke-width="8" stroke-linecap="round"/>
    <path d="M42 44 h28 M56 30 v28" stroke="#0f766e" stroke-width="8" stroke-linecap="round"/>
    <path d="M-14 -50 h28 M0 -64 v28" stroke="#0f766e" stroke-width="8" stroke-linecap="round"/>
  </g>`;

const shield = (fill: string, check: string) => `
  <g transform="translate(400,235)">
    <path d="M0 -95 L82 -60 V15 C82 65 45 95 0 108 C-45 95 -82 65 -82 15 V-60 Z" fill="${fill}"/>
    <path d="M-34 4 L-10 30 L38 -30" fill="none" stroke="${check}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
  </g>`;

function metaFor(name: string): Meta {
  const n = name.toLowerCase();

  if (n.startsWith("custom bundle"))
    return { accent: "#0d9488", accent2: "#115e59", glyph: bundleBoxes, brand: "Custom Bundle", tintable: false, microsoft: false };

  // Security vendors (brand colors)
  const vendor = (label: string, c1: string, c2: string): Meta => ({ accent: c1, accent2: c2, glyph: shield("#ffffff", c1), brand: label, tintable: false, microsoft: false });
  if (n.includes("kaspersky")) return vendor("Kaspersky", "#1a9b5e", "#0d6b3f");
  if (n.includes("norton")) return vendor("Norton", "#ffb200", "#b97e00");
  if (n.includes("mcafee")) return vendor("McAfee", "#c01818", "#7a0f0f");
  if (n.includes("bitdefender")) return vendor("Bitdefender", "#e01a22", "#8a1015");
  if (n.includes("avast")) return vendor("Avast", "#ff7800", "#b35400");
  if (n.includes("eset")) return vendor("ESET", "#0aa5e0", "#0670a0");
  if (n.includes("trend micro")) return vendor("Trend Micro", "#d71920", "#8f1116");

  if ((/office\s*365|microsoft\s*365/.test(n)) || (/\b365\b/.test(n) && !n.includes("windows")))
    return { accent: "#0364b8", accent2: "#022f5c", glyph: cloud("#ffffff"), brand: "Microsoft 365", tintable: true, microsoft: true };
  if (n.includes("visual studio")) return { accent: "#7c3aed", accent2: "#4c1d95", glyph: codeBrackets("#ffffff"), brand: "Visual Studio", tintable: true, microsoft: true };
  if (n.includes("sql")) return { accent: "#b91c1c", accent2: "#7f1d1d", glyph: database("#ffffff"), brand: "SQL Server", tintable: true, microsoft: true };
  if (n.includes("visio")) return { accent: "#0f9488", accent2: "#0b5c54", glyph: diagram("#ffffff"), brand: "Visio", tintable: true, microsoft: true };
  if (n.includes("project")) return { accent: "#16a34a", accent2: "#166534", glyph: barChart("#ffffff"), brand: "Project", tintable: true, microsoft: true };
  if (n.includes("server")) return { accent: "#3b6ea5", accent2: "#1e3a5f", glyph: serverRack("#ffffff"), brand: "Windows Server", tintable: true, microsoft: true };
  if (n.includes("office")) return { accent: "#c43e1c", accent2: "#7a2610", glyph: officeTiles, brand: "Microsoft Office", tintable: true, microsoft: true };
  if (n.includes("windows")) return { accent: "#0a63c9", accent2: "#053a7a", glyph: windowsTiles("#ffffff"), brand: "Microsoft Windows", tintable: true, microsoft: true };

  return { accent: "#0a63c9", accent2: "#053a7a", glyph: windowsTiles("#ffffff"), brand: "Microsoft", tintable: true, microsoft: true };
}

// Split a product title into up to `maxLines` lines of ~`max` characters.
function wrapTitle(s: string, max = 16, maxLines = 3): string[] {
  const words = s.trim().split(/\s+/);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if (!cur) cur = w;
    else if ((cur + " " + w).length <= max) cur += " " + w;
    else { lines.push(cur); cur = w; }
  }
  if (cur) lines.push(cur);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] = kept[maxLines - 1].slice(0, max - 1) + "…";
    return kept;
  }
  return lines;
}

export function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name") || "Microsoft Product";
  // ?box=1 → just the box on a transparent background, tightly cropped (for the homepage carousel).
  const boxOnly = req.nextUrl.searchParams.get("box") === "1";
  const meta = metaFor(name);
  const seed = hash(name);

  // Per-product tint keeps same-family products visually distinct.
  const accent = meta.tintable ? tint(meta.accent, seed, 26) : meta.accent;
  const accent2 = meta.tintable ? tint(meta.accent2, seed, 26) : meta.accent2;

  // Pale themed scene background: a very light wash of the product's own accent
  // hue, so each box sits on a backdrop that matches its colour family.
  const [bgH, bgS] = hexToHsl(accent);
  const bgTop = hslToHex(bgH, Math.min(bgS, 0.5), 0.965);
  const bgBottom = hslToHex(bgH, Math.min(bgS, 0.62), 0.88);
  const edition = editionOf(name);

  // Split "Base - Variant" into title + variant subtitle.
  const [base, variant] = name.split(" - ");
  const lines = wrapTitle(base);
  const titleSize = Math.max(...lines.map((l) => l.length)) > 14 ? 25 : 28;
  const titleY = 392;
  const variantY = titleY + (lines.length - 1) * 30 + 28;
  const titleSvg = lines
    .map((l, i) => `<text x="370" y="${titleY + i * 30}" text-anchor="middle" font-family="'Segoe UI',Inter,Arial,sans-serif" font-size="${titleSize}" font-weight="800" fill="#ffffff">${esc(l)}</text>`)
    .join("\n  ");
  const variantSvg = variant
    ? `<text x="370" y="${variantY}" text-anchor="middle" font-family="'Segoe UI',Inter,Arial,sans-serif" font-size="18" font-weight="700" fill="#ffffff" fill-opacity="0.85">${esc(variant)}</text>`
    : "";
  const chipW = Math.max(110, edition.length * 10 + 40);

  // Top-band brand badge: the authentic Microsoft four-colour logo on genuine
  // Microsoft products (exact brand colours, never recoloured), the vendor's
  // own name otherwise. A small genuine tick sits at the opposite end.
  const brandBadge = meta.microsoft
    ? `<g transform="translate(236,80)">
        <rect x="0" y="0" width="9" height="9" fill="#F25022"/>
        <rect x="11" y="0" width="9" height="9" fill="#7FBA00"/>
        <rect x="0" y="11" width="9" height="9" fill="#00A4EF"/>
        <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
        <text x="28" y="17" font-family="'Segoe UI',Inter,Arial,sans-serif" font-size="15" font-weight="600" fill="#ffffff">Microsoft</text>
      </g>`
    : `<text x="236" y="97" font-family="'Segoe UI',Inter,Arial,sans-serif" font-size="16" font-weight="700" fill="#ffffff">${esc(meta.brand)}</text>`;
  const genuineTick = `<g transform="translate(497,91)"><circle r="9.5" fill="#ffffff" fill-opacity="0.14" stroke="#ffffff" stroke-opacity="0.55" stroke-width="1.2"/><path d="M-4.3 0 L-1 3.3 L4.6 -3.4" fill="none" stroke="#ffffff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></g>`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${boxOnly ? "200 50 400 530" : "0 0 800 600"}" width="${boxOnly ? 400 : 800}" height="${boxOnly ? 530 : 600}" role="img" aria-label="${esc(name)} — Official Keys Hub">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${bgTop}"/>
      <stop offset="1" stop-color="${bgBottom}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.20"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="front" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${accent}"/>
      <stop offset="1" stop-color="${accent2}"/>
    </linearGradient>
    <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0.45" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.55"/>
    </linearGradient>
    <linearGradient id="spine" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${accent2}"/>
      <stop offset="1" stop-color="#05070d"/>
    </linearGradient>
    <linearGradient id="gloss" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="0.22"/>
      <stop offset="0.5" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#3b82f6"/>
      <stop offset="1" stop-color="#173f82"/>
    </linearGradient>
    <clipPath id="boxclip"><rect x="220" y="70" width="300" height="460" rx="4"/></clipPath>
    <filter id="soft"><feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000" flood-opacity="0.4"/></filter>
    <filter id="blur"><feGaussianBlur stdDeviation="10"/></filter>
  </defs>

  ${boxOnly ? "" : `<rect width="800" height="600" fill="url(#bg)"/>
  <ellipse cx="400" cy="300" rx="330" ry="270" fill="url(#glow)"/>`}
  <ellipse cx="400" cy="546" rx="${boxOnly ? 170 : 215}" ry="${boxOnly ? 12 : 16}" fill="#0f172a" fill-opacity="0.22" filter="url(#blur)"/>

  <!-- Box spine (right side) — plain 3D side panel, no text -->
  <polygon points="520,70 580,92 580,508 520,530" fill="url(#spine)"/>

  <!-- Box front -->
  <rect x="220" y="70" width="300" height="460" rx="4" fill="url(#front)"/>
  <rect x="220" y="70" width="300" height="460" rx="4" fill="url(#shade)"/>
  <polygon points="220,70 400,70 220,300" fill="url(#gloss)"/>
  <rect x="220" y="70" width="300" height="460" rx="4" fill="none" stroke="#fff" stroke-opacity="0.18"/>

  <!-- Top band: product brand badge + genuine tick -->
  <rect x="220" y="70" width="300" height="42" rx="4" fill="#000" fill-opacity="0.32"/>
  ${brandBadge}
  ${genuineTick}

  <!-- Product glyph -->
  <g filter="url(#soft)"><g transform="translate(370,222) scale(0.72) translate(-400,-235)">${meta.glyph}</g></g>

  <!-- Edition chip -->
  <g transform="translate(370,335)">
    <rect x="${-chipW / 2}" y="-15" width="${chipW}" height="30" rx="15" fill="#000" fill-opacity="0.35" stroke="#fff" stroke-opacity="0.5"/>
    <text x="0" y="5" text-anchor="middle" font-family="'Segoe UI',Inter,Arial,sans-serif" font-size="14" font-weight="700" fill="#ffffff" letter-spacing="1.5">${esc(edition.toUpperCase())}</text>
  </g>

  <!-- Product name -->
  ${titleSvg}
  ${variantSvg}

  <!-- Bottom band: Official Keys Hub shield-key logo -->
  <rect x="220" y="492" width="300" height="38" fill="#000" fill-opacity="0.45"/>
  <g transform="translate(299,511)">
    <g transform="translate(0,-11) scale(0.34)">
      <path d="M32 4 L54 12 V30 C54 46 44 55 32 60 C20 55 10 46 10 30 V12 Z" fill="url(#shieldGrad)"/>
      <path d="M32 4 L54 12 V30 C54 46 44 55 32 60 C20 55 10 46 10 30 V12 Z" fill="none" stroke="#bcd4ff" stroke-opacity="0.3" stroke-width="1.5"/>
      <circle cx="32" cy="26" r="8.5" fill="none" stroke="#fff" stroke-width="4"/>
      <circle cx="32" cy="26" r="3" fill="#f97316"/>
      <rect x="30" y="30" width="4" height="18" rx="2" fill="#fff"/>
      <rect x="34" y="40" width="7" height="4" rx="2" fill="#fff"/>
      <rect x="34" y="46" width="5" height="4" rx="2" fill="#fff"/>
    </g>
    <text x="30" y="5" font-family="Georgia,'Times New Roman',serif" font-style="italic" font-size="16" font-weight="900"><tspan fill="#ffffff">OfficialKeys</tspan><tspan fill="#f97316">Hub</tspan></text>
  </g>
</svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
