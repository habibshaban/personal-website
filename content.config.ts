import { defineCollection, defineContentConfig, z } from "@nuxt/content";
import { asSeoCollection } from "@nuxtjs/seo/content";

const commonArticleSchema = z
  .object({
    title: z.string().nonempty(),
    description: z.string().nonempty(),
    date: z.string().nonempty(),
    type: z.enum(["Tutorial", "Case Study", "Editorial", "Opinion"]),
    cover: z.string().optional(),
    readingTime: z.number().min(1).optional(),
    tags: z.array(z.string().nonempty()).optional(),
    author: z
      .object({
        name: z.string().nonempty(),
        role: z.string().nonempty(),
        avatar: z.string().url().optional(),
      })
      .optional(),
    canonical: z.string().url().optional(),
    draft: z.boolean().optional(),
  })
  .passthrough();

const commonProjectSchema = z
  .object({
    title: z.string().nonempty(),
    description: z.string().nonempty(),
    date: z.string().nonempty(),
    type: z.enum(["Side Project", "Mini Tool", "Experiment", "Learning", "Fun"]),
    cover: z.string().optional(),
    readingTime: z.number().min(1).optional(),
    tags: z.array(z.string().nonempty()).optional(),
    author: z
      .object({
        name: z.string().nonempty(),
        role: z.string().nonempty(),
        avatar: z.string().url().optional(),
      })
      .optional(),
    github: z.string().url().optional(),
    demo: z.string().url().optional(),
    technologies: z.array(z.string().nonempty()).optional(),
    challenges: z.array(z.string().nonempty()).optional(),
    draft: z.boolean().optional(),
  })
  .passthrough();

const commonProfileSchema = z.object({
  summary: z.string().nonempty(),
  story: z.object({
    title: z.string().nonempty(),
    text: z.string().nonempty(),
    photo: z.string().nonempty(),
  }),
  experiences: z.array(
    z.object({
      id: z.string().nonempty(),
      company: z.string().nonempty(),
      role: z.string().nonempty(),
      dates: z.string().nonempty(),
      description: z.string().nonempty(),
      logoUrl: z.string().nonempty(),
      url: z.string().url(),
    })
  ),
  contactInfo: z.object({
    phone: z.string().nonempty(),
    email: z.string().email(),
  }),
});

export default defineContentConfig({
  collections: {
    articles: defineCollection({
      type: "page",
      source: {
        include: "articles/**/*.md",
        exclude: [],
      },
      schema: commonArticleSchema,
    }),
    projects: defineCollection({
      type: "page",
      source: {
        include: "projects/**/*.md",
        exclude: [],
      },
      schema: commonProjectSchema,
    }),
    articles_en: defineCollection(
      asSeoCollection({
        type: "page",
        source: {
          include: "en/articles/*.md",
          prefix: "/en/articles",
        },
        schema: commonArticleSchema as any,
      })
    ),
    articles_fi: defineCollection(
      asSeoCollection({
        type: "page",
        source: {
          include: "fi/articles/*.md",
          prefix: "/fi/articles",
        },
        schema: commonArticleSchema as any,
      })
    ),
    projects_en: defineCollection(
      asSeoCollection({
        type: "page",
        source: {
          include: "en/projects/*.md",
          prefix: "/en/projects",
        },
        schema: commonProjectSchema as any,
      })
    ),
    projects_fi: defineCollection(
      asSeoCollection({
        type: "page",
        source: {
          include: "fi/projects/*.md",
          prefix: "/fi/projects",
        },
        schema: commonProjectSchema as any,
      })
    ),
    stack: defineCollection({
      type: "data",
      source: "stack.json",
      schema: z.object({
        items: z.array(
          z.object({
            label: z.string().nonempty(),
            link: z.string().url(),
            icon: z.string().nonempty(),
          })
        ),
      }),
    }),
    profile_en: defineCollection({
      type: "data",
      source: "en/profile.json",
      schema: commonProfileSchema,
    }),
    profile_fi: defineCollection({
      type: "data",
      source: "fi/profile.json",
      schema: commonProfileSchema,
    }),
  },
});
