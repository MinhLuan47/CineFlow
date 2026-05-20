import { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * Middleware tiện ích bọc quanh các controller async để tự động chuyển tiếp (forward)
 * bất kỳ lỗi nào xảy ra sang cho Express Global Error Handler (thông qua hàm next).
 * Giúp tránh việc phải lặp lại các khối try/catch trong code điều hướng.
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
