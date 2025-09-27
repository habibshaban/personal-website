<template>
  <div class="min-h-screen flex flex-col bg-brandBackground relative">
    <LanguageToggle class="fixed right-4 z-50 top-4" />
    <Navbar class="fixed bottom-0 z-50 flex sm:bottom-auto sm:top-0"/>
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </div>
</template>
