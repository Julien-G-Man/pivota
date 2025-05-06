
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const operators = [
  { id: 'mtn', name: 'MTN', logo: '📱' },
  { id: 'airtel', name: 'Airtel', logo: '📱' },
  { id: 'orange', name: 'Orange', logo: '📱' },
  { id: 'voda', name: 'Vodacom', logo: '📱' },
];

const airtimeOptions = [
  { value: '500', display: '500 F' },
  { value: '1000', display: '1,000 F' },
  { value: '2000', display: '2,000 F' },
  { value: '5000', display: '5,000 F' },
  { value: '10000', display: '10,000 F' },
];

const Airtime = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [operator, setOperator] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [airtimeAmount, setAirtimeAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');

  const handlePurchase = () => {
    if (!operator || !phoneNumber || (!airtimeAmount && !customAmount)) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
      });
      return;
    }

    const amount = airtimeAmount || customAmount;
    
    toast({
      title: "Airtime Purchase Successful",
      description: `You have successfully purchased ${amount} F airtime for ${phoneNumber}`,
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
          <h1 className="text-2xl font-bold">Buy Airtime</h1>
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
              
              <div className="space-y-2">
                <Label>Select Amount</Label>
                <RadioGroup 
                  onValueChange={value => {
                    setAirtimeAmount(value);
                    setCustomAmount('');
                  }}
                  value={airtimeAmount}
                >
                  <div className="grid grid-cols-3 gap-2">
                    {airtimeOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={`amount-${option.value}`} />
                        <Label htmlFor={`amount-${option.value}`}>{option.display}</Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label>Or Enter Custom Amount</Label>
                <Input 
                  type="number"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setAirtimeAmount('');
                  }}
                />
              </div>
            </div>
            
            <Button 
              onClick={handlePurchase}
              className="w-full mt-6"
            >
              Purchase Airtime
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Airtime;
