import { useCallback, useState } from "react";
import { useContentStore } from "../store/content";
import Navbar from "../components/Navbar";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import { useMode } from "../context/ModeContext";

// Компонент для отображения страницы поиска контента
const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("movie"); // Состояние для активной вкладки (фильмы, ТВ-шоу, люди)
  const [searchTerm, setSearchTerm] = useState(""); // Состояние для хранения поискового запроса
  const [results, setResults] = useState([]); // Состояние для хранения результатов поиска
  const [loading, setLoading] = useState(false); // Состояние для индикатора загрузки
  const { setContentType } = useContentStore(); // Функция для установки типа контента из zustand хранилища
  const { kidsMode } = useMode(); // Получаем режим для детей из контекста

  // Обработчик клика по вкладке
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    tab === "movie" ? setContentType("movie") : setContentType("tv");
    setResults([]); // Очищаем результаты поиска при смене вкладки
  };

  // Обработчик отправки формы поиска
  const handleSearch = useCallback(
    async (e) => {
      e.preventDefault();
      if (!searchTerm.trim()) return; // Предотвращаем отправку пустого запроса

      setLoading(true); // Включаем индикатор загрузки
      try {
        const url = kidsMode
          ? `/api/v1/search/kids/${activeTab}/${encodeURIComponent(searchTerm)}`
          : `/api/v1/search/${activeTab}/${encodeURIComponent(searchTerm)}`;
        const res = await axios.get(url); // Отправляем GET запрос на сервер для поиска
        setResults(res.data.content); // Устанавливаем результаты поиска в состояние
      } catch (error) {
        if (error.response?.status === 404) {
          toast.error(
            "Nothing found, make sure you are searching under the right category",
          );
        } else {
          toast.error("An error occurred, please try again later");
        }
      } finally {
        setLoading(false); // Завершаем процесс загрузки
      }
    },
    [searchTerm, activeTab, kidsMode],
  );

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center gap-3 mb-4">
          <button
            className={`py-2 px-4 rounded ${activeTab === "movie" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`}
            onClick={() => handleTabClick("movie")}
          >
            Movies
          </button>
          <button
            className={`py-2 px-4 rounded ${activeTab === "tv" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`}
            onClick={() => handleTabClick("tv")}
          >
            TV Shows
          </button>
          <button
            className={`py-2 px-4 rounded ${activeTab === "person" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`}
            onClick={() => handleTabClick("person")}
          >
            Person
          </button>
        </div>

        <form
          className="flex gap-2 items-stretch mb-8 max-w-2xl mx-auto"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search for a ${activeTab}`}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded">
            <Search className="size-6" />
          </button>
        </form>

        {loading ? (
          <div className="text-center text-white">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {results.length === 0 ? (
              <div className="text-center text-white">No results found</div>
            ) : (
              results.map((result) => {
                if (!result.poster_path && !result.profile_path) return null;

                return (
                  <div key={result.id} className="bg-gray-800 p-4 rounded">
                    {activeTab === "person" ? (
                      <div className="flex flex-col items-center">
                        <img
                          src={ORIGINAL_IMG_BASE_URL + result.profile_path}
                          alt={result.name}
                          className="max-h-96 rounded mx-auto"
                        />
                        <h2 className="mt-2 text-xl font-bold">
                          {result.name}
                        </h2>
                      </div>
                    ) : (
                      <Link
                        to={"/watch/" + result.id}
                        onClick={() => {
                          setContentType(activeTab);
                        }}
                      >
                        <img
                          src={ORIGINAL_IMG_BASE_URL + result.poster_path}
                          alt={result.title || result.name}
                          className="w-full h-auto rounded"
                        />
                        <h2 className="mt-2 text-xl font-bold">
                          {result.title || result.name}
                        </h2>
                      </Link>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
