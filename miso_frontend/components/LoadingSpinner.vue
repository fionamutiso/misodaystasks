<template>
  <div class="flex items-center justify-center">
    <div class="relative">
      <!-- Outer ring -->
      <div class="w-8 h-8 border-4 border-pink-200 rounded-full animate-spin"></div>
      <!-- Inner ring -->
      <div class="absolute top-0 left-0 w-8 h-8 border-4 border-transparent border-t-pink-500 rounded-full animate-spin"></div>
      <!-- Center dot -->
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-pink-500 rounded-full"></div>
    </div>
    <span v-if="text" class="ml-3 text-pink-600 font-medium">{{ text }}</span>
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: ''
  }
})
</script> 