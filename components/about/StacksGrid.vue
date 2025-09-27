<script setup lang="ts">

import type { Collections } from '@nuxt/content'

const { data: stacks } = await useAsyncData('stacks', async () => {
  const collection = ('stack' ) as keyof Collections
  return await queryCollection(collection).first() as Collections['stack']
})

</script>

<template>


  <section class="h-full rounded-3xl bg-[#121212]/80 p-6 ring-1 ring-white/10 md:p-8">
      <h3 class="text-xl font-semibold tracking-tight text-white mb-5">{{ $t('about.stacks') }}</h3>
      <div class="grid grid-cols-2 gap-5 md:grid-cols-3">
        <StackItem
          v-for="(it, idx) in stacks?.items || []"
          :key="idx"
          :label="it.label"
          :icon="it.icon"
        />
      </div>
  </section>
</template>
