<template>
  <div class="stat-card" role="group" aria-label="App Stat Card">
    <div class="stat-title">{{ title }}</div>  
    <div class="stat-value">{{ value }}</div>
    <div v-if="subtitle" class="stat-sub">{{ subtitle }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  value: string | number;
  subtitle?: string;
}>();
</script>

<style scoped>  
.stat-card {
  background: #fff;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.06);
}
.stat-title {
  font-size: 0.85rem; 
  color: #666; 
}
.stat-value {
  font-size: 1.6rem; 
  font-weight: 600; 
  margin-top: 6px; 
}
.stat-sub {
  font-size: 0.8rem; 
  color: #888; 
  margin-top: 4px; 
}
</style>