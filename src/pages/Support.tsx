
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Support = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m Mona, your virtual assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setInput('');
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(input),
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (userInput: string): string => {
    // Simple bot responses based on keywords
    const input = userInput.toLowerCase();
    
    if (input.includes('hello') || input.includes('hi')) {
      return 'Hello! How can I assist you with Pivota today?';
    } else if (input.includes('transfer') || input.includes('send money')) {
      return 'To make a transfer, tap on the "To Bank" or "To Pivota" options on the home page. Would you like me to guide you through the process?';
    } else if (input.includes('account') || input.includes('balance')) {
      return 'Your account balance is displayed on the home page. If you can\'t see it, please make sure you\'re logged in or refresh the page.';
    } else if (input.includes('fee') || input.includes('charge')) {
      return 'Pivota charges a nominal fee for transfers to other banks. Transfers between Pivota accounts are free.';
    } else if (input.includes('problem') || input.includes('issue') || input.includes('help')) {
      return 'I\'m sorry to hear you\'re having issues. Could you please describe the problem in more detail so I can assist you better?';
    } else {
      return 'I\'m still learning! For specific assistance, please describe your question in detail or contact our customer support team.';
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container max-w-md mx-auto p-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 mr-3 rounded-full hover:bg-muted/80 transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold">Chat with Mona</h1>
          </div>
          
          <Avatar className="h-10 w-10 border border-primary/20">
            <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=Mona" />
            <AvatarFallback>M</AvatarFallback>
          </Avatar>
        </div>
        
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'bot' && (
                <Avatar className="h-8 w-8 mr-2 flex-shrink-0">
                  <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=Mona" />
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
              )}
              
              <div
                className={`py-2 px-4 rounded-lg max-w-[80%] ${
                  message.sender === 'user' 
                    ? 'bg-primary text-white rounded-tr-none'
                    : 'bg-muted rounded-tl-none'
                }`}
              >
                <p>{message.text}</p>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              
              {message.sender === 'user' && (
                <Avatar className="h-8 w-8 ml-2 flex-shrink-0">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Input 
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage}>
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Support;
