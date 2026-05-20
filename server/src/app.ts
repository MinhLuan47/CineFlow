import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env';

const app = express();

// --- MIDDLEWARES CẤU HÌNH HỆ THỐNG ---

// Helmet giúp bảo mật ứng dụng Express bằng cách thiết lập các tiêu đề HTTP (HTTP headers) bảo mật phù hợp.
// Nó bảo vệ app khỏi một số lỗ hổng web phổ biến như XSS, Clickjacking, v.v.
app.use(helmet());

// Cấu hình CORS để xác định các domain (nguồn) nào được phép truy cập tài nguyên của API này.
// Sử dụng CLIENT_URL đã được xác thực từ cấu hình hệ thống.
app.use(cors({
  origin: env.CLIENT_URL,
  credentials: true // Cho phép gửi cookies/headers xác thực nếu có
}));

// Morgan là middleware ghi log các HTTP request nhận được, hỗ trợ kiểm tra vết trong quá trình phát triển (development).
app.use(morgan('dev'));

// Middleware phân tích cú pháp dữ liệu JSON từ body của request chuyển sang dạng Javascript Object.
app.use(express.json());

// --- ROUTES ---

// Route kiểm tra trạng thái hoạt động của hệ thống (Health Check)
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "CineFlow API is running"
  });
});

// Xử lý khi client truy cập các route không tồn tại (404 Not Found)
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: `Không tìm thấy API route: ${req.originalUrl}`
  });
});

// Middleware xử lý lỗi tập trung (Global Error Handler)
// Khi bất kỳ hàm nào gọi next(error) hoặc quăng lỗi không được bắt, middleware này sẽ xử lý và trả về JSON thống nhất.
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[SERVER ERROR]:', err);
  
  res.status(err.status || 500).json({
    success: false,
    message: env.NODE_ENV === 'production' 
      ? 'Đã xảy ra lỗi hệ thống phía server' 
      : err.message || 'Lỗi hệ thống'
  });
});

export default app;
