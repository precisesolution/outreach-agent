import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0b0d10",
        panel: "#11151a",
        border: "#1f242b",
        muted: "#8a94a3",
        text: "#e6ebf2",
        accent: "#6366f1",
      },
    },
  },
  plugins: [],
};

export default config;
