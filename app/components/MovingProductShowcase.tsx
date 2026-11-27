import Link from "next/link";
import { getProductByName } from "../lib/blogAds";
import { getProductFaceImage } from "../lib/productImage";
import ProductBox3D from "./ProductBox3D";

// Homepage "whole range" section: real 3D product boxes on a slowly turning
// stage (one per product line), each linking to its product page. Pauses on
// hover; holds still for reduced-motion visitors.
const RANGE: { name: string; short: string; accent: string; dark: string }[] = [
  { name: "Windows 11 Pro", short: "Windows 11 Pro", accent: "#0a63c9", dark: "#0b3f86" },
  { name: "Office 2024 Professional Plus", short: "Office 2024", accent: "#e3611f", dark: "#a8300e" },
  { name: "Windows Server 2025 Standard", short: "Server 2025", accent: "#2f6fb0", dark: "#1f4a75" },
  { name: "Visio Professional 2024", short: "Visio 2024", accent: "#0f9488", dark: "#0b5c54" },
  { name: "Project Professional 2024", short: "Project 2024", accent: "#16a34a", dark: "#0f6a32" },
  { name: "SQL Server 2022 Standard", short: "SQL Server 2022", accent: "#c0392b", dark: "#8f261c" },
  { name: "Visual Studio 2022 Professional", short: "Visual Studio 2022", accent: "#7c3aed", dark: "#5b21b6" },
  { name: "Windows 11 Home", short: "Windows 11 Home", accent: "#0a63c9", dark: "#0b3f86" },
];

const money = (p: string) => {
  const n = parseFloat(p.replace(/[^0-9.]/g, ""));
  return isFinite(n) ? "$" + n.toFixed(2) : p;
};

export default function MovingProductShowcase() {
  const items = RANGE.flatMap((r) => {
    const p = getProductByName(r.name);
    return p ? [{ ...r, slug: p.slug, price: money(p.price), image: getProductFaceImage(p.name) }] : [];
  });
  const step = 360 / items.length;
  const win = items[0];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f3f8ff] to-white border-y border-sky-100">
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16 grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[1fr_1.15fr] gap-4 lg:gap-8 items-center">
        <div className="order-2 lg:order-1 text-center lg:text-left">
          <p className="text-[#0067b8] text-xs font-bold uppercase tracking-[0.18em]">The whole range</p>
          <h2 className="okh-wordmark mt-3 text-4xl md:text-5xl font-extrabold tracking-[-0.035em] text-[#0b1736] leading-[1.04]">
            Every key you need,<span className="block text-[#0067b8]">one store.</span>
          </h2>
          <p className="mt-4 text-slate-600 text-lg max-w-lg mx-auto lg:mx-0">
            Windows, Office, Server, Visio, Project, SQL Server and Visual Studio. Pay once, activate on Microsoft&apos;s servers.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 justify-center lg:justify-start">
            {win && (
              <Link
                href={`/products/${win.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-extrabold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-[0_12px_26px_-12px_rgba(5,150,105,0.7)]"
              >
                Windows 11 Pro {win.price}
              </Link>
            )}
            <Link href="/products" className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl font-bold text-[#0067b8] hover:bg-sky-50">
              Browse all keys <i className="fas fa-arrow-right text-sm" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="okh-carousel order-1 lg:order-2">
          <div className="okh-carousel-ring">
            {items.map((it, i) => (
              <Link
                key={it.slug}
                href={`/products/${it.slug}`}
                aria-label={`${it.name}, ${it.price}`}
                className="okh-carousel-slot"
                style={{ transform: `rotateY(${i * step}deg) translateZ(var(--rad))` }}
              >
                <ProductBox3D image={it.image} short={it.short} accent={it.accent} dark={it.dark} w={128} />
              </Link>
            ))}
          </div>
          <div className="okh-carousel-floor" />
        </div>
      </div>

      <style>{`
        .okh-carousel * { max-width: none; }
        .okh-carousel { position: relative; height: 380px; perspective: 1100px; --rad: 250px; }
        .okh-carousel-ring { position: absolute; left: 50%; top: 44%; transform-style: preserve-3d; animation: okh-carousel 30s linear infinite; }
        .okh-carousel:hover .okh-carousel-ring { animation-play-state: paused; }
        .okh-carousel-slot { position: absolute; left: -64px; top: -88px; transform-style: preserve-3d; display: block; }
        .okh-carousel-floor { position: absolute; left: 8%; right: 8%; bottom: 26px; height: 70px; border-radius: 50%; background: radial-gradient(closest-side, rgba(10,99,201,.22), transparent); filter: blur(6px); }
        @keyframes okh-carousel { from { transform: rotateX(-8deg) rotateY(0); } to { transform: rotateX(-8deg) rotateY(-360deg); } }
        @media (max-width: 640px) {
          .okh-carousel { height: 290px; --rad: 175px; }
          .okh-carousel-ring { top: 42%; scale: .78; }
        }
        @media (prefers-reduced-motion: reduce) {
          .okh-carousel-ring { animation: none; transform: rotateX(-8deg) rotateY(-12deg); }
        }
      `}</style>
    </section>
  );
}
