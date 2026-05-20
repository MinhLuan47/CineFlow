import app from './app';
import { env } from './config/env';

const PORT = env.PORT;

const server = app.listen(PORT, () => {
  console.log(`[SERVER]: Server đang chạy thành công tại cổng ${PORT} trong chế độ ${env.NODE_ENV}`);
});

// --- PHÒNG CHỐNG CRASH HỆ THỐNG (GRACEFUL SHUTDOWN / ERROR HANDLING) ---

// Xử lý các lỗi đồng bộ chưa được bắt ở bất kỳ nơi nào trong mã nguồn (Uncaught Exceptions).
// Việc log lại và khởi động lại process (thông qua PM2 hoặc Docker restart policy) là cực kỳ quan trọng để đảm bảo tính ổn định.
process.on('uncaughtException', (err: Error) => {
  console.error('[UNCAUGHT EXCEPTION]: Ứng dụng gặp lỗi đồng bộ nghiêm trọng:', err);
  console.warn('[SERVER]: Tiến hành dừng server an toàn để tránh rò rỉ bộ nhớ hoặc dữ liệu sai lệch...');
  
  // Đóng server và thoát với mã lỗi 1
  server.close(() => {
    process.exit(1);
  });
});

// Xử lý các Promise bị reject mà không có catch (Unhandled Rejections).
// Node.js yêu cầu bắt các lỗi này để tránh app rơi vào trạng thái không xác định.
process.on('unhandledRejection', (reason: any) => {
  console.error('[UNHANDLED REJECTION]: Promise bị từ chối mà không được catch:', reason);
  console.warn('[SERVER]: Tiến hành dừng server an toàn...');
  
  server.close(() => {
    process.exit(1);
  });
});
