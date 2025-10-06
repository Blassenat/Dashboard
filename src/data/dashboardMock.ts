export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
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

  users: Array.from({ length: 12 }).map((_, i) => {
    // Special cases for user1, user2, user3
    if (i === 0) {
      return {
        id: 1,
        name: 'User 1',
        email: 'user1@example.com',
        password: 'password1',
        role: 'user' as const,
        isActive: false, // INACTIVE
        lastLogin: new Date(Date.now() - Math.random() * 1e10).toISOString(),
        createdAt: new Date(Date.now() - Math.random() * 1e11).toISOString(),
        mfaEnabled: false,
      };
    }
    if (i === 1) {
      return {
        id: 2,
        name: 'User 2',
        email: 'user2@example.com',
        password: 'password2',
        role: 'user' as const,
        isActive: true, // ACTIVE
        lastLogin: new Date(Date.now() - Math.random() * 1e10).toISOString(),
        createdAt: new Date(Date.now() - Math.random() * 1e11).toISOString(),
        mfaEnabled: false,
      };
    }
    if (i === 2) {
      return {
        id: 3,
        name: 'User 3',
        email: 'user3@example.com',
        password: 'password3',
        role: 'admin' as const,
        isActive: true, // ACTIVE & ADMIN
        lastLogin: new Date(Date.now() - Math.random() * 1e10).toISOString(),
        createdAt: new Date(Date.now() - Math.random() * 1e11).toISOString(),
        mfaEnabled: true,
      };
    }

    // Rest of users follow pattern
    return {
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      password: `password${i + 1}`,
      role: (i % 2 === 0 ? 'admin' : 'user') as 'admin' | 'user' | 'guest',
      isActive: i % 3 !== 0,
      lastLogin: new Date(Date.now() - Math.random() * 1e10).toISOString(),
      createdAt: new Date(Date.now() - Math.random() * 1e11).toISOString(),
      mfaEnabled: i % 3 === 0,
    };
  }) as User[],

  loginTrends: lastNDays(14),

  activity: [
    { id: 1, action: 'login', user: 'User 1', timestamp: new Date().toISOString() },
    { id: 2, action: 'failed login', user: 'unknown', timestamp: new Date().toISOString() },
    { id: 3, action: 'MFA reset', user: 'User 3', timestamp: new Date().toISOString() },
  ],
};