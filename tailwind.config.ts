import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        danger: "#f31260",
      },
    },
    keyframes: {
      glow: {
        "0%, 100%": {
          boxShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
        },
        "50%": {
          boxShadow: "0 0 20px rgba(255, 255, 255, 0.8)",
        },
      },
    },
    animation: {
      glow: "glow 1s infinite",
    },
    variants: {
      extend: {
        animation: ["hover", "focus"],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
