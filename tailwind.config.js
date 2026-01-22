/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#ffd700",
          dark: "#b8860b",
        },
        black: "#0a0a0a",
        dark: {
          bg: "#111111",
          grey: "#1a1a1a",
          light: "#2a2a2a",
        },
        accent: "#00d4ff",
        white: "#ffffff",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
        accent: ["var(--font-macondo)", "cursive"],
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #ffd700, #b8860b)",
        "gradient-card": "linear-gradient(145deg, #1a1a1a, #2a2a2a)",
        "gradient-bg": "linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #1a1a1a 100%)",
      },
      boxShadow: {
        glow: "0 0 30px rgba(255, 215, 0, 0.4)",
        hover: "0 15px 50px rgba(255, 215, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
