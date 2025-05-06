
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

const congoleseBanks = [
  { id: 'uba', name: 'UBA Congo' },
  { id: 'ecobank', name: 'Ecobank Congo' },
  { id: 'bgfi', name: 'BGFI Bank' },
  { id: 'lcb', name: 'LCB Bank' },
];

const internationalBanks = [
  { id: 'uba-international', name: 'UBA International' },
  { id: 'standard-chartered', name: 'Standard Chartered' },
  { id: 'citi', name: 'Citibank' },
  { id: 'hsbc', name: 'HSBC' },
];

const BankTransfer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [transferType, setTransferType] = useState('local');
  const [selectedBank, setSelectedBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [password, setPassword] = useState('');
  const [recipientName, setRecipientName] = useState('John Doe'); // Simulated recipient

  const handleNextStep = () => {
    if (step === 1) {
      if (!selectedBank) {
        toast({
          title: "Error",
          description: "Please select a bank",
        });
        return;
      }
    } else if (step === 2) {
      if (!accountNumber || !amount) {
        toast({
          title: "Error",
          description: "Please fill all required fields",
        });
        return;
      }
      // Simulate fetching account holder name
      setRecipientName("John Doe");
    }
    
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmitTransfer = () => {
    if (!password) {
      toast({
        title: "Error",
        description: "Please enter your password",
      });
      return;
    }

    toast({
      title: "Transfer Successful",
      description: `You have successfully transferred ${amount} F to ${recipientName}`,
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
          <h1 className="text-2xl font-bold">Bank Transfer</h1>
        </div>

        {step === 1 && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h2 className="text-lg font-semibold mb-4">Select Bank Type</h2>
              <Tabs 
                defaultValue="local" 
                value={transferType} 
                onValueChange={setTransferType}
                className="w-full"
              >
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="local">Banks in Congo Brazzaville</TabsTrigger>
                  <TabsTrigger value="international">International Banks</TabsTrigger>
                </TabsList>
                
                <TabsContent value="local">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Select Bank</Label>
                      <Select onValueChange={setSelectedBank}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a bank" />
                        </SelectTrigger>
                        <SelectContent>
                          {congoleseBanks.map((bank) => (
                            <SelectItem key={bank.id} value={bank.id}>{bank.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="international">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Select Bank</Label>
                      <Select onValueChange={setSelectedBank}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a bank" />
                        </SelectTrigger>
                        <SelectContent>
                          {internationalBanks.map((bank) => (
                            <SelectItem key={bank.id} value={bank.id}>{bank.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <Button 
                onClick={handleNextStep}
                className="w-full mt-6"
              >
                Next
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h2 className="text-lg font-semibold mb-4">Enter Transfer Details</h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Account Number</Label>
                  <Input 
                    type="text"
                    placeholder="Enter account number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Amount (F)</Label>
                  <Input 
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Description (Optional)</Label>
                  <Input 
                    type="text"
                    placeholder="What's this for?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex space-x-4 mt-6">
                <Button 
                  variant="outline" 
                  onClick={handlePrevStep}
                  className="w-1/2"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleNextStep}
                  className="w-1/2"
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        {step === 3 && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h2 className="text-lg font-semibold mb-4">Confirm Transfer</h2>
              
              <div className="bg-muted/30 rounded-lg p-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Recipient:</span>
                  <span className="font-medium">{recipientName}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Bank:</span>
                  <span className="font-medium">
                    {transferType === 'local' 
                      ? congoleseBanks.find(b => b.id === selectedBank)?.name 
                      : internationalBanks.find(b => b.id === selectedBank)?.name}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Account Number:</span>
                  <span className="font-medium">{accountNumber}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-medium">{amount} F</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Description:</span>
                  <span className="font-medium">{description || 'None'}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Enter Password to Confirm</Label>
                  <Input 
                    type="password"
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex space-x-4 mt-6">
                <Button 
                  variant="outline" 
                  onClick={handlePrevStep}
                  className="w-1/2"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleSubmitTransfer}
                  className="w-1/2"
                >
                  Confirm Transfer
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BankTransfer;
