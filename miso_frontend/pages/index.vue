<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 relative overflow-hidden">

    <!-- Main content -->
    <div class="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
      <!-- Logo/Brand -->
      <div class="mb-8 text-center">
        <h1 class="text-6xl font-bold text-pink-600 mb-2">Miso Days</h1>
        <p class="text-xl text-pink-500 font-light">Your journey begins here</p>
      </div>

      <!-- Welcome message -->
      <div class="text-center mb-12 max-w-2xl">
        <h2 class="text-3xl font-semibold text-gray-800 mb-4">
          Welcome to a World of Possibilities
        </h2>
        <p class="text-lg text-gray-600 leading-relaxed">
           Welcome to Miso Days. Start your day with calm and clear goals. Like cherry blossoms in spring, let your tasks bloom beautifully. Stay organised, feel peaceful, and end each day with gentle joy. 


        </p>
      </div>

      <!-- Get Started Button -->
      <div class="mb-8">
        <NuxtLink 
          to="/auth/login" 
          class="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-pink-600 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
        >
          <span class="relative z-10">Get Started</span>
          <div class="absolute inset-0 bg-gradient-to-r from-pink-600 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </NuxtLink>
      </div>

      <!-- Decorative elements -->
      <div class="flex space-x-4 mt-8">
        <div class="w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
        <div class="w-3 h-3 bg-pink-500 rounded-full animate-pulse" style="animation-delay: 0.2s"></div>
        <div class="w-3 h-3 bg-pink-600 rounded-full animate-pulse" style="animation-delay: 0.4s"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Set page title
useHead({
  title: 'Miso Days - Welcome',
  meta: [
    { name: 'description', content: 'Miso Days is a task management app that helps you stay organized and focused. It is a simple and easy to use app that helps you manage your tasks and goals. The pink theme is inspired by the cherry blossoms in spring.' }
  ],
  meta: [
    { name: 'Author', content: 'Fiona Kasoa' },
  ]
})
</script>

