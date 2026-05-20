// --- RAW TMDB API INTERFACES ---

export interface TmdbRawMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  genre_ids?: number[];
  genres?: Array<{ id: number; name: string }>;
  runtime?: number | null;
  vote_average: number;
  vote_count: number;
  popularity: number;
  original_language: string;
  adult: boolean;
  video: boolean;
  tagline?: string | null;
  budget?: number;
  revenue?: number;
  status?: string;
  videos?: {
    results: TmdbRawVideo[];
  };
  credits?: {
    cast: TmdbRawCast[];
    crew: TmdbRawCrew[];
  };
}

export interface TmdbRawVideo {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}

export interface TmdbRawCast {
  id: number;
  name: string;
  original_name: string;
  character: string;
  profile_path: string | null;
  cast_id: number;
  credit_id: string;
  order: number;
  gender?: number;
  popularity?: number;
}

export interface TmdbRawCrew {
  id: number;
  name: string;
  original_name: string;
  department: string;
  job: string;
  profile_path: string | null;
  credit_id: string;
  gender?: number;
  popularity?: number;
}

export interface TmdbPaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

// --- CINEFLOW NORMALIZED INTERFACES ---

export interface NormalizedMovie {
  id: string; // Chuyển id thành chuỗi để linh hoạt
  tmdbId: number;
  title: string;
  originalTitle: string;
  overview: string;
  posterPath: string | null;
  backdropPath: string | null;
  posterUrl: string | null;
  backdropUrl: string | null;
  releaseDate: string;
  year: number | null;
  genres: string[];
  runtime: number | null;
  voteAverage: number;
  voteCount: number;
  popularity: number;
  originalLanguage: string;
  adult: boolean;
  video: boolean;
  quality: string; // CineFlow Specific (e.g. FHD, HD, 4K)
  subtitleLanguages: string[]; // CineFlow Specific
  trailerUrl: string | null;
  castPreview?: NormalizedCast[];
  mediaType: 'movie';
  tagline?: string | null;
}

export interface NormalizedCast {
  id: number;
  name: string;
  character: string;
  profilePath: string | null;
  profileUrl: string | null;
  order: number;
}

export interface NormalizedVideo {
  id: string;
  name: string;
  key: string;
  site: string;
  type: string;
  url: string | null; // Đường dẫn YouTube hoặc Vimeo đầy đủ
  isTrailer: boolean;
}
