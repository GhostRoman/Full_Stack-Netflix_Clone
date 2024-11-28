import express from "express";
import {
  getSimilarTvs,
  getTrendingTv,
  getTvDetails,
  getTvsByCategory,
  getTvTrailers,
} from "../controllers/tv.controller.js";

const router = express.Router();

// Маршрут для получения трендовых телешоу
router.get("/trending", getTrendingTv);

// Маршрут для получения трейлеров телешоу по ID
router.get("/:id/trailers", getTvTrailers);

// Маршрут для получения деталей телешоу по ID
router.get("/:id/details", getTvDetails);

// Маршрут для получения похожих телешоу по ID
router.get("/:id/similar", getSimilarTvs);

// Маршрут для получения телешоу по категории
router.get("/:category", getTvsByCategory);

export default router;
