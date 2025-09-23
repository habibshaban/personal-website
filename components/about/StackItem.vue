<template>
  <div :class="props.class">
    <div
      class="stack-item-wrapper rounded-[13px] w-full h-28 p-[1px] aspect-square"
    >
      <div
        class="rounded-[12px] w-full h-full bg-gradient-to-b from-neutral-800/50 to-neutral-950/50 bg-neutral-950/80 grid place-items-center text-white/70 select-none"
      >
        <div class="flex flex-col items-center gap-2">
          <Icon v-if="icon" :name="icon" class="h-3 w-3" />
          <span class="text-sm">{{ label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: false
  },
  class: {
    type: String,
    required: false
  }
});
</script>

<style scoped>
.stack-item-wrapper {
  background: linear-gradient(90deg, #205337 0%, #1F432E 10%, #34F487 100%);
}
</style>
