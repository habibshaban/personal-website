export const useHeroActions = () => {
  const router = useRouter();

  const navigateToContact = () => {
    router.push("/contact");
  };

  const openEmailClient = (email: string = "contact@habibshaban.dev") => {
    if (process.client) window.location.href = `mailto:${email}`;
  };

  const openSocialLink = (url: string) => {
    if (process.client) window.open(url, "_blank", "noopener,noreferrer");
  };

  return {
    navigateToContact,
    openEmailClient,
    openSocialLink,
  };
};
