export const useAuth = () => {
  const user = ref(null)
  const isAuthenticated = ref(false)
  const loading = ref(false)

  // Initialize auth state
  const initAuth = () => {
    // Check for stored auth data
    const storedUser = localStorage.getItem('miso-user')
    const storedToken = localStorage.getItem('miso-token')
    
    if (storedUser && storedToken) {
      user.value = JSON.parse(storedUser)
      isAuthenticated.value = true
    }
  }

  // Login function
  const login = async (credentials: { email: string; password: string; remember?: boolean }) => {
    loading.value = true
    
    try {
      // TODO: Replace with actual API call
      // const { login } = useApi()
      // const response = await login(credentials)
      
      // Simulate API response
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockUser = {
        id: 1,
        name: 'Cherry Blossom',
        email: credentials.email
      }
      
      const mockToken = 'mock-jwt-token'
      
      // Store auth data
      user.value = mockUser
      isAuthenticated.value = true
      localStorage.setItem('miso-user', JSON.stringify(mockUser))
      localStorage.setItem('miso-token', mockToken)
      
      return { success: true, user: mockUser }
      
    } catch (error) {
      console.error('Login failed:', error)
      return { success: false, error }
    } finally {
      loading.value = false
    }
  }

  // Register function
  const register = async (userData: { name: string; email: string; password: string; password_confirmation: string }) => {
    loading.value = true
    
    try {
      // TODO: Replace with actual API call
      // const { register } = useApi()
      // const response = await register(userData)
      
      // Simulate API response
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockUser = {
        id: 1,
        name: userData.name,
        email: userData.email
      }
      
      const mockToken = 'mock-jwt-token'
      
      // Store auth data
      user.value = mockUser
      isAuthenticated.value = true
      localStorage.setItem('miso-user', JSON.stringify(mockUser))
      localStorage.setItem('miso-token', mockToken)
      
      return { success: true, user: mockUser }
      
    } catch (error) {
      console.error('Registration failed:', error)
      return { success: false, error }
    } finally {
      loading.value = false
    }
  }

  // Logout function
  const logout = async () => {
    try {
      // TODO: Replace with actual API call
      // const { logout } = useApi()
      // await logout()
      
      // Clear auth data
      user.value = null
      isAuthenticated.value = false
      localStorage.removeItem('miso-user')
      localStorage.removeItem('miso-token')
      
      // Redirect to login
      await navigateTo('/auth/login')
      
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  // Check if user is authenticated
  const checkAuth = () => {
    return isAuthenticated.value
  }

  return {
    user: readonly(user),
    isAuthenticated: readonly(isAuthenticated),
    loading: readonly(loading),
    initAuth,
    login,
    register,
    logout,
    checkAuth
  }
} 