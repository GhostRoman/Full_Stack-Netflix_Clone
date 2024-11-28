Основные функции API
Аутентификация:

POST /api/v1/auth/register — регистрация пользователя.
POST /api/v1/auth/login — вход в систему.
POST /api/v1/auth/forgot-password — восстановление пароля.
Контент:

GET /api/v1/movie/trending — получение трендовых фильмов.
GET /api/v1/movie/:id — получение деталей фильма.
GET /api/v1/movie/:id/trailers — трейлеры фильма.
GET /api/v1/movie/:id/similar — похожие фильмы.
Подписки:

POST /create-payment-intent — создание платежного намерения.
POST /payment-success — подтверждение успешного платежа.
Детский режим:

GET /api/v1/movie/kids — фильтрация детского контента по рейтингам.
