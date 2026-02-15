export type Invoice = {
  id: number;
  invoice_number: string;
  client: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  issue_date: string;
  due_date: string;
  paid_date: string | null;
};

export type Expense = {
  id: number;
  category: string;
  description: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending';
};

export type Transaction = {
  id: number;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
};

export type AccountSummary = {
  id: number;
  name: string;
  type: 'checking' | 'savings' | 'credit';
  balance: number;
  currency: string;
};
