'use client';

import { useState } from 'react';
import { useTransactions } from '@/hooks/useTransactions';
import TransactionList from '@/components/transactions/TransactionList';
import TransactionFilters from '@/components/transactions/TransactionFilters';

export default function TransactionsPage() {
  const { 
    filteredTransactions, 
    isLoading, 
    error, 
    filters, 
    setFilters 
  } = useTransactions();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Transactions</h1>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors">
          Add Transaction
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="bg-white shadow rounded-lg p-4">
        <TransactionFilters filters={filters} setFilters={setFilters} />
        <TransactionList 
          transactions={filteredTransactions} 
          isLoading={isLoading} 
        />
      </div>
    </div>
  );
}