// Maps a product name to a local, brand-styled product image (SVG in /public/products).
// Keeps imagery consistent, fast, and copyright-safe (no hotlinked box art).

export function getProductImage(name: string): string {
  const n = name.toLowerCase();

  // Security software (check brands before generic words)
  if (/kaspersky|norton|bitdefender|mcafee|eset|avast|avg|malwarebytes|antivirus|total security|total protection/.test(n)) {
    return "/products/security.svg";
  }
  // Microsoft 365 / Office 365 (cloud) — but not "Windows 365"
  if ((/office\s*365|microsoft\s*365/.test(n)) || (/\b365\b/.test(n) && !n.includes("windows"))) {
    return "/products/office365.svg";
  }
  if (n.includes("visual studio")) return "/products/visualstudio.svg";
  if (n.includes("sql")) return "/products/sql.svg";
  if (n.includes("visio")) return "/products/visio.svg";
  if (n.includes("project")) return "/products/project.svg";
  if (n.includes("server")) return "/products/server.svg";
  if (n.includes("office")) return "/products/office.svg";
  if (n.includes("windows")) return "/products/windows.svg";

  return "/products/windows.svg";
}
