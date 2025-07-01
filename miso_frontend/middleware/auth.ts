export default defineNuxtRouteMiddleware((to, from) => {
  // Only run on client side
  if (process.server) return

  // Get auth state from composable
  const { getIsAuthenticated } = useAuth()
  const isAuthenticated = getIsAuthenticated()

  // If accessing dashboard without being logged in, redirect to login
  if (to.path === '/dashboard' && !isAuthenticated) {
    return navigateTo('/auth/login')
  }

  // If accessing auth pages while logged in, redirect to dashboard
  if (to.path.startsWith('/auth/') && isAuthenticated) {
    return navigateTo('/dashboard')
  }
}) 