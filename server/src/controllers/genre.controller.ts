import { Request, Response } from 'express';
import { z } from 'zod';
import { genreService } from '../services/genre.service';
import { sendSuccess } from '../utils/response';
import { asyncHandler } from '../utils/async-handler';

// Schema kiểm duyệt query parameter ngôn ngữ cho genres
const genreQuerySchema = z.object({
  language: z.enum(['en-US', 'vi-VN']).optional().default('en-US')
});

/**
 * Lấy danh sách thể loại phim điện ảnh (Movie Genres).
 */
export const getMovieGenres = asyncHandler(async (req: Request, res: Response) => {
  const query = genreQuerySchema.parse(req.query);
  const { genres, cached } = await genreService.getMovieGenres(query);

  return sendSuccess(res, genres, 'Lấy danh sách thể loại phim điện ảnh thành công', 200, { cached });
});

/**
 * Lấy danh sách thể loại phim truyền hình (TV Genres).
 */
export const getTvGenres = asyncHandler(async (req: Request, res: Response) => {
  const query = genreQuerySchema.parse(req.query);
  const { genres, cached } = await genreService.getTvGenres(query);

  return sendSuccess(res, genres, 'Lấy danh sách thể loại phim truyền hình thành công', 200, { cached });
});
