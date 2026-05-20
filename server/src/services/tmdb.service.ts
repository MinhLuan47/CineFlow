import axios, { AxiosInstance, AxiosError } from 'axios';
import { tmdbConfig } from '../config/tmdb';
import { TmdbQueryParams } from '../types/tmdb.types';
import { ApiError } from '../utils/response';

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
   * @param endpoint Đường dẫn API cụ thể trên TMDB (ví dụ: '/configuration', '/movie/popular')
   * @param params Bộ tham số truy vấn bổ sung (language, region, page, query, v.v.)
   */
  async get<T>(endpoint: string, params: TmdbQueryParams = {}): Promise<T> {
    try {
      // Thiết lập cấu hình mặc định (ví dụ mặc định lấy ngôn ngữ vi-VN nếu không truyền vào)
      const queryParams = {
        language: 'vi-VN',
        ...params
      };

      const response = await this.client.get<T>(endpoint, {
        params: queryParams
      });

      return response.data;
    } catch (error: any) {
      // Bắt lỗi và chuyển đổi sang ApiError thống nhất cho hệ thống
      this.handleError(error);
    }
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
