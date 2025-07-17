<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-pink-900 relative overflow-hidden">
    <!-- Main Content -->
    <main class="relative z-10 max-w-4xl mx-auto px-4 py-8">
      <!-- Centered User Greeting and Catch Phrase -->
      <ClientOnly>
        <div v-if="user && user.name" class="text-center mb-8">
          <h2 class="hello-greeting text-3xl font-extrabold text-pink-700 dark:text-pink-200 drop-shadow-sm" style="text-shadow: 0 1px 4px rgba(0,0,0,0.15);">Hello, {{ user.name }}!</h2>
          <p class="text-lg text-pink-500 dark:text-pink-300 font-medium">Every small step counts. Make today magical! </p>
        </div>
      </ClientOnly>
      <!-- Grid for Today's Progress, Weekly Goals, Streak -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Today's Progress Card -->
        <div class="max-w-md w-full">
          <div class="bg-white dark:bg-gray-800/80 rounded-2xl shadow-xl border border-pink-100 dark:border-gray-700 p-6 flex flex-col">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Today's Progress</p>
            <div class="flex items-center mb-4 w-full">
              <span class="text-2xl font-bold text-pink-600 dark:text-pink-300 mr-2">{{ todayPercent }}%</span>
              <div class="flex-1 h-4 bg-pink-100 dark:bg-pink-900/20 rounded-full overflow-hidden">
                <div :style="{ width: todayPercent + '%' }" class="h-full bg-pink-400 dark:bg-pink-600 transition-all"></div>
              </div>
            </div>
            <p class="text-xs text-gray-600 dark:text-pink-100">{{ todayCompleted }} of {{ todayTotal }} tasks completed today</p>
          </div>
        </div>
        <!-- Weekly Goals Card -->
        <div v-if="weeklyTotal > 0" class="max-w-md w-full">
          <div class="bg-white dark:bg-gray-800/80 rounded-2xl shadow-xl border border-pink-100 dark:border-gray-700 p-6 flex flex-col">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Weekly Goals</p>
            <div class="flex items-center mb-4 w-full">
              <span class="text-2xl font-bold text-pink-600 dark:text-pink-300 mr-2">{{ weeklyPercent }}%</span>
              <div class="flex-1 h-4 bg-pink-100 dark:bg-pink-900/20 rounded-full overflow-hidden">
                <div :style="{ width: weeklyPercent + '%' }" class="h-full bg-pink-400 dark:bg-pink-600 transition-all"></div>
              </div>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400">{{ weeklyCompleted }} of {{ weeklyTotal }} tasks completed this week</p>
          </div>
        </div>
        <!-- Streak Card -->
        <div class="max-w-md w-full">
          <div class="bg-white dark:bg-gray-800/80 rounded-2xl shadow-xl border border-pink-100 dark:border-gray-700 p-6 flex flex-col">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Streak</p>
            <div class="flex items-center mb-4 w-full">
              <span class="text-2xl font-bold text-pink-600 dark:text-pink-300 mr-2">🔥 {{ streak }} day<span v-if="streak > 1">s</span></span>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400">Consecutive days with at least one completed task</p>
          </div>
        </div>
      </div>
      <!-- Stats and Recent Activity Cards in a grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <!-- Stats Card -->
        <div class="max-w-md w-full">
          <div class="bg-white dark:bg-gray-800/80 rounded-2xl shadow-xl border border-pink-100 dark:border-gray-700 p-6 flex flex-col">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">Stats</p>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-gray-500 dark:text-gray-400">Monthly Tasks</span>
                <span class="text-lg font-bold text-pink-700 dark:text-pink-200">{{ monthlyTotal }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-500 dark:text-gray-400">Longest Streak Days</span>
                <span class="text-lg font-bold text-pink-700 dark:text-pink-200">{{ longestStreak }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-500 dark:text-gray-400">Success Rate</span>
                <span class="text-lg font-bold text-pink-700 dark:text-pink-200">{{ monthlyPercent }}%</span>
              </div>
            </div>
          </div>
        </div>
        <!-- Recent Activity Card -->
        <div class="max-w-md w-full">
          <div class="bg-white dark:bg-gray-800/80 rounded-2xl shadow-xl border border-pink-100 dark:border-gray-700 p-6 flex flex-col">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">Recent Activity (Last 24 Hours)</p>
            <ul v-if="recentTasks.length > 0" class="divide-y divide-pink-100 dark:divide-gray-700">
              <li v-for="task in recentTasks" :key="task.id" class="py-1 flex items-center justify-between">
                <span
                  class="text-gray-800 dark:text-gray-100 font-semibold truncate max-w-[60%]"
                  :title="task.description || task.title"
                  >{{ task.title }}</span>
                <span class="flex flex-col items-end ml-2">
                  <span class="text-xs text-gray-500 dark:text-gray-400">{{ formatTimeAgo(task.completedAt || task.updatedAt || task.createdAt) }}</span>
                  <span class="text-xs text-pink-400 dark:text-pink-200">{{ formatExactTime(task.completedAt || task.updatedAt || task.createdAt) }}</span>
                </span>
              </li>
            </ul>
            <div v-else class="text-center text-gray-400 dark:text-gray-500 py-4">No tasks completed in the last 24 hours.</div>
          </div>
        </div>
      </div>
      <!-- Today's Tasks and Recent Activity Cards in a grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <!-- Today's Tasks Card  -->
        <div class="col-span-1 md:col-span-2 w-full p-0">
          <div class="p-6 md:p-8 rounded-2xl">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-300 mb-4">Today's Tasks</p>
            <ul v-if="todayTasks.length > 0" class="divide-y divide-pink-100 dark:divide-gray-700">
              <li v-for="task in todayTasks" :key="task.id" class="py-2 flex items-center justify-between">
                <span :class="task.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-800 dark:text-gray-100'">
                  {{ task.title }}
                </span>
                <span v-if="task.completed" class="ml-2 text-xs text-green-600 dark:text-green-400 font-semibold">Done</span>
                <span v-else class="ml-2 text-xs text-pink-600 dark:text-pink-300 font-semibold">Pending</span>
              </li>
            </ul>
            <div v-else class="text-gray-400 dark:text-gray-500 py-4">No tasks for today. Enjoy your day!</div>
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
import { useColorMode } from '@vueuse/core'
const colorMode = useColorMode ? useColorMode() : { value: 'light' }
const isDark = computed(() => colorMode.value === 'dark')
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
// Helper to check if a date is in the current week
function isThisWeek(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  // Set to start of week (Sunday)
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  // Set to end of week (Saturday)
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  return date >= startOfWeek && date <= endOfWeek;
}
const weeklyTodos = computed(() => todos.value.filter(todo => todo.createdAt && isThisWeek(todo.createdAt)));
const weeklyCompleted = computed(() => weeklyTodos.value.filter(todo => todo.completed).length);
const weeklyTotal = computed(() => weeklyTodos.value.length);
const weeklyPercent = computed(() => {
  if (weeklyTotal.value === 0) return 0;
  return Math.round((weeklyCompleted.value / weeklyTotal.value) * 100);
});
// Streak calculation
const streak = computed(() => {
  // Get all completed todos with a valid createdAt date
  const completed = todos.value.filter(todo => todo.completed && todo.createdAt);
  if (completed.length === 0) return 0;
  // Get unique days with completed tasks
  const days = Array.from(new Set(completed.map(todo => {
    const d = new Date(todo.createdAt);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  })));
  days.sort((a, b) => b - a); // Descending
  let streakCount = 1;
  for (let i = 1; i < days.length; i++) {
    // Check if the previous day is exactly one day before
    if (days[i - 1] - days[i] === 86400000) {
      streakCount++;
    } else if (days[i - 1] === days[i]) {
      continue; // Same day, skip
    } else {
      break;
    }
  }
  // Check if today is included in the streak
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (days[0] !== today.getTime()) {
    streakCount = 0;
  }
  return streakCount;
});
//  to check if a date is today
function isToday(dateString) {
  const today = new Date();
  const date = new Date(dateString);
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}
const todayTasks = computed(() => todos.value.filter(todo => todo.createdAt && isToday(todo.createdAt)));
//  to check if a date is within the last 24 hours
function isWithinLast24Hours(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  return (now - date) <= 24 * 60 * 60 * 1000 && (now - date) >= 0;
}
const recentTasks = computed(() =>
  todos.value.filter(todo => todo.completed && todo.createdAt && isWithinLast24Hours(todo.completedAt || todo.updatedAt || todo.createdAt))
);
//  to format time ago
function formatTimeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
  const diffHrs = Math.floor(diffMins / 60);
  if (diffHrs < 24) return `${diffHrs} hour${diffHrs > 1 ? 's' : ''} ago`;
  return 'over a day ago';
}
//  to format exact time
function formatExactTime(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
//  check if a date is in the current month
function isThisMonth(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth()
  );
}
const monthlyTodos = computed(() => todos.value.filter(todo => todo.createdAt && isThisMonth(todo.createdAt)));
const monthlyCompleted = computed(() => monthlyTodos.value.filter(todo => todo.completed).length);
const monthlyTotal = computed(() => monthlyTodos.value.length);
const monthlyPercent = computed(() => {
  if (monthlyTotal.value === 0) return 0;
  return Math.round((monthlyCompleted.value / monthlyTotal.value) * 100);
});
// Longest streak calculation
const longestStreak = computed(() => {
  // Get all completed todos with a valid createdAt date
  const completed = todos.value.filter(todo => todo.completed && todo.createdAt);
  if (completed.length === 0) return 0;
  //  days with completed tasks
  const days = Array.from(new Set(completed.map(todo => {
    const d = new Date(todo.createdAt);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  })));
  days.sort((a, b) => a - b); // Ascending
  let maxStreak = 1;
  let currentStreak = 1;
  for (let i = 1; i < days.length; i++) {
    if (days[i] - days[i - 1] === 86400000) {
      currentStreak++;
      if (currentStreak > maxStreak) maxStreak = currentStreak;
    } else if (days[i] !== days[i - 1]) {
      currentStreak = 1;
    }
  }
  return maxStreak;
});
// Today's progress calculation
const today = new Date();
const todayTodos = computed(() => todos.value.filter(todo => todo.createdAt && isToday(todo.createdAt)));
const todayCompleted = computed(() => todayTodos.value.filter(todo => todo.completed).length);
const todayTotal = computed(() => todayTodos.value.length);
const todayPercent = computed(() => {
  if (todayTotal.value === 0) return 0;
  return Math.round((todayCompleted.value / todayTotal.value) * 100);
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@700&display=swap');

.hello-greeting {
  font-family: 'Quicksand', 'Segoe UI Rounded', 'Comic Sans MS', cursive, sans-serif;
  letter-spacing: 0.5px;
}

/* background nini= atee */
.bg-gradient-to-br {
  background: linear-gradient(135deg,#e6dbe1 0%, #ddc4d6 50%, #e768b0 100%);
}

.dark .bg-gradient-to-br {
  background: linear-gradient(135deg,  #33162e 0%, #140413 50%, #4e013e 100%);

}
</style>