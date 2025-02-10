export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      devtoolsEnabled: "",
    },
  },

  modules: [
    "@nuxt/content",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@nuxt/image",
    "@nuxt/icon",
    "pinia-plugin-persistedstate/nuxt",
  ],
  css: ["@/assets/style/app.scss", "~/assets/style/tailwind.css"],

  components: [{ path: "./components", pathPrefix: false }],

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
    locales: [
      { code: "en", name: "English" },
      { code: "fi", name: "Suomi" },
    ],
    defaultLocale: "en",
    vueI18n: "./i18n.config.ts",
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

  devtools: { enabled: process.env.NUXT_PUBLIC_DEVTOOLS_ENABLED },

  compatibilityDate: "2025-01-22",
});
