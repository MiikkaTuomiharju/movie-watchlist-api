import prisma from '../utils/prisma';

export const getReviewsForMovie = (movieId: string) =>
  prisma.review.findMany({
    where: { movieId },
    include: {
      user: { select: { id: true, email: true } },
    },
  });

export const createReview = (userId: string, movieId: string, rating: number, text?: string) =>
  prisma.review.create({
    data: { userId, movieId, rating, text },
  });

export const updateReview = (
  reviewId: string,
  userId: string,
  role: string,
  data: { rating?: number; text?: string }
) =>
  prisma.review.updateMany({
    where: {
      id: reviewId,
      userId: role === 'USER' ? userId : undefined,
    },
    data,
  });

export const deleteReview = (reviewId: string, userId: string, role: string) =>
  prisma.review.deleteMany({
    where: {
      id: reviewId,
      ...(role === 'USER' ? { userId } : {}),
    },
  });