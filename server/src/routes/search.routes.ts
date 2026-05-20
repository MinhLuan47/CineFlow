import { Router } from 'express';
import { searchMulti, searchMovie, searchTv } from '../controllers/search.controller';

const router = Router();

router.get('/multi', searchMulti);
router.get('/movie', searchMovie);
router.get('/tv', searchTv);

export default router;
