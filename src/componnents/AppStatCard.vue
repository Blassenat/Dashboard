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
  background: #fff;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.stat-card:hover { box-shadow: 0 4px 6px rgba(0,0,0,0.1); transform: translateY(-2px); }
.stat-card.highlight { border: 2px solid #f59e0b; background: linear-gradient(to bottom right, rgba(245,158,11,0.05), #fff); }
.stat-card.highlight::before { content: '⚠️'; position: absolute; top: 0.5rem; right: 0.5rem; font-size: 1rem; }
.stat-card.positive-metric { border-left: 4px solid #10b981; }
.stat-card.negative-metric { border-left: 4px solid #ef4444; }

.stat-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem; }
.stat-title { font-size: 0.875rem; color: #6b7280; font-weight: 500; flex: 1; }

.trend-badge { display: flex; align-items: center; gap: 4px; padding: 2px 6px; border-radius: 0.25rem; font-size: 0.75rem; font-weight: 600; }
.trend-good { background: rgba(16,185,129,0.1); color: #10b981; }
.trend-bad { background: rgba(239,68,68,0.1); color: #ef4444; }
.trend-neutral { background: rgba(107,114,128,0.1); color: #6b7280; }
.trend-icon { font-size: 0.875rem; line-height: 1; }
.trend-value { line-height: 1; }

.stat-value { font-size: 1.75rem; font-weight: 700; color: #1f2937; margin-top: 0.25rem; line-height: 1.2; }
.stat-sub { font-size: 0.75rem; color: #9ca3af; margin-top: 0.25rem; font-weight: 500; }
</style>