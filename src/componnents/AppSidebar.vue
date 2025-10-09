<template>
  <nav class="sidebar">
    <div class="sidebar-header">
      <h2 class="sidebar-title">Navigation</h2>
    </div>
    
    <ul class="sidebar-menu">
      <li v-for="link in links" :key="link.path" class="sidebar-item">
        <button
          v-if="link.name === 'Logout'"
          class="sidebar-link"
          @click="handleLogout"
        >
          <span class="link-icon">🚪</span>
          <span class="link-text">{{ link.name }}</span>
        </button>
        <router-link
          v-else
          :to="link.path"
          class="sidebar-link"
          exact-active-class="active"
        >
          <span class="link-icon">{{ getLinkIcon(link.name) }}</span>
          <span class="link-text">{{ link.name }}</span>
        </router-link>
      </li>
    </ul>

    <div v-if="auth.user" class="sidebar-footer">
      <div class="user-info">
        <div class="user-avatar">{{ getUserInitials(auth.user.name) }}</div>
        <div class="user-details">
          <p class="user-name">{{ auth.user.name }}</p>
          <p class="user-role">{{ auth.user.role }}</p>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

interface NavigationLink {
  name: string;
  path: string;
  roles: string[];
}

function getLinksForRole(role: string | null): NavigationLink[] {
  const allLinks: NavigationLink[] = [
    { name: 'Home', path: '/', roles: ['admin', 'user'] },
    { name: 'Dashboard', path: '/dashboard', roles: ['admin'] },
    { name: 'Logs', path: '/logs', roles: ['admin'] },
    { name: 'User', path: '/user', roles: ['admin'] },
    { name: 'Settings', path: '/settings', roles: ['user', 'admin'] },
    { name: 'Logout', path: '/logout', roles: ['user', 'admin'] },
  ]

  if (!role) return [{ name: 'Login', path: '/login', roles: [] }]
  return allLinks.filter(link => link.roles.includes(role))
}

function getLinkIcon(name: string): string {
  const icons: Record<string, string> = {
    'Home': '🏠',
    'Dashboard': '📊',
    'Logs': '📝',
    'User': '👤',
    'Settings': '⚙️',
    'Login': '🔑'
  }
  return icons[name] || '📄'
}

function getUserInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function handleLogout() {
  auth.logout()
  router.push('/login')
}

const links = computed(() => getLinksForRole(auth.user?.role || null))
</script>

<style scoped>
.sidebar {
  width: 250px;
  min-height: 100vh;
  background: linear-gradient(180deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  display: flex;
  flex-direction: column;
  color: var(--color-text-white);
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
}

.sidebar-header {
  padding: var(--spacing-2xl) var(--spacing-xl);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: white;
  margin: 0;
  letter-spacing: -0.01em;
}

.sidebar-menu {
  flex: 1;
  list-style: none;
  padding: var(--spacing-lg);
  margin: 0;
}

.sidebar-item {
  margin-bottom: var(--spacing-sm);
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  width: 100%;
  padding: var(--spacing-md) var(--spacing-lg);
  text-align: left;
  background-color: transparent;
  color: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: var(--radius-sm);
  text-decoration: none;
  cursor: pointer;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-base);
  font-family: inherit;
}

.sidebar-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  transform: translateX(4px);
}

.sidebar-link.active {
  background-color: var(--color-accent);
  color: var(--color-text-white);
  font-weight: var(--font-weight-semibold);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.link-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
}

.link-text {
  flex: 1;
}

.sidebar-footer {
  padding: var(--spacing-xl);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.user-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-base);
  color: white;
  flex-shrink: 0;
}

.user-details {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: white;
  margin: 0 0 0.25rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-role {
  font-size: var(--font-size-xs);
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  text-transform: capitalize;
}

@media (max-width: 768px) {
  .sidebar {
    width: 70px;
  }

  .sidebar-header,
  .sidebar-footer {
    padding: var(--spacing-lg);
  }

  .sidebar-title,
  .link-text,
  .user-details {
    display: none;
  }

  .sidebar-link {
    justify-content: center;
    padding: var(--spacing-md);
  }

  .link-icon {
    font-size: 1.5rem;
  }

  .user-avatar {
    margin: 0 auto;
  }
}
</style>