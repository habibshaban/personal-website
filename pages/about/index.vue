<script setup lang="ts">
import type { Collections } from '@nuxt/content'



const { t, locale } = useI18n()

const { data: profile } = await useAsyncData('profile_' + locale.value, async () => {
  const collection = ('profile_' + locale.value) as keyof Collections
  return await queryCollection(collection).first() as Collections['profile_en'] | Collections['profile_fi']
}, {
  watch: [locale],
})

const story = computed(() => {
  return profile.value?.story || { title: '', text: '', photo: '' }
})
const experiences = computed(() => {
  return profile.value?.experiences || []
})

</script>

<template>
  <div class="mx-auto max-w-6xl space-y-10 px-4 py-10 md:space-y-12 md:py-14 mt-10">
    <ShineContainer class="rounded-3xl">
      <MyStoryCard v-bind="story" />
    </ShineContainer>

    <div class="grid gap-8 md:grid-cols-2">
       <ShineContainer class="rounded-3xl">
         <ExperienceCard :items="experiences" />
       </ShineContainer>
        <ShineContainer class="rounded-3xl">
          <StacksGrid :title="t('about.skills')" />
        </ShineContainer>
    </div>
  </div>
</template>
