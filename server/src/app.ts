import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env';
import { sendSuccess, ApiError } from './utils/response';
import { asyncHandler } from './utils/async-handler';
import { errorMiddleware } from './middlewares/error.middleware';
import { notFoundMiddleware } from './middlewares/not-found.middleware';

const app = express();

// --- MIDDLEWARES CẤU HÌNH HỆ THỐNG ---

// Helmet giúp bảo mật ứng dụng Express bằng cách thiết lập các tiêu đề HTTP (HTTP headers) bảo mật phù hợp.
app.use(helmet());

// Cấu hình CORS để xác định các domain (nguồn) nào được phép truy cập tài nguyên của API này.
app.use(cors({
  origin: env.CLIENT_URL,
  credentials: true // Cho phép gửi cookies/headers xác thực nếu có
}));

// Morgan là middleware ghi log các HTTP request nhận được, hỗ trợ kiểm tra vết trong quá trình phát triển (development).
app.use(morgan('dev'));

// Middleware phân tích cú pháp dữ liệu JSON từ body của request chuyển sang dạng Javascript Object.
app.use(express.json());

// --- ROUTES ---

// Route kiểm tra trạng thái hoạt động của hệ thống (Health Check) sử dụng helper sendSuccess
app.get('/api/health', (req: Request, res: Response) => {
  sendSuccess(res, null, 'CineFlow API is running');
});

// Thêm route thử nghiệm lỗi chỉ trong môi trường phát triển (Development)
if (env.NODE_ENV === 'development') {
  app.get(
    '/api/test-error',
    asyncHandler(async (req: Request, res: Response) => {
      // Ném thử lỗi ApiError để kiểm tra cơ chế error middleware hoạt động
      throw new ApiError(
        400,
        'Đây là thông báo lỗi thử nghiệm từ cổng test-error',
        'TEST_ERROR_CODE',
        {
          timestamp: new Date().toISOString(),
          reason: 'Kiểm tra cơ chế hoạt động của error middleware và asyncHandler'
        }
      );
    })
  );
}

// Xử lý khi client truy cập các route không tồn tại (404 Not Found)
app.use(notFoundMiddleware);

// Middleware xử lý lỗi tập trung toàn cục (Global Error Handler)
app.use(errorMiddleware);

export default app;
