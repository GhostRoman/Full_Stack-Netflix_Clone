import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";
import axios from "axios";
import toast from "react-hot-toast";

// Компонент для отображения страницы входа в систему
const LoginPage = () => {
  const [email, setEmail] = useState(""); // Состояние для хранения email
  const [password, setPassword] = useState(""); // Состояние для хранения пароля
  const [isForgotPassword, setIsForgotPassword] = useState(false); // Состояние для управления режимом восстановления пароля
  const [resetEmail, setResetEmail] = useState(""); // Состояние для хранения email для сброса пароля
  const [resetMessage, setResetMessage] = useState(""); // Состояние для хранения сообщения о сбросе пароля
  const { login, isLoggingIn } = useAuthStore(); // Получаем функцию входа и состояние входа из хранилища аутентификации

  // Обработчик отправки формы входа
  const handleLogin = (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы

    // Валидация данных формы
    if (!email || !password) {
      toast.error("Please fill out both email and password.");
      return;
    }

    login({ email, password }); // Вызываем функцию входа с email и паролем
  };

  // Обработчик отправки формы восстановления пароля
  const handleForgotPassword = async (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы

    if (!resetEmail) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      // Отправляем запрос на сброс пароля (замени URL на актуальный, если доступен)
      await axios.post("http://localhost:5173/api/v1/auth/forgot-password", {
        email: resetEmail,
      });
      setResetMessage("Password reset link sent to your email!"); // Устанавливаем сообщение об успешной отправке
      toast.success("Password reset link sent to your email!");
    } catch (error) {
      setResetMessage("Failed to send reset link. Please try again."); // Устанавливаем сообщение об ошибке
      toast.error("Failed to send reset link. Please try again.");
    }
  };

  return (
    <div className="h-screen w-full hero-bg">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to="/">
          <img src="/netflix-logo.png" alt="logo" className="w-52" />
        </Link>
      </header>

      <div className="flex justify-center items-center mt-20 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
          <h1 className="text-center text-white text-2xl font-bold mb-4">
            {isForgotPassword ? "Forgot Password" : "Login"}
          </h1>

          {isForgotPassword ? (
            <form className="space-y-4" onSubmit={handleForgotPassword}>
              <div>
                <label
                  htmlFor="resetEmail"
                  className="text-sm font-medium text-gray-300 block"
                >
                  Enter your email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                  placeholder="you@example.com"
                  id="resetEmail"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />
              </div>

              <button
                className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
                type="submit"
              >
                Send Reset Link
              </button>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-300 block"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                  placeholder="you@example.com"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-300 block"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                  placeholder="••••••••"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? "Loading..." : "Login"}
              </button>
            </form>
          )}

          <div className="text-center text-gray-400">
            {!isForgotPassword && (
              <p>
                Don't have an account?{" "}
                <Link to="/signup" className="text-red-500 hover:underline">
                  Sign Up
                </Link>
              </p>
            )}
            <p>
              {isForgotPassword ? (
                <span
                  className="text-red-500 hover:underline cursor-pointer"
                  onClick={() => setIsForgotPassword(false)}
                >
                  Back to Login
                </span>
              ) : (
                <span
                  className="text-red-500 hover:underline cursor-pointer"
                  onClick={() => setIsForgotPassword(true)}
                >
                  Forgot Password?
                </span>
              )}
            </p>
          </div>

          {resetMessage && (
            <p className="mt-4 text-center text-red-500">{resetMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
