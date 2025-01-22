import en from "./locales/en.json";
import fi from "./locales/fi.json";

export default defineI18nConfig(() => {
  return {
    locales: [
      { code: "en", name: "English", file: "en.json" },
      { code: "fi", name: "Suomi", file: "fi.json" },
    ],
    defaultLocale: "en",
    strategy: "no_prefix",
    baseUrl: "/",
    langDir: "locales",
    legacy: false,
    locale: "en",
    messages: {
      en,
      fi,
    },
  };
});
