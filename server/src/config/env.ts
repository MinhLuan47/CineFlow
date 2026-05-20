import dotenv from 'dotenv';
import { z } from 'zod';

// Tải các biến môi trường từ file .env
dotenv.config();

// Định nghĩa schema kiểm duyệt cho các biến môi trường bằng Zod
const envSchema = z.object({
  PORT: z
    .string()
    .transform((val) => {
      const parsed = parseInt(val, 10);
      if (isNaN(parsed)) {
        throw new Error('PORT phải là một số hợp lệ');
      }
      return parsed;
    })
    .default('4000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  CLIENT_URL: z.string().url('CLIENT_URL phải là một URL hợp lệ').default('http://localhost:5173'),
  TMDB_BASE_URL: z.string().url('TMDB_BASE_URL phải là một URL hợp lệ').default('https://api.themoviedb.org/3'),
  TMDB_IMAGE_BASE_URL: z.string().url('TMDB_IMAGE_BASE_URL phải là một URL hợp lệ').default('https://image.tmdb.org/t/p'),
  TMDB_ACCESS_TOKEN: z.string({
    required_error: 'TMDB_ACCESS_TOKEN là bắt buộc nhưng chưa được cấu hình trong file .env'
  }).min(1, 'TMDB_ACCESS_TOKEN không được để trống'),
  CACHE_TTL_SECONDS: z
    .string()
    .transform((val) => {
      const parsed = parseInt(val, 10);
      if (isNaN(parsed)) {
        throw new Error('CACHE_TTL_SECONDS phải là một số hợp lệ');
      }
      return parsed;
    })
    .default('21600')
});

// Thực hiện phân tích cú pháp (parse) và xác thực biến môi trường
const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error('❌ LỖI KHỞI TẠO BIẾN MÔI TRƯỜNG (.env):');
  
  // Trích xuất các lỗi cụ thể để dev dễ dàng debug
  const formattedErrors = result.error.format();
  Object.entries(formattedErrors).forEach(([key, value]) => {
    if (key !== '_errors') {
      const errors = (value as any)._errors;
      console.error(`  - ${key}: ${errors.join(', ')}`);
    }
  });
  
  throw new Error('Khởi chạy server thất bại do thiếu hoặc cấu hình sai biến môi trường.');
}

// Đối tượng cấu hình đã được kiểm duyệt và có kiểu dữ liệu mạnh (strongly-typed)
export const env = result.data;
