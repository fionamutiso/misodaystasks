<template>
  <aside :class="['sidebar', collapsed ? 'sidebar-collapsed' : '', 'flex flex-col h-screen fixed z-30 transition-all duration-200']">
    <div class="sidebar-header flex items-center border-b border-pink-200 dark:border-gray-700 h-16 px-4 relative bg-transparent">
      <button @click="$emit('toggle')" class="hamburger-btn absolute left-2 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 border border-pink-100 dark:border-gray-800 rounded-full p-2 shadow-md focus:outline-none">
        <span class="block w-6 h-0.5 bg-pink-600 dark:bg-pink-400 mb-1"></span>
        <span class="block w-6 h-0.5 bg-pink-600 dark:bg-pink-400 mb-1"></span>
        <span class="block w-6 h-0.5 bg-pink-600 dark:bg-pink-400"></span>
      </button>
      <div v-if="!collapsed" class="ml-12 flex items-center w-full justify-center">
        <div class="w-10 h-10 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center">
          <span class="text-white font-bold text-lg">M</span>
        </div>
        <span class="ml-3 text-2xl font-bold text-pink-600 dark:text-pink-400 whitespace-nowrap">Miso Days</span>
      </div>
    </div>
    <nav class="flex-1 flex flex-col items-stretch px-2 py-8 space-y-2 bg-transparent">
      <NuxtLink to="/dashboard" class="sidebar-link" active-class="sidebar-link-active" :title="collapsed ? 'Dashboard' : ''">
        <span class="icon" :class="collapsed ? 'icon-collapsed' : ''">
          <!-- Simple and Cute Home Icon for Dashboard -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955a.75.75 0 011.092 0l8.954 8.955M4.5 10.5V19a2.25 2.25 0 002.25 2.25h2.25m6.75-10.75V19a2.25 2.25 0 01-2.25 2.25H6.75m6.75-10.75V19m0 0h-3" />
          </svg>
        </span>
        <span v-if="!collapsed">Dashboard</span>
      </NuxtLink>
      <button class="sidebar-link w-full flex items-center justify-start" :title="collapsed ? 'Notifications' : ''">
        <span class="icon" :class="collapsed ? 'icon-collapsed' : ''">
          <!-- Bell Icon for Notifications -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </span>
        <span v-if="!collapsed">Notifications</span>
      </button>
      <NuxtLink to="/tasks" class="sidebar-link" active-class="sidebar-link-active" :title="collapsed ? 'Tasks' : ''">
        <span class="icon" :class="collapsed ? 'icon-collapsed' : ''">
          <!-- Check Circle Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4" />
            <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" fill="none" />
          </svg>
        </span>
        <span v-if="!collapsed">Tasks</span>
      </NuxtLink>
      <NuxtLink to="/profile" class="sidebar-link" active-class="sidebar-link-active" :title="collapsed ? 'Profile' : ''">
        <span class="icon" :class="collapsed ? 'icon-collapsed' : ''">
          <!-- User Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25v-1.125A2.625 2.625 0 017.125 16.5h9.75a2.625 2.625 0 012.625 2.625v1.125" />
          </svg>
        </span>
        <span v-if="!collapsed">Profile</span>
      </NuxtLink>
      <NuxtLink to="/settings" class="sidebar-link" active-class="sidebar-link-active" :title="collapsed ? 'Settings' : ''">
        <span class="icon" :class="collapsed ? 'icon-collapsed' : ''">
          <!-- Simple Cog Icon for Settings -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.01c1.527-.94 3.31.843 2.37 2.37a1.724 1.724 0 001.01 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.01 2.573c.94 1.527-.843 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.01c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.01c-1.527.94-3.31-.843-2.37-2.37a1.724 1.724 0 00-1.01-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.01-2.573c-.94-1.527.843-3.31 2.37-2.37.996.614 2.307.07 2.573-1.01z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </span>
        <span v-if="!collapsed">Settings</span>
      </NuxtLink>
    </nav>
    <div class="px-2 pb-8 mt-auto flex flex-col bg-transparent border-t border-pink-200 dark:border-gray-700">
      <!-- Focus Mode Card in Sidebar -->
      <div class="my-4 bg-white dark:bg-gray-800/80 rounded-xl shadow border border-pink-100 dark:border-gray-700 p-4 flex flex-col items-center justify-center">
        <p class="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1" v-if="!collapsed">Focus Mode</p>
        <svg class="w-7 h-7 text-pink-400 dark:text-pink-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke-width="2"/>
          <circle cx="12" cy="12" r="6" stroke-width="2"/>
          <circle cx="12" cy="12" r="2" stroke-width="2"/>
        </svg>
        <button class="mt-1 px-3 py-1 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-semibold text-xs transition-all duration-200 w-full" v-if="!collapsed">Enter Focus Mode</button>
      </div>
      <button @click="handleLogout" class="sidebar-link w-full flex items-center justify-start" :title="collapsed ? 'Logout' : ''">
        <span class="icon" :class="collapsed ? 'icon-collapsed' : ''">
          <!-- Match page header logout icon: Arrow Left On Rectangle -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </span>
        <span v-if="!collapsed">Logout</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth'
const { logout } = useAuth()

defineProps({
  collapsed: Boolean
})

defineEmits(['toggle'])

const handleLogout = async () => {
  await logout()
}
</script>

<style scoped>
.sidebar {
  min-width: 16rem;
  width: 16rem;
  background: #f9fafb; /* Tailwind gray-50 */
  transition: width 0.2s, min-width 0.2s;
  box-shadow: 0 0 24px 0 rgba(233, 30, 99, 0.08);
  border-right: 1px solid #fbcfe8; /* border-pink-200 */
}
.dark .sidebar {
  background: #111827; /* Tailwind gray-900 */
  border-right: 1px solid #374151; /* border-gray-700 */
}
.sidebar-collapsed {
  min-width: 4rem !important;
  width: 4rem !important;
}
.sidebar-header {
  min-height: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  background: transparent;
  padding-left: 1rem;
  padding-right: 1rem;
}
.sidebar-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 0.75rem;
  border-radius: 0.75rem;
  font-weight: 500;
  color: #d63384;
  transition: background 0.2s, color 0.2s;
  gap: 1.25rem;
  white-space: nowrap;
  justify-content: flex-start;
  min-height: 2.75rem;
}
.sidebar-collapsed .sidebar-link {
  justify-content: center;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  min-height: 2.75rem;
}
.sidebar-link:hover, .sidebar-link-active {
  background: #ffe4f0;
  color: #b80060;
}
.dark .sidebar-link:hover, .dark .sidebar-link-active {
  background: #2d1436;
  color: #ffb6e6;
}
.icon {
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  transition: font-size 0.2s, width 0.2s, height 0.2s;
}
.icon-collapsed {
  width: 1.75rem;
  height: 1.75rem;
  font-size: 1.5rem;
  margin: 0 auto;
}
.hamburger-btn {
  z-index: 40;
  transition: background 0.2s;
  outline: none;
  box-shadow: 0 2px 8px 0 rgba(233, 30, 99, 0.08);
}
</style>
