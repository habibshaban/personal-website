export function useSeo() {
  const config = useRuntimeConfig();
  const route = useRoute();
  const { locale } = useI18n();
  const siteUrl = config.public.siteUrl?.replace(/\/$/, "") || "";

  const absoluteUrl = (path?: string) => {
    const p = path || route.fullPath;
    if (!p) return siteUrl;
    return p.startsWith("http") ? p : `${siteUrl}${p.startsWith("/") ? "" : "/"}${p}`;
  };

  const canonical = (path?: string) => absoluteUrl(path);

  const jsonLd = (data: Record<string, any>) => {
    useHead({
      script: [
        {
          type: "application/ld+json",
          // cast to any to satisfy types for script children
          innerHTML: JSON.stringify(data),
        } as any,
      ],
    });
  };

  const titleTemplate = (pageTitle?: string, siteName?: string) => {
    const s = siteName || "Habib Shaban";
    return pageTitle ? `${pageTitle} · ${s}` : s;
  };

  const withDefaults = (meta: Parameters<typeof useSeoMeta>[0]) =>
    ({
      ogType: "website",
      twitterCard: "summary_large_image",
      ogLocale: locale.value === "fi" ? "fi_FI" : "en_US",
      ...meta,
    } as any);

  return { absoluteUrl, canonical, jsonLd, titleTemplate, withDefaults, siteUrl };
}
