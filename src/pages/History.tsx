
import { useState } from 'react';
import { Calendar, Download } from 'lucide-react';
import BottomNavigation from '@/components/layout/BottomNavigation';
import PivotaHeader from '@/components/common/PivotaHeader';
import { Button } from '@/components/ui/button';
import TransactionItem, { TransactionType } from '@/components/transactions/TransactionItem';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';

// Mock transaction data for history
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
  {
    id: '4',
    type: 'airtime' as TransactionType,
    title: 'Airtime Recharge',
    subtitle: 'Mobile',
    amount: 15,
    currency: 'XAF',
    date: new Date(2023, 3, 17, 16, 45),
    status: 'pending' as const,
  },
  {
    id: '5',
    type: 'send' as TransactionType,
    title: 'Mike Johnson',
    subtitle: 'Transfer',
    amount: 75,
    currency: 'XAF',
    date: new Date(2023, 3, 16, 11, 20),
    status: 'failed' as const,
  },
  {
    id: '6',
    type: 'bill' as TransactionType,
    title: 'Water Bill',
    subtitle: 'Utility Payment',
    amount: 30,
    currency: 'XAF',
    date: new Date(2023, 3, 15, 8, 45),
    status: 'completed' as const,
  },
];

const History = () => {
  const { toast } = useToast();
  const [filter, setFilter] = useState<string>('all');
  const [period, setPeriod] = useState('this-month');
  
  const handleExport = () => {
    toast({
      title: "Export Transactions",
      description: "Your transactions will be exported as CSV.",
    });
  };

  // Filter transactions based on type and period
  const filteredTransactions = mockTransactions.filter(transaction => {
    // Filter by type
    const typeMatch = filter === 'all' || transaction.type === filter;
    
    // Get transactions for the selected period
    const today = new Date();
    let startDate = new Date();
    
    if (period === 'this-month') {
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    } else if (period === 'last-month') {
      startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    } else if (period === 'last-3-months') {
      startDate = new Date(today.getFullYear(), today.getMonth() - 3, 1);
    }
    
    const dateMatch = transaction.date >= startDate;
    
    return typeMatch && dateMatch;
  });
  
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container max-w-md mx-auto p-4">
        <PivotaHeader title="Transaction History" />
        
        <div className="flex justify-between items-center mb-6">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <SelectValue placeholder="Period" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="last-3-months">Last 3 Months</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download size={16} className="mr-2" /> Export
          </Button>
        </div>
        
        <div className="flex gap-2 mb-4 overflow-x-auto py-2 scrollbar-none">
          {['all', 'send', 'receive', 'bill', 'airtime'].map((item) => (
            <Button
              key={item}
              size="sm"
              variant={filter === item ? "default" : "outline"}
              onClick={() => setFilter(item)}
              className="rounded-full text-xs px-4 whitespace-nowrap"
            >
              {item === 'all' ? 'All' : 
               item === 'send' ? 'Sent' :
               item === 'receive' ? 'Received' :
               item === 'bill' ? 'Bills' : 'Airtime'}
            </Button>
          ))}
        </div>
        
        <Card>
          {filteredTransactions.length > 0 ? (
            <div className="divide-y">
              {filteredTransactions.map((transaction) => (
                <TransactionItem key={transaction.id} {...transaction} />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">No transactions found</p>
            </div>
          )}
        </Card>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default History;
