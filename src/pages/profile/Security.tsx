
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Shield, Lock, Fingerprint, Eye, EyeOff, CreditCard, AlertTriangle, Scan } from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import PivotaHeader from '@/components/common/PivotaHeader';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const passwordFormSchema = z.object({
  currentPassword: z.string().min(8, { message: "Password must be at least 8 characters." }),
  newPassword: z.string().min(8, { message: "New password must be at least 8 characters." }),
  confirmPassword: z.string().min(8, { message: "Please confirm your password." }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const pinFormSchema = z.object({
  currentPin: z.string().length(4, { message: "PIN must be 4 digits." }),
  newPin: z.string().length(4, { message: "New PIN must be 4 digits." }),
  confirmPin: z.string().length(4, { message: "Please confirm your PIN." }),
}).refine((data) => data.newPin === data.confirmPin, {
  message: "PINs don't match",
  path: ["confirmPin"],
});

const Security = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [appLockEnabled, setAppLockEnabled] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState("password");

  // Form for password update
  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Form for PIN update
  const pinForm = useForm<z.infer<typeof pinFormSchema>>({
    resolver: zodResolver(pinFormSchema),
    defaultValues: {
      currentPin: "",
      newPin: "",
      confirmPin: "",
    },
  });

  const onSubmitPassword = (data: z.infer<typeof passwordFormSchema>) => {
    toast({
      title: "Password Updated",
      description: "Your password has been successfully changed.",
    });
    passwordForm.reset();
  };

  const onSubmitPin = (data: z.infer<typeof pinFormSchema>) => {
    toast({
      title: "PIN Updated",
      description: "Your PIN has been successfully changed.",
    });
    pinForm.reset();
  };

  const handleToggleBiometric = (checked: boolean) => {
    setBiometricEnabled(checked);
    toast({
      title: checked ? "Biometric Login Enabled" : "Biometric Login Disabled",
      description: checked ? "You can now use biometric authentication to login." : "Biometric login has been disabled.",
    });
  };

  const handleToggleAppLock = (checked: boolean) => {
    setAppLockEnabled(checked);
    toast({
      title: checked ? "App Lock Enabled" : "App Lock Disabled",
      description: checked ? "App will now require authentication each time it's opened." : "App lock has been disabled.",
    });
  };

  const handleToggleTwoFactor = (checked: boolean) => {
    if (checked) {
      // Would normally show 2FA setup dialog here
      setTwoFactorEnabled(false); // Only enable after setup
      toast({
        title: "Set Up Required",
        description: "Please set up two-factor authentication first.",
      });
    } else {
      setTwoFactorEnabled(false);
      toast({
        title: "Two-Factor Authentication Disabled",
        description: "Two-factor authentication has been disabled.",
      });
    }
  };

  const setupTwoFactor = () => {
    // Simulate successful 2FA setup
    setTwoFactorEnabled(true);
    toast({
      title: "Two-Factor Authentication Enabled",
      description: "Two-factor authentication has been successfully set up.",
    });
  };

  const handleDeviceManagement = () => {
    toast({
      title: "Device Management",
      description: "Device management feature will be available soon.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background pb-20">
      <div className="container max-w-md mx-auto p-4">
        <PivotaHeader 
          title="Security & Privacy" 
          showBackButton={true} 
          onBackClick={() => navigate("/profile")}
        />

        {/* Security Header */}
        <Card className="mb-6 overflow-hidden border-none shadow-md">
          <CardContent className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-white/20 mr-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Security Center</h2>
                <p className="text-white/80 text-sm">Protect your account and money</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Authentication Options */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-4">Authentication Options</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-blue-100 mr-3">
                    <Fingerprint size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Biometric Login</p>
                    <p className="text-sm text-muted-foreground">Use fingerprint or face recognition</p>
                  </div>
                </div>
                <Switch 
                  checked={biometricEnabled}
                  onCheckedChange={handleToggleBiometric}
                />
              </div>
              
              <div className="flex justify-between items-center py-2">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-blue-100 mr-3">
                    <Lock size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">App Lock</p>
                    <p className="text-sm text-muted-foreground">Lock app after inactivity period</p>
                  </div>
                </div>
                <Switch 
                  checked={appLockEnabled}
                  onCheckedChange={handleToggleAppLock}
                />
              </div>
              
              <div className="flex justify-between items-center py-2">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-blue-100 mr-3">
                    <Shield size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Add extra security to your account</p>
                  </div>
                </div>
                <Switch 
                  checked={twoFactorEnabled}
                  onCheckedChange={handleToggleTwoFactor}
                />
              </div>
              
              {!twoFactorEnabled && (
                <Button 
                  variant="outline" 
                  onClick={setupTwoFactor} 
                  className="w-full"
                >
                  Set Up Two-Factor Authentication
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Password and PIN Management */}
        <Tabs 
          defaultValue="password"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full mb-6"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="pin">Transaction PIN</TabsTrigger>
          </TabsList>

          {/* Password Tab */}
          <TabsContent value="password" className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                <Form {...passwordForm}>
                  <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)} className="space-y-4">
                    <FormField
                      control={passwordForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                {...field} 
                                type={showCurrentPassword ? "text" : "password"}
                                className="pr-10"
                              />
                              <button 
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                              >
                                {showCurrentPassword ? 
                                  <EyeOff size={18} className="text-muted-foreground" /> : 
                                  <Eye size={18} className="text-muted-foreground" />
                                }
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                {...field} 
                                type={showNewPassword ? "text" : "password"}
                                className="pr-10"
                              />
                              <button 
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                              >
                                {showNewPassword ? 
                                  <EyeOff size={18} className="text-muted-foreground" /> : 
                                  <Eye size={18} className="text-muted-foreground" />
                                }
                              </button>
                            </div>
                          </FormControl>
                          <FormDescription>
                            Password must be at least 8 characters long
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                {...field} 
                                type={showConfirmPassword ? "text" : "password"}
                                className="pr-10"
                              />
                              <button 
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              >
                                {showConfirmPassword ? 
                                  <EyeOff size={18} className="text-muted-foreground" /> : 
                                  <Eye size={18} className="text-muted-foreground" />
                                }
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full">Update Password</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* PIN Tab */}
          <TabsContent value="pin" className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">Change Transaction PIN</h3>
                <Form {...pinForm}>
                  <form onSubmit={pinForm.handleSubmit(onSubmitPin)} className="space-y-4">
                    <FormField
                      control={pinForm.control}
                      name="currentPin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current PIN</FormLabel>
                          <FormControl>
                            <div className="flex justify-center">
                              <InputOTP maxLength={4} {...field}>
                                <InputOTPGroup>
                                  <InputOTPSlot index={0} />
                                  <InputOTPSlot index={1} />
                                  <InputOTPSlot index={2} />
                                  <InputOTPSlot index={3} />
                                </InputOTPGroup>
                              </InputOTP>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={pinForm.control}
                      name="newPin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New PIN</FormLabel>
                          <FormControl>
                            <div className="flex justify-center">
                              <InputOTP maxLength={4} {...field}>
                                <InputOTPGroup>
                                  <InputOTPSlot index={0} />
                                  <InputOTPSlot index={1} />
                                  <InputOTPSlot index={2} />
                                  <InputOTPSlot index={3} />
                                </InputOTPGroup>
                              </InputOTP>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={pinForm.control}
                      name="confirmPin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New PIN</FormLabel>
                          <FormControl>
                            <div className="flex justify-center">
                              <InputOTP maxLength={4} {...field}>
                                <InputOTPGroup>
                                  <InputOTPSlot index={0} />
                                  <InputOTPSlot index={1} />
                                  <InputOTPSlot index={2} />
                                  <InputOTPSlot index={3} />
                                </InputOTPGroup>
                              </InputOTP>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full">Update PIN</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Device Management */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Device Management</h3>
                <p className="text-sm text-muted-foreground">Manage devices with access to your account</p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleDeviceManagement}>
                Manage
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Security Options */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-4">Additional Options</h3>
            
            <div className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => {
                  toast({
                    title: "Privacy Settings",
                    description: "Privacy settings feature coming soon.",
                  });
                }}
              >
                <div className="p-2 rounded-full bg-blue-100 mr-3">
                  <Shield size={18} className="text-blue-600" />
                </div>
                Privacy Settings
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => {
                  toast({
                    title: "Security Question",
                    description: "Security question feature coming soon.",
                  });
                }}
              >
                <div className="p-2 rounded-full bg-blue-100 mr-3">
                  <Lock size={18} className="text-blue-600" />
                </div>
                Security Question
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={() => {
                  toast({
                    title: "Report Suspicious Activity",
                    description: "Please contact our support team for assistance.",
                  });
                }}
              >
                <div className="p-2 rounded-full bg-red-100 mr-3">
                  <AlertTriangle size={18} className="text-red-500" />
                </div>
                Report Suspicious Activity
              </Button>
            </div>
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

export default Security;
