<script setup lang="ts">
import type { ExperienceItem } from '~/lib/interfaces/profile-interfaces';


interface Props {
  items: ExperienceItem[]
}
withDefaults(defineProps<Props>(), {
})
</script>

<template>
  <section class="rounded-3xl h-full bg-[#121212]/80 p-6 ring-1 ring-white/10 md:p-8">

      <h3 class="text-xl font-semibold tracking-tight text-white mb-5">{{ $t('about.experiences') }}</h3>

      <ul class="space-y-5">
        <li v-for="(it, i) in items" :key="i" class="grid grid-cols-[1fr,auto] gap-x-4 gap-y-1">
          <div>
            <p class="font-medium text-white/90">{{ it.role }}</p>
            <p class="text-white/60 text-sm">{{ it.company }}</p>
          </div>
          <span class="text-white/50 text-sm whitespace-nowrap self-start">{{ it.dates }}</span>
          <p v-if="it.description" class="text-white/60 text-sm mt-2 leading-relaxed col-span-2">{{ it.description }}</p>
        </li>
      </ul>

  </section>
</template>
