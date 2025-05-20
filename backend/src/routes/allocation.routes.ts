import express from 'express';
import { authenticateJwt } from '../middleware/auth.middleware';
import {
  allocateFunds,
  getGoalAllocations
} from '../controllers/allocation.controller';

const router = express.Router();

// Apply authentication middleware to all allocation routes
router.use(authenticateJwt);

router.post('/', allocateFunds);
router.get('/goals/:goalId', getGoalAllocations);

export default router;