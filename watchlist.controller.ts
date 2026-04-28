import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/auth';
import * as watchlistService from '../services/watchlist.service';

export const getWatchlist = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const items = await watchlistService.getUserWatchlist(req.user!.id);
    res.json(items);
  } catch (err) {
    next(err);
  }
};

export const addItem = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { movieId, status } = req.body;
    const item = await watchlistService.addToWatchlist(req.user!.id, movieId, status);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

export const updateItem = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { status } = req.body;
    await watchlistService.updateWatchlistItem(req.user!.id, req.params.movieId, status);
    const updatedList = await watchlistService.getUserWatchlist(req.user!.id);
    const updated = updatedList.find(item => item.movieId === req.params.movieId);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const removeItem = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await watchlistService.removeFromWatchlist(req.user!.id, req.params.movieId);
    res.json({ message: 'Removed from watchlist' });
  } catch (err) {
    next(err);
  }
};