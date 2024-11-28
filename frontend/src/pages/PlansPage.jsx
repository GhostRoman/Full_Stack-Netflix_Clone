import React from "react";
import { useNavigate } from "react-router-dom";

// Компонент для отображения страницы выбора планов
const PlansPage = () => {
  const navigate = useNavigate(); // Хук для навигации

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Основной контент */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Choose Your Plan</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Бесплатный план */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl hover:bg-gray-700 transition">
            <h2 className="text-2xl font-semibold mb-4">Free Plan</h2>
            <p className="text-gray-300 mb-4">
              Enjoy limited access to our collection of movies and TV shows.
            </p>
            <ul className="mb-6 text-gray-400">
              <li>✔ Access to free content</li>
              <li>✖ No offline downloads</li>
              <li>✖ No premium content</li>
            </ul>
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition w-full"
              disabled
            >
              Current Plan
            </button>
          </div>

          {/* Платный план */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl hover:bg-gray-700 transition">
            <h2 className="text-2xl font-semibold mb-4">Premium Plan</h2>
            <p className="text-gray-300 mb-4">
              Unlock all premium content, offline downloads, and more!
            </p>
            <ul className="mb-6 text-gray-400">
              <li>✔ Access to all content</li>
              <li>✔ Offline downloads</li>
              <li>✔ Premium movies and shows</li>
            </ul>
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition w-full"
              onClick={() => navigate("/subscription")}
            >
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansPage;
