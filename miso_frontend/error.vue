<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 relative overflow-hidden flex items-center justify-center">
    <!-- Cherry blossom petals background -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="petal petal-1"></div>
      <div class="petal petal-2"></div>
      <div class="petal petal-3"></div>
      <div class="petal petal-4"></div>
    </div>

    <!-- Error content -->
    <div class="relative z-10 text-center px-4">
      <div class="mb-8">
        <div class="w-24 h-24 mx-auto mb-6 bg-pink-100 rounded-full flex items-center justify-center">
          <svg class="w-12 h-12 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
        </div>
        <h1 class="text-6xl font-bold text-pink-600 mb-4">{{ error.statusCode }}</h1>
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">
          {{ error.statusCode === 404 ? 'Page Not Found' : 'Something went wrong' }}
        </h2>
        <p class="text-gray-600 mb-8 max-w-md mx-auto">
          {{ error.statusCode === 404 
            ? 'The page you\'re looking for doesn\'t exist. Maybe it got lost among the cherry blossoms?' 
            : 'Don\'t worry, even cherry blossoms fall sometimes. Let\'s get you back on track!' 
          }}
        </p>
      </div>

      <!-- Action buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          @click="handleError"
          class="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-300"
        >
          Go Back
        </button>
        <NuxtLink
          to="/"
          class="bg-white/80 backdrop-blur-sm text-pink-600 px-6 py-3 rounded-lg font-semibold border border-pink-200 hover:bg-pink-50 transform hover:scale-105 transition-all duration-300"
        >
          Go Home
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const error = useError()

const handleError = () => {
  clearError({ redirect: '/' })
}
</script>

<style scoped>
.petal {
  position: absolute;
  width: 20px;
  height: 20px;
  background: linear-gradient(45deg, #fbb6ce, #f687b3);
  border-radius: 50% 0 50% 50%;
  opacity: 0.4;
  animation: float 8s ease-in-out infinite;
}

.petal-1 { top: 20%; left: 15%; animation-delay: 0s; }
.petal-2 { top: 40%; right: 20%; animation-delay: 2s; }
.petal-3 { bottom: 30%; left: 10%; animation-delay: 4s; }
.petal-4 { bottom: 50%; right: 15%; animation-delay: 6s; }

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.4;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 0.6;
  }
}

/* Custom gradient background */
.bg-gradient-to-br {
  background: linear-gradient(135deg, #fdf2f8 0%, #ffffff 50%, #fce7f3 100%);
}
</style> 