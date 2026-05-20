import { useState, useEffect } from 'react';
import { getMovieGenres, getTvGenres } from '../services/genreApi';
import { getLocalCache, setLocalCache } from '../utils/localCache';
import type { NormalizedGenre } from '../types/api';

const MOVIE_CACHE_KEY = 'cineflow:genres:movie';
const TV_CACHE_KEY = 'cineflow:genres:tv';
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000; // 7 ngày tính bằng mili-giây

export function useGenres() {
  const [movieGenres, setMovieGenres] = useState<NormalizedGenre[]>([]);
  const [tvGenres, setTvGenres] = useState<NormalizedGenre[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGenres() {
      setLoading(true);
      setError(null);

      try {
        // 1. Kiểm tra cache localStorage trước
        const cachedMovies = getLocalCache<NormalizedGenre[]>(MOVIE_CACHE_KEY);
        const cachedTv = getLocalCache<NormalizedGenre[]>(TV_CACHE_KEY);

        let finalMovies = cachedMovies;
        let finalTv = cachedTv;

        // 2. Nếu thiếu bất kỳ cache nào, thực hiện gọi API tương ứng
        if (!finalMovies || !finalTv) {
          const promises: [Promise<any> | null, Promise<any> | null] = [
            !finalMovies ? getMovieGenres() : null,
            !finalTv ? getTvGenres() : null
          ];

          const [moviesResponse, tvResponse] = await Promise.all(
            promises.map(p => p ? p.catch(err => {
              console.error('Lỗi khi tải danh sách thể loại từ API:', err);
              return null;
            }) : Promise.resolve(null))
          );

          if (moviesResponse && moviesResponse.success && moviesResponse.data) {
            finalMovies = moviesResponse.data;
            setLocalCache(MOVIE_CACHE_KEY, finalMovies, SEVEN_DAYS_MS);
          }

          if (tvResponse && tvResponse.success && tvResponse.data) {
            finalTv = tvResponse.data;
            setLocalCache(TV_CACHE_KEY, finalTv, SEVEN_DAYS_MS);
          }
        }

        // Cập nhật state nếu tìm thấy dữ liệu (bằng cache hoặc qua gọi API)
        setMovieGenres(finalMovies || []);
        setTvGenres(finalTv || []);

        if (!finalMovies && !finalTv) {
          setError('Không thể tải danh sách thể loại phim. Vui lòng thử lại sau.');
        }
      } catch (err: any) {
        console.error('Lỗi trong hook useGenres:', err);
        setError('Có lỗi xảy ra trong quá trình kết nối dữ liệu thể loại.');
      } finally {
        setLoading(false);
      }
    }

    fetchGenres();
  }, []);

  return { movieGenres, tvGenres, loading, error };
}
