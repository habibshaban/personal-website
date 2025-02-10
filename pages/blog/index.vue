<template>
  <div class="container mx-auto py-10">
    <h1 class="text-3xl font-bold mb-4">Blog Posts</h1>
    <div v-for="post in posts" :key="post._path">
      <NuxtLink :to="post._path" class="block p-4 border rounded-md hover:bg-gray-100">
        <h2 class="text-xl font-semibold">{{ post.title }}</h2>
        <p class="text-gray-600">{{ post.description }}</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { data: posts } = await useAsyncData("posts", () => queryContent("/blog").find());
</script>
