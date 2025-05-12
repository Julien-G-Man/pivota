
import { useState, useEffect } from 'react';
import { Bell, Headset, QrCode, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import BottomNavigation from '@/components/layout/BottomNavigation';
import QuickActions from '@/components/home/QuickActions';
import RecentTransactions from '@/components/transactions/RecentTransactions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { AddMoneyDialog } from '@/components/transfer/AddMoneyDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Balance from '@/components/home/Balance';
import { PivieAssistant } from '@/components/ai/PivieAssistant';

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [balance] = useState(15000000.00);
  const [currency] = useState('FCFA');
  const [userName, setUserName] = useState('Julien Gman');
  const [profilePicture, setProfilePicture] = useState('https://api.dicebear.com/7.x/avataaars/svg?seed=John');
  const [showBalance, setShowBalance] = useState(true);
  const [showAssistant, setShowAssistant] = useState(false);
  
  // Get user profile from localStorage on component mount and when it changes
  useEffect(() => {
    const getUserProfile = () => {
      const storedProfile = localStorage.getItem("userProfile");
      if (storedProfile) {
        const profile = JSON.parse(storedProfile);
        if (profile.firstName && profile.lastName) {
          setUserName(`${profile.firstName} ${profile.lastName}`);
        }
        if (profile.profilePicture) {
          setProfilePicture(profile.profilePicture);
        }
      }
    };
    
    getUserProfile();
    
    // Add event listener for storage changes
    const handleStorageChange = (event) => {
      if (event.key === "userProfile") {
        getUserProfile();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event listener for profile updates
    const handleProfileUpdate = () => {
      getUserProfile();
    };
    
    window.addEventListener('profileUpdated', handleProfileUpdate);
    
    // Show AI assistant tip after a delay for new users
    const hasSeenAssistant = localStorage.getItem("hasSeenAssistant");
    if (!hasSeenAssistant) {
      setTimeout(() => {
        setShowAssistant(true);
        localStorage.setItem("hasSeenAssistant", "true");
      }, 3000);
    }
    
    // Check for profile updates every few seconds to ensure consistency
    const profileCheckInterval = setInterval(() => {
      getUserProfile();
    }, 3000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('profileUpdated', handleProfileUpdate);
      clearInterval(profileCheckInterval);
    };
  }, []);

  const handleSupportClick = () => {
    navigate('/support');
  };

  const handleNotificationClick = () => {
    navigate('/profile/notifications');
  };

  const handleQrCodeClick = () => {
    toast({
      title: "QR Code",
      description: "Scan QR code feature coming soon!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-background pb-20">
      <div className="container max-w-md mx-auto p-4">
        {/* Header with user info */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/profile" className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-primary/20">
              <AvatarImage src={profilePicture} />
              <AvatarFallback>{userName?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold text-foreground">Hi, {userName?.split(' ')[0]}</h2>
            </div>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link 
              to="/support"
              className="p-2 rounded-full hover:bg-muted/80 transition-colors relative"
            >
              <Headset size={20} className="text-muted-foreground" />
            </Link>
            <button
              onClick={handleQrCodeClick}
              className="p-2 rounded-full hover:bg-muted/80 transition-colors"
            >
              <QrCode size={20} className="text-muted-foreground" />
              <span className="sr-only">QR Code</span>
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
          <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white p-4">
            <Balance balance={balance} currency={currency} />
            
            <div className="flex justify-end mt-4">
              <AddMoneyDialog>
                <Button className="bg-white text-blue-700 rounded-full px-5 py-2 font-medium shadow-md hover:bg-white/90 transition-colors">
                  + Add Money
                </Button>
              </AddMoneyDialog>
            </div>
          </div>
        </Card>
        
        {/* Spending Insights */}
        <Card className="mt-4 p-4 border-none shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-sm">Monthly Spending Insights</h3>
            <Button variant="ghost" size="sm" className="text-xs p-0 h-auto" onClick={() => navigate('/finance')}>
              View Details
              <ArrowRight size={12} className="ml-1" />
            </Button>
          </div>
          <div className="flex items-center space-x-1">
            <div className="h-4 bg-blue-600 rounded-l-full" style={{ width: '35%' }}></div>
            <div className="h-4 bg-green-500" style={{ width: '25%' }}></div>
            <div className="h-4 bg-yellow-500" style={{ width: '15%' }}></div>
            <div className="h-4 bg-red-500" style={{ width: '15%' }}></div>
            <div className="h-4 bg-purple-500 rounded-r-full" style={{ width: '10%' }}></div>
          </div>
          <div className="flex text-xs mt-2 text-muted-foreground justify-between">
            <span>Food 35%</span>
            <span>Transport 25%</span>
            <span>Utilities 15%</span>
          </div>
        </Card>
        
        {/* Recent Transactions */}
        <div className="mt-4">
          <RecentTransactions compact={true} />
        </div>
        
        {/* Quick Actions */}
        <QuickActions />
        
        {/* Promotion Banner */}
        <div className="mt-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 shadow-sm border border-blue-200 flex items-center">
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
            className="bg-blue-700 text-white rounded-full px-3 py-1 text-xs"
          >
            Learn More
          </Button>
        </div>
      </div>
      
      {/* Floating AI Assistant */}
      <PivieAssistant 
        isOpen={showAssistant}
        onClose={() => setShowAssistant(false)}
        initialMessage="Hi there! I'm Pivie, your Pivota financial assistant. Need help managing your money better? I notice your food spending is up 5% this month."
        context="finance"
      />
      
      <BottomNavigation />
    </div>
  );
};

export default Index;
