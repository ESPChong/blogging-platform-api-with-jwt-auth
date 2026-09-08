// Middleware comes before the controller handling logic
// Written to be reusable across different endpoints
// E.g. Usable for User registration and login endpoints, Usable for some other form of request validation (such as Role-Based Authorisation)
// This middleware can be used for other kinds of request validation handling as well, with different schemas

import type { Request, Response, NextFunction } from 'express';
import { ZodError, type ZodType } from 'zod';

export const validateRequest = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body); // Validates the request body
      next(); // Validation succeeds -> passes the request to the next handler
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
