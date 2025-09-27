<script setup lang="ts">
import { Toaster } from 'vue-sonner'
const { locale } = useI18n()
const { link: configLinks } = useAppConfig()
useHead({
  htmlAttrs: {
    lang: () => locale.value,
  },
  link: configLinks as any,
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
