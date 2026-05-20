/**
 * Tiện ích hỗ trợ lưu trữ cục bộ (LocalStorage) có thiết lập thời gian hết hạn (TTL).
 * Sử dụng để lưu trữ cache danh sách thể loại phim.
 */

interface CacheItem<T> {
  value: T;
  expiry: number; // Timestamp miliseconds khi cache hết hạn
}

/**
 * Lưu dữ liệu vào localStorage kèm theo TTL (Time to Live).
 * @param key Khóa định danh cache
 * @param value Dữ liệu cần lưu
 * @param ttlMs Thời gian sống của dữ liệu (tính bằng mili-giây)
 */
export function setLocalCache<T>(key: string, value: T, ttlMs: number): void {
  try {
    const expiry = Date.now() + ttlMs;
    const item: CacheItem<T> = { value, expiry };
    localStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.error(`Lỗi khi lưu cache cho key "${key}":`, error);
  }
}

/**
 * Lấy dữ liệu từ localStorage, tự động xóa nếu đã quá hạn TTL.
 * @param key Khóa định danh cache
 * @returns Trả về dữ liệu nếu còn hạn, hoặc null nếu hết hạn/không tồn tại
 */
export function getLocalCache<T>(key: string): T | null {
  try {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    const item: CacheItem<T> = JSON.parse(itemStr);
    
    // Kiểm tra xem dữ liệu đã hết hạn chưa
    if (Date.now() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }

    return item.value;
  } catch (error) {
    console.error(`Lỗi khi đọc cache cho key "${key}":`, error);
    return null;
  }
}

/**
 * Xóa một khóa khỏi cache localStorage.
 * @param key Khóa định danh cache
 */
export function removeLocalCache(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Lỗi khi xóa cache cho key "${key}":`, error);
  }
}
