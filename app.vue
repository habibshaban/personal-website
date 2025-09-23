<script setup lang="ts">
import { Toaster } from 'vue-sonner'
const { locale } = useI18n()
useHead({
  htmlAttrs: {
    lang: () => locale.value,
  },
})

useSeoMeta({
  titleTemplate: '%s · Habib Shaban',
  ogSiteName: 'Habib Shaban',
  ogImage: '/images/selected.png',
  twitterCard: 'summary_large_image',
})
</script>

<template>
 <Html :lang="locale">
  <Body>
    <NuxtLayout>
    <NuxtPage />
    <Toaster position="top-right" close-button />
  </NuxtLayout>
  </Body>
 </Html>
</template>

<style></style>
