// Компонент для отображения скелета страницы просмотра
const WatchPageSkeleton = ({ width = "100%", height = "100px" }) => {
  return (
    <div className="animate-pulse space-y-4">
      {/* Заголовок скелетона */}
      <div
        className="bg-gray-700 rounded-md"
        style={{ width: width, height: height }}
      ></div>

      {/* Основное изображение/контент */}
      <div
        className="bg-gray-700 rounded-md"
        style={{ width: "100%", height: "300px" }}
      ></div>

      {/* Описание контента */}
      <div className="bg-gray-700 rounded-md w-3/4 h-6"></div>
      <div className="bg-gray-700 rounded-md w-1/2 h-6"></div>

      {/* Дополнительная информация/контент */}
      <div className="bg-gray-700 rounded-md w-full h-24"></div>
    </div>
  );
};

export default WatchPageSkeleton;
