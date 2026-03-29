import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-geist-sans)", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#fff1f4",
          100: "#ffe0e7",
          200: "#ffc2cf",
          300: "#ff8fa3",
          400: "#f05476",
          500: "#ED2B57",
          600: "#c91f47",
          700: "#a61a3c",
          800: "#8b1533",
          900: "#73122b",
        },
        landing: {
          canvas: "#f6f5f2",
          sand: "#f0ebe3",
          sandDeep: "#e8e0d4",
          mist: "#f2f8f6",
          mistDeep: "#e6f2ee",
          night: "#0b1220",
        },
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(15, 23, 42, 0.08), 0 8px 32px -8px rgba(237, 43, 87, 0.08)",
        card: "0 2px 16px -2px rgba(15, 23, 42, 0.06), 0 0 0 1px rgba(237, 43, 87, 0.06)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
