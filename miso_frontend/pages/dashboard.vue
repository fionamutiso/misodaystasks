<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 relative overflow-hidden">

     <div class="absolute top-0 left-0 w-72 h-72 bg-pink-500 rounded-full opacity-30 blur-3xl"></div>
    <div class="absolute bottom-0 right-0 w-72 h-72 bg-pink-500 rounded-full opacity-30 blur-3xl"></div>
    <div class="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500 rounded-full opacity-20 blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>

    <!-- Header -->
    <header class="relative z-10 bg-white/80 backdrop-blur-sm border-b border-pink-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center">
              <span class="text-white font-bold text-sm">M</span>
            </div>
            <h1 class="text-2xl font-bold text-pink-600">Miso Days</h1>
          </div>
          
          <div class="flex items-center space-x-4">
            <span class="text-gray-600">Welcome, {{ user.name || 'User' }}</span>
            <button
              @click="handleLogout"
              class="text-pink-600 hover:text-pink-700 transition-colors duration-200"
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
      <!-- Welcome Section -->
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-2">Your To-Do List</h2>
        <p class="text-gray-600">Organize your day with beautiful cherry blossom vibes</p>
      </div>

      <!-- Add New Todo -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-pink-100">
        <form @submit.prevent="addTodo" class="flex gap-4">
          <div class="flex-1">
            <input
              v-model="newTodo"
              type="text"
              placeholder="What would you like to accomplish today?"
              class="w-full px-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
              required
            />
          </div>
          <button
            type="submit"
            class="bg-pink-500  text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transform hover:scale-105 transition-all duration-300"
          >
            Add Task
          </button>
        </form>
      </div>

      <!-- Todo Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-pink-100 text-center">
          <div class="text-3xl font-bold text-pink-600">{{ totalTodos }}</div>
          <div class="text-gray-600">Total Tasks</div>
        </div>
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-pink-100 text-center">
          <div class="text-3xl font-bold text-pink-600">{{ completedTodos }}</div>
          <div class="text-gray-600">Completed</div>
        </div>
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-pink-100 text-center">
          <div class="text-3xl font-bold text-pink-600">{{ pendingTodos }}</div>
          <div class="text-gray-600">Pending</div>
        </div>
      </div>

      <!-- Todo List -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-pink-100 overflow-hidden">
        <div class="p-6 border-b border-pink-100">
          <h3 class="text-xl font-semibold text-gray-800">Your Tasks</h3>
        </div>
        
        <div v-if="todos.length === 0" class="p-8 text-center">
          <div class="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </div>
          <p class="text-gray-500">No tasks yet.</p>
        </div>
        
        <div v-else class="divide-y divide-pink-100">
          <div
            v-for="todo in todos"
            :key="todo.id"
            class="p-6 hover:bg-pink-50/50 transition-colors duration-200"
          >
            <div class="flex items-center space-x-4">
              <button
                @click="toggleTodo(todo.id)"
                class="flex-shrink-0"
              >
                <div
                  :class="[
                    'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200',
                    todo.completed
                      ? 'bg-pink-500 border-pink-500'
                      : 'border-pink-300 hover:border-pink-400'
                  ]"
                >
                  <svg
                    v-if="todo.completed"
                    class="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </button>
              
              <div class="flex-1 min-w-0">
                <p
                  :class="[
                    'text-lg transition-all duration-200',
                    todo.completed
                      ? 'text-gray-400 line-through'
                      : 'text-gray-800'
                  ]"
                >
                  {{ todo.text }}
                </p>
                <p class="text-sm text-gray-500 mt-1">
                  Created {{ formatDate(todo.createdAt) }}
                </p>
              </div>
              
              <button
                @click="deleteTodo(todo.id)"
                class="flex-shrink-0 text-gray-400 hover:text-pink-500 transition-colors duration-200"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
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
    { name: 'description', content: 'Manage your tasks with Miso Days' }
  ]
})

// Auth composable
const { user, logout } = useAuth()

// Todo state
const todos = ref([])
const newTodo = ref('')

// Computed properties
const totalTodos = computed(() => todos.value.length)
const completedTodos = computed(() => todos.value.filter(todo => todo.completed).length)
const pendingTodos = computed(() => todos.value.filter(todo => !todo.completed).length)

// Add new todo
const addTodo = () => {
  if (newTodo.value.trim()) {
    const todo = {
      id: Date.now(),
      text: newTodo.value.trim(),
      completed: false,
      createdAt: new Date()
    }
    todos.value.unshift(todo)
    newTodo.value = ''
    
    // Save to localStorage
    saveTodos()
  }
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
}

// Save todos to localStorage
const saveTodos = () => {
  localStorage.setItem('miso-todos', JSON.stringify(todos.value))
}

// Load todos from localStorage
const loadTodos = () => {
  const saved = localStorage.getItem('miso-todos')
  if (saved) {
    todos.value = JSON.parse(saved)
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
</style> 