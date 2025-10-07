import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { LoginPoint } from '@/mocks/data/dashboardMock';

interface DashboardStats {
  loginsToday: number;
  failedLogins: number;
  newSignups: number;
  activeSessions: number;
  activeUsers: number;
  mfaEnforcedPercentage: number;
  totalUsers: number;
}

export const userDashboardStore = defineStore('dashboard', () => {
  // State
  const loginTrends = ref<LoginPoint[]>([]);
  const currentStats = ref<DashboardStats>({
    loginsToday: 0,
    failedLogins: 0,
    newSignups: 0,
    activeSessions: 0,
    activeUsers: 0,
    mfaEnforcedPercentage: 0,
    totalUsers: 0
  });
  
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Fetch initial data
  async function fetchDashboardData() {
    isLoading.value = true;
    error.value = null;

    try {
      // Fetch stats and trends in parallel
      const [statsRes, trendsRes] = await Promise.all([
        fetch('/api/dashboard/stats'),
        fetch('/api/dashboard/login-trends?days=14')
      ]);

      if (!statsRes.ok || !trendsRes.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const stats = await statsRes.json();
      const trendsData = await trendsRes.json();

      currentStats.value = stats;
      loginTrends.value = trendsData.trends;

    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error occurred';
      console.error('Dashboard fetch error:', e);
    } finally {
      isLoading.value = false;
    }
  }

  // Refresh data (incremental update)
  async function refreshData() {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await fetch('/api/dashboard/refresh', {
        method: 'POST'
      });

      if (!response.ok) {
        throw new Error('Failed to refresh dashboard');
      }

      const data = await response.json();
      
      // Update stats and trends
      currentStats.value = data.stats;
      loginTrends.value = data.trends;

      return data.stats;

    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to refresh data';
      console.error('Dashboard refresh error:', e);
    } finally {
      isLoading.value = false;
    }
  }

  // Computed property for dashboard data (for backward compatibility)
  const dashboardData = computed(() => currentStats.value);

  // Initialize data on store creation
  fetchDashboardData();

  return {
    // State
    loginTrends,
    dashboardData,
    isLoading,
    error,
    
    // Actions
    refreshData,
    fetchDashboardData
  };
});