import React from 'react';
import { Goal } from '@/types/goal';

interface GoalCardProps {
  goal: Goal;
}

// Helper function to get the appropriate color class based on priority
function getPriorityClass(priority: string): string {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

// Helper function to get the appropriate color class based on status
function getStatusClass(status: string): string {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'behind':
      return 'bg-red-100 text-red-800';
    case 'ahead':
      return 'bg-blue-100 text-blue-800';
    case 'paused':
      return 'bg-gray-100 text-gray-800';
    case 'active':
    default:
      return 'bg-green-100 text-green-800';
  }
}

// The candidate should implement this component
export default function GoalCard({ goal }: GoalCardProps) {
  const progress = (goal.currentAmount / goal.targetAmount) * 100;
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-lg">{goal.name}</h3>
        <span className={`px-2 py-1 text-xs rounded ${getPriorityClass(goal.priority)}`}>
          {goal.priority}
        </span>
      </div>
      
      <div className="mt-2">
        <p className="text-sm text-gray-600">
          Target: ₱{goal.targetAmount.toLocaleString()}
        </p>
        <p className="text-sm text-gray-600">
          Current: ₱{goal.currentAmount.toLocaleString()}
        </p>
      </div>
      
      <div className="mt-3">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-xs text-right mt-1 text-gray-600">
          {progress.toFixed(0)}% complete
        </p>
      </div>
      
      <div className="mt-3 flex justify-between items-center">
        <span className={`px-2 py-1 text-xs rounded ${getStatusClass(goal.status)}`}>
          {goal.status}
        </span>
        <span className="text-xs text-gray-500">
          Due: {new Date(goal.targetDate).toLocaleDateString()}
        </span>
      </div>
      
      {/* The candidate should implement goal actions here */}
    </div>
  );
}