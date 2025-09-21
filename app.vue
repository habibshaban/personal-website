<script setup lang="ts">
import { Toaster } from 'vue-sonner'
const { locale } = useI18n()
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
