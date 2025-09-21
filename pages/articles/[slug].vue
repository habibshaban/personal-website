<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const route = useRoute()
const { locale } = useI18n()


const { data: page } = await useAsyncData(route.path, async () => {
  const collection = ('articles_' + locale.value) as keyof Collections
  return await queryCollection(collection).path(route.path).first() as Collections['articles_en'] | Collections['articles_fi']
},
{
  watch: [locale],
})

useSeoMeta({
  title: page?.value?.title,
  description: page?.value?.description,
  ogTitle: page?.value?.title,
  ogDescription: page?.value?.description,
  ogImage: page?.value?.meta?.cover || '/images/article-cover.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <ArticleLayout v-if="page?.body" :doc="page" />
</template>
