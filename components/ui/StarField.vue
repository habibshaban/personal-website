<template>
  <div class="star-field" aria-hidden="true">
    <div
      v-for="star in stars"
      :key="star.id"
      class="star"
      :style="{
        left: star.left,
        top: star.top,
        '--pulse-duration': star.duration,
        '--pulse-delay': star.delay
      }"
    >
      <span class="star-horizontal" />
      <span class="star-vertical" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Star {
  id: number
  left: string
  top: string
  duration: string
  delay: string
}

const columns = 12
const rows = 8


const getIntersectionPoints = () => {
  const points: { x: number; y: number }[] = []
  for (let row = 0; row <= rows; row++) {
    for (let col = 0; col <= columns; col++) {
      if (col < columns && row < rows) {
        points.push({
          x: (col / columns) * 100,
          y: (row / rows) * 100
        })
      }
    }
  }
  
  return points
}

const generateStars = (count: number): Star[] => {
  const intersections = getIntersectionPoints()
  const selectedPoints = new Set<number>()
  const stars: Star[] = []
  
  while (selectedPoints.size < Math.min(count, intersections.length)) {
    const index = Math.floor(Math.random() * intersections.length)
    if (!selectedPoints.has(index)) {
      selectedPoints.add(index)
      const point = intersections[index]
      
      stars.push({
        id: index,
        left: `${point.x}%`,
        top: `${point.y}%`,
        duration: `${3 + Math.random() * 4}s`, 
        delay: `${Math.random() * 5}s` 
      })
    }
  }
  
  return stars
}

const stars = ref<Star[]>([])

onMounted(() => {
  stars.value = generateStars(40)
})
</script>

<style scoped lang="scss">
.star-field {
  @apply fixed inset-0 overflow-hidden pointer-events-none;
  z-index: 1;
}

.star {
  @apply absolute;
  width: 24px;
  height: 24px;
  transform: translate(-50%, -50%);
  animation: star-pulse var(--pulse-duration, 4s) ease-in-out infinite;
  animation-delay: var(--pulse-delay, 0s);
}

.star-horizontal,
.star-vertical {
  @apply absolute;
  background: linear-gradient(
    to right,
    transparent,
    rgba(133, 249, 212, 0.4) 40%,
    rgba(133, 249, 212, 0.6) 50%,
    rgba(133, 249, 212, 0.4) 60%,
    transparent
  );
}

.star-horizontal {
  @apply top-1/2 left-0 right-0;
  height: 1px;
  transform: translateY(-50%);
}

.star-vertical {
  @apply top-0 bottom-0 left-1/2;
  width: 1px;
  transform: translateX(-50%);
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(133, 249, 212, 0.4) 40%,
    rgba(133, 249, 212, 0.6) 50%,
    rgba(133, 249, 212, 0.4) 60%,
    transparent
  );
}

@keyframes star-pulse {
  0%, 100% {
    opacity: 0.3;
    transform: translate(-50%, -50%) scale(0.6);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

@media (max-width: 640px) {
  .star-field {
    display: none;
  }
}
</style> 
