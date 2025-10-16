<template>
    <button 
      @click="toggleTheme" 
      class="theme-toggle"
      :aria-label="isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
      type="button"
    >
      <svg 
        v-if="!isDark()" 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2"
      >
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
      <svg 
        v-else 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>
    </button>
  </template>
  
  <script setup lang="ts">
  import { useTheme } from '../composables/useTheme'
  
  const { toggleTheme, isDark } = useTheme()
  </script>
  
  <style scoped>
  .theme-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border: 1px solid var(--color-border-light);
    background-color: var(--color-bg-primary);
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: all var(--transition-base);
    color: var(--color-text-secondary);
  }
  
  .theme-toggle:hover {
    background-color: var(--color-bg-hover);
    border-color: var(--color-border-medium);
    transform: scale(1.05);
  }
  
  .theme-toggle:active {
    transform: scale(0.95);
  }
  
  .theme-toggle svg {
    transition: transform var(--transition-base);
  }
  
  .theme-toggle:hover svg {
    transform: rotate(20deg);
  }
  </style>