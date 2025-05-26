<template>
  <div class="min-h-screen flex flex-col bg-brandBackground relative">
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
