import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

// Создаем хранилище аутентификации с помощью zustand
export const useAuthStore = create((set) => ({
  user: null, // Инициализируем пользователя как null
  isSigningUp: false, // Состояние регистрации
  isCheckingAuth: true, // Состояние проверки аутентификации
  isLoggingOut: false, // Состояние выхода из системы
  isLoggingIn: false, // Состояние входа в систему

  // Функция для регистрации
  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials);
      set({ user: response.data.user, isSigningUp: false });
      toast.success("Account created successfully");
    } catch (error) {
      set({ isSigningUp: false, user: null });
      toast.error(error?.response?.data?.message || "Signup failed");
    }
  },

  // Функция для входа
  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post("/api/v1/auth/login", credentials);
      set({ user: response.data.user, isLoggingIn: false });
      toast.success("Logged in successfully");
    } catch (error) {
      set({ isLoggingIn: false, user: null });
      toast.error(error?.response?.data?.message || "Login failed");
    }
  },

  // Функция для выхода из системы
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post("/api/v1/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
    } catch (error) {
      set({ isLoggingOut: false });
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  },

  // Функция для проверки аутентификации
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/v1/auth/authCheck");
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false, user: null });
      toast.error(error?.response?.data?.message || "Authentication failed");
    }
  },
}));
