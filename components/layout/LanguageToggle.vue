<script setup lang="ts">
const { locale: current, availableLocales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localeCookie = useCookie<string | null>('i18n_redirected')

const locales = computed(() => availableLocales)

const currentLocale = computed(() => {
  return current.value
})

watch(current, (newLocale) => {
  localeCookie.value = newLocale
})
</script>

<template>
  <div class="z-[9999] flex items-center gap-3 rounded-lg border border-white/10 bg-zinc-900/90 px-3 py-1 backdrop-blur-xl">
    <ClientOnly>
      <NuxtLink
        v-for="locale in locales"
        :key="locale"
        class="cursor-pointer select-none"
        :to="switchLocalePath(locale)"
      >
        <span
          class="font-semibold"
          :class="locale === currentLocale ? 'text-white' : 'text-neutral-500'"
        >
          {{ locale }}
        </span>
      </NuxtLink>
      <template #fallback>
        <div class="flex items-center gap-3">
          <div class="h-5 w-6 animate-pulse rounded bg-zinc-700" />
          <div class="h-5 w-6 animate-pulse rounded bg-zinc-700" />
        </div>
      </template>
    </ClientOnly>
  </div>
</template>
