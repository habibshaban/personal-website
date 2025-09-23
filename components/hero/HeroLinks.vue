<template>
  <div class="hero-links">
    <SpotlightButton
      as="a"
      class="social-link"
      :rounded="true"
      v-for="(url, platform) in links"
      :key="platform"
      :href="url"
      :aria-label="`Visit ${platform} profile`"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon :name="getIconName(platform)" class="social-icon" />
    </SpotlightButton>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  links: Record<string, string>
}>()

const getIconName = (platform: string): string => {
  const iconMap: Record<string, string> = {
    github: 'mdi:github',
    linkedin: 'mdi:linkedin',
    twitter: 'mdi:twitter',
    instagram: 'mdi:instagram'
  }
  return iconMap[platform.toLowerCase()] || 'mdi:link'
}
</script>

<style scoped lang="scss">
.hero-links {
  @apply flex items-center justify-center gap-4;
}

.social-link {
  @apply p-2;
}

/* .social-link:hover {
  @apply bg-gray-700/50 border-gray-600/50;
  @apply transform -translate-y-1;
} */

.social-icon {
  @apply w-6 h-6 text-gray-400;
  @apply transition-colors duration-200;
}

.social-link:hover .social-icon {
  @apply text-white;
}
</style> 
