import { defineStore } from "pinia";

interface WorkExperience {
  id: string;
  company: string;
  role: string;
  dates: string;
  description: string;
  logoUrl?: string;
}

export const useHeroStore = defineStore("hero", {
  state: () => ({
    avatarUrl: "/images/avatar.png",
    isAvailable: true,
    name: "Habib Shaban",
    description:
      "Experienced programmer with a strong foundation in software development and a keen interest in interdisciplinary fields such as psychology and medicine. Dedicated to continuous learning and professional growth, aiming to excel in both technical and leadership roles. Passionate about leveraging technology to drive innovation and positive change.",
    socialLinks: [
      { platform: "github", url: "https://github.com/habibshaban" },
      { platform: "linkedin", url: "https://linkedin.com/in/habibshaban" },
    ],
    workExperience: [
      {
        id: "google-lead",
        company: "Google",
        role: "Lead Software Engineer",
        dates: "Nov 2018 - Present",
        description:
          "As a Senior Software Engineer at Google, I played a pivotal role in developing innovative solutions for Google's core search algorithms. Collaborating with a dynamic team of engineers, I contributed to the enhancement of search accuracy and efficiency, optimizing user experiences for millions of users worldwide.",
        logoUrl: "/images/google-logo.png",
      },
    ] as WorkExperience[],
  }),

  getters: {
    // Get formatted work experience with years
    formattedWorkExperience: (state) => {
      return state.workExperience.map((job) => ({
        ...job,
        yearsActive: job.dates,
      }));
    },
  },

  actions: {
    // Update availability status
    toggleAvailability() {
      this.isAvailable = !this.isAvailable;
    },

    // Add new work experience
    addWorkExperience(experience: Omit<WorkExperience, "id">) {
      const newExperience = {
        ...experience,
        id: `job-${Date.now()}`,
      };
      this.workExperience.push(newExperience);
    },
  },

  persist: {
    storage: piniaPluginPersistedstate.localStorage(),
  },
});
