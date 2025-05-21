'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import TransactionList from '@/components/transactions/TransactionList';
import TransactionSummary from '@/components/transactions/TransactionSummary';
import TransactionFilters from '@/components/transactions/TransactionFilters';
import { useTransactions } from '@/hooks/useTransactions';

export default function DashboardPage() {
  const { 
    transactions, 
    filteredTransactions, 
    isLoading, 
    error, 
    filters,
    setFilters,
    summary
  } = useTransactions();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Financial Dashboard</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <TransactionSummary summary={summary} />
      
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