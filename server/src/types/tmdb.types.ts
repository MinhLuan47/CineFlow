// Interface mô tả các query parameter được hỗ trợ khi gửi yêu cầu đến TMDB API
export interface TmdbQueryParams {
  language?: string;
  region?: string;
  page?: number;
  query?: string;
  [key: string]: any; // Hỗ trợ thêm các parameters bổ sung khác tùy nhu cầu
}

// Cấu hình hình ảnh trả về từ TMDB /configuration
export interface TmdbImageConfig {
  base_url: string;
  secure_base_url: string;
  backdrop_sizes: string[];
  logo_sizes: string[];
  poster_sizes: string[];
  profile_sizes: string[];
  still_sizes: string[];
}

// Phản hồi chi tiết từ endpoint /configuration của TMDB
export interface TmdbConfigResponse {
  images: TmdbImageConfig;
  change_keys: string[];
}
