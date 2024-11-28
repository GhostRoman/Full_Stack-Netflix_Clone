import { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

// Компонент для отображения страницы сброса пароля
const ResetPasswordPage = () => {
  const { token } = useParams(); // Получаем токен из параметров URL
  const navigate = useNavigate(); // Хук для навигации

  const [password, setPassword] = useState(""); // Состояние для хранения нового пароля
  const [confirmPassword, setConfirmPassword] = useState(""); // Состояние для хранения подтверждения пароля
  const [message, setMessage] = useState(""); // Состояние для хранения сообщения
  const [loading, setLoading] = useState(false); // Состояние загрузки

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы

    // Проверка совпадения паролей
    if (password !== confirmPassword) {
      setMessage("Passwords do not match"); // Устанавливаем сообщение о несовпадении паролей
      return;
    }

    setLoading(true); // Начинаем процесс загрузки
    try {
      // Отправляем запрос на сброс пароля
      await axios.post(
        `http://localhost:5173/api/v1/auth/reset-password/${token}`,
        { password },
      );
      setMessage("Password reset successfully"); // Устанавливаем сообщение об успешном сбросе пароля
      setTimeout(() => navigate("/login"), 2000); // Перенаправляем на страницу входа через 2 секунды
    } catch (error) {
      setMessage("Error resetting the password"); // Устанавливаем сообщение об ошибке сброса пароля
    } finally {
      setLoading(false); // Завершаем процесс загрузки
    }
  };

  return (
    <div className="h-screen w-full hero-bg">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to={"/reset-password"}>
          <img src="/netflix-logo.png" alt="logo" className="w-52" />
        </Link>
      </header>

      <div className="flex justify-center items-center mt-20 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
          <h1 className="text-center text-white text-2xl font-bold mb-4">
            Reset Password
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300 block"
              >
                New Password
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

            <div>
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-300 block"
              >
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="••••••••"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
              disabled={loading} // Отключаем кнопку во время загрузки
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          {message && <p className="mt-4 text-red-500">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
