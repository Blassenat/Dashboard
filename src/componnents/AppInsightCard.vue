

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
    background: #fff;
    border-radius: 0.5rem;
    padding: 1rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    border-left: 4px solid #3b82f6;
  }
  .insight-label { font-size: 0.75rem; color: #6b7280; margin-bottom: 0.25rem; font-weight: 500; text-transform: uppercase; }
  .insight-value { font-size: 1.5rem; font-weight: 700; color: #1f2937; margin-bottom: 0.25rem; }
  .insight-description { font-size: 0.875rem; color: #6b7280; }
  </style>