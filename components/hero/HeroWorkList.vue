<template>
  <section class="hero-work-section">
    <div class="work-list">
      <article
        v-for="job in jobs"
        :key="job.id"
        class="work-item"
      >
        <div class="work-content">
          <div class="flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
            <div class="flex gap-2 items-center">
              <div v-if="job.logoUrl" class="work-logo my-auto">
                <img
                  :src="job.logoUrl"
                  :alt="`${job.company} logo`"
                  loading="lazy"
                  width="48"
                  height="48"
                  class="logo-image"
                />
              </div>
              <h3 class="work-role">
                {{ $t(`experiences.${job.id}_role`) }} <a class="work-company" :href="job.url" target="_blank">@ {{ job.company }}</a>
              </h3>
            </div>
            <time class="work-dates self-end sm:self-auto">{{ $t(`experiences.${job.id}_dates`) }}</time>
          </div>
          <p class="work-description">{{ $t(`experiences.${job.id}_description`) }}</p>
        </div>
      </article>
    </div>

    <button class="work-button">
      <span class="work-button-text">{{ $t("common.see_all") }}</span>
    </button>

    <GradientLine height="thick" spacing="none" />
  </section>
</template>

<script setup lang="ts">
interface Job {
  id: string
  company: string
  role: string
  dates: string
  description: string
  logoUrl?: string
  url: string
}

interface Props {
  jobs: Job[]
}

defineProps<Props>()
</script>

<style scoped lang="scss">
.hero-work-section {
  @apply max-w-4xl mx-auto mt-20 flex flex-col gap-12;
}

.work-title {
  @apply text-2xl font-bold text-white mb-8;
  @apply text-center sm:text-left;
}

.work-list {
  @apply flex flex-col gap-6;
}

.work-item {
  @apply flex gap-4;
}



.work-logo {
  @apply flex-shrink-0 w-8 h-8;
}

.logo-image {
  @apply w-full h-full object-contain;
}

.work-content {
  @apply flex-1 flex flex-col gap-4;
}

.work-role {
  @apply text-base font-semibold text-[#B4BCD0];
}

.work-company {
  @apply text-[#B4BCD0] font-semibold text-base;
}

.work-dates {
  @apply text-sm text-[#8491A0] italic;
}

.work-description {
  @apply text-sm text-[#8491A0] leading-relaxed;
}

.work-button{
  @apply w-fit self-center;
}
.work-button-text{
  @apply text-lg text-[#34F487] font-semibold;
}


/* Mobile adjustments */
@media (max-width: 640px) {
  .work-item {
    @apply flex-col;
  }
  
  .work-logo {
    @apply self-start;
  }
}
</style> 
