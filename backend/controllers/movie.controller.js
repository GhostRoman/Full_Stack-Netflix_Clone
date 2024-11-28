import { fetchFromTMDB } from "../services/tmdb.service.js";

// Функция для получения трендового фильма
export async function getTrendingMovie(req, res) {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    );
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];

    res.json({ success: true, content: randomMovie });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// Функция для получения трейлеров фильма
export async function getMovieTrailers(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
    );
    res.json({ success: true, trailers: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// Функция для получения деталей фильма
export async function getMovieDetails(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    );
    res.status(200).json({ success: true, content: data });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// Функция для получения похожих фильмов
export async function getSimilarMovies(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
    );
    res.status(200).json({ success: true, similar: data.results });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// Функция для получения фильмов по категории
export async function getMoviesByCategory(req, res) {
  const { category } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
    );
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// Функция для получения сертификаций фильмов
async function getCertifications() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  };

  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/certification/movie/list",
      options,
    );
    const data = await response.json();
    return data.certifications;
  } catch (err) {
    console.error(err);
  }
}

// Функция для фильтрации детских фильмов по сертификации
function filterKidFriendlyMovies(movies, certifications) {
  const kidFriendlyCertifications = ["G", "PG"];

  return movies.filter((movie) => {
    const movieCert = certifications.find(
      (cert) => cert.certification === movie.certification,
    );
    return (
      movieCert && kidFriendlyCertifications.includes(movieCert.certification)
    );
  });
}

// Функция для получения и фильтрации детских фильмов
export async function getKidFriendlyMovies() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  };

  try {
    const certifications = await getCertifications();
    const response = await fetch(
      "https://api.themoviedb.org/3/discover/movie",
      options,
    );
    const data = await response.json();
    const movies = data.results;

    const kidFriendlyMovies = filterKidFriendlyMovies(movies, certifications);
    console.log(kidFriendlyMovies);
  } catch (err) {
    console.error(err);
  }
}
