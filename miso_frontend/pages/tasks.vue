<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-pink-900 relative overflow-hidden" :inert="showAddTaskModal ? true : null">
    <main class="relative z-10 max-w-6xl mx-auto px-4 py-8">
      <!-- Page Header -->
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold !text-pink-400 dark:text-gray-200 mb-2">Your Tasks</h2>
        <p class="text-gray-600 dark:text-gray-400">Stay organized and focused on what matters</p>
      </div>

      <!-- Calendar Section -->
      <div class="mb-6">
        <!-- Calendar Header -->
        <div class="flex items-center justify-between mb-8">
          <button
            @click="previousMonth"
            class="p-2 rounded-xl hover:bg-pink-50 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-pink-500 focus-visible:outline-offset-2"
          >
            <svg class="w-5 h-5 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200">
            {{ currentMonthYear }}
          </h3>
          <button
            @click="nextMonth"
            class="p-2 rounded-xl hover:bg-pink-50 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-pink-500 focus-visible:outline-offset-2"
          >
            <svg class="w-5 h-5 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>

        <!-- Date Navigation Row -->
        <div class="flex items-center justify-center space-x-2 mb-6">
          <button
            @click="previousDay"
            class="group p-3 rounded-xl hover:bg-pink-50 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-pink-500 focus-visible:outline-offset-2"
          >
            <svg class="w-5 h-5 text-pink-600 dark:text-pink-400 group-hover:text-pink-700 dark:group-hover:text-pink-300 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          
          <!-- 5 Date Cards -->
          <div class="flex items-center space-x-1">
            <div
              v-for="(date, index) in visibleDates"
              :key="date.toISOString()"
              @click="selectDate(date)"
              class="relative group cursor-pointer transition-all duration-500"
              :class="getDateCardClasses(date, index)"
            >
              <!-- Background morphing effect -->
              <div 
                class="absolute inset-0 bg-gradient-to-br from-pink-100 to-rose-100 dark:from-gray-700 dark:to-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100"
                :class="currentDate.toISOString().split('T')[0] === date.toISOString().split('T')[0] ? 'opacity-100 scale-100' : ''"
              ></div>
              
              <!-- Date card content -->
              <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-pink-200 dark:border-gray-600 transition-all duration-300">
                <div class="text-center">
                  <div class="text-2xl font-bold transition-colors duration-300"
                       :class="currentDate.toLocaleDateString('en-CA') === date.toLocaleDateString('en-CA') 
                         ? 'text-pink-600 dark:text-pink-400' 
                         : 'text-gray-600 dark:text-gray-400'">
                    {{ date.getDate() }}
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {{ date.toLocaleDateString('en-US', { weekday: 'short' }) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <button
            @click="nextDay"
            class="group p-3 rounded-xl hover:bg-pink-50 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-pink-500 focus-visible:outline-offset-2"
          >
            <svg class="w-5 h-5 text-pink-600 dark:text-pink-400 group-hover:text-pink-700 dark:group-hover:text-pink-300 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>

        <!-- Today Button -->
        <div class="text-center">
            <button
              @click="goToToday"
              class="group px-6 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-pink-500 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span class="flex items-center justify-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span>Go to Today</span>
              </span>
            </button>
        </div>
      </div>

      <!-- Selected Date Tasks -->
      <div class="relative">
        <!-- Tasks container -->
        <div class="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-xl border border-pink-100/50 dark:border-gray-700/50 p-8 sm:p-6 mb-8 overflow-hidden">
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-8">
              <h3 class="text-2xl sm:text-xl font-bold text-gray-800 dark:text-gray-200 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Tasks for {{ formatSelectedDate }}
              </h3>
              <div class="flex items-center space-x-3">
                <span class="text-sm text-gray-500 dark:text-gray-400 font-medium">{{ selectedDateTasks.length }} tasks</span>
                <button
                  @click="openAddTaskModal"
                  class="w-8 h-8 bg-pink-500 hover:bg-pink-600 text-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-pink-500 focus-visible:outline-offset-2 shadow-lg hover:shadow-xl"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Priority Filter -->
            <div class="flex items-center gap-2 mb-4 justify-center">
              <button
                v-for="prio in priorityOptions"
                :key="prio"
                @click="priorityFilter = prio"
                class="px-3 py-1 rounded-full font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-pink-400 focus-visible:outline-offset-2 text-xs"
                :class="[
                  priorityFilter === prio
                    ? 'bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-200 shadow-sm'
                    : 'bg-white/60 dark:bg-gray-800/40 text-gray-400 dark:text-gray-500',
                ]"
              >
                <span class="ml-0.5">{{ prio }}</span>
              </button>
            </div>

            <!-- Tasks for Selected Date -->
            <div v-if="selectedDateTasks.length === 0" class="text-center py-12">
              <div class="w-24 h-24 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-12 h-12 text-pink-500 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <p class="text-gray-500 dark:text-gray-400 text-lg font-medium">No tasks for this date.</p>
              <p class="text-gray-400 dark:text-gray-500 text-sm mt-2">Start planning your day to stay organized</p>
            </div>
            
            <!-- Tasks display -->
            <div v-else class="relative">
              <!-- Scrollable container for tasks -->
              <div 
                class="space-y-3"
                :class="selectedDateTasks.length >= 8 ? 'max-h-96 overflow-y-auto pr-2' : ''"
              >
                <div
                  v-for="(todo, index) in filteredTasksByPriority"
                  :key="todo.id"
                  class="relative group"
                >
                  <!-- Task card -->
                  <div class="p-3 bg-pink-50/80 dark:bg-pink-900/20 backdrop-blur-sm rounded-lg border border-pink-200/50 dark:border-gray-600/50 hover:bg-pink-100/80 dark:hover:bg-pink-900/40 transition-all duration-300 hover:shadow-lg group-hover:border-pink-300/70 dark:group-hover:border-pink-400/70">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center space-x-3 flex-1">
                        <button
                          @click="toggleTodo(todo.id)"
                          class="flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-300 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-pink-500 focus-visible:outline-offset-2"
                          :class="todo.completed 
                            ? 'border-green-500 bg-green-500 text-white shadow-lg' 
                            : 'border-pink-300 dark:border-gray-500 hover:border-pink-500 dark:hover:border-pink-400 hover:shadow-md'"
                        >
                          <svg v-if="todo.completed" class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                          </svg>
                        </button>
                        
                        <!-- Task Text (Editable) -->
                        <div class="flex-1">
                          <div v-if="editingTodoId === todo.id" class="flex items-center space-x-2">
                            <input
                              v-model="editingTodoText"
                              @keyup.enter="saveTodoEdit"
                              @keyup.esc="cancelTodoEdit"
                              @blur="saveTodoEdit"
                              type="text"
                              class="flex-1 px-3 py-1 border border-pink-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm focus-visible:outline-2 focus-visible:outline-pink-500 focus-visible:outline-offset-2"
                              ref="editInput"
                            />
                            <button
                              @click="saveTodoEdit"
                              class="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 text-sm focus-visible:outline-2 focus-visible:outline-green-500 focus-visible:outline-offset-2"
                            >
                              Save
                            </button>
                            <button
                              @click="cancelTodoEdit"
                              class="px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200 text-sm focus-visible:outline-2 focus-visible:outline-gray-500 focus-visible:outline-offset-2"
                            >
                              Cancel
                            </button>
                          </div>
                          <div v-else class="flex flex-col gap-1">
                            <div class="flex items-center space-x-2">
                              <p 
                                class="text-base font-medium transition-all duration-200 cursor-pointer hover:text-pink-600 dark:hover:text-pink-400"
                                :class="todo.completed 
                                  ? 'text-gray-500 dark:text-gray-400 line-through' 
                                  : 'text-gray-800 dark:text-gray-200'"
                                @click="startTodoEdit(todo)"
                              >
                                {{ todo.text }}
                              </p>
                              <button
                                @click="startTodoEdit(todo)"
                                class="text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-200 opacity-0 group-hover:opacity-100 focus-visible:outline-2 focus-visible:outline-pink-500 focus-visible:outline-offset-2"
                              >
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                              </button>
                            </div>
                            <div class="flex flex-wrap items-center gap-2 text-xs mt-1">
                              <span class="px-2 py-0.5 rounded bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300 font-semibold">{{ todo.category }}</span>
                              <span class="px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 font-semibold">{{ todo.priority }}</span>
                            </div>
                          </div>
                          <!-- Time display with enhanced styling -->
                          <div class="flex items-center space-x-2 mt-1">
                            <div class="w-1.5 h-1.5 bg-pink-400 rounded-full"></div>
                            <p class="text-xs font-medium text-pink-600 dark:text-pink-400">
                              {{ formatTime(todo.createdAt) }}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <button
                        @click="deleteTodo(todo.id)"
                        class="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/40 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100 focus-visible:outline-2 focus-visible:outline-red-500 focus-visible:outline-offset-2"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>


        <!-- Add Task Modal -->
      <div v-if="showAddTaskModal" class="fixed inset-0 flex items-center justify-center z-50" aria-modal="true" role="dialog" tabindex="-1" @click="closeAddTaskModal">
        <!-- Opaque background overlay -->
        <div class="absolute inset-0" style="background: rgba(0,0,0,0.5);"></div>
        <div class="relative bg-white dark:bg-gray-800/90 rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 border border-pink-100 dark:border-gray-700" @click.stop>
          <div class="mb-4">
            <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200">
              Add Task for {{ formatSelectedDate }}
            </h3>
          </div>

          <!-- Add Task Form -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Task Description</label>
              <input
                v-model="addTaskText"
                type="text"
                placeholder="Enter task description..."
                class="w-full px-4 py-3 border border-pink-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus-visible:outline-2 focus-visible:outline-pink-500 focus-visible:outline-offset-2"
                @keyup.enter="addTask"
                ref="addTaskInput"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
              <select
                v-model="addTaskCategory"
                class="w-full px-4 py-3 border border-pink-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus-visible:outline-2 focus-visible:outline-pink-500 focus-visible:outline-offset-2"
              >
                <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
              <select
                v-model="addTaskPriority"
                class="w-full px-4 py-3 border border-pink-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus-visible:outline-2 focus-visible:outline-pink-500 focus-visible:outline-offset-2"
              >
                <option v-for="prio in priorities" :key="prio" :value="prio">{{ prio }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Time</label>
              <input
                v-model="addTaskTime"
                type="time"
                class="w-full px-4 py-3 border border-pink-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus-visible:outline-2 focus-visible:outline-pink-500 focus-visible:outline-offset-2"
              />
            </div>
            <div class="flex space-x-3 pt-4">
              <button
                @click="addTask"
                :disabled="!addTaskText.trim()"
                class="flex-1 bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-pink-500 focus-visible:outline-offset-2"
              >
                Add Task
              </button>
              <button
                @click="closeAddTaskModal"
                class="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-gray-500 focus-visible:outline-offset-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
</template>

<script setup>
// Set page title
useHead({
  title: 'Tasks - Miso Days',
  meta: [
    { name: 'description', content: 'Manage your tasks and stay organized with Miso Days' }
  ]
})

// Todo data
const todos = ref([])

// Calendar state
const currentDate = ref(new Date())

// Editing state
const editingTodoId = ref(null)
const editingTodoText = ref('')



// Add task modal state
const showAddTaskModal = ref(false)
const addTaskText = ref('')
const addTaskTime = ref('')
const addTaskCategory = ref('Personal')
const addTaskPriority = ref('Medium')
const categories = [
  'Personal',
  'Work',
  'Learning',
  'Selfcare',
  'Social'
]
const priorities = [
  'High',
  'Medium',
  'Low'
]

// Priority filter state
const priorityFilter = ref('All')
const priorityOptions = ['All', 'High', 'Medium', 'Low']

// Filtered tasks by selected priority
const filteredTasksByPriority = computed(() => {
  if (priorityFilter.value === 'All') return sortedTasksByTime.value
  return sortedTasksByTime.value.filter(task => task.priority === priorityFilter.value)
})

// Computed properties
const currentMonthYear = computed(() => {
  return currentDate.value.toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  })
})

