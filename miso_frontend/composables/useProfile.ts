interface ProfileData {
  name?: string
  email?: string
  phone?: string
  birth_date?: string
  preferences?: any
}

interface PasswordData {
  current_password: string
  password: string
  password_confirmation: string
}

export const useProfile = () => {
  const config = useRuntimeConfig()
  const baseURL = 'http://127.0.0.1:8000/api'

  const getProfile = async () => {
    try {
      const token = localStorage.getItem('token')
      const { data, error } = await useFetch(`${baseURL}/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

      if (error.value) {
        console.error('Profile fetch error:', error.value)
        return { success: false, error: error.value.data?.message || 'Failed to fetch profile' }
      }

      return { success: true, profile: data.value }
    } catch (error: any) {
      console.error('Profile fetch error:', error)
      return { success: false, error: error.message || 'Failed to fetch profile' }
    }
  }

  const updateProfile = async (profileData: ProfileData) => {
    try {
      const token = localStorage.getItem('token')
      const { data, error } = await useFetch(`${baseURL}/profile`, {
        method: 'PUT',
        body: profileData,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

      if (error.value) {
        console.error('Profile update error:', error.value)
        return { success: false, error: error.value.data?.message || 'Failed to update profile' }
      }

      // Update local user data
      if (data.value?.user) {
        localStorage.setItem('user', JSON.stringify(data.value.user))
      }

      return { success: true, profile: data.value?.user, message: data.value?.message }
    } catch (error: any) {
      console.error('Profile update error:', error)
      return { success: false, error: error.message || 'Failed to update profile' }
    }
  }

  const updatePassword = async (passwordData: PasswordData) => {
    try {
      const token = localStorage.getItem('token')
      const { data, error } = await useFetch(`${baseURL}/profile/password`, {
        method: 'PUT',
        body: passwordData,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

      if (error.value) {
        console.error('Password update error:', error.value)
        return { success: false, error: error.value.data?.message || 'Failed to update password' }
      }

      return { success: true, message: data.value?.message }
    } catch (error: any) {
      console.error('Password update error:', error)
      return { success: false, error: error.message || 'Failed to update password' }
    }
  }

  return {
    getProfile,
    updateProfile,
    updatePassword
  }
} 