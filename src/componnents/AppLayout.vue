<template>
  <div class="app-layout">
    <AppSidebar />
    <main class="main-content">
  
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts"> 
import AppSidebar from './AppSidebar.vue'  
</script>

<style scoped>

.app-layout {
  display: flex;
  height: 100vh;
  gap: 20px;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

</style>