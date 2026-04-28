import { Router } from 'express';
import { getMovieReviews, addReview, updateReview, deleteReview } from '../controllers/reviews.controller';
import { authenticate } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { z } from 'zod';

const router = Router();

const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  text: z.string().optional(),
});

router.get('/movies/:movieId/reviews', getMovieReviews);
router.post('/movies/:movieId/reviews', authenticate, validate(reviewSchema), addReview);
router.put('/:id', authenticate, validate(reviewSchema.partial()), updateReview);
router.delete('/:id', authenticate, deleteReview);

export default router;