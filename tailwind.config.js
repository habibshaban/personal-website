/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./app.vue",
    "./nuxt.config.ts",
  ],
  theme: {
    extend: {
      colors: {
        brandBackground: "#19191A",
        iconGray: "#4B4B4C",
        textGray: "#99A0A0",
        textPrimary: "#D8D8D8",
      },
    },
  },
  plugins: [],
};
