/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-container": "var(--color-primary-container)",
        "surface-highest": "var(--color-surface-highest)",
        "surface-low": "var(--color-surface-low)",
        background: "var(--color-background)",
        surface: "var(--color-suface)",
        "custom-gray": "var(--color-custom-gray)",
        slate: {
          dark: "#var(--color-slate-dark)",
          medium: "#var(--color-slate-mid)",
          light: "#var(--color-slate-light)",
        },
        success: "var(--color-success)",
        error: "#var(--color-error)",
        warning: "var(--color-warning)",
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },

      fontSize: {
        "display-lg": ["3.5rem", { lineHeight: "3.5rem" , fontWeight: "700" }],
        "headline-lg": ["2rem", { lineHeight: "2.5rem" , fontWeight: "700" }],
        "title-md": ["1.687rem", { lineHeight: "1.6875rem" , fontWeight: "600" }],
        "body-md": ["0.875rem", { lineHeight: "1.421875rem" , fontWeight: "400" }],
        "label-sm": ["0.6875rem", { lineHeight: "1.03125rem" , fontWeight: "700", letterSpacing: "0.05em" } ],
      },
    },
  },
  plugins: [],
};
