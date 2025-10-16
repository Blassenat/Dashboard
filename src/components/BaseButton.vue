<template>
    <button 
      :type="type"
      :disabled="disabled || loading"
      :class="['btn', `btn-${variant}`, { 'btn-block': block }]"
    >
      <span v-if="loading" class="btn-loading">
        <span class="spinner-small"></span>
        {{ loadingText }}
      </span>
      <slot v-else></slot>
    </button>
  </template>
  
  <script setup lang="ts">
  interface Props {
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'danger';
    disabled?: boolean;
    loading?: boolean;
    loadingText?: string;
    block?: boolean;
  }
  
  withDefaults(defineProps<Props>(), {
    type: 'button',
    variant: 'primary',
    disabled: false,
    loading: false,
    loadingText: 'Loading...',
    block: false
  });
  </script>
  
  <style scoped>
  .btn {
    padding: var(--spacing-md) var(--spacing-xl);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    border: none;
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: all var(--transition-base);
    font-family: inherit;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);
    width: fit-content;
  }
  
  .btn-primary {
    background-color: var(--color-primary);
    color: white;
    box-shadow: var(--shadow-base);
  }
  
  .btn-primary:hover:not(:disabled) {
    background-color: var(--color-primary-hover);
    box-shadow: var(--shadow-md);
    transform: translateY(-1px);
  }
  
  .btn-primary:active:not(:disabled) {
    transform: translateY(0);
  }
  
  .btn-secondary {
    background-color: var(--color-bg-primary);
    color: var(--color-text-secondary);
    border: 1px solid var(--color-border-medium);
    box-shadow: var(--shadow-sm);
  }
  
  .btn-secondary:hover:not(:disabled) {
    background-color: var(--color-bg-secondary);
    border-color: var(--color-border-dark);
    box-shadow: var(--shadow-base);
  }
  
  .btn-danger {
    background-color: #dc2626;
    color: white;
    box-shadow: var(--shadow-base);
  }
  
  .btn-danger:hover:not(:disabled) {
    background-color: #b91c1c;
    box-shadow: var(--shadow-md);
    transform: translateY(-1px);
  }
  
  .btn:disabled {
    background-color: var(--color-disabled);
    cursor: not-allowed;
    opacity: 0.7;
    transform: none !important;
  }
  
  .btn-block {
    width: 100%;
  }
  
  .btn-loading {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-sm);
  }
  
  .spinner-small {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: var(--radius-full);
    animation: spin 0.8s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  @media (max-width: 640px) {
    .btn {
      width: 100%;
    }
  }
  </style>