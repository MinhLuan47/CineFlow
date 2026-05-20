import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Hàm cn kết hợp clsx và tailwind-merge để gộp các class Tailwind một cách thông minh.
 * Giải quyết xung đột giữa các class (ví dụ: 'p-4' và 'p-2' sẽ được giải quyết gọn gàng).
 * 
 * @param inputs - Danh sách các class hoặc điều kiện class
 * @returns Chuỗi class đã được tối ưu hóa
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
