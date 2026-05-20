import { Router } from 'express';
import { getMovieGenres, getTvGenres } from '../controllers/genre.controller';

const router = Router();

router.get('/movie', getMovieGenres);
router.get('/tv', getTvGenres);

export default router;
