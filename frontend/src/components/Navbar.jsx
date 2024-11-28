import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, Search } from "lucide-react";
import { useAuthStore } from "../store/authUser";
import { useContentStore } from "../store/content";
import { useProfileStore } from "../store/profile";

// Компонент Navbar для отображения навигационной панели
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState({
    mobile: false, // Состояние для мобильного меню
    profile: false, // Состояние для меню профиля
  });

  const { user, logout } = useAuthStore(); // Получаем пользователя и функцию выхода из хранилища аутентификации
  const { profiles, activeProfile, setActiveProfile } = useProfileStore(); // Получаем профили, активный профиль и функцию смены профиля из хранилища профилей

  const { setContentType } = useContentStore(); // Получаем функцию установки типа контента из хранилища контента

  // Функция для переключения мобильного меню
  const toggleMobileMenu = () =>
    setIsMenuOpen((prev) => ({ ...prev, mobile: !prev.mobile }));

  // Функция для переключения меню профилей
  const toggleProfileMenu = () =>
    setIsMenuOpen((prev) => ({ ...prev, profile: !prev.profile }));

  return (
    <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
      <div className="flex items-center gap-10 z-50">
        <Link to="/">
          <img
            src="/netflix-logo.png"
            alt="Netflix Logo"
            className="w-32 sm:w-40"
          />
        </Link>

        {/* Элементы навбара для десктопа */}
        <div className="hidden sm:flex gap-2 items-center">
          <Link
            to="/"
            className="hover:underline"
            onClick={() => setContentType("movie")}
          >
            Movies
          </Link>
          <Link
            to="/"
            className="hover:underline"
            onClick={() => setContentType("tv")}
          >
            Tv Shows
          </Link>
          <Link to="/history" className="hover:underline">
            Search History
          </Link>
          <Link to="/plans" className="text-white font-bold text-xl">
            Subscription
          </Link>
        </div>
      </div>

      <div className="flex gap-2 items-center z-50 relative">
        <Link to={"/search"}>
          <Search className="size-6 cursor-pointer" />
        </Link>

        {/* Dropdown для переключения профилей */}
        <div className="relative">
          <img
            src={activeProfile.image || "/default-avatar.png"} // Используем изображение по умолчанию, если профиль не выбран
            alt="Avatar"
            className="h-8 rounded cursor-pointer"
            onClick={toggleProfileMenu}
          />
          {isMenuOpen.profile && (
            <div className="absolute right-0 mt-2 bg-black border border-gray-800 rounded shadow-lg p-6 w-72">
              {profiles.map((profile) => (
                <div
                  key={profile.id}
                  className={`flex items-center gap-3 p-3 hover:bg-gray-700 cursor-pointer rounded-lg ${
                    activeProfile.id === profile.id ? "bg-gray-800" : ""
                  }`}
                  onClick={() => {
                    setActiveProfile(profile);
                    setIsMenuOpen((prev) => ({ ...prev, profile: false }));
                  }}
                >
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="h-12 w-12 rounded"
                  />
                  <span className="text-white">{profile.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Выход из системы */}
        {user && <LogOut className="size-6 cursor-pointer" onClick={logout} />}

        {/* Мобильное меню */}
        <div className="sm:hidden">
          <Menu className="size-6 cursor-pointer" onClick={toggleMobileMenu} />
        </div>
      </div>

      {/* Мобильное меню */}
      {isMenuOpen.mobile && (
        <div className="w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800">
          <Link
            to={"/"}
            className="block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            Movies
          </Link>
          <Link
            to={"/"}
            className="block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            Tv Shows
          </Link>
          <Link
            to={"/history"}
            className="block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            Search History
          </Link>
          <Link
            to="/subscription"
            className="block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            Subscription
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
