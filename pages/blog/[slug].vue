<template>
  <div class="container mx-auto py-10">
    <h1 class="text-3xl font-bold">{{ post.title }}</h1>
    <p class="text-gray-500">{{ post.date }}</p>
    <nuxt-content :document="post" class="prose" />
  </div>
</template>

<script setup>
const { params } = useRoute();
const { data: post } = await useAsyncData(() => queryContent(`/blog/${params.slug}`).findOne());
</script>
