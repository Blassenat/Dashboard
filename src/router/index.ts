import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import LoginView from '../pages/LoginView.vue'
import AppLayout from '../componnents/AppLayout.vue'



const routes = [
  { path: '/login', component: LoginView }, 
  { path: '/', 
    component: AppLayout,
    children: [ 
      {path: '', component: () => import('../pages/HomeView.vue')},
      {path: 'dashboard', component: () => import('../pages/DashboardView.vue')},
      {path: 'user', component: () => import('../pages/UserView.vue')},
      {path: 'logs', component: () => import('../pages/LogsView.vue')},  
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
  next()
})

export default router