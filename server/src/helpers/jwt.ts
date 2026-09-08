// JWT Generating and Verifying Helper

import jwt, { type JwtPayload, type SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET: string | undefined = process.env.JWT_SECRET; // Add secret key in env
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '7d';

if (!JWT_SECRET) {
  throw new Error('JWT Secret is not defined in env variables.');
}

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, {
    // Required to resolve type issue, and to avoid using 'any' type
    expiresIn: JWT_EXPIRES_IN as NonNullable<SignOptions['expiresIn']>,
  });
};

export const verifyToken = (token: string): JwtPayload | string => {
  return jwt.verify(token, JWT_SECRET);
};
