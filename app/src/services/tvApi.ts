import { apiGet } from './apiClient';
import type { NormalizedTvSeries, NormalizedVideo, NormalizedCast, ApiQueryParams } from '../types/api';

// Tham số mặc định cho các yêu cầu API TV ở phía Frontend CineFlow
const DEFAULT_PARAMS = {
  page: 1,
  language: 'vi-VN',
  region: 'VN'
};

/**
 * Lấy danh sách phim truyền hình xu hướng (Trending TV Series).
 */
export async function getTrendingTv(params?: ApiQueryParams) {
  const query = { ...DEFAULT_PARAMS, ...params };
  const response = await apiGet<NormalizedTvSeries[]>('/tv/trending', query);
  return response;
}

/**
 * Lấy danh sách phim truyền hình phổ biến (Popular TV Series).
 */
export async function getPopularTv(params?: ApiQueryParams) {
  const query = { ...DEFAULT_PARAMS, ...params };
  const response = await apiGet<NormalizedTvSeries[]>('/tv/popular', query);
  return response;
}

/**
 * Lấy danh sách phim truyền hình đang phát sóng (On The Air TV Series).
 */
export async function getOnTheAirTv(params?: ApiQueryParams) {
  const query = { ...DEFAULT_PARAMS, ...params };
  const response = await apiGet<NormalizedTvSeries[]>('/tv/on-the-air', query);
  return response;
}

/**
 * Lấy danh sách phim truyền hình đánh giá cao nhất (Top Rated TV Series).
 */
export async function getTopRatedTv(params?: ApiQueryParams) {
  const query = { ...DEFAULT_PARAMS, ...params };
  const response = await apiGet<NormalizedTvSeries[]>('/tv/top-rated', query);
  return response;
}

/**
 * Lấy thông tin chi tiết một bộ phim truyền hình cụ thể kèm nội dung Việt hóa.
 * @param id ID phim truyền hình cần truy vấn
 * @param params Tùy chọn ngôn ngữ (ví dụ: { language: 'vi-VN' })
 */
export async function getTvDetail(id: number | string, params?: { language?: string }) {
  const query = { language: DEFAULT_PARAMS.language, ...params };
  const response = await apiGet<NormalizedTvSeries>(`/tv/${id}`, query);
  return response;
}

/**
 * Lấy danh sách video/trailer liên quan của phim truyền hình.
 * @param id ID phim truyền hình cần truy vấn
 * @param params Tùy chọn ngôn ngữ
 */
export async function getTvVideos(id: number | string, params?: { language?: string }) {
  const query = { language: DEFAULT_PARAMS.language, ...params };
  const response = await apiGet<NormalizedVideo[]>(`/tv/${id}/videos`, query);
  return response;
}

/**
 * Lấy danh sách diễn viên (credits) tham gia phim truyền hình.
 * @param id ID phim truyền hình cần truy vấn
 * @param params Tùy chọn ngôn ngữ
 */
export async function getTvCredits(id: number | string, params?: { language?: string }) {
  const query = { language: DEFAULT_PARAMS.language, ...params };
  const response = await apiGet<NormalizedCast[]>(`/tv/${id}/credits`, query);
  return response;
}

/**
 * Lấy danh sách phim truyền hình gợi ý đề xuất dựa trên phim truyền hình hiện tại.
 * @param id ID phim truyền hình cần truy vấn
 * @param params Các tham số phân trang, ngôn ngữ bổ sung
 */
export async function getTvRecommendations(id: number | string, params?: ApiQueryParams) {
  const query = { ...DEFAULT_PARAMS, ...params };
  const response = await apiGet<NormalizedTvSeries[]>(`/tv/${id}/recommendations`, query);
  return response;
}

/**
 * Lấy danh sách phim truyền hình tương tự.
 * @param id ID phim truyền hình cần truy vấn
 * @param params Các tham số phân trang, ngôn ngữ bổ sung
 */
export async function getTvSimilar(id: number | string, params?: ApiQueryParams) {
  const query = { ...DEFAULT_PARAMS, ...params };
  const response = await apiGet<NormalizedTvSeries[]>(`/tv/${id}/similar`, query);
  return response;
}
