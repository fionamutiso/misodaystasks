<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-pink-900 relative overflow-hidden">

    <!-- Header -->
    <header class="relative z-10 bg-white dark:bg-gray-800/80 backdrop-blur-sm border-b border-pink-200 dark:border-gray-700">
      <div class="w-full px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center">
              <span class="text-white font-bold text-sm">M</span>
            </div>
            <h1 class="text-2xl font-bold text-pink-600 dark:text-pink-400">Miso Days</h1>
          </div>
          
          <div class="flex items-center space-x-4">
            <NuxtLink 
              to="/tasks"
              class="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-200"
            >
              Tasks
            </NuxtLink>
            <NuxtLink 
              to="/profile"
              class="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-200"
            >
              Profile
            </NuxtLink>
            <button
              @click="handleLogout"
              class="text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition-colors duration-200"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="relative z-10 max-w-4xl mx-auto px-4 py-8">
      <!-- User Greeting -->
      <ClientOnly>
        <div v-if="user && user.name" class="text-left mb-4">
          <h2 class="text-2xl font-semibold text-pink-700 dark:text-pink-400">Hello, {{ user.name }}!</h2>
        </div>
      </ClientOnly>
      <!-- Removed page header as requested -->
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white dark:bg-gray-800/80 rounded-2xl shadow-xl border border-pink-100 dark:border-gray-700 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tasks</p>
              <p class="text-3xl font-bold text-pink-600 dark:text-white">{{ todos.length }}</p>
            </div>
            <div class="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
          </div>
        </div>
        <div class="bg-white dark:bg-gray-800/80 rounded-2xl shadow-xl border border-pink-100 dark:border-gray-700 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
              <p class="text-3xl font-bold text-pink-600 dark:text-white">{{ completedTodos.length }}</p>
            </div>
            <div class="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
        </div>
        <div class="bg-white dark:bg-gray-800/80 rounded-2xl shadow-xl border border-pink-100 dark:border-gray-700 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
              <p class="text-3xl font-bold text-pink-600 dark:text-white">{{ pendingTodos.length }}</p>
            </div>
            <div class="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// Set page title
useHead({
  title: 'Dashboard - Miso Days',
  meta: [
    { name: 'description', content: 'Manage your tasks and stay organized with Miso Days' }
  ]
})
// Composables
import { useAuth } from '~/composables/useAuth'
const { logout, user } = useAuth()
// Todo data for stats only
const todos = ref([])
const completedTodos = computed(() => todos.value.filter(todo => todo.completed))
const pendingTodos = computed(() => todos.value.filter(todo => !todo.completed))
// Load todos from localStorage for stats
const loadTodos = () => {
  if (process.client) {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      todos.value = JSON.parse(savedTodos)
    }
  }
}
onMounted(() => {
  loadTodos()
})
definePageMeta({
  middleware: ['auth']
})
</script>

<style scoped>
/* background nini= atee */
.bg-gradient-to-br {
  background: linear-gradient(135deg,#e6dbe1 0%, #ddc4d6 50%, #e768b0 100%);
}

.dark .bg-gradient-to-br {
  background: linear-gradient(135deg,  #33162e 0%, #140413 50%, #4e013e 100%);

}
</style>