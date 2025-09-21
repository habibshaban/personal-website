export interface CommonContent {
  title: string;
  description: string;
  date: string;
  cover?: string;
  readingTime?: number;
  tags?: string[];
  author?: {
    name: string;
    role: string;
    avatar?: string;
  };
  github?: string;
  demo?: string;
  technologies?: string[];
  challenges?: string[];
  draft?: boolean;
}

export interface CommonProjectContent extends CommonContent {
  type: "Side Project" | "Mini Tool" | "Experiment" | "Learning" | "Fun";
}

export interface CommonArticleContent extends CommonContent {
  type: "Tutorial" | "Case Study" | "Editorial" | "Opinion";
}
