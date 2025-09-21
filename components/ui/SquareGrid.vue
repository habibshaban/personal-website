<template>
  <div class="square-grid" aria-hidden="true">
    <div
      v-for="i in totalCells"
      :key="`cell-${i}`"
      class="grid-cell"
    />
  </div>
</template>

<script setup lang="ts">
const columns = 12
const rows = 8
const totalCells = computed(() => columns * rows)
</script>

<style scoped lang="scss">
.square-grid {
  @apply fixed inset-0 pointer-events-none;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(8, 1fr);
  z-index: 2;
}

.grid-cell {
  @apply relative;
  // aspect-ratio: 1 / 1;
  pointer-events: auto;
  background-color: transparent;
  transition: background-color 300ms ease;
  
  &::before,
  &::after {
    content: '';
    @apply absolute;
    background-color: rgba(255, 255, 255, 0.08);
    transition: background-color 300ms ease;
    z-index: 1;
  }
  
  &::before {
    @apply bottom-0 left-0 right-0;
    height: 1px;
  }
  
  &::after {
    @apply top-0 right-0 bottom-0;
    width: 1px;
  }
  
  &:nth-child(12n) {
    &::after {
      display: none;
    }
  }
  
  &:nth-last-child(-n+12) {
    &::before {
      display: none;
    }
  }
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    background-image: radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(255, 255, 255, 0.04) 50%,
      transparent 100%
    );
    
    &::before,
    &::after {
      background-color: rgba(255, 255, 255, 0.15);
    }
  }
}

.square-grid::before,
.square-grid::after {
  content: '';
  @apply absolute pointer-events-none;
  background-color: rgba(255, 255, 255, 0.08);
  z-index: 1;
}

.square-grid::before {
  @apply top-0 left-0 right-0;
  height: 1px;
}

.square-grid::after {
  @apply top-0 left-0 bottom-0;
  width: 1px;
}

@media (max-width: 640px) {
  .square-grid {
    display: none;
  }
}
</style> 
