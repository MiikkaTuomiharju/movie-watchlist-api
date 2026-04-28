import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'dev-secret',
  email: {
    host: process.env.EMAIL_HOST || 'localhost',
    port: Number(process.env.EMAIL_PORT) || 1025,
  },
};