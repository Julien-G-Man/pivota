
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, QrCode, Lightbulb, Languages, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  language?: 'en' | 'fr' | 'ln';
}

interface SuggestedQuestion {
  id: string;
  text: string;
}

const Support = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const [activeLanguage, setActiveLanguage] = useState<'en' | 'fr' | 'ln'>('en');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: activeLanguage === 'en' 
        ? 'Hello! I\'m Mona, your virtual assistant. How can I help you today?' 
        : activeLanguage === 'fr'
        ? 'Bonjour! Je suis Mona, votre assistante virtuelle. Comment puis-je vous aider aujourd\'hui?'
        : 'Mbote! Ngai Mona, mosungi na yo ya digital. Nakoki kosalisa yo lelo?',
      sender: 'bot',
      timestamp: new Date(),
      language: activeLanguage
    },
  ]);

  const suggestedQuestions: SuggestedQuestion[] = [
    { id: '1', text: 'How do I reset my PIN?' },
    { id: '2', text: 'How to transfer money to a friend?' },
    { id: '3', text: 'Where can I see my transaction history?' },
    { id: '4', text: 'How do I add money to my account?' }
  ];

  const suggestedQuestionsFr: SuggestedQuestion[] = [
    { id: '1', text: 'Comment réinitialiser mon code PIN?' },
    { id: '2', text: 'Comment transférer de l\'argent à un ami?' },
    { id: '3', text: 'Où puis-je voir mon historique de transactions?' },
    { id: '4', text: 'Comment ajouter de l\'argent à mon compte?' }
  ];

  const suggestedQuestionsLn: SuggestedQuestion[] = [
    { id: '1', text: 'Ndenge nini nakoki kobongisa PIN na ngai?' },
    { id: '2', text: 'Ndenge nini natinda mbongo epai ya moninga?' },
    { id: '3', text: 'Esika nini nakoki komona historique ya transactions na ngai?' },
    { id: '4', text: 'Ndenge nini nakoki kobakisa mbongo na compte na ngai?' }
  ];

  useEffect(() => {
    // Scroll to bottom when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // Change language of initial message when language changes
    const initialMessage = messages[0];
    if (initialMessage && initialMessage.sender === 'bot' && initialMessage.language !== activeLanguage) {
      const updatedMessage = {
        ...initialMessage,
        text: activeLanguage === 'en' 
          ? 'Hello! I\'m Mona, your virtual assistant. How can I help you today?' 
          : activeLanguage === 'fr'
          ? 'Bonjour! Je suis Mona, votre assistante virtuelle. Comment puis-je vous aider aujourd\'hui?'
          : 'Mbote! Ngai Mona, mosungi na yo ya digital. Nakoki kosalisa yo lelo?',
        language: activeLanguage
      };
      
      setMessages([updatedMessage, ...messages.slice(1)]);
    }
  }, [activeLanguage]);

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
        text: getBotResponse(input, activeLanguage),
        sender: 'bot',
        timestamp: new Date(),
        language: activeLanguage
      };
      
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleSuggestedQuestion = (question: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: question,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(question, activeLanguage),
        sender: 'bot',
        timestamp: new Date(),
        language: activeLanguage
      };
      
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (userInput: string, language: 'en' | 'fr' | 'ln'): string => {
    // Simple bot responses based on keywords and language
    const input = userInput.toLowerCase();
    
    if (language === 'en') {
      if (input.includes('hello') || input.includes('hi')) {
        return 'Hello! How can I assist you with Pivota today?';
      } else if (input.includes('reset') && input.includes('pin')) {
        return 'To reset your PIN, go to Profile > Security > Reset PIN. You will receive an OTP on your registered mobile number.';
      } else if ((input.includes('transfer') || input.includes('send money')) && input.includes('friend')) {
        return 'To transfer money to a friend, tap on "To Pivota" on the home page or use the QR code option. You\'ll need their Pivota ID or phone number.';
      } else if (input.includes('transaction') && input.includes('history')) {
        return 'You can view your transaction history by tapping on the History tab in the bottom navigation.';
      } else if (input.includes('add money')) {
        return 'To add money to your account, tap the "+ Add Money" button on the home page and follow the instructions.';
      } else if (input.includes('account') || input.includes('balance')) {
        return 'Your account balance is displayed on the home page. If you can\'t see it, please make sure you\'re logged in or refresh the page.';
      } else if (input.includes('fee') || input.includes('charge')) {
        return 'Pivota charges a nominal fee for transfers to other banks. Transfers between Pivota accounts are free.';
      } else if (input.includes('problem') || input.includes('issue') || input.includes('help')) {
        return 'I\'m sorry to hear you\'re having issues. Could you please describe the problem in more detail so I can assist you better?';
      } else {
        return 'I\'m still learning! For specific assistance, please describe your question in detail or contact our customer support team.';
      }
    } else if (language === 'fr') {
      if (input.includes('bonjour') || input.includes('salut')) {
        return 'Bonjour! Comment puis-je vous aider avec Pivota aujourd\'hui?';
      } else if (input.includes('réinitialiser') && input.includes('pin')) {
        return 'Pour réinitialiser votre code PIN, allez dans Profil > Sécurité > Réinitialiser PIN. Vous recevrez un OTP sur votre numéro de téléphone enregistré.';
      } else if ((input.includes('transférer') || input.includes('envoyer')) && (input.includes('argent') || input.includes('ami'))) {
        return 'Pour transférer de l\'argent à un ami, appuyez sur "Vers Pivota" sur la page d\'accueil ou utilisez l\'option code QR. Vous aurez besoin de leur identifiant Pivota ou de leur numéro de téléphone.';
      } else if ((input.includes('transaction') || input.includes('historique'))) {
        return 'Vous pouvez consulter votre historique de transactions en appuyant sur l\'onglet Historique dans la navigation inférieure.';
      } else if (input.includes('ajouter') && input.includes('argent')) {
        return 'Pour ajouter de l\'argent à votre compte, appuyez sur le bouton "+ Ajouter de l\'argent" sur la page d\'accueil et suivez les instructions.';
      } else {
        return 'Je suis encore en apprentissage! Pour une assistance spécifique, veuillez décrire votre question en détail ou contacter notre équipe de support client.';
      }
    } else { // Lingala
      if (input.includes('mbote')) {
        return 'Mbote! Nakoki kosalisa yo ndenge nini na Pivota lelo?';
      } else if ((input.includes('pin') || input.includes('code'))) {
        return 'Mpo na kobongisa PIN na yo, kende na Profil > Sécurité > Kobongisa PIN. Okozua OTP na numéro ya téléphone na yo oyo ekomami.';
      } else if (input.includes('mbongo') || input.includes('transaction')) {
        return 'Okoki kotala historique ya transactions na yo na kokota na onglet Histoire na se ya écran.';
      } else {
        return 'Nazali kaka koyekola! Mpo na lisalisi ya sika, svp pesa détails ya motuna na yo to benga équipe na biso ya support client.';
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container max-w-md mx-auto p-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-4">
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
        
        {/* Language selector */}
        <div className="mb-4">
          <Tabs defaultValue="en" value={activeLanguage} onValueChange={(value) => setActiveLanguage(value as 'en' | 'fr' | 'ln')}>
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="en">English</TabsTrigger>
              <TabsTrigger value="fr">Français</TabsTrigger>
              <TabsTrigger value="ln">Lingala</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Feature Cards */}
        <div className="mb-4 grid grid-cols-2 gap-2">
          <Card className="p-3 flex flex-col items-center hover:bg-muted/30 transition-colors cursor-pointer">
            <Languages size={18} className="mb-1 text-primary" />
            <span className="text-xs text-center">
              {activeLanguage === 'en' ? 'Multilingual Support' : 
               activeLanguage === 'fr' ? 'Support Multilingue' : 
               'Lisalisi na Minoko Ebele'}
            </span>
          </Card>
          <Card className="p-3 flex flex-col items-center hover:bg-muted/30 transition-colors cursor-pointer">
            <BarChart3 size={18} className="mb-1 text-primary" />
            <span className="text-xs text-center">
              {activeLanguage === 'en' ? 'Financial Insights' : 
               activeLanguage === 'fr' ? 'Analyses Financières' : 
               'Boyebi ya Mbongo'}
            </span>
          </Card>
        </div>
        
        {/* Chat messages */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto mb-4 space-y-4 max-h-[50vh]"
        >
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

        {/* Suggested questions */}
        <div className="mb-4 grid grid-cols-2 gap-2">
          {(activeLanguage === 'en' ? suggestedQuestions : 
            activeLanguage === 'fr' ? suggestedQuestionsFr : 
            suggestedQuestionsLn).map((question) => (
            <Button 
              key={question.id} 
              variant="outline" 
              className="text-xs h-auto py-2 text-left justify-start"
              onClick={() => handleSuggestedQuestion(question.text)}
            >
              <Lightbulb size={14} className="mr-1 text-primary" />
              {question.text}
            </Button>
          ))}
        </div>
        
        {/* Input area */}
        <div className="flex gap-2">
          <Input 
            type="text"
            placeholder={
              activeLanguage === 'en' ? "Type a message..." : 
              activeLanguage === 'fr' ? "Écrivez un message..." : 
              "Koma message..."
            }
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
