/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#003D9B",
        "primary-container": "#0052CC",
        "surface-highest": "#D7E2FF",
        "surface-low": "#F1F3FF",
        background: "#F9F9FF",
        formBg: "#FFFFFF",
        "custom-gray": "#737685",
        slate: {
          dark: "#041B3C",
          medium: "#4F5F7B",
          light: "#C3C6D6",
        },
        success: "#82F9BE",
        error: "#BA1A1A",
        warning: "#FFB300",
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },

      fontSize: {
        "display-lg": ["56px", { lineHeight: "56px", fontWeight: "700" }],
        "headline-lg": ["32px", { lineHeight: "40px", fontWeight: "600" }],
        "title-md": ["27px", { lineHeight: "27px", fontWeight: "500" }],
        "body-md": ["14px", { lineHeight: "22.75px", fontWeight: "400" }],
        "label-sm": ["11px", { lineHeight: "16.5px", fontWeight: "400" }],
      },
    },
  },
  plugins: [],
};
