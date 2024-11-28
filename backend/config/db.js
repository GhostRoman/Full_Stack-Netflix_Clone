import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

// Функция для подключения к базе данных MongoDB
export const connectDB = async () => {
  try {
    // Попытка установить соединение с MongoDB
    const conn = await mongoose.connect(ENV_VARS.MONGO_URI);
    console.log("MongoDB connected: " + conn.connection.host);
  } catch (error) {
    // Обработка ошибок при подключении к MongoDB
    console.error("Error connecting to MONGODB: " + error.message);
    process.exit(1); // Завершение процесса с кодом 1 в случае ошибки
  }
};
