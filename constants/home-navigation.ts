export type Navigation = {
  name: string;
  to: string;
  icon: string;
};

export const homeNavigation: Record<string, Navigation> = {
  home: {
    name: "Home",
    to: "/",
    icon: "lucide:home",
  },
  projects: {
    name: "Projects",
    to: "/projects",
    icon: "lucide:briefcase",
  },
  journal: {
    name: "Journal",
    to: "/journals",
    icon: "lucide:library",
  },
  blog: {
    name: "Blog",
    to: "/blog",
    icon: "lucide:library",
  },
  about: {
    name: "About",
    to: "/about",
    icon: "lucide:user",
  },
  contact: {
    name: "Contact",
    to: "/contact",
    icon: "lucide:mail",
  },
};
