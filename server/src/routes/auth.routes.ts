import { Router } from 'express';

import { validateRequest } from '../middlewares/validateRequest';
import { registerSchema, loginSchema } from '../schemas/auth.schema';

const router = Router();

// POST /api/auth/register
router.post('/register', validateRequest(registerSchema), authController.register);

export default router;