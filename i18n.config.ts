import en from "./locales/en.json";
import fi from "./locales/fi.json";

export default defineI18nConfig(() => {
  return {
    strategy: "no_prefix",
    legacy: false,
    locale: "en",
    messages: {
      en,
      fi,
    },
  };
});
