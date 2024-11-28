import { create } from "zustand";

// Типизация для состояния содержимого
/**
 * @typedef {Object} ContentState
 * @property {string} contentType - Тип содержимого (например, "movie" или "tv").
 * @property {boolean} kidsMode - Включен ли режим для детей.
 */

// Создаем хранилище содержимого с помощью zustand
export const useContentStore = create((set) => ({
  contentType: "movie", // Тип содержимого по умолчанию
  kidsMode: false, // Режим для детей по умолчанию выключен

  // Функция для установки типа содержимого
  setContentType: (type) => set({ contentType: type }),

  // Функция для установки режима для детей
  setKidsMode: (isKids) => set({ kidsMode: isKids }),
}));
