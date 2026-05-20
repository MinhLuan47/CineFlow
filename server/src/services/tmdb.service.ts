import axios, { AxiosInstance, AxiosError } from 'axios';
import { tmdbConfig } from '../config/tmdb';
import { TmdbQueryParams } from '../types/tmdb.types';
import { ApiError } from '../utils/response';
import { buildCacheKey, getOrSetCache } from '../utils/cache';

class TmdbService {
  private client: AxiosInstance;

  constructor() {
    // Khởi tạo một đối tượng Axios Instance dành riêng cho việc gọi TMDB API
    this.client = axios.create({
      baseURL: tmdbConfig.baseUrl,
      timeout: 10000, // Cài đặt giới hạn thời gian kết nối tối đa là 10 giây (Timeout handling)
      headers: {
        Authorization: `Bearer ${tmdbConfig.accessToken}`, // Sử dụng Access Token bảo mật
        Accept: 'application/json'
      }
    });
  }

  /**
   * Phương thức chung (generic method) để thực hiện các yêu cầu GET tới TMDB API.
   * Có hỗ trợ tùy chọn cache để tăng tốc độ phản hồi và giảm số lượng request gọi lên TMDB.
   * @param endpoint Đường dẫn API cụ thể trên TMDB (ví dụ: '/configuration')
   * @param params Bộ tham số truy vấn bổ sung (language, region, page, query, v.v.)
   * @param options Các tùy chọn về cache (useCache: có dùng cache không, ttlSeconds: thời gian cache tùy chỉnh)
   */
  async get<T>(
    endpoint: string,
    params: TmdbQueryParams = {},
    options: { useCache?: boolean; ttlSeconds?: number } = {}
  ): Promise<{ data: T; cached: boolean }> {
    const { useCache = false, ttlSeconds } = options;

    const queryParams = {
      language: 'vi-VN',
      ...params
    };

    // Hàm gọi API thực tế tới TMDB máy chủ
    const fetchFromServer = async (): Promise<T> => {
      try {
        const response = await this.client.get<T>(endpoint, {
          params: queryParams
        });
        return response.data;
      } catch (error: any) {
        this.handleError(error);
      }
    };

    // Nếu kích hoạt cache, sử dụng bộ getOrSetCache
    if (useCache) {
      const cacheKey = buildCacheKey(endpoint, queryParams);
      return getOrSetCache<T>(cacheKey, fetchFromServer, ttlSeconds);
    }

    // Nếu không dùng cache, gọi trực tiếp từ TMDB và trả về cached: false
    const freshData = await fetchFromServer();
    return { data: freshData, cached: false };
  }

  /**
   * Phương thức chuyển tiếp và ánh xạ lỗi từ Axios/TMDB thành ApiError tương thích của CineFlow.
   */
  private handleError(error: any): never {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<any>;
      const response = axiosError.response;

      if (response) {
        // Trường hợp API TMDB tiếp nhận và trả về mã lỗi cụ thể (4xx, 5xx)
        const status = response.status;
        const tmdbMessage = response.data?.status_message || 'Yêu cầu tới TMDB thất bại';
        const tmdbCode = `TMDB_API_ERROR_${response.data?.status_code || status}`;

        throw new ApiError(status, tmdbMessage, tmdbCode, response.data);
      } else if (axiosError.request) {
        // Trường hợp gửi đi nhưng không nhận được phản hồi (ví dụ: mất kết nối, mạng lỗi hoặc timeout)
        if (axiosError.code === 'ECONNABORTED' || axiosError.message.includes('timeout')) {
          throw new ApiError(
            504,
            'Kết nối tới TMDB API bị quá hạn thời gian chờ (Timeout)',
            'TMDB_REQUEST_TIMEOUT'
          );
        }
        throw new ApiError(
          503,
          'Không thể kết nối đến máy chủ TMDB (Lỗi kết nối mạng)',
          'TMDB_NETWORK_ERROR'
        );
      }
    }

    // Các lỗi mã nguồn khác ngoài mong đợi
    throw new ApiError(
      500,
      error.message || 'Lỗi không xác định khi kết nối với TMDB API',
      'TMDB_INTERNAL_ERROR'
    );
  }
}

export const tmdbService = new TmdbService();
