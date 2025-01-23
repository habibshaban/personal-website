<script setup lang="ts">
import SpotlightButton from '../../components/SpotlightButton.vue';
import { homeNavigation } from '../../constants/home-navigation';
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
            :key="item.name"
            :id="item.name.toLowerCase()"
            :aria-label="item.name + ' navigation link'"
            :to="item.to"
            class="nav-item"
          >
            <Icon :name="item.icon" class="size-7 font-light sm:size-6" />
          </NuxtLink>
        </nav>
      </SpotlightButton>
    </header>
  </div>
</template>

<style scoped>
.nav-item {
  @apply flex items-center rounded-full border border-transparent 
         px-4 py-1 transition-all duration-300 ease-in-out 
         sm:px-6 text-iconGray;
  background: transparent;
}

.nav-item:hover {
  @apply border-white/5 bg-zinc-900/50 backdrop-blur-3xl;
}

.nav-item.router-link-active {
  @apply border border-white/5 bg-zinc-900/10 text-white/75 
         shadow-2xl shadow-white/50 backdrop-blur-3xl;
}
</style>
