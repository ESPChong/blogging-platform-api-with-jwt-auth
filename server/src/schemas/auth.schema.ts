import { z } from 'zod';

const passwordSecurityRegex : RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_-])[A-Za-z\d@$!%*?&#^()_-]+$/;

export const registerSchema = z.object({
    email: z.email('Invalid email format.')
        .trim()
        .toLowerCase(),
    password: z.string()
        .min(8, 'Password length must be at least 8 characters.')
        .max(40, 'Password too long.')
        .regex(
            passwordSecurityRegex,
            'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.'
        ),
    name: z.string()
        .min(4, 'Username must be 4 - 20 characters long.')
        .max(20, 'Username must be 4 - 20 characters long.')
});

export const loginSchema = z.object({
    email: z.email('Invalid email format.')
        .trim()
        .toLowerCase(),
    password: z.string()
        .min(1, 'Password is required.')
});