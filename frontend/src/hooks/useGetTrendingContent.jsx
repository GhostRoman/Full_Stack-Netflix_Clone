import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";
import { useMode } from "../context/ModeContext.jsx";

// Кастомный хук для получения трендового контента
const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState(null); // Состояние для хранения трендового контента
  const [isLoading, setIsLoading] = useState(true); // Состояние для отслеживания загрузки
  const [error, setError] = useState(null); // Состояние для обработки ошибок
  const { contentType } = useContentStore(); // Получаем тип контента из zustand хранилища
  const { kidsMode } = useMode(); // Получаем режим для детей из контекста

  useEffect(() => {
    // Функция для получения трендового контента
    const getTrendingContent = async () => {
      const url = kidsMode
        ? `/api/v1/${contentType}/trending/kids`
        : `/api/v1/${contentType}/trending`; // Определяем URL в зависимости от режима для детей
      setIsLoading(true); // Устанавливаем состояние загрузки в true перед началом запроса
      try {
        const res = await axios.get(url); // Отправляем GET запрос на сервер
        console.log("API response:", res.data); // Логируем ответ от API
        setTrendingContent(res.data.content); // Устанавливаем полученные данные в состояние
      } catch (error) {
        console.error("API Error:", error); // Логируем ошибки
        setError("Failed to fetch trending content."); // Устанавливаем ошибку в состояние
      } finally {
        setIsLoading(false); // Окончание загрузки
      }
    };

    getTrendingContent(); // Вызываем функцию получения контента
  }, [contentType, kidsMode]); // Зависимости эффекта

  return { trendingContent, isLoading, error }; // Возвращаем трендовый контент, статус загрузки и ошибки
};

export default useGetTrendingContent;
