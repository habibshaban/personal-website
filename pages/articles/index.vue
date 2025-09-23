<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const route = useRoute()
const { t, locale } = useI18n()
const localePath = useLocalePath()

const { data: articles } = await useAsyncData(route.path, async () => {
  const collection = ('articles_' + locale.value) as keyof Collections
  return ((await queryCollection(collection).all()) as Collections['articles_en'][] | Collections['articles_fi'][]).sort((a, b) => new Date(b?.date).getTime() - new Date(a?.date).getTime())
}, {
  watch: [locale],
})

const blogPosts = computed(() => {
  return articles.value?.map(article => {
    const slug = article.path?.split('/').pop()?.replace('.md', '') || 'unknown'
    return {
      link: localePath(`/articles/${slug}`),
      image: article.cover || "/images/article-cover.png", 
      title: article.title || 'Untitled',
      description: article.description,
      date: article.date,
      readingTime: article.readingTime,
      author: article.author,
      tags: article.tags || [],
      type: article.type
    }
  }) || []
})

useSeoMeta({
  title: t('articles.title'),
  description: t('articles.subtitle')
})
</script>

<template>
  <NuxtPage />
  <div class="container mx-auto px-4 py-24">
    <div v-if="blogPosts.length > 0" class="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
      <RaycastCard
        v-for="post in blogPosts" 
        :key="post.title" 
        :title="post.title"
        :href="post.link"
        :src="post.image"
        :alt="post.title"
      />
    </div>
    <EmptyState v-else :title="t('articles.emptyStateTitle')" :description="t('articles.emptyStateDescription')" />
  </div>
</template>
