import { defineStore } from "pinia";
import { ref } from "vue";

type PublicUser = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "guest";
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
  mfaEnabled: boolean;
};

export const useAuthStore = defineStore("auth", () => {
  const isLoggedIn = ref(false);
  const user = ref<PublicUser | null>(null);
  const token = ref<string | null>(null);
  const isLoading = ref(false);

  async function login(email: string, password: string): Promise<{ success: boolean; message?: string }> {
    isLoading.value = true;
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        isLoading.value = false;
        return { success: false, message: data.message || 'Login failed' };
      }

      // Store token and user data
      token.value = data.token;
      user.value = data.user;
      isLoggedIn.value = true;

      // Persist to localStorage
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      isLoading.value = false;
      return { success: true };
    } catch (error) {
      isLoading.value = false;
      console.error('Login error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  }

  async function logout() {
    isLoading.value = true;

    try {
      // Call logout endpoint (optional, but good practice)
      await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token.value}`,
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear state regardless of API call success
      user.value = null;
      token.value = null;
      isLoggedIn.value = false;
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      isLoading.value = false;
    }
  }

  function init() {
    const savedToken = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      try {
        token.value = savedToken;
        user.value = JSON.parse(savedUser);
        isLoggedIn.value = true;
      } catch (error) {
        console.error('Failed to parse saved user data:', error);
        logout();
      }
    }
  }

  // Initialize on store creation
  init();

  return { 
    isLoggedIn, 
    user, 
    token, 
    isLoading,
    login, 
    logout, 
    init 
  };
});