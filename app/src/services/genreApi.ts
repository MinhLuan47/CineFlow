import { apiGet } from './apiClient';
import type { NormalizedMovie, NormalizedTvSeries, NormalizedGenre, ApiQueryParams } from '../types/api';

const DEFAULT_PARAMS = {
  page: 1,
  language: 'vi-VN',
  region: 'VN'
};

/**
 * Lấy danh sách thể loại phim điện ảnh (Movie Genres).
 */
export async function getMovieGenres() {
  const response = await apiGet<NormalizedGenre[]>('/genres/movie', {
    language: DEFAULT_PARAMS.language
  });
  return response;
}

/**
 * Lấy danh sách thể loại phim truyền hình (TV Genres).
 */
export async function getTvGenres() {
  const response = await apiGet<NormalizedGenre[]>('/genres/tv', {
    language: DEFAULT_PARAMS.language
  });
  return response;
}

/**
 * Lọc khám phá phim điện ảnh theo thể loại (Discover Movies by Genre).
 */
export async function discoverMovies(genreId: string | number, params?: ApiQueryParams) {
  const query = {
    ...DEFAULT_PARAMS,
    genreId: String(genreId),
    ...params
  };
  const response = await apiGet<NormalizedMovie[]>('/discover/movie', query);
  return response;
}

/**
 * Lọc khám phá phim truyền hình theo thể loại (Discover TV Series by Genre).
 */
export async function discoverTv(genreId: string | number, params?: ApiQueryParams) {
  const query = {
    ...DEFAULT_PARAMS,
    genreId: String(genreId),
    ...params
  };
  const response = await apiGet<NormalizedTvSeries[]>('/discover/tv', query);
  return response;
}
