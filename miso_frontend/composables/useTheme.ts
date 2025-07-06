export type Theme = 'light' | 'dark' | 'system'

export const useTheme = () => {
  const theme = ref<Theme>('system')
  const isDark = ref(false)

  // Initialize theme from localStorage or system preference
  const initTheme = () => {
    if (process.client) {
      const savedTheme = localStorage.getItem('theme') as Theme
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        theme.value = savedTheme
      } else {
        theme.value = 'system'
      }
      applyTheme()
    }
  }

  // Apply theme based on current setting
  const applyTheme = () => {
    if (!process.client) return

    let shouldBeDark = false

    switch (theme.value) {
      case 'dark':
        shouldBeDark = true
        break
      case 'light':
        shouldBeDark = false
        break
      case 'system':
        shouldBeDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        break
    }

    isDark.value = shouldBeDark
    document.documentElement.classList.toggle('dark', shouldBeDark)
  }

  // Set theme and save to localStorage
  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
    if (process.client) {
      localStorage.setItem('theme', newTheme)
    }
    applyTheme()
  }

  // Watch for system theme changes
  const watchSystemTheme = () => {
    if (!process.client) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (theme.value === 'system') {
        applyTheme()
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    
    // Cleanup function
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }

  // Initialize on mount
  onMounted(() => {
    initTheme()
    const cleanup = watchSystemTheme()
    
    // Cleanup on unmount
    onUnmounted(() => {
      if (cleanup) cleanup()
    })
  })

  return {
    theme: readonly(theme),
    isDark: readonly(isDark),
    setTheme
  }
} 