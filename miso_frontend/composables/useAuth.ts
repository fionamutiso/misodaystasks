interface UserData {
  name?: string
  email: string
  password: string
  password_confirmation?: string
}

interface Credentials {
  email: string
  password: string
}

interface ApiResponse {
  token?: string
  user?: any
}

export const useAuth = () => {
  // User state
  const user = ref(null)
  const isAuthenticated = ref(false)

  // Initialize auth state from localStorage
  const initAuth = () => {
    if (process.client) {
      const token = localStorage.getItem('token')
      const userData = localStorage.getItem('user')
      
      if (token && userData) {
        user.value = JSON.parse(userData)
        isAuthenticated.value = true
      }
    }
  }

  // Initialize on client side
  if (process.client) {
    initAuth()
  }

  const register = async (userData: UserData): Promise<any> => {
    try {
      const { data, error } = await useFetch<ApiResponse>('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        body: userData,
      })

      if (error.value) {
        console.error('Registration error:', error.value)
        return { success: false, error: error.value.data?.message || 'Registration failed' }
      }

      if (data.value?.token) {
        localStorage.setItem('token', data.value.token)
        localStorage.setItem('user', JSON.stringify(data.value.user))
        user.value = data.value.user
        isAuthenticated.value = true
        return { success: true, user: data.value.user }
      } else {
        return { success: false, error: 'No token received' }
      }

    } catch (error: any) {
      console.error('Registration error:', error)
      return { success: false, error: error.message || 'Registration failed' }
    }
  }

  const login = async (credentials: Credentials): Promise<any> => {
    try {
      const { data, error } = await useFetch<ApiResponse>('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        body: credentials,
      })

      if (error.value) {
        console.error('Login error:', error.value)
        return { success: false, error: error.value.data?.message || 'Login failed' }
      }

      if (data.value?.token) {
        localStorage.setItem('token', data.value.token)
        localStorage.setItem('user', JSON.stringify(data.value.user))
        user.value = data.value.user
        isAuthenticated.value = true
        return { success: true, user: data.value.user }
      } else {
        return { success: false, error: 'Invalid login' }
      }

    } catch (error: any) {
      console.error('Login error:', error)
      return { success: false, error: error.message || 'Login failed' }
    }
  }

  const logout = async (): Promise<void> => {
    try {
      // Call logout endpoint if token exists
      const token = localStorage.getItem('token')
      if (token) {
        await useFetch('http://127.0.0.1:8000/api/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Clear local state regardless of API call success
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      user.value = null
      isAuthenticated.value = false
      
      // Navigate to home page
      await navigateTo('/')
    }
  }

  const getUser = () => {
    return user.value
  }

  const getIsAuthenticated = () => {
    return isAuthenticated.value
  }

  return { 
    user: readonly(user), 
    isAuthenticated: readonly(isAuthenticated),
    register, 
    login, 
    logout,
    getUser,
    getIsAuthenticated
  }
}
