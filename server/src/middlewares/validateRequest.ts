import type { Request, Response, NextFunction } from 'express';
import { ZodError, z } from 'zod';

export const validateRequest = (schema: z.ZodType<unknown>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: error.issues,
        });
      }
      next(error);
    }
  };
};