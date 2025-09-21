<template>
  <div
    ref="target"
    :style="cssVars"
    :class="['p-[2px] shine', props.class || '']"
  >
    <slot />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useMouseInElement } from "@vueuse/core";

const props = defineProps({
  class: {
    type: String,
    required: false
  }
});

const target = ref(null);
const { elementX, elementY } = useMouseInElement(target);
const cssVars = computed(() => ({
  "--x": `${target.value ? elementX.value : -1000}px`,
  "--y": `${target.value ? elementY.value : -1000}px`,
}));
</script>

<style scoped>
.shine {
  background-image: radial-gradient(
    300px circle at var(--x) var(--y),
    #C0C0C0 0,
    transparent 100%
  );
}
</style>
