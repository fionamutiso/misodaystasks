<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
// Global app setup
const { initAuth } = useAuth()

// Initialize authentication on app start
onMounted(() => {
  initAuth()
})
</script>

<style>
@import "tailwindcss";
</style>
