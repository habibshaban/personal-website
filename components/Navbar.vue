<template>
  <nav class="w-full p-4 bg-gray-900 text-white flex justify-between">
    <NuxtLink to="/" class="text-xl font-bold">{{ $t("home") }}</NuxtLink>
    <div class="space-x-4">
      <NuxtLink to="/blog">{{ $t("blog") }}</NuxtLink>
      <NuxtLink to="/journals">{{ $t("journals") }}</NuxtLink>
      <NuxtLink to="/projects">{{ $t("projects") }}</NuxtLink>
      <NuxtLink to="/contact">{{ $t("contact") }}</NuxtLink>
    </div>
    <select v-model="$i18n.locale" @change="$forceUpdate()" class="bg-gray-800 text-white border-none">
      <option value="en">🇬🇧 English</option>
      <option value="fi">🇫🇮 Suomi</option>
    </select>
  </nav>
</template>

<script setup>
</script>
