<template>
  <div class="app-layout">
    <AppSidebar />
    <main class="main-content">
      <div class="main-header">
        <ThemeToggle />
      </div>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts"> 
import AppSidebar from './AppSidebar.vue' 
import ThemeToggle from './ThemeToggle.vue'; 
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
</style>