import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";

// Кастомный хук для получения отфильтрованного контента
const useFilteredContent = (endpoint, options) => {
  const { kidsMode } = useContentStore(); // Получаем режим для детей из zustand хранилища
  const [content, setContent] = useState(null); // Состояние для хранения контента
  const [isLoading, setIsLoading] = useState(true); // Состояние для загрузки
  const [error, setError] = useState(null); // Состояние для ошибок

  useEffect(() => {
    // Функция для получения контента с учетом режима для детей
    const fetchContent = async () => {
      try {
        // Определяем URL в зависимости от режима для детей
        const response = await fetch(
          kidsMode ? `${endpoint}/kids` : endpoint,
          options,
        );

        // Проверка успешности ответа
        if (!response.ok) {
          throw new Error(`Error fetching content: ${response.statusText}`);
        }

        const data = await response.json(); // Преобразуем ответ в формат JSON
        setContent(data); // Устанавливаем полученные данные в состояние
      } catch (error) {
        setError(error.message); // Устанавливаем ошибку в состояние
      } finally {
        setIsLoading(false); // Заканчиваем загрузку
      }
    };

    fetchContent(); // Вызываем функцию получения контента
  }, [kidsMode, endpoint, options]); // Зависимости эффекта

  // Возвращаем данные, ошибку и состояние загрузки
  return { content, isLoading, error };
};

export default useFilteredContent;
