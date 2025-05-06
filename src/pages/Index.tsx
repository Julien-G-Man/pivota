
import { useState } from 'react';
import { Bell, Headset, Eye, EyeOff, ArrowRight, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import BottomNavigation from '@/components/layout/BottomNavigation';
import QuickActions from '@/components/home/QuickActions';
import RecentTransactions from '@/components/transactions/RecentTransactions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { AddMoneyDialog } from '@/components/transfer/AddMoneyDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const { toast } = useToast();
  const [balance] = useState(3.37);
  const [currency] = useState('₦');
  const [userName] = useState('Julien Gman');
  const [showBalance, setShowBalance] = useState(true);
  
  const formatter = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const handleSupportClick = () => {
    toast({
      title: "Help",
      description: "Chat with our support team coming soon!",
    });
  };

  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have 2 new notifications",
    });
  };

  const handleQrCodeClick = () => {
    toast({
      title: "QR Code",
      description: "Scan QR code feature coming soon!",
    });
  };

  const handleSecurityClick = () => {
    toast({
      title: "Security Center",
      description: "Security features coming soon!",
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
              <AvatarFallback>JG</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold text-foreground">Hi, {userName}</h2>
            </div>
          </Link>
          
          <div className="flex items-center gap-4">
            <button
              onClick={handleSupportClick}
              className="p-2 rounded-full hover:bg-muted/80 transition-colors relative"
            >
              <Headset size={20} className="text-muted-foreground" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-full">HELP</span>
            </button>
            <button
              onClick={handleQrCodeClick}
              className="p-2 rounded-full hover:bg-muted/80 transition-colors"
            >
              <span className="border-2 border-muted-foreground w-5 h-5 flex items-center justify-center rounded-sm">
                <span className="sr-only">QR Code</span>
              </span>
            </button>
            <button
              onClick={handleNotificationClick}
              className="p-2 rounded-full hover:bg-muted/80 transition-colors relative"
            >
              <Bell size={20} className="text-muted-foreground" />
              <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">2</span>
            </button>
          </div>
        </div>
        
        {/* Main balance card with blue gradient */}
        <Card className="mt-4 overflow-hidden border-none shadow-lg rounded-xl">
          <div className="bg-gradient-to-br from-primary to-primary/70 text-white p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Shield size={20} className="text-white/80" />
                <span className="text-sm font-medium text-white/90">Available Balance</span>
                <button 
                  onClick={() => setShowBalance(!showBalance)} 
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {showBalance ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              
              <div className="flex items-center">
                <span className="text-sm whitespace-nowrap">Transaction History</span>
                <ArrowRight size={16} className="ml-1" />
              </div>
            </div>
            
            <div className="text-4xl font-bold text-white mt-2 mb-4 transition-all duration-300">
              {showBalance ? `${currency}${formatter.format(balance)}` : '••••••'}
            </div>
            
            <div className="flex justify-end">
              <AddMoneyDialog className="bg-white text-primary rounded-full px-5 py-2 font-medium shadow-md hover:bg-white/90 transition-colors">
                + Add Money
              </AddMoneyDialog>
            </div>
          </div>
        </Card>
        
        {/* Recent Transactions */}
        <div className="mt-4">
          <RecentTransactions compact={true} />
        </div>
        
        {/* Quick Actions */}
        <QuickActions />
        
        {/* Promotion Banner */}
        <div className="mt-4 bg-background rounded-xl p-4 shadow-sm border border-muted flex items-center">
          <div className="h-12 w-12 rounded-full bg-black flex-shrink-0 mr-3 overflow-hidden">
            <img 
              src="/lovable-uploads/4e1ce3d6-16e7-4833-8039-40fdcae7ce29.png" 
              alt="Promotion" 
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-sm">Be the Next big winner now!</h3>
            <p className="text-xs text-muted-foreground">Big wins are happening daily on Pivota, join now and find out!</p>
          </div>
          <Button 
            onClick={() => toast({ title: "Promotion", description: "Promotion details coming soon!" })}
            className="bg-primary text-white rounded-full px-3 py-1 text-xs"
          >
            Click for Security
          </Button>
        </div>
        
        {/* Security Shield */}
        <div className="fixed bottom-24 right-4">
          <button
            onClick={handleSecurityClick}
            className="h-14 w-14 rounded-full bg-primary flex items-center justify-center shadow-lg"
          >
            <Shield size={24} className="text-white" />
          </button>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Index;
