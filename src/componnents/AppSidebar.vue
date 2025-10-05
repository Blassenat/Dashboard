<template>
  <nav class="sidebar">
    <ul>
     <li v-for="link in links" :key="link.path">
  <button
    v-if="link.name === 'Logout'"
    class="sidebar-button"
    @click="handleLogout"
  >
    {{ link.name }}
  </button>
  <router-link
    v-else
    :to="link.path"
    class="sidebar-button"
    exact-active-class="active-link"
  >
    {{ link.name }}
  </router-link>
</li>
    </ul>
  </nav>
</template>

<script setup lang="ts">

import { useAuthStore } from '../stores/auth.ts'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

function handleLogout() {
  auth.logout()
  router.push('/login')
}

const links = [
  { name: 'Home', path: '/' },
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Logs', path: '/logs' },
  { name: 'User', path: '/user' },
  { name: 'Logout', path: '/logout' },
]

</script>

<style scoped>

.sidebar {
  width: 200px;
  
}
ul {
  list-style: none;
  padding: 0;
}
li + li {
  margin-top: 10px;
}

.sidebar-button {
  display: block;
  width: 100%;
  padding: 10px;
  text-align: left;
  background-color: #666666;
  color: white;
  border: none;
  border-radius: 6px;
  text-decoration: none;
  cursor: pointer;
  box-sizing: border-box; 
  transition: background-color 0.2s;
  
}

.sidebar-button:hover {
  background-color: #999999;
}

.active-link {
  background-color: #7f0019;
  font-weight: bold;
}


</style>