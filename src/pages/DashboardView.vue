<template>
  <div class="dashboard-container">
    <div class="stats-grid">
      <AppStatCard title="Logins Today" :value="dashboardData.loginsToday" />
      <AppStatCard title="Failed Logins" :value="dashboardData.failedLogins" />
      <AppStatCard title="New Signups" :value="dashboardData.newSignups" />
      <AppStatCard title="Active Users in the last 30 days" :value="dashboardData.activeUsers" :subtitle="`of ${dashboardData.totalUsers} total`" />
      <AppStatCard title="MFA Enforced" :value="dashboardData.mfaEnforcedPercentage.toFixed(2) + '%'" />
      <AppStatCard title="Active Sessions" :value="dashboardData.activeSessions" />
    </div>

    <div class="chart-container">
      <AppLineChart
        :labels="loginTrends.map(l => l.date)"
        :datasets="[
          { label: 'Logins', data: loginTrends.map(l => l.count), borderColor: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.2)', fill: true, tension: 0.3 },
          { label: 'Failed Logins', data: loginTrends.map(l => l.failedCount || 0), borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.2)', fill: true, tension: 0.3 }
        ]"
      />
    </div>

    <button @click="refreshData" class="refresh-btn">Refresh Data</button>
  </div>
</template>

<script setup lang="ts">
import AppStatCard from '@/componnents/AppStatCard.vue';
import AppLineChart from '@/componnents/AppLineChart.vue';
import { userDashboardStore } from '@/stores/dashboard';
import { computed } from 'vue';

const dashboardStore = userDashboardStore();
const dashboardData = computed(() => dashboardStore.dashboardData);
const loginTrends = computed(() => dashboardStore.loginTrends);
const refreshData = () => dashboardStore.refreshData();
</script>

<style scoped>
.dashboard-container { padding: 16px; display: flex; flex-direction: column; gap: 24px; }
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 16px; }
.chart-container { background: #fff; border-radius: 8px; padding: 16px; box-shadow: 0 1px 6px rgba(0,0,0,0.06); height: 300px; }
.refresh-btn { padding: 8px 16px; border: none; background-color: #3b82f6; color: white; border-radius: 4px; cursor: pointer; }
.refresh-btn:hover { background-color: #2563eb; }
</style>