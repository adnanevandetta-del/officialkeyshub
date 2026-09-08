import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4ade80",
        "primary-dark": "#22c55e",
        secondary: "#10b981",
        accent: "#4ade80",
        bg: "#000000",
        bg2: "#0a0a0a",
        bg3: "#111111",
        card: "#1a1a1a",
      },
    },
  },
  plugins: [],
} satisfies Config;
