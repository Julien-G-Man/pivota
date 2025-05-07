
import { useState } from 'react';
import { ArrowRight, Gift, Share2, CopyIcon, CheckIcon, Award } from 'lucide-react';
import PivotaHeader from '@/components/common/PivotaHeader';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const Rewards = () => {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);
  const referralCode = "PIVOTA2025";
  
  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralCode);
    setIsCopied(true);
    toast({
      title: "Referral Code Copied",
      description: "Your referral code has been copied to clipboard",
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-background pb-20">
      <div className="container max-w-md mx-auto p-4">
        <PivotaHeader title="Rewards & Benefits" />
        
        {/* Points Overview */}
        <Card className="mb-4 overflow-hidden border-none shadow-lg">
          <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-6 py-5 text-white">
            <h2 className="text-xl font-bold mb-1">Pivota Rewards</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">Your points balance</p>
                <p className="text-3xl font-bold">1,250</p>
              </div>
              <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center">
                <Gift size={28} className="text-white" />
              </div>
            </div>
          </div>
          <CardContent className="p-4 bg-white">
            <div className="mb-3">
              <div className="flex justify-between mb-1 items-center">
                <p className="text-sm">Tier progress</p>
                <Badge variant="outline" className="bg-blue-50">Silver</Badge>
              </div>
              <Progress value={65} className="h-2 bg-blue-100" />
            </div>
            <p className="text-xs text-muted-foreground">750 more points to reach Gold tier</p>
          </CardContent>
        </Card>
        
        {/* Referral Program */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 size={18} className="text-blue-600" />
              <span>Refer a Friend</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Invite your friends to Pivota and earn 5,000 points (approx. 5,000 FCFA) for each friend who signs up and makes a transaction.
            </p>
            <div className="flex items-center justify-between p-3 border rounded-lg mb-4">
              <p className="font-medium">{referralCode}</p>
              <Button variant="outline" size="sm" onClick={handleCopyReferral}>
                {isCopied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
                <span className="ml-1">{isCopied ? 'Copied' : 'Copy'}</span>
              </Button>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Share Your Invite Link <ArrowRight size={16} className="ml-2" />
            </Button>
          </CardContent>
        </Card>
        
        {/* Referral Bonus */}
        <Card className="mb-4 border-blue-200 bg-blue-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Award size={18} className="text-blue-600" />
              <span>Referral Bonus</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Get additional rewards when your referred friends remain active on Pivota!
            </p>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-blue-100">
                <div>
                  <h4 className="font-medium text-sm">3 Active Referrals</h4>
                  <p className="text-xs text-muted-foreground">Cash bonus: 15,000 FCFA</p>
                </div>
                <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                  In Progress
                </Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-blue-100">
                <div>
                  <h4 className="font-medium text-sm">10 Active Referrals</h4>
                  <p className="text-xs text-muted-foreground">Cash bonus: 50,000 FCFA</p>
                </div>
                <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                  Milestone
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Benefits */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Your Benefits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h3 className="font-medium">Free Transfers</h3>
                <p className="text-xs text-muted-foreground">3 remaining this month</p>
              </div>
              <Button variant="outline" size="sm">Use</Button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h3 className="font-medium">Cashback</h3>
                <p className="text-xs text-muted-foreground">1% on all transactions</p>
              </div>
              <Button variant="outline" size="sm">View</Button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h3 className="font-medium">Birthday Bonus</h3>
                <p className="text-xs text-muted-foreground">5,000 FCFA in 45 days</p>
              </div>
              <Button variant="outline" size="sm">Info</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Rewards;
