<template>
  <div 
    :class="[
      'gradient-line w-full bg-gradient-to-r from-transparent via-[#E5E7FF] to-transparent',
      heightClass,
      spacingClass
    ]"
  />
</template>

<script setup lang="ts">
interface Props {
  height?: 'thin' | 'thick' | 'custom'
  spacing?: 'none' | 'small' | 'medium' | 'large'
  customHeight?: string
}

const props = withDefaults(defineProps<Props>(), {
  height: 'thin',
  spacing: 'medium'
})

const heightClass = computed(() => {
  if (props.height === 'custom' && props.customHeight) {
    return `h-[${props.customHeight}]`
  }
  
  switch (props.height) {
    case 'thick':
      return 'h-[2px]'
    case 'thin':
    default:
      return 'h-[0.5px]'
  }
})

const spacingClass = computed(() => {
  switch (props.spacing) {
    case 'none':
      return ''
    case 'small':
      return 'my-4'
    case 'large':
      return 'my-12'
    case 'medium':
    default:
      return 'my-8'
  }
})
</script>
