// High level control of what happens when a specific endpoint is hit
// Contains usage of Services
// Accepts a HTTP Request and Returns a HTTP Response

import type { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service'

export class AuthController {
    constructor(private authService : AuthService = new AuthService()){}

    /**
     *  POST /api/auth/register
     *  Register a new user
     * 
     */

    async register (req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userData = req.body;
            const result = await this.authService.registerUser(userData);

            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * POST /api/auth/login
     * Login user and return JWT Token
     */

    async login (req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body;
            const result = await this.authService.loginUser(email, password);
        
            res.status(200).json({
                success: true,
                message: 'Login successful',
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }
}