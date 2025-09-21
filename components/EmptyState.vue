<script setup lang="ts">

defineProps<{
 title?: string
 description?: string
}>()
</script>

<template>
  <div class="flex min-h-96 flex-col items-center justify-center rounded-lg border border-white/10 bg-zinc-900/50 backdrop-blur-md p-12 text-center">
    <div class="mb-4 rounded-full bg-zinc-800 p-3">
      <svg class="h-8 w-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    </div>
    <h3 class="mb-2 text-lg font-semibold text-textPrimary">{{ title }}</h3>
    <p class="text-textGray">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
