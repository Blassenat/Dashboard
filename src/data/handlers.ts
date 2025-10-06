import { http, HttpResponse } from 'msw';
import { dashboardMock, User } from '@/data/dashboardMock';

export const safeUser = (user: User) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...safe } = user;
  return safe;
};

export const handlers = [

  http.post('/api/login', async ({ request }) => {
    try {
      const { email, password } = await request.json() as { email: string; password: string };
      
      const user = dashboardMock.users.find(u => u.email === email);


      if (!user || user.password !== password) {
        return HttpResponse.json(
          { message: 'Invalid credentials' },
          { status: 401 }
        );
      }

      if (!user.isActive) {
        return HttpResponse.json(
          { message: 'Account is inactive' },
          { status: 403 }
        );
      }

      return HttpResponse.json(
        {
          token: `mock-token-${user.id}-${Date.now()}`,
          user: safeUser(user),
        },
        { status: 200 }
      );
    } catch {
      return HttpResponse.json(
        { message: 'Invalid request body' },
        { status: 400 }
      );
    }
  }),


  http.get('/api/stats', () => {
    return HttpResponse.json({
      activeUsers: dashboardMock.stats.activeUsers,
      loginTrends: dashboardMock.loginTrends,
    });
  }),

  http.get('/api/users', () => {
    return HttpResponse.json(
      dashboardMock.users.map(safeUser)
    );
  }),


  http.get('/api/users/:id', ({ params }) => {
    const userId = Number(params.id);
    const user = dashboardMock.users.find(u => u.id === userId);
    
    if (!user) {
      return HttpResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }
    
    return HttpResponse.json(safeUser(user));
  }),

 
  http.get('/api/activity', () => {
    return HttpResponse.json(dashboardMock.activity);
  }),


  http.post('/api/logout', () => {
    return HttpResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    );
  }),
];