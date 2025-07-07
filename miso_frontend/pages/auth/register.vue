<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">

    <!-- Back to home button -->
    <div class="absolute top-6 left-6 z-20">
      <NuxtLink 
        to="/" 
        class="flex items-center space-x-2 text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition-colors duration-200"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        <span class="font-medium">Back to Home</span>
      </NuxtLink>
    </div>



    <!-- Main content -->
    <div class="relative z-10 flex items-center justify-center min-h-screen px-4">
      <div class="w-full max-w-md">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-pink-600 dark:text-pink-400 mb-2">Join Miso Days</h1>
          <p class="text-gray-600 dark:text-gray-400">Create your account and start organizing</p>
        </div>

        <!-- Register Form -->
        <div class="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-pink-100 dark:border-gray-700 p-8">
          <form @submit.prevent="handleRegister" class="space-y-6">
            <!-- Name Field -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <input
                v-model="form.name"
                type="text"
                required
                class="w-full px-4 py-3 border border-pink-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                placeholder="Enter your full name"
              />
            </div>

            <!-- Email Field -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                v-model="form.email"
                type="email"
                required
                class="w-full px-4 py-3 border border-pink-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                placeholder="Enter your email"
              />
            </div>

            <!-- Password Field -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                v-model="form.password"
                type="password"
                required
                class="w-full px-4 py-3 border border-pink-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                placeholder="Create a password"
              />
            </div>

            <!-- Confirm Password Field -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                v-model="form.password_confirmation"
                type="password"
                required
                class="w-full px-4 py-3 border border-pink-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                placeholder="Confirm your password"
              />
            </div>

            <!-- Terms and Conditions -->
            <div class="flex items-start">
              <input
                v-model="form.agree_to_terms"
                type="checkbox"
                required
                class="w-4 h-4 text-pink-600 border-pink-300 dark:border-gray-600 rounded focus:ring-pink-500 dark:bg-gray-700 mt-1"
              />
              <label class="ml-2 text-sm text-gray-600 dark:text-gray-400">
                I agree to the 
                <a href="#" class="text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition-colors duration-200">
                  Terms of Service
                </a> 
                and 
                <a href="#" class="text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition-colors duration-200">
                  Privacy Policy
                </a>
              </label>
            </div>

            <!-- Register Button -->
            <button
              type="submit"
              :disabled="loading || form.password !== form.password_confirmation"
              class="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-pink-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span v-if="loading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </span>
              <span v-else>Create Account</span>
            </button>
          </form>

          <!-- Divider -->
          <div class="my-6 flex items-center">
            <div class="flex-1 border-t border-pink-200 dark:border-gray-600"></div>
            <span class="px-4 text-sm text-gray-500 dark:text-gray-400">or</span>
            <div class="flex-1 border-t border-pink-200 dark:border-gray-600"></div>
          </div>

          <!-- Login Link -->
          <div class="text-center">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?
              <NuxtLink 
                to="/auth/login" 
                class="font-medium text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition-colors duration-200"
              >
                Sign in here
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Set page title
useHead({
  title: 'Register - Miso Days',
  meta: [
    { name: 'description', content: 'Create your Miso Days account' }
  ]
})

// Composables
const { register } = useAuth()
const router = useRouter()

// Form data
const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  agree_to_terms: false
})

// Loading state
const loading = ref(false)

// Handle register
const handleRegister = async () => {
  if (form.value.password !== form.value.password_confirmation) {
    return
  }
  
  loading.value = true
  
  try {
    const result = await register(form.value)
    if (result.success) {
      await router.push('/dashboard')
    } else {
      console.error('Registration failed:', result.error)
    }
  } catch (error) {
    console.error('Registration error:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.bg-gradient-to-br {
  background: linear-gradient(135deg,#e6dbe1 0%, #ddc4d6 50%, #e768b0 100%);
}


.dark .bg-gradient-to-br {
  background: linear-gradient(135deg, #33162e 0%, #140413 50%, #4e013e 100%);
}
</style>

