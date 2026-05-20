import { env } from './env';

// Cấu hình TMDB được rút trích từ biến môi trường đã kiểm duyệt bảo mật
export const tmdbConfig = {
  baseUrl: env.TMDB_BASE_URL,
  imageBaseUrl: env.TMDB_IMAGE_BASE_URL,
  accessToken: env.TMDB_ACCESS_TOKEN
};
