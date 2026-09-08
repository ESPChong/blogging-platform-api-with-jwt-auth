import express, { type Express, type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
  });
});

// API Routes

app.get('/', (_req: Request, res: Response) => {
  res.send('hello world');
});

// Auth Routes
app.use('/api/auth', authRoutes);

app.use('*', (_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: '404 not found',
  });
});

// Sits at the very bottom of the application, to catch any errors that occur (every error leads to this handler)
app.use(errorHandler);

export default app;
