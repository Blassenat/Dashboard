<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1 class="login-title">Welcome Back</h1>
        <p class="login-subtitle">Please enter your credentials to log in</p>
      </div>

      <!-- Test credentials hint -->
      <div class="test-credentials">
        <p class="credentials-title">Test Credentials:</p>
        <div class="credentials-list">
          <code>user1@example.com / password1</code> <span class="badge badge-inactive">Inactive</span>
          <code>user2@example.com / password2</code> <span class="badge badge-active">Active</span>
          <code>user3@example.com / password3</code> <span class="badge badge-admin">Admin</span>
        </div>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <BaseInput
          id="email"
          v-model="email"
          type="email"
          label="Email Address"
          placeholder="your.email@example.com"
          :disabled="auth.isLoading"
          :error="emailError"
          required
        />

        <BaseInput
          id="password"
          v-model="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          :disabled="auth.isLoading"
          required
        />

        <BaseButton 
          type="submit"
          :loading="auth.isLoading"
          loading-text="Logging in..."
          block
        >
          Login
        </BaseButton>

        <div v-if="error" class="status-message error">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import BaseInput from '../componnents/BaseInput.vue'
import BaseButton from '../componnents/BaseButton.vue'

const auth = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')
const emailError = ref('')

async function handleLogin() {
  error.value = ''
  emailError.value = ''
  
  const result = await auth.login(email.value, password.value)
  
  if (!result.success) {
    error.value = result.message || 'Invalid email or password'
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg);
  background-color: var(--color-bg-secondary);
}

.login-card {
  width: 100%;
  max-width: 450px;
  background-color: var(--color-bg-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-3xl);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -3px rgba(0, 0, 0, 0.1)
}

.login-header {
  text-align: center;
  margin-bottom: var(--spacing-3xl);
}

.login-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-sm) 0;
}

.login-subtitle {
  font-size: var(--font-size-base);
  color: var(--color-text-tertiary);
  margin: 0;
}

.test-credentials {
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-sm);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
}

.credentials-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  margin: 0 0 var(--spacing-md) 0;
}

.credentials-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.credentials-list code {
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  background-color: var(--color-bg-primary);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  display: inline-block;
}

.badge {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  padding: 0.125rem var(--spacing-sm);
  border-radius: var(--radius-sm);
  margin-left: var(--spacing-sm);
  display: inline-block;
}

.badge-inactive {
  background-color: #fee2e2;
  color: #991b1b;
}

.badge-active {
  background-color: #d1fae5;
  color: #065f46;
}

.badge-admin {
  background-color: #dbeafe;
  color: #1e40af;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

@media (max-width: 640px) {
  .login-container {
    padding: var(--spacing-md);
  }

  .login-card {
    padding: var(--spacing-2xl);
  }

  .login-title {
    font-size: var(--font-size-2xl);
  }
}
</style>