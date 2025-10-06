<template>
  <div class="login">
    <h1>Login Page</h1>
    <p>Please enter your credentials to log in.</p>
    
    <!-- Test credentials hint for demo -->
    <div class="test-credentials">
      <small>For testing purposes: user1@example.com / password1 (inactive)
        <p>user2@example.com / password2 (active)</p>
        <p>user3@example.com / password3 (active + admin)</p>
      </small>
    </div>

    <form @submit.prevent="handleLogin">
      <input 
        v-model="email" 
        placeholder="Email" 
        type="email"
        :disabled="auth.isLoading"
        required
      />
      <input 
        v-model="password" 
        type="password" 
        placeholder="Password"
        :disabled="auth.isLoading"
        required
      />
      <button type="submit" :disabled="auth.isLoading">
        {{ auth.isLoading ? 'Logging in...' : 'Login' }}
      </button>
    </form>
    
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')

async function handleLogin() {
  error.value = ''
  
  const result = await auth.login(email.value, password.value)
  
  if (!result.success) {
    error.value = result.message || 'Invalid email or password'
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.test-credentials {
  background-color: #f0f0f0;
  padding: 8px;
  border-radius: 4px;
  margin-bottom: 16px;
  text-align: center;
}

.test-credentials small {
  color: #666;
  font-family: monospace;
}

input {
  display: block;
  width: 100%;
  margin-bottom: 12px;
  padding: 8px;
  box-sizing: border-box;
}

input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

button {
  padding: 10px 16px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
}

button:hover:not(:disabled) {
  background-color: #2f9d69;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error {
  color: red;
  margin-top: 8px;
  text-align: center;
}
</style>