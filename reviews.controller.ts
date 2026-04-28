import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/auth';
import * as reviewService from '../services/reviews.service';

export const getMovieReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reviews = await reviewService.getReviewsForMovie(req.params.movieId);
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

export const addReview = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { rating, text } = req.body;
    const review = await reviewService.createReview(req.user!.id, req.params.movieId, rating, text);
    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
};

export const updateReview = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await reviewService.updateReview(req.params.id, req.user!.id, req.user!.role, req.body);
    res.json({ message: 'Review updated' });
  } catch (err) {
    next(err);
  }
};

export const deleteReview = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await reviewService.deleteReview(req.params.id, req.user!.id, req.user!.role);
    res.json({ message: 'Review deleted' });
  } catch (err) {
    next(err);
  }
};