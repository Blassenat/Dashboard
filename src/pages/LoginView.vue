<template>
  <div class="login">
    <h1>Login Page</h1>
    <p>Please enter your credentials to log in.</p>
    <form @submit.prevent="login">
      <input v-model="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
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

function login() {
  const success = auth.login(email.value, password.value)
  if (!success) {
    error.value = 'Invalid email or password'
  } else {
    error.value = ''
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

input {
  display: block;
  width: 100%;
  margin-bottom: 12px;
  padding: 8px;
  box-sizing: border-box;
}

button {
  padding: 10px 16px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #2f9d69;
}

.error {
  color: red;
  margin-top: 8px;
}
</style>