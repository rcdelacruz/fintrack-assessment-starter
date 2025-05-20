import { Request, Response } from 'express';
import { Allocation } from '../models/allocation.model';
import { Goal } from '../models/goal.model';
import { AllocationService, PriorityBasedAllocation, TimelineBasedAllocation, BalancedAllocation } from '../services/allocation.service';

// Allocate funds to goals
export const allocateFunds = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user._id;
    const { amount, strategy, constraints } = req.body;
    
    if (!amount || amount <= 0) {
      res.status(400).json({ message: 'Invalid allocation amount' });
      return;
    }
    
    // Create appropriate allocation strategy based on request
    let allocationStrategy;
    switch (strategy) {
      case 'priority':
        allocationStrategy = new PriorityBasedAllocation();
        break;
      case 'timeline':
        allocationStrategy = new TimelineBasedAllocation();
        break;
      case 'balanced':
      default:
        allocationStrategy = new BalancedAllocation();
        break;
    }
    
    // Create allocation service with the selected strategy
    const allocationService = new AllocationService(allocationStrategy);
    
    // Perform allocation
    const result = await allocationService.allocateFunds(amount, userId, constraints);
    
    if (result.allocations.length === 0) {
      res.status(400).json({ message: 'No eligible goals found for allocation' });
      return;
    }
    
    // Create allocation records and update goal amounts
    const allocations = [];
    
    for (const allocation of result.allocations) {
      // Create allocation record
      const newAllocation = await Allocation.create({
        userId,
        goalId: allocation.goalId,
        amount: allocation.amount,
        date: new Date(),
        source: req.body.source || 'Manual Allocation'
      });
      
      // Update goal's current amount
      await Goal.findByIdAndUpdate(
        allocation.goalId,
        { $inc: { currentAmount: allocation.amount } }
      );
      
      allocations.push(newAllocation);
    }
    
    res.status(201).json({
      totalAllocated: result.totalAllocated,
      allocations
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get allocations for a goal
export const getGoalAllocations = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user._id;
    const goalId = req.params.goalId;
    
    // Verify goal exists and belongs to user
    const goal = await Goal.findOne({ _id: goalId, userId });
    if (!goal) {
      res.status(404).json({ message: 'Goal not found' });
      return;
    }
    
    // Get allocations for the goal
    const allocations = await Allocation.find({ goalId, userId })
      .sort({ date: -1 });
    
    res.json({ data: allocations });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};