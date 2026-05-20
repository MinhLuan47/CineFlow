import { Router } from 'express';
import {
  getTrending,
  getPopular,
  getNowPlaying,
  getTopRated,
  getUpcoming,
  getMovieDetail,
  getMovieVideos,
  getMovieCredits,
  getMovieRecommendations,
  getMovieSimilar
} from '../controllers/movie.controller';

const router = Router();

// --- DANH SÁCH PHIM PHÂN TRANG (PAGINATED MOVIE LISTS) ---
router.get('/trending', getTrending);
router.get('/popular', getPopular);
router.get('/now-playing', getNowPlaying);
router.get('/top-rated', getTopRated);
router.get('/upcoming', getUpcoming);

// --- CHI TIẾT VÀ DỮ LIỆU LIÊN QUAN (MOVIE DETAIL & NESTED DATA) ---
router.get('/:id', getMovieDetail);
router.get('/:id/videos', getMovieVideos);
router.get('/:id/credits', getMovieCredits);
router.get('/:id/recommendations', getMovieRecommendations);
router.get('/:id/similar', getMovieSimilar);

export default router;
