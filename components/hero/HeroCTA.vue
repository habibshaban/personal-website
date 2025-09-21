<template>
  <button
    type="button"
    class="hero-cta"
    @click="handleClick"
    @mouseenter="startShake"
    @mouseleave="stopShake"
  >
  <Icon 
      name="noto:waving-hand-light-skin-tone"
      class="wave-icon"
      :class="{ 'shake': isShaking }"
      size="18"
    />
   <p class="font-bold text-[#101010] text-base">{{ text }}</p>
  </button>
</template>

<script setup lang="ts">
interface Props {
  text?: string
  onClick?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  text: "Let's talk"
})

const emit = defineEmits<{
  click: []
}>()

const isShaking = ref(false)

const handleClick = () => {
  if (props.onClick) {
    props.onClick()
  }
  emit('click')
}

const startShake = () => {
  isShaking.value = true
  setTimeout(() => {
    isShaking.value = false
  }, 600)
}

const stopShake = () => {
  isShaking.value = false
}
</script>

<style scoped lang="scss">
.hero-cta {
  @apply px-8 py-3 rounded-full;
  @apply bg-white text-black font-medium;
  @apply transition-all duration-200;
  @apply hover:bg-gray-100 hover:shadow-xl;
  @apply active:scale-95;
  @apply flex items-center justify-center gap-2;
}

.wave-icon {
  @apply transition-transform inline-block;
  transition-duration: 1500ms;
}

.wave-icon.shake {
  animation: icon-shake 1.5s ease-in-out;
}

@keyframes icon-shake {
  0%, 100% {
    transform: translateX(0) rotate(0deg);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-3px) rotate(-30deg);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(3px) rotate(30deg);
  }
}
</style> 
