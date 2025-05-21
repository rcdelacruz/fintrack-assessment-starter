'use client';

import { useState } from 'react';
import { useGoals } from '@/hooks/useGoals';
import { useAllocations } from '@/hooks/useAllocations';

export default function AllocationsPage() {
  const { goals, isLoading: isLoadingGoals, error: goalsError } = useGoals();
  const { allocateFunds, isLoading: isAllocating, error: allocationError } = useAllocations();
  
  const [amount, setAmount] = useState<number>(0);
  const [strategy, setStrategy] = useState<'priority' | 'timeline' | 'balanced'>('balanced');
  const [allocations, setAllocations] = useState<any[]>([]);
  
  const handleAllocate = async () => {
    try {
      const result = await allocateFunds(amount, strategy);
      setAllocations(result.allocations);
    } catch (error) {
      // Error is handled by the hook
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Fund Allocations</h1>
      
      {(goalsError || allocationError) && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {goalsError || allocationError}
        </div>
      )}
      
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Allocate Funds</h2>
        <p className="text-gray-500 mb-6">
          Use this tool to smartly distribute funds across your financial goals based on your selected strategy.
        </p>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Amount to Allocate (₱)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            min="0"
            step="100"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Allocation Strategy
          </label>
          <select
            value={strategy}
            onChange={(e) => setStrategy(e.target.value as any)}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="priority">Priority-based</option>
            <option value="timeline">Timeline-based</option>
            <option value="balanced">Balanced</option>
          </select>
        </div>
        
        <button
          onClick={handleAllocate}
          disabled={isAllocating || isLoadingGoals || amount <= 0 || goals.length === 0}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
        >
          {isAllocating ? 'Allocating...' : 'Allocate Funds'}
        </button>
      </div>
      
      {allocations.length > 0 && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Allocation Results</h2>
          
          <p className="text-gray-500 mb-4">Allocation results component - to be implemented.</p>
          
          {/* The candidate should implement allocation results display here */}
        </div>
      )}
    </div>
  );
}