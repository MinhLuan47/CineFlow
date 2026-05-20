/**
 * Đường dẫn cơ sở kết nối tới API Backend Proxy của CineFlow.
 * Lấy từ biến môi trường VITE_API_BASE_URL được cấu hình trong .env.local.
 * Nếu không có, tự động sử dụng fallback mặc định http://localhost:4000/api cho quá trình phát triển (development).
 */
export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:4000/api';
