import { tmdbService } from './tmdb.service';
import { TmdbPaginatedResponse, TmdbRawVideo, TmdbRawCast } from '../types/movie.types';
import { TmdbRawTvSeries, NormalizedTvSeries } from '../types/tv.types';
import { normalizeTvSeries } from '../normalizers/tv.normalizer';
import { normalizeCast, normalizeVideo } from '../normalizers/movie.normalizer';
import { NormalizedCast, NormalizedVideo } from '../types/movie.types';

class TvService {
  /**
   * Phương thức trợ giúp để gọi các API danh sách phim truyền hình phân trang từ TMDB,
   * lưu cache và chuẩn hóa dữ liệu trả về.
   */
  private async getPaginatedTv(
    endpoint: string,
    params: { page?: number; language?: string; region?: string },
    ttlSeconds: number
  ): Promise<{
    results: NormalizedTvSeries[];
    page: number;
    totalPages: number;
    totalResults: number;
    cached: boolean;
  }> {
    const { page = 1, language = 'en-US', region = 'US' } = params;

    const { data, cached } = await tmdbService.get<TmdbPaginatedResponse<TmdbRawTvSeries>>(
      endpoint,
      { page, language, region },
      { useCache: true, ttlSeconds }
    );

    const normalizedResults = data.results.map((tv) => normalizeTvSeries(tv, language));

    return {
      results: normalizedResults,
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      cached
    };
  }

  /**
   * Lấy danh sách phim truyền hình xu hướng (Trending). Cache 6 tiếng.
   */
  async getTrending(params: { page?: number; language?: string; region?: string }) {
    return this.getPaginatedTv('/trending/tv/day', params, 21600); // 6 hours
  }

  /**
   * Lấy danh sách phim truyền hình phổ biến (Popular). Cache 12 tiếng.
   */
  async getPopular(params: { page?: number; language?: string; region?: string }) {
    return this.getPaginatedTv('/tv/popular', params, 43200); // 12 hours
  }

  /**
   * Lấy danh sách phim truyền hình được đánh giá cao nhất (Top Rated). Cache 24 tiếng.
   */
  async getTopRated(params: { page?: number; language?: string; region?: string }) {
    return this.getPaginatedTv('/tv/top_rated', params, 86400); // 24 hours
  }

  /**
   * Lấy danh sách phim truyền hình đang phát sóng (On The Air). Cache 6 tiếng.
   */
  async getOnTheAir(params: { page?: number; language?: string; region?: string }) {
    return this.getPaginatedTv('/tv/on_the_air', params, 21600); // 6 hours
  }

  /**
   * Lấy chi tiết thông tin bộ phim truyền hình. Cache 24 tiếng.
   */
  async getTvDetail(
    id: number,
    params: { language?: string }
  ): Promise<{ data: NormalizedTvSeries; cached: boolean }> {
    const { language = 'en-US' } = params;

    // Sử dụng append_to_response để lấy videos và credits cùng 1 lúc
    const { data, cached } = await tmdbService.get<TmdbRawTvSeries>(
      `/tv/${id}`,
      { language, append_to_response: 'videos,credits' },
      { useCache: true, ttlSeconds: 86400 } // 24 hours
    );

    const normalized = normalizeTvSeries(data, language);
    return { data: normalized, cached };
  }

  /**
   * Lấy danh sách video liên quan (trailer). Cache 24 tiếng.
   */
  async getTvVideos(
    id: number,
    params: { language?: string }
  ): Promise<{ results: NormalizedVideo[]; cached: boolean }> {
    const { language = 'en-US' } = params;

    const { data, cached } = await tmdbService.get<{ results: TmdbRawVideo[] }>(
      `/tv/${id}/videos`,
      { language },
      { useCache: true, ttlSeconds: 86400 } // 24 hours
    );

    const normalized = data.results.map(normalizeVideo);
    return { results: normalized, cached };
  }

  /**
   * Lấy danh sách diễn viên (Credits). Cache 7 ngày.
   */
  async getTvCredits(
    id: number,
    params: { language?: string }
  ): Promise<{ cast: NormalizedCast[]; cached: boolean }> {
    const { language = 'en-US' } = params;

    const { data, cached } = await tmdbService.get<{ cast: TmdbRawCast[] }>(
      `/tv/${id}/credits`,
      { language },
      { useCache: true, ttlSeconds: 604800 } // 7 days
    );

    const normalized = data.cast.map(normalizeCast);
    return { cast: normalized, cached };
  }

  /**
   * Lấy gợi ý phim truyền hình liên quan (Recommendations). Cache 12 tiếng.
   */
  async getTvRecommendations(id: number, params: { page?: number; language?: string; region?: string }) {
    return this.getPaginatedTv(`/tv/${id}/recommendations`, params, 43200); // 12 hours
  }

  /**
   * Lấy phim truyền hình tương tự (Similar). Cache 12 tiếng.
   */
  async getTvSimilar(id: number, params: { page?: number; language?: string; region?: string }) {
    return this.getPaginatedTv(`/tv/${id}/similar`, params, 43200); // 12 hours
  }
}

export const tvService = new TvService();
