import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";

// Функция для получения данных с TMDB API
export const fetchFromTMDB = async (url) => {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + ENV_VARS.TMDB_API_KEY, // Использование API ключа для авторизации
    },
  };

  // Выполнение GET запроса к TMDB API с указанными заголовками
  const response = await axios.get(url, options);

  // Проверка успешности ответа
  if (response.status !== 200) {
    throw new Error("Failed to fetch data from TMDB: " + response.statusText); // Генерация ошибки при неудачном запросе
  }

  return response.data; // Возврат данных ответа
};
