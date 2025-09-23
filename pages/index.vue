<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const localePath = useLocalePath()
const { t, locale } = useI18n()
const { profile: appProfile, socials } = useAppConfig() as any
const { name, avatar, isAvailable } = appProfile

const handleCTAClick = () => {
  navigateTo(localePath('/contact'))
}

const { data: profile } = await useAsyncData('profile_' + locale.value, async () => {
  const collection = ('profile_' + locale.value) as keyof Collections
  return await queryCollection(collection).first() as Collections['profile_en'] | Collections['profile_fi']
}, {
  watch: [locale],
})

const experiences = computed(() => {
  return profile.value?.experiences || []
})

const summary = computed(() => {
  return profile.value?.summary || ''
})

const { canonical, jsonLd, withDefaults } = useSeo()

useSeoMeta(withDefaults({
  title: t('hero.subtitle'),
  description: summary,
  ogTitle: t('hero.hi'),
  ogDescription: summary,
  ogImage: '/images/selected.png',
}))

useHead({
  link: [{ rel: 'canonical', href: canonical() }],
})

jsonLd({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: name,
  jobTitle: 'Software Engineer',
  url: canonical(),
})

</script>

<template>
  <div class="hero-page">
    <img 
      src="/images/top-left-light.png" 
      alt="Top left image"
      class="absolute top-0 left-0 z-20 object-cover rounded-lg pointer-events-none"
    />
    <img 
      src="/images/top-right-light.png" 
      alt="Top right image" 
      class="absolute top-0 right-0 z-20 object-cover rounded-lg pointer-events-none"
    />
    
    <StarField />
    <SquareGrid />
    
    <section class="hero-content">
      <HeroAvatar
        :src="avatar"
        :name="name"
        :is-available="isAvailable"
        class="pointer-events-auto"
      />
      <ScrambledText
        :label="$t('hero.hi')"
        class="hero-title pointer-events-auto"
      />
      <p class="hero-description pointer-events-auto">
        {{ summary }}
      </p>

      <HeroLinks :links="socials" class="pointer-events-auto" />

      <HeroCTA :text="$t('hero.talk')" @click="handleCTAClick" class="pointer-events-auto" />

      <HeroWorkList :jobs="experiences" class="pointer-events-auto" />
    </section>
  </div>
</template>

<style scoped lang="scss">
.hero-page {
  @apply relative min-h-screen bg-[#0F0F0F];
  @apply overflow-hidden;
}

.hero-content {
  @apply relative z-10;
  @apply flex flex-col items-center;
  @apply max-w-7xl mx-auto;
  @apply px-4 py-16 sm:py-24;
  @apply space-y-8;
  pointer-events: none;
}

.hero-title {
  @apply text-4xl sm:text-5xl md:text-6xl;
  @apply font-medium text-center;
  @apply leading-tight;
  background: linear-gradient(90deg, #ffffff 0%, #737373 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}



.hero-description {
  @apply max-w-2xl text-center;
  @apply text-base text-[#DADADA];
  @apply leading-relaxed;
}

.pointer-events-auto {
  pointer-events: auto !important;
}

@media (max-width: 640px) {
  .hero-content {
    @apply space-y-6;
  }
  
  .hero-title {
    @apply text-3xl;
  }
  
  .hero-description {
    @apply text-base;
  }
}
</style>
