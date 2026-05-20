import { env } from '../config/env';
import {
  TmdbRawMovie,
  TmdbRawCast,
  TmdbRawVideo,
  NormalizedMovie,
  NormalizedCast,
  NormalizedVideo
} from '../types/movie.types';

// Bản đồ ánh xạ mã thể loại phim (Genre ID) của TMDB sang tên tiếng Anh và tiếng Việt
const GENRE_MAP: Record<string, Record<number, string>> = {
  'vi-VN': {
    28: 'Hành động',
    12: 'Phiêu lưu',
    16: 'Hoạt hình',
    35: 'Hài',
    80: 'Hình sự',
    99: 'Tài liệu',
    18: 'Chính kịch',
    10751: 'Gia đình',
    14: 'Kỳ ảo',
    36: 'Lịch sử',
    27: 'Kinh dị',
    10402: 'Âm nhạc',
    9648: 'Bí ẩn',
    10749: 'Lãng mạn',
    878: 'Khoa học Viễn tưởng',
    10770: 'Phim TH',
    53: 'Gây cấn',
    10752: 'Chiến tranh',
    37: 'Miền viễn tây'
  },
  'en-US': {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western'
  }
};

/**
 * Lấy danh sách tên thể loại dựa trên mảng genre_ids và mã ngôn ngữ.
 */
const getGenreNames = (genreIds: number[] = [], lang: string = 'en-US'): string[] => {
  const map = GENRE_MAP[lang] || GENRE_MAP['en-US'];
  return genreIds.map((id) => map[id] || 'Unknown').filter((name) => name !== 'Unknown');
};

/**
 * Trích xuất link trailer từ mảng kết quả video thô của TMDB.
 * Ưu tiên các video có thuộc tính type là 'Trailer', site 'YouTube' và có đánh dấu official.
 */
export const extractTrailerUrl = (videos: TmdbRawVideo[] = []): string | null => {
  if (!videos || videos.length === 0) return null;

  // Lọc ra các video YouTube có kiểu là Trailer
  const trailers = videos.filter(
    (v) => v.site.toLowerCase() === 'youtube' && v.type.toLowerCase() === 'trailer'
  );

  if (trailers.length === 0) return null;

  // Tìm trailer chính thức (official), nếu không có thì lấy trailer đầu tiên tìm thấy
  const officialTrailer = trailers.find((t) => t.official) || trailers[0];
  return `https://www.youtube.com/watch?v=${officialTrailer.key}`;
};

/**
 * Chuẩn hóa đối tượng Cast (Diễn viên) từ dữ liệu gốc TMDB.
 */
export const normalizeCast = (raw: TmdbRawCast): NormalizedCast => {
  const imageBase = env.TMDB_IMAGE_BASE_URL.replace(/\/$/, ''); // Xử lý bỏ dấu xuyệt cuối nếu có
  return {
    id: raw.id,
    name: raw.name,
    character: raw.character,
    profilePath: raw.profile_path,
    profileUrl: raw.profile_path ? `${imageBase}/w185${raw.profile_path}` : null,
    order: raw.order
  };
};

/**
 * Chuẩn hóa dữ liệu Video từ TMDB.
 */
export const normalizeVideo = (raw: TmdbRawVideo): NormalizedVideo => {
  let url: string | null = null;
  if (raw.site.toLowerCase() === 'youtube') {
    url = `https://www.youtube.com/watch?v=${raw.key}`;
  } else if (raw.site.toLowerCase() === 'vimeo') {
    url = `https://vimeo.com/${raw.key}`;
  }

  return {
    id: raw.id,
    name: raw.name,
    key: raw.key,
    site: raw.site,
    type: raw.type,
    url,
    isTrailer: raw.type.toLowerCase() === 'trailer'
  };
};

/**
 * Chuẩn hóa cấu trúc thông tin phim từ dữ liệu gốc của TMDB API sang cấu trúc CineFlow.
 * @param raw Dữ liệu phim thô từ TMDB API
 * @param lang Mã ngôn ngữ hiện tại để định dịch thể loại phim
 */
export const normalizeMovie = (raw: TmdbRawMovie, lang = 'en-US'): NormalizedMovie => {
  const imageBase = env.TMDB_IMAGE_BASE_URL.replace(/\/$/, '');

  // Trích xuất danh sách thể loại từ đối tượng genres hoặc mảng genre_ids
  let genres: string[] = [];
  if (raw.genres && raw.genres.length > 0) {
    genres = raw.genres.map((g) => g.name);
  } else if (raw.genre_ids) {
    genres = getGenreNames(raw.genre_ids, lang);
  }

  // Tự động phân cấp chất lượng phim dựa trên độ phổ biến/đánh giá (CineFlow specific)
  const quality = raw.vote_average >= 7.8 ? '4K' : 'FHD';

  // Trích xuất trailer URL từ mảng video đi kèm (nếu có)
  const trailerUrl = raw.videos?.results ? extractTrailerUrl(raw.videos.results) : null;

  // Trích xuất cast preview (tối đa 6 diễn viên đầu tiên)
  const castPreview = raw.credits?.cast
    ? raw.credits.cast.slice(0, 6).map(normalizeCast)
    : undefined;

  return {
    id: String(raw.id),
    tmdbId: raw.id,
    title: raw.title,
    originalTitle: raw.original_title,
    overview: raw.overview || '',
    posterPath: raw.poster_path,
    backdropPath: raw.backdrop_path,
    posterUrl: raw.poster_path ? `${imageBase}/w500${raw.poster_path}` : null,
    backdropUrl: raw.backdrop_path ? `${imageBase}/w1280${raw.backdrop_path}` : null,
    releaseDate: raw.release_date || '',
    year: raw.release_date ? new Date(raw.release_date).getFullYear() : null,
    genres,
    runtime: raw.runtime || null,
    voteAverage: raw.vote_average,
    voteCount: raw.vote_count,
    popularity: raw.popularity,
    originalLanguage: raw.original_language,
    adult: raw.adult,
    video: raw.video,
    quality,
    subtitleLanguages: ['Vietsub', 'Engsub'], // Ngôn ngữ phụ đề mặc định
    trailerUrl,
    castPreview,
    mediaType: 'movie',
    tagline: raw.tagline || null
  };
};
