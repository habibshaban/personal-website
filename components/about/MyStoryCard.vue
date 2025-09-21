<script setup lang="ts">
interface Props {
  title: string
  text: string
  photo?: string
}
defineProps<Props>()
</script>

<template>
  <section
    class="relative grid rounded-3xl bg-[#121212]/80 p-6 ring-1 ring-white/10 md:grid-cols-[1fr,320px] md:p-8"
  >
      <div class="prose prose-invert max-w-none">
        <h2 class="!mt-0 text-2xl font-semibold tracking-tight text-white/80">{{ title }}</h2>
        <p class="whitespace-pre-line text-white/80 leading-relaxed">{{ text }}</p>
      </div>

      <div v-if="photo" class="mt-6 md:mt-0 md:pl-8">
        <div class="relative overflow-hidden rounded-2xl">
          <div class="rounded-2xl bg-gradient-to-r from-grayMedium via-grayLight via-[95%] to-white p-[1px]">
            <img :src="photo" alt="Portrait" class="rounded-2xl  w-full object-cover aspect-square" />
          </div>
          <div class="pointer-events-none absolute inset-x-0 bottom-0 h-1/3
                      bg-[radial-gradient(60%_60%_at_50%_100%,rgba(16,185,129,.35),transparent_70%)]"></div>
        </div>
      </div>

  </section>
</template>
