import express from "express";
import {
  getSearchHistory,
  removeItemFromSearchHistory,
  searchMovie,
  searchPerson,
  searchTv,
} from "../controllers/search.controller.js";

const router = express.Router();

// Маршрут для поиска человека по запросу
router.get("/person/:query", searchPerson);

// Маршрут для поиска фильма по запросу
router.get("/movie/:query", searchMovie);

// Маршрут для поиска телешоу по запросу
router.get("/tv/:query", searchTv);

// Маршрут для получения истории поиска
router.get("/history", getSearchHistory);

// Маршрут для удаления элемента из истории поиска по ID
router.delete("/history/:id", removeItemFromSearchHistory);

export default router;
