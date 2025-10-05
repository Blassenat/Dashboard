import { defineStore } from "pinia";
import { ref } from "vue";

type User = {
  name: string;
  email: string;
  role: "admin" | "user";
  password: string;
};

type PublicUser = {
  name: string;
  email: string;
  role: "admin" | "user";
};

export const useAuthStore = defineStore("auth", () => {
  const isLoggedIn = ref(false);
  const user = ref<PublicUser | null>(null);
  const token = ref<string | null>(null);

  const Users: User[] = [
    { name: "John Doe", email: "johndoe@gmail.com", role: "admin", password: "password" },
    { name: "Jane Smith", email: "janesmith@gmail.com", role: "user", password: "1234" },
    { name: "Bob Martin", email: "bobmartin@gmail.com", role: "user", password: "abcd" }
  ];

  
  async function login(email: string, password: string) {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => { 
        const foundUser = Users.find(u => u.email === email && u.password === password);
        if (foundUser) {
          const { password: _password, ...rest } = foundUser;
          user.value = rest;
          isLoggedIn.value = true;
          token.value = "fake-jwt-token-" + user.value.name;
          localStorage.setItem("authToken", token.value);
          localStorage.setItem("username", user.value.name);
          localStorage.setItem("userRole", user.value.role);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 300); 
    });
  }

  function logout() {
    user.value = null;
    token.value = null;
    isLoggedIn.value = false;
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("userRole");
  }

  function init() {
    const savedToken = localStorage.getItem("authToken");
    const savedUsername = localStorage.getItem("username");
    const savedRole = localStorage.getItem("userRole") as "admin" | "user" | null;

    if (savedToken && savedUsername && savedRole) {
     
      const tokenIsValid = savedToken.startsWith("fake-jwt-token-");
      if (tokenIsValid) {
        token.value = savedToken;
        user.value = { name: savedUsername, email: "", role: savedRole };
        isLoggedIn.value = true;
      } else {
        logout(); 
      }
    }
  }

 
  init();

  return { isLoggedIn, user, token, login, logout, init };
});