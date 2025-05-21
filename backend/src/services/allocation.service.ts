import { Goal } from '../models/goal.model';

// Define the structure for allocation options
export interface AllocationOptions {
  minimumAllocation?: number;
  maximumPerGoal?: number;
  excludeGoals?: string[];
}

// Define the structure for allocation results
export interface AllocationResult {
  goalId: string;
  amount: number;
  percentage: number;
}

// Base Strategy Interface
export interface AllocationStrategy {
  allocate(amount: number, goals: any[], options?: AllocationOptions): AllocationResult[];
}

// Priority-Based Allocation Strategy
export class PriorityBasedAllocation implements AllocationStrategy {
  allocate(amount: number, goals: any[], options?: AllocationOptions): AllocationResult[] {
    // TODO: Implement the priority-based allocation algorithm
    // This is the core algorithm challenge for the candidate to implement
    
    // This is just a placeholder implementation
    return [];
  }
}

// Timeline-Based Allocation Strategy
export class TimelineBasedAllocation implements AllocationStrategy {
  allocate(amount: number, goals: any[], options?: AllocationOptions): AllocationResult[] {
    // TODO: Implement the timeline-based allocation algorithm
    // This is the core algorithm challenge for the candidate to implement
    
    // This is just a placeholder implementation
    return [];
  }
}

// Balanced Allocation Strategy
export class BalancedAllocation implements AllocationStrategy {
  allocate(amount: number, goals: any[], options?: AllocationOptions): AllocationResult[] {
    // TODO: Implement the balanced allocation algorithm
    // This is the core algorithm challenge for the candidate to implement
    
    // This is just a placeholder implementation
    return [];
  }
}

// Allocation Service that uses the Strategy Pattern
export class AllocationService {
  private strategy: AllocationStrategy;

  constructor(strategy: AllocationStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: AllocationStrategy): void {
    this.strategy = strategy;
  }

  async allocateFunds(amount: number, userId: string, options?: AllocationOptions): Promise<{
    allocations: AllocationResult[];
    totalAllocated: number;
    remainingAmount: number;
  }> {
    // Fetch eligible goals for the user
    const goals = await Goal.find({
      userId,
      status: { $in: ['active', 'behind'] },
      ...(options?.excludeGoals ? { _id: { $nin: options.excludeGoals } } : {}),
    });

    // Skip allocation if no eligible goals
    if (goals.length === 0) {
      return {
        allocations: [],
        totalAllocated: 0,
        remainingAmount: amount,
      };
    }

    // Perform allocation using the current strategy
    const allocations = this.strategy.allocate(amount, goals, options);

    // Calculate total allocated amount
    const totalAllocated = allocations.reduce((sum, allocation) => sum + allocation.amount, 0);

    return {
      allocations,
      totalAllocated,
      remainingAmount: amount - totalAllocated,
    };
  }
}
