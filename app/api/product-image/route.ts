import { NextRequest } from "next/server";

// Generates a clean, branded product "photo" as an SVG for each product —
// consistent styling, correct logo + colors + product name. Keeps imagery
// accurate and copyright-safe (no third-party box art).

interface Meta {
  accent: string;
  accent2: string;
  glyph: string; // inline SVG centered around (400,235), ~200px
  brand: string; // small brand label
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
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
    <circle cx="-58" cy="-64" r="8" fill="#34d399"/><rect x="-40" y="-68" width="80" height="8" rx="4" fill="#ffffff" opacity="0.5"/>
    <circle cx="-58" cy="0" r="8" fill="#34d399"/><rect x="-40" y="-4" width="80" height="8" rx="4" fill="#ffffff" opacity="0.5"/>
    <circle cx="-58" cy="64" r="8" fill="#34d399"/><rect x="-40" y="60" width="80" height="8" rx="4" fill="#ffffff" opacity="0.5"/>
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
  const vendor = (label: string, c1: string, c2: string): Meta => ({ accent: c1, accent2: c2, glyph: shield("#ffffff", c1), brand: label });
  if (n.includes("kaspersky")) return vendor("Kaspersky", "#1a9b5e", "#0d6b3f");
  if (n.includes("norton")) return vendor("Norton", "#ffb200", "#b97e00");
  if (n.includes("mcafee")) return vendor("McAfee", "#c01818", "#7a0f0f");
  if (n.includes("bitdefender")) return vendor("Bitdefender", "#e01a22", "#8a1015");
  if (n.includes("avast")) return vendor("Avast", "#ff7800", "#b35400");
  if (n.includes("eset")) return vendor("ESET", "#0aa5e0", "#0670a0");
  if (n.includes("trend micro")) return vendor("Trend Micro", "#d71920", "#8f1116");

  if ((/office\s*365|microsoft\s*365/.test(n)) || (/\b365\b/.test(n) && !n.includes("windows")))
    return { accent: "#0364b8", accent2: "#022f5c", glyph: cloud("#ffffff"), brand: "Microsoft 365" };
  if (n.includes("visual studio")) return { accent: "#7c3aed", accent2: "#4c1d95", glyph: codeBrackets("#ffffff"), brand: "Visual Studio" };
  if (n.includes("sql")) return { accent: "#b91c1c", accent2: "#7f1d1d", glyph: database("#ffffff"), brand: "SQL Server" };
  if (n.includes("visio")) return { accent: "#0f9488", accent2: "#0b5c54", glyph: diagram("#ffffff"), brand: "Visio" };
  if (n.includes("project")) return { accent: "#16a34a", accent2: "#166534", glyph: barChart("#ffffff"), brand: "Project" };
  if (n.includes("server")) return { accent: "#3b6ea5", accent2: "#1e3a5f", glyph: serverRack("#ffffff"), brand: "Windows Server" };
  if (n.includes("office")) return { accent: "#c43e1c", accent2: "#7a2610", glyph: officeTiles, brand: "Microsoft Office" };
  if (n.includes("windows")) return { accent: "#0a63c9", accent2: "#053a7a", glyph: windowsTiles("#ffffff"), brand: "Microsoft Windows" };

  return { accent: "#0a63c9", accent2: "#053a7a", glyph: windowsTiles("#ffffff"), brand: "Microsoft" };
}

export function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name") || "Microsoft Product";
  const meta = metaFor(name);

  // Split "Base - Variant" into title + variant subtitle.
  const [base, variant] = name.split(" - ");
  const title = esc(base.length > 26 ? base.slice(0, 25) + "…" : base);
  const subtitle = esc(variant || meta.brand);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600" role="img" aria-label="${esc(name)}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0a0e1a"/>
      <stop offset="1" stop-color="${meta.accent2}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="38%" r="55%">
      <stop offset="0" stop-color="${meta.accent}" stop-opacity="0.55"/>
      <stop offset="1" stop-color="${meta.accent}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0 H0 V40" fill="none" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
    <filter id="soft"><feDropShadow dx="0" dy="10" stdDeviation="18" flood-color="#000" flood-opacity="0.45"/></filter>
  </defs>

  <rect width="800" height="600" fill="url(#bg)"/>
  <rect width="800" height="600" fill="url(#grid)"/>
  <rect width="800" height="600" fill="url(#glow)"/>

  <g filter="url(#soft)">${meta.glyph}</g>

  <text x="400" y="440" text-anchor="middle" font-family="'Segoe UI',Inter,Arial,sans-serif" font-size="46" font-weight="800" fill="#ffffff">${title}</text>
  <text x="400" y="482" text-anchor="middle" font-family="'Segoe UI',Inter,Arial,sans-serif" font-size="26" font-weight="600" fill="${meta.accent}">${subtitle}</text>

  <g transform="translate(400,528)">
    <rect x="-118" y="-20" width="236" height="40" rx="20" fill="#ffffff" fill-opacity="0.08" stroke="#34d399" stroke-opacity="0.5"/>
    <text x="0" y="6" text-anchor="middle" font-family="'Segoe UI',Inter,Arial,sans-serif" font-size="19" font-weight="700" fill="#34d399" letter-spacing="1">GENUINE LICENSE KEY</text>
  </g>
</svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
