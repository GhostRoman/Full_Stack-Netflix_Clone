import express from "express";
import { sendPaymentSuccessEmail } from "../controllers/mailer.controller.js"; // Импортируем контроллер

const router = express.Router();

// Маршрут для отправки email об успешной оплате
router.post("/payment-success", async (req, res) => {
  const { email, amount } = req.body;

  // Проверка наличия обязательных полей
  if (!email || !amount) {
    return res
      .status(400)
      .json({ success: false, message: "Email and amount are required" });
  }

  // Проверка на корректность email и amount
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email format" });
  }

  if (isNaN(amount) || amount <= 0) {
    return res.status(400).json({ success: false, message: "Invalid amount" });
  }

  try {
    // Вызов контроллера для отправки email
    await sendPaymentSuccessEmail(email, amount);

    // Ответ клиенту
    res.status(200).json({
      success: true,
      message: "Payment success email sent",
    });
  } catch (error) {
    console.error("Error sending payment success email:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to send email",
        error: error.message,
      });
  }
});

export default router;
