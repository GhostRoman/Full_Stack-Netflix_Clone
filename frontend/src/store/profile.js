import { create } from "zustand";

// Типизация для профиля
/**
 * @typedef {Object} Profile
 * @property {number} id
 * @property {string} name
 * @property {string} image
 */

// Создаем хранилище профилей с помощью zustand
export const useProfileStore = create((set) => ({
  profiles: [
    { id: 1, name: "All", image: "/avatar1.png" },
    { id: 2, name: "Kids", Age: 16, image: "/avatar2.png" },
  ],
  activeProfile: { id: 1, name: "All", image: "/avatar1.png" }, // Проверьте путь и наличие файла
  setActiveProfile: (profile) => set({ activeProfile: profile }),

  // Дополнительная функция для добавления нового профиля (если нужно)
  addProfile: (newProfile) =>
    set((state) => ({
      profiles: [...state.profiles, newProfile],
    })),

  // Функция для удаления профиля по ID (если нужно)
  removeProfile: (profileId) =>
    set((state) => ({
      profiles: state.profiles.filter((profile) => profile.id !== profileId),
    })),
}));
