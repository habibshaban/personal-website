export type Navigation = {
  nameKey: string;
  to: string;
  icon: string;
};

export const homeNavigation: Record<string, Navigation> = {
  home: {
    nameKey: "navigation.home",
    to: "/",
    icon: "lucide:home",
  },
  projects: {
    nameKey: "navigation.projects",
    to: "/projects",
    icon: "lucide:briefcase",
  },
  articles: {
    nameKey: "navigation.articles",
    to: "/articles",
    icon: "lucide:library",
  },
  about: {
    nameKey: "navigation.about",
    to: "/about",
    icon: "lucide:user",
  },
  contact: {
    nameKey: "navigation.contact",
    to: "/contact",
    icon: "lucide:mail",
  },
};
