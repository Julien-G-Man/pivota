
import { useState } from 'react';
import { ChevronRight, Send, TrendingUp, BarChart3, LineChart, PieChart, MessageCircle, HelpCircle, UserRound } from 'lucide-react';
import BottomNavigation from '@/components/layout/BottomNavigation';
import PivotaHeader from '@/components/common/PivotaHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

const InvestmentAdvisor = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'bot',
      text: "Hello! I'm Mona, your AI financial advisor. Based on your spending habits and market trends, I can provide personalized investment advice."
    },
    {
      sender: 'bot',
      text: 'How can I help you with your investments today?'
    },
    {
      sender: 'user',
      text: 'What investments should I make with my savings?'
    },
    {
      sender: 'bot',
      text: 'Based on your spending patterns, you have potential to save an additional 115,000 FCFA monthly. I recommend allocating 60% to low-risk bonds, 30% to mutual funds, and 10% to emerging tech stocks for growth potential.'
    },
  ]);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    // Add user message
    setChatMessages([...chatMessages, { sender: 'user', text: chatInput }]);
    
    // Simulate AI response
    setTimeout(() => {
      let response = '';
      
      if (chatInput.toLowerCase().includes('diversify')) {
        response = 'For optimal diversification, I recommend a mix of 40% government bonds, 30% mutual funds, 20% blue-chip stocks, and 10% in emerging markets. This balanced approach provides stability while allowing for growth.';
      } else if (chatInput.toLowerCase().includes('low-risk')) {
        response = 'The best low-risk investments currently include government bonds (3.5% annual return), high-yield savings accounts (2.8%), and AAA-rated corporate bonds (4.2%). These provide stable returns with minimal volatility.';
      } else if (chatInput.toLowerCase().includes('spending')) {
        response = 'Based on your transaction history, you spend approximately 20% of your income on non-essentials. By reducing this to 15%, you could invest an additional 75,000 FCFA monthly, potentially yielding 900,000 FCFA annually with compound growth.';
      } else {
        response = 'Based on your financial profile, I recommend exploring government bonds for stability and selected tech stocks for growth. Would you like me to provide specific investment options based on your risk tolerance?';
      }
      
      setChatMessages((prev) => [...prev, { sender: 'bot', text: response }]);
    }, 1000);
    
    setChatInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-background pb-20">
      <div className="container max-w-md mx-auto p-4">
        <PivotaHeader title="Investment Advisor" />

        <Card className="mb-6 overflow-hidden shadow-lg border-none">
          <div className="bg-gradient-to-r from-blue-700 to-blue-600 p-6 text-white">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 rounded-full">
                <TrendingUp size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Investment Portfolio</h2>
                <p className="opacity-80">Your investments are growing steadily</p>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-sm opacity-70">Total Portfolio Value</p>
              <p className="text-3xl font-bold">2,500,000.00 FCFA</p>
              <div className="flex items-center mt-1">
                <span className="text-green-300">↑ 12.4%</span>
                <span className="text-xs ml-2 opacity-70">past 30 days</span>
              </div>
            </div>
          </div>
        </Card>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="advisor">AI Advisor</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Investment Summary</CardTitle>
              </CardHeader>
              <CardContent className="bg-gradient-to-b from-white to-blue-50">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 hover:bg-blue-50 rounded-lg transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <BarChart3 size={18} className="text-blue-700" />
                      </div>
                      <div>
                        <h3 className="font-medium">Stocks</h3>
                        <p className="text-xs text-muted-foreground">7 companies</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">1,200,000.00 FCFA</p>
                      <p className="text-xs text-green-600">+5.2%</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 hover:bg-blue-50 rounded-lg transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <LineChart size={18} className="text-blue-700" />
                      </div>
                      <div>
                        <h3 className="font-medium">Mutual Funds</h3>
                        <p className="text-xs text-muted-foreground">2 funds</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">800,000.00 FCFA</p>
                      <p className="text-xs text-green-600">+3.7%</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 hover:bg-blue-50 rounded-lg transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <PieChart size={18} className="text-blue-700" />
                      </div>
                      <div>
                        <h3 className="font-medium">Bonds</h3>
                        <p className="text-xs text-muted-foreground">Government bonds</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">500,000.00 FCFA</p>
                      <p className="text-xs text-green-600">+1.5%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Button 
              onClick={() => setActiveTab('advisor')} 
              className="w-full bg-blue-700 hover:bg-blue-800"
            >
              Get Investment Advice
            </Button>
          </TabsContent>
          
          <TabsContent value="insights" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Market Insights</CardTitle>
              </CardHeader>
              <CardContent className="bg-gradient-to-b from-white to-blue-50">
                <div className="space-y-4">
                  <div className="p-3 border border-blue-100 rounded-lg bg-white">
                    <h3 className="font-medium mb-1">Market Trends</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      The market has shown positive trends over the past quarter with technology and financial sectors leading the way.
                    </p>
                    <Button variant="outline" size="sm" className="w-full flex justify-between items-center">
                      <span>View Detailed Analysis</span>
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                  
                  <div className="p-3 border border-blue-100 rounded-lg bg-white">
                    <h3 className="font-medium mb-1">Investment Opportunities</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Consider diversifying into emerging markets and renewable energy sectors for potential high returns.
                    </p>
                    <Button variant="outline" size="sm" className="w-full flex justify-between items-center">
                      <span>Explore Opportunities</span>
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Button 
              onClick={() => setActiveTab('advisor')} 
              className="w-full bg-blue-700 hover:bg-blue-800"
            >
              Ask Mona AI for Advice
            </Button>
          </TabsContent>
          
          <TabsContent value="advisor" className="space-y-4">
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-700 to-blue-600 text-white">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10 border-2 border-white/20 bg-blue-300">
                    <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=Mona" />
                    <AvatarFallback>
                      <MessageCircle className="text-blue-700" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Mona AI Advisor</CardTitle>
                    <p className="text-xs text-white/80">Your personal finance expert</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-64 overflow-y-auto p-4 bg-gradient-to-b from-white to-blue-50">
                  <div className="flex flex-col space-y-4">
                    {chatMessages.map((message, index) => (
                      <div 
                        key={index} 
                        className={`${message.sender === 'bot' 
                          ? 'bg-blue-100 self-start' 
                          : 'bg-blue-600 text-white self-end'
                        } p-3 rounded-lg max-w-[80%]`}
                      >
                        <p className="text-sm">{message.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-3 border-t border-gray-200 bg-white">
                  <div className="flex items-center space-x-2">
                    <Input 
                      placeholder="Ask Mona about investments..." 
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button 
                      size="icon" 
                      onClick={handleSendMessage}
                      className="bg-blue-700"
                    >
                      <Send size={18} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 bg-gradient-to-b from-white to-blue-50">
                <h3 className="font-medium mb-2 flex items-center">
                  <HelpCircle size={16} className="mr-1 text-blue-700" />
                  Suggested Questions
                </h3>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-sm text-left h-auto p-3"
                    onClick={() => {
                      setChatInput("How should I diversify my investments?");
                      setTimeout(handleSendMessage, 100);
                    }}
                  >
                    How should I diversify my investments?
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-sm text-left h-auto p-3"
                    onClick={() => {
                      setChatInput("What are the best low-risk investments?");
                      setTimeout(handleSendMessage, 100);
                    }}
                  >
                    What are the best low-risk investments?
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-sm text-left h-auto p-3"
                    onClick={() => {
                      setChatInput("Can you analyze my spending patterns?");
                      setTimeout(handleSendMessage, 100);
                    }}
                  >
                    Can you analyze my spending patterns?
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default InvestmentAdvisor;
