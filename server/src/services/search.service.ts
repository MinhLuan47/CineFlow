import { tmdbService } from './tmdb.service';
import { TmdbPaginatedResponse, TmdbRawMovie } from '../types/movie.types';
import { TmdbRawTv, TmdbRawPerson, SearchResult } from '../types/search.types';
import { normalizeMovie } from '../normalizers/movie.normalizer';
import { normalizeTv, normalizePerson, normalizeSearchResult } from '../normalizers/search.normalizer';

class SearchService {
  /**
   * Tìm kiếm đa thể loại (phim chiếu rạp, truyền hình, diễn viên/đạo diễn).
   * Cache 30 phút (1800 giây).
   */
  async searchMulti(
    params: { query: string; page?: number; language?: string; region?: string }
  ): Promise<{ results: SearchResult[]; page: number; totalPages: number; totalResults: number; cached: boolean }> {
    const { query, page = 1, language = 'en-US', region = 'US' } = params;

    const { data, cached } = await tmdbService.get<TmdbPaginatedResponse<any>>(
      '/search/multi',
      { query, page, language, region },
      { useCache: true, ttlSeconds: 1800 } // 30 minutes TTL
    );

    // Chuẩn hóa danh sách kết quả, loại bỏ các mục không hợp lệ hoặc không được hỗ trợ
    const normalizedResults = data.results
      .map((item) => normalizeSearchResult(item, language))
      .filter((item): item is SearchResult => item !== null);

    return {
      results: normalizedResults,
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      cached
    };
  }

  /**
   * Tìm kiếm phim điện ảnh (Movies).
   * Cache 30 phút (1800 giây).
   */
  async searchMovie(
    params: { query: string; page?: number; language?: string; region?: string }
  ): Promise<{ results: any[]; page: number; totalPages: number; totalResults: number; cached: boolean }> {
    const { query, page = 1, language = 'en-US', region = 'US' } = params;

    const { data, cached } = await tmdbService.get<TmdbPaginatedResponse<TmdbRawMovie>>(
      '/search/movie',
      { query, page, language, region },
      { useCache: true, ttlSeconds: 1800 } // 30 minutes TTL
    );

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
   * Tìm kiếm phim truyền hình (TV Shows).
   * Cache 30 phút (1800 giây).
   */
  async searchTv(
    params: { query: string; page?: number; language?: string; region?: string }
  ): Promise<{ results: any[]; page: number; totalPages: number; totalResults: number; cached: boolean }> {
    const { query, page = 1, language = 'en-US', region = 'US' } = params;

    const { data, cached } = await tmdbService.get<TmdbPaginatedResponse<TmdbRawTv>>(
      '/search/tv',
      { query, page, language, region },
      { useCache: true, ttlSeconds: 1800 } // 30 minutes TTL
    );

    const normalizedResults = data.results.map((tv) => normalizeTv(tv, language));

    return {
      results: normalizedResults,
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      cached
    };
  }
}

export const searchService = new SearchService();
