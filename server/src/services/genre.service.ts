import { tmdbService } from './tmdb.service';
import { TmdbRawGenre, NormalizedGenre } from '../types/genre.types';
import { normalizeGenre } from '../normalizers/genre.normalizer';

class GenreService {
  /**
   * Lấy danh sách thể loại phim điện ảnh (Movie Genres).
   * Cache 7 ngày (604800 giây).
   */
  async getMovieGenres(params: { language?: string }): Promise<{ genres: NormalizedGenre[]; cached: boolean }> {
    const { language = 'en-US' } = params;

    const { data, cached } = await tmdbService.get<{ genres: TmdbRawGenre[] }>(
      '/genre/movie/list',
      { language },
      { useCache: true, ttlSeconds: 604800 } // 7 days TTL
    );

    const normalized = data.genres.map(normalizeGenre);
    return { genres: normalized, cached };
  }

  /**
   * Lấy danh sách thể loại phim truyền hình (TV Show Genres).
   * Cache 7 ngày (604800 giây).
   */
  async getTvGenres(params: { language?: string }): Promise<{ genres: NormalizedGenre[]; cached: boolean }> {
    const { language = 'en-US' } = params;

    const { data, cached } = await tmdbService.get<{ genres: TmdbRawGenre[] }>(
      '/genre/tv/list',
      { language },
      { useCache: true, ttlSeconds: 604800 } // 7 days TTL
    );

    const normalized = data.genres.map(normalizeGenre);
    return { genres: normalized, cached };
  }
}

export const genreService = new GenreService();
