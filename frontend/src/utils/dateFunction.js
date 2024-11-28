/**
 * Функция для форматирования даты выпуска
 * @param {string} date - Дата в строковом формате
 * @returns {string} - Форматированная дата в виде строки
 */
export function formatReleaseDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
