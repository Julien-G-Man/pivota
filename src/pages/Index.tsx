
import { useState } from 'react';
import { Send, Banknote, BellRing, Headset, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import BottomNavigation from '@/components/layout/BottomNavigation';
import QuickActions from '@/components/home/QuickActions';
import RecentTransactions from '@/components/transactions/RecentTransactions';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { TransferDialog } from '@/components/transfer/TransferDialog';
import { AddMoneyDialog } from '@/components/transfer/AddMoneyDialog';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

const Index = () => {
  const { toast } = useToast();
  const [balance] = useState(1250000);
  const [currency] = useState('XAF');
  const [userName] = useState('Julien');
  const [showBalance, setShowBalance] = useState(true);
  
  const formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'narrowSymbol',
  });

  const handleSupportClick = () => {
    toast({
      title: "AI Support",
      description: "Chat with our AI agent coming soon!",
    });
  };

  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have no new notifications",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container max-w-md mx-auto p-4">
        {/* Header with user info */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/profile" className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-primary/20">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-muted-foreground">Hello,</p>
              <h2 className="font-semibold text-foreground">{userName}</h2>
            </div>
          </Link>
          
          <div className="flex items-center gap-4">
            <button
              onClick={handleNotificationClick}
              className="p-2 rounded-full hover:bg-muted/80 transition-colors"
            >
              <BellRing size={20} className="text-muted-foreground" />
            </button>
            <button
              onClick={handleSupportClick}
              className="p-2 rounded-full hover:bg-muted/80 transition-colors"
            >
              <Headset size={20} className="text-muted-foreground" />
            </button>
          </div>
        </div>
        
        {/* Main balance card with iOS-like gradient */}
        <Card className="mt-4 overflow-hidden border-none shadow-xl rounded-3xl">
          <div className="bg-gradient-to-br from-primary to-primary/70 text-white p-6">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Banknote size={20} className="text-white/80" />
                <span className="text-sm font-medium text-white/90">Available Balance</span>
              </div>
              <button 
                onClick={() => setShowBalance(!showBalance)} 
                className="text-white/70 hover:text-white transition-colors"
              >
                {showBalance ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            <div className="text-4xl font-bold text-white mb-4 transition-all duration-300">
              {showBalance ? formatter.format(balance) : '••••••'}
            </div>
            
            <div className="flex gap-3">
              <TransferDialog />
              <AddMoneyDialog />
            </div>
          </div>
          
          <div className="flex items-center justify-between px-6 py-3 bg-secondary/10 border-b">
            <h3 className="font-medium">Transaction History</h3>
            <Button variant="ghost" size="sm" className="text-xs font-medium flex items-center">
              View All <ArrowRight size={14} className="ml-1" />
            </Button>
          </div>
          
          <CardContent className="p-0">
            <RecentTransactions compact={true} />
          </CardContent>
        </Card>
        
        {/* Quick actions section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4 px-2">Quick Actions</h2>
          <QuickActions />
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Index;
