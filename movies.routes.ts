import { Router } from 'express';
import { getAll, getOne, create, update, remove } from '../controllers/movies.controller';
import { authenticate } from '../middlewares/auth';
import { authorize } from '../middlewares/authorize';
import { validate } from '../middlewares/validate';
import { z } from 'zod';

const router = Router();

const movieSchema = z.object({
  title: z.string().min(1),
  genre: z.string(),
  releaseYear: z.number().int().min(1888).max(2100),
  director: z.string(),
  coverUrl: z.string().url().optional(),
});

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', authenticate, authorize('ADMIN', 'MODERATOR'), validate(movieSchema), create);
router.put('/:id', authenticate, authorize('ADMIN', 'MODERATOR'), validate(movieSchema.partial()), update);
router.delete('/:id', authenticate, authorize('ADMIN'), remove);

export default router;