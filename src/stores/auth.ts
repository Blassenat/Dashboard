// src/stores/auth.ts
// REPLACE ENTIRE FILE WITH THIS:

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

// Helper functions for safe localStorage operations
function safeSetItem(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error(`Failed to save ${key} to localStorage:`, error);
    return false;
  }
}

function safeGetItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error(`Failed to read ${key} from localStorage:`, error);
    return null;
  }
}

function safeRemoveItem(key: string): boolean {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Failed to remove ${key} from localStorage:`, error);
    return false;
  }
}

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

      // Persist to localStorage with error handling
      const tokenSaved = safeSetItem("authToken", data.token);
      const userSaved = safeSetItem("user", JSON.stringify(data.user));

      // Warn if storage failed but continue (user is still logged in for session)
      if (!tokenSaved || !userSaved) {
        console.warn('Session will not persist after page reload');
      }

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
      
      // Clear localStorage with error handling
      safeRemoveItem("authToken");
      safeRemoveItem("user");
      
      isLoading.value = false;
    }
  }

  function init() {
    const savedToken = safeGetItem("authToken");
    const savedUser = safeGetItem("user");

    if (savedToken && savedUser) {
      try {
        token.value = savedToken;
        user.value = JSON.parse(savedUser);
        isLoggedIn.value = true;
      } catch (error) {
        console.error('Failed to parse saved user data:', error);
        // Clear corrupted data
        safeRemoveItem("authToken");
        safeRemoveItem("user");
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