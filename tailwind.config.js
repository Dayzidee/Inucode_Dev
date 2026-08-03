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
        surface: {
          DEFAULT: "var(--surface)",
          lowest: "var(--surface-container-lowest)",
          low: "var(--surface-container-low)",
          mid: "var(--surface-container)",
          high: "var(--surface-container-high)",
          highest: "var(--surface-container-highest)",
        },
        "on-surface": {
          DEFAULT: "var(--on-surface)",
          variant: "var(--on-surface-variant)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          container: "var(--primary-container)",
        },
        "on-primary": "var(--on-primary)",
        secondary: "var(--secondary)",
        outline: {
          DEFAULT: "var(--outline)",
          variant: "var(--outline-variant)",
        },
        accent: {
          success: "var(--accent-success)",
          warning: "var(--accent-warning)",
          error: "var(--accent-error)",
          info: "var(--accent-info)",
          purple: "var(--accent-purple)",
        },
        neutral: {
          500: "var(--neutral-500)",
        },
      },
      fontSize: {
        xs: "var(--text-xs)",
        sm: "var(--text-sm)",
        base: "var(--text-base)",
        lg: "var(--text-lg)",
        xl: "var(--text-xl)",
        "2xl": "var(--text-2xl)",
        "3xl": "var(--text-3xl)",
        "4xl": "var(--text-4xl)",
        "5xl": "var(--text-5xl)",
        "6xl": "var(--text-6xl)",
      },
      spacing: {
        1: "var(--space-1)",
        2: "var(--space-2)",
        3: "var(--space-3)",
        4: "var(--space-4)",
        5: "var(--space-5)",
        6: "var(--space-6)",
        7: "var(--space-7)",
        8: "var(--space-8)",
        9: "var(--space-9)",
        10: "var(--space-10)",
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.02em",
        tight: "-0.01em",
        normal: "0",
        wide: "0.02em",
        wider: "0.05em",
        widest: "0.1em",
        superwide: "0.2em",
        megawide: "0.4em",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        slab: "var(--radius-slab)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-subtle": "linear-gradient(180deg, var(--surface-container-high) 0%, var(--surface) 100%)",
        "gradient-glass": "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        "2xl": "var(--shadow-2xl)",
        glow: "0 0 20px rgba(255, 255, 255, 0.1)",
      },
    },
  },
  plugins: [],
};
