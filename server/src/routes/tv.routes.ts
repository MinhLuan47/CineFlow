import { Router } from 'express';
import {
  getTrending,
  getPopular,
  getTopRated,
  getOnTheAir,
  getTvDetail,
  getTvVideos,
  getTvCredits,
  getTvRecommendations,
  getTvSimilar
} from '../controllers/tv.controller';

const router = Router();

// --- DANH SÁCH PHIM TRUYỀN HÌNH PHÂN TRANG (PAGINATED TV LISTS) ---
router.get('/trending', getTrending);
router.get('/popular', getPopular);
router.get('/top-rated', getTopRated);
router.get('/on-the-air', getOnTheAir);

// --- CHI TIẾT VÀ DỮ LIỆU LIÊN QUAN (TV DETAIL & NESTED DATA) ---
router.get('/:id', getTvDetail);
router.get('/:id/videos', getTvVideos);
router.get('/:id/credits', getTvCredits);
router.get('/:id/recommendations', getTvRecommendations);
router.get('/:id/similar', getTvSimilar);

export default router;
