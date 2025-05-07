
import { useState } from 'react';
import { Plus, ChevronRight, CreditCard, ShieldCheck, ShoppingCart, Globe, Lock } from 'lucide-react';
import BottomNavigation from '@/components/layout/BottomNavigation';
import PivotaHeader from '@/components/common/PivotaHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CardDetails {
  id: string;
  type: string;
  number: string;
  expiryMonth: string;
  expiryYear: string;
  color: string;
  frozen: boolean;
  holderName: string;
  cvv: string;
}

const Cards = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('physical');
  
  const [cards, setCards] = useState<CardDetails[]>([
    {
      id: '1',
      type: 'Visa',
      number: '5489 7452 8645 1278',
      expiryMonth: '12',
      expiryYear: '26',
      color: 'from-blue-700 to-blue-950',
      frozen: false,
      holderName: 'JULIEN GLORY MANANA',
      cvv: '123'
    },
    {
      id: '2',
      type: 'Mastercard',
      number: '4568 7891 2345 6789',
      expiryMonth: '06',
      expiryYear: '27',
      color: 'from-purple-700 to-indigo-950',
      frozen: false,
      holderName: 'JULIEN GLORY MANANA',
      cvv: '456'
    },
  ]);
  
  const handleAddCard = () => {
    toast({
      title: "Add New Card",
      description: "Card application process will start soon",
    });
  };
  
  const toggleFreezeCard = (cardId: string) => {
    setCards(cards.map(card => {
      if (card.id === cardId) {
        const newFrozenState = !card.frozen;
        toast({
          title: newFrozenState ? "Card Frozen" : "Card Unfrozen",
          description: newFrozenState 
            ? "Your card has been temporarily frozen" 
            : "Your card is now active again",
        });
        return { ...card, frozen: newFrozenState };
      }
      return card;
    }));
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background pb-20">
      <div className="container max-w-md mx-auto p-4">
        <PivotaHeader title="Cards" />
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="physical">Physical Cards</TabsTrigger>
            <TabsTrigger value="virtual">Virtual Cards</TabsTrigger>
          </TabsList>
          
          <TabsContent value="physical" className="mt-4">
            <div className="flex flex-col gap-6">
              {cards.map((card) => (
                <div key={card.id} className="relative">
                  <div className={`bg-gradient-to-br ${card.color} text-white rounded-xl p-5 h-52 relative overflow-hidden shadow-lg border border-white/10 flex flex-col justify-between`}>
                    {card.frozen && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg text-center">
                          <Lock size={24} className="mx-auto mb-2" />
                          <p className="font-bold">Card Frozen</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Card background decorative elements */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute w-[300px] h-[300px] rounded-full bg-white/5 -right-20 -top-32" />
                      <div className="absolute w-[200px] h-[200px] rounded-full bg-white/5 right-20 top-20" />
                      <div className="absolute w-[250px] h-[250px] rounded-full bg-white/5 -left-40 -bottom-20" />
                    </div>
                    
                    <div className="flex justify-between items-start z-10">
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold">PIVOTA</h3>
                      </div>
                      <div className="h-12 w-12 rounded-full flex items-center justify-center">
                        <img 
                          src="/lovable-uploads/cac4f9d6-8128-47ae-98fe-075b3cd23075.png"
                          alt="Pivota Logo" 
                          className="h-10 w-10 object-contain"
                        />
                      </div>
                    </div>
                    
                    <div className="z-10 my-4">
                      <div className="w-9 h-7 bg-gradient-to-br from-amber-300 to-yellow-600 rounded-md mb-2 overflow-hidden" />
                      <p className="font-mono text-xl tracking-wider">{card.number}</p>
                    </div>
                    
                    <div className="flex justify-between items-end z-10">
                      <div>
                        <p className="text-xs text-white/70">CARD HOLDER</p>
                        <p className="font-mono tracking-wider">{card.holderName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/70">EXPIRES</p>
                        <p className="font-mono tracking-wider">{card.expiryMonth}/{card.expiryYear}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Card className="mt-3">
                    <CardContent className="p-4 bg-gradient-to-b from-white to-gray-50">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Lock size={18} />
                          <span>Freeze Card</span>
                        </div>
                        <Switch 
                          checked={card.frozen}
                          onCheckedChange={() => toggleFreezeCard(card.id)} 
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <Button 
                          variant="outline" 
                          className="w-full flex justify-between items-center"
                        >
                          <div className="flex items-center gap-2">
                            <ShieldCheck size={18} />
                            <span>Card Security</span>
                          </div>
                          <ChevronRight size={18} />
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="w-full flex justify-between items-center"
                        >
                          <div className="flex items-center gap-2">
                            <ShoppingCart size={18} />
                            <span>Transactions</span>
                          </div>
                          <ChevronRight size={18} />
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="w-full flex justify-between items-center"
                        >
                          <div className="flex items-center gap-2">
                            <Globe size={18} />
                            <span>Card Settings</span>
                          </div>
                          <ChevronRight size={18} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
              
              <Button 
                onClick={handleAddCard}
                className="bg-blue-600 text-white flex items-center gap-2"
              >
                <Plus size={18} />
                Request New Card
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="virtual" className="mt-4 text-center p-8">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="p-6 rounded-full bg-muted">
                <CreditCard size={48} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">No Virtual Cards</h3>
              <p className="text-sm text-muted-foreground mb-4">
                You don't have any virtual cards yet. Create one for online purchases and subscriptions.
              </p>
              <Button 
                onClick={handleAddCard}
                className="bg-blue-600 text-white flex items-center gap-2"
              >
                <Plus size={18} />
                Create Virtual Card
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <Card>
          <CardContent className="p-4 bg-gradient-to-b from-white to-gray-50">
            <h4 className="font-semibold mb-3">Card Benefits</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-full text-blue-600 mt-0.5">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <span className="font-medium">Secure Transactions</span>
                  <p className="text-muted-foreground">Enhanced security with 3D Secure and biometric authentication</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-full text-blue-600 mt-0.5">
                  <Globe size={16} />
                </div>
                <div>
                  <span className="font-medium">Global Acceptance</span>
                  <p className="text-muted-foreground">Use your card anywhere in the world with favorable exchange rates</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-full text-blue-600 mt-0.5">
                  <ShoppingCart size={16} />
                </div>
                <div>
                  <span className="font-medium">Cashback Rewards</span>
                  <p className="text-muted-foreground">Earn up to 2% cashback on all your purchases</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Cards;
