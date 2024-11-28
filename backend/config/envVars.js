import dotenv from "dotenv";

// Загрузка переменных окружения из файла .env
dotenv.config();

export const ENV_VARS = {
  MONGO_URI: process.env.MONGO_URI, // URI для подключения к базе данных MongoDB
  PORT: process.env.PORT || 5000, // Порт для сервера, по умолчанию 5000
  JWT_SECRET: process.env.JWT_SECRET, // Секретный ключ для JWT
  NODE_ENV: process.env.NODE_ENV, // Среда выполнения (production, development и т.д.)
  TMDB_API_KEY: process.env.TMDB_API_KEY, // API ключ для взаимодействия с TMDB
  EMAIL_HOST: process.env.EMAIL_HOST, // SMTP сервер для отправки email
  EMAIL_PORT: process.env.EMAIL_PORT || 465, // Порт SMTP сервера, по умолчанию 465
  EMAIL_USER: process.env.EMAIL_USER, // Email пользователя для отправки писем
  EMAIL_PASS: process.env.EMAIL_PASS, // Пароль пользователя для отправки писем
  EMAIL_FROM: process.env.EMAIL_FROM, // Email адрес отправителя
  CLIENT_URL: process.env.CLIENT_URL, // URL клиента
  STRIPE_PUBLISHIBLE_KEY: process.env.STRIPE_PUBLISHIBLE_KEY, // Публичный ключ для Stripe
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY, // Секретный ключ для Stripe
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS, // CORS
};
