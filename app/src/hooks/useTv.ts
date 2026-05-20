import { useState, useEffect, useCallback, useMemo } from 'react';
import type { ApiResponse } from '../services/apiClient';
import {
  getTrendingTv,
  getPopularTv,
  getOnTheAirTv,
  getTopRatedTv
} from '../services/tvApi';
import type { NormalizedTvSeries, ApiQueryParams } from '../types/api';
import { fallbackMovies } from '../data/movies';

/**
 * Hàm phụ trợ chuẩn hóa danh sách fallbackMovies (dữ liệu phim giả lập)
 * thành định dạng NormalizedTvSeries khớp với phản hồi từ Backend dành cho TV Series.
 */
export const getNormalizedSampleTvSeries = (): NormalizedTvSeries[] => {
  return fallbackMovies.map((movie) => ({
    id: movie.id,
    tmdbId: parseInt(movie.id, 10) * 1000,
    name: movie.title,
    originalName: movie.originalTitle,
    overview: movie.description,
    posterPath: null,
    backdropPath: null,
    posterUrl: movie.poster,
    backdropUrl: movie.backdrop,
    firstAirDate: `${movie.year}-01-01`,
    year: movie.year,
    genres: movie.genre,
    episodeRunTime: 45, // Giả lập thời lượng trung bình tập phim bộ
    voteAverage: movie.rating,
    voteCount: movie.views / 10,
    popularity: movie.views / 100,
    originalLanguage: 'en',
    originCountry: ['US'],
    numberOfSeasons: 3,
    numberOfEpisodes: 36,
    status: 'Returning Series',
    trailerUrl: null,
    mediaType: 'tv'
  }));
};

/**
 * Hook cơ sở (Base Hook) để fetch danh sách phim truyền hình từ API và xử lý dữ liệu dự phòng.
 * @param fetcher Hàm thực hiện gọi API trả về Promise
 * @param fallbackData Dữ liệu dự phòng sử dụng khi API gặp lỗi
 */
export function useTv<T>(
  fetcher: () => Promise<ApiResponse<T>>,
  fallbackData?: T
) {
  const [data, setData] = useState<T | null>(fallbackData || null);
  const [meta, setMeta] = useState<ApiResponse<T>['meta']>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetcher();
      setData(response.data);
      setMeta(response.meta);
    } catch (err: any) {
      console.warn('Lỗi gọi API TV từ server, chuyển sang sử dụng dữ liệu dự phòng (fake data):', err);
      setError(err instanceof Error ? err : new Error(String(err)));
      if (fallbackData !== undefined) {
        setData(fallbackData);
      }
    } finally {
      setLoading(false);
    }
  }, [fetcher, fallbackData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    meta,
    loading,
    error,
    refetch: fetchData
  };
}

/**
 * Hook chuyên biệt lấy danh sách phim truyền hình xu hướng (Trending TV).
 */
export function useTrendingTv(params?: ApiQueryParams) {
  const paramsString = JSON.stringify(params);
  
  const fetcher = useCallback(() => {
    return getTrendingTv(params);
  }, [paramsString]); // eslint-disable-line react-hooks/exhaustive-deps

  const fallback = useMemo(() => getNormalizedSampleTvSeries(), []);

  return useTv<NormalizedTvSeries[]>(fetcher, fallback);
}

/**
 * Hook chuyên biệt lấy danh sách phim truyền hình phổ biến (Popular TV).
 */
export function usePopularTv(params?: ApiQueryParams) {
  const paramsString = JSON.stringify(params);

  const fetcher = useCallback(() => {
    return getPopularTv(params);
  }, [paramsString]); // eslint-disable-line react-hooks/exhaustive-deps

  const fallback = useMemo(() => getNormalizedSampleTvSeries().slice(1, 7), []);

  return useTv<NormalizedTvSeries[]>(fetcher, fallback);
}

/**
 * Hook chuyên biệt lấy danh sách phim truyền hình đang chiếu (On The Air TV).
 */
export function useOnTheAirTv(params?: ApiQueryParams) {
  const paramsString = JSON.stringify(params);

  const fetcher = useCallback(() => {
    return getOnTheAirTv(params);
  }, [paramsString]); // eslint-disable-line react-hooks/exhaustive-deps

  const fallback = useMemo(() => getNormalizedSampleTvSeries().slice(2, 8), []);

  return useTv<NormalizedTvSeries[]>(fetcher, fallback);
}

/**
 * Hook chuyên biệt lấy danh sách phim truyền hình đánh giá cao (Top Rated TV).
 */
export function useTopRatedTv(params?: ApiQueryParams) {
  const paramsString = JSON.stringify(params);

  const fetcher = useCallback(() => {
    return getTopRatedTv(params);
  }, [paramsString]); // eslint-disable-line react-hooks/exhaustive-deps

  const fallback = useMemo(() => getNormalizedSampleTvSeries().slice(0, 5), []);

  return useTv<NormalizedTvSeries[]>(fetcher, fallback);
}
