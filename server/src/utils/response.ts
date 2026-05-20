import { Response } from 'express';

// Interface đại diện cho cấu trúc phản hồi thành công thống nhất của hệ thống
interface SuccessResponse<T> {
  success: true;
  message: string;
  data?: T;
  meta?: Record<string, any>;
}

/**
 * Helper gửi phản hồi thành công (success response) đồng nhất cho API.
 * @param res Đối tượng Response của Express
 * @param data Dữ liệu phản hồi chính
 * @param message Thông điệp phản hồi
 * @param statusCode HTTP Status Code (Mặc định là 200 OK)
 * @param meta Thông tin bổ sung (Ví dụ: phân trang, phiên bản API)
 */
export const sendSuccess = <T>(
  res: Response,
  data: T,
  message = 'OK',
  statusCode = 200,
  meta?: Record<string, any>
): Response => {
  const responseBody: SuccessResponse<T> = {
    success: true,
    message,
    data
  };

  if (meta) {
    responseBody.meta = meta;
  }

  return res.status(statusCode).json(responseBody);
};

/**
 * Lớp lỗi tùy chỉnh (Custom Error Class) kế thừa từ lớp Error gốc của JavaScript.
 * Được dùng để ném ra các lỗi nghiệp vụ xác định trong API.
 */
export class ApiError extends Error {
  statusCode: number;
  code: string;
  details?: any;

  constructor(statusCode: number, message: string, code = 'INTERNAL_ERROR', details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    
    // Đảm bảo prototype chain hoạt động chuẩn xác khi kế thừa trong TypeScript
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
