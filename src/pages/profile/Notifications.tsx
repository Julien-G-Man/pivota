
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, BellOff, Smartphone, CreditCard, ShieldAlert, DollarSign, MessageSquare, Star } from 'lucide-react';

import PivotaHeader from '@/components/common/PivotaHeader';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

const Notifications = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // Default notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    pushNotifications: {
      allPush: true,
      transactions: true,
      accountActivity: true,
      security: true,
      promotions: false,
      appUpdates: true
    },
    emailNotifications: {
      allEmail: true,
      transactions: true,
      accountActivity: true,
      security: true,
      promotions: true,
      statements: true
    },
    smsNotifications: {
      allSms: false,
      transactions: false,
      accountActivity: false,
      security: true,
      promotions: false
    }
  });

  const handleTogglePush = (setting: keyof typeof notificationSettings.pushNotifications, value: boolean) => {
    // Special case for the "all" toggle
    if (setting === 'allPush') {
      setNotificationSettings(prev => ({
        ...prev,
        pushNotifications: {
          allPush: value,
          transactions: value,
          accountActivity: value,
          security: value,
          promotions: value,
          appUpdates: value
        }
      }));
      
      toast({
        title: value ? "Push Notifications Enabled" : "Push Notifications Disabled",
        description: value ? "You'll now receive all push notifications." : "You won't receive any push notifications.",
      });
      return;
    }
    
    setNotificationSettings(prev => ({
      ...prev,
      pushNotifications: {
        ...prev.pushNotifications,
        [setting]: value,
        // Update the "all" toggle if needed
        allPush: value ? prev.pushNotifications.allPush : false
      }
    }));
    
    toast({
      title: `Notification Setting Updated`,
      description: `${setting.charAt(0).toUpperCase() + setting.slice(1)} notifications ${value ? 'enabled' : 'disabled'}.`,
    });
  };
  
  const handleToggleEmail = (setting: keyof typeof notificationSettings.emailNotifications, value: boolean) => {
    if (setting === 'allEmail') {
      setNotificationSettings(prev => ({
        ...prev,
        emailNotifications: {
          allEmail: value,
          transactions: value,
          accountActivity: value,
          security: value,
          promotions: value,
          statements: value
        }
      }));
      
      toast({
        title: value ? "Email Notifications Enabled" : "Email Notifications Disabled",
        description: value ? "You'll now receive all email notifications." : "You won't receive any email notifications.",
      });
      return;
    }
    
    setNotificationSettings(prev => ({
      ...prev,
      emailNotifications: {
        ...prev.emailNotifications,
        [setting]: value,
        allEmail: value ? prev.emailNotifications.allEmail : false
      }
    }));
    
    toast({
      title: `Notification Setting Updated`,
      description: `${setting.charAt(0).toUpperCase() + setting.slice(1)} email notifications ${value ? 'enabled' : 'disabled'}.`,
    });
  };
  
  const handleToggleSms = (setting: keyof typeof notificationSettings.smsNotifications, value: boolean) => {
    if (setting === 'allSms') {
      setNotificationSettings(prev => ({
        ...prev,
        smsNotifications: {
          allSms: value,
          transactions: value,
          accountActivity: value,
          security: value,
          promotions: value
        }
      }));
      
      toast({
        title: value ? "SMS Notifications Enabled" : "SMS Notifications Disabled",
        description: value ? "You'll now receive all SMS notifications." : "You won't receive any SMS notifications.",
      });
      return;
    }
    
    setNotificationSettings(prev => ({
      ...prev,
      smsNotifications: {
        ...prev.smsNotifications,
        [setting]: value,
        allSms: value ? prev.smsNotifications.allSms : false
      }
    }));
    
    toast({
      title: `Notification Setting Updated`,
      description: `${setting.charAt(0).toUpperCase() + setting.slice(1)} SMS notifications ${value ? 'enabled' : 'disabled'}.`,
    });
  };
  
  const handleClearAll = () => {
    toast({
      title: "Notifications Cleared",
      description: "All notifications have been cleared.",
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background pb-20">
      <div className="container max-w-md mx-auto p-4">
        <PivotaHeader 
          title="Notifications" 
          showBackButton={true} 
          onBackClick={() => navigate("/profile")}
        />
        
        {/* Notifications Header */}
        <Card className="mb-6 overflow-hidden border-none shadow-md">
          <CardContent className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-white/20 mr-4">
                <Bell className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Notification Center</h2>
                <p className="text-white/80 text-sm">Manage how you receive alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="settings" className="mb-6">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="recent">Recent (3)</TabsTrigger>
          </TabsList>
          
          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            {/* Push Notifications */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-blue-100 mr-3">
                      <Smartphone size={18} className="text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold">Push Notifications</h3>
                  </div>
                  <Switch 
                    checked={notificationSettings.pushNotifications.allPush}
                    onCheckedChange={(checked) => handleTogglePush('allPush', checked)}
                  />
                </div>
                
                <div className="space-y-3 pl-9">
                  <div className="flex justify-between items-center">
                    <p className="text-sm">Transactions</p>
                    <Switch 
                      checked={notificationSettings.pushNotifications.transactions}
                      onCheckedChange={(checked) => handleTogglePush('transactions', checked)}
                      disabled={!notificationSettings.pushNotifications.allPush}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-sm">Account Activity</p>
                    <Switch 
                      checked={notificationSettings.pushNotifications.accountActivity}
                      onCheckedChange={(checked) => handleTogglePush('accountActivity', checked)}
                      disabled={!notificationSettings.pushNotifications.allPush}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-sm">Security Alerts</p>
                    <Switch 
                      checked={notificationSettings.pushNotifications.security}
                      onCheckedChange={(checked) => handleTogglePush('security', checked)}
                      disabled={!notificationSettings.pushNotifications.allPush}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-sm">Promotions & Offers</p>
                    <Switch 
                      checked={notificationSettings.pushNotifications.promotions}
                      onCheckedChange={(checked) => handleTogglePush('promotions', checked)}
                      disabled={!notificationSettings.pushNotifications.allPush}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-sm">App Updates</p>
                    <Switch 
                      checked={notificationSettings.pushNotifications.appUpdates}
                      onCheckedChange={(checked) => handleTogglePush('appUpdates', checked)}
                      disabled={!notificationSettings.pushNotifications.allPush}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Email Notifications */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-blue-100 mr-3">
                      <MessageSquare size={18} className="text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold">Email Notifications</h3>
                  </div>
                  <Switch 
                    checked={notificationSettings.emailNotifications.allEmail}
                    onCheckedChange={(checked) => handleToggleEmail('allEmail', checked)}
                  />
                </div>
                
                <div className="space-y-3 pl-9">
                  <div className="flex justify-between items-center">
                    <p className="text-sm">Transactions</p>
                    <Switch 
                      checked={notificationSettings.emailNotifications.transactions}
                      onCheckedChange={(checked) => handleToggleEmail('transactions', checked)}
                      disabled={!notificationSettings.emailNotifications.allEmail}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-sm">Account Activity</p>
                    <Switch 
                      checked={notificationSettings.emailNotifications.accountActivity}
                      onCheckedChange={(checked) => handleToggleEmail('accountActivity', checked)}
                      disabled={!notificationSettings.emailNotifications.allEmail}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-sm">Security Alerts</p>
                    <Switch 
                      checked={notificationSettings.emailNotifications.security}
                      onCheckedChange={(checked) => handleToggleEmail('security', checked)}
                      disabled={!notificationSettings.emailNotifications.allEmail}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-sm">Promotions & Offers</p>
                    <Switch 
                      checked={notificationSettings.emailNotifications.promotions}
                      onCheckedChange={(checked) => handleToggleEmail('promotions', checked)}
                      disabled={!notificationSettings.emailNotifications.allEmail}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-sm">Monthly Statements</p>
                    <Switch 
                      checked={notificationSettings.emailNotifications.statements}
                      onCheckedChange={(checked) => handleToggleEmail('statements', checked)}
                      disabled={!notificationSettings.emailNotifications.allEmail}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* SMS Notifications */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-blue-100 mr-3">
                      <Smartphone size={18} className="text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold">SMS Notifications</h3>
                  </div>
                  <Switch 
                    checked={notificationSettings.smsNotifications.allSms}
                    onCheckedChange={(checked) => handleToggleSms('allSms', checked)}
                  />
                </div>
                
                <div className="space-y-3 pl-9">
                  <div className="flex justify-between items-center">
                    <p className="text-sm">Transactions</p>
                    <Switch 
                      checked={notificationSettings.smsNotifications.transactions}
                      onCheckedChange={(checked) => handleToggleSms('transactions', checked)}
                      disabled={!notificationSettings.smsNotifications.allSms}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-sm">Account Activity</p>
                    <Switch 
                      checked={notificationSettings.smsNotifications.accountActivity}
                      onCheckedChange={(checked) => handleToggleSms('accountActivity', checked)}
                      disabled={!notificationSettings.smsNotifications.allSms}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-sm">Security Alerts</p>
                    <Switch 
                      checked={notificationSettings.smsNotifications.security}
                      onCheckedChange={(checked) => handleToggleSms('security', checked)}
                      disabled={!notificationSettings.smsNotifications.allSms}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-sm">Promotions & Offers</p>
                    <Switch 
                      checked={notificationSettings.smsNotifications.promotions}
                      onCheckedChange={(checked) => handleToggleSms('promotions', checked)}
                      disabled={!notificationSettings.smsNotifications.allSms}
                    />
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground mt-4 pl-9">
                  Standard SMS rates may apply based on your mobile carrier
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Recent Notifications Tab */}
          <TabsContent value="recent">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Recent Notifications</h3>
                  <Button variant="ghost" size="sm" onClick={handleClearAll}>
                    Clear All
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <NotificationItem
                    icon={<ShieldAlert className="text-red-500" size={18} />}
                    title="Security Alert"
                    message="New login detected on your account from Douala, Cameroon."
                    time="10 minutes ago"
                    iconBgColor="bg-red-100"
                  />
                  
                  <Separator />
                  
                  <NotificationItem
                    icon={<DollarSign className="text-green-500" size={18} />}
                    title="Transaction Complete"
                    message="You received 50,000 FCFA from John Doe."
                    time="2 hours ago"
                    iconBgColor="bg-green-100"
                  />
                  
                  <Separator />
                  
                  <NotificationItem
                    icon={<Star className="text-amber-500" size={18} />}
                    title="Special Offer"
                    message="Get 5% cashback on all transactions this weekend!"
                    time="1 day ago"
                    iconBgColor="bg-amber-100"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Do Not Disturb Settings */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-gray-100 mr-3">
                  <BellOff size={18} className="text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold">Do Not Disturb</h3>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4 pl-9">
              Set times when you don't want to receive notifications
            </p>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                toast({
                  title: "Do Not Disturb Settings",
                  description: "This feature will be available soon.",
                });
              }}
            >
              Configure Quiet Hours
            </Button>
          </CardContent>
        </Card>
        
        {/* Back Button */}
        <div className="mt-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/profile')}
            className="w-full"
          >
            Back to Profile
          </Button>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

// Helper component for displaying notification items
const NotificationItem = ({ 
  icon, 
  title, 
  message, 
  time, 
  iconBgColor 
}: { 
  icon: React.ReactNode, 
  title: string, 
  message: string, 
  time: string,
  iconBgColor: string
}) => (
  <div className="flex items-start">
    <div className={`p-2 rounded-full ${iconBgColor} mr-3 mt-1`}>
      {icon}
    </div>
    <div className="flex-1">
      <div className="flex justify-between">
        <h4 className="font-medium">{title}</h4>
        <span className="text-xs text-muted-foreground">{time}</span>
      </div>
      <p className="text-sm">{message}</p>
    </div>
  </div>
);

export default Notifications;
