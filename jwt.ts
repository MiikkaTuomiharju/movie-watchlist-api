import jwt from 'jsonwebtoken';
import { config } from '../config';

export const signToken = (payload: object, expiresIn = '1d'): string => {
  return jwt.sign(payload, config.jwtSecret, { expiresIn });
};

export const verifyToken = (token: string): jwt.JwtPayload | string => {
  return jwt.verify(token, config.jwtSecret);
};