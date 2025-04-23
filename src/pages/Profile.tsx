
import { Fingerprint, Shield, Bell, User, CreditCard, Lock, Settings, MessageCircle } from 'lucide-react';
import BottomNavigation from '@/components/layout/BottomNavigation';
import PivotaHeader from '@/components/common/PivotaHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { toast } = useToast();

  const profileMenuItems = [
    {
      icon: User,
      title: 'Personal Information',
      description: 'Manage your personal details',
      onClick: () => toast({ title: 'Personal Information', description: 'Would open settings in a real app.' }),
    },
    {
      icon: CreditCard,
      title: 'Payment Methods',
      description: 'Manage your payment options',
      onClick: () => toast({ title: 'Payment Methods', description: 'Would open payment settings in a real app.' }),
    },
    {
      icon: Fingerprint,
      title: 'Security & Privacy',
      description: 'Protect your account',
      onClick: () => toast({ title: 'Security & Privacy', description: 'Would open security settings in a real app.' }),
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Manage your alerts',
      onClick: () => toast({ title: 'Notifications', description: 'Would open notification settings in a real app.' }),
    },
    {
      icon: MessageCircle,
      title: 'Help & Support',
      description: 'Get assistance with the app',
      onClick: () => toast({ title: 'Help & Support', description: 'Would open support chat in a real app.' }),
    },
    {
      icon: Settings,
      title: 'App Settings',
      description: 'Customize your experience',
      onClick: () => toast({ title: 'App Settings', description: 'Would open app settings in a real app.' }),
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container max-w-md mx-auto p-4">
        <PivotaHeader title="Profile" showIcons={false} />
        
        <Card className="mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-pivota-purple to-pivota-purple-dark p-6">
            <div className="flex items-center">
              <Avatar className="h-16 w-16 border-2 border-white">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="ml-4 text-white">
                <h2 className="font-bold text-lg">John Doe</h2>
                <p className="text-white/80 text-sm">+237 612 345 678</p>
              </div>
            </div>
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between py-3">
              <div className="flex items-center">
                <Shield className="mr-2 text-pivota-purple" size={18} />
                <span className="text-sm font-medium">Biometric Login</span>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex justify-between py-3">
              <div className="flex items-center">
                <Lock className="mr-2 text-pivota-orange" size={18} />
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
              <Card className="hover:bg-muted/50 transition-colors">
                <CardContent className="p-4 flex items-center">
                  <div className="p-3 rounded-full bg-muted mr-3">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            </button>
          ))}
        </div>
        
        <Button 
          variant="outline" 
          className="w-full mt-6 text-destructive hover:text-destructive"
          onClick={() => toast({ title: 'Logout', description: 'You would be logged out in a real app.' })}
        >
          Logout
        </Button>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Profile;
