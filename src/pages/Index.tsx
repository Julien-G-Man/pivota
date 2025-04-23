
import { useState } from 'react';
import BottomNavigation from '@/components/layout/BottomNavigation';
import PivotaHeader from '@/components/common/PivotaHeader';
import Balance from '@/components/home/Balance';
import QuickActions from '@/components/home/QuickActions';
import RecentTransactions from '@/components/transactions/RecentTransactions';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  // In a real app, these would come from an API
  const [balance] = useState(1250000);
  const [currency] = useState('XAF');

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container max-w-md mx-auto p-4">
        <PivotaHeader title="Pivota" />
        
        <Card className="mt-4 overflow-hidden">
          <div className="bg-gradient-to-br from-pivota-purple to-pivota-purple-dark p-6 text-white">
            <Balance balance={balance} currency={currency} className="text-white" />
            
            <div className="flex mt-6 gap-4">
              <button className="flex-1 py-2 px-4 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors text-sm font-medium">
                Add Money
              </button>
              <button className="flex-1 py-2 px-4 rounded-lg bg-white text-pivota-purple hover:bg-white/90 transition-colors text-sm font-medium">
                Transfer
              </button>
            </div>
          </div>
          
          <CardContent className="p-6">
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
