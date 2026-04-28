import prisma from '../utils/prisma';
import { hashPassword, comparePassword } from '../utils/hash';
import { signToken } from '../utils/jwt';
import { v4 as uuidv4 } from 'uuid';
import { sendEmail } from '../utils/mail';

export const register = async (email: string, password: string) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw Object.assign(new Error('Email already in use'), { status: 409 });
  }
  const hashed = await hashPassword(password);
  const user = await prisma.user.create({
    data: { email, password: hashed },
  });
  return { id: user.id, email: user.email, role: user.role };
};

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw Object.assign(new Error('Invalid email or password'), { status: 401 });
  }
  const valid = await comparePassword(password, user.password);
  if (!valid) {
    throw Object.assign(new Error('Invalid email or password'), { status: 401 });
  }
  const token = signToken({ id: user.id, role: user.role });
  return { token, user: { id: user.id, email: user.email, role: user.role } };
};

export const forgotPassword = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { message: 'If that email exists, a reset link has been sent.' };
  }
  const token = uuidv4();
  await prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
    },
  });
  const resetUrl = `http://localhost:3000/auth/reset-password?token=${token}`;
  await sendEmail(
    email,
    'Password Reset',
    `Click <a href="${resetUrl}">here</a> to reset your password.`
  );
  return { message: 'If that email exists, a reset link has been sent.' };
};

export const resetPassword = async (token: string, newPassword: string) => {
  const resetRecord = await prisma.passwordResetToken.findUnique({ where: { token } });
  if (!resetRecord || resetRecord.expiresAt < new Date()) {
    throw Object.assign(new Error('Invalid or expired token'), { status: 400 });
  }
  const hashed = await hashPassword(newPassword);
  await prisma.user.update({
    where: { id: resetRecord.userId },
    data: { password: hashed },
  });
  await prisma.passwordResetToken.delete({ where: { id: resetRecord.id } });
  return { message: 'Password reset successful' };
};