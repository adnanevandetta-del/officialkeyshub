import { NextRequest } from "next/server";

// Generates a clean, branded product "photo" as an SVG for each product —
// consistent styling, correct logo + colors + product name. Keeps imagery
// accurate and copyright-safe (no third-party box art).

interface Meta {
  accent: string;
  accent2: string;
  glyph: string; // inline SVG centered around (400,235), ~200px
  brand: string; // small brand label
  tintable: boolean; // Microsoft families get per-product tints; vendors keep exact brand colours
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

const shield = (fill: string, check: string) => `
  <g transform="translate(400,235)">
    <path d="M0 -95 L82 -60 V15 C82 65 45 95 0 108 C-45 95 -82 65 -82 15 V-60 Z" fill="${fill}"/>
    <path d="M-34 4 L-10 30 L38 -30" fill="none" stroke="${check}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
  </g>`;

function metaFor(name: string): Meta {
  const n = name.toLowerCase();

  // Security vendors (brand colors)
  const vendor = (label: string, c1: string, c2: string): Meta => ({ accent: c1, accent2: c2, glyph: shield("#ffffff", c1), brand: label, tintable: false });
  if (n.includes("kaspersky")) return vendor("Kaspersky", "#1a9b5e", "#0d6b3f");
  if (n.includes("norton")) return vendor("Norton", "#ffb200", "#b97e00");
  if (n.includes("mcafee")) return vendor("McAfee", "#c01818", "#7a0f0f");
  if (n.includes("bitdefender")) return vendor("Bitdefender", "#e01a22", "#8a1015");
  if (n.includes("avast")) return vendor("Avast", "#ff7800", "#b35400");
  if (n.includes("eset")) return vendor("ESET", "#0aa5e0", "#0670a0");
  if (n.includes("trend micro")) return vendor("Trend Micro", "#d71920", "#8f1116");

  if ((/office\s*365|microsoft\s*365/.test(n)) || (/\b365\b/.test(n) && !n.includes("windows")))
    return { accent: "#0364b8", accent2: "#022f5c", glyph: cloud("#ffffff"), brand: "Microsoft 365", tintable: true };
  if (n.includes("visual studio")) return { accent: "#7c3aed", accent2: "#4c1d95", glyph: codeBrackets("#ffffff"), brand: "Visual Studio", tintable: true };
  if (n.includes("sql")) return { accent: "#b91c1c", accent2: "#7f1d1d", glyph: database("#ffffff"), brand: "SQL Server", tintable: true };
  if (n.includes("visio")) return { accent: "#0f9488", accent2: "#0b5c54", glyph: diagram("#ffffff"), brand: "Visio", tintable: true };
  if (n.includes("project")) return { accent: "#16a34a", accent2: "#166534", glyph: barChart("#ffffff"), brand: "Project", tintable: true };
  if (n.includes("server")) return { accent: "#3b6ea5", accent2: "#1e3a5f", glyph: serverRack("#ffffff"), brand: "Windows Server", tintable: true };
  if (n.includes("office")) return { accent: "#c43e1c", accent2: "#7a2610", glyph: officeTiles, brand: "Microsoft Office", tintable: true };
  if (n.includes("windows")) return { accent: "#0a63c9", accent2: "#053a7a", glyph: windowsTiles("#ffffff"), brand: "Microsoft Windows", tintable: true };

  return { accent: "#0a63c9", accent2: "#053a7a", glyph: windowsTiles("#ffffff"), brand: "Microsoft", tintable: true };
}

// Big faint identifier drawn behind the glyph (version / year / brand initial).
function watermarkOf(name: string): string {
  const n = name.toLowerCase();
  if (/\b365\b/.test(n)) return "365";
  const ver = n.match(/\b(11|10|8\.1|7)\b/);
  if (ver && n.includes("windows")) return ver[1];
  const year = n.match(/\b(20\d\d)\b/);
  if (year) return year[1];
  return name.trim().charAt(0).toUpperCase();
}

export function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name") || "Microsoft Product";
  const meta = metaFor(name);
  const seed = hash(name);

  // Per-product tint keeps same-family products visually distinct.
  const accent = meta.tintable ? tint(meta.accent, seed, 26) : meta.accent;
  const accent2 = meta.tintable ? tint(meta.accent2, seed, 26) : meta.accent2;
  const edition = editionOf(name);
  const watermark = esc(watermarkOf(name));

  // Split "Base - Variant" into title + variant subtitle.
  const [base, variant] = name.split(" - ");
  const title = esc(base.length > 26 ? base.slice(0, 25) + "…" : base);
  const subtitle = esc(variant || meta.brand);
  const chipW = Math.max(120, edition.length * 12 + 44);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600" role="img" aria-label="${esc(name)}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0a0e1a"/>
      <stop offset="1" stop-color="${accent2}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="38%" r="55%">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.55"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0 H0 V40" fill="none" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
    <filter id="soft"><feDropShadow dx="0" dy="10" stdDeviation="18" flood-color="#000" flood-opacity="0.45"/></filter>
  </defs>

  <rect width="800" height="600" fill="url(#bg)"/>
  <rect width="800" height="600" fill="url(#grid)"/>
  <rect width="800" height="600" fill="url(#glow)"/>

  <text x="400" y="300" text-anchor="middle" font-family="'Segoe UI',Inter,Arial,sans-serif" font-size="300" font-weight="900" fill="#ffffff" fill-opacity="0.05">${watermark}</text>

  <g filter="url(#soft)">${meta.glyph}</g>

  <g transform="translate(400,92)">
    <rect x="${-chipW / 2}" y="-20" width="${chipW}" height="40" rx="20" fill="${accent}" fill-opacity="0.9"/>
    <text x="0" y="7" text-anchor="middle" font-family="'Segoe UI',Inter,Arial,sans-serif" font-size="20" font-weight="700" fill="#ffffff" letter-spacing="1">${esc(edition.toUpperCase())}</text>
  </g>

  <text x="400" y="440" text-anchor="middle" font-family="'Segoe UI',Inter,Arial,sans-serif" font-size="46" font-weight="800" fill="#ffffff">${title}</text>
  <text x="400" y="482" text-anchor="middle" font-family="'Segoe UI',Inter,Arial,sans-serif" font-size="26" font-weight="600" fill="${accent}">${subtitle}</text>

  <g transform="translate(400,528)">
    <rect x="-118" y="-20" width="236" height="40" rx="20" fill="#ffffff" fill-opacity="0.08" stroke="#38bdf8" stroke-opacity="0.5"/>
    <text x="0" y="6" text-anchor="middle" font-family="'Segoe UI',Inter,Arial,sans-serif" font-size="19" font-weight="700" fill="#38bdf8" letter-spacing="1">GENUINE LICENSE KEY</text>
  </g>
</svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
