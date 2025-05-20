import express from 'express';
import { authenticateJwt } from '../middleware/auth.middleware';
import {
  getGoals,
  getGoalById,
  createGoal,
  updateGoal,
  deleteGoal
} from '../controllers/goal.controller';

const router = express.Router();

// Apply authentication middleware to all goal routes
router.use(authenticateJwt);

router.get('/', getGoals);
router.get('/:id', getGoalById);
router.post('/', createGoal);
router.put('/:id', updateGoal);
router.delete('/:id', deleteGoal);

export default router;