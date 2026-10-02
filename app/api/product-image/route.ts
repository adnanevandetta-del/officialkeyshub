import { NextRequest } from "next/server";

// Generates a white retail-box product image as an SVG for each product —
// Official Keys Hub logo centered on top, a realistic product logo, the name
// and edition, with a per-product coloured trim. Copyright-safe (our own
// branding; product logos are drawn as simple on-brand marks).

interface Meta {
  accent: string;    // trim colour
  accent2: string;   // darker trim shade
  family: string;    // which logo + layout to use
  brand: string;     // top-badge label for non-Microsoft products
  microsoft: boolean; // genuine Microsoft product → show the Microsoft badge
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Pull a human edition label out of the product name for the subtitle.
function editionOf(name: string): string {
  const n = name.toLowerCase();
  const tags: [RegExp, string][] = [
    [/custom bundle/, "Build Your Own"],
    [/datacenter/, "Datacenter"],
    [/enterprise/, "Enterprise"],
    [/professional plus|pro plus/, "Professional Plus"],
    [/professional|\bpro\b/, "Professional"],
    [/home\s*&\s*business/, "Home & Business"],
    [/home\s*&\s*student/, "Home & Student"],
    [/business standard/, "Business Standard"],
    [/business/, "Business"],
    [/workstations/, "Workstations"],
    [/standard/, "Standard"],
    [/personal/, "Personal"],
    [/family/, "Family"],
    [/deluxe/, "Deluxe"],
    [/premium/, "Premium"],
    [/maximum/, "Maximum"],
    [/total (security|protection)/, "Total Security"],
    [/internet security/, "Internet Security"],
    [/home/, "Home"],
  ];
  for (const [re, label] of tags) if (re.test(n)) return label;
  const kind = /online key/.test(n) ? "Online Key" : /phone key/.test(n) ? "Phone Key" : /bind key/.test(n) ? "Bind Key" : "";
  return kind || "Genuine License";
}

// The product's own components, shown under the name on non-Office boxes.
function componentsOf(name: string): string[] {
  const n = name.toLowerCase();
  if (n.startsWith("custom bundle")) return ["Multiple genuine licenses", "One combined delivery", "Bundle discount applied"];
  if (/kaspersky|norton|mcafee|bitdefender|avast|eset|trend micro/.test(n)) return ["Real-time antivirus", "Firewall & anti-phishing", "Secure VPN included"];
  if (n.includes("visual studio")) return ["Full IDE & compilers", "Debugger & profiler", "IntelliCode assistance"];
  if (n.includes("sql")) return ["Database engine", "Analysis Services", "Reporting Services"];
  if (n.includes("visio")) return ["Pro diagram templates", "Data-linked shapes", "Real-time co-authoring"];
  if (n.includes("project")) return ["Project scheduling", "Gantt & timelines", "Resource management"];
  if (n.includes("server")) return ["Server OS license", "Hyper-V virtualization", "Active Directory"];
  if (n.includes("windows")) {
    if (/pro|professional|enterprise/.test(n)) return ["Desktop OS license", "BitLocker & Hyper-V", "Remote Desktop"];
    return ["Desktop OS license", "Windows Security", "Free feature updates"];
  }
  return ["Genuine license key", "Lifetime activation", "Instant email delivery"];
}

// --- realistic product logos (drawn centred on the origin, ~±100) ---

// Microsoft Office folded-ribbon mark (orange portal + magenta fold).
const officeRibbon = `
  <g>
    <rect x="-73" y="-142" width="200" height="285" rx="44" fill="url(#oPanel)"/>
    <rect x="-21" y="-76" width="96" height="150" rx="26" fill="#ffffff"/>
    <path d="M-41 -128 L-29 -122 L-29 136 L-41 136 Z" fill="#7a1f33" opacity="0.32" filter="url(#foldShadow)"/>
    <path d="M-127 -88 L-41 -128 L-41 126 Q-41 143 -58 143 L-110 143 Q-127 143 -127 126 Z" fill="url(#oFold)"/>
    <path d="M-127 -88 L-41 -128 L-41 -112 L-127 -72 Z" fill="#ffffff" opacity="0.18"/>
    <rect x="-127" y="-88" width="8" height="208" rx="4" fill="#ffffff" opacity="0.14"/>
  </g>`;

// Authentic Windows 11 four-pane mark (flat squares, Windows blue).
const windowsPanes = () => `
  <g fill="url(#winGrad)">
    <rect x="-92" y="-92" width="86" height="86" rx="3"/>
    <rect x="6" y="-92" width="86" height="86" rx="3"/>
    <rect x="-92" y="6" width="86" height="86" rx="3"/>
    <rect x="6" y="6" width="86" height="86" rx="3"/>
  </g>`;

const serverStack = (c: string) => `
  <g>
    <rect x="-92" y="-84" width="184" height="52" rx="10" fill="${c}"/>
    <rect x="-92" y="-26" width="184" height="52" rx="10" fill="${c}"/>
    <rect x="-92" y="32" width="184" height="52" rx="10" fill="${c}"/>
    <circle cx="-66" cy="-58" r="7" fill="#fff"/><rect x="-48" y="-62" width="96" height="8" rx="4" fill="#fff" opacity="0.5"/>
    <circle cx="-66" cy="0" r="7" fill="#fff"/><rect x="-48" y="-4" width="96" height="8" rx="4" fill="#fff" opacity="0.5"/>
    <circle cx="-66" cy="58" r="7" fill="#fff"/><rect x="-48" y="54" width="96" height="8" rx="4" fill="#fff" opacity="0.5"/>
  </g>`;

const dbCylinder = (c: string) => `
  <g>
    <ellipse cx="0" cy="-74" rx="80" ry="25" fill="${c}"/>
    <path d="M-80 -74 v148 a80 25 0 0 0 160 0 v-148" fill="${c}"/>
    <ellipse cx="0" cy="-20" rx="80" ry="25" fill="#ffffff" opacity="0.2"/>
    <ellipse cx="0" cy="36" rx="80" ry="25" fill="#ffffff" opacity="0.2"/>
  </g>`;

const visioDiagram = (c: string) => `
  <g>
    <path d="M-58 -36 v34 h60 v34 M62 -36 v34 h-60" fill="none" stroke="${c}" stroke-opacity="0.55" stroke-width="7"/>
    <rect x="-94" y="-82" width="72" height="50" rx="9" fill="${c}"/>
    <rect x="30" y="-82" width="72" height="50" rx="9" fill="${c}"/>
    <rect x="-32" y="40" width="72" height="50" rx="9" fill="${c}"/>
  </g>`;

const projectBars = (c: string) => `
  <g>
    <rect x="-86" y="-10" width="36" height="96" rx="6" fill="${c}"/>
    <rect x="-34" y="-56" width="36" height="142" rx="6" fill="${c}"/>
    <rect x="18" y="-92" width="36" height="178" rx="6" fill="${c}"/>
    <rect x="70" y="-32" width="36" height="118" rx="6" fill="${c}" opacity="0.7"/>
  </g>`;

const vsMark = (c: string) => `
  <g fill="none" stroke="${c}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round">
    <path d="M-46 -72 L-100 0 L-46 72"/>
    <path d="M46 -72 L100 0 L46 72"/>
    <path d="M14 -82 L-14 82" stroke-width="15"/>
  </g>`;

const shieldLogo = (c: string) => `
  <g>
    <path d="M0 -94 L80 -58 V16 C80 64 44 94 0 106 C-44 94 -80 64 -80 16 V-58 Z" fill="${c}"/>
    <path d="M0 -94 L80 -58 V16 C80 64 44 94 0 106 C-44 94 -80 64 -80 16 V-58 Z" fill="#fff" opacity="0.10"/>
    <path d="M-34 4 L-10 30 L38 -32" fill="none" stroke="#ffffff" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/>
  </g>`;

const bundleStack = (c: string) => `
  <g>
    <rect x="-96" y="0" width="86" height="92" rx="10" fill="${c}" opacity="0.85"/>
    <rect x="12" y="0" width="86" height="92" rx="10" fill="${c}" opacity="0.85"/>
    <rect x="-42" y="-92" width="86" height="92" rx="10" fill="${c}"/>
    <path d="M-67 46 h28 M-53 32 v28" stroke="#fff" stroke-width="8" stroke-linecap="round"/>
    <path d="M41 46 h28 M55 32 v28" stroke="#fff" stroke-width="8" stroke-linecap="round"/>
    <path d="M-13 -46 h28 M1 -60 v28" stroke="#fff" stroke-width="8" stroke-linecap="round"/>
  </g>`;

function metaFor(name: string): Meta {
  const n = name.toLowerCase();
  if (n.startsWith("custom bundle")) return { accent: "#0d9488", accent2: "#0b5c54", family: "bundle", brand: "Custom Bundle", microsoft: false };

  const vendor = (label: string, c1: string, c2: string): Meta => ({ accent: c1, accent2: c2, family: "security", brand: label, microsoft: false });
  if (n.includes("kaspersky")) return vendor("Kaspersky", "#1a9b5e", "#0d6b3f");
  if (n.includes("norton")) return vendor("Norton", "#ffb200", "#b97e00");
  if (n.includes("mcafee")) return vendor("McAfee", "#c01818", "#7a0f0f");
  if (n.includes("bitdefender")) return vendor("Bitdefender", "#e01a22", "#8a1015");
  if (n.includes("avast")) return vendor("Avast", "#ff7800", "#b35400");
  if (n.includes("eset")) return vendor("ESET", "#0aa5e0", "#0670a0");
  if (n.includes("trend micro")) return vendor("Trend Micro", "#d71920", "#8f1116");

  if ((/office\s*365|microsoft\s*365/.test(n)) || (/\b365\b/.test(n) && !n.includes("windows")))
    return { accent: "#e3611f", accent2: "#c0330f", family: "office", brand: "Microsoft 365", microsoft: true };
  if (n.includes("visual studio")) return { accent: "#7c3aed", accent2: "#5b21b6", family: "vs", brand: "Visual Studio", microsoft: true };
  if (n.includes("sql")) return { accent: "#c0392b", accent2: "#8f261c", family: "sql", brand: "SQL Server", microsoft: true };
  if (n.includes("visio")) return { accent: "#0f9488", accent2: "#0b5c54", family: "visio", brand: "Visio", microsoft: true };
  if (n.includes("project")) return { accent: "#16a34a", accent2: "#0f7a37", family: "project", brand: "Project", microsoft: true };
  if (n.includes("server")) return { accent: "#2f6fb0", accent2: "#234f7a", family: "server", brand: "Windows Server", microsoft: true };
  if (n.includes("office")) return { accent: "#e3611f", accent2: "#c0330f", family: "office", brand: "Microsoft Office", microsoft: true };
  if (n.includes("windows")) return { accent: "#0a63c9", accent2: "#0b4f9e", family: "windows", brand: "Microsoft Windows", microsoft: true };
  return { accent: "#0a63c9", accent2: "#0b4f9e", family: "windows", brand: "Microsoft", microsoft: true };
}

function logoFor(meta: Meta): { svg: string; scale: number } {
  switch (meta.family) {
    case "office": return { svg: officeRibbon, scale: 0.76 };
    case "windows": return { svg: windowsPanes(), scale: 0.84 };
    case "server": return { svg: serverStack(meta.accent), scale: 0.86 };
    case "sql": return { svg: dbCylinder(meta.accent), scale: 0.86 };
    case "visio": return { svg: visioDiagram(meta.accent), scale: 0.92 };
    case "project": return { svg: projectBars(meta.accent), scale: 0.86 };
    case "vs": return { svg: vsMark(meta.accent), scale: 0.86 };
    case "security": return { svg: shieldLogo(meta.accent), scale: 0.86 };
    case "bundle": return { svg: bundleStack(meta.accent), scale: 0.86 };
    default: return { svg: windowsPanes(), scale: 0.86 };
  }
}

// Split a product title into up to `maxLines` lines of ~`max` characters.
function wrapTitle(s: string, max = 16, maxLines = 2): string[] {
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

// Office app icon in the classic style: a white document with content lines and
// a coloured corner tab bearing the app letter — reads like a real program icon.
const appIcon = (x: number, c: string, letter: string) => `
  <g transform="translate(${x},0)">
    <rect x="-14" y="-18" width="28" height="36" rx="3" fill="#ffffff" stroke="#d7dbe2" stroke-width="1"/>
    <rect x="-6" y="-3" width="16" height="2.3" rx="1" fill="${c}" opacity="0.4"/>
    <rect x="-6" y="3" width="16" height="2.3" rx="1" fill="${c}" opacity="0.4"/>
    <rect x="-6" y="9" width="12" height="2.3" rx="1" fill="${c}" opacity="0.4"/>
    <rect x="-16" y="-21" width="20" height="20" rx="4" fill="${c}"/>
    <text x="-6" y="-6.5" text-anchor="middle" font-family="'Segoe UI',Arial,sans-serif" font-size="14" font-weight="800" fill="#ffffff">${letter}</text>
  </g>`;

export function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name") || "Microsoft Product";
  const boxOnly = req.nextUrl.searchParams.get("box") === "1";
  const meta = metaFor(name);
  const { accent, accent2 } = meta;
  const { svg: logoSvg, scale: logoScale } = logoFor(meta);
  const isOffice = meta.family === "office";

  const edition = editionOf(name);
  const [base, variant] = name.split(" - ");
  // Clean headline → "Windows 11" / "Office 2021" style, with the edition as
  // subtitle. The Microsoft badge already carries the maker, so the title drops
  // a leading "Microsoft" — except where it is the product name ("Microsoft 365").
  let headline = base
    .replace(/professional plus|pro plus|professional|datacenter|enterprise|business standard|home\s*&\s*business|home\s*&\s*student|workstations|business|standard|personal|family|deluxe|premium|maximum|total security|internet security|\bpro\b|\bhome\b/ig, "")
    .replace(/\s{2,}/g, " ").trim() || base;
  if (meta.microsoft && /^microsoft\s+\D/i.test(headline)) headline = headline.replace(/^microsoft\s+/i, "");
  const nameLines = wrapTitle(headline, 20, 2);
  const maxLen = Math.max(...nameLines.map((l) => l.length));
  const nameSize = maxLen <= 12 ? 52 : maxLen <= 16 ? 44 : maxLen <= 20 ? 38 : 34;

  // ---- Flat product cover: card 40..560 (w520) x 30..750 (h720), the
  // reference box's front face drawn straight-on (no fake 3D side). ----
  // Title, edition and bottom block are stacked as one group and centred
  // vertically in the band between the logo and the bottom bar (410..712).
  const titleStep = nameSize + 10;
  const comps = isOffice ? [] : componentsOf(name);
  const bottomH = isOffice ? 58 : (comps.length - 1) * 34 + 20;
  const blockH = nameSize * 0.72 + (nameLines.length - 1) * titleStep + 46 + 44 + bottomH;
  const blockTop = 410 + Math.max(0, (302 - blockH) / 2);
  const titleTop = Math.round(blockTop + nameSize * 0.72);
  const titleBottom = titleTop + (nameLines.length - 1) * titleStep;
  const titleSvg = nameLines
    .map((l, i) => `<text x="300" y="${titleTop + i * titleStep}" text-anchor="middle" font-family="'Segoe UI',Inter,Arial,sans-serif" font-size="${nameSize}" font-weight="700" letter-spacing="-0.5" fill="#111827">${esc(l)}</text>`)
    .join("\n  ");
  const editionY = titleBottom + 46;
  const editionSvg = `<text x="300" y="${editionY}" text-anchor="middle" font-family="'Segoe UI',Inter,Arial,sans-serif" font-size="30" font-weight="400" letter-spacing="0.5" fill="${accent2}">${esc(variant || edition)}</text>`;
  const bottomTop = editionY + 44;

  // Bottom block: Office → app-icon row; others → component ticks, left-aligned
  // as a list but centred as a block under the title.
  let bottomSvg = "";
  if (isOffice) {
    bottomSvg = `<g transform="translate(300,${bottomTop + 31}) scale(1.5)">
      ${appIcon(-114, "#2B579A", "W")}${appIcon(-76, "#077568", "P")}${appIcon(-38, "#217346", "X")}${appIcon(0, "#7719AA", "N")}${appIcon(38, "#0F6CBD", "O")}${appIcon(76, "#C43E1C", "P")}${appIcon(114, "#A4373A", "A")}
    </g>`;
  } else {
    // ~10.6px per character at 21px Segoe UI; 30px for the tick + gap.
    const listW = 30 + Math.max(...comps.map((c) => c.length)) * 10.6;
    const listX = Math.round(300 - listW / 2);
    bottomSvg = comps.map((c, i) => {
      const y = bottomTop + i * 34;
      return `<g transform="translate(${listX},${y})"><path d="M0 8 L6 14 L16 2" fill="none" stroke="${accent}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/><text x="30" y="16" font-family="'Segoe UI',Inter,Arial,sans-serif" font-size="21" font-weight="500" fill="#4b5563">${esc(c)}</text></g>`;
    }).join("\n  ");
  }

  const vb = boxOnly ? "18 12 564 780" : "0 0 600 800";
  const w = boxOnly ? 564 : 600;
  const h = boxOnly ? 780 : 800;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="${w}" height="${h}" role="img" aria-label="${esc(name)} — Official Keys Hub">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#eef1f5"/></linearGradient>
    <linearGradient id="cover" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="0.6" stop-color="#f6f7f9"/><stop offset="1" stop-color="#e9ecf0"/></linearGradient>
    <linearGradient id="edge" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${accent}"/><stop offset="1" stop-color="${accent2}"/></linearGradient>
    <linearGradient id="winGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0095f7"/><stop offset="1" stop-color="#0061bd"/></linearGradient>
    <linearGradient id="oPanel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f1872e"/><stop offset="1" stop-color="#e14a0f"/></linearGradient>
    <linearGradient id="oFold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#eb4d67"/><stop offset="0.55" stop-color="#d12f4f"/><stop offset="1" stop-color="#b51d41"/></linearGradient>
    <filter id="drop" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="12"/></filter>
    <filter id="foldShadow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="6"/></filter>
    <clipPath id="card"><rect x="40" y="30" width="520" height="720" rx="14"/></clipPath>
  </defs>

  ${boxOnly ? "" : `<rect width="600" height="800" fill="url(#bg)"/>`}
  <!-- Soft drop shadow under the cover -->
  <rect x="52" y="48" width="496" height="712" rx="14" fill="#0b1020" fill-opacity="0.22" filter="url(#drop)"/>

  <!-- Cover -->
  <rect x="40" y="30" width="520" height="720" rx="14" fill="url(#cover)"/>
  <g clip-path="url(#card)">
    <!-- Brand bars, top and bottom -->
    <rect x="40" y="30" width="520" height="24" fill="url(#edge)"/>
    <rect x="40" y="726" width="520" height="24" fill="url(#edge)"/>

    <!-- Brand badge: Microsoft logo on genuine MS products, vendor name otherwise -->
    ${meta.microsoft ? `<g transform="translate(84,84)">
      <rect x="0" y="0" width="20" height="20" fill="#F25022"/>
      <rect x="23" y="0" width="20" height="20" fill="#7FBA00"/>
      <rect x="0" y="23" width="20" height="20" fill="#00A4EF"/>
      <rect x="23" y="23" width="20" height="20" fill="#FFB900"/>
      <text x="58" y="35" font-family="'Segoe UI',Arial,sans-serif" font-size="38" font-weight="600" fill="#737373">Microsoft</text>
    </g>` : `<text x="84" y="120" font-family="'Segoe UI',Arial,sans-serif" font-size="38" font-weight="700" fill="${accent}">${esc(meta.brand)}</text>`}

    <!-- Product logo -->
    <g transform="translate(300,272) scale(${(logoScale * 1.25).toFixed(3)})">${logoSvg}</g>

    <!-- Name + edition -->
    ${titleSvg}
    ${editionSvg}

    <!-- Bottom block -->
    ${bottomSvg}
  </g>
  <rect x="40" y="30" width="520" height="720" rx="14" fill="none" stroke="#dfe3e8" stroke-width="1.5"/>
</svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
