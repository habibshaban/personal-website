<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const route = useRoute()
const { t, locale } = useI18n()


const { data: page } = await useAsyncData(route.path, async () => {
  const collection = ('articles_' + locale.value) as keyof Collections
  return await queryCollection(collection).path(route.path).first() as Collections['articles_en'] | Collections['articles_fi']
},
{
  watch: [locale],
})

const { canonical, jsonLd, withDefaults, absoluteUrl } = useSeo()
const cover = computed<string>(() => (page.value?.meta as any)?.cover || '/images/article-cover.png')

useSeoMeta(withDefaults({
  title: () => page.value?.title,
  description: () => page.value?.description,
  ogTitle: () => page.value?.title,
  ogDescription: () => page.value?.description,
  ogImage: () => cover.value,
}))

useHead({ link: [{ rel: 'canonical', href: canonical() }] })

watchEffect(() => {
  if (!page.value) return
  jsonLd({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.value.title,
    description: page.value.description,
  image: absoluteUrl(String(cover.value)),
  datePublished: page.value.date as any,
  dateModified: page.value.date as any,
    author: page.value.author ? [{ '@type': 'Person', name: page.value.author }] : undefined,
    mainEntityOfPage: canonical(),
  })
})
</script>

<template>
  <ArticleLayout v-if="page?.body" :doc="page" />
</template>