const selectedDateTasks = computed(() => {
  const currentDateString = currentDate.value.toLocaleDateString('en-CA') // YYYY-MM-DD format
  
  return todos.value
    .filter(todo => {
      const todoDate = new Date(todo.createdAt)
      const todoDateString = todoDate.toLocaleDateString('en-CA') // YYYY-MM-DD format
      return todoDateString === currentDateString
    })
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
})

const formatSelectedDate = computed(() => {
  return currentDate.value.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const visibleDates = computed(() => {
  const dates = []
  const current = new Date(currentDate.value)
  
  // Get 2 days before current date
  for (let i = -2; i <= 2; i++) {
    const date = new Date(current)
    date.setDate(current.getDate() + i)
    dates.push(date)
  }
  
  return dates
})

const sortedTasksByTime = computed(() => {
  return selectedDateTasks.value.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
});



// Methods
const loadTodos = () => {
  if (process.client) {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      todos.value = JSON.parse(savedTodos)
    }
  }
}

const saveTodos = () => {
  if (process.client) {
    localStorage.setItem('todos', JSON.stringify(todos.value))
  }
}

const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

const previousDay = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), currentDate.value.getDate() - 1)
}

const nextDay = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), currentDate.value.getDate() + 1)
}

const goToToday = () => {
  currentDate.value = new Date()
}

