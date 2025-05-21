import React, { useState } from 'react';
import { Goal } from '@/types/goal';

interface GoalFormProps {
  onSubmit: (goalData: Omit<Goal, 'id' | 'currentAmount' | 'progress' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  initialData?: Partial<Goal>;
  isEditing?: boolean;
}

// The candidate should implement this component
export default function GoalForm({ onSubmit, initialData = {}, isEditing = false }: GoalFormProps) {
  const [name, setName] = useState(initialData.name || '');
  const [targetAmount, setTargetAmount] = useState(initialData.targetAmount || 0);
  const [targetDate, setTargetDate] = useState(initialData.targetDate ? new Date(initialData.targetDate).toISOString().split('T')[0] : '');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>(initialData.priority || 'medium');
  const [category, setCategory] = useState(initialData.category || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      await onSubmit({
        name,
        targetAmount,
        targetDate: new Date(targetDate).toISOString(),
        priority,
        category,
        status: 'active',
        startDate: new Date().toISOString()
      });
    } catch (err: any) {
      setError(err.message || 'Failed to save goal');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <p className="text-gray-500 mb-4">Goal form component - to be implemented.</p>
      {/* The candidate should implement the form fields here */}
      <div className="mt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
        >
          {isSubmitting 
            ? (isEditing ? 'Updating...' : 'Creating...') 
            : (isEditing ? 'Update Goal' : 'Create Goal')}
        </button>
      </div>
    </form>
  );
}