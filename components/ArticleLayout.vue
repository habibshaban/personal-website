<script setup lang="ts">
const props = defineProps<{ doc: any }>()
const a = computed(() => props.doc?.meta ?? props.doc ?? {})
const route = useRouter()
const formattedDate = computed(() => {
  const d = a.value?.date || props.doc?.date
  if (!d) return ''
  return new Intl.DateTimeFormat('en-US', { year:'numeric', month:'long', day:'numeric' }).format(new Date(d))
})

const progress = ref(0)
onMounted(() => {
  const onScroll = () => {
    const h = document.documentElement
    const max = Math.max(h.scrollHeight - h.clientHeight, 1)
    progress.value = (h.scrollTop / max) * 100
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

const shareUrl = ref('')
onMounted(() => { try { shareUrl.value = location.href } catch (_) {} })

function openShare(network: 'x'|'linkedin'|'facebook'|'copy') {
  if (network === 'copy') {
    toast.success("Link copied to clipboard!")
    return navigator.clipboard?.writeText(shareUrl.value)
  }
  const url = encodeURIComponent(shareUrl.value)
  const text = encodeURIComponent(a.value?.title ?? '')
  const map = {
    x:        `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`
  } as const
  if (process.client) window.open(map[network], '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <article class="bg-black text-white">
    <div class="relative">
      <div class="absolute inset-0 bg-gradient-to-br from-emerald-400/10 via-orange-400/10 to-pink-500/10" />

      <div class="relative mx-auto max-w-6xl px-4 md:px-6 py-10 md:py-14">
        <NuxtLink
          to="#" 
          @click.prevent="route.back()"
          class="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 ring-1 ring-black/0 hover:ring-white/10 transition"
        >
          <div class="flex items-center">
            <Icon name="lucide:arrow-left" class="h-4 w-4" />
          <span class="inline-block size-1 rounded-full bg-white/70 group-hover:bg-white" />
          </div>
          <span class="">Go Back</span>
        </NuxtLink>

        <div class="mt-10 grid items-start gap-10 md:grid-cols-[1fr,420px]">
          <h1 class="text-4xl/[1.1] sm:text-5xl md:text-6xl tracking-tight font-mono">
            {{ props.doc.title }}
          </h1>

          <div class="">
            <p class="text-base text-white/85 leading-relaxed">
              {{ props.doc.description }}
            </p>
          </div>
        </div>
        <div
          class="hero-notch relative mt-8 rounded-[28px] overflow-hidden ring-1 ring-white/10"
          style="--notch-r:56px; --notch-x:220px; --notch-y:0px;"
        >
          <img
            :src="a.cover || '/images/article-cover.png'"
            :alt="a.title"
            class="h-[460px] w-full object-cover lg:object-contain object-top"
          />

          <div class="absolute left-0 top-0 translate-x-2 translate-y-2 sm:translate-y-[1px] flex items-center gap-3 rounded-[999px] bg-black/50 backdrop-blur px-3 py-2 ring-1 ring-white/15">
            <img
              :src="a.author?.avatar || '/images/habib.jpeg'"
              :alt="a.author?.name || 'Author'"
              class="h-10 w-10 rounded-full object-cover ring-1 ring-white/20"
            />
            <div class="pr-1">
              <div class="text-sm font-medium">{{ a.author?.name || 'Habib Shaban' }}</div>
              <div class="text-xs text-white/70">{{ a.author?.role || 'Sr Full Stack Developer' }}</div>
            </div>
          </div>
          <div class="absolute bottom-0 sm:bottom-auto right-0 sm:top-0 -translate-x-4 sm:translate-x-0 -translate-y-4 sm:translate-y-4 flex flex-wrap items-center gap-3">
              <span v-if="a.type || props.doc.type"
                class="px-3 py-1.5 text-xs font-medium rounded-full bg-white/10 border border-white/20 backdrop-blur">
                {{ a.type || props.doc.type }} 
              </span>
              <span v-if="props.doc.date || a.date"
                class="px-3 py-1.5 text-xs font-medium rounded-full bg-white/10 border border-white/20 backdrop-blur">
                {{ formattedDate }} 
              </span>
            </div>
        </div>

        <div class="flex items-baseline justify-between w-full gap-16">
          <div class="mt-6 flex-1 flex items-center gap-4 rounded-full border border-white/10 px-4 py-3">
          <div class="flex items-center gap-2 text-white/80">
            <Icon name="lucide:clock" class="h-4 w-4" />
            <span class="text-sm">{{ props.doc.readingTime ?? '—' }} min read</span>
          </div>
          <div class="relative h-2 flex-1 rounded-full bg-white overflow-hidden">
            <div class="absolute inset-y-0 left-0 rounded-full bg-emerald-400" :style="{ width: progress + '%' }" />
          </div>
        </div>
        <div v-if="a.tags?.length" class="mt-12 flex flex-wrap gap-2">
          <span v-for="t in a.tags" :key="t"
            class="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-sm">
            #{{ t }}
          </span>
        </div>
        </div>

        <div class="mt-10 flex flex-col sm:flex-row gap-10">
          <div class="flex-1 prose prose-invert prose-lg max-w-none">
            <ContentRenderer v-if="doc?.body" :value="props.doc" />
          </div>

          <aside class="w-18 flex-shrink-0">
            <div class="sticky top-1/4 flex sm:flex-col items-center sm:items-center gap-6 w-full">
              <div class="text-lg text-[#F6F6F6] hidden sm:block">Share</div>
              <div class="w-full flex items-center justify-between sm:flex-col gap-3">
                <button @click="openShare('facebook')" class="share-btn" aria-label="Share on Facebook">
                  <Icon name="lucide:facebook" class="h-5 w-5 text-[#5A5A59]" />
                </button>
                <button @click="openShare('x')" class="share-btn" aria-label="Share on X">
                  <Icon name="lucide:twitter" class="h-5 w-5 text-[#5A5A59]" />
                </button>
                <button @click="openShare('linkedin')" class="share-btn" aria-label="Share on LinkedIn">
                  <Icon name="lucide:linkedin" class="h-5 w-5 text-[#5A5A59]" />
                </button>
                <button @click="openShare('copy')" class="share-btn" aria-label="Copy link">
                  <Icon name="lucide:link" class="h-5 w-5 text-[#5A5A59]" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </article>
  <ScrollToTop />
</template>

<style scoped>
.share-btn {
  @apply inline-flex items-center justify-center rounded-full border border-white/15 bg-white w-16 h-16 hover:bg-white/90 transition;
}

.hero-notch {
  -webkit-mask:
    radial-gradient(var(--notch-r) var(--notch-r) at var(--notch-x) var(--notch-y), transparent 98%, transparent 99%) ,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask:
    radial-gradient(var(--notch-r) var(--notch-r) at var(--notch-x) var(--notch-y), transparent 98%, transparent 99%) ,
    linear-gradient(#000 0 0);
  mask-composite: exclude;
}
</style>
