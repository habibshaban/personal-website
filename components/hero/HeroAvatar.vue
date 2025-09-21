<template>
  <div class="hero-avatar-wrapper">
    <img
      :src="src"
      :alt="`${name} avatar`"
      loading="lazy"
      class="avatar-image"
     />
    <div v-if="isAvailable" class="availability-badge">
      <span class="badge-dot" />
      <span class="badge-text">{{ $t('hero.available') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  src: string
  name?: string
  isAvailable?: boolean
}

withDefaults(defineProps<Props>(), {
  name: 'User',
  isAvailable: true
})
</script>

<style scoped lang="scss">
.hero-avatar-wrapper {
  @apply  flex flex-col items-center;
}


.avatar-image {
  @apply relative z-[2] w-24 h-24 object-cover rounded-full;
}

.availability-badge {
  @apply z-[3] -m-4 inline-flex items-center gap-2 px-4 py-2;
  @apply bg-[#181818] backdrop-blur-sm rounded-full;
  @apply border border-[#2A2A2A];
}

.badge-dot {
  @apply w-2 h-2 bg-[#34F487CC] rounded-full;
  animation: badge-pulse 2s ease-in-out infinite;
}

.badge-text {
  @apply text-xs/6 text-[#34F487CC];
}



@keyframes badge-pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
    box-shadow: 0 0 0 8px rgba(34, 197, 94, 0);
  }
}
</style> 
