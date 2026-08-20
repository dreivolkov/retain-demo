import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paddle: {
          yellow: "#FFD400",
          warm50: "#FBF9F5",
          warm200: "#D6CBB6",
          warm600: "#1C1A15",
        },
      },
      fontFamily: {
        lausanne: ["TWKLausanne", "sans-serif"],
        serrif: ["SerrifCondensed", "serif"],
        mono: ["SpaceMono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
