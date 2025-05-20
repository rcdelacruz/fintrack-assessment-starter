import express from 'express';
import { register, login, getProfile } from '../controllers/auth.controller';
import { authenticateJwt } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticateJwt, getProfile);

export default router;