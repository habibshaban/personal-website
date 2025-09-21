import messages from "~/locales/messages";

export default defineI18nConfig(() => {
  return {
    legacy: false,
    locale: "en",
    messages,
  };
});
