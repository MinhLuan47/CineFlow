import { env } from '../config/env';
import { normalizeMovie } from './movie.normalizer';
import {
  TmdbRawTv,
  TmdbRawPerson,
  NormalizedTv,
  NormalizedPerson,
  SearchResult
} from '../types/search.types';
import { TmdbRawMovie } from '../types/movie.types';

// Bản đồ thể loại phim truyền hình (TV Series)
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

const getTvGenreNames = (genreIds: number[] = [], lang: string = 'en-US'): string[] => {
  const map = TV_GENRE_MAP[lang] || TV_GENRE_MAP['en-US'];
  return genreIds.map((id) => map[id] || 'Unknown').filter((name) => name !== 'Unknown');
};

/**
 * Chuẩn hóa đối tượng TV Show từ TMDB sang cấu trúc CineFlow.
 */
export const normalizeTv = (raw: TmdbRawTv, lang: string = 'en-US'): NormalizedTv => {
  const imageBase = env.TMDB_IMAGE_BASE_URL.replace(/\/$/, '');
  const genres = getTvGenreNames(raw.genre_ids, lang);

  return {
    id: String(raw.id),
    tmdbId: raw.id,
    title: raw.name,
    originalTitle: raw.original_name,
    overview: raw.overview || '',
    posterPath: raw.poster_path,
    backdropPath: raw.backdrop_path,
    posterUrl: raw.poster_path ? `${imageBase}/w500${raw.poster_path}` : null,
    backdropUrl: raw.backdrop_path ? `${imageBase}/w1280${raw.backdrop_path}` : null,
    firstAirDate: raw.first_air_date || '',
    year: raw.first_air_date ? new Date(raw.first_air_date).getFullYear() : null,
    genres,
    voteAverage: raw.vote_average,
    voteCount: raw.vote_count,
    popularity: raw.popularity,
    originalLanguage: raw.original_language,
    mediaType: 'tv'
  };
};

/**
 * Chuẩn hóa đối tượng Person (Diễn viên/Đạo diễn) từ TMDB sang cấu trúc CineFlow.
 */
export const normalizePerson = (raw: TmdbRawPerson, lang: string = 'en-US'): NormalizedPerson => {
  const imageBase = env.TMDB_IMAGE_BASE_URL.replace(/\/$/, '');

  const knownForNormalized = (raw.known_for || [])
    .map((item) => {
      // Xác định định dạng phim chiếu rạp hay truyền hình dựa trên sự xuất hiện của tiêu đề/tên hoặc media_type
      const itemAny = item as any;
      if ('title' in item || itemAny.media_type === 'movie') {
        return normalizeMovie(item as TmdbRawMovie, lang);
      } else if ('name' in item || itemAny.media_type === 'tv') {
        return normalizeTv(item as TmdbRawTv, lang);
      }
      return null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  return {
    id: String(raw.id),
    tmdbId: raw.id,
    name: raw.name,
    originalName: raw.original_name,
    profilePath: raw.profile_path,
    profileUrl: raw.profile_path ? `${imageBase}/w185${raw.profile_path}` : null,
    popularity: raw.popularity,
    gender: raw.gender,
    knownForDepartment: raw.known_for_department,
    mediaType: 'person',
    knownFor: knownForNormalized
  };
};

/**
 * Chuẩn hóa kết quả tìm kiếm đa thể loại (Multi Search) từ TMDB.
 */
export const normalizeSearchResult = (
  raw: any,
  lang: string = 'en-US'
): SearchResult | null => {
  const mediaType = raw.media_type;

  switch (mediaType) {
    case 'movie':
      return normalizeMovie(raw as TmdbRawMovie, lang);
    case 'tv':
      return normalizeTv(raw as TmdbRawTv, lang);
    case 'person':
      return normalizePerson(raw as TmdbRawPerson, lang);
    default:
      // Nếu không khớp media type cơ bản, thử suy đoán dựa trên các thuộc tính
      if ('title' in raw) {
        return normalizeMovie(raw as TmdbRawMovie, lang);
      } else if ('name' in raw && 'first_air_date' in raw) {
        return normalizeTv(raw as TmdbRawTv, lang);
      } else if ('name' in raw && 'profile_path' in raw) {
        return normalizePerson(raw as TmdbRawPerson, lang);
      }
      return null;
  }
};
