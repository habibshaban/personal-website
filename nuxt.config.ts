export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://habibshaban.dev",
      meetingLink: process.env.NUXT_PUBLIC_MEETING_LINK || "https://cal.com/habibshaban",
    },
  },

  devServer: {
    port: 3005,
  },

  modules: [
    "@nuxt/content",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@nuxt/image",
    "@nuxt/icon",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "shadcn-nuxt",
  ],

  imports: {
    presets: [
      {
        from: "vue-sonner",
        imports: ["toast"],
      },
    ],
  },

  app: {
    head: {
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Geist:wght@100;200;300;400;500;600;700;800;900&family=Geist+Mono:wght@100;200;300;400;500;600;700;800;900&display=swap",
        },
      ],
    },
  },

  piniaPluginPersistedstate: {
    cookieOptions: {
      maxAge: 3600 * 24 * 8,
    },
  },
  css: ["@/assets/style/app.scss", "~/assets/style/tailwind.css", "vue-sonner/style.css"],

  shadcn: {
    prefix: "S",
    componentDir: "./components/ui",
  },

  components: [{ path: "./components", pathPrefix: false }],
  content: {
    build: {
      markdown: {
        highlight: {
          theme: "github-dark",
          langs: [
            "js",
            "ts",
            "vue",
            "json",
            "yaml",
            "go",
            "bash",
            "css",
            "scss",
            "html",
            "graphql",
            "dockerfile",
            "sql",
            "powershell",
            "python",
          ],
        },
      },
    },
    locales: ["en", "fi"],
    defaultLocale: "en",
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
      { code: "en", name: "English", language: "en-US" },
      { code: "fi", name: "Suomi", language: "fi-FI" },
    ],
    strategy: "prefix",
    detectBrowserLanguage: {
      useCookie: true,
      alwaysRedirect: true,
      cookieKey: "i18n_redirected",
      redirectOn: "all",
    },
    defaultLocale: "en",
    vueI18n: "~/i18n.config.ts",
  },

  icon: {
    customCollections: [
      {
        prefix: "custom",
        dir: "./assets/icons",
      },
    ],
    clientBundle: {
      scan: true,
      includeCustomCollections: true,
    },
    // provider: "iconify",
    collections: ["solar", "tabler", "mdi"],
  },

  devtools: { enabled: process.env.NUXT_PUBLIC_DEVTOOLS_ENABLED === "true" },

  compatibilityDate: "2025-01-22",

  // image: {
  //   provider: "ipx",
  // },
});
