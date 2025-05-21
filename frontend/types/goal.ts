export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  startDate: string;
  targetDate: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  status: 'active' | 'completed' | 'behind' | 'ahead' | 'paused';
  progress?: number;
  createdAt: string;
  updatedAt: string;
}

export interface AllocationConstraints {
  minimumAllocation?: number;
  maximumPerGoal?: number;
  excludeGoals?: string[];
}

export interface Allocation {
  id: string;
  goalId: string;
  amount: number;
  source?: string;
  date: string;
  createdAt: string;
}