<script setup lang="ts">
import SpotlightButton from '~/components/SpotlightButton.vue';
import { homeNavigation } from '~/constants/home-navigation';

const localePath = useLocalePath()
const { t } = useI18n()
const route = useRoute()

const isActive = (to: string) => route.path.includes(localePath(to))
</script>

<template>
  <div class="mx-auto my-2 flex w-full items-center justify-center">
    <header class="rounded-full">
      <SpotlightButton
        rounded
        transparent
        :animate="false"
        class="border border-white/20 backdrop-blur-lg shadow-[0_4px_30px_rgba(255,255,255,0.1)]"
      >
        <nav
          class="z-10  flex h-[50px] justify-around gap-2 p-1 
                 transition-all duration-300 ease-in-out 
                 sm:h-[45px] sm:hover:gap-4"
        >
          <NuxtLink
            v-for="item in homeNavigation"
            :key="item.nameKey"
            :id="item.nameKey.toLowerCase()"
            :aria-label="t(item.nameKey) + ' navigation link'"
            :to="localePath(item.to)"
            :class="['nav-item', isActive(item.to) ? 'router-link-active' : '']"
          >
            <Icon :name="item.icon" class="size-7 font-light sm:size-6" />
            <span class="nav-item-text">{{ t(item.nameKey) }}</span>
          </NuxtLink>
        </nav>
      </SpotlightButton>
    </header>
  </div>
</template>

<style scoped lang="scss">
.nav-item {
  @apply flex items-center gap-1 rounded-full border border-transparent 
         px-4 py-1 transition-all duration-300 ease-in-out cursor-pointer
         sm:px-6 text-iconGray;
  @apply bg-transparent;
}

.nav-item:hover {
  @apply border-white/5 bg-zinc-900/50 backdrop-blur-3xl;
  
}

.nav-item.router-link-active {
  @apply border border-white/5 bg-zinc-900/10 text-white/75 
         shadow-2xl shadow-white/50 backdrop-blur-3xl;
}

.nav-item-text {
  @apply hidden;
}

.nav-item.router-link-active .nav-item-text {
  @apply sm:block;
}
</style>
