<template>
  <div style="position: relative; height: 280px;">
    <Line :data="chartData" :options="chartOptions" />  

    <div v-if="loading" class="chart-loading-overlay">
      <div class="shimmer"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Line } from 'vue-chartjs';
import type { ChartData, ChartOptions } from 'chart.js/auto';
import { computed } from 'vue';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler);

const props = defineProps<{
  labels: string[];
  datasets: { label: string; data: number[]; borderColor: string; backgroundColor: string; fill?: boolean; tension?: number; }[];
  options?: ChartOptions<'line'>;
  loading?: boolean;
}>();

const chartData = computed<ChartData<'line'>>(() => ({
  labels: props.labels || [],
  datasets: props.datasets.map(ds => ({ ...ds }))
}));

const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
};

const loading = computed(() => props.loading ?? false);
</script>

<style scoped>
.chart-loading-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.shimmer {
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    45deg,
    rgba(255,255,255,0.3),
    rgba(255,255,255,0.3) 20px,
    rgba(255,255,255,0.5) 20px,
    rgba(255,255,255,0.5) 40px
  );
  animation: shimmer 1s linear infinite;
}

@keyframes shimmer {
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
}
</style>