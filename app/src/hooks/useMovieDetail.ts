import { useState, useEffect, useCallback } from 'react';
import {
  getMovieDetail,
  getMovieVideos,
  getMovieCredits,
  getMovieRecommendations,
  getSimilarMovies
} from '../services/movieApi';
import type { NormalizedMovie, NormalizedVideo, NormalizedCast, ApiQueryParams } from '../types/api';
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

/**
 * Hook lấy danh sách video liên quan (trailer) của phim.
 */
export function useMovieVideos(id: number | string, language?: string) {
  const [data, setData] = useState<NormalizedVideo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchVideos = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const response = await getMovieVideos(id, { language });
      setData(response.data);
    } catch (err: any) {
      console.warn(`Lỗi lấy video phim ${id} từ server:`, err);
      setError(err instanceof Error ? err : new Error(String(err)));
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [id, language]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return {
    data,
    loading,
    error,
    refetch: fetchVideos
  };
}

/**
 * Hook lấy danh sách diễn viên (credits/cast) của phim.
 */
export function useMovieCredits(id: number | string, language?: string) {
  const [data, setData] = useState<NormalizedCast[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCredits = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const response = await getMovieCredits(id, { language });
      setData(response.data);
    } catch (err: any) {
      console.warn(`Lỗi lấy diễn viên phim ${id} từ server, sử dụng dữ liệu dự phòng:`, err);
      setError(err instanceof Error ? err : new Error(String(err)));
      // Danh sách diễn viên giả lập để đảm bảo không bị trống giao diện
      setData([
        { id: 1, name: "Cillian Murphy", character: "J. Robert Oppenheimer", profileUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80", profilePath: null, order: 0 },
        { id: 2, name: "Emily Blunt", character: "Katherine Oppenheimer", profileUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80", profilePath: null, order: 1 },
        { id: 3, name: "Matt Damon", character: "Leslie Groves", profileUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80", profilePath: null, order: 2 },
        { id: 4, name: "Robert Downey Jr.", character: "Lewis Strauss", profileUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80", profilePath: null, order: 3 },
      ]);
    } finally {
      setLoading(false);
    }
  }, [id, language]);

  useEffect(() => {
    fetchCredits();
  }, [fetchCredits]);

  return {
    data,
    loading,
    error,
    refetch: fetchCredits
  };
}

/**
 * Hook lấy danh sách phim gợi ý đề xuất (Recommendations).
 */
export function useMovieRecommendations(id: number | string, params?: ApiQueryParams) {
  const paramsString = JSON.stringify(params);
  const [data, setData] = useState<NormalizedMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchRecommendations = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const response = await getMovieRecommendations(id, params);
      setData(response.data);
    } catch (err: any) {
      console.warn(`Lỗi lấy phim đề xuất cho phim ${id}:`, err);
      setError(err instanceof Error ? err : new Error(String(err)));
      // Dữ liệu dự phòng
      setData(getNormalizedSampleMovies().slice(0, 6));
    } finally {
      setLoading(false);
    }
  }, [id, paramsString]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  return {
    data,
    loading,
    error,
    refetch: fetchRecommendations
  };
}

/**
 * Hook lấy danh sách phim tương tự (Similar Movies).
 */
export function useSimilarMovies(id: number | string, params?: ApiQueryParams) {
  const paramsString = JSON.stringify(params);
  const [data, setData] = useState<NormalizedMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSimilar = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const response = await getSimilarMovies(id, params);
      setData(response.data);
    } catch (err: any) {
      console.warn(`Lỗi lấy phim tương tự cho phim ${id}:`, err);
      setError(err instanceof Error ? err : new Error(String(err)));
      // Dữ liệu dự phòng
      setData(getNormalizedSampleMovies().slice(2, 8));
    } finally {
      setLoading(false);
    }
  }, [id, paramsString]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchSimilar();
  }, [fetchSimilar]);

  return {
    data,
    loading,
    error,
    refetch: fetchSimilar
  };
}
