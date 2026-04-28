import nodemailer from 'nodemailer';
import { config } from '../config';

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: false,
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  await transporter.sendMail({ from: 'noreply@movieapi.com', to, subject, html });
};