import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-crumbl-sans)"],
      },
      colors: {
        primary: {
          DEFAULT: "#FFB9CD", // Pink
          wcag: "#F79DB7", // Pink, but WCAG compliant for pink-on-white usage
          light: "#FFE6E5", // Pink Sugar
        },
        secondary: {
          DEFAULT: "#FCEBD9", // Butterscotch Cream
          light: "#FEF9F3", // Nilla Bean
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
