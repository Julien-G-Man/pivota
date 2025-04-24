
import { useState } from 'react';
import { Send, Banknote, BellRing, Headset } from 'lucide-react';
import { Link } from 'react-router-dom';
import BottomNavigation from '@/components/layout/BottomNavigation';
import Balance from '@/components/home/Balance';
import QuickActions from '@/components/home/QuickActions';
import RecentTransactions from '@/components/transactions/RecentTransactions';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  // In a real app, these would come from an API
  const [balance] = useState(1250000);
  const [currency] = useState('XAF');
  const [userName] = useState('John');

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
        
        <Card className="mt-4 overflow-hidden border-none shadow-lg">
          <div className="bg-primary text-white p-6">
            <Balance 
              balance={balance} 
              currency={currency} 
              className="text-white" 
            />
            
            <div className="grid grid-cols-2 gap-3 mt-6">
              <button className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                <Send size={18} />
                <span className="text-sm font-medium">Transfer</span>
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                <Banknote size={18} />
                <span className="text-sm font-medium">Add Money</span>
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
