import type { Config } from "tailwindcss";
import headlessuiPlugin from "@headlessui/tailwindcss";

const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
  darkMode: "class", // Add this line
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      poppins: ["var(--font-poppins)", "sans-serif"],
      cabin: ["var(--font-cabin)", "sans-serif"],
      barlow: ["var(--font-barlow)", "sans-serif"],
      inter: ["var(--font-inter)", "sans-serif"],
      varelaRound: ["var(--font-varelaRound)", "sans-serif"],
      abril: ["var(--font-abrilFatface)", "sans-serif"],
      "FranklinGothic-Regular": "FranklinGothic-Regular",
      "FranklinGothic-Medium": "FranklinGothic-Medium",
      "FranklinGothic-Bold": "FranklinGothic-Bold",
      "RohnRounded-Regular": "RohnRounded-Regular",
      "RohnRounded-Medium": "RohnRounded-Medium",
      "RohnRounded-Heavy": "RohnRounded-Heavy",
      "RohnRounded-Bold": "RohnRounded-Bold",
      "RohnRounded-Black": "RohnRounded-Black",
    },
    extend: {
      colors: {
        primary: {
          100: "#AA90CB",
          200: "#BB86FC",
          500: "#9B50F8",
          700: "#6C3ADB",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "landing-page": "url('/images/concert-1.jpg')",
        "artists-page": "url('/images/artist.jpg')",
      },
      transitionTimingFunction: {
        circ: "cubic-bezier(0,.55,.45,1)",
      },
      screens: {
        xs: "540px",
        "+md": "980px",
        "+xl": "1360px",
      },
    },
  },
  plugins: [headlessuiPlugin],
};
export default config;
