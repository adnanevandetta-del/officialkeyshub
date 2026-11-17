"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { trackEvent } from "../lib/analytics";

export interface FinderProduct {
  name: string;
  slug: string;
  price: string;
  originalPrice: string;
  description: string;
  image: string;
}

type Option = { label: string; hint: string; icon: string; next?: string; result?: string; why?: string };
type Question = { title: string; options: Option[] };

// Decision tree. `result` is a product name from the catalog; `why` is the
// one-line reason shown with the recommendation.
const TREE: Record<string, Question> = {
  start: {
    title: "What do you need a key for?",
    options: [
      { label: "Windows", hint: "Activate or upgrade my PC", icon: "fab fa-windows", next: "windows" },
      { label: "Office", hint: "Word, Excel, PowerPoint…", icon: "fas fa-file-word", next: "office" },
      { label: "Both", hint: "Setting up a new PC", icon: "fas fa-layer-group", result: "Windows 11 Pro + Office 2024 Pro Plus Bundle", why: "One order covers the whole PC: Windows 11 Pro plus the newest pay-once Office (supported until October 2029). It costs less than buying both separately." },
      { label: "Work tools", hint: "Visio, Project, Server, SQL, coding", icon: "fas fa-briefcase", next: "tools" },
    ],
  },
  windows: {
    title: "How will you use the PC?",
    options: [
      { label: "Everyday use", hint: "Browsing, school, streaming, gaming", icon: "fas fa-gamepad", result: "Windows 11 Home", why: "Home has everything for personal use and gaming. You only pay for Pro if you need its business features." },
      { label: "Work or study tools", hint: "Remote Desktop, BitLocker, Hyper-V", icon: "fas fa-laptop-code", result: "Windows 11 Pro", why: "Pro adds Remote Desktop, BitLocker encryption, Hyper-V and Group Policy, the features people hit a wall without on Home." },
      { label: "Not sure", hint: "Pick the safe choice", icon: "fas fa-circle-question", result: "Windows 11 Pro", why: "Pro does everything Home does plus the business features, and costs only a few dollars more here, so you never need to upgrade later." },
    ],
  },
  office: {
    title: "Which Office apps do you need?",
    options: [
      { label: "Just the basics", hint: "Word, Excel, PowerPoint, OneNote", icon: "fas fa-file-lines", result: "Office Home 2024", why: "The core apps for school and home, paid once, with no subscription." },
      { label: "Basics + Outlook", hint: "For email and small-business use", icon: "fas fa-envelope", result: "Office Home & Business 2024", why: "Adds Outlook and is licensed for business use, which suits freelancers and small businesses." },
      { label: "The full suite", hint: "Everything, including Access", icon: "fas fa-star", result: "Office 2024 Professional Plus", why: "The most complete pay-once Office: Word, Excel, PowerPoint, Outlook, Access and OneNote, with updates until October 2029." },
      { label: "Cloud subscription", hint: "Always-latest apps + OneDrive", icon: "fas fa-cloud", result: "Microsoft 365 Business Standard (1 Year)", why: "Choose this if you want the apps to keep updating and you use cloud storage and Teams." },
    ],
  },
  tools: {
    title: "What are you working on?",
    options: [
      { label: "Diagrams & flowcharts", hint: "Visio", icon: "fas fa-diagram-project", result: "Visio Professional 2024", why: "The newest Visio for flowcharts, network diagrams and floor plans, paid once." },
      { label: "Project planning", hint: "Project", icon: "fas fa-chart-gantt", result: "Project Professional 2024", why: "Gantt charts, resources and schedules in the newest pay-once Project." },
      { label: "Running a server", hint: "Windows Server", icon: "fas fa-server", result: "Windows Server 2025 Standard", why: "The newest Windows Server for a physical server or up to two virtual machines." },
      { label: "Databases", hint: "SQL Server", icon: "fas fa-database", result: "SQL Server 2022 Standard", why: "Production-ready SQL Server for small and mid-size workloads." },
      { label: "Writing code", hint: "Visual Studio", icon: "fas fa-code", result: "Visual Studio 2022 Professional", why: "The full Visual Studio IDE for professional .NET and C++ work." },
    ],
  },
};

export default function KeyFinder({ products }: { products: Record<string, FinderProduct> }) {
  const [path, setPath] = useState<string[]>(["start"]);
  const [result, setResult] = useState<{ name: string; why: string } | null>(null);

  const q = TREE[path[path.length - 1]];
  const step = path.length;

  function choose(o: Option) {
    if (o.result) {
      setResult({ name: o.result, why: o.why ?? "" });
      trackEvent("key_finder_result", { item_name: o.result });
    } else if (o.next) {
      setPath([...path, o.next]);
    }
  }

  function restart() {
    setPath(["start"]);
    setResult(null);
  }

  const p = result ? products[result.name] : undefined;

  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#071836] via-[#0b2a52] to-[#0369a1] text-white shadow-xl ring-1 ring-white/10 p-6 sm:p-8">
      {!result && q && (
        <>
          <div className="flex items-center justify-between mb-5">
            <span className="px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-200 text-xs font-bold uppercase tracking-wider">
              Step {step} of 2
            </span>
            {step > 1 && (
              <button
                type="button"
                onClick={() => setPath(path.slice(0, -1))}
                className="text-sm text-slate-300 hover:text-white"
              >
                <i className="fas fa-arrow-left mr-1" /> Back
              </button>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-6">{q.title}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {q.options.map((o) => (
              <button
                key={o.label}
                type="button"
                onClick={() => choose(o)}
                className="text-left flex items-start gap-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-sky-400/60 p-4 transition-all"
              >
                <i className={`${o.icon} text-2xl text-sky-300 mt-0.5 w-7 text-center`} />
                <span>
                  <span className="block font-bold text-lg">{o.label}</span>
                  <span className="block text-sm text-slate-300">{o.hint}</span>
                </span>
              </button>
            ))}
          </div>
        </>
      )}

      {result && !p && (
        <div className="text-center">
          <h2 className="text-2xl font-extrabold mb-3">{result.name}</h2>
          <p className="text-slate-200 mb-5">{result.why}</p>
          <Link href="/products" className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-black">
            See all products <i className="fas fa-arrow-right" />
          </Link>
        </div>
      )}

      {result && p && (
        <div className="text-center sm:text-left">
          <span className="inline-block mb-4 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-200 text-xs font-bold uppercase tracking-wider">
            <i className="fas fa-wand-magic-sparkles mr-1" /> Your match
          </span>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Image src={p.image} alt={`${p.name} product box`} width={564} height={780} unoptimized className="w-32 h-auto drop-shadow-2xl" />
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">{p.name}</h2>
              <p className="text-slate-200 mb-4">{result.why}</p>
              <div className="flex items-baseline justify-center sm:justify-start gap-2 mb-4">
                <span className="text-4xl font-black text-white">{p.price}</span>
                <span className="text-white/40 line-through">{p.originalPrice}</span>
              </div>
              <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                <Link
                  href={`/products/${p.slug}`}
                  onClick={() => trackEvent("key_finder_click", { item_name: p.name })}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black shadow-lg transition-all"
                >
                  Get this key <i className="fas fa-arrow-right" />
                </Link>
                <button
                  type="button"
                  onClick={restart}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/30 hover:bg-white/10 font-bold"
                >
                  <i className="fas fa-rotate-left" /> Start over
                </button>
              </div>
              <p className="text-xs text-slate-300 mt-4 mb-0">
                <i className="fas fa-envelope mr-1" /> Emailed after payment · <i className="fas fa-rotate-left mx-1" /> 30-day money-back guarantee
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
