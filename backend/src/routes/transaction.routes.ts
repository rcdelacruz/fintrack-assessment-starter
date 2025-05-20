import express from 'express';
import { authenticateJwt } from '../middleware/auth.middleware';
import {
  getTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction
} from '../controllers/transaction.controller';

const router = express.Router();

// Apply authentication middleware to all transaction routes
router.use(authenticateJwt);

router.get('/', getTransactions);
router.get('/:id', getTransactionById);
router.post('/', createTransaction);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

export default router;