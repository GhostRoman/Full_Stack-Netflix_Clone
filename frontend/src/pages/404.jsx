import { Link } from "react-router-dom";

// Компонент для отображения страницы ошибки 404
const NotFoundPage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-white relative"
      style={{ backgroundImage: `url('/404.png')` }}
    >
      {/* Заголовок */}
      <header className="absolute top-0 left-0 p-4 bg-black w-full">
        <Link to={"/"} aria-label="Go to Netflix Home">
          <img src="/netflix-logo.png" alt="Netflix logo" className="h-8" />
        </Link>
      </header>

      {/* Основной контент */}
      <main className="text-center z-10 px-4">
        <h1 className="text-5xl md:text-7xl font-semibold mb-4">
          404: Page Not Found
        </h1>
        <p className="mb-6 text-lg md:text-xl max-w-lg mx-auto">
          Sorry, we can't find that page. You'll find lots to explore on the
          home page.
        </p>
        <Link
          to={"/"}
          className="bg-white text-black py-2 px-4 rounded hover:bg-gray-300 transition"
        >
          Netflix Home
        </Link>
      </main>

      {/* Fallback стиль для отсутствующего фона */}
      <div
        className="absolute inset-0 bg-black/70 z-0"
        style={{ background: "url('/fallback-image.jpg') center/cover" }}
        aria-hidden="true"
      ></div>
    </div>
  );
};

export default NotFoundPage;
