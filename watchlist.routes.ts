import { Router } from 'express';
import { getWatchlist, addItem, updateItem, removeItem } from '../controllers/watchlist.controller';
import { authenticate } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { z } from 'zod';

const router = Router();

const watchlistSchema = z.object({
  movieId: z.string().uuid(),
  status: z.enum(['PLAN_TO_WATCH', 'WATCHING', 'COMPLETED', 'DROPPED']),
});

router.use(authenticate);
router.get('/', getWatchlist);
router.post('/', validate(watchlistSchema), addItem);
router.put('/:movieId', validate(watchlistSchema.pick({ status: true })), updateItem);
router.delete('/:movieId', removeItem);

export default router;