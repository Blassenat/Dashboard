

<template>
    <div class="insight-card" :class="customClass">
      <div class="insight-label">{{ title }}</div>
      <div class="insight-value">{{ value }}</div>
      <div class="insight-description">{{ description }}</div>
    </div>
  </template>
  
  <script setup lang="ts">

  defineProps<{
    title: string;
    value: string | number;
    description?: string;
    customClass?: string;
  }>();
  </script>
  
<style scoped>
.insight-card {
  background: var(--color-bg-primary);
  border-radius: var(--radius-md);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-sm);
  border-left: 4px solid var(--color-primary);
  border: 1px solid var(--color-border-light);
  transition: all var(--transition-base);
}

.insight-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.insight-label { 
  font-size: var(--font-size-xs); 
  color: var(--color-text-tertiary); 
  margin-bottom: var(--spacing-sm); 
  font-weight: var(--font-weight-medium); 
  text-transform: uppercase; 
  letter-spacing: 0.05em;
}

.insight-value { 
  font-size: var(--font-size-2xl); 
  font-weight: var(--font-weight-bold); 
  color: var(--color-text-primary); 
  margin-bottom: var(--spacing-sm); 
  line-height: 1.2;
}

.insight-description { 
  font-size: var(--font-size-base); 
  color: var(--color-text-tertiary); 
  line-height: 1.4;
}
</style>