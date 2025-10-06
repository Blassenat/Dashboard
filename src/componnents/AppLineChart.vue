<template>
<div style="height: 280px;">
    <Line :data="chartData" :options="chartOptions" />  
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

ChartJS.register(Title,Tooltip,Legend,LineElement,CategoryScale,LinearScale,PointElement,Filler);

const props = defineProps <{
    labels: string[];
    datasets: { label: string; data: number[]; borderColor: string; backgroundColor: string; fill?: boolean; tension?: number; }[];
    options?: ChartOptions<'line'>;
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

</script>

<style scoped>

</style>