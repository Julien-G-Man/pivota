import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings as SettingsIcon, Globe, Moon, Sun, MessageSquare, Eye, Database, CreditCard, Languages, QrCode, Fingerprint, FaceRecognition } from 'lucide-react';

import PivotaHeader from '@/components/common/PivotaHeader';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Settings = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // App settings
  const [language, setLanguage] = useState('english');
  const [currency, setCurrency] = useState('fcfa');
  const [theme, setTheme] = useState('system');
  const [autoLockTime, setAutoLockTime] = useState('5m');
  
  // Display settings
  const [showBalance, setShowBalance] = useState(true);
  const [showTransactions, setShowTransactions] = useState(true);
  const [showCreditScore, setShowCreditScore] = useState(true);
  
  // Data usage settings
  const [saveData, setSaveData] = useState(false);
  const [autoDownload, setAutoDownload] = useState(true);
  const [analytics, setAnalytics] = useState(true);
  
  // Payment settings
  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState('wallet');
  const [oneClickPayment, setOneClickPayment] = useState(false);
  const [askForPin, setAskForPin] = useState(true);
  const [qrCodePayment, setQrCodePayment] = useState(true);
  
  // Authentication settings
  const [fingerprintAuth, setFingerprintAuth] = useState(true);
  const [faceRecognitionAuth, setFaceRecognitionAuth] = useState(false);
  
  // Currency options
  const currencyOptions = [
    { value: 'fcfa', label: 'FCFA (CFA Franc)' },
    { value: 'usd', label: 'USD (US Dollar)' },
    { value: 'eur', label: 'EUR (Euro)' },
    { value: 'ngn', label: 'NGN (Nigerian Naira)' },
    { value: 'ghs', label: 'GHS (Ghanaian Cedi)' },
    { value: 'zar', label: 'ZAR (South African Rand)' },
    { value: 'kes', label: 'KES (Kenyan Shilling)' },
    { value: 'gbp', label: 'GBP (British Pound)' },
    { value: 'cad', label: 'CAD (Canadian Dollar)' },
    { value: 'aud', label: 'AUD (Australian Dollar)' },
    { value: 'jpy', label: 'JPY (Japanese Yen)' },
    { value: 'cny', label: 'CNY (Chinese Yuan)' },
    { value: 'inr', label: 'INR (Indian Rupee)' },
    { value: 'mad', label: 'MAD (Moroccan Dirham)' },
    { value: 'egy', label: 'EGP (Egyptian Pound)' },
  ];
  
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    toast({
      title: "Language Updated",
      description: "App language has been changed.",
    });
  };
  
  const handleCurrencyChange = (value: string) => {
    setCurrency(value);
    toast({
      title: "Currency Updated",
      description: "Display currency has been changed.",
    });
  };
  
  const handleThemeChange = (value: string) => {
    setTheme(value);
    toast({
      title: "Theme Updated",
      description: `App theme set to ${value}.`,
    });
  };
  
  const handleAutoLockChange = (value: string) => {
    setAutoLockTime(value);
    toast({
      title: "Auto Lock Time Updated",
      description: "Auto lock time has been updated.",
    });
  };
  
  const toggleShowBalance = (checked: boolean) => {
    setShowBalance(checked);
    toast({
      title: "Display Setting Updated",
      description: `Balance display ${checked ? 'enabled' : 'hidden'}.`,
    });
  };
  
  const toggleShowTransactions = (checked: boolean) => {
    setShowTransactions(checked);
    toast({
      title: "Display Setting Updated",
      description: `Transaction history display ${checked ? 'enabled' : 'hidden'}.`,
    });
  };
  
  const toggleShowCreditScore = (checked: boolean) => {
    setShowCreditScore(checked);
    toast({
      title: "Display Setting Updated",
      description: `Credit score display ${checked ? 'enabled' : 'hidden'}.`,
    });
  };
  
  const toggleSaveData = (checked: boolean) => {
    setSaveData(checked);
    toast({
      title: "Data Usage Setting Updated",
      description: `Data saving mode ${checked ? 'enabled' : 'disabled'}.`,
    });
  };
  
  const toggleAutoDownload = (checked: boolean) => {
    setAutoDownload(checked);
    toast({
      title: "Data Usage Setting Updated",
      description: `Auto download of statements ${checked ? 'enabled' : 'disabled'}.`,
    });
  };
  
  const toggleAnalytics = (checked: boolean) => {
    setAnalytics(checked);
    toast({
      title: "Data Usage Setting Updated",
      description: `Analytics data collection ${checked ? 'enabled' : 'disabled'}.`,
    });
  };
  
  const handleDefaultPaymentChange = (value: string) => {
    setDefaultPaymentMethod(value);
    toast({
      title: "Payment Setting Updated",
      description: "Default payment method has been updated.",
    });
  };
  
  const toggleOneClickPayment = (checked: boolean) => {
    setOneClickPayment(checked);
    toast({
      title: "Payment Setting Updated",
      description: `One-click payment ${checked ? 'enabled' : 'disabled'}.`,
    });
  };
  
  const toggleAskForPin = (checked: boolean) => {
    setAskForPin(checked);
    toast({
      title: "Payment Setting Updated",
      description: `PIN verification for transactions ${checked ? 'enabled' : 'disabled'}.`,
    });
  };
  
  const toggleQrCodePayment = (checked: boolean) => {
    setQrCodePayment(checked);
    toast({
      title: "Payment Setting Updated",
      description: `QR code payment ${checked ? 'enabled' : 'disabled'}.`,
    });
  };
  
  const toggleFingerprintAuth = (checked: boolean) => {
    setFingerprintAuth(checked);
    toast({
      title: "Authentication Setting Updated",
      description: `Fingerprint authentication ${checked ? 'enabled' : 'disabled'}.`,
    });
  };
  
  const toggleFaceRecognitionAuth = (checked: boolean) => {
    setFaceRecognitionAuth(checked);
    toast({
      title: "Authentication Setting Updated",
      description: `Face recognition authentication ${checked ? 'enabled' : 'disabled'}.`,
    });
  };
  
  const handleDeleteAccount = () => {
    toast({
      title: "Account Deletion",
      description: "This feature requires additional verification and will be available soon.",
    });
  };
  
  const handleExportData = () => {
    toast({
      title: "Data Export",
      description: "Your data export request has been received. You'll receive an email shortly.",
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background pb-20">
      <div className="container max-w-md mx-auto p-4">
        <PivotaHeader 
          title="App Settings" 
          showBackButton={true} 
          onBackClick={() => navigate("/profile")}
        />
        
        {/* Settings Header */}
        <Card className="mb-6 overflow-hidden border-none shadow-md">
          <CardContent className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-white/20 mr-4">
                <SettingsIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Settings</h2>
                <p className="text-white/80 text-sm">Customize your app experience</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="app" className="w-full mb-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="app">App</TabsTrigger>
            <TabsTrigger value="display">Display</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
          </TabsList>
          
          {/* App Settings Tab */}
          <TabsContent value="app" className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">General Settings</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select value={language} onValueChange={handleLanguageChange}>
                      <SelectTrigger id="language">
                        <div className="flex items-center">
                          <Globe size={16} className="mr-2" />
                          <SelectValue placeholder="Select Language" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select value={currency} onValueChange={handleCurrencyChange}>
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Select Currency" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px] overflow-y-auto">
                        {currencyOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Select value={theme} onValueChange={handleThemeChange}>
                      <SelectTrigger id="theme">
                        <div className="flex items-center">
                          {theme === 'light' && <Sun size={16} className="mr-2" />}
                          {theme === 'dark' && <Moon size={16} className="mr-2" />}
                          {theme === 'system' && (
                            <div className="flex mr-2">
                              <Sun size={16} />
                              <Moon size={16} />
                            </div>
                          )}
                          <SelectValue placeholder="Select Theme" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System Default</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="autoLock">Auto Lock (after inactivity)</Label>
                    <Select value={autoLockTime} onValueChange={handleAutoLockChange}>
                      <SelectTrigger id="autoLock">
                        <SelectValue placeholder="Select Time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="never">Never</SelectItem>
                        <SelectItem value="1m">After 1 minute</SelectItem>
                        <SelectItem value="5m">After 5 minutes</SelectItem>
                        <SelectItem value="15m">After 15 minutes</SelectItem>
                        <SelectItem value="30m">After 30 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">Security</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-blue-100 mr-3">
                        <Fingerprint size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Fingerprint Authentication</p>
                        <p className="text-xs text-muted-foreground">Enable login with fingerprint</p>
                      </div>
                    </div>
                    <Switch 
                      checked={fingerprintAuth}
                      onCheckedChange={toggleFingerprintAuth}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center py-2">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-blue-100 mr-3">
                        <FaceRecognition size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Face Recognition</p>
                        <p className="text-xs text-muted-foreground">Enable login with face recognition</p>
                      </div>
                    </div>
                    <Switch 
                      checked={faceRecognitionAuth}
                      onCheckedChange={toggleFaceRecognitionAuth}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">About App</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-sm text-muted-foreground">Version</p>
                    <p className="text-sm font-medium">2.5.1</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-muted-foreground">Last Updated</p>
                    <p className="text-sm font-medium">May 5, 2025</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    Terms of Service
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Privacy Policy
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Check for Updates
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Display Settings Tab */}
          <TabsContent value="display" className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">Display Preferences</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-blue-100 mr-3">
                        <Eye size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Show Balance</p>
                        <p className="text-xs text-muted-foreground">Display your balance on the home screen</p>
                      </div>
                    </div>
                    <Switch 
                      checked={showBalance}
                      onCheckedChange={toggleShowBalance}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center py-2">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-blue-100 mr-3">
                        <Database size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Show Transaction History</p>
                        <p className="text-xs text-muted-foreground">Display recent transactions on the home screen</p>
                      </div>
                    </div>
                    <Switch 
                      checked={showTransactions}
                      onCheckedChange={toggleShowTransactions}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center py-2">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-blue-100 mr-3">
                        <CreditCard size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Show Credit Score</p>
                        <p className="text-xs text-muted-foreground">Display your credit score in the finance section</p>
                      </div>
                    </div>
                    <Switch 
                      checked={showCreditScore}
                      onCheckedChange={toggleShowCreditScore}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">Appearance</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fontSize">Font Size</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="fontSize">
                        <SelectValue placeholder="Select Font Size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                        <SelectItem value="xlarge">Extra Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="colorScheme">Color Scheme</Label>
                    <Select defaultValue="blue">
                      <SelectTrigger id="colorScheme">
                        <SelectValue placeholder="Select Color Scheme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blue">Blue</SelectItem>
                        <SelectItem value="purple">Purple</SelectItem>
                        <SelectItem value="green">Green</SelectItem>
                        <SelectItem value="orange">Orange</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground mt-4">
                  Some appearance settings may require app restart to take effect
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Data Usage Tab */}
          <TabsContent value="data" className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">Data Usage</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-blue-100 mr-3">
                        <Database size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Data Saving Mode</p>
                        <p className="text-xs text-muted-foreground">Reduce data usage on mobile networks</p>
                      </div>
                    </div>
                    <Switch 
                      checked={saveData}
                      onCheckedChange={toggleSaveData}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center py-2">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-blue-100 mr-3">
                        <Database size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Auto-download Statements</p>
                        <p className="text-xs text-muted-foreground">Automatically download monthly statements</p>
                      </div>
                    </div>
                    <Switch 
                      checked={autoDownload}
                      onCheckedChange={toggleAutoDownload}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center py-2">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-blue-100 mr-3">
                        <Database size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Analytics & Improvements</p>
                        <p className="text-xs text-muted-foreground">Share usage data to improve app experience</p>
                      </div>
                    </div>
                    <Switch 
                      checked={analytics}
                      onCheckedChange={toggleAnalytics}
                    />
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground mt-4">
                  We never collect or share your financial data for advertising purposes
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">Data Management</h3>
                
                <div className="space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleExportData}
                  >
                    Export My Data
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      toast({
                        title: "Cache Cleared",
                        description: "App cache has been successfully cleared.",
                      });
                    }}
                  >
                    Clear App Cache
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Payment Settings Tab */}
          <TabsContent value="payment" className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">Payment Preferences</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="defaultPayment">Default Payment Method</Label>
                    <Select value={defaultPaymentMethod} onValueChange={handleDefaultPaymentChange}>
                      <SelectTrigger id="defaultPayment">
                        <SelectValue placeholder="Select Default Payment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wallet">Pivota Wallet</SelectItem>
                        <SelectItem value="bank">Bank Account</SelectItem>
                        <SelectItem value="card">Debit/Credit Card</SelectItem>
                        <SelectItem value="momo">Mobile Money</SelectItem>
                        <SelectItem value="qrcode">QR Code</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex justify-between items-center py-2">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-blue-100 mr-3">
                        <CreditCard size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">One-Click Payment</p>
                        <p className="text-xs text-muted-foreground">Enable fast checkout without confirmation</p>
                      </div>
                    </div>
                    <Switch 
                      checked={oneClickPayment}
                      onCheckedChange={toggleOneClickPayment}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center py-2">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-blue-100 mr-3">
                        <QrCode size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">QR Code Payment</p>
                        <p className="text-xs text-muted-foreground">Enable payment by scanning QR code</p>
                      </div>
                    </div>
                    <Switch 
                      checked={qrCodePayment}
                      onCheckedChange={toggleQrCodePayment}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center py-2">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-blue-100 mr-3">
                        <CreditCard size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Ask for PIN</p>
                        <p className="text-xs text-muted-foreground">Require PIN verification for all transactions</p>
                      </div>
                    </div>
                    <Switch 
                      checked={askForPin}
                      onCheckedChange={toggleAskForPin}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">Transaction Limits</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="dailyLimit">Daily Transaction Limit (FCFA)</Label>
                    <Input id="dailyLimit" type="number" defaultValue="500000" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="singleLimit">Single Transaction Limit (FCFA)</Label>
                    <Input id="singleLimit" type="number" defaultValue="200000" />
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={() => {
                      toast({
                        title: "Transaction Limits Updated",
                        description: "Your transaction limits have been updated.",
                      });
                    }}
                  >
                    Update Limits
                  </Button>
                  
                  <p className="text-xs text-muted-foreground">
                    Note: Higher limits may require additional verification
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Account Management */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-4">Account Management</h3>
            
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full text-amber-600"
                onClick={() => navigate('/profile')}
              >
                Back to Profile
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Settings;
