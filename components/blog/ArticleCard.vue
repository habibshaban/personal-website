<template>
  <nuxt-link 
    :to="article.link"
    class="group relative block rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-400 via-orange-400 to-pink-500 p-[1px] transition-transform hover:scale-[1.02]"
  >
    <div class="relative h-full rounded-2xl bg-black/90 backdrop-blur-sm overflow-hidden">
      <div class="relative h-64 overflow-hidden">
        <img 
          :src="article.image" 
          :alt="article.title"
          class="absolute inset-0 w-full h-full object-cover opacity-80"
          style="clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%)"
        />
        <div class="absolute inset-0 bg-gradient-to-br from-emerald-400/20 via-orange-400/20 to-pink-500/20" 
             style="clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%)"></div>
      </div>
      
      <div class="relative p-6 -mt-12 z-10">
        <div class="flex items-center gap-3 mb-4">
          <img 
            :src="article.author?.avatar || '/images/avatar.png'" 
            :alt="article.author?.name || 'Author'"
            class="w-8 h-8 rounded-full border-2 border-white/20"
          />
          <div class="text-sm">
            <div class="text-white font-medium">{{ article.author?.name || 'Habib Shaban' }}</div>
            <div class="text-gray-400">{{ article.author?.role || 'Sr Full Stack Developer' }}</div>
          </div>
        </div>

        <div class="flex gap-2 mb-3">
          <span 
            v-if="article.type"
            class="px-3 py-1 text-xs font-medium bg-white/10 text-white rounded-full border border-white/20"
          >
            {{ article.type }}
          </span>
          <span 
            v-if="article.readingTime"
            class="px-3 py-1 text-xs font-medium bg-white/10 text-white rounded-full border border-white/20"
          >
            {{ article.readingTime }} min read
          </span>
        </div>

        <h3 class="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
          {{ article.title }}
        </h3>
        
        <p class="text-gray-300 text-sm mb-4 line-clamp-2">
          {{ article.description }}
        </p>

        <div class="flex items-center justify-between">
          <time class="text-xs text-gray-400">
            {{ formatDate(article.date) }}
          </time>
          <div class="flex gap-1">
            <span 
              v-for="tag in article.tags?.slice(0, 2)" 
              :key="tag"
              class="px-2 py-1 text-xs bg-emerald-500/20 text-emerald-300 rounded"
            >
              #{{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script setup>
defineProps({
  article: {
    type: Object,
    required: true
  }
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
