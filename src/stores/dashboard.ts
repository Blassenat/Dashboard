import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User, LoginPoint } from '@/data/dashboardMock';
import { dashboardMock } from '@/data/dashboardMock';

function generateUsers(
  activeUsers: number,
  totalUsers: number,
  loginsToday: number,
  mfaPercentage: number
): User[] {
  return Array.from({ length: totalUsers }).map((_, i) => {
    const isActive = i < activeUsers;
    const lastLogin =
      i < loginsToday
        ? new Date().toISOString()
        : new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString();
    const mfaEnabled = i < Math.floor(totalUsers * (mfaPercentage / 100));
    return {
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      password: `password${i + 1}`,
      role: i % 2 === 0 ? 'admin' : 'user',
      isActive,
      lastLogin,
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      mfaEnabled,
    };
  });
}

function initLoginTrends(days = 14, activeUsers: number) {
  const trends: LoginPoint[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const loginsToday = Math.floor(activeUsers * (0.2 + Math.random() * 0.2));
    const failedLogins = Math.floor(loginsToday * (0.01 + Math.random() * 0.02));
    trends.push({ date: date.toISOString().slice(0, 10), count: loginsToday, failedCount: failedLogins });
  }
  return trends;
}

export const userDashboardStore = defineStore('dashboard', () => {
  const stats = ref({ activeUsers: dashboardMock.stats.activeUsers });
  const users = ref<User[]>([]);
  const loginTrends = ref<LoginPoint[]>(initLoginTrends(14, stats.value.activeUsers));

  const currentMetrics = ref({
    newSignups: 0,
    activeSessions: 0,
    mfaEnforcedPercentage: 35,
    totalUsers: 0
  });

  function refreshData() {
    const lastPoint = loginTrends.value.at(-1);
    if (!lastPoint) return;

    const variation = 0.05 + Math.random() * 0.1;
    const isIncrease = Math.random() > 0.5;
    const multiplier = isIncrease ? (1 + variation) : (1 - variation);

    const loginsToday = Math.max(1, Math.floor(lastPoint.count * multiplier));
    const failedLogins = Math.floor(loginsToday * (0.01 + Math.random() * 0.02));

    lastPoint.count = loginsToday;
    lastPoint.failedCount = failedLogins;

    const newSignups = Math.floor(loginsToday * (0.03 + Math.random() * 0.02));
    const activeSessions = Math.floor(loginsToday * (0.5 + Math.random() * 0.2));
    const activeUsers = Math.floor(loginsToday * (0.7 + Math.random() * 0.2));
    const totalUsers = Math.floor(activeUsers * 1.2);
    const mfaVariation = -2 + Math.random() * 4;
    const mfaEnforcedPercentage = Math.max(20, Math.min(50, currentMetrics.value.mfaEnforcedPercentage + mfaVariation));

    currentMetrics.value = {
      newSignups,
      activeSessions,
      mfaEnforcedPercentage,
      totalUsers
    };

    stats.value.activeUsers = activeUsers;
    users.value = generateUsers(activeUsers, totalUsers, loginsToday, mfaEnforcedPercentage);

    return { loginsToday, failedLogins, newSignups, activeSessions, mfaEnforcedPercentage, totalUsers, activeUsers };
  }

  const dashboardData = computed(() => {
    const last = loginTrends.value.at(-1);
    const loginsToday = last ? last.count : 0;
    const failedLogins = last?.failedCount ?? 0;
    
    return {
      loginsToday,
      failedLogins,
      newSignups: currentMetrics.value.newSignups || Math.floor(loginsToday * 0.03),
      activeSessions: currentMetrics.value.activeSessions || Math.floor(loginsToday * 0.5),
      activeUsers: stats.value.activeUsers,
      mfaEnforcedPercentage: currentMetrics.value.mfaEnforcedPercentage,
      totalUsers: currentMetrics.value.totalUsers || Math.floor(stats.value.activeUsers * 1.2),
    };
  });

  const initialLoginsToday = loginTrends.value.at(-1)?.count || 0;
  currentMetrics.value = {
    newSignups: Math.floor(initialLoginsToday * 0.03),
    activeSessions: Math.floor(initialLoginsToday * 0.5),
    mfaEnforcedPercentage: 35,
    totalUsers: Math.floor(stats.value.activeUsers * 1.2)
  };

  users.value = generateUsers(
    stats.value.activeUsers,
    currentMetrics.value.totalUsers,
    initialLoginsToday,
    currentMetrics.value.mfaEnforcedPercentage
  );

  return { stats, users, loginTrends, refreshData, dashboardData };
});