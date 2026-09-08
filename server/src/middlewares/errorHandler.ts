import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from 'express';
import { ZodError } from 'zod';
import { AppError } from '../helpers/AppError';

export const errorHandler: ErrorRequestHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(err); // Log error in terminal for debugging

  // Custom App Errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Zod Schema Validation Errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: err.issues,
    });
  }

  // Prisma Errors
  if (typeof err === 'object' && err !== null && 'code' in err) {
    const prismaErr = err as { code: string; meta?: { target?: string[] } };

    // Unique constraint failed
    if (prismaErr.code === 'P2002') {
      const target = prismaErr.meta?.target;
      return res.status(409).json({
        success: false,
        message: `The ${target?.join(', ') || 'value'} is already in use.`,
      });
    }

    // Record not found
    if (prismaErr.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Record not found.',
      });
    }
  }

  // Fallback for unknown errors
  return res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
};
