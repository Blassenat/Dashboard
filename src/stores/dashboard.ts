import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { LoginPoint } from '@/mocks/data/dashboardMock';
import { dashboardMock } from '@/mocks/data/dashboardMock';

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
  const simulateErrors = ref(false);

  // Simulate API delay for realistic UX
  const simulateApiDelay = () => new Promise(resolve => setTimeout(resolve, 800));

  // Toggle error simulation
  function toggleErrorSimulation(enabled?: boolean) {
    simulateErrors.value = enabled ?? !simulateErrors.value;
    console.log(`Error simulation ${simulateErrors.value ? 'enabled' : 'disabled'}`);
  }

  // Generate mock stats from dashboardMock data
  function generateMockStats(): DashboardStats {
    const users = dashboardMock.users;
    const mfaEnabledCount = users.filter(u => u.mfaEnabled).length;
    
    return {
      loginsToday: 156,
      failedLogins: 12,
      newSignups: 8,
      activeSessions: 89,
      activeUsers: dashboardMock.stats.activeUsers,
      mfaEnforcedPercentage: Math.round((mfaEnabledCount / users.length) * 100),
      totalUsers: users.length
    };
  }

  // Generate mock login trends
  function generateMockTrends(): LoginPoint[] {
    const trends: LoginPoint[] = [];
    const today = new Date();
    
    for (let i = 13; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      trends.push({
        date: date.toISOString().split('T')[0],
        count: Math.floor(Math.random() * 100) + 50,
        failedCount: Math.floor(Math.random() * 20)
      });
    }
    
    return trends;
  }

  // Fetch initial data
  async function fetchDashboardData() {
    isLoading.value = true;
    error.value = null;
    
    try {
      await simulateApiDelay();
      
      if (simulateErrors.value) {
        throw new Error('Simulated API error: Unable to connect to server');
      }
      
      currentStats.value = generateMockStats();
      loginTrends.value = generateMockTrends();
      
      console.log('Dashboard data loaded successfully');
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
      await simulateApiDelay();
      
      if (simulateErrors.value) {
        throw new Error('Simulated API error: Refresh failed');
      }
      
      // Simulate slight variations in stats for refresh
      const baseStats = generateMockStats();
      currentStats.value = {
        ...baseStats,
        loginsToday: baseStats.loginsToday + Math.floor(Math.random() * 10),
        activeSessions: baseStats.activeSessions + Math.floor(Math.random() * 5)
      };
      loginTrends.value = generateMockTrends();
      
      return currentStats.value;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to refresh data';
      console.error('Dashboard refresh error:', e);
    } finally {
      isLoading.value = false;
    }
  }

  // Computed property for dashboard data
  const dashboardData = computed(() => currentStats.value);

  // Initialize data on store creation
  fetchDashboardData();

  return {
    // State
    loginTrends,
    dashboardData,
    currentStats,
    isLoading,
    error,
    simulateErrors,
    
    // Actions
    refreshData,
    fetchDashboardData,
    toggleErrorSimulation
  };
});