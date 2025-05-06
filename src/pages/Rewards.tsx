
import { useState } from 'react';
import { Gift, Star, Clock, ChevronRight } from 'lucide-react';
import BottomNavigation from '@/components/layout/BottomNavigation';
import PivotaHeader from '@/components/common/PivotaHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

const Rewards = () => {
  const { toast } = useToast();
  const [points] = useState(3250);
  const [tier] = useState('Gold');
  const [nextTier] = useState('Platinum');
  const [nextTierPoints] = useState(5000);
  
  const handleRedeemReward = (name: string) => {
    toast({
      title: "Reward Selected",
      description: `You've selected ${name}. Processing your reward...`,
    });
  };
  
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container max-w-md mx-auto p-4">
        <PivotaHeader title="Rewards" />
        
        <Card className="mb-6 overflow-hidden">
          <div className="bg-gradient-to-br from-yellow-500 to-amber-700 text-white p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-white/80">Current Tier</p>
                <h2 className="text-2xl font-bold flex items-center gap-1">
                  {tier}
                  <Star size={18} fill="white" />
                </h2>
              </div>
              <div className="p-2 bg-white/20 rounded-full">
                <Gift size={24} />
              </div>
            </div>
            
            <div className="mb-1 flex justify-between text-sm">
              <span>Pivota Points</span>
              <span>{points} / {nextTierPoints}</span>
            </div>
            
            <Progress value={(points / nextTierPoints) * 100} className="h-2 mb-2" />
            
            <p className="text-sm">
              You need {nextTierPoints - points} more points to reach {nextTier}
            </p>
          </div>
        </Card>
        
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Available Rewards</h3>
          <Button variant="ghost" size="sm">
            History <ChevronRight size={16} />
          </Button>
        </div>
        
        <div className="space-y-4 mb-6">
          <Card className="overflow-hidden">
            <div className="relative">
              <img 
                src="https://api.dicebear.com/7.x/shapes/svg?seed=reward1" 
                alt="Airtime Reward" 
                className="w-full h-32 object-cover bg-gradient-to-r from-blue-500 to-purple-500"
              />
              <div className="absolute top-3 right-3 bg-primary text-white text-xs px-2 py-1 rounded">
                2000 Points
              </div>
            </div>
            <CardContent className="p-4">
              <h4 className="font-semibold text-lg mb-1">Free Airtime</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Get 5,000 F free airtime for any network of your choice.
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock size={14} className="mr-1" />
                  Expires in 30 days
                </div>
                <Button size="sm" onClick={() => handleRedeemReward("Free Airtime")}>
                  Redeem
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden">
            <div className="relative">
              <img 
                src="https://api.dicebear.com/7.x/shapes/svg?seed=reward2" 
                alt="Data Bundle Reward" 
                className="w-full h-32 object-cover bg-gradient-to-r from-green-500 to-teal-500"
              />
              <div className="absolute top-3 right-3 bg-primary text-white text-xs px-2 py-1 rounded">
                3500 Points
              </div>
            </div>
            <CardContent className="p-4">
              <h4 className="font-semibold text-lg mb-1">Data Bundle</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Get a 10GB data bundle for any network of your choice.
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock size={14} className="mr-1" />
                  Expires in 45 days
                </div>
                <Button size="sm" onClick={() => handleRedeemReward("Data Bundle")}>
                  Redeem
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden">
            <div className="relative">
              <img 
                src="https://api.dicebear.com/7.x/shapes/svg?seed=reward3" 
                alt="Cashback Reward" 
                className="w-full h-32 object-cover bg-gradient-to-r from-amber-500 to-orange-500"
              />
              <div className="absolute top-3 right-3 bg-primary text-white text-xs px-2 py-1 rounded">
                5000 Points
              </div>
            </div>
            <CardContent className="p-4">
              <h4 className="font-semibold text-lg mb-1">Cashback Reward</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Get 10,000 F cashback on your next transaction over 100,000 F.
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock size={14} className="mr-1" />
                  Expires in 60 days
                </div>
                <Button size="sm" onClick={() => handleRedeemReward("Cashback Reward")}>
                  Redeem
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardContent className="p-4">
            <h4 className="font-semibold mb-3">How to Earn Points</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary">1</div>
                <span>Spend 10,000 F to earn 50 points</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary">2</div>
                <span>Refer a friend to earn 500 points</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary">3</div>
                <span>Complete your profile to earn 200 points</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary">4</div>
                <span>Make 5 transactions weekly to earn 100 bonus points</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Rewards;
