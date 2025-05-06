
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';

const operators = [
  { id: 'mtn', name: 'MTN', logo: '📱' },
  { id: 'airtel', name: 'Airtel', logo: '📱' },
  { id: 'orange', name: 'Orange', logo: '📱' },
  { id: 'voda', name: 'Vodacom', logo: '📱' },
];

// Sample data bundle options
const dataPlans = {
  daily: [
    { id: 'd1', name: 'Daily Light', data: '50MB', price: '200 F', validity: '1 day' },
    { id: 'd2', name: 'Daily Plus', data: '150MB', price: '500 F', validity: '1 day' },
    { id: 'd3', name: 'Daily Max', data: '500MB', price: '1,000 F', validity: '1 day' },
  ],
  weekly: [
    { id: 'w1', name: 'Weekly Light', data: '500MB', price: '2,000 F', validity: '7 days' },
    { id: 'w2', name: 'Weekly Plus', data: '1GB', price: '3,500 F', validity: '7 days' },
    { id: 'w3', name: 'Weekly Max', data: '3GB', price: '7,000 F', validity: '7 days' },
  ],
  monthly: [
    { id: 'm1', name: 'Monthly Light', data: '2GB', price: '5,000 F', validity: '30 days' },
    { id: 'm2', name: 'Monthly Plus', data: '5GB', price: '10,000 F', validity: '30 days' },
    { id: 'm3', name: 'Monthly Max', data: '15GB', price: '25,000 F', validity: '30 days' },
    { id: 'm4', name: 'Monthly Ultra', data: '30GB', price: '45,000 F', validity: '30 days' },
  ],
};

const Data = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [operator, setOperator] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [planType, setPlanType] = useState('daily');
  const [selectedPlan, setSelectedPlan] = useState('');

  const handlePurchase = () => {
    if (!operator || !phoneNumber || !selectedPlan) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
      });
      return;
    }

    const plan = [...dataPlans.daily, ...dataPlans.weekly, ...dataPlans.monthly].find(p => p.id === selectedPlan);
    
    if (!plan) {
      toast({
        title: "Error",
        description: "Please select a valid data plan",
      });
      return;
    }
    
    toast({
      title: "Data Purchase Successful",
      description: `You have successfully purchased ${plan.data} for ${phoneNumber}`,
    });
    
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-background pb-6">
      <div className="container max-w-md mx-auto p-4">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 mr-4 rounded-full hover:bg-muted/80 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold">Buy Data</h1>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4">Select Operator</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              {operators.map((op) => (
                <button
                  key={op.id}
                  className={`p-4 rounded-lg border flex items-center justify-center flex-col ${
                    operator === op.id ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                  onClick={() => setOperator(op.id)}
                >
                  <span className="text-2xl mb-1">{op.logo}</span>
                  <span className="font-medium">{op.name}</span>
                </button>
              ))}
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input 
                  type="tel"
                  placeholder="Enter recipient's phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4">Select Data Plan</h2>
            
            <Tabs value={planType} onValueChange={setPlanType} className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
              
              <TabsContent value="daily" className="mt-0">
                <div className="space-y-3">
                  {dataPlans.daily.map((plan) => (
                    <div
                      key={plan.id}
                      className={`p-4 rounded-lg border flex justify-between items-center ${
                        selectedPlan === plan.id ? 'border-primary bg-primary/5' : 'border-border'
                      }`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      <div>
                        <h4 className="font-medium">{plan.name}</h4>
                        <p className="text-sm text-muted-foreground">{plan.data} • {plan.validity}</p>
                      </div>
                      <div className="font-bold">{plan.price}</div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="weekly" className="mt-0">
                <div className="space-y-3">
                  {dataPlans.weekly.map((plan) => (
                    <div
                      key={plan.id}
                      className={`p-4 rounded-lg border flex justify-between items-center ${
                        selectedPlan === plan.id ? 'border-primary bg-primary/5' : 'border-border'
                      }`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      <div>
                        <h4 className="font-medium">{plan.name}</h4>
                        <p className="text-sm text-muted-foreground">{plan.data} • {plan.validity}</p>
                      </div>
                      <div className="font-bold">{plan.price}</div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="monthly" className="mt-0">
                <div className="space-y-3">
                  {dataPlans.monthly.map((plan) => (
                    <div
                      key={plan.id}
                      className={`p-4 rounded-lg border flex justify-between items-center ${
                        selectedPlan === plan.id ? 'border-primary bg-primary/5' : 'border-border'
                      }`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      <div>
                        <h4 className="font-medium">{plan.name}</h4>
                        <p className="text-sm text-muted-foreground">{plan.data} • {plan.validity}</p>
                      </div>
                      <div className="font-bold">{plan.price}</div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            
            <Button 
              onClick={handlePurchase}
              className="w-full mt-6"
            >
              Purchase Data Bundle
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Data;
