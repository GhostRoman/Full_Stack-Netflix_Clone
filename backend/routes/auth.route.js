import express from "express";
import {
  authCheck,
  forgotPassword,
  login,
  logout,
  resetPassword,
  signup,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

// Маршруты для аутентификации
router.post("/signup", signup); // Регистрация нового пользователя
router.post("/login", login); // Вход пользователя
router.post("/logout", logout); // Выход пользователя
router.post("/forgot-password", forgotPassword); // Запрос на сброс пароля
router.post("/reset-password/:token", resetPassword); // Сброс пароля по токену

// Защищенный маршрут для проверки аутентификации
router.get("/authCheck", protectRoute, authCheck);

export default router;
