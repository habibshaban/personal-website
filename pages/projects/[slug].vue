<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const route = useRoute()
const { locale } = useI18n()

const { data: page } = await useAsyncData(route.path, async () => {
  const collection = ('projects_' + locale.value) as keyof Collections
  return await queryCollection(collection).path(route.path).first() as Collections['projects_en'] | Collections['projects_fi']
},
{
  watch: [locale],
})

const project = computed(() => {
  return page.value
})



useSeoMeta({
  title: project.value?.title,
  description: project.value?.description,
  ogTitle: project.value?.title,
  ogDescription: project.value?.description,
  ogImage: project.value?.meta?.cover || '/images/project-placeholder.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <ArticleLayout v-if="project" :doc="project" />
</template>
