import { Router } from 'express';
import { getDiscoverMovie, getDiscoverTv } from '../controllers/discover.controller';

const router = Router();

// --- KHÁM PHÁ VÀ LỌC PHIM (DISCOVER ENDPOINTS) ---
router.get('/movie', getDiscoverMovie);
router.get('/tv', getDiscoverTv);

export default router;
