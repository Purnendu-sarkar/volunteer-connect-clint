/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF5733", 
        secondary: "#C70039", 
        accent: "#900C3F", 
      },
    },
  },
  darkMode: "selector",
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark"],
  },
};
