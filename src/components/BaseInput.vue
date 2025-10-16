<template>
    <div class="form-group">
      <label v-if="label" :for="id" class="form-label">
        {{ label }}
      </label>
      <input 
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        class="form-input"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
      <p v-if="hint" class="form-hint">{{ hint }}</p>
      <p v-if="error" class="form-error">{{ error }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  interface Props {
    id: string;
    label?: string;
    type?: string;
    modelValue: string;
    placeholder?: string;
    hint?: string;
    error?: string;
    disabled?: boolean;
    required?: boolean;
  }
  
  withDefaults(defineProps<Props>(), {
    type: 'text',
    disabled: false,
    required: false
  });
  
  defineEmits<{
    'update:modelValue': [value: string];
  }>();
  </script>
  
  <style scoped>
  .form-group {
    margin-bottom: var(--spacing-xl);
  }
  
  .form-label {
    display: block;
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-sm);
  }
  
  .form-input {
    width: 100%;
    padding: var(--spacing-md) var(--spacing-lg);
    font-size: var(--font-size-lg);
    border: 1px solid var(--color-border-medium);
    border-radius: var(--radius-sm);
    background-color: var(--color-bg-primary);
    transition: all var(--transition-base);
    font-family: inherit;
  }
  
  .form-input:hover:not(:disabled) {
    border-color: var(--color-border-dark);
  }
  
  .form-input:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: var(--shadow-focus);
    background-color: var(--color-primary-light);
  }
  
  .form-input:disabled {
    background-color: var(--color-bg-tertiary);
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  .form-hint {
    font-size: var(--font-size-xs);
    color: var(--color-text-tertiary);
    margin: var(--spacing-sm) 0 0 0;
  }
  
  .form-error {
    font-size: var(--font-size-xs);
    color: var(--color-error-text);
    margin: var(--spacing-sm) 0 0 0;
    font-weight: var(--font-weight-medium);
  }
  </style>