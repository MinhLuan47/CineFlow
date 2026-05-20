import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ApiError } from '../utils/response';
import { env } from '../config/env';

/**
 * Middleware xử lý lỗi tập trung toàn cục (Global Error Middleware).
 * Mọi lỗi chưa được bắt trong route hoặc do chúng ta chủ động quăng ra (ApiError)
 * đều sẽ chạy qua đây để trả về cấu trúc lỗi JSON thống nhất cho client.
 */
export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = 500;
  let message = 'Đã xảy ra lỗi hệ thống';
  let errorCode = 'INTERNAL_ERROR';
  let details: any = undefined;

  // Kiểm tra xem lỗi nhận được có phải là lỗi nghiệp vụ được định nghĩa trước (ApiError) hay không
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errorCode = err.code;
    details = err.details;
  } else if (err instanceof ZodError) {
    // Xử lý lỗi kiểm duyệt dữ liệu đầu vào bằng Zod
    statusCode = 400;
    message = 'Dữ liệu yêu cầu không hợp lệ';
    errorCode = 'VALIDATION_ERROR';
    details = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message
    }));
  } else if (err instanceof Error) {
    // Trường hợp lỗi thông thường từ Node.js (ví dụ: DB crash, SyntaxError, ReferenceError)
    message = err.message;
  }

  const isProduction = env.NODE_ENV === 'production';

  // Định dạng phản hồi lỗi thống nhất theo chuẩn yêu cầu
  const responseErrorBody = {
    success: false as const,
    message: isProduction && statusCode === 500 ? 'Đã xảy ra lỗi hệ thống phía server' : message,
    error: {
      code: errorCode,
      details: details || (isProduction ? undefined : err.stack) // Không trả lộ stack trace ở production vì bảo mật
    }
  };

  // Log chi tiết lỗi lên console của server để debug
  console.error(`[ERROR LOG] [${req.method}] ${req.originalUrl} - ${statusCode} - ${message}`);
  if (!isProduction && err.stack) {
    console.error(err.stack);
  }

  res.status(statusCode).json(responseErrorBody);
};
