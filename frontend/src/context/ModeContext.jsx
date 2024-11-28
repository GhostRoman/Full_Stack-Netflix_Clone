import React, { createContext, useContext, useEffect, useState } from "react";

// Создаем контекст для режима приложения
const ModeContext = createContext();

// Кастомный хук для использования контекста режима
export const useMode = () => useContext(ModeContext);

// Провайдер для контекста режима
export const ModeProvider = ({ children }) => {
  // Получаем начальное состояние из localStorage, если оно существует
  const savedMode = localStorage.getItem("kidsMode") === "true";
  const [kidsMode, setKidsMode] = useState(savedMode);

  // Синхронизируем состояние с localStorage
  useEffect(() => {
    localStorage.setItem("kidsMode", kidsMode);
  }, [kidsMode]);

  return (
    <ModeContext.Provider value={{ kidsMode, setKidsMode }}>
      {children}
    </ModeContext.Provider>
  );
};
