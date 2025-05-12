
import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface PivieAssistantProps {
  initialMessage?: string;
  isOpen?: boolean;
  onClose?: () => void;
  fullScreen?: boolean;
  context?: 'finance' | 'support' | 'general';
}

export function PivieAssistant({
  initialMessage = "Hello! I'm Pivie, your financial assistant. How can I help you today?",
  isOpen = false,
  onClose,
  fullScreen = false,
  context = 'general'
}: PivieAssistantProps) {
  const [visible, setVisible] = useState(isOpen);
  const [messages, setMessages] = useState([
    { id: 1, text: initialMessage, sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const { toast } = useToast();

  const handleOpen = () => setVisible(true);
  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages([...messages, { id: Date.now(), text: input, sender: 'user' }]);
    
    // Get AI response based on context and user input
    let response;
    const userInput = input.toLowerCase();

    if (context === 'finance') {
      if (userInput.includes('spend') || userInput.includes('budget')) {
        response = "Based on your spending patterns, you're spending 15% more on food this month compared to last month. Would you like to set a budget alert?";
      } else if (userInput.includes('save') || userInput.includes('goal')) {
        response = "I can help you create a savings goal. What are you saving for?";
      } else if (userInput.includes('transfer') || userInput.includes('send money')) {
        response = "To transfer money, you can use the 'Send Money' option on your home screen. Would you like me to guide you through the process?";
      } else if (userInput.includes('account') || userInput.includes('balance')) {
        response = "Your current balance is 15,000,000 FCFA. You have increased your balance by 5% since last month. Great job saving!";
      } else if (userInput.includes('card') || userInput.includes('credit')) {
        response = "You can manage your cards in the Cards section. Would you like to see your card details or apply for a new card?";
      } else if (userInput.includes('bill') || userInput.includes('payment')) {
        response = "You have 3 upcoming bill payments this month. Would you like to review them or schedule a new payment?";
      } else {
        response = "I can help you manage your finances better. You can ask me about your spending, savings goals, transfers, account balance, or bill payments. What specific information are you looking for?";
      }
    } else if (context === 'support') {
      if (userInput.includes('problem') || userInput.includes('issue')) {
        response = "I'm sorry to hear you're experiencing an issue. Could you please describe it in more detail so I can help you better?";
      } else if (userInput.includes('pin') || userInput.includes('password')) {
        response = "To reset your PIN, go to Profile > Security > Reset PIN. You'll receive an OTP on your registered phone number.";
      } else if (userInput.includes('human') || userInput.includes('agent')) {
        response = "I'll connect you to a customer support agent. Please hold on while I transfer your chat.";
      } else {
        response = "I'm here to help with any questions or issues you might have. Feel free to ask about account issues, security, transactions, or connect with a human agent if needed.";
      }
    } else {
      if (userInput.includes('hello') || userInput.includes('hi')) {
        response = "Hello! How can I assist you with Pivota today?";
      } else if (userInput.includes('feature') || userInput.includes('can you')) {
        response = "I can help you with transactions, account information, financial advice, and navigating through Pivota. What would you like assistance with?";
      } else if (userInput.includes('help') || userInput.includes('how to')) {
        response = "I'm here to help! You can ask me about sending money, checking balances, managing cards, or any other Pivota feature.";
      } else {
        response = "I'm Pivie, your personal assistant for Pivota. I can provide insights about your financial habits, help manage your money better, or answer questions about Pivota features. How can I assist you?";
      }
    }

    // Add bot response after a short delay
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now(), text: response, sender: 'bot' }]);
    }, 800);

    setInput('');
  };

  if (!visible && !fullScreen) {
    return (
      <Button 
        onClick={handleOpen}
        className="fixed bottom-20 right-4 h-12 w-12 rounded-full shadow-lg bg-primary"
      >
        <MessageCircle className="h-6 w-6 text-white" />
        <span className="sr-only">Open Pivie Assistant</span>
      </Button>
    );
  }

  return (
    <div className={`${fullScreen ? '' : 'fixed bottom-20 right-4 w-80'} z-50`}>
      <Card className="overflow-hidden shadow-lg border-primary/10">
        <CardHeader className="bg-primary p-3 flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8 bg-primary-foreground">
              <AvatarImage src="/lovable-uploads/ab8d5fef-5952-443a-becb-12a55e92d46a.png" />
              <AvatarFallback className="bg-primary-foreground text-primary">PI</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-white text-sm">Pivie Assistant</h3>
              <p className="text-primary-foreground/80 text-xs">Pivota AI</p>
            </div>
          </div>
          {!fullScreen && (
            <Button variant="ghost" size="icon" onClick={handleClose} className="text-white hover:text-white/80 hover:bg-primary-light">
              <X size={18} />
              <span className="sr-only">Close</span>
            </Button>
          )}
        </CardHeader>
        
        <CardContent className="max-h-96 overflow-y-auto p-3 bg-background">
          <div className="flex flex-col gap-3">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`p-3 rounded-lg max-w-[85%] ${
                    message.sender === 'user' 
                      ? 'bg-primary text-white' 
                      : 'bg-muted'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="border-t p-2">
          <div className="flex w-full gap-2">
            <Input 
              placeholder="Type your message..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="sm">Send</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