const goToYesterday = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), currentDate.value.getDate() - 1)
}

const goToTomorrow = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), currentDate.value.getDate() + 1)
}

const selectDate = (date) => {
  currentDate.value = date
}

const getDateCardClasses = (date, index) => {
  const currentDateString = currentDate.value.toLocaleDateString('en-CA')
  const dateString = date.toLocaleDateString('en-CA')
  const todayString = new Date().toLocaleDateString('en-CA')
  
  const isSelected = currentDateString === dateString
  const isToday = dateString === todayString
  const isPreviousMonth = date.getMonth() < currentDate.value.getMonth()
  const isNextMonth = date.getMonth() > currentDate.value.getMonth()

  let classes = []
  if (isSelected) {
    classes.push('border-pink-500 dark:border-pink-400')
    classes.push('bg-pink-100 dark:bg-pink-900/20')
    classes.push('shadow-lg')
    classes.push('hover:shadow-xl')
    classes.push('transform')
    classes.push('hover:scale-105')
  } else if (isToday) {
    classes.push('border-pink-300 dark:border-pink-500')
    classes.push('hover:border-pink-500 dark:hover:border-pink-400')
  } else {
    classes.push('border-pink-200 dark:border-gray-600')
    classes.push('hover:border-pink-300 dark:hover:border-pink-400')
  }

  if (isPreviousMonth) {
    classes.push('opacity-50')
    classes.push('cursor-not-allowed')
  }
  if (isNextMonth) {
    classes.push('opacity-50')
    classes.push('cursor-not-allowed')
  }

  return classes.join(' ')
}

