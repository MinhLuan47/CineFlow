import { apiGet } from './apiClient';
import type { NormalizedMovie, NormalizedVideo, NormalizedCast, ApiQueryParams } from '../types/api';

// Tham số mặc định cho các yêu cầu API ở phía Frontend CineFlow
const DEFAULT_PARAMS = {
  page: 1,
  language: 'vi-VN',
  region: 'VN'
};

/**
 * Lấy danh sách phim điện ảnh xu hướng trong ngày (Trending).
 */
export async function getTrendingMovies(params?: ApiQueryParams) {
  const query = { ...DEFAULT_PARAMS, ...params };
  const response = await apiGet<NormalizedMovie[]>('/movies/trending', query);
  return response;
}

/**
 * Lấy danh sách phim điện ảnh phổ biến nhất (Popular).
 */
export async function getPopularMovies(params?: ApiQueryParams) {
  const query = { ...DEFAULT_PARAMS, ...params };
  const response = await apiGet<NormalizedMovie[]>('/movies/popular', query);
  return response;
}

/**
 * Lấy danh sách phim điện ảnh đang chiếu rạp (Now Playing).
 */
export async function getNowPlayingMovies(params?: ApiQueryParams) {
  const query = { ...DEFAULT_PARAMS, ...params };
  const response = await apiGet<NormalizedMovie[]>('/movies/now-playing', query);
  return response;
}

/**
 * Lấy danh sách phim điện ảnh đánh giá cao nhất (Top Rated).
 */
export async function getTopRatedMovies(params?: ApiQueryParams) {
  const query = { ...DEFAULT_PARAMS, ...params };
  const response = await apiGet<NormalizedMovie[]>('/movies/top-rated', query);
  return response;
}

/**
 * Lấy danh sách phim điện ảnh sắp chiếu rạp (Upcoming).
 */
export async function getUpcomingMovies(params?: ApiQueryParams) {
  const query = { ...DEFAULT_PARAMS, ...params };
  const response = await apiGet<NormalizedMovie[]>('/movies/upcoming', query);
  return response;
}

/**
 * Lấy chi tiết thông tin bộ phim điện ảnh kèm nội dung đã dịch.
 * @param id ID của bộ phim cần truy vấn
 * @param params Tùy chọn ngôn ngữ (ví dụ: { language: 'vi-VN' })
 */
export async function getMovieDetail(id: number | string, params?: { language?: string }) {
  const query = { language: DEFAULT_PARAMS.language, ...params };
  const response = await apiGet<NormalizedMovie>(`/movies/${id}`, query);
  return response;
}

/**
 * Lấy danh sách video liên quan (trailer) của bộ phim.
 * @param id ID của bộ phim cần truy vấn
 * @param params Tùy chọn ngôn ngữ (ví dụ: { language: 'vi-VN' })
 */
export async function getMovieVideos(id: number | string, params?: { language?: string }) {
  const query = { language: DEFAULT_PARAMS.language, ...params };
  const response = await apiGet<NormalizedVideo[]>(`/movies/${id}/videos`, query);
  return response;
}

/**
 * Lấy danh sách diễn viên tham gia bộ phim.
 * @param id ID của bộ phim cần truy vấn
 * @param params Tùy chọn ngôn ngữ (ví dụ: { language: 'vi-VN' })
 */
export async function getMovieCredits(id: number | string, params?: { language?: string }) {
  const query = { language: DEFAULT_PARAMS.language, ...params };
  const response = await apiGet<NormalizedCast[]>(`/movies/${id}/credits`, query);
  return response;
}

/**
 * Lấy danh sách phim điện ảnh được gợi ý đề xuất (Recommendations) dựa trên bộ phim hiện tại.
 * @param id ID của bộ phim cần truy vấn
 * @param params Các tham số phân trang, ngôn ngữ bổ sung
 */
export async function getMovieRecommendations(id: number | string, params?: ApiQueryParams) {
  const query = { ...DEFAULT_PARAMS, ...params };
  const response = await apiGet<NormalizedMovie[]>(`/movies/${id}/recommendations`, query);
  return response;
}

/**
 * Lấy danh sách phim điện ảnh tương tự (Similar).
 * @param id ID của bộ phim cần truy vấn
 * @param params Các tham số phân trang, ngôn ngữ bổ sung
 */
export async function getSimilarMovies(id: number | string, params?: ApiQueryParams) {
  const query = { ...DEFAULT_PARAMS, ...params };
  const response = await apiGet<NormalizedMovie[]>(`/movies/${id}/similar`, query);
  return response;
}
