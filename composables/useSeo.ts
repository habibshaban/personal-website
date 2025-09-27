export function useSeo() {
  const runtime = useRuntimeConfig();
  const { seo, link } = useAppConfig();
  const route = useRoute();
  const { locale } = useI18n();

  const baseUrl = (runtime.public?.siteUrl || (seo as any)?.url || "").replace(/\/$/, "");
  const siteName = ((seo as any)?.title as string) || "Habib Shaban";
  const defaultDescription = ((seo as any)?.description as string) || "";
  const defaultOgImage = "/og.png";

  const absoluteUrl = (path?: string) => {
    const p = path ?? route.fullPath;
    if (!baseUrl) return p || "";
    if (!p) return baseUrl;
    return p.startsWith("http") ? p : `${baseUrl}${p.startsWith("/") ? "" : "/"}${p}`;
  };

  const canonical = (path?: string) => absoluteUrl(path);

  const jsonLd = (data: Record<string, any>) => {
    useHead({
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify(data),
        } as any,
      ],
    });
  };

  const titleTemplate = (title?: string, isWriting?: boolean) => {
    if (route.path === "/") return title || siteName;
    if (isWriting) return title ?? null;
    return title ? `${title} | ${siteName}` : siteName;
  };

  const withDefaults = (meta: Parameters<typeof useSeoMeta>[0]) => {
    const merged: any = {
      ogType: "website",
      twitterCard: "summary_large_image",
      ogLocale: locale.value === "fi" ? "fi_FI" : "en_US",
      ogSiteName: siteName,
      ogUrl: canonical(),
      ...meta,
    };
    if (!("title" in merged) || !merged.title) merged.title = siteName;
    if (!("description" in merged) || !merged.description) merged.description = defaultDescription;
    if (!("ogImage" in merged) || !merged.ogImage) merged.ogImage = defaultOgImage;
    return merged as any;
  };

  const applySeo = (opts?: {
    title?: string | (() => string | undefined);
    description?: string | (() => string | undefined);
    image?: string | (() => string | undefined);
    type?: "website" | "article";
    isWriting?: boolean;
    canonicalPath?: string;
    useLinksFromConfig?: boolean;
  }) => {
    const isWriting = !!opts?.isWriting;
    const get = <T>(v: T | (() => T)) => (typeof v === "function" ? (v as any)() : v);
    const image = get(opts?.image ?? defaultOgImage);
    const title = get(opts?.title);
    const description = get(opts?.description);

    const metaInput: any = withDefaults({
      title,
      description,
      ogTitle: title,
      ogDescription: description,
      ogImage: image,
      ogType: opts?.type || (isWriting ? "article" : "website"),
      twitterTitle: title,
      twitterDescription: description,
    });

    useSeoMeta(metaInput);

    useHead({
      title: metaInput.title,
      titleTemplate: (t?: string) => titleTemplate(t, isWriting),
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
        { name: "charset", content: "utf-8" },
        { name: "robots", content: "index, follow" },
        { name: "color-scheme", content: "light dark" },
      ],
      link: [
        ...(opts?.useLinksFromConfig ? (link as any) || [] : []),
        { rel: "canonical", href: canonical(opts?.canonicalPath) },
      ],
    });

    try {
      // @ts-ignore - defineOgImage is injected by @nuxtjs/seo/og-image modules
      if (typeof defineOgImage === "function") {
        // @ts-ignore
        defineOgImage({ url: absoluteUrl(image) });
      }
    } catch {
      // no-op
    }
  };

  return {
    absoluteUrl,
    canonical,
    jsonLd,
    titleTemplate,
    withDefaults,
    applySeo,
    siteUrl: baseUrl,
    siteName,
    defaultImage: defaultOgImage,
  };
}
