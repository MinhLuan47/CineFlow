// --- ĐỊNH NGHĨA KIỂU DỮ LIỆU ĐÃ CHUẨN HÓA TỪ BACKEND PROXY ---

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
  url: string | null; // Đường dẫn liên kết đầy đủ (YouTube/Vimeo)
  isTrailer: boolean;
}

export interface NormalizedMovie {
  id: string;
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
  quality: string; // CineFlow specific (ví dụ: 4K, FHD)
  subtitleLanguages: string[]; // CineFlow specific (ví dụ: ['Vietsub', 'Engsub'])
  trailerUrl: string | null;
  castPreview?: NormalizedCast[];
  mediaType: 'movie';
  tagline?: string | null;
}

export interface NormalizedTvSeries {
  id: string;
  tmdbId: number;
  name: string;
  originalName: string;
  overview: string;
  posterPath: string | null;
  backdropPath: string | null;
  posterUrl: string | null;
  backdropUrl: string | null;
  firstAirDate: string;
  year: number | null;
  genres: string[];
  episodeRunTime: number | null;
  voteAverage: number;
  voteCount: number;
  popularity: number;
  originalLanguage: string;
  originCountry: string[];
  numberOfSeasons: number | null;
  numberOfEpisodes: number | null;
  status: string | null;
  trailerUrl: string | null;
  castPreview?: NormalizedCast[];
  mediaType: 'tv';
}

export interface NormalizedPerson {
  id: string;
  tmdbId: number;
  name: string;
  originalName: string;
  profilePath: string | null;
  profileUrl: string | null;
  popularity: number;
  gender: number;
  knownForDepartment: string;
  mediaType: 'person';
  knownFor: Array<NormalizedMovie | NormalizedTvSeries>;
}

export type SearchResult = NormalizedMovie | NormalizedTvSeries | NormalizedPerson;

export interface NormalizedGenre {
  id: number;
  name: string;
}

// --- THAM SỐ TRUY VẤN MẶC ĐỊNH (DEFAULT QUERY PARAMS) ---

export interface ApiQueryParams {
  page?: number;
  language?: string;
  region?: string;
}
