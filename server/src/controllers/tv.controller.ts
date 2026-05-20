import { Request, Response } from 'express';
import { z } from 'zod';
import { tvService } from '../services/tv.service';
import { sendSuccess, ApiError } from '../utils/response';
import { asyncHandler } from '../utils/async-handler';

// --- ZOD SCHEMAS FOR VALIDATION ---

// Schema kiểm duyệt các query parameters của danh sách phim truyền hình
const tvQuerySchema = z.object({
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

// Schema kiểm duyệt tham số ID của phim truyền hình trong URL params
const tvIdParamSchema = z.object({
  id: z.string().transform((val) => {
    const parsed = parseInt(val, 10);
    if (isNaN(parsed) || parsed <= 0) {
      throw new ApiError(400, 'ID phim truyền hình phải là số nguyên dương hợp lệ', 'INVALID_TV_ID');
    }
    return parsed;
  })
});

// --- CONTROLLER HANDLERS ---

/**
 * Lấy danh sách phim truyền hình đang xu hướng (Trending).
 */
export const getTrending = asyncHandler(async (req: Request, res: Response) => {
  const query = tvQuerySchema.parse(req.query);
  const result = await tvService.getTrending(query);

  return sendSuccess(res, result.results, 'Lấy danh sách phim truyền hình xu hướng thành công', 200, {
    page: result.page,
    totalPages: result.totalPages,
    totalResults: result.totalResults,
    cached: result.cached
  });
});

/**
 * Lấy danh sách phim truyền hình phổ biến (Popular).
 */
export const getPopular = asyncHandler(async (req: Request, res: Response) => {
  const query = tvQuerySchema.parse(req.query);
  const result = await tvService.getPopular(query);

  return sendSuccess(res, result.results, 'Lấy danh sách phim truyền hình phổ biến thành công', 200, {
    page: result.page,
    totalPages: result.totalPages,
    totalResults: result.totalResults,
    cached: result.cached
  });
});

/**
 * Lấy danh sách phim truyền hình đánh giá cao nhất (Top Rated).
 */
export const getTopRated = asyncHandler(async (req: Request, res: Response) => {
  const query = tvQuerySchema.parse(req.query);
  const result = await tvService.getTopRated(query);

  return sendSuccess(res, result.results, 'Lấy danh sách phim truyền hình đánh giá cao thành công', 200, {
    page: result.page,
    totalPages: result.totalPages,
    totalResults: result.totalResults,
    cached: result.cached
  });
});

/**
 * Lấy danh sách phim truyền hình đang phát sóng (On The Air).
 */
export const getOnTheAir = asyncHandler(async (req: Request, res: Response) => {
  const query = tvQuerySchema.parse(req.query);
  const result = await tvService.getOnTheAir(query);

  return sendSuccess(res, result.results, 'Lấy danh sách phim truyền hình đang phát sóng thành công', 200, {
    page: result.page,
    totalPages: result.totalPages,
    totalResults: result.totalResults,
    cached: result.cached
  });
});

/**
 * Lấy chi tiết thông tin bộ phim truyền hình (TV Series Detail).
 */
export const getTvDetail = asyncHandler(async (req: Request, res: Response) => {
  const { id } = tvIdParamSchema.parse(req.params);
  const query = tvQuerySchema.pick({ language: true }).parse(req.query);

  const { data, cached } = await tvService.getTvDetail(id, query);

  return sendSuccess(res, data, 'Lấy chi tiết phim truyền hình thành công', 200, { cached });
});

/**
 * Lấy danh sách video (trailer) của bộ phim truyền hình.
 */
export const getTvVideos = asyncHandler(async (req: Request, res: Response) => {
  const { id } = tvIdParamSchema.parse(req.params);
  const query = tvQuerySchema.pick({ language: true }).parse(req.query);

  const { results, cached } = await tvService.getTvVideos(id, query);

  return sendSuccess(res, results, 'Lấy danh sách video phim truyền hình thành công', 200, { cached });
});

/**
 * Lấy danh sách diễn viên/thành viên đoàn phim (Credits) của phim truyền hình.
 */
export const getTvCredits = asyncHandler(async (req: Request, res: Response) => {
  const { id } = tvIdParamSchema.parse(req.params);
  const query = tvQuerySchema.pick({ language: true }).parse(req.query);

  const { cast, cached } = await tvService.getTvCredits(id, query);

  return sendSuccess(res, cast, 'Lấy danh sách diễn viên phim truyền hình thành công', 200, { cached });
});

/**
 * Lấy gợi ý đề xuất phim truyền hình liên quan (Recommendations).
 */
export const getTvRecommendations = asyncHandler(async (req: Request, res: Response) => {
  const { id } = tvIdParamSchema.parse(req.params);
  const query = tvQuerySchema.parse(req.query);

  const result = await tvService.getTvRecommendations(id, query);

  return sendSuccess(res, result.results, 'Lấy danh sách gợi ý phim truyền hình thành công', 200, {
    page: result.page,
    totalPages: result.totalPages,
    totalResults: result.totalResults,
    cached: result.cached
  });
});

/**
 * Lấy danh sách phim truyền hình tương tự (Similar).
 */
export const getTvSimilar = asyncHandler(async (req: Request, res: Response) => {
  const { id } = tvIdParamSchema.parse(req.params);
  const query = tvQuerySchema.parse(req.query);

  const result = await tvService.getTvSimilar(id, query);

  return sendSuccess(res, result.results, 'Lấy danh sách phim truyền hình tương tự thành công', 200, {
    page: result.page,
    totalPages: result.totalPages,
    totalResults: result.totalResults,
    cached: result.cached
  });
});
