import { Request, Response } from 'express';
import { Goal } from '../models/goal.model';

// Get all goals with filtering and sorting
export const getGoals = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user._id;
    const filter: any = { userId };
    
    // Filter by status
    if (req.query.status) {
      filter.status = req.query.status;
    }
    
    // Determine sort order
    const sortField = req.query.sortBy || 'targetDate';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    const sort: any = {};
    sort[sortField as string] = sortOrder;
    
    const goals = await Goal.find(filter).sort(sort);
    
    // Calculate progress for each goal
    const goalsWithProgress = goals.map(goal => {
      const goalObj = goal.toObject();
      const progress = Math.round((goal.currentAmount / goal.targetAmount) * 100);
      return { ...goalObj, progress };
    });
    
    res.json({
      data: goalsWithProgress
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get goal by ID
export const getGoalById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user._id;
    const goal = await Goal.findOne({
      _id: req.params.id,
      userId
    });
    
    if (!goal) {
      res.status(404).json({ message: 'Goal not found' });
      return;
    }
    
    // Calculate progress
    const goalObj = goal.toObject();
    const progress = Math.round((goal.currentAmount / goal.targetAmount) * 100);
    
    res.json({ ...goalObj, progress });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new goal
export const createGoal = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user._id;
    const { name, targetAmount, targetDate, priority, category } = req.body;
    
    const goal = await Goal.create({
      userId,
      name,
      targetAmount,
      currentAmount: 0,
      startDate: new Date(),
      targetDate,
      priority,
      category,
      status: 'active'
    });
    
    // Calculate progress
    const goalObj = goal.toObject();
    const progress = 0; // New goal starts at 0%
    
    res.status(201).json({ ...goalObj, progress });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a goal
export const updateGoal = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user._id;
    const { name, targetAmount, targetDate, priority, category, status } = req.body;
    
    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, userId },
      {
        name,
        targetAmount,
        targetDate,
        priority,
        category,
        status
      },
      { new: true, runValidators: true }
    );
    
    if (!goal) {
      res.status(404).json({ message: 'Goal not found' });
      return;
    }
    
    // Calculate progress
    const goalObj = goal.toObject();
    const progress = Math.round((goal.currentAmount / goal.targetAmount) * 100);
    
    res.json({ ...goalObj, progress });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a goal
export const deleteGoal = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user._id;
    const goal = await Goal.findOneAndDelete({
      _id: req.params.id,
      userId
    });
    
    if (!goal) {
      res.status(404).json({ message: 'Goal not found' });
      return;
    }
    
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};