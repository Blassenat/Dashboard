<template>
  <div class="app-layout">
    <AppSidebar />
    <main class="main-content">
      <div class="layout-toolbar">
        <button
          class="theme-toggle"
          :aria-pressed="theme === 'dark'"
          aria-label="Toggle dark mode"
          :title="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="toggleTheme"
        >
          <span class="toggle-icon">{{ theme === 'dark' ? '☀️' : '🌙' }}</span>
          <span class="toggle-text">{{ theme === 'dark' ? 'Light' : 'Dark' }}</span>
        </button>
      </div>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts"> 
import AppSidebar from './AppSidebar.vue'
import { onMounted, ref } from 'vue'

type Theme = 'light' | 'dark'
const theme = ref<Theme>('light')

function applyTheme(nextTheme: Theme) {
  document.documentElement.setAttribute('data-theme', nextTheme)
}

function initTheme() {
  const saved = localStorage.getItem('theme') as Theme | null
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  const initial: Theme = saved ?? (prefersDark ? 'dark' : 'light')
  theme.value = initial
  applyTheme(initial)
}

function toggleTheme() {
  const next: Theme = theme.value === 'dark' ? 'light' : 'dark'
  theme.value = next
  applyTheme(next)
  localStorage.setItem('theme', next)
}

onMounted(initTheme)
</script>

<style scoped>
.app-layout {
  display: flex;
  height: 100vh;
  gap: var(--spacing-lg);
  background-color: var(--color-bg-secondary);
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  min-width: 0; /* Prevents flex item from overflowing */
}

.layout-toolbar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-lg);
}

.theme-toggle {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border-medium);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-base);
}

.theme-toggle:hover {
  color: var(--color-text-primary);
  background-color: var(--color-bg-secondary);
  border-color: var(--color-border-dark);
}

.toggle-icon {
  line-height: 1;
}
</style>