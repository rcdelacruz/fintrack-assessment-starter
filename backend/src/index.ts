import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/database';
import authRoutes from './routes/auth.routes';
import transactionRoutes from './routes/transaction.routes';
import goalRoutes from './routes/goal.routes';
import allocationRoutes from './routes/allocation.routes';
import { errorHandler } from './middleware/error.middleware';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/allocations', allocationRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;