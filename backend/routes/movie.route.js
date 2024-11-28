import express from "express";
import {
  getKidFriendlyMovies,
  getMovieDetails,
  getMoviesByCategory,
  getMovieTrailers,
  getSimilarMovies,
  getTrendingMovie,
} from "../controllers/movie.controller.js";

const router = express.Router();

// Маршрут для получения трендовых фильмов
router.get("/trending", getTrendingMovie);

// Маршрут для получения трейлеров фильма по ID
router.get("/:id/trailers", getMovieTrailers);

// Маршрут для получения деталей фильма по ID
router.get("/:id/details", getMovieDetails);

// Маршрут для получения похожих фильмов по ID
router.get("/:id/similar", getSimilarMovies);

// Маршрут для получения фильмов по категории
router.get("/:category", getMoviesByCategory);

// Маршрут для получения детских фильмов
router.get("/kids/friendly", getKidFriendlyMovies);

export default router;
