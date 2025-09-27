export default defineAppConfig({
  profile: {
    name: "Habib Shaban",
    job: "Software Engineer",
    email: "contact@habibshaban.dev",
    avatar: "/images/avatar.png",
    location: "Helsinki, Finland",
    phone: "+358 44 952 9398",
    isAvailable: true,
    picture: "/images/me.jpeg",
  },
  socials: {
    github: "https://github.com/habibshaban",
    linkedin: "https://linkedin.com/in/habib-shaban",
  },
  seo: {
    title: "Habib Shaban - Software Engineer",
    description:
      "Welcome to my personal website! I'm Habib Shaban, a passionate Software Engineer based in Helsinki, Finland. Explore my projects, skills, and get in touch!",
    url: "https://habibshaban.dev",
    image: "https://habibshaban.dev/images/me.jpeg",
  },
  link: [
    { rel: "icon", href: "/favicon.ico" },
    { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
    { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
    { rel: "icon", type: "image/png", sizes: "192x192", href: "/android-chrome-192x192.png" },
    { rel: "icon", type: "image/png", sizes: "512x512", href: "/android-chrome-512x512.png" },
    { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
    { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#06B6D4" },
    { rel: "manifest", href: "/site.webmanifest" },
  ],
  seoMeta: {
    ogType: "website",
    twitterCard: "summary_large_image",
    ogLocale: "en_US",
  },
  public: {
    siteUrl: "https://habibshaban.dev",
  },
});
