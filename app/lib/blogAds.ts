import { allProducts, type FlatProduct } from "./catalog";

// Picks catalog products to advertise on a blog article, based on the
// article's topic (title, slug, keywords). Products come straight from the
// catalog, so prices in blog ads are always current.

const RULES: [RegExp, string[]][] = [
  [/server|\bcal\b|rds/, ["Windows Server 2025 Standard", "Windows Server 2022 Standard", "Windows Server CAL 2022 (5 Device)"]],
  [/sql/, ["SQL Server 2022 Standard", "SQL Server 2019 Standard", "SQL Server 2022 Enterprise"]],
  [/visio|project/, ["Visio Professional 2024", "Project Professional 2024", "Visio Professional 2021"]],
  [/visual studio/, ["Visual Studio 2022 Professional", "Visual Studio 2022 Enterprise"]],
  [/office|365|word|excel|outlook/, ["Office 2024 Professional Plus", "Office Home & Business 2024", "Windows 11 Pro + Office 2024 Pro Plus Bundle"]],
  [/windows|activat|esu|oem|retail|digital license/, ["Windows 11 Pro", "Windows 11 Home", "Windows 11 Pro + Office 2024 Pro Plus Bundle"]],
];

const FALLBACK = ["Windows 11 Pro", "Office 2024 Professional Plus", "Windows 11 Pro + Office 2024 Pro Plus Bundle"];

const byName = (name: string) => allProducts.find((p) => p.name === name && !p.outOfStock);

export function getProductByName(name: string): FlatProduct | undefined {
  return byName(name);
}

export function pickAdProducts(topic: string, count = 3): FlatProduct[] {
  const t = topic.toLowerCase().replace(/-/g, " ");
  const names: string[] = [];
  // Round-robin across matching rules so a "Windows + Office" article gets
  // the top product of each before the runners-up.
  const matched = RULES.filter(([re]) => re.test(t)).map(([, list]) => list);
  for (let i = 0; i < 3; i++) for (const list of matched) if (list[i]) names.push(list[i]);
  names.push(...FALLBACK);
  const out: FlatProduct[] = [];
  for (const n of names) {
    const p = byName(n);
    if (p && !out.includes(p)) out.push(p);
    if (out.length === count) break;
  }
  return out;
}

const num = (s: string) => parseFloat(s.replace(/[^0-9.]/g, ""));

export function savingsPercent(p: { price: string; originalPrice: string }): number {
  const price = num(p.price);
  const orig = num(p.originalPrice);
  if (!price || !orig || orig <= price) return 0;
  return Math.round((1 - price / orig) * 100);
}
