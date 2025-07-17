<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-pink-900 relative overflow-hidden">
    
    <main class="relative z-10 max-w-4xl mx-auto px-4 py-8">
      <!-- Page Header -->
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold !text-pink-400 dark:text-gray-200 mb-2">Profile Settings</h2>
        <p class="text-gray-600 dark:text-gray-400">Manage your account and preferences</p>
      </div>

      <!-- Profile Form -->
      <div class="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-pink-100 dark:border-gray-700 overflow-hidden">
        <div class="p-6 border-b border-pink-100 dark:border-gray-700">
          <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200">Profile Information</h3>
        </div>
        
        <form @submit.prevent="updateProfile" class="p-6 space-y-6">
          <!-- Avatar Section -->
          <div class="flex items-center space-x-6">
            <div class="w-24 h-24 rounded-full overflow-hidden bg-pink-100 dark:bg-gray-700 flex items-center justify-center">
              <img 
                v-if="profile.avatar" 
                :src="profile.avatar" 
                :alt="profile.name"
                class="w-full h-full object-cover"
              />
              <svg v-else class="w-12 h-12 text-pink-400 dark:text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div class="flex-1">
              <h4 class="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Profile Picture</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">Your profile picture will be displayed here.</p>
            </div>
          </div>

          <!-- Basic Information -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
              <input
                v-model="profile.name"
                type="text"
                class="w-full px-4 py-3 border border-pink-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
              <input
                v-model="profile.email"
                type="email"
                class="w-full px-4 py-3 border border-pink-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
              <input
                v-model="profile.phone"
                type="tel"
                class="w-full px-4 py-3 border border-pink-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                placeholder="Enter your phone number"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Birth Date</label>
              <input
                v-model="profile.birth_date"
                type="date"
                class="w-full px-4 py-3 border border-pink-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
            </div>
          </div>

          <!-- Save Button -->
          <div class="flex justify-end">
            <button
              type="submit"
              :disabled="!isFormValid"
              class="bg-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-600 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span v-if="loading" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
              <span v-else>Save Changes</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Password Change Section -->
      <div class="mt-8 bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-pink-100 dark:border-gray-700 overflow-hidden">
        <div class="p-6 border-b border-pink-100 dark:border-gray-700">
          <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200">Change Password</h3>
        </div>
        
        <form @submit.prevent="updatePassword" class="p-6 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Password</label>
              <input
                v-model="passwordForm.current_password"
                type="password"
                class="w-full px-4 py-3 border border-pink-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                placeholder="Enter current password"
                required
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
              <input
                v-model="passwordForm.password"
                type="password"
                class="w-full px-4 py-3 border border-pink-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                placeholder="Enter new password"
                required
              />
            </div>
            
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm New Password</label>
              <input
                v-model="passwordForm.password_confirmation"
                type="password"
                class="w-full px-4 py-3 border border-pink-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                placeholder="Confirm new password"
                required
              />
            </div>
          </div>

          <!-- Password Change Button -->
          <div class="flex justify-end">
            <button
              type="submit"
              :disabled="passwordLoading || passwordForm.password !== passwordForm.password_confirmation"
              class="bg-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-600 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span v-if="passwordLoading" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Updating...
              </span>
              <span v-else>Update Password</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Preferences Section -->
      <div class="mt-8 bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-pink-100 dark:border-gray-700 overflow-hidden">
        <div class="p-6 border-b border-pink-100 dark:border-gray-700">
          <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200">Preferences</h3>
        </div>
        
        <div class="p-6 space-y-6">
          <!-- Theme Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Theme</label>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- Light Theme Card -->
              <button
                @click="selectTheme('light')"
                class="relative p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105"
                :class="theme === 'light' 
                  ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20' 
                  : 'border-pink-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-pink-300 dark:hover:border-gray-500'"
              >
                <div class="flex items-center space-x-3">
                  <svg class="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  <div class="text-left">
                    <div class="font-medium text-gray-800 dark:text-gray-200">Light</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">Clean and bright</div>
                  </div>
                </div>
                <svg v-if="theme === 'light'" class="absolute top-2 right-2 w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </button>

              <!-- Dark Theme Card -->
              <button
                @click="selectTheme('dark')"
                class="relative p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105"
                :class="theme === 'dark' 
                  ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20' 
                  : 'border-pink-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-pink-300 dark:hover:border-gray-500'"
              >
                <div class="flex items-center space-x-3">
                  <svg class="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                  <div class="text-left">
                    <div class="font-medium text-gray-800 dark:text-gray-200">Dark</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">Easy on the eyes</div>
                  </div>
                </div>
                <svg v-if="theme === 'dark'" class="absolute top-2 right-2 w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </button>

              <!-- System Theme Card -->
              <button
                @click="selectTheme('system')"
                class="relative p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105"
                :class="theme === 'system' 
                  ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20' 
                  : 'border-pink-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-pink-300 dark:hover:border-gray-500'"
              >
                <div class="flex items-center space-x-3">
                  <svg class="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                  </svg>
                  <div class="text-left">
                    <div class="font-medium text-gray-800 dark:text-gray-200">System</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">Follows your OS</div>
                  </div>
                </div>
                <svg v-if="theme === 'system'" class="absolute top-2 right-2 w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Language Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label>
            <select
              v-model="preferences.language"
              class="w-full px-4 py-3 border border-pink-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="ja">日本語</option>
              <option value="ko">한국어</option>
              <option value="zh">中文</option>
            </select>
          </div>

          <!-- Save Preferences Button -->
          <div class="flex justify-end">
            <button
              @click="updatePreferences"
              :disabled="preferencesLoading"
              class="bg-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-600 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span v-if="preferencesLoading" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
              <span v-else>Save Preferences</span>
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
  title: 'Profile - Miso Days',
  meta: [
    { name: 'description', content: 'Manage your Miso Days profile' }
  ]
})

