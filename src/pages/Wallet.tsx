
import { useState } from 'react';
import { Plus, CreditCard, Wallet as WalletIcon, Trash2 } from 'lucide-react';
import BottomNavigation from '@/components/layout/BottomNavigation';
import PivotaHeader from '@/components/common/PivotaHeader';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface PaymentMethod {
  id: string;
  type: 'card' | 'mobile' | 'bank';
  name: string;
  details: string;
  isDefault?: boolean;
}

const Wallet = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('cards');
  
  const paymentMethods: Record<string, PaymentMethod[]> = {
    cards: [
      { 
        id: '1', 
        type: 'card', 
        name: 'Visa Card', 
        details: '•••• 4582',
        isDefault: true,
      },
      { 
        id: '2', 
        type: 'card', 
        name: 'Mastercard', 
        details: '•••• 2356',
      },
    ],
    mobile: [
      { 
        id: '3', 
        type: 'mobile', 
        name: 'Mobile Money', 
        details: '+237 6XX XXX XXX',
        isDefault: true,
      },
    ],
    bank: [
      { 
        id: '4', 
        type: 'bank', 
        name: 'Savings Account', 
        details: '•••• 8901',
        isDefault: true,
      },
    ],
  };
  
  const handleDelete = (id: string) => {
    toast({
      title: "Payment Method",
      description: "This payment method would be deleted in a real app.",
    });
  };
  
  const handleAddPaymentMethod = () => {
    toast({
      title: "Add Payment Method",
      description: "This would open a form to add a new payment method.",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container max-w-md mx-auto p-4">
        <PivotaHeader title="Wallet" />
        
        <Button 
          onClick={handleAddPaymentMethod}
          className="w-full mb-6 bg-primary hover:bg-primary-dark flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Add Payment Method
        </Button>
        
        <Tabs defaultValue="cards" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="mobile">Mobile Money</TabsTrigger>
            <TabsTrigger value="bank">Bank Accounts</TabsTrigger>
          </TabsList>
          
          {Object.entries(paymentMethods).map(([key, methods]) => (
            <TabsContent key={key} value={key} className="mt-0 space-y-4">
              {methods.map((method) => (
                <Card key={method.id} className={`relative overflow-hidden ${method.isDefault ? 'border-primary border-2' : ''}`}>
                  {method.isDefault && (
                    <div className="absolute top-0 right-0 bg-primary text-white text-xs py-1 px-3 rounded-bl-md">
                      Default
                    </div>
                  )}
                  
                  <CardContent className="p-4 flex items-center">
                    <div className="p-3 rounded-full bg-muted mr-4">
                      {method.type === 'card' ? (
                        <CreditCard size={24} />
                      ) : method.type === 'mobile' ? (
                        <WalletIcon size={24} />
                      ) : (
                        <WalletIcon size={24} />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-medium">{method.name}</h3>
                      <p className="text-sm text-muted-foreground">{method.details}</p>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => handleDelete(method.id)}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </CardContent>
                </Card>
              ))}
              
              {methods.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No payment methods added yet</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Wallet;
