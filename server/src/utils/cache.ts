import NodeCache from 'node-cache';
import { env } from '../config/env';

// Khởi tạo thực thể node-cache với thời gian sống mặc định (default TTL) và chu kỳ quét dọn dẹp bộ nhớ
const cache = new NodeCache({
  stdTTL: env.CACHE_TTL_SECONDS, // Thời gian lưu mặc định (giây) tính từ env
  checkperiod: 120 // Quét và thu hồi các khóa hết hạn sau mỗi 120 giây
});

/**
 * Xây dựng khóa cache (cache key) chuẩn hóa dựa trên không gian tên (namespace) và bộ tham số truyền vào.
 * @param namespace Tên định danh phân vùng (ví dụ: 'configuration', 'movie_popular')
 * @param params Các tham số bổ sung để cá nhân hóa kết quả (ví dụ: { page: 1, language: 'vi-VN' })
 */
export const buildCacheKey = (namespace: string, params: Record<string, any> = {}): string => {
  // Sắp xếp các tham số theo tên khóa để đảm bảo thứ tự truyền vào không tạo ra các cache key khác nhau
  const sortedParamsString = Object.keys(params)
    .sort()
    .map((key) => `${key}:${JSON.stringify(params[key])}`)
    .join('_');

  return sortedParamsString ? `${namespace}:${sortedParamsString}` : namespace;
};

/**
 * Lấy dữ liệu thô từ cache.
 */
export const getCache = <T>(key: string): T | undefined => {
  return cache.get<T>(key);
};

/**
 * Ghi đè hoặc thiết lập giá trị cache cho một khóa cụ thể.
 */
export const setCache = <T>(key: string, data: T, ttlSeconds = env.CACHE_TTL_SECONDS): boolean => {
  return cache.set(key, data, ttlSeconds);
};

// Cấu trúc kết quả trả về của hàm getOrSetCache
export interface CacheResult<T> {
  data: T;
  cached: boolean;
}

/**
 * Hàm tiện ích nâng cao: Thực hiện lấy dữ liệu từ cache nếu có sẵn.
 * Trong trường hợp cache bị hụt (cache miss), hàm sẽ tự động gọi fetcher() để lấy dữ liệu mới,
 * lưu vào cache với TTL tương ứng và trả về.
 * @param key Khóa cache độc nhất
 * @param fetcher Hàm async thực thi lấy dữ liệu gốc (khi cache miss)
 * @param ttlSeconds Thời gian sống tùy chỉnh của dữ liệu
 */
export const getOrSetCache = async <T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds = env.CACHE_TTL_SECONDS
): Promise<CacheResult<T>> => {
  const cachedData = getCache<T>(key);
  if (cachedData !== undefined) {
    return { data: cachedData, cached: true };
  }

  const freshData = await fetcher();
  setCache(key, freshData, ttlSeconds);
  return { data: freshData, cached: false };
};

/**
 * Xuất chỉ số thống kê và danh sách khóa đang được quản lý bởi cache layer.
 */
export const getCacheStats = () => {
  return {
    keysCount: cache.keys().length,
    keys: cache.keys(),
    stats: cache.getStats()
  };
};
