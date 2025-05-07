
import { Fingerprint, Shield, Bell, User, CreditCard, Lock, Settings, MessageCircle, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@/components/layout/BottomNavigation';
import PivotaHeader from '@/components/common/PivotaHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const profileMenuItems = [
    {
      icon: User,
      title: 'Personal Information',
      description: 'Manage your personal details',
      onClick: () => navigate("/profile/personal-info"),
    },
    {
      icon: CreditCard,
      title: 'Payment Methods',
      description: 'Manage your payment options',
      onClick: () => navigate("/wallet"),
    },
    {
      icon: Fingerprint,
      title: 'Security & Privacy',
      description: 'Protect your account',
      onClick: () => navigate("/profile/security"),
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Manage your alerts',
      onClick: () => navigate("/profile/notifications"),
    },
    {
      icon: MessageCircle,
      title: 'Help & Support',
      description: 'Get assistance with the app',
      onClick: () => navigate("/support"),
    },
    {
      icon: Settings,
      title: 'App Settings',
      description: 'Customize your experience',
      onClick: () => navigate("/profile/settings"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background pb-20">
      <div className="container max-w-md mx-auto p-4">
        <PivotaHeader title="Profile" showIcons={false} />
        
        <Card className="mb-6 overflow-hidden border-none shadow-lg">
          <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 p-6">
            <div className="flex items-center">
              <Avatar className="h-16 w-16 border-2 border-white">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
                <AvatarFallback>JG</AvatarFallback>
              </Avatar>
              <div className="ml-4 text-white">
                <h2 className="font-bold text-lg">Julien Glory Manana</h2>
                <p className="text-white/80 text-sm">+237 612 345 678</p>
              </div>
            </div>
          </div>
          <CardContent className="p-4 bg-gradient-to-b from-white to-gray-50">
            <div className="flex justify-between py-3">
              <div className="flex items-center">
                <Shield className="mr-2 text-blue-600" size={18} />
                <span className="text-sm font-medium">Biometric Login</span>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex justify-between py-3">
              <div className="flex items-center">
                <Lock className="mr-2 text-blue-600" size={18} />
                <span className="text-sm font-medium">App Lock</span>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-4">
          {profileMenuItems.map((item) => (
            <button
              key={item.title}
              onClick={item.onClick}
              className="w-full text-left"
            >
              <Card className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-colors">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 mr-3">
                      <item.icon size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </CardContent>
              </Card>
            </button>
          ))}
        </div>
        
        <Button 
          variant="outline" 
          className="w-full mt-6 text-red-500 hover:text-red-600 hover:bg-red-50 border border-red-200"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Profile;
