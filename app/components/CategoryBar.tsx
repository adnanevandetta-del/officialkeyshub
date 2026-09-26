"use client";

import { useState } from "react";

// Same categories, order and solid colors as the tabs under the billboard,
// minus "All Products" — so the top nav and the product tabs read as one system.
interface Cat {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const categories: Cat[] = [
  { id: "bundles", name: "Bundles", icon: "fas fa-box-open", color: "#f59e0b" },
  { id: "windows", name: "Windows", icon: "fab fa-windows", color: "#0284c7" },
  { id: "office", name: "Office", icon: "fas fa-file-word", color: "#ea580c" },
  { id: "server", name: "Server", icon: "fas fa-server", color: "#475569" },
  { id: "visio", name: "Visio", icon: "fas fa-project-diagram", color: "#0d9488" },
  { id: "project", name: "Project", icon: "fas fa-tasks", color: "#4f46e5" },
  { id: "sql", name: "SQL Server", icon: "fas fa-database", color: "#1d4ed8" },
  { id: "visualstudio", name: "Visual Studio", icon: "fas fa-code", color: "#7c3aed" },
  { id: "antivirus", name: "Security", icon: "fas fa-shield-alt", color: "#dc2626" },
];

export default function CategoryBar() {
  const [active, setActive] = useState<string>("windows");

  const handleClick = (cat: Cat) => {
    setActive(cat.id);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("selectedCategory", cat.id);
      window.dispatchEvent(
        new CustomEvent("categoryChanged", { detail: { category: cat.id } })
      );
      setTimeout(() => {
        document
          .getElementById("products")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  return (
    <div className="hidden md:block sticky top-0 z-[100] bg-[#0a0e1a] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center gap-2 py-2.5 flex-wrap">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => handleClick(c)}
              style={{ ["--tab" as string]: c.color } as React.CSSProperties}
              className={`okh-cat whitespace-nowrap px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                active === c.id ? "okh-cat-active" : ""
              }`}
            >
              <i className={`${c.icon} mr-2`}></i>
              {c.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
