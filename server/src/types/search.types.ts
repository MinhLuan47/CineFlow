import { NormalizedMovie, TmdbRawMovie } from './movie.types';

// --- RAW TMDB TV INTERFACES ---
export interface TmdbRawTv {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  original_language: string;
  genre_ids?: number[];
  origin_country?: string[];
  media_type?: 'tv';
}

// --- RAW TMDB PERSON INTERFACES ---
export interface TmdbRawPerson {
  id: number;
  name: string;
  original_name: string;
  profile_path: string | null;
  popularity: number;
  gender: number;
  known_for_department: string;
  media_type?: 'person';
  known_for?: Array<TmdbRawMovie | TmdbRawTv>;
}

// --- CINEFLOW NORMALIZED TV INTERFACES ---
export interface NormalizedTv {
  id: string;
  tmdbId: number;
  title: string;
  originalTitle: string;
  overview: string;
  posterPath: string | null;
  backdropPath: string | null;
  posterUrl: string | null;
  backdropUrl: string | null;
  firstAirDate: string;
  year: number | null;
  genres: string[];
  voteAverage: number;
  voteCount: number;
  popularity: number;
  originalLanguage: string;
  mediaType: 'tv';
}

// --- CINEFLOW NORMALIZED PERSON INTERFACES ---
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
  knownFor: Array<NormalizedMovie | NormalizedTv>;
}

export type SearchResult = NormalizedMovie | NormalizedTv | NormalizedPerson;
export type TmdbRawSearchResult = TmdbRawMovie | TmdbRawTv | TmdbRawPerson;
export type MultiSearchResult = SearchResult;
export type TmdbRawMultiSearchResult = (TmdbRawMovie & { media_type: 'movie' }) | (TmdbRawTv & { media_type: 'tv' }) | (TmdbRawPerson & { media_type: 'person' });
export interface MultiSearchResponse {
  results: MultiSearchResult[];
  page: number;
  totalPages: number;
  totalResults: number;
  cached: boolean;
}
