<script setup lang="ts">
import type { Collections } from '@nuxt/content'
const route = useRoute()
const { t, locale } = useI18n()
const localePath = useLocalePath()


const { data: projects } = await useAsyncData(route.path, async () => {
  const collection = ('projects_' + locale.value) as keyof Collections
  return (await (queryCollection(collection).all()) as Collections['projects_en'][] | Collections['projects_fi'][]).sort((a, b) => new Date(b?.date).getTime() - new Date(a?.date).getTime())
}, {
  watch: [locale],
})

const projectPosts = computed(() => {
  return projects.value?.map((project) => {
    const slug = project.path?.split('/').pop()?.replace('.md', '') || 'unknown'
    return {
      link: localePath(`/projects/${slug}`),
      image: project?.cover || "/images/project-placeholder.png",
      title: project?.title || 'Untitled',
      description: project?.description,
      date: project?.date,
      readingTime: project?.readingTime,
      author: project?.author,
      tags: project?.tags || [],
      type: project?.type,
      technologies: project?.technologies || [],
      github: project?.github,
      demo: project?.demo
    }
  }) || []
})

useSeoMeta({
  title: t('projects.title'),
  description: t('projects.subtitle')
})
</script>

<template>
  <div class="container mx-auto px-4 py-24">
    <div v-if="projectPosts.length > 0" class="grid gap-4 md:gap-x-10 md:gap-y-6 md:grid-cols-2">
      <ProjectCard
        v-for="project in projectPosts" 
        :key="project.title " 
        :project="project"
      />
    </div>
    <EmptyState v-else :title="t('projects.emptyStateTitle')" :description="t('projects.emptyStateDescription')" />
  </div>
</template>
