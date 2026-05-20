import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/response';

/**
 * Middleware xử lý các request không khớp với bất kỳ route nào đã khai báo (404 Not Found).
 * Quăng lỗi ApiError 404 để chuyển tiếp tới errorMiddleware xử lý thống nhất.
 */
export const notFoundMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const error = new ApiError(
    404,
    `Không tìm thấy API route: [${req.method}] ${req.originalUrl}`,
    'NOT_FOUND'
  );
  next(error);
};
