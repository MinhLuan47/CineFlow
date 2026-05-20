import { API_BASE_URL } from '../config/api';

/**
 * Định dạng phản hồi chuẩn nhận được từ CineFlow Backend API Proxy.
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    cached?: boolean;
    page?: number;
    totalPages?: number;
    totalResults?: number;
    [key: string]: any;
  };
}

/**
 * Xây dựng chuỗi truy vấn (query string) từ một đối tượng chứa các tham số tùy chọn.
 * @param params Đối tượng chứa các cặp khóa/trị cần chuyển thành chuỗi truy vấn
 */
const buildQueryString = (params?: Record<string, any>): string => {
  if (!params) return '';

  const cleanParams: Record<string, string> = {};
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      cleanParams[key] = String(value);
    }
  });

  const query = new URLSearchParams(cleanParams).toString();
  return query ? `?${query}` : '';
};

/**
 * Hàm gọi API chung (Generic GET request) giao tiếp với Backend Proxy sử dụng fetch.
 * @param path Đường dẫn endpoint mong muốn (Ví dụ: '/movies/trending')
 * @param params Đối tượng chứa tham số query tùy chọn (Ví dụ: { page: 1, language: 'vi-VN' })
 */
export async function apiGet<T>(
  path: string,
  params?: Record<string, any>
): Promise<ApiResponse<T>> {
  // Chuẩn hóa đường dẫn đảm bảo không bị trùng dấu gạch chéo kép
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const queryString = buildQueryString(params);
  const url = `${API_BASE_URL}${cleanPath}${queryString}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    // Trường hợp mã lỗi HTTP không thuộc khoảng 200 - 299
    if (!response.ok) {
      let errorMessage = `Yêu cầu API thất bại với mã trạng thái ${response.status}`;
      try {
        const errorJson = await response.json();
        if (errorJson && errorJson.message) {
          errorMessage = errorJson.message;
        }
      } catch {
        // Bỏ qua nếu phản hồi không phải là định dạng JSON hợp lệ
      }
      throw new Error(errorMessage);
    }

    const result: ApiResponse<T> = await response.json();

    // Trường hợp backend phản hồi thành công nhưng trường success là false
    if (!result.success) {
      throw new Error(result.message || 'Đã xảy ra lỗi bất thường từ máy chủ');
    }

    return result;
  } catch (error: any) {
    // Xử lý lỗi kết nối mạng vật lý hoặc máy chủ không hoạt động
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Không thể kết nối đến máy chủ API. Vui lòng kiểm tra lại đường truyền mạng hoặc khởi chạy backend.');
    }
    throw error;
  }
}
