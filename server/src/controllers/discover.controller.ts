import { Request, Response } from 'express';
import { z } from 'zod';
import { discoverService } from '../services/discover.service';
import { sendSuccess } from '../utils/response';
import { asyncHandler } from '../utils/async-handler';

// --- ZOD SCHEMAS FOR VALIDATION ---

// Schema kiểm duyệt các query parameters phục vụ khám phá phim (discover)
const discoverQuerySchema = z.object({
  genreId: z.string().optional(),
  page: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return 1;
      const parsed = parseInt(val, 10);
      return isNaN(parsed) || parsed < 1 ? 1 : parsed;
    })
    .default('1'),
  language: z.enum(['en-US', 'vi-VN']).optional().default('vi-VN'),
  region: z.string().optional().default('VN'),
  sortBy: z.string().optional().default('popularity.desc'),
  year: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return undefined;
      const parsed = parseInt(val, 10);
      return isNaN(parsed) ? undefined : parsed;
    })
});

// --- CONTROLLER HANDLERS ---

/**
 * Khám phá Phim điện ảnh (Discover Movie).
 */
export const getDiscoverMovie = asyncHandler(async (req: Request, res: Response) => {
  const query = discoverQuerySchema.parse(req.query);
  const result = await discoverService.discoverMovie(query);

  return sendSuccess(res, result.results, 'Khám phá phim điện ảnh thành công', 200, {
    page: result.page,
    totalPages: result.totalPages,
    totalResults: result.totalResults,
    cached: result.cached
  });
});

/**
 * Khám phá Phim truyền hình (Discover TV Series).
 */
export const getDiscoverTv = asyncHandler(async (req: Request, res: Response) => {
  const query = discoverQuerySchema.parse(req.query);
  const result = await discoverService.discoverTv(query);

  return sendSuccess(res, result.results, 'Khám phá phim truyền hình thành công', 200, {
    page: result.page,
    totalPages: result.totalPages,
    totalResults: result.totalResults,
    cached: result.cached
  });
});
