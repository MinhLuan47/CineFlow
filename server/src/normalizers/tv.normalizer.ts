import { env } from '../config/env';
import { TmdbRawTvSeries, NormalizedTvSeries } from '../types/tv.types';
import { normalizeCast, extractTrailerUrl } from './movie.normalizer';

// Bản đồ ánh xạ mã thể loại phim truyền hình (TV Genre ID) sang tiếng Anh và tiếng Việt
const TV_GENRE_MAP: Record<string, Record<number, string>> = {
  'vi-VN': {
    10759: 'Hành động & Phiêu lưu',
    16: 'Hoạt hình',
    35: 'Hài',
    80: 'Hình sự',
    99: 'Tài liệu',
    18: 'Chính kịch',
    10751: 'Gia đình',
    10762: 'Trẻ em',
    9648: 'Bí ẩn',
    10763: 'Tin tức',
    10764: 'Thực tế',
    10765: 'Sci-Fi & Kịch ảo',
    10766: 'Phim truyền hình dài tập',
    10767: 'Trò chuyện',
    10768: 'Chiến tranh & Chính trị',
    37: 'Miền viễn tây'
  },
  'en-US': {
    10759: 'Action & Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    10762: 'Kids',
    9648: 'Mystery',
    10763: 'News',
    10764: 'Reality',
    10765: 'Sci-Fi & Fantasy',
    10766: 'Soap',
    10767: 'Talk',
    10768: 'War & Politics',
    37: 'Western'
  }
};

/**
 * Lấy danh sách thể loại phim truyền hình dựa trên các ID và ngôn ngữ.
 */
const getTvGenreNames = (genreIds: number[] = [], lang: string = 'en-US'): string[] => {
  const map = TV_GENRE_MAP[lang] || TV_GENRE_MAP['en-US'];
  return genreIds.map((id) => map[id] || 'Unknown').filter((name) => name !== 'Unknown');
};

/**
 * Chuẩn hóa đối tượng TV Series từ TMDB sang dạng cấu trúc chuẩn của CineFlow.
 * @param raw Đối tượng TV series thô từ TMDB API
 * @param lang Mã ngôn ngữ hiện tại để dịch thể loại phim
 */
export const normalizeTvSeries = (raw: TmdbRawTvSeries, lang = 'en-US'): NormalizedTvSeries => {
  const imageBase = env.TMDB_IMAGE_BASE_URL.replace(/\/$/, '');

  // Trích xuất thể loại từ đối tượng genres hoặc mảng genre_ids
  let genres: string[] = [];
  if (raw.genres && raw.genres.length > 0) {
    genres = raw.genres.map((g) => g.name);
  } else if (raw.genre_ids) {
    genres = getTvGenreNames(raw.genre_ids, lang);
  }

  // Lấy thời lượng trung bình của tập phim (episode run time)
  const episodeRunTime =
    raw.episode_run_time && raw.episode_run_time.length > 0
      ? raw.episode_run_time[0]
      : null;

  // Lấy link trailer từ videos kết quả đi kèm
  const trailerUrl = raw.videos?.results ? extractTrailerUrl(raw.videos.results) : null;

  // Lấy cast preview tối đa 6 diễn viên đầu tiên
  const castPreview = raw.credits?.cast
    ? raw.credits.cast.slice(0, 6).map(normalizeCast)
    : undefined;

  return {
    id: String(raw.id),
    tmdbId: raw.id,
    name: raw.name,
    originalName: raw.original_name,
    overview: raw.overview || '',
    posterPath: raw.poster_path,
    backdropPath: raw.backdrop_path,
    posterUrl: raw.poster_path ? `${imageBase}/w500${raw.poster_path}` : null,
    backdropUrl: raw.backdrop_path ? `${imageBase}/w1280${raw.backdrop_path}` : null,
    firstAirDate: raw.first_air_date || '',
    year: raw.first_air_date ? new Date(raw.first_air_date).getFullYear() : null,
    genres,
    episodeRunTime,
    voteAverage: raw.vote_average,
    voteCount: raw.vote_count,
    popularity: raw.popularity,
    originalLanguage: raw.original_language,
    originCountry: raw.origin_country || [],
    numberOfSeasons: raw.number_of_seasons !== undefined ? raw.number_of_seasons : null,
    numberOfEpisodes: raw.number_of_episodes !== undefined ? raw.number_of_episodes : null,
    status: raw.status || null,
    trailerUrl,
    castPreview,
    mediaType: 'tv'
  };
};
