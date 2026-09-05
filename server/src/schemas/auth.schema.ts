import { z } from 'zod';

export const registerSchema = z.object({
  email: z.email('Invalid email format'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password too long'),
  name: z.string()
    .min(4, 'Username must have at least 4 characters')
    .max(100).optional()
});

export const loginSchema = z.object({
  email: z.email('Invalid email format'),
  password: z.string().min(1, 'Password is required')
});