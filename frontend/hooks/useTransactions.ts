import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Transaction, TransactionFilters, TransactionSummaryType } from '@/types/transaction';

// The candidate should implement this hook
export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<TransactionFilters>({
    types: [],
    dateRange: {
      startDate: null,
      endDate: null
    },
    search: ''
  });
  const [summary, setSummary] = useState<TransactionSummaryType>({
    income: 0,
    expenses: 0,
    balance: 0
  });
  
  // Fetch transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/transactions');
        setTransactions(response.data.data);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch transactions');
        setTransactions([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTransactions();
  }, []);
  
  // Apply filters to transactions
  useEffect(() => {
    // The candidate should implement filtering logic here
    setFilteredTransactions(transactions);
  }, [transactions, filters]);
  
  // Calculate summary data
  useEffect(() => {
    // The candidate should implement summary calculation logic here
    const calculatedSummary = {
      income: 0,
      expenses: 0,
      balance: 0
    };
    
    setSummary(calculatedSummary);
  }, [filteredTransactions]);
  
  return {
    transactions,
    filteredTransactions,
    isLoading,
    error,
    filters,
    setFilters,
    summary
  };
}