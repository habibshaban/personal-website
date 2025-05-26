<template>
  <div class="min-h-screen flex flex-col bg-brandBackground relative">
    <div class="w-full h-[1px] absolute top-20" style="background-image: linear-gradient(to right, rgb(87 87 88), transparent, rgb(87 87 88));"></div>
    <div class="w-[1px] h-full absolute top-0 left-16" style="background-image: linear-gradient(to bottom, rgb(87 87 88), transparent 50%, rgb(87 87 88));"></div>
    <div class="w-[1px] h-full absolute top-0 left-36" style="background-image: linear-gradient(to bottom, rgb(87 87 88), transparent 50%, rgb(87 87 88));"></div>
    <div class="w-[1px] h-full absolute top-0 right-16" style="background-image: linear-gradient(to bottom, rgb(87 87 88), transparent 50%, rgb(87 87 88));"></div>
    <div class="w-[1px] h-full absolute top-0 right-36" style="background-image: linear-gradient(to bottom, rgb(87 87 88), transparent 50%, rgb(87 87 88));"></div>
    <Navbar class="fixed bottom-0 z-50 flex sm:bottom-auto sm:top-0"/>
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from "~/components/layout/Navbar.vue";
import Footer from "~/components/layout/Footer.vue";
</script>
