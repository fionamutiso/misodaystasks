<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-pink-900 relative overflow-hidden">

     <div class="absolute top-0 left-0 w-72 h-72 bg-pink-500 dark:bg-pink-600 rounded-full opacity-30 blur-3xl"></div>
    <div class="absolute bottom-0 right-0 w-72 h-72 bg-pink-500 dark:bg-pink-600 rounded-full opacity-30 blur-3xl"></div>
    <div class="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500 dark:bg-pink-600 rounded-full opacity-20 blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>

    <!-- Header -->
    <header class="relative z-10 bg-white dark:bg-gray-800/80 backdrop-blur-sm border-b border-pink-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center">
              <span class="text-white font-bold text-sm">M</span>
            </div>
            <h1 class="text-2xl font-bold text-pink-600 dark:text-pink-400">Miso Days</h1>
          </div>
          
          <div class="flex items-center space-x-4">
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
      <!-- Page Header -->
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">Your Tasks</h2>
        <p class="text-gray-600 dark:text-gray-400">Stay organized and focused on what matters</p>
      </div>

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

      <!-- Add Task Form -->
      <div class="bg-white dark:bg-gray-800/80 rounded-2xl shadow-xl border border-pink-100 dark:border-gray-700 p-6 mb-8">
        <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Add New Task</h3>
        <form @submit.prevent="addTodo" class="space-y-4">
          <div class="flex gap-4">
            <input
              v-model="newTodo"
              type="text"
              placeholder="What needs to be done?"
              class="flex-1 px-4 py-3 border border-pink-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              required
            />
            <button
              type="submit"
              :disabled="!newTodo.trim()"
              class="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>

      <!-- Tasks List -->
      <div class="bg-white dark:bg-gray-800/80 rounded-2xl shadow-xl border border-pink-100 dark:border-gray-700 overflow-hidden">
        <div class="p-6 border-b border-pink-100 dark:border-gray-700">
          <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200">Your Tasks</h3>
        </div>
        
        <div v-if="todos.length === 0" class="p-8 text-center">
          <svg class="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
          <p class="text-gray-500 dark:text-gray-400 text-lg">No tasks yet. Add your first task above!</p>
        </div>
        
        <div v-else class="divide-y divide-pink-100 dark:divide-gray-700">
          <div
            v-for="todo in paginatedTodos"
            :key="todo.id"
            class="p-6 hover:bg-pink-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <button
                  @click="toggleTodo(todo.id)"
                  class="flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center"
                  :class="todo.completed 
                    ? 'border-green-500 bg-green-500 text-white' 
                    : 'border-pink-300 dark:border-gray-500 hover:border-pink-500 dark:hover:border-pink-400'"
                >
                  <svg v-if="todo.completed" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
                
                <div class="flex-1">
                  <p 
                    class="text-lg font-medium transition-all duration-200"
                    :class="todo.completed 
                      ? 'text-gray-500 dark:text-gray-400 line-through' 
                      : 'text-gray-800 dark:text-gray-200'"
                  >
                    {{ todo.text }}
                  </p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    Created {{ formatDate(todo.createdAt) }}
                  </p>
                </div>
              </div>
              
              <button
                @click="deleteTodo(todo.id)"
                class="flex-shrink-0 w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 hover:bg-pink-200 dark:hover:bg-pink-900/40 transition-colors duration-200 flex items-center justify-center"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Pagination -->
        <div v-if="totalPages > 1" class="p-4 border-t border-pink-100 dark:border-gray-700">
          <div class="flex items-center justify-center space-x-2">
            <button
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-3 py-1 text-sm rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              :class="currentPage === 1 
                ? 'text-gray-400 dark:text-gray-500' 
                : 'text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20'"
            >
              Previous
            </button>
            
            <span class="text-sm text-gray-600 dark:text-gray-400">
              {{ currentPage }} of {{ totalPages }}
            </span>
            
            <button
              @click="goToPage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-3 py-1 text-sm rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              :class="currentPage === totalPages 
                ? 'text-gray-400 dark:text-gray-500' 
                : 'text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20'"
            >
              Next
            </button>
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
const { logout } = useAuth()

// Todo data
const todos = ref([])
const newTodo = ref('')

// Pagination state
const currentPage = ref(1)
const itemsPerPage = 8

// Computed properties
const completedTodos = computed(() => todos.value.filter(todo => todo.completed))
const pendingTodos = computed(() => todos.value.filter(todo => !todo.completed))

// Pagination computed properties
const totalPages = computed(() => Math.ceil(todos.value.length / itemsPerPage))
const paginatedTodos = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return todos.value.slice(start, end)
})

// Load todos from localStorage
const loadTodos = () => {
  if (process.client) {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      todos.value = JSON.parse(savedTodos)
    }
  }
}

// Save todos to localStorage
const saveTodos = () => {
  if (process.client) {
    localStorage.setItem('todos', JSON.stringify(todos.value))
  }
}

// Add new todo
const addTodo = () => {
  if (!newTodo.value.trim()) return
  
  const todo = {
    id: Date.now(),
    text: newTodo.value.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  }
  
  todos.value.unshift(todo)
  newTodo.value = ''
  saveTodos()
  // Reset to first page when adding new task
  currentPage.value = 1
}

// Toggle todo completion
const toggleTodo = (id) => {
  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.completed = !todo.completed
    saveTodos()
  }
}

// Delete todo
const deleteTodo = (id) => {
  todos.value = todos.value.filter(t => t.id !== id)
  saveTodos()
  // Reset to first page if current page becomes empty
  if (currentPage.value > totalPages.value && totalPages.value > 0) {
    currentPage.value = totalPages.value
  }
}

// Pagination methods
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// Format date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Handle logout
const handleLogout = async () => {
  await logout()
}

// Load todos on mount
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
  background: linear-gradient(135deg, #f0b2d4 0%, #f5f4f4 50%, #f7b2d9 100%);
}

.dark .bg-gradient-to-br {
  background: linear-gradient(135deg, #1f2937 0%, #111827 50%, #1f2937 100%);
}
</style>