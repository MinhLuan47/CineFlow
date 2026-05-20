import { Request, Response } from 'express';
import { z } from 'zod';
import { searchService } from '../services/search.service';
import { sendSuccess } from '../utils/response';
import { asyncHandler } from '../utils/async-handler';

// Schema kiểm duyệt query parameters của tính năng tìm kiếm
const searchQuerySchema = z.object({
  query: z
    .string({ required_error: 'Từ khóa tìm kiếm (query) là bắt buộc' })
    .min(1, 'Từ khóa tìm kiếm không được để trống'),
  page: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return 1;
      const parsed = parseInt(val, 10);
      return isNaN(parsed) || parsed < 1 ? 1 : parsed;
    })
    .default('1'),
  language: z.enum(['en-US', 'vi-VN']).optional().default('en-US'),
  region: z.string().optional().default('US')
});

/**
 * Tìm kiếm đa đối tượng (Multi Search).
 */
export const searchMulti = asyncHandler(async (req: Request, res: Response) => {
  const query = searchQuerySchema.parse(req.query);
  const result = await searchService.searchMulti(query);

  return sendSuccess(res, result.results, 'Tìm kiếm tổng hợp thành công', 200, {
    page: result.page,
    totalPages: result.totalPages,
    totalResults: result.totalResults,
    cached: result.cached
  });
});

/**
 * Tìm kiếm phim điện ảnh (Movie Search).
 */
export const searchMovie = asyncHandler(async (req: Request, res: Response) => {
  const query = searchQuerySchema.parse(req.query);
  const result = await searchService.searchMovie(query);

  return sendSuccess(res, result.results, 'Tìm kiếm phim điện ảnh thành công', 200, {
    page: result.page,
    totalPages: result.totalPages,
    totalResults: result.totalResults,
    cached: result.cached
  });
});

/**
 * Tìm kiếm phim truyền hình (TV Search).
 */
export const searchTv = asyncHandler(async (req: Request, res: Response) => {
  const query = searchQuerySchema.parse(req.query);
  const result = await searchService.searchTv(query);

  return sendSuccess(res, result.results, 'Tìm kiếm phim truyền hình thành công', 200, {
    page: result.page,
    totalPages: result.totalPages,
    totalResults: result.totalResults,
    cached: result.cached
  });
});
