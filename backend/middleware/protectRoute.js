import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ENV_VARS } from "../config/envVars.js";

// Middleware для защиты маршрутов
export const protectRoute = async (req, res, next) => {
  try {
    // Получение токена из куки
    const token = req.cookies["jwt-netflix"];

    // Проверка наличия токена
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - No Token Provided" });
    }

    // Верификация токена
    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);

    // Проверка корректности токена
    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - Invalid Token" });
    }

    // Поиск пользователя по decoded userId и исключение пароля из результатов
    const user = await User.findById(decoded.userId).select("-password");

    // Проверка наличия пользователя
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Добавление пользователя в запрос
    req.user = user;

    // Переход к следующему middleware или маршруту
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