const startTodoEdit = (todo) => {
  editingTodoId.value = todo.id
  editingTodoText.value = todo.text
  nextTick(() => {
    if (editInput.value) {
      editInput.value.focus()
    }
  })
}

const saveTodoEdit = () => {
  if (editingTodoId.value && editingTodoText.value.trim()) {
    const todo = todos.value.find(t => t.id === editingTodoId.value)
    if (todo) {
      todo.text = editingTodoText.value.trim()
      saveTodos()
    }
  }
  cancelTodoEdit()
}

const cancelTodoEdit = () => {
  editingTodoId.value = null
  editingTodoText.value = ''
}

const toggleTodo = (id) => {
  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.completed = !todo.completed
    saveTodos()
  }
}

const deleteTodo = (id) => {
  todos.value = todos.value.filter(t => t.id !== id)
  saveTodos()
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getTaskCountForDate = (date) => {
  const dateString = date.toLocaleDateString('en-CA') // YYYY-MM-DD format
  return todos.value.filter(todo => {
    const todoDate = new Date(todo.createdAt)
    return todoDate.toLocaleDateString('en-CA') === dateString
  }).length
}



const openAddTaskModal = () => {
  showAddTaskModal.value = true
  addTaskText.value = ''
  addTaskTime.value = ''
}

const closeAddTaskModal = () => {
  showAddTaskModal.value = false
  addTaskText.value = ''
  addTaskTime.value = ''
}

const addTaskInput = ref(null)

watch(showAddTaskModal, (val) => {
  if (val) {
    nextTick(() => {
      if (addTaskInput.value) {
        addTaskInput.value.focus()
      }
    })
  }
})

const addTask = () => {
  if (!addTaskText.value.trim()) return

  const time = addTaskTime.value || '12:00'
  const [hours, minutes] = time.split(':')
  const todoDate = new Date(currentDate.value)
  todoDate.setHours(parseInt(hours), parseInt(minutes), 0, 0)

  const todo = {
    id: Date.now(),
    text: addTaskText.value.trim(),
    completed: false,
    createdAt: todoDate.toISOString(),
    category: addTaskCategory.value,
    priority: addTaskPriority.value
  }

  todos.value.unshift(todo)
  saveTodos()
  closeAddTaskModal()
}

// Load todos on mount
onMounted(() => {
  loadTodos()
})

definePageMeta({
  middleware: ['auth']
})

import { useAuth } from '~/composables/useAuth'
const { logout } = useAuth()
const handleLogout = async () => {
  await logout()
}
</script>

<style scoped>
/* Custom background gradient */
.bg-gradient-to-br {
  background: linear-gradient(135deg,#e6dbe1 0%, #ddc4d6 50%, #e768b0 100%);
}
.dark .bg-gradient-to-br {
  background: linear-gradient(135deg,  #33162e 0%, #140413 50%, #4e013e 100%);
}

/* Custom animations */
@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Task card slide-in animation with delays */
.group {
  animation: slide-in 0.6s ease-out;
}

.group:nth-child(1) { animation-delay: 0.1s; }
.group:nth-child(2) { animation-delay: 0.2s; }
.group:nth-child(3) { animation-delay: 0.3s; }
.group:nth-child(4) { animation-delay: 0.4s; }
.group:nth-child(5) { animation-delay: 0.5s; }

/* Custom scrollbar styling */
.max-h-96.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.max-h-96.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(236, 72, 153, 0.05);
  border-radius: 4px;
  margin: 4px 0;
}

.max-h-96.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(236, 72, 153, 0.4);
  border-radius: 4px;
  border: 1px solid rgba(236, 72, 153, 0.1);
}

.max-h-96.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(236, 72, 153, 0.6);
}

/* Dark mode scrollbar */
.dark .max-h-96.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(236, 72, 153, 0.1);
}

.dark .max-h-96.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(236, 72, 153, 0.5);
  border: 1px solid rgba(236, 72, 153, 0.2);
}

.dark .max-h-96.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(236, 72, 153, 0.7);
}
</style> 