export default defineNuxtPlugin(() => {
  // Initialize theme on app startup
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    let theme = 'system'
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      theme = savedTheme
    }
    
    let shouldBeDark = false
    switch (theme) {
      case 'dark':
        shouldBeDark = true
        break
      case 'light':
        shouldBeDark = false
        break
      case 'system':
        shouldBeDark = prefersDark
        break
    }
    
    document.documentElement.classList.toggle('dark', shouldBeDark)
  }
  
  // Run on mount
  initTheme()
  
  // Watch for system theme changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', initTheme)
}) 