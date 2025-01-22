export default defineNuxtConfig({
  modules: ["@nuxt/content", "@nuxtjs/i18n"],
  css: ["~/assets/style/tailwind.css"],

  content: {
    build: {
      markdown: {
        highlight: {
          theme: "github-dark",
        },
      },
    },
  },
  postcss: {
    plugins: {
      "postcss-import": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  i18n: {
    // langDir: resolve("locales"),
    // strategy: "prefix_except_default",
    // lazy: true,
    vueI18n: "./nuxt-i18n.ts",
  },

  devtools: { enabled: true },
  compatibilityDate: "2025-01-22",
});
