import { TmdbRawGenre, NormalizedGenre } from '../types/genre.types';

/**
 * Chuẩn hóa đối tượng thể loại từ cấu trúc dữ liệu thô của TMDB sang cấu trúc CineFlow.
 */
export const normalizeGenre = (raw: TmdbRawGenre): NormalizedGenre => {
  return {
    id: raw.id,
    name: raw.name
  };
};
