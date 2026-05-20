import { tmdbService } from './tmdb.service';
import {
  TmdbPaginatedResponse,
  TmdbRawMovie,
  TmdbRawVideo,
  TmdbRawCast,
  NormalizedMovie,
  NormalizedCast,
  NormalizedVideo
} from '../types/movie.types';
import {
  normalizeMovie,
  normalizeCast,
  normalizeVideo
} from '../normalizers/movie.normalizer';

class MovieService {
  /**
   * Phương thức trợ giúp chung để gọi các API lấy danh sách phim phân trang từ TMDB,
   * thực hiện lưu trữ cache và chuẩn hóa kết quả đầu ra.
   * @param endpoint Endpoint TMDB cụ thể (ví dụ: '/movie/popular')
   * @param params Tham số lọc gồm page, language, region
   * @param ttlSeconds Thời gian sống của dữ liệu lưu trong cache (giây)
   */
  private async getPaginatedMovies(
    endpoint: string,
    params: { page?: number; language?: string; region?: string },
    ttlSeconds: number
  ): Promise<{
    results: NormalizedMovie[];
    page: number;
    totalPages: number;
    totalResults: number;
    cached: boolean;
  }> {
    const { page = 1, language = 'en-US', region = 'US' } = params;

    // Gửi yêu cầu qua TMDB Service có tích hợp cache
    const { data, cached } = await tmdbService.get<TmdbPaginatedResponse<TmdbRawMovie>>(
      endpoint,
      { page, language, region },
      { useCache: true, ttlSeconds }
    );

    // Chuẩn hóa toàn bộ danh sách phim trả về từ TMDB
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
   * Lấy danh sách phim đang xu hướng (Trending). Cache 6 tiếng.
   */
  async getTrending(params: { page?: number; language?: string; region?: string }) {
    return this.getPaginatedMovies('/trending/movie/day', params, 21600); // 6 hours
  }

  /**
   * Lấy danh sách phim phổ biến (Popular). Cache 12 tiếng.
   */
  async getPopular(params: { page?: number; language?: string; region?: string }) {
    return this.getPaginatedMovies('/movie/popular', params, 43200); // 12 hours
  }

  /**
   * Lấy danh sách phim đang chiếu tại rạp (Now Playing). Cache 6 tiếng.
   */
  async getNowPlaying(params: { page?: number; language?: string; region?: string }) {
    return this.getPaginatedMovies('/movie/now_playing', params, 21600); // 6 hours
  }

  /**
   * Lấy danh sách phim được đánh giá cao nhất (Top Rated). Cache 24 tiếng.
   */
  async getTopRated(params: { page?: number; language?: string; region?: string }) {
    return this.getPaginatedMovies('/movie/top_rated', params, 86400); // 24 hours
  }

  /**
   * Lấy danh sách phim sắp công chiếu (Upcoming). Cache 6 tiếng.
   */
  async getUpcoming(params: { page?: number; language?: string; region?: string }) {
    return this.getPaginatedMovies('/movie/upcoming', params, 21600); // 6 hours
  }

  /**
   * Lấy chi tiết thông tin của một bộ phim bao gồm cả thông tin dàn diễn viên (credits) và trailer (videos).
   * Cache 24 tiếng.
   */
  async getMovieDetail(
    id: number,
    params: { language?: string }
  ): Promise<{ data: NormalizedMovie; cached: boolean }> {
    const { language = 'en-US' } = params;

    // Sử dụng append_to_response để tối ưu hóa, lấy cả videos và credits chỉ với 1 lượt gọi API
    const { data, cached } = await tmdbService.get<TmdbRawMovie>(
      `/movie/${id}`,
      { language, append_to_response: 'videos,credits' },
      { useCache: true, ttlSeconds: 86400 } // 24 hours
    );

    const normalized = normalizeMovie(data, language);
    return { data: normalized, cached };
  }

  /**
   * Lấy danh sách video (trailer, teaser) liên quan đến bộ phim. Cache 24 tiếng.
   */
  async getMovieVideos(
    id: number,
    params: { language?: string }
  ): Promise<{ results: NormalizedVideo[]; cached: boolean }> {
    const { language = 'en-US' } = params;

    const { data, cached } = await tmdbService.get<{ results: TmdbRawVideo[] }>(
      `/movie/${id}/videos`,
      { language },
      { useCache: true, ttlSeconds: 86400 } // 24 hours
    );

    const normalized = data.results.map(normalizeVideo);
    return { results: normalized, cached };
  }

  /**
   * Lấy danh sách diễn viên và thành viên đoàn làm phim. Cache 7 ngày.
   */
  async getMovieCredits(
    id: number,
    params: { language?: string }
  ): Promise<{ cast: NormalizedCast[]; cached: boolean }> {
    const { language = 'en-US' } = params;

    const { data, cached } = await tmdbService.get<{ cast: TmdbRawCast[] }>(
      `/movie/${id}/credits`,
      { language },
      { useCache: true, ttlSeconds: 604800 } // 7 days (604800 seconds)
    );

    const normalized = data.cast.map(normalizeCast);
    return { cast: normalized, cached };
  }

  /**
   * Lấy các bộ phim được gợi ý đề xuất dựa trên ID phim truyền vào. Cache 12 tiếng.
   */
  async getMovieRecommendations(id: number, params: { page?: number; language?: string; region?: string }) {
    return this.getPaginatedMovies(`/movie/${id}/recommendations`, params, 43200); // 12 hours
  }

  /**
   * Lấy các bộ phim tương tự với bộ phim truyền vào. Cache 12 tiếng.
   */
  async getMovieSimilar(id: number, params: { page?: number; language?: string; region?: string }) {
    return this.getPaginatedMovies(`/movie/${id}/similar`, params, 43200); // 12 hours
  }
}

export const movieService = new MovieService();
