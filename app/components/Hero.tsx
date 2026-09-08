"use client";

import Logo from "./Logo";

export default function Hero() {
  return (
    <section className="relative min-h-[10vh] flex items-center justify-center bg-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
    </section>
  );
}
