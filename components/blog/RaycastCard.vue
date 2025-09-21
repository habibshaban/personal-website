<script setup lang="ts">
interface Props {
  title: string;
  href: string;
  src: string;
  alt?: string;
}
const props = withDefaults(defineProps<Props>(), {
  alt: 'Card image',
})
</script>

<template>
  <NuxtLink
    :to="href"
    class="group relative block overflow-hidden rounded-3xl"
    aria-label="Open article"
  >
    <img
      :src="src"
      :alt="alt"
      class="h-56 w-full object-cover md:h-72 lg:h-80 transition-transform duration-500 group-hover:scale-[1.02]"
      loading="lazy"
      decoding="async"
    />

    <div class="absolute inset-0 rounded-3xl ring-1 ring-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]"></div>

    <div class="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-transparent via-black/10 to-black/70"></div>

    <div class="absolute inset-x-0 bottom-0 p-4 sm:p-5">
      <p class="max-w-[45ch] font-mono font-medium tracking-tight text-white text-lg sm:text-xl">
        {{ props.title }}
      </p>
    </div>
    <div
      class="absolute bottom-4 right-4 grid h-12 w-12 place-items-center rounded-full bg-black/70 backdrop-blur
             ring-1 ring-white/20 text-white transition
             group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    >
      <Icon name="lucide:arrow-up-right" class="h-5 w-5 text-white" />
    </div>

    <span class="absolute inset-0 rounded-3xl ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"></span>
  </NuxtLink>
</template>


 <style scoped>


</style>
