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

  function refreshData() {
    stats.value.activeUsers = Math.max(0, stats.value.activeUsers + Math.floor(Math.random() * 21) - 10);
    const lastPoint = loginTrends.value.at(-1);
    if (!lastPoint) return;

    const loginsToday = Math.floor(stats.value.activeUsers * (0.2 + Math.random() * 0.2));
    const failedLogins = Math.floor(loginsToday * (0.01 + Math.random() * 0.02));
    const newSignups = Math.floor(loginsToday * (0.03 + Math.random() * 0.02));
    const activeSessions = Math.floor(loginsToday * (0.5 + Math.random() * 0.2));
    const activeUsers= Math.floor(loginsToday * (0.7 + Math.random() * 0.2));
    const mfaEnforcedPercentage = (stats.value.activeUsers * (Math.random() * 0.4 ) / stats.value.activeUsers) * 100;
    const totalUsers = Math.floor(stats.value.activeUsers * 1.2);

    lastPoint.count = loginsToday;
    lastPoint.failedCount = failedLogins;

    users.value = generateUsers(stats.value.activeUsers, totalUsers, loginsToday, mfaEnforcedPercentage);

    return { loginsToday, failedLogins, newSignups, activeSessions, mfaEnforcedPercentage, totalUsers, activeUsers };
  }

  const dashboardData = computed(() => {
    const last = loginTrends.value.at(-1);
    const loginsToday = last ? last.count : 0;
    return {
      loginsToday,
      failedLogins: Math.floor(loginsToday * 0.02),
      newSignups: Math.floor(loginsToday * 0.03),
      activeSessions: Math.floor(loginsToday * 0.5),
      activeUsers: Math.floor(loginsToday * 1.6),
      mfaEnforcedPercentage: (stats.value.activeUsers * (Math.random() * 0.4 ) / stats.value.activeUsers) * 100,
      totalUsers: Math.floor(stats.value.activeUsers * 1.2),
    };
  });

  users.value = generateUsers(
    stats.value.activeUsers,
    Math.floor(stats.value.activeUsers * 1.6),
    dashboardData.value.loginsToday,
    dashboardData.value.mfaEnforcedPercentage
  );

  return { stats, users, loginTrends, refreshData, dashboardData };
});