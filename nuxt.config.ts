export default defineNuxtConfig({
  modules: ["@nuxt/content", "@nuxtjs/i18n", "@nuxt/image", "@nuxt/icon"],
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
    vueI18n: "./nuxt-i18n.ts",
  },

  icon: {
    customCollections: [
      {
        prefix: "custom",
        dir: "./app/assets/icons",
      },
    ],
    clientBundle: {
      scan: true,
      includeCustomCollections: true,
    },
    provider: "iconify",
  },

  devtools: { enabled: true },

  compatibilityDate: "2025-01-22",
});
