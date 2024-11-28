import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";
import dotenv from "dotenv";
import Stripe from "stripe";
import mailerRoutes from "./routes/mailer.route.js";

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import { protectRoute } from "./middleware/protectRoute.js";

// Загрузка переменных окружения
dotenv.config();

const app = express();
const PORT = ENV_VARS.PORT || 5000;
const __dirname = path.resolve();

// Инициализация Stripe
const stripe = Stripe(ENV_VARS.STRIPE_SECRET_KEY);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ENV_VARS.ALLOWED_ORIGINS.split(","),
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// Подключение маршрутов
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);
app.use("/api", mailerRoutes);

// Главная страница
app.get("/", (req, res) => {
  res.send("Stripe payment");
});

// Создание платежного намерения
app.post("/create-payment-intent", async (req, res) => {
  const { amount, currency } = req.body;

  // Проверка входных данных
  if (!amount || !currency) {
    return res.status(400).send({ error: "Amount and currency are required" });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ["card"],
      description: "Payment for an item",
    });

    res.status(201).send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Error creating payment intent:", err.message);
    res
      .status(500)
      .send({ error: "Failed to create payment intent. Please try again." });
  }
});

// Обработка успешного платежа
app.post("/payment-success", async (req, res) => {
  const { email, amount } = req.body;

  try {
    // TODO: Реализуйте функцию sendPaymentSuccessEmail
    await sendPaymentSuccessEmail(email, amount);

    res.status(200).send({ message: "Payment processed and email sent." });
  } catch (error) {
    console.error("Error during email sending:", error);
    res.status(500).send({ error: "Failed to send email." });
  }
});

// Обработка статических файлов (production)
if (ENV_VARS.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Глобальная обработка ошибок
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).send({ success: false, error: "Internal Server Error" });
});

// Запуск сервера
app.listen(PORT, async () => {
  console.log(`Server started at http://localhost:${PORT}`);
  try {
    await connectDB();
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Завершение приложения, если база данных не подключилась
  }
});
