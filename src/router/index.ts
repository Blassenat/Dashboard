import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import LoginView from '../pages/LoginView.vue'
import AppLayout from '../componnents/AppLayout.vue'




const routes = [
  { path: '/login', component: LoginView }, 
  {path: '/403',component: () => import('../pages/ForbiddenView.vue'), meta: { public: true },},
  { path: '/', 
    component: AppLayout,
    children: [ 
      {path: '', component: () => import('../pages/HomeView.vue'), meta: {requiresauth:true, roles: ['admin','user']}},
      {path: 'dashboard', component: () => import('../pages/DashboardView.vue'), meta: {requiresauth:true, roles: ['admin']}},
      {path: 'user', component: () => import('../pages/UserView.vue'), meta: {requiresauth:true, roles: ['admin', 'user']}},
      {path: 'logs', component: () => import('../pages/LogsView.vue'), meta: {requiresauth:true, roles: ['admin',]}},
      {path: 'settings', component: () => import('../pages/SettingsView.vue'), meta: {requiresauth:true, roles: ['admin', 'user']}},
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)

  if (authRequired && !auth.isLoggedIn) {
    return next('/login')
  }

  // Role-based access control
  if (to.meta.roles && auth.user) {
    const allowedRoles = to.meta.roles as string[]
    if (!allowedRoles.includes(auth.user.role)) {
      // unauthorized: redirect to home or a 403 page
      return next('/403') 
    }
  }

  next()
})

export default router