<template>
    <div class="settings-section">
      <div v-if="title || description" class="section-header">
        <h2 v-if="title" class="section-title">{{ title }}</h2>
        <p v-if="description" class="section-description">{{ description }}</p>
      </div>
      <div class="section-content">
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  interface Props {
    title?: string;
    description?: string;
  }
  
  defineProps<Props>();
  </script>
  
  <style scoped>
  .settings-section {
    padding: var(--spacing-xl);
    background-color: var(--color-bg-secondary);
    border: 1px solid var(--color-border-light);
    border-radius: var(--radius-md);
  }
  
  .section-header {
    margin-bottom: var(--spacing-xl);
  }
  
  .section-title {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
    margin: 0 0 var(--spacing-sm) 0;
  }
  
  .section-description {
    font-size: var(--font-size-base);
    color: var(--color-text-tertiary);
    margin: 0;
  }
  
  .section-content > :last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 640px) {
    .settings-section {
      padding: var(--spacing-lg);
    }
  }
  </style>