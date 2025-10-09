<template>
  <div 
    class="stat-card" 
    :class="{ 
      'highlight': highlight,
      'negative-metric': isNegative && trendDirection === 'up',
      'positive-metric': !isNegative && trendDirection === 'up'
    }" 
    role="group" 
    aria-label="App Stat Card"
  >
    <div class="stat-header">
      <div class="stat-title">{{ title }}</div>
      <div v-if="trend && trend !== 0" class="trend-badge" :class="getTrendClass">
        <span class="trend-icon">{{ getTrendIcon }}</span>
        <span class="trend-value">{{ Math.abs(Number(trend)) }}%</span>
      </div>
    </div>
    <div class="stat-value">{{ value }}</div>
    <div v-if="subtitle" class="stat-sub">{{ subtitle }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: string | number;
  trendDirection?: 'up' | 'down' | 'neutral';
  isNegative?: boolean;
  highlight?: boolean;
}>(), {
  trendDirection: 'neutral',
  isNegative: false,
  highlight: false
});

const getTrendClass = computed(() => {
  if (props.trendDirection === 'neutral') return 'trend-neutral';
  if (props.isNegative) return props.trendDirection === 'up' ? 'trend-bad' : 'trend-good';
  return props.trendDirection === 'up' ? 'trend-good' : 'trend-bad';
});

const getTrendIcon = computed(() => {
  if (props.trendDirection === 'up') return '↑';
  if (props.trendDirection === 'down') return '↓';
  return '→';
});
</script>

<style scoped>
.stat-card {
  background: var(--color-bg-primary);
  border-radius: var(--radius-md);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
  border: 1px solid var(--color-border-light);
}

.stat-card:hover { 
  box-shadow: var(--shadow-md); 
  transform: translateY(-2px); 
}

.stat-card.highlight { 
  border: 2px solid var(--color-secondary); 
  background: linear-gradient(to bottom right, var(--color-secondary-light), var(--color-bg-primary)); 
}

.stat-card.highlight::before { 
  content: '⚠️'; 
  position: absolute; 
  top: var(--spacing-md); 
  right: var(--spacing-md); 
  font-size: var(--font-size-lg); 
}

.stat-card.positive-metric { 
  border-left: 4px solid var(--color-success); 
}

.stat-card.negative-metric { 
  border-left: 4px solid var(--color-error); 
}

.stat-header { 
  display: flex; 
  justify-content: space-between; 
  align-items: flex-start; 
  margin-bottom: var(--spacing-md); 
}

.stat-title { 
  font-size: var(--font-size-base); 
  color: var(--color-text-tertiary); 
  font-weight: var(--font-weight-medium); 
  flex: 1; 
}

.trend-badge { 
  display: flex; 
  align-items: center; 
  gap: var(--spacing-xs); 
  padding: var(--spacing-xs) var(--spacing-sm); 
  border-radius: var(--radius-sm); 
  font-size: var(--font-size-xs); 
  font-weight: var(--font-weight-semibold); 
}

.trend-good { 
  background: var(--color-success-light); 
  color: var(--color-success); 
}

.trend-bad { 
  background: var(--color-error-light); 
  color: var(--color-error); 
}

.trend-neutral { 
  background: var(--color-bg-tertiary); 
  color: var(--color-text-tertiary); 
}

.trend-icon { 
  font-size: var(--font-size-base); 
  line-height: 1; 
}

.trend-value { 
  line-height: 1; 
}

.stat-value { 
  font-size: var(--font-size-3xl); 
  font-weight: var(--font-weight-bold); 
  color: var(--color-text-primary); 
  margin-top: var(--spacing-sm); 
  line-height: 1.2; 
}

.stat-sub { 
  font-size: var(--font-size-xs); 
  color: var(--color-text-quaternary); 
  margin-top: var(--spacing-sm); 
  font-weight: var(--font-weight-medium); 
}
</style>