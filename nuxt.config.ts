// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/content",
    [
      "@nuxtjs/i18n",
      {
        locales: [
          { code: "en", name: "English", file: "en.json" },
          { code: "fi", name: "Suomi", file: "fi.json" },
        ],
        defaultLocale: "en",
        langDir: "locales/",
        strategy: "prefix_except_default",
      },
    ],
  ],
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
});
