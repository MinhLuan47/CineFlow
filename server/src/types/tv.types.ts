import { NormalizedCast, TmdbRawCast, TmdbRawCrew, TmdbRawVideo } from './movie.types';

// --- RAW TMDB TV INTERFACES ---

export interface TmdbRawTvSeries {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date?: string;
  genre_ids?: number[];
  genres?: Array<{ id: number; name: string }>;
  episode_run_time?: number[];
  vote_average: number;
  vote_count: number;
  popularity: number;
  original_language: string;
  origin_country?: string[];
  number_of_seasons?: number;
  number_of_episodes?: number;
  status?: string;
  videos?: {
    results: TmdbRawVideo[];
  };
  credits?: {
    cast: TmdbRawCast[];
    crew: TmdbRawCrew[];
  };
}

// --- CINEFLOW NORMALIZED TV INTERFACES ---

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
  episodeRunTime: number | null; // Lấy phần tử đầu tiên của episode_run_time hoặc null
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
