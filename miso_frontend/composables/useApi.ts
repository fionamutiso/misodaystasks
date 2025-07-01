export const useApi = () => {
  const config = useRuntimeConfig()
  
  const baseURL = config.public.apiBase
  
  const api = $fetch.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    credentials: 'include', // For cookies/sessions
  })
  
  // Authentication methods
  const login = async (credentials: { email: string; password: string; remember?: boolean }) => {
    return await api('http://localhost:8000/api/login', {
      method: 'POST',
      body: credentials
    })
  }
  
  const register = async (userData: { name: string; email: string; password: string; password_confirmation: string }) => {
    return await api('http://localhost:8000/api/register', {
      method: 'POST',
      body: userData
    })
  }
  
  const logout = async () => {
    return await api('http://localhost:8000/api/logout', {
      method: 'POST'
    })
  }
  
  const getUser = async () => {
    return await api('http://localhost:8000/api/user')
  }
  
  // CSRF token for Laravel Sanctum
  const getCsrfToken = async () => {
    return await api('http://localhost:8000/sanctum/csrf-cookie', {
      method: 'GET'
    })
  }
  
  return {
    api,
    login,
    register,
    logout,
    getUser,
    getCsrfToken
  }
} 