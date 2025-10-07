import { http, HttpResponse, delay } from 'msw';
import { dashboardMock } from '../data/dashboardMock';
import type { LoginPoint } from '../data/dashboardMock';

// Helper to generate realistic trends
function generateTrends(days: number, baseActiveUsers: number): LoginPoint[] {
  const trends: LoginPoint[] = [];
  let currentCount = Math.floor(baseActiveUsers * 0.3);
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const variation = -0.1 + Math.random() * 0.2;
    currentCount = Math.max(10, Math.floor(currentCount * (1 + variation)));
    const failedCount = Math.floor(currentCount * (0.01 + Math.random() * 0.02));
    
    trends.push({
      date: date.toISOString().slice(0, 10),
      count: currentCount,
      failedCount
    });
  }
  
  return trends;
}

// In-memory state
const dashboardState = {
  loginTrends: generateTrends(14, dashboardMock.stats.activeUsers),
  stats: {
    activeUsers: dashboardMock.stats.activeUsers,
    totalUsers: dashboardMock.users.length,
    mfaEnforcedPercentage: 35,
  }
};

function calculateCurrentStats() {
  const today = dashboardState.loginTrends[dashboardState.loginTrends.length - 1];
  const loginsToday = today?.count || 0;
  const failedLogins = today?.failedCount || 0;
  
  return {
    loginsToday,
    failedLogins,
    newSignups: Math.floor(loginsToday * 0.03),
    activeSessions: Math.floor(loginsToday * 0.5),
    activeUsers: Math.floor(loginsToday * 0.7),
    totalUsers: dashboardState.stats.totalUsers,
    mfaEnforcedPercentage: dashboardState.stats.mfaEnforcedPercentage
  };
}

export const dashboardHandlers = [
  http.get('/api/dashboard/stats', async () => {
    await delay(200);
    
    if (Math.random() < 0.05) {
      return HttpResponse.json(
        { message: 'Service temporarily unavailable' },
        { status: 503 }
      );
    }

    return HttpResponse.json(calculateCurrentStats());
  }),

  http.get('/api/dashboard/login-trends', async ({ request }) => {
    await delay(250);
    
    const url = new URL(request.url);
    const days = parseInt(url.searchParams.get('days') || '14');
    const trends = dashboardState.loginTrends.slice(-days);
    
    return HttpResponse.json({
      trends,
      period: days
    });
  }),

  http.post('/api/dashboard/refresh', async () => {
    await delay(400);
    
    const lastPoint = dashboardState.loginTrends[dashboardState.loginTrends.length - 1];
    if (lastPoint) {
      const variation = 0.05 + Math.random() * 0.1;
      const isIncrease = Math.random() > 0.5;
      const multiplier = isIncrease ? (1 + variation) : (1 - variation);
      
      lastPoint.count = Math.max(1, Math.floor(lastPoint.count * multiplier));
      lastPoint.failedCount = Math.floor(lastPoint.count * (0.01 + Math.random() * 0.02));
      
      const mfaVariation = -2 + Math.random() * 4;
      dashboardState.stats.mfaEnforcedPercentage = Math.max(
        20, 
        Math.min(50, dashboardState.stats.mfaEnforcedPercentage + mfaVariation)
      );
    }
    
    return HttpResponse.json({
      success: true,
      stats: calculateCurrentStats(),
      trends: dashboardState.loginTrends,
      timestamp: new Date().toISOString()
    });
  }),
];