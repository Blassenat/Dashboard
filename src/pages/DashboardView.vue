<template>
  <div class="dashboard-container">
    <div class="dashboard-header">
      <h1>User Authentication Dashboard</h1>
      <p class="subtitle">Real-time monitoring of user authentication and security metrics</p>
    </div>

    <div class="top-section">
      <div class="stats-grid">
        <AppStatCard 
          title="Logins Today" 
          :value="dashboardData.loginsToday"
          :trend="calculateTrend('logins')"
          :trendDirection="getTrendDirection('logins')"
        />
        <AppStatCard 
          title="Failed Logins" 
          :value="dashboardData.failedLogins"
          :trend="calculateTrend('failedLogins')"
          :trendDirection="getTrendDirection('failedLogins')"
          :isNegative="true"
        />
        <AppStatCard 
          title="New Signups" 
          :value="dashboardData.newSignups"
          :trend="calculateTrend('signups')"
          :trendDirection="getTrendDirection('signups')"
        />
        <AppStatCard 
          title="Active Users (30d)" 
          :value="dashboardData.activeUsers" 
          :subtitle="`of ${dashboardData.totalUsers} total`"
        />
        <AppStatCard 
          title="MFA Enforcement" 
          :value="dashboardData.mfaEnforcedPercentage.toFixed(1) + '%'"
          :trend="calculateTrend('mfa')"
          :trendDirection="getTrendDirection('mfa')"
          :highlight="dashboardData.mfaEnforcedPercentage < 30"
        />
        <AppStatCard 
          title="Active Sessions" 
          :value="dashboardData.activeSessions"
        />
      </div>

      <div class="insights-grid">
        <AppInsightCard
          title="Security Score"
          :value="securityScore + '/100'"
          :description="getSecurityMessage()"
          :customClass="getSecurityScoreClass()"
        />
        <AppInsightCard
          title="Failed Login Rate"
          :value="failedLoginRate + '%'"
          :description="Number(failedLoginRate) > 5 ? '⚠️ Higher than normal' : '✓ Within normal range'"
        />
        <AppInsightCard
          title="User Growth"
          :value="userGrowthRate + '%'"
          description="New signups vs total users"
        />
      </div>
    </div>

    <div class="chart-section">
      <div class="chart-header">
        <h2>Login Trends (14 Days)</h2>
        <button @click="refreshData" class="refresh-btn" :disabled="isRefreshing">
          <span v-if="!isRefreshing">↻ Refresh Data</span>
          <span v-else>Updating...</span>
        </button>
      </div>
      <div class="chart-container">
        <AppLineChart
          :labels="loginTrends.map(l => formatDate(l.date))"
          :datasets="[
            { label: 'Successful Logins', data: loginTrends.map(l => l.count), borderColor: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.1)', fill: true, tension: 0.3 },
            { label: 'Failed Attempts', data: loginTrends.map(l => l.failedCount || 0), borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', fill: true, tension: 0.3 }
          ]"
          :loading="isRefreshing"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppStatCard from '@/componnents/AppStatCard.vue';
import AppInsightCard from '@/componnents/AppInsightCard.vue';
import AppLineChart from '@/componnents/AppLineChart.vue';
import { userDashboardStore } from '@/stores/dashboard';
import { computed, ref } from 'vue';

const dashboardStore = userDashboardStore();
const dashboardData = computed(() => dashboardStore.dashboardData);
const loginTrends = computed(() => dashboardStore.loginTrends);
const isRefreshing = ref(false);

const previousValues = ref({ logins: 0, failedLogins: 0, signups: 0, mfa: 0 });

const refreshData = () => {
  previousValues.value = {
    logins: dashboardData.value.loginsToday,
    failedLogins: dashboardData.value.failedLogins,
    signups: dashboardData.value.newSignups,
    mfa: dashboardData.value.mfaEnforcedPercentage
  };
  isRefreshing.value = true;
  dashboardStore.refreshData();
  setTimeout(() => isRefreshing.value = false, 300);
};

previousValues.value = {
  logins: dashboardData.value.loginsToday,
  failedLogins: dashboardData.value.failedLogins,
  signups: dashboardData.value.newSignups,
  mfa: dashboardData.value.mfaEnforcedPercentage
};

const calculateTrend = (metric: 'logins' | 'failedLogins' | 'signups' | 'mfa') => {
  const current = dashboardData.value[metric === 'logins' ? 'loginsToday' : metric === 'failedLogins' ? 'failedLogins' : metric === 'signups' ? 'newSignups' : 'mfaEnforcedPercentage'];
  const previous = previousValues.value[metric];
  if (previous === 0) return 0;
  return (((current - previous) / previous) * 100).toFixed(1);
};

const getTrendDirection = (metric: 'logins' | 'failedLogins' | 'signups' | 'mfa') => {
  const trend = parseFloat(calculateTrend(metric) as string);
  return trend > 0 ? 'up' : trend < 0 ? 'down' : 'neutral';
};

const securityScore = computed(() => {
  const mfaScore = (dashboardData.value.mfaEnforcedPercentage / 50) * 40;
  const failedLoginScore = Math.max(0, 30 - (parseFloat(failedLoginRate.value as string) * 3));
  const activeSessionScore = Math.min(30, (dashboardData.value.activeSessions / dashboardData.value.activeUsers) * 30);
  return Math.round(mfaScore + failedLoginScore + activeSessionScore);
});

const failedLoginRate = computed(() => {
  if (dashboardData.value.loginsToday === 0) return 0;
  return ((dashboardData.value.failedLogins / (dashboardData.value.loginsToday + dashboardData.value.failedLogins)) * 100).toFixed(1);
});

const userGrowthRate = computed(() => {
  if (dashboardData.value.totalUsers === 0) return 0;
  return ((dashboardData.value.newSignups / dashboardData.value.totalUsers) * 100).toFixed(1);
});

const getSecurityScoreClass = () => {
  if (securityScore.value >= 80) return 'score-excellent';
  if (securityScore.value >= 60) return 'score-good';
  if (securityScore.value >= 40) return 'score-warning';
  return 'score-critical';
};

const getSecurityMessage = () => {
  if (securityScore.value >= 80) return '✓ Excellent security posture';
  if (securityScore.value >= 60) return 'Good security, room for improvement';
  if (securityScore.value >= 40) return '⚠️ Security needs attention';
  return '⚠️ Critical security issues';
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${date.getMonth() + 1}/${date.getDate()}`;
};
</script>

<style scoped>
.dashboard-container { width: 100%; min-height: 100vh; padding: 2rem; display: flex; flex-direction: column; gap: 2rem; font-family: 'Inter', sans-serif; box-sizing: border-box; }
.dashboard-header h1 { font-size: 2rem; font-weight: 600; color: #1f2937; margin: 0; }
.subtitle { color: #6b7280; font-size: 0.875rem; margin-top: 0.25rem; }

.top-section { display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; }
@media(max-width:1024px) { .top-section { grid-template-columns: 1fr; } }

.stats-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; }
.insights-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }

.chart-section { background: #fff; border-radius: 0.75rem; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); width: 100%; }
.chart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; }
.chart-header h2 { font-size: 1.25rem; font-weight: 600; color: #1f2937; margin: 0; }

.chart-container { height: 320px; width: 100%; }
.chart-container canvas { width: 100% !important; height: 100% !important; }

.refresh-btn { padding: 0.625rem 1.25rem; border: none; background-color: #3b82f6; color: #fff; border-radius: 0.5rem; font-weight: 500; cursor: pointer; font-size: 0.875rem; transition: all 0.2s; }
.refresh-btn:hover:not(:disabled) { background-color: #2563eb; transform: translateY(-1px); box-shadow: 0 4px 6px rgba(59,130,246,0.3); }
.refresh-btn:disabled { background-color: #9ca3af; cursor: not-allowed; opacity: 0.6; }
.refresh-btn:active:not(:disabled) { transform: translateY(0); }
</style>