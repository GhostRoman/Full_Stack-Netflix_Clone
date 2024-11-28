import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Функция для отправки email об успешной оплате
export const sendPaymentSuccessEmail = async (email, amount) => {
  try {
    // Настроим транспорт для отправки почты
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true для порта 465, false для других портов
      auth: {
        user: process.env.EMAIL_USER, // Ваш email из переменных среды
        pass: process.env.EMAIL_PASS, // Ваш пароль или токен приложения из переменных среды
      },
    });

    // Определяем содержимое письма
    const mailOptions = {
      from: process.env.EMAIL_USER, // От кого письмо
      to: email, // Кому письмо
      subject: "Payment Successful",
      html: `
                <h1>Payment Successful</h1>
                <p>Thank you for your payment of $${(amount / 100).toFixed(2)}. Your transaction was successful, and we appreciate your support!</p>
                <p>We will activate your subscription shortly. Enjoy our service!</p>
            `,
    };

    // Отправляем письмо
    await transporter.sendMail(mailOptions);
    console.log("Payment success email sent successfully");
  } catch (error) {
    console.error("Error in sending payment success email", error);
  }
};
