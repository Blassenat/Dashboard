<template>
  <div class="checkbox-group">
    <div class="checkbox-wrapper">
      <input 
        :id="id"
        type="checkbox"
        :checked="modelValue"
        :disabled="disabled"
        class="form-checkbox"
        @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      />
      <label :for="id" class="checkbox-label">
        <span class="checkbox-title">{{ title }}</span>
        <span v-if="description" class="checkbox-description">{{ description }}</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id: string;
  title: string;
  description?: string;
  modelValue: boolean;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  disabled: false
});

defineEmits<{
  'update:modelValue': [value: boolean];
}>();
</script>

<style scoped>
.checkbox-group {
  margin-bottom: 0;
}

.checkbox-wrapper {
  display: flex;
  gap: var(--spacing-md);
  align-items: flex-start;
  padding: var(--spacing-lg);
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-sm);
  transition: all var(--transition-base);
}

.checkbox-wrapper:hover:not(:has(input:disabled)) {
  border-color: var(--color-border-medium);
  background-color: var(--color-bg-hover);
}

.form-checkbox {
  width: 1.25rem;
  height: 1.25rem;
  margin-top: 0.125rem;
  cursor: pointer;
  accent-color: var(--color-primary);
  flex-shrink: 0;
}

.form-checkbox:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.checkbox-label {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  cursor: pointer;
  flex: 1;
}

.form-checkbox:disabled ~ .checkbox-label {
  cursor: not-allowed;
  opacity: 0.6;
}

.checkbox-title {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  font-size: var(--font-size-md);
}

.checkbox-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
}
</style>