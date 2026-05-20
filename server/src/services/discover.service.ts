import { tmdbService } from './tmdb.service';
import { TmdbPaginatedResponse, TmdbRawMovie, NormalizedMovie } from '../types/movie.types';
import { TmdbRawTvSeries, NormalizedTvSeries } from '../types/tv.types';
import { normalizeMovie } from '../normalizers/movie.normalizer';
import { normalizeTvSeries } from '../normalizers/tv.normalizer';

class DiscoverService {
  /**
   * Khám phá phim điện ảnh (Discover Movie). Cache 6 tiếng.
   * @param params Bộ tham số truy vấn bao gồm genreId, page, language, region, sortBy, year.
   */
  async discoverMovie(params: {
    genreId?: string;
    page?: number;
    language?: string;
    region?: string;
    sortBy?: string;
    year?: number;
  }): Promise<{
    results: NormalizedMovie[];
    page: number;
    totalPages: number;
    totalResults: number;
    cached: boolean;
  }> {
    const {
      genreId,
      page = 1,
      language = 'vi-VN',
      region = 'VN',
      sortBy = 'popularity.desc',
      year
    } = params;

    // Chuẩn bị tham số gửi lên TMDB discover API
    const tmdbParams: any = {
      page,
      language,
      region,
      sort_by: sortBy
    };

    // Nếu có lọc theo Thể loại (Genre ID)
    if (genreId) {
      tmdbParams.with_genres = genreId;
    }

    // Nếu có lọc theo Năm phát hành
    if (year) {
      tmdbParams.primary_release_year = year;
    }

    const { data, cached } = await tmdbService.get<TmdbPaginatedResponse<TmdbRawMovie>>(
      '/discover/movie',
      tmdbParams,
      { useCache: true, ttlSeconds: 21600 } // 6 hours (21600 seconds)
    );

    // Chuẩn hóa toàn bộ phim điện ảnh trả về từ TMDB
    const normalizedResults = data.results.map((movie) => normalizeMovie(movie, language));

    return {
      results: normalizedResults,
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      cached
    };
  }

  /**
   * Khám phá phim truyền hình (Discover TV Series). Cache 6 tiếng.
   * @param params Bộ tham số truy vấn bao gồm genreId, page, language, region, sortBy, year.
   */
  async discoverTv(params: {
    genreId?: string;
    page?: number;
    language?: string;
    region?: string;
    sortBy?: string;
    year?: number;
  }): Promise<{
    results: NormalizedTvSeries[];
    page: number;
    totalPages: number;
    totalResults: number;
    cached: boolean;
  }> {
    const {
      genreId,
      page = 1,
      language = 'vi-VN',
      region = 'VN',
      sortBy = 'popularity.desc',
      year
    } = params;

    // Chuẩn bị tham số gửi lên TMDB discover API
    const tmdbParams: any = {
      page,
      language,
      region,
      sort_by: sortBy
    };

    // Nếu có lọc theo Thể loại (Genre ID)
    if (genreId) {
      tmdbParams.with_genres = genreId;
    }

    // Nếu có lọc theo Năm phát hành đầu tiên
    if (year) {
      tmdbParams.first_air_date_year = year;
    }

    const { data, cached } = await tmdbService.get<TmdbPaginatedResponse<TmdbRawTvSeries>>(
      '/discover/tv',
      tmdbParams,
      { useCache: true, ttlSeconds: 21600 } // 6 hours (21600 seconds)
    );

    // Chuẩn hóa toàn bộ phim truyền hình trả về từ TMDB
    const normalizedResults = data.results.map((tv) => normalizeTvSeries(tv, language));

    return {
      results: normalizedResults,
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      cached
    };
  }
}

export const discoverService = new DiscoverService();
