/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        surface: "#F7F7F5",
        "surface-raised": "#FFFFFF",
        border: {
          DEFAULT: "#E4E4E1",
          strong: "#C9C9C5",
        },
        text: {
          primary: "#1E1E1C",
          secondary: "#5B5B57",
          muted: "#8A8A85",
        },
        accent: {
          DEFAULT: "#2F5D50",
          hover: "#254A40",
          subtle: "#E8EFEC",
        },
        error: {
          DEFAULT: "#B3261E",
          subtle: "#FBEAE9",
        },
        success: {
          DEFAULT: "#2F6B4F",
          subtle: "#EAF3EE",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "Segoe UI", "sans-serif"],
      },
      fontSize: {
        h1: ["2.75rem", { lineHeight: "1.15", fontWeight: "700" }],
        h2: ["2rem", { lineHeight: "1.2", fontWeight: "700" }],
        h3: ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }],
        h4: ["1.125rem", { lineHeight: "1.4", fontWeight: "600" }],
        body: ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
        small: ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
        caption: ["0.75rem", { lineHeight: "1.4", fontWeight: "500" }],
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
      },
      boxShadow: {
        xs: "0 1px 2px rgba(20,20,18,0.04)",
        sm: "0 2px 6px rgba(20,20,18,0.06)",
        md: "0 8px 20px rgba(20,20,18,0.08)",
      },
      ringColor: {
        accent: "#2F5D50",
      },
    },
  },
  plugins: [],
};
