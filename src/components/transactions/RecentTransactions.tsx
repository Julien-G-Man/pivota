
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import TransactionItem, { TransactionType } from './TransactionItem';

// Mock transaction data to match the image
const mockTransactions = [
  {
    id: '1',
    type: 'send' as TransactionType,
    title: 'Transfer to FAITH TADALA LIKUPE',
    subtitle: 'Transfer',
    amount: 400.00,
    currency: '₦',
    date: new Date(2023, 3, 28, 11, 11, 10),
    status: 'completed' as const,
  },
  {
    id: '2',
    type: 'receive' as TransactionType,
    title: 'OWealth Deposit(from Spend & Save)',
    subtitle: 'Deposit',
    amount: 250.63,
    currency: '₦',
    date: new Date(2023, 3, 28, 11, 7, 13),
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
    <div className="bg-background rounded-xl shadow-sm">
      {!compact && (
        <>
          <div className="flex justify-between items-center p-4">
            <h2 className="text-lg font-semibold">Recent Transactions</h2>
            <Button variant="ghost" size="sm" className="text-xs">
              See All
            </Button>
          </div>
          
          <div className="flex gap-2 mb-4 overflow-x-auto py-2 px-4 scrollbar-none">
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
