import { apiGet } from './apiClient';
import type { SearchResult } from '../types/api';

/**
 * Tìm kiếm đa mục tiêu (Multi Search) bao gồm Phim điện ảnh (Movie), Phim truyền hình (TV) và Diễn viên (Person).
 * @param query Từ khóa tìm kiếm (bắt buộc)
 * @param page Số trang truy vấn kết quả (tùy chọn, mặc định 1)
 * @param language Ngôn ngữ mong muốn phản hồi (tùy chọn, mặc định vi-VN)
 */
export async function searchMulti(
  query: string,
  page: number = 1,
  language: string = 'vi-VN'
) {
  if (!query || query.trim() === '') {
    throw new Error('Từ khóa tìm kiếm không được để trống');
  }

  const response = await apiGet<SearchResult[]>('/search/multi', {
    query,
    page,
    language
  });
  
  return response;
}
