<script setup>

</script>

<template>
  <div class="relative h-[800px] flex items-center justify-center bg-cover" 
       style="background-image: url('/images/bg-hero.webp')">
    <div class="absolute inset-0 bg-black bg-opacity-50"></div>
    <div class="relative z-10 text-center">
      <h1 class="text-4xl font-bold text-white">{{ $t("welcome") }}</h1>
      <p class="text-lg text-gray-200 mt-4">{{ $t("description") }}</p>
    </div>
  </div>
</template>
