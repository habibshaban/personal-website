import en from "./en/common.json";
import en_navigation from "./en/navigation.json";
import en_hero from "./en/hero.json";
import en_about from "./en/about.json";
import en_articles from "./en/articles.json";
import en_projects from "./en/projects.json";
import en_contact from "./en/contact.json";
import en_footer from "./en/footer.json";
import en_experiences from "./en/experiences.json";

import fi from "./fi/common.json";
import fi_navigation from "./fi/navigation.json";
import fi_hero from "./fi/hero.json";
import fi_about from "./fi/about.json";
import fi_articles from "./fi/articles.json";
import fi_projects from "./fi/projects.json";
import fi_contact from "./fi/contact.json";
import fi_footer from "./fi/footer.json";
import fi_experiences from "./fi/experiences.json";

const messages = {
  en: {
    navigation: en_navigation,
    hero: en_hero,
    about: en_about,
    articles: en_articles,
    projects: en_projects,
    contact: en_contact,
    footer: en_footer,
    experiences: en_experiences,
    common: en,
  },
  fi: {
    navigation: fi_navigation,
    hero: fi_hero,
    about: fi_about,
    articles: fi_articles,
    projects: fi_projects,
    contact: fi_contact,
    footer: fi_footer,
    experiences: fi_experiences,
    common: fi,
  },
};

export default messages;
