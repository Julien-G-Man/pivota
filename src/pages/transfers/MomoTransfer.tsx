
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';

const providers = [
  { id: 'mtn', name: 'MTN Mobile Money' },
  { id: 'orange', name: 'Orange Money' },
  { id: 'airtel', name: 'Airtel Money' },
  { id: 'moov', name: 'Moov Money' },
];

const MomoTransfer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [provider, setProvider] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [password, setPassword] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [transactionDate, setTransactionDate] = useState('');

  const handleNextStep = () => {
    if (step === 1) {
      if (!provider || !phoneNumber || !amount) {
        toast({
          title: "Error",
          description: "Please fill all required fields",
        });
        return;
      }
      // Simulate fetching recipient name
      setRecipientName("John Doe");
      // Generate a transaction ID
      setTransactionId("MOMO" + Math.floor(Math.random() * 1000000));
      // Set transaction date
      setTransactionDate(new Date().toLocaleString());
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
      description: `You have successfully transferred ${amount} F to ${phoneNumber}`,
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
          <h1 className="text-2xl font-bold">Mobile Money Transfer</h1>
        </div>

        {step === 1 && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h2 className="text-lg font-semibold mb-4">Enter MOMO Details</h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Mobile Money Provider</Label>
                  <Select onValueChange={setProvider}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      {providers.map((p) => (
                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input 
                    type="text"
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
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
              <h2 className="text-lg font-semibold mb-4">Transaction Receipt</h2>
              
              <div className="flex flex-col items-center mb-6">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Phone size={32} className="text-primary" />
                </div>
                <h3 className="text-lg font-medium">{providers.find(p => p.id === provider)?.name}</h3>
                <p className="text-muted-foreground text-sm">{phoneNumber}</p>
              </div>
              
              <div className="bg-muted/30 rounded-lg p-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Transaction ID:</span>
                  <span className="font-medium">{transactionId}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-medium">{amount} F</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Recipient:</span>
                  <span className="font-medium">{recipientName}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Mobile Provider:</span>
                  <span className="font-medium">
                    {providers.find(p => p.id === provider)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Description:</span>
                  <span className="font-medium">{description || 'None'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date & Time:</span>
                  <span className="font-medium">{transactionDate}</span>
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

export default MomoTransfer;
