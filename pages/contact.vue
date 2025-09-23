<script setup lang="ts">
import type { Collections } from '@nuxt/content'
import { ref, reactive } from 'vue'
import { z } from 'zod'
import { contactFormSchema } from '~/utils/contact-validation'

const config = useRuntimeConfig()
const { t, locale } = useI18n()
const { canonical, withDefaults } = useSeo()

const { data: profile } = await useAsyncData('profile_' + locale.value, async () => {
  const collection = ('profile_' + locale.value) as keyof Collections
  return await queryCollection(collection).first() as Collections['profile_en'] | Collections['profile_fi']
}, {
  watch: [locale],
})

const contactInfo = computed(() => {
  return profile.value?.contactInfo
})


type ContactFormData = z.infer<typeof contactFormSchema>

const form = reactive<ContactFormData>({
  fullName: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const errors = ref<Record<string, string>>({})
const isSubmitting = ref(false)
const isSuccess = ref(false)

const validateForm = () => {
  const result = contactFormSchema.safeParse(form)
  
  if (!result.success) {
    errors.value = {}
    result.error.issues.forEach((issue: any) => {
      if (issue.path[0]) {
        errors.value[issue.path[0] as string] = issue.message
      }
    })
    return false
  }
  
  errors.value = {}
  return true
}

const sanitizeContactData = (data: ContactFormData): ContactFormData => {
  return {
    fullName: data.fullName.trim().replace(/\s+/g, ' '),
    email: data.email.trim().toLowerCase(),
    phone: data.phone?.trim().replace(/\s+/g, ''),
    subject: data.subject.trim().replace(/\s+/g, ' '),
    message: data.message.trim()
  }
}

const submitForm = async () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  
  try {
    const sanitizedData = sanitizeContactData(form)
    
    const response = await $fetch('/api/contact', {
      method: 'POST',
      body: sanitizedData
    }) as { success: boolean }
    
    if (response.success) {
      isSuccess.value = true
      Object.assign(form, {
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    }
  } catch (error) {
    console.error('Failed to submit form:', error)
  } finally {
    isSubmitting.value = false
  }
}

const closeSuccessMessage = () => {
  isSuccess.value = false
}



const meetingLink = config.public.meetingLink || '#'

useSeoMeta(withDefaults({
  title: t('contact.title'),
  description: t('contact.subtitle'),
}))
useHead({ link: [{ rel: 'canonical', href: canonical() }] })
</script>

<template>
  <div class="min-h-screen bg-ne text-white">
    <div class="container mx-auto px-4 py-24">
      <div class="max-w-2xl mx-auto">
        <div class="text-center mb-12">
          <h1 class="text-4xl md:text-5xl font-light italic mb-4 font-mono">
            {{ t('contact.title') }}
          </h1>
          <p class="text-gray-400 text-lg">
            {{ t('contact.subtitle') }}
          </p>
        </div>
        
        <div v-if="isSuccess" class="flex items-center justify-between mb-8 p-4 rounded-md bg-green-900/20 border border-green-500 text-green-400">
          <div class="">
            {{ t('contact.success') }}
          </div>
          <button 
            @click="closeSuccessMessage"
            class="text-green-400 hover:text-green-300 transition-colors h-4"
            aria-label="Close success message"
          >
            <Icon name="lucide:x" class="w-5 h-5" />
          </button>
        </div>

        <GradientLine />

        <form @submit.prevent="submitForm" class="space-y-6">
          <div>
            <label class="block text-sm font-medium mb-2">
              {{ t('contact.nameLabel') }} <span class="text-red-500">*</span>
            </label>
            <SInput
              v-model="form.fullName"
              placeholder="John Doe"
              required
              class="bg-zinc-900 border-zinc-700 text-white placeholder-gray-400 focus:border-white"
            />
            <span v-if="errors.fullName" class="text-red-400 text-sm mt-1 block">
              {{ errors.fullName }}
            </span>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">
              {{ t('contact.emailLabel') }} <span class="text-red-500">*</span>
            </label>
            <SInput
              v-model="form.email"
              type="email"
              placeholder="john.doe@gmail.com"
              required
              class="bg-zinc-900 border-zinc-700 text-white placeholder-gray-400 focus:border-white"
            />
            <span v-if="errors.email" class="text-red-400 text-sm mt-1 block">
              {{ errors.email }}
            </span>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Phone</label>
            <SInput
              v-model="form.phone"
              type="tel"
              placeholder="123-456-7890"
              class="bg-zinc-900 border-zinc-700 text-white placeholder-gray-400 focus:border-white"
            />
            <span v-if="errors.phone" class="text-red-400 text-sm mt-1 block">
              {{ errors.phone }}
            </span>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">
              Subject <span class="text-red-500">*</span>
            </label>
            <SInput
              v-model="form.subject"
              placeholder="Subject of your message"
              required
              class="bg-zinc-900 border-zinc-700 text-white placeholder-gray-400 focus:border-white"
            />
            <span v-if="errors.subject" class="text-red-400 text-sm mt-1 block">
              {{ errors.subject }}
            </span>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">
              {{ t('contact.messageLabel') }} <span class="text-red-500">*</span>
            </label>
            <STextarea
              v-model="form.message"
              :placeholder="t('contact.messageLabel')"
              required
              :rows="5"
              class="bg-zinc-900 border-zinc-700 text-white placeholder-gray-400 focus:border-white"
            />
            <span v-if="errors.message" class="text-red-400 text-sm mt-1 block">
              {{ errors.message }}
            </span>
          </div>

          <SButton
            type="submit"
            :disabled="isSubmitting"
            class="w-full bg-white text-black hover:bg-gray-200 py-3"
          >
            {{ isSubmitting ? t('contact.sending') : t('contact.send') }}
          </SButton>
        </form>
        
        <GradientLine />


        <div class="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-start">
         <div class="space-y-4">
           <SButton
            as="a"
            :href="`tel:${contactInfo?.phone}`"
            class="text-gray-400 hover:text-white border border-gray-600 hover:border-gray-400 bg-transparent hover:bg-zinc-800"
          >
            <Icon name="lucide:phone" class="w-4 h-4 mr-2" />
            {{ contactInfo?.phone }}
          </SButton>
          <SButton
            as="a"
            :href="`mailto:${contactInfo?.email}`"
            class="text-gray-400 hover:text-white border border-gray-600 hover:border-gray-400 bg-transparent hover:bg-zinc-800"
          >
            <Icon name="lucide:mail" class="w-4 h-4 mr-2" />
            {{ contactInfo?.email }}
          </SButton>
         </div>
          <SpotlightButton
            as="a"
            :href="meetingLink"
            target="_blank"
            class="min-w-fit h-9"
            :duration="600"
          >
            <div class="relative z-20 flex items-center  text-white w-full ">
              <Icon name="lucide:calendar" class="w-4 h-4 mr-2" />
              Schedule a meeting
            </div>
          </SpotlightButton>
        </div>

         <GradientLine />

      </div>
    </div>
  </div>
</template>
