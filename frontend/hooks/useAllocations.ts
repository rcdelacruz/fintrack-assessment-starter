import { useState } from 'react';
import { api } from '@/lib/api';
import { AllocationConstraints } from '@/types/goal';

interface AllocationResult {
  goalId: string;
  amount: number;
  percentage: number;
}

// The candidate should implement this hook
export function useAllocations() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const allocateFunds = async (
    amount: number, 
    strategy: 'priority' | 'timeline' | 'balanced',
    constraints?: AllocationConstraints
  ) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.post('/allocations', {
        amount,
        strategy,
        constraints
      });
      
      setIsLoading(false);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to allocate funds');
      setIsLoading(false);
      throw err;
    }
  };
  
  const getGoalAllocations = async (goalId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.get(`/goals/${goalId}/allocations`);
      setIsLoading(false);
      return response.data.data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch allocations');
      setIsLoading(false);
      throw err;
    }
  };
  
  return {
    allocateFunds,
    getGoalAllocations,
    isLoading,
    error
  };
}