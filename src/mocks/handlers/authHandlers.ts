import { http, HttpResponse, delay } from 'msw';
import { dashboardMock } from '../data/dashboardMock';
import type { User } from '../data/dashboardMock';

export const safeUser = (user: User) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...safe } = user;
  return safe;
}; 

export const authHandlers = [
  http.post('/api/login', async ({ request }) => {
    await delay(300);
    
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

      return HttpResponse.json({
        token: `mock-token-${user.id}-${Date.now()}`,
        user: safeUser(user),
      });
    } catch {
      return HttpResponse.json(
        { message: 'Invalid request body' },
        { status: 400 }
      );
    }
  }),

  http.post('/api/logout', async () => {
    await delay(200);
    return HttpResponse.json({ message: 'Logged out successfully' });
  }),
];