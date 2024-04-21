/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          DEFAULT: "#234f1e",
          light: "#4a7d39",
          dark: "#002a00",
        },
        secondary: {
          DEFAULT: "#eda80e",
          light: "#ffdb4b",
          dark: "#b57800",
        },
        background: {
          DEFAULT: "#f4f4f3",
        },
        text: {
          primary: "#000000",
          secondary: "#a5a6a6",
        },
        customColor1: {
          DEFAULT: "#392F5A",
          light: "#67507d",
          dark: "#1e1a38",
        },
        customColor2: {
          DEFAULT: "#69A2B0",
          light: "#9cc6cf",
          dark: "#3f7583",
        },
        error: {
          DEFAULT: "#E53935",
        },
        warning: {
          DEFAULT: "#FFA726",
        },
        success: {
          DEFAULT: "#66BB6A",
        },
      },
    },
  },
  plugins: [],
};
