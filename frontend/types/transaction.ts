export interface Transaction {
  id: string;
  date: string;
  merchant: string;
  amount: number;
  type: 'income' | 'expense' | 'transfer';
  category: string;
  description?: string;
  status: 'completed' | 'pending' | 'failed';
  createdAt: string;
  updatedAt: string;
}

export interface TransactionFilters {
  types: ('income' | 'expense' | 'transfer')[];
  dateRange: {
    startDate: string | null;
    endDate: string | null;
  };
  search: string;
  category?: string;
}

export interface TransactionSummaryType {
  income: number;
  expenses: number;
  balance: number;
}