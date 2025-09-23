<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const route = useRoute()
const { t, locale } = useI18n()

const { data: page } = await useAsyncData(route.path, async () => {
  const collection = ('projects_' + locale.value) as keyof Collections
  return await queryCollection(collection).path(route.path).first() as Collections['projects_en'] | Collections['projects_fi']
},
{
  watch: [locale],
})

const project = computed(() => page.value)

const { canonical, jsonLd, withDefaults, absoluteUrl } = useSeo()
const cover = computed<string>(() => (project.value?.meta as any)?.cover || '/images/project-placeholder.png')

useSeoMeta(withDefaults({
  title: () => project.value?.title,
  description: () => project.value?.description,
  ogTitle: () => project.value?.title,
  ogDescription: () => project.value?.description,
  ogImage: () => cover.value,
}))

useHead({ link: [{ rel: 'canonical', href: canonical() }] })

watchEffect(() => {
  if (!project.value) return
  jsonLd({
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.value.title,
    description: project.value.description,
    image: absoluteUrl(String(cover.value)),
    url: canonical(),
  })
})
</script>

<template>
  <ArticleLayout v-if="project" :doc="project" />
</template>
