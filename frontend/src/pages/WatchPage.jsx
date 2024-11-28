import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContentStore } from "../store/content";
import axios from "axios";
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants";
import { formatReleaseDate } from "../utils/dateFunction";
import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton";
import { useMode } from "../context/ModeContext";

// Компонент для отображения страницы просмотра контента
const WatchPage = () => {
  const { id } = useParams(); // Получаем ID контента из параметров URL
  const [trailers, setTrailers] = useState([]); // Состояние для хранения трейлеров
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0); // Состояние для текущего индекса трейлера
  const [loading, setLoading] = useState(true); // Состояние для управления загрузкой
  const [content, setContent] = useState({}); // Состояние для хранения деталей контента
  const [similarContent, setSimilarContent] = useState([]); // Состояние для хранения похожего контента
  const { contentType } = useContentStore(); // Получаем тип контента из zustand хранилища
  const { kidsMode } = useMode(); // Получаем режим для детей из контекста

  const sliderRef = useRef(null); // Создаем реф для слайдера

  // Получаем трейлеры контента при изменении типа контента, ID или режима для детей
  useEffect(() => {
    const getTrailers = async () => {
      try {
        const url = kidsMode
          ? `/api/v1/${contentType}/kids/${id}/trailers`
          : `/api/v1/${contentType}/${id}/trailers`;
        const res = await axios.get(url);
        setTrailers(res.data.trailers); // Устанавливаем трейлеры в состояние
      } catch (error) {
        if (error.message.includes("404")) {
          setTrailers([]);
        }
      }
    };

    getTrailers(); // Вызываем функцию получения трейлеров
  }, [contentType, id, kidsMode]);

  // Получаем похожий контент при изменении типа контента, ID или режима для детей
  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const url = kidsMode
          ? `/api/v1/${contentType}/kids/${id}/similar`
          : `/api/v1/${contentType}/${id}/similar`;
        const res = await axios.get(url);
        setSimilarContent(res.data.similar); // Устанавливаем похожий контент в состояние
      } catch (error) {
        if (error.message.includes("404")) {
          setSimilarContent([]);
        }
      }
    };

    getSimilarContent(); // Вызываем функцию получения похожего контента
  }, [contentType, id, kidsMode]);

  // Используем useEffect для получения деталей контента
  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const url = kidsMode
          ? `/api/v1/${contentType}/kids/${id}/details`
          : `/api/v1/${contentType}/${id}/details`;
        const res = await axios.get(url);

        // Проверяем наличие данных
        if (!res.data || !res.data.content) throw new Error("Invalid response");
        setContent(res.data.content); // Устанавливаем данные контента
      } catch (error) {
        console.error("Failed to fetch content details:", error);
        setContent(null); // Устанавливаем null, если данных нет
      } finally {
        setLoading(false); // Завершаем состояние загрузки
      }
    };

    getContentDetails(); // Вызываем функцию получения данных
  }, [contentType, id, kidsMode]);

  // Функция обработки трейлеров
  const handleNext = () => {
    if (trailers && currentTrailerIdx < trailers.length - 1)
      setCurrentTrailerIdx((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (trailers && currentTrailerIdx > 0)
      setCurrentTrailerIdx((prev) => prev - 1);
  };

  // Функции для прокрутки слайдера
  const scrollLeft = () => {
    if (sliderRef.current)
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
  };
  const scrollRight = () => {
    if (sliderRef.current)
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
  };

  // Отображаем скелетон при загрузке
  if (loading)
    return (
      <div className="min-h-screen bg-black p-10">
        <WatchPageSkeleton />
      </div>
    );

  // Проверка данных перед отображением
  if (!content) {
    return (
      <div className="bg-black text-white h-screen">
        <div className="max-w-6xl mx-auto">
          <Navbar />
          <div className="text-center mx-auto px-4 py-8 h-full mt-40">
            <h2 className="text-2xl sm:text-5xl font-bold text-balance">
              Content not found 😥
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="mx-auto container px-4 py-8 h-full">
        <Navbar />

        {trailers.length > 0 && (
          <div className="flex justify-between items-center mb-4">
            <button
              className={`
              bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                currentTrailerIdx === 0 ? "opacity-50 cursor-not-allowed " : ""
              }}
              `}
              disabled={currentTrailerIdx === 0}
              onClick={handlePrev}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              className={`
              bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                currentTrailerIdx === trailers.length - 1
                  ? "opacity-50 cursor-not-allowed "
                  : ""
              }}
              `}
              disabled={currentTrailerIdx === trailers.length - 1}
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
          {trailers.length > 0 && (
            <ReactPlayer
              controls={true}
              width={"100%"}
              height={"70vh"}
              className="mx-auto overflow-hidden rounded-lg"
              url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
            />
          )}

          {trailers?.length === 0 && (
            <h2 className="text-xl text-center mt-5">
              No trailers available for{" "}
              <span className="font-bold text-red-600">
                {content?.title || content?.name}
              </span>{" "}
              😥
            </h2>
          )}
        </div>

        {/* movie details */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-20
          max-w-6xl mx-auto"
        >
          <div className="mb-4 md:mb-0">
            <h2 className="text-5xl font-bold text-balance">
              {content?.title || content?.name}
            </h2>

            <p className="mt-2 text-lg">
              {formatReleaseDate(
                content?.release_date || content?.first_air_date,
              )}{" "}
              |{" "}
              {content?.adult ? (
                <span className="text-red-600">18+</span>
              ) : (
                <span className="text-green-600">PG-13</span>
              )}{" "}
            </p>
            <p className="mt-4 text-lg">{content?.overview}</p>
          </div>
          <img
            src={ORIGINAL_IMG_BASE_URL + content?.poster_path}
            alt="Poster image"
            className="max-h-[600px] rounded-md"
          />
        </div>

        {similarContent.length > 0 && (
          <div className="mt-12 max-w-5xl mx-auto relative">
            <h3 className="text-3xl font-bold mb-4">Similar Movies/Tv Show</h3>

            <div
              className="flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group"
              ref={sliderRef}
            >
              {similarContent.map((content) => {
                if (content.poster_path === null) return null;
                return (
                  <Link
                    key={content.id}
                    to={`/watch/${content.id}`}
                    className="w-52 flex-none"
                  >
                    <img
                      src={SMALL_IMG_BASE_URL + content.poster_path}
                      alt="Poster path"
                      className="w-full h-auto rounded-md"
                    />
                    <h4 className="mt-2 text-lg font-semibold">
                      {content.title || content.name}
                    </h4>
                  </Link>
                );
              })}

              <ChevronRight
                className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8
                        opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer
                          bg-red-600 text-white rounded-full"
                onClick={scrollRight}
              />
              <ChevronLeft
                className="absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0
                  group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600
                  text-white rounded-full"
                onClick={scrollLeft}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchPage;
