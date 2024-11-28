import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

// Функция для генерации токена и установки куки
export const generateTokenAndSetCookie = (userId, res) => {
  // Генерация JWT токена с userId, срок действия 15 дней
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "15d" });

  // Установка куки с токеном
  res.cookie("jwt-netflix", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 дней в миллисекундах
    httpOnly: true, // Защита от XSS атак, делает куки недоступной для JS
    sameSite: "strict", // Защита от CSRF атак
    secure: ENV_VARS.NODE_ENV !== "development", // Включение secure только в продакшене
  });

  return token;
};