// Composables
const { logout } = useAuth()
const { getProfile, updateProfile, updatePassword } = useProfile()
const { theme, setTheme } = useTheme()

// Profile data
const profile = ref({
  name: '',
  email: '',
  phone: '',
  birth_date: '',
  avatar: null
})

// Password form
const passwordForm = ref({
  current_password: '',
  password: '',
  password_confirmation: ''
})

// Loading states
const loading = ref(false)
const passwordLoading = ref(false)
const preferencesLoading = ref(false)

// Preferences data
const preferences = ref({
  language: 'en'
})

// Load profile data
const loadProfile = async () => {
  const result = await getProfile()
  if (result.success) {
    profile.value = { ...result.profile }
    // Load preferences if they exist
    if (result.profile.preferences) {
      preferences.value = { ...result.profile.preferences }
    }
  }
}

// Update profile
const updateProfileHandler = async () => {
  loading.value = true
  
  try {
    const result = await updateProfile(profile.value)
    if (result.success) {
      // Show success message (you can add a toast notification here)
      console.log('Profile updated successfully')
    } else {
      console.error('Profile update failed:', result.error)
    }
  } catch (error) {
    console.error('Profile update error:', error)
  } finally {
    loading.value = false
  }
}

// Update password
const updatePasswordHandler = async () => {
  if (passwordForm.value.password !== passwordForm.value.password_confirmation) {
    return
  }
  
  passwordLoading.value = true
  
  try {
    const result = await updatePassword(passwordForm.value)
    if (result.success) {
      // Clear form
      passwordForm.value = {
        current_password: '',
        password: '',
        password_confirmation: ''
      }
      console.log('Password updated successfully')
    } else {
      console.error('Password update failed:', result.error)
    }
  } catch (error) {
    console.error('Password update error:', error)
  } finally {
    passwordLoading.value = false
  }
}

// Update preferences
const updatePreferences = async () => {
  preferencesLoading.value = true
  
  try {
    const result = await updateProfile({ preferences: preferences.value })
    if (result.success) {
      console.log('Preferences updated successfully')
    } else {
      console.error('Preferences update failed:', result.error)
    }
  } catch (error) {
    console.error('Preferences update error:', error)
  } finally {
    preferencesLoading.value = false
  }
}

// Select theme
const selectTheme = (newTheme) => {
  setTheme(newTheme)
}

// Handle logout
const handleLogout = async () => {
  await logout()
}

// Load profile on mount
onMounted(() => {
  loadProfile()
})

definePageMeta({
  middleware: ['auth']
})
</script>

<style scoped>
.bg-gradient-to-br {
  background: linear-gradient(135deg,#e6dbe1 0%, #ddc4d6 50%, #e768b0 100%);
}

.dark .bg-gradient-to-br {
  background: linear-gradient(135deg, #33162e 0%, #140413 50%, #4e013e 100%);
}
</style> 