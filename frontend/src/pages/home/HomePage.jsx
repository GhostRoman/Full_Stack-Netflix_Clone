import { useAuthStore } from "../../store/authUser"; // Хук для доступа к состоянию авторизации
import AuthScreen from "./AuthScreen"; // Экран для авторизации
import HomeScreen from "./HomeScreen"; // Главный экран после входа

/**
 * Компонент HomePage отвечает за рендеринг домашней страницы,
 * основываясь на состоянии авторизации пользователя.
 */
const HomePage = () => {
  const { user } = useAuthStore(); // Получаем текущего пользователя из хранилища

  // Если пользователь авторизован, показываем HomeScreen, иначе AuthScreen
  return <>{user ? <HomeScreen /> : <AuthScreen />}</>;
};

export default HomePage;
