
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import TransactionItem, { TransactionType } from './TransactionItem';

// Mock transaction data
const mockTransactions = [
  {
    id: '1',
    type: 'send' as TransactionType,
    title: 'John Doe',
    subtitle: 'Transfer',
    amount: 50,
    currency: 'XAF',
    date: new Date(2023, 3, 20, 14, 30),
    status: 'completed' as const,
  },
  {
    id: '2',
    type: 'receive' as TransactionType,
    title: 'Sarah Smith',
    subtitle: 'Payment',
    amount: 120,
    currency: 'XAF',
    date: new Date(2023, 3, 19, 10, 15),
    status: 'completed' as const,
  },
  {
    id: '3',
    type: 'bill' as TransactionType,
    title: 'Electricity Bill',
    subtitle: 'Utility Payment',
    amount: 45,
    currency: 'XAF',
    date: new Date(2023, 3, 18, 9, 0),
    status: 'completed' as const,
  },
];

interface RecentTransactionsProps {
  compact?: boolean;
}

export default function RecentTransactions({ compact = false }: RecentTransactionsProps) {
  const [filter, setFilter] = useState<string>('all');
  
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'send', label: 'Sent' },
    { id: 'receive', label: 'Received' },
    { id: 'bill', label: 'Bills' },
  ];
  
  const filteredTransactions = filter === 'all' 
    ? mockTransactions
    : mockTransactions.filter(t => t.type === filter);
  
  const displayTransactions = compact 
    ? filteredTransactions.slice(0, 2) 
    : filteredTransactions;
  
  return (
    <div>
      {!compact && (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Transactions</h2>
            <Button variant="ghost" size="sm" className="text-xs">
              See All
            </Button>
          </div>
          
          <div className="flex gap-2 mb-4 overflow-x-auto py-2 scrollbar-none">
            {filters.map((item) => (
              <Button
                key={item.id}
                size="sm"
                variant={filter === item.id ? "default" : "outline"}
                onClick={() => setFilter(item.id)}
                className="rounded-full text-xs px-4"
              >
                {item.label}
              </Button>
            ))}
          </div>
        </>
      )}
      
      <div className="space-y-0">
        {displayTransactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            {...transaction}
            compact={compact}
          />
        ))}
      </div>
    </div>
  );
}
