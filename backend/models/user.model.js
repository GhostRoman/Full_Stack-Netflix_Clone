import mongoose from "mongoose";

// Схема для модели пользователя
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true, // Имя пользователя обязательно
    unique: true, // Имя пользователя должно быть уникальным
  },
  email: {
    type: String,
    required: true, // Email обязателен
    unique: true, // Email должен быть уникальным
  },
  password: {
    type: String,
    required: true, // Пароль обязателен
  },
  image: {
    type: String,
    default: "", // Изображение пользователя по умолчанию пустое
  },
  searchHistory: {
    type: Array,
    default: [], // История поиска по умолчанию пустая
  },
  resetToken: {
    type: String, // Токен для сброса пароля
  },
  resetTokenExpire: {
    type: Date, // Дата истечения срока действия токена сброса пароля
  },
});

// Модель пользователя
export const User = mongoose.model("User", userSchema);
