import { useState, useEffect, useCallback } from 'react';
import {
  getTvDetail,
  getTvVideos,
  getTvCredits,
  getTvRecommendations,
  getTvSimilar
} from '../services/tvApi';
import type { NormalizedTvSeries, NormalizedVideo, NormalizedCast, ApiQueryParams } from '../types/api';
import { getNormalizedSampleTvSeries } from './useTv';

/**
 * Hook tùy chỉnh lấy thông tin chi tiết một bộ phim truyền hình bằng ID.
 * @param id ID của bộ phim truyền hình cần truy vấn
 * @param language Ngôn ngữ mong muốn truy vấn (mặc định vi-VN)
 */
export function useTvDetail(id: number | string, language?: string) {
  const [data, setData] = useState<NormalizedTvSeries | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDetail = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const response = await getTvDetail(id, { language });
      setData(response.data);
    } catch (err: any) {
      console.warn(`Lỗi gọi chi tiết phim truyền hình ${id} từ server, chuyển sang sử dụng dữ liệu dự phòng (fake data):`, err);
      setError(err instanceof Error ? err : new Error(String(err)));
      
      // Tìm bộ phim giả lập có ID trùng khớp, nếu không thấy thì trả về bộ phim giả lập đầu tiên
      const sampleTv = getNormalizedSampleTvSeries();
      const matched = sampleTv.find(m => m.id === String(id)) || sampleTv[0];
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
 * Hook lấy danh sách video liên quan (trailer) của phim truyền hình.
 */
export function useTvVideos(id: number | string, language?: string) {
  const [data, setData] = useState<NormalizedVideo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchVideos = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const response = await getTvVideos(id, { language });
      setData(response.data);
    } catch (err: any) {
      console.warn(`Lỗi lấy video phim truyền hình ${id} từ server:`, err);
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
 * Hook lấy danh sách diễn viên (credits/cast) của phim truyền hình.
 */
export function useTvCredits(id: number | string, language?: string) {
  const [data, setData] = useState<NormalizedCast[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCredits = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const response = await getTvCredits(id, { language });
      setData(response.data);
    } catch (err: any) {
      console.warn(`Lỗi lấy diễn viên phim truyền hình ${id} từ server, sử dụng dữ liệu dự phòng:`, err);
      setError(err instanceof Error ? err : new Error(String(err)));
      // Danh sách diễn viên giả lập để đảm bảo không bị trống giao diện
      setData([
        { id: 1, name: "Travis Fimmel", character: "Ragnar Lothbrok", profileUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80", profilePath: null, order: 0 },
        { id: 2, name: "Katheryn Winnick", character: "Lagertha", profileUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80", profilePath: null, order: 1 },
        { id: 3, name: "Clive Standen", character: "Rollo", profileUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80", profilePath: null, order: 2 },
        { id: 4, name: "Gustaf Skarsgård", character: "Floki", profileUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80", profilePath: null, order: 3 },
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
 * Hook lấy danh sách phim truyền hình gợi ý đề xuất (Recommendations).
 */
export function useTvRecommendations(id: number | string, params?: ApiQueryParams) {
  const paramsString = JSON.stringify(params);
  const [data, setData] = useState<NormalizedTvSeries[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchRecommendations = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const response = await getTvRecommendations(id, params);
      setData(response.data);
    } catch (err: any) {
      console.warn(`Lỗi lấy phim bộ đề xuất cho phim ${id}:`, err);
      setError(err instanceof Error ? err : new Error(String(err)));
      // Dữ liệu dự phòng
      setData(getNormalizedSampleTvSeries().slice(0, 6));
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
 * Hook lấy danh sách phim truyền hình tương tự (Similar TV Series).
 */
export function useTvSimilar(id: number | string, params?: ApiQueryParams) {
  const paramsString = JSON.stringify(params);
  const [data, setData] = useState<NormalizedTvSeries[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSimilar = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const response = await getTvSimilar(id, params);
      setData(response.data);
    } catch (err: any) {
      console.warn(`Lỗi lấy phim bộ tương tự cho phim ${id}:`, err);
      setError(err instanceof Error ? err : new Error(String(err)));
      // Dữ liệu dự phòng
      setData(getNormalizedSampleTvSeries().slice(2, 8));
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
