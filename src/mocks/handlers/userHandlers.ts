import { http, HttpResponse, delay } from 'msw'
import { dashboardMock } from '../data/dashboardMock'
import { safeUser } from './authHandlers'
import type { User } from '../data/dashboardMock'

export const usersHandlers = [
  // PATCH user settings
  http.patch('http://localhost:5173/api/users/:id', async ({ params, request }) => {
    await delay(300)
    
    const userId = Number(params.id)
    const updates = await request.json() as Partial<User>
    
    const user = dashboardMock.users.find(u => u.id === userId)
    
    if (!user) {
      return HttpResponse.json({ message: 'User not found' }, { status: 404 })
    }
    
    // Validation optionnelle pour empêcher la modification du rôle
    if (updates.role && user.role !== updates.role) {
      // return HttpResponse.json({ message: 'Forbidden' }, { status: 403 })
    }
    
    Object.assign(user, updates)
    
    return HttpResponse.json({
      message: 'User updated successfully',
      user: safeUser(user),
    })
  }),

  // GET all users
  http.get('http://localhost:5173/api/users', async ({ request }) => {
    await delay(200)
    const url = new URL(request.url)
    const role = url.searchParams.get('role')
    const mfa = url.searchParams.get('mfa')

    let users = dashboardMock.users

    if (role) {
      users = users.filter(u => u.role === role)
    }
    if (mfa !== null) {
      const mfaEnabled = mfa === 'true'
      users = users.filter(u => u.mfaEnabled === mfaEnabled)
    }

    return HttpResponse.json({
      users: users.map(safeUser),
      total: users.length,
    })
  }),

  // GET single user by id
  http.get('http://localhost:5173/api/users/:id', async ({ params }) => {
    await delay(150)
    const userId = Number(params.id)
    const user = dashboardMock.users.find(u => u.id === userId)

    if (!user) {
      return HttpResponse.json({ message: 'User not found' }, { status: 404 })
    }

    return HttpResponse.json(safeUser(user))
  }),

  // DELETE user
  http.delete('http://localhost:5173/api/users/:id', async ({ params }) => {
    await delay(200)
    const userId = Number(params.id)
    const userIndex = dashboardMock.users.findIndex(u => u.id === userId)

    if (userIndex === -1) {
      return HttpResponse.json({ message: 'User not found' }, { status: 404 })
    }

    dashboardMock.users.splice(userIndex, 1)
    
    return HttpResponse.json({
      message: 'User deleted successfully',
    })
  }),
]