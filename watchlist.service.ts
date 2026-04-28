import prisma from '../utils/prisma';
import { WatchStatus } from '@prisma/client';

export const getUserWatchlist = (userId: string) =>
  prisma.watchlistItem.findMany({
    where: { userId },
    include: { movie: true },
  });

export const addToWatchlist = (userId: string, movieId: string, status: WatchStatus) =>
  prisma.watchlistItem.create({
    data: { userId, movieId, status },
  });

export const updateWatchlistItem = (userId: string, movieId: string, status: WatchStatus) =>
  prisma.watchlistItem.updateMany({
    where: { userId, movieId },
    data: { status },
  });

export const removeFromWatchlist = (userId: string, movieId: string) =>
  prisma.watchlistItem.deleteMany({
    where: { userId, movieId },
  });