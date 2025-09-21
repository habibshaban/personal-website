<template>
  <div class="hero-links">
    <SpotlightButton as="a" class="social-link" :rounded="true" v-for="link in links" :key="link.platform" :href="link.url" :aria-label="`Visit ${link.platform} profile`" target="_blank" rel="noopener noreferrer"> 
      <Icon :name="getIconName(link.platform)" class="social-icon" />
    </SpotlightButton>
  </div>
</template>

<script setup lang="ts">
interface SocialLink {
  platform: string
  url: string
}

interface Props {
  links?: SocialLink[]
}

const props = withDefaults(defineProps<Props>(), {
  links: () => [
    { platform: 'github', url: 'https://github.com' },
    { platform: 'linkedin', url: 'https://linkedin.com' }
  ]
})

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
