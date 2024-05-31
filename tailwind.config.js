/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          light: "hsl(var(--primary-light))",
          dark: "hsl(var(--primary-dark))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          light: "hsl(var(--secondary-light))",
          dark: "hsl(var(--secondary-dark))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        white: "#F3F4F6",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      typography: (theme) => ({
        sm: {
          css: {
            fontSize: theme("fontSize.sm"),
            h1: {
              fontSize: theme("fontSize.lg"),
            },
            h2: {
              fontSize: theme("fontSize.md"),
            },
            h3: {
              fontSize: theme("fontSize.base"),
            },
            p: {
              fontSize: theme("fontSize.sm"),
            },
          },
        },
        DEFAULT: {
          css: {
            color: theme("colors.foreground"),
            a: {
              color: theme("colors.primary"),
              "&:hover": {
                color: theme("colors.primary-dark"),
              },
            },
            h1: {
              fontSize: theme("fontSize.3xl"),
              "@screen sm": {
                fontSize: theme("fontSize.4xl"),
              },
              "@screen md": {
                fontSize: theme("fontSize.5xl"),
              },
              "@screen lg": {
                fontSize: theme("fontSize.6xl"),
              },
            },
            h2: {
              fontSize: theme("fontSize.2xl"),
              "@screen sm": {
                fontSize: theme("fontSize.3xl"),
              },
              "@screen md": {
                fontSize: theme("fontSize.4xl"),
              },
              "@screen lg": {
                fontSize: theme("fontSize.5xl"),
              },
            },
            h3: {
              fontSize: theme("fontSize.xl"),
              "@screen sm": {
                fontSize: theme("fontSize.2xl"),
              },
              "@screen md": {
                fontSize: theme("fontSize.3xl"),
              },
              "@screen lg": {
                fontSize: theme("fontSize.4xl"),
              },
            },
            p: {
              fontSize: theme("fontSize.base"),
              "@screen sm": {
                fontSize: theme("fontSize.lg"),
              },
              "@screen md": {
                fontSize: theme("fontSize.xl"),
              },
              "@screen lg": {
                fontSize: theme("fontSize.2xl"),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
