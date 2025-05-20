import { Request, Response } from 'express';
import { Transaction } from '../models/transaction.model';

// Get all transactions with filtering, pagination, and sorting
export const getTransactions = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user._id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;
    
    // Build filter query
    const filter: any = { userId };
    
    // Filter by type
    if (req.query.type) {
      filter.type = req.query.type;
    }
    
    // Filter by date range
    if (req.query.startDate || req.query.endDate) {
      filter.date = {};
      if (req.query.startDate) {
        filter.date.$gte = new Date(req.query.startDate as string);
      }
      if (req.query.endDate) {
        filter.date.$lte = new Date(req.query.endDate as string);
      }
    }
    
    // Filter by search term (merchant or description)
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search as string, 'i');
      filter.$or = [
        { merchant: searchRegex },
        { description: searchRegex }
      ];
    }
    
    // Determine sort order
    const sortField = req.query.sortBy || 'date';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    const sort: any = {};
    sort[sortField as string] = sortOrder;
    
    // Execute query with pagination
    const transactions = await Transaction.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);
    
    // Get total count for pagination
    const total = await Transaction.countDocuments(filter);
    
    res.json({
      data: transactions,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get transaction by ID
export const getTransactionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user._id;
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      userId
    });
    
    if (!transaction) {
      res.status(404).json({ message: 'Transaction not found' });
      return;
    }
    
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new transaction
export const createTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user._id;
    const { date, merchant, amount, type, category, description, status } = req.body;
    
    const transaction = await Transaction.create({
      userId,
      date,
      merchant,
      amount,
      type,
      category,
      description,
      status: status || 'completed'
    });
    
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a transaction
export const updateTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user._id;
    const { date, merchant, amount, type, category, description, status } = req.body;
    
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId },
      {
        date,
        merchant,
        amount,
        type,
        category,
        description,
        status
      },
      { new: true, runValidators: true }
    );
    
    if (!transaction) {
      res.status(404).json({ message: 'Transaction not found' });
      return;
    }
    
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a transaction
export const deleteTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user._id;
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId
    });
    
    if (!transaction) {
      res.status(404).json({ message: 'Transaction not found' });
      return;
    }
    
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};