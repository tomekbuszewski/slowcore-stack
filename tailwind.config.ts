import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {},
  plugins: [
    require("tailwindcss-view-transitions"),
    require("tailwindcss-animate"),
    require("@tailwindcss/forms"),
  ],
} satisfies Config;
