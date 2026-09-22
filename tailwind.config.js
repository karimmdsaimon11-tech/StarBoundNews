/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        newspaper: {
          navy: "#0B192C",
          blue: "#1E3E62",
          accent: "#DC2626", // Breaking red
          crimson: "#991B1B",
          gold: "#D97706",
          dark: "#0F172A",
          muted: "#64748B",
          border: "#E2E8F0",
          light: "#F8FAFC",
        },
        darkbg: {
          DEFAULT: "#0B0F19",
          card: "#111827",
          border: "#1F2937",
          hover: "#1E293B",
          muted: "#94A3B8",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Hind Siliguri", "system-ui", "-apple-system", "sans-serif"],
        bangla: ["Hind Siliguri", "SolaimanLipi", "Kalpurush", "sans-serif"],
        serif: ["Merriweather", "Georgia", "Noto Serif Bengali", "serif"],
        display: ["Cinzel", "Playfair Display", "serif"],
      },
      maxWidth: {
        article: "820px",
      },
      animation: {
        "ticker-slide": "ticker 25s linear infinite",
        "pulse-subtle": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
};
