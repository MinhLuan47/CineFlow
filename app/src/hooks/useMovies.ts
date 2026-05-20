import { useState, useEffect, useCallback, useMemo } from 'react';
import type { ApiResponse } from '../services/apiClient';
import {
  getTrendingMovies,
  getPopularMovies,
  getNowPlayingMovies,
  getTopRatedMovies,
  getUpcomingMovies
} from '../services/movieApi';
import type { NormalizedMovie, ApiQueryParams } from '../types/api';
import { fallbackMovies } from '../data/movies';

/**
 * Hàm phụ trợ chuẩn hóa danh sách fallbackMovies (dữ liệu giả lập)
 * thành định dạng NormalizedMovie khớp với phản hồi từ Backend.
 */
export const getNormalizedSampleMovies = (): NormalizedMovie[] => {
  return fallbackMovies.map((movie) => ({
    id: movie.id,
    tmdbId: parseInt(movie.id, 10) * 1000,
    title: movie.title,
    originalTitle: movie.originalTitle,
    overview: movie.description,
    posterPath: null,
    backdropPath: null,
    posterUrl: movie.poster,
    backdropUrl: movie.backdrop,
    releaseDate: `${movie.year}-01-01`,
    year: movie.year,
    genres: movie.genre,
    // Trích xuất số lượng phút từ chuỗi thời gian (ví dụ: "2h 32m" -> 152)
    runtime: 120, 
    voteAverage: movie.rating,
    voteCount: movie.views / 10,
    popularity: movie.views / 100,
    originalLanguage: 'en',
    adult: false,
    video: false,
    quality: movie.quality,
    subtitleLanguages: [movie.subtitle],
    trailerUrl: null,
    mediaType: 'movie'
  }));
};

/**
 * Hook cơ sở (Base Hook) để fetch danh sách phim từ API và xử lý dữ liệu dự phòng (Fallback).
 * @param fetcher Hàm thực hiện gọi API trả về Promise
 * @param fallbackData Dữ liệu dự phòng sử dụng khi API gặp lỗi
 */
export function useMovies<T>(
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
      console.warn('Lỗi gọi API từ server, chuyển sang sử dụng dữ liệu dự phòng (fake data):', err);
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
 * Hook chuyên biệt lấy danh sách phim xu hướng (Trending Movies).
 */
export function useTrendingMovies(params?: ApiQueryParams) {
  const paramsString = JSON.stringify(params);
  
  const fetcher = useCallback(() => {
    return getTrendingMovies(params);
  }, [paramsString]); // eslint-disable-line react-hooks/exhaustive-deps

  const fallback = useMemo(() => getNormalizedSampleMovies(), []);

  return useMovies<NormalizedMovie[]>(fetcher, fallback);
}

/**
 * Hook chuyên biệt lấy danh sách phim phổ biến nhất (Popular Movies).
 */
export function usePopularMovies(params?: ApiQueryParams) {
  const paramsString = JSON.stringify(params);

  const fetcher = useCallback(() => {
    return getPopularMovies(params);
  }, [paramsString]); // eslint-disable-line react-hooks/exhaustive-deps

  const fallback = useMemo(() => getNormalizedSampleMovies().slice(1, 6), []);

  return useMovies<NormalizedMovie[]>(fetcher, fallback);
}

/**
 * Hook chuyên biệt lấy danh sách phim đang chiếu rạp (Now Playing).
 */
export function useNowPlayingMovies(params?: ApiQueryParams) {
  const paramsString = JSON.stringify(params);

  const fetcher = useCallback(() => {
    return getNowPlayingMovies(params);
  }, [paramsString]); // eslint-disable-line react-hooks/exhaustive-deps

  const fallback = useMemo(() => getNormalizedSampleMovies().slice(2, 8), []);

  return useMovies<NormalizedMovie[]>(fetcher, fallback);
}

/**
 * Hook chuyên biệt lấy danh sách phim đánh giá cao nhất (Top Rated).
 */
export function useTopRatedMovies(params?: ApiQueryParams) {
  const paramsString = JSON.stringify(params);

  const fetcher = useCallback(() => {
    return getTopRatedMovies(params);
  }, [paramsString]); // eslint-disable-line react-hooks/exhaustive-deps

  const fallback = useMemo(() => getNormalizedSampleMovies().slice(0, 4), []);

  return useMovies<NormalizedMovie[]>(fetcher, fallback);
}

/**
 * Hook chuyên biệt lấy danh sách phim sắp chiếu rạp (Upcoming).
 */
export function useUpcomingMovies(params?: ApiQueryParams) {
  const paramsString = JSON.stringify(params);

  const fetcher = useCallback(() => {
    return getUpcomingMovies(params);
  }, [paramsString]); // eslint-disable-line react-hooks/exhaustive-deps

  const fallback = useMemo(() => getNormalizedSampleMovies().slice(3, 9), []);

  return useMovies<NormalizedMovie[]>(fetcher, fallback);
}
