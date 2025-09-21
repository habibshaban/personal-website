<script setup lang="ts">
import type { CommonProjectContent } from '~/lib/interfaces/content-interfaces';

defineProps<{
  project: CommonProjectContent & { link: string }
}>()
</script>

<template>
  <NuxtLink
    :aria-label="project.title + ' project link'"
    :to="project.link"
    class="group relative flex cursor-pointer flex-col rounded-3xl bg-gradient-to-r from-grayMedium  via-grayLight via-[95%] to-white p-[1px]"
  >
    <div class="flex h-full flex-col gap-4 rounded-3xl bg-brandBackground px-6 pt-4 pb-6 backdrop-blur-md">
      <div class="flex gap-[2px]">
      <div class="size-2 rounded-full bg-grayDark transition-colors duration-300 group-hover:bg-red-500" />
      <div class="size-2 rounded-full bg-grayDark transition-colors duration-300 group-hover:bg-yellow-500" />
      <div class="size-2 rounded-full bg-grayDark transition-colors duration-300 group-hover:bg-green-500" />
      </div>
      
      <div class="flex h-full flex-col items-center justify-center relative">
      <img
        :alt="project.title + ' project image'"
        class="h-auto w-auto max-w-full object-contain"
        :src="project.cover || '/images/project-placeholder.png'"
      />
    <div class="absolute bottom-0 h-fit w-4/5">
      <div class="absolute inset-0 bg-transparent backdrop-blur-md border-t border-x border-white/50 rounded-tr-2xl rounded-tl-2xl"></div>
      <div class="relative px-6 py-3 flex items-center justify-between">
        <div class="text-sm font-semibold text-white font-mono">{{ project.title || 'Project Name' }}</div>
        <Icon name="lucide:arrow-up-right" class="size-4 text-white" />
      </div>
    </div>
      </div>
    </div>
  </NuxtLink>
</template>
