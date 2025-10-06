export type User = {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
  mfaEnabled: boolean;
};

export type LoginPoint = { date: string; count: number; failedCount?: number };

const lastNDays = (n = 14): LoginPoint[] => {
  const res: LoginPoint[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    res.push({
      date: date.toISOString().slice(0, 10),
      count: Math.floor(Math.random() * 100),
      failedCount: Math.floor(Math.random() * 5),
    });
  }
  return res;
};

export const dashboardMock = {
  stats: {
    activeUsers: 12802,
  },

  users: Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: i % 2 === 0 ? 'admin' : 'user',
    isActive: i % 3 !== 0,
    lastLogin: new Date(Date.now() - Math.random() * 1e10).toISOString(),
    createdAt: new Date(Date.now() - Math.random() * 1e11).toISOString(),
    mfaEnabled: i % 3 === 0,
  })) as User[],

  loginTrends: lastNDays(14),

  activity: [
    { id: 1, action: 'login', user: 'User 1', timestamp: new Date().toISOString() },
    { id: 2, action: 'failed login', user: 'unknown', timestamp: new Date().toISOString() },
    { id: 3, action: 'MFA reset', user: 'User 3', timestamp: new Date().toISOString() },
  ],
};