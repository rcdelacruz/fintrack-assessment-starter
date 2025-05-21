import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Goal } from '@/types/goal';

// The candidate should implement this hook
export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch goals
  useEffect(() => {
    const fetchGoals = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/goals');
        setGoals(response.data.data);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch goals');
        setGoals([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGoals();
  }, []);
  
  const createGoal = async (goalData: Omit<Goal, 'id' | 'currentAmount' | 'progress' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await api.post('/goals', goalData);
      setGoals([...goals, response.data]);
      return response.data;
    } catch (err: any) {
      throw new Error(err.message || 'Failed to create goal');
    }
  };
  
  const updateGoal = async (id: string, goalData: Partial<Goal>) => {
    try {
      const response = await api.put(`/goals/${id}`, goalData);
      setGoals(goals.map(goal => goal.id === id ? response.data : goal));
      return response.data;
    } catch (err: any) {
      throw new Error(err.message || 'Failed to update goal');
    }
  };
  
  const deleteGoal = async (id: string) => {
    try {
      await api.delete(`/goals/${id}`);
      setGoals(goals.filter(goal => goal.id !== id));
    } catch (err: any) {
      throw new Error(err.message || 'Failed to delete goal');
    }
  };
  
  return {
    goals,
    isLoading,
    error,
    createGoal,
    updateGoal,
    deleteGoal
  };
}