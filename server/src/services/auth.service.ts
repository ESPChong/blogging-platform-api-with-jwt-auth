// Where the low level business logic lives
// Methods to be implemented by the controller
// Interacts with the database to obtain data
// Does not use/handle Request and Response objects

import prisma from '../config/prisma';
import bcrypt from 'bcryptjs';
import { generateToken } from '../helpers/jwt';
import { AppError } from '../helpers/AppError';
import type { RegisterInput } from '../schemas/auth.schema';

export class AuthService {
  // Register new user
  async registerUser(userData: RegisterInput) {
    // Check if user already exists
    const existingEmail = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existingEmail) {
      throw new AppError('User already registered', 409);
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(userData.password, 12);

    // Create user in database
    const user = await prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        username: userData.username,
      },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
      },
    });

    // Generate JWT Token
    const token = generateToken({ userId: user.id });

    return {
      user,
      token,
    };
  }

  async loginUser(email: string, password: string) {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    // Verify Password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 401);
    }

    // Generate JWT Token
    const token = generateToken({ userId: user.id });

    // returns and object consisting of a user object and a token
    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      token,
    };
  }
}
