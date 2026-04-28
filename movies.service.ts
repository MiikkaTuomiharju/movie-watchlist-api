import prisma from '../utils/prisma';

export const getAllMovies = () => prisma.movie.findMany();

export const getMovieById = (id: string) =>
  prisma.movie.findUnique({ where: { id } });

export const createMovie = (data: {
  title: string;
  genre: string;
  releaseYear: number;
  director: string;
  coverUrl?: string;
}) => prisma.movie.create({ data });

export const updateMovie = (
  id: string,
  data: {
    title?: string;
    genre?: string;
    releaseYear?: number;
    director?: string;
    coverUrl?: string;
  }
) => prisma.movie.update({ where: { id }, data });

export const deleteMovie = (id: string) => prisma.movie.delete({ where: { id } });