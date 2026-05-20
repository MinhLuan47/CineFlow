import { Request, Response } from 'express';
import { z } from 'zod';
import { movieService } from '../services/movie.service';
import { sendSuccess, ApiError } from '../utils/response';
import { asyncHandler } from '../utils/async-handler';

// --- ZOD SCHEMAS FOR VALIDATION ---

// Schema kiểm duyệt các query parameters của danh sách phim
const movieQuerySchema = z.object({
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

// Schema kiểm duyệt tham số ID của phim trong URL params
const movieIdParamSchema = z.object({
  id: z.string().transform((val) => {
    const parsed = parseInt(val, 10);
    if (isNaN(parsed) || parsed <= 0) {
      throw new ApiError(400, 'ID phim phải là số nguyên dương hợp lệ', 'INVALID_MOVIE_ID');
    }
    return parsed;
  })
});

// --- CONTROLLER HANDLERS ---

/**
 * Lấy danh sách phim đang xu hướng (Trending).
 */
export const getTrending = asyncHandler(async (req: Request, res: Response) => {
  const query = movieQuerySchema.parse(req.query);
  const result = await movieService.getTrending(query);

  return sendSuccess(res, result.results, 'Lấy danh sách phim xu hướng thành công', 200, {
    page: result.page,
    totalPages: result.totalPages,
    totalResults: result.totalResults,
    cached: result.cached
  });
});

/**
 * Lấy danh sách phim phổ biến (Popular).
 */
export const getPopular = asyncHandler(async (req: Request, res: Response) => {
  const query = movieQuerySchema.parse(req.query);
  const result = await movieService.getPopular(query);

  return sendSuccess(res, result.results, 'Lấy danh sách phim phổ biến thành công', 200, {
    page: result.page,
    totalPages: result.totalPages,
    totalResults: result.totalResults,
    cached: result.cached
  });
});

/**
 * Lấy danh sách phim đang chiếu (Now Playing).
 */
export const getNowPlaying = asyncHandler(async (req: Request, res: Response) => {
  const query = movieQuerySchema.parse(req.query);
  const result = await movieService.getNowPlaying(query);

  return sendSuccess(res, result.results, 'Lấy danh sách phim đang chiếu thành công', 200, {
    page: result.page,
    totalPages: result.totalPages,
    totalResults: result.totalResults,
    cached: result.cached
  });
});

/**
 * Lấy danh sách phim đánh giá cao (Top Rated).
 */
export const getTopRated = asyncHandler(async (req: Request, res: Response) => {
  const query = movieQuerySchema.parse(req.query);
  const result = await movieService.getTopRated(query);

  return sendSuccess(res, result.results, 'Lấy danh sách phim đánh giá cao thành công', 200, {
    page: result.page,
    totalPages: result.totalPages,
    totalResults: result.totalResults,
    cached: result.cached
  });
});

/**
 * Lấy danh sách phim sắp chiếu (Upcoming).
 */
export const getUpcoming = asyncHandler(async (req: Request, res: Response) => {
  const query = movieQuerySchema.parse(req.query);
  const result = await movieService.getUpcoming(query);

  return sendSuccess(res, result.results, 'Lấy danh sách phim sắp chiếu thành công', 200, {
    page: result.page,
    totalPages: result.totalPages,
    totalResults: result.totalResults,
    cached: result.cached
  });
});

/**
 * Lấy chi tiết thông tin bộ phim (Movie Detail).
 */
export const getMovieDetail = asyncHandler(async (req: Request, res: Response) => {
  const { id } = movieIdParamSchema.parse(req.params);
  const query = movieQuerySchema.pick({ language: true }).parse(req.query);

  const { data, cached } = await movieService.getMovieDetail(id, query);

  return sendSuccess(res, data, 'Lấy chi tiết phim thành công', 200, { cached });
});

/**
 * Lấy danh sách video (trailer) của bộ phim.
 */
export const getMovieVideos = asyncHandler(async (req: Request, res: Response) => {
  const { id } = movieIdParamSchema.parse(req.params);
  const query = movieQuerySchema.pick({ language: true }).parse(req.query);

  const { results, cached } = await movieService.getMovieVideos(id, query);

  return sendSuccess(res, results, 'Lấy danh sách video phim thành công', 200, { cached });
});

/**
 * Lấy danh sách diễn viên (Credits).
 */
export const getMovieCredits = asyncHandler(async (req: Request, res: Response) => {
  const { id } = movieIdParamSchema.parse(req.params);
  const query = movieQuerySchema.pick({ language: true }).parse(req.query);

  const { cast, cached } = await movieService.getMovieCredits(id, query);

  return sendSuccess(res, cast, 'Lấy danh sách diễn viên thành công', 200, { cached });
});

/**
 * Lấy các phim gợi ý đề xuất (Recommendations).
 */
export const getMovieRecommendations = asyncHandler(async (req: Request, res: Response) => {
  const { id } = movieIdParamSchema.parse(req.params);
  const query = movieQuerySchema.parse(req.query);

  const result = await movieService.getMovieRecommendations(id, query);

  return sendSuccess(res, result.results, 'Lấy danh sách phim gợi ý thành công', 200, {
    page: result.page,
    totalPages: result.totalPages,
    totalResults: result.totalResults,
    cached: result.cached
  });
});

/**
 * Lấy các phim tương tự (Similar).
 */
export const getMovieSimilar = asyncHandler(async (req: Request, res: Response) => {
  const { id } = movieIdParamSchema.parse(req.params);
  const query = movieQuerySchema.parse(req.query);

  const result = await movieService.getMovieSimilar(id, query);

  return sendSuccess(res, result.results, 'Lấy danh sách phim tương tự thành công', 200, {
    page: result.page,
    totalPages: result.totalPages,
    totalResults: result.totalResults,
    cached: result.cached
  });
});
