import { useState, useEffect, useCallback, useMemo } from 'react';
import { getMovieDetail } from '../services/movieApi';
import { NormalizedMovie } from '../types/api';
import { getNormalizedSampleMovies } from './useMovies';

/**
 * Hook tùy chỉnh lấy thông tin chi tiết một bộ phim điện ảnh bằng ID.
 * @param id ID của bộ phim cần truy vấn
 * @param language Ngôn ngữ mong muốn truy vấn (mặc định vi-VN)
 */
export function useMovieDetail(id: number | string, language?: string) {
  const [data, setData] = useState<NormalizedMovie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDetail = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const response = await getMovieDetail(id, { language });
      setData(response.data);
    } catch (err: any) {
      console.warn(`Lỗi gọi chi tiết phim ${id} từ server, chuyển sang sử dụng dữ liệu dự phòng (fake data):`, err);
      setError(err instanceof Error ? err : new Error(String(err)));
      
      // Tìm bộ phim giả lập có ID trùng khớp, nếu không thấy thì trả về bộ phim giả lập đầu tiên
      const sampleMovies = getNormalizedSampleMovies();
      const matched = sampleMovies.find(m => m.id === String(id)) || sampleMovies[0];
      setData(matched);
    } finally {
      setLoading(false);
    }
  }, [id, language]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return {
    data,
    loading,
    error,
    refetch: fetchDetail
  };
}
