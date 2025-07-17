<template>
  <div class="layout-root flex">
    <Sidebar v-if="showSidebar" :collapsed="collapsed" @toggle="toggleSidebar" />
    <div :class="['main-content flex-1 min-h-screen transition-all duration-200', showSidebar && collapsed ? 'pl-16' : showSidebar ? 'pl-64' : 'pl-0']">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import { useAuth } from '~/composables/useAuth'
import { useRoute } from 'vue-router'

const collapsed = ref(false)
const toggleSidebar = () => {
  collapsed.value = !collapsed.value
}
const { isAuthenticated } = useAuth()
const route = useRoute()

const showSidebar = computed(() => {
  const hiddenRoutes = ['/', '/auth/login', '/auth/register']
  return isAuthenticated.value && !hiddenRoutes.includes(route.path)
})
</script>

<style scoped>
.layout-root {
  min-height: 100vh;
  width: 100vw;
  position: relative;
}
.main-content {
  position: relative;
  z-index: 10;
  transition: padding-left 0.2s;
}
</style> 