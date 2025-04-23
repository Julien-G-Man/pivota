
import { useState } from 'react';
import { Send, Banknote, Wallet } from 'lucide-react';
import BottomNavigation from '@/components/layout/BottomNavigation';
import PivotaHeader from '@/components/common/PivotaHeader';
import Balance from '@/components/home/Balance';
import QuickActions from '@/components/home/QuickActions';
import RecentTransactions from '@/components/transactions/RecentTransactions';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Index = () => {
  // In a real app, these would come from an API
  const [balance] = useState(1250000);
  const [currency] = useState('XAF');
  const [userName] = useState('John');

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container max-w-md mx-auto p-4">
        <div className="flex items-center gap-3 mb-6">
          <Avatar className="h-10 w-10 border border-primary/20">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm text-muted-foreground">Hello,</p>
            <h2 className="font-semibold text-foreground">{userName}</h2>
          </div>
        </div>
        
        <Card className="mt-4 overflow-hidden border-none shadow-lg">
          <div className="bg-primary text-white p-6">
            <Balance 
              balance={balance} 
              currency={currency} 
              className="text-white" 
            />
            
            <div className="grid grid-cols-3 gap-2 mt-6">
              <button className="flex flex-col items-center p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                <Send size={20} className="mb-1" />
                <span className="text-xs font-medium">Transfer</span>
              </button>
              <button className="flex flex-col items-center p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                <Banknote size={20} className="mb-1" />
                <span className="text-xs font-medium">Add/Withdraw</span>
              </button>
              <button className="flex flex-col items-center p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                <Wallet size={20} className="mb-1" />
                <span className="text-xs font-medium">Invest</span>
              </button>
            </div>
          </div>
          
          <CardContent className="p-6 bg-secondary/20">
            <QuickActions />
            <RecentTransactions />
          </CardContent>
        </Card>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Index;
