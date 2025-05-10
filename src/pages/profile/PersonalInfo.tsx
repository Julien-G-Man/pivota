
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Mail, Phone, MapPin, Calendar, Home, Briefcase, Edit2 } from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import PivotaHeader from '@/components/common/PivotaHeader';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const profileFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(8, { message: "Phone number must be valid." }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required." }),
  address: z.string().min(5, { message: "Address is required." }),
  city: z.string().min(2, { message: "City is required." }),
  region: z.string().min(2, { message: "Region is required." }),
  country: z.string().min(2, { message: "Country is required." }),
});

const professionalFormSchema = z.object({
  occupation: z.string().min(2, { message: "Occupation is required." }),
  company: z.string().optional(),
  industry: z.string().min(2, { message: "Industry is required." }),
  income: z.string().min(1, { message: "Income range is required." }),
  taxId: z.string().optional(),
});

const PersonalInfo = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  // Get user data from localStorage or use default
  const getUserData = () => {
    const storedUser = localStorage.getItem("userProfile");
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    return {
      firstName: "Julien",
      lastName: "Glory Manana",
      email: "julien.glory@example.com",
      phone: "+237 612 345 678",
      dateOfBirth: "1990-05-15",
      address: "123 Main Street",
      city: "Douala",
      region: "Littoral",
      country: "Cameroon",
      occupation: "Software Engineer",
      company: "Tech Solutions Inc.",
      industry: "Technology",
      income: "50000-100000",
      taxId: "TAX12345678"
    };
  };

  const userData = getUserData();

  // Form for personal details
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      dateOfBirth: userData.dateOfBirth,
      address: userData.address,
      city: userData.city,
      region: userData.region,
      country: userData.country,
    },
  });

  // Form for professional details
  const professionalForm = useForm<z.infer<typeof professionalFormSchema>>({
    resolver: zodResolver(professionalFormSchema),
    defaultValues: {
      occupation: userData.occupation,
      company: userData.company,
      industry: userData.industry,
      income: userData.income,
      taxId: userData.taxId,
    },
  });

  const onSubmitPersonal = (data: z.infer<typeof profileFormSchema>) => {
    // Merge with existing data and save to localStorage
    const updatedUser = { ...userData, ...data };
    localStorage.setItem("userProfile", JSON.stringify(updatedUser));
    
    toast({
      title: "Profile Updated",
      description: "Your personal information has been updated successfully.",
    });
    
    setIsEditing(false);
  };

  const onSubmitProfessional = (data: z.infer<typeof professionalFormSchema>) => {
    // Merge with existing data and save to localStorage
    const updatedUser = { ...userData, ...data };
    localStorage.setItem("userProfile", JSON.stringify(updatedUser));
    
    toast({
      title: "Profile Updated",
      description: "Your professional information has been updated successfully.",
    });
    
    setIsEditing(false);
  };

  const handleUploadPhoto = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Photo upload functionality will be available soon.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background pb-20">
      <div className="container max-w-md mx-auto p-4">
        <PivotaHeader 
          title="Personal Information" 
          showBackButton={true} 
          onBackClick={() => navigate("/profile")}
        />

        {/* Profile Photo Card */}
        <Card className="mb-6 overflow-hidden border shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-center flex-col pt-2">
              <Avatar className="h-24 w-24 border-4 border-primary/20">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
                <AvatarFallback>JG</AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-2xl font-bold">{userData.firstName} {userData.lastName}</h2>
              <p className="text-muted-foreground">{userData.email}</p>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="mt-4">
                    Update Photo
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Update Profile Picture</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col items-center">
                    <Avatar className="h-32 w-32 border-4 border-primary/20">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
                      <AvatarFallback>JG</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-2 w-full mt-4">
                      <Button onClick={handleUploadPhoto}>Upload New Photo</Button>
                      <Button variant="outline">Remove Photo</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Profile Info Tabs */}
        <Tabs 
          defaultValue="personal"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
          </TabsList>

          {/* Personal Details Tab */}
          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Personal Details</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-primary"
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>
                </div>

                {isEditing ? (
                  <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(onSubmitPersonal)} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={profileForm.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={profileForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input {...field} type="tel" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={profileForm.control}
                        name="dateOfBirth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Birth</FormLabel>
                            <FormControl>
                              <Input {...field} type="date" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={profileForm.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={profileForm.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="region"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Region</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={profileForm.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full">Save Changes</Button>
                    </form>
                  </Form>
                ) : (
                  <div className="space-y-3">
                    <InfoItem icon={<User size={18} />} label="Name" value={`${userData.firstName} ${userData.lastName}`} />
                    <InfoItem icon={<Mail size={18} />} label="Email" value={userData.email} />
                    <InfoItem icon={<Phone size={18} />} label="Phone" value={userData.phone} />
                    <InfoItem icon={<Calendar size={18} />} label="Date of Birth" value={userData.dateOfBirth} />
                    <InfoItem icon={<Home size={18} />} label="Address" value={userData.address} />
                    <InfoItem icon={<MapPin size={18} />} label="City" value={`${userData.city}, ${userData.region}`} />
                    <InfoItem icon={<MapPin size={18} />} label="Country" value={userData.country} />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Professional Details Tab */}
          <TabsContent value="professional" className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Professional Details</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-primary"
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>
                </div>

                {isEditing ? (
                  <Form {...professionalForm}>
                    <form onSubmit={professionalForm.handleSubmit(onSubmitProfessional)} className="space-y-4">
                      <FormField
                        control={professionalForm.control}
                        name="occupation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Occupation</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={professionalForm.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company (Optional)</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={professionalForm.control}
                        name="industry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Industry</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={professionalForm.control}
                        name="income"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Income Range (FCFA)</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={professionalForm.control}
                        name="taxId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tax ID (Optional)</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full">Save Changes</Button>
                    </form>
                  </Form>
                ) : (
                  <div className="space-y-3">
                    <InfoItem icon={<Briefcase size={18} />} label="Occupation" value={userData.occupation} />
                    <InfoItem icon={<Briefcase size={18} />} label="Company" value={userData.company || "Not specified"} />
                    <InfoItem icon={<Briefcase size={18} />} label="Industry" value={userData.industry} />
                    <InfoItem icon={<Briefcase size={18} />} label="Income Range" value={`FCFA ${userData.income}`} />
                    <InfoItem icon={<Briefcase size={18} />} label="Tax ID" value={userData.taxId || "Not specified"} />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

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

// Helper component for displaying info items
const InfoItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="flex items-center py-2 border-b border-gray-100">
    <div className="p-2 rounded-full bg-primary/10 mr-3">
      {icon}
    </div>
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

export default PersonalInfo;
