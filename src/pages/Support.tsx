
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, MessageCircle, Lightbulb, Languages, BarChart3, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import BottomNavigation from '@/components/layout/BottomNavigation';

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

interface FinancialInsight {
  category: string;
  percentage: number;
  amount: number;
  trend: 'up' | 'down' | 'stable';
}

const Support = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const [activeLanguage, setActiveLanguage] = useState<'en' | 'fr' | 'ln'>('en');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showHumanSupport, setShowHumanSupport] = useState(false);
  
  // Mock financial insights data
  const mockFinancialInsights: FinancialInsight[] = [
    { category: 'Food', percentage: 32, amount: 156000, trend: 'up' },
    { category: 'Transport', percentage: 18, amount: 87500, trend: 'down' },
    { category: 'Entertainment', percentage: 15, amount: 73000, trend: 'stable' },
    { category: 'Utilities', percentage: 10, amount: 48500, trend: 'down' },
    { category: 'Shopping', percentage: 25, amount: 121500, trend: 'up' },
  ];
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: activeLanguage === 'en' 
        ? 'Hello! I\'m Pivie, your virtual assistant. How can I help you today?' 
        : activeLanguage === 'fr'
        ? 'Bonjour! Je suis Pivie, votre assistante virtuelle. Comment puis-je vous aider aujourd\'hui?'
        : 'Mbote! Ngai Pivie, mosungi na yo ya digital. Nakoki kosalisa yo lelo?',
      sender: 'bot',
      timestamp: new Date(),
      language: activeLanguage
    },
  ]);

  const suggestedQuestions: SuggestedQuestion[] = [
    { id: '1', text: 'How do I reset my PIN?' },
    { id: '2', text: 'How are my finances doing this month?' },
    { id: '3', text: 'Connect me with a human agent' },
    { id: '4', text: 'Show me my spending habits' }
  ];

  const suggestedQuestionsFr: SuggestedQuestion[] = [
    { id: '1', text: 'Comment réinitialiser mon code PIN?' },
    { id: '2', text: 'Comment vont mes finances ce mois-ci?' },
    { id: '3', text: 'Connectez-moi avec un agent humain' },
    { id: '4', text: 'Montrez-moi mes habitudes de dépenses' }
  ];

  const suggestedQuestionsLn: SuggestedQuestion[] = [
    { id: '1', text: 'Ndenge nini nakoki kobongisa PIN na ngai?' },
    { id: '2', text: 'Mbongo na ngai ezali kotambola ndenge nini na sanza oyo?' },
    { id: '3', text: 'Bokeisa ngai na moto ya véritable' },
    { id: '4', text: 'Talisa ngai ndenge nazali kobimisa mbongo' }
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
          ? 'Hello! I\'m Pivie, your virtual assistant. How can I help you today?' 
          : activeLanguage === 'fr'
          ? 'Bonjour! Je suis Pivie, votre assistante virtuelle. Comment puis-je vous aider aujourd\'hui?'
          : 'Mbote! Ngai Pivie, mosungi na yo ya digital. Nakoki kosalisa yo lelo?',
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
      
      // Check if user wants to speak to a human
      if (input.toLowerCase().includes("human") || 
          input.toLowerCase().includes("agent") || 
          input.toLowerCase().includes("person")) {
        setShowHumanSupport(true);
      }
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
      
      // Check if user wants to speak to a human
      if (question.toLowerCase().includes("human") || 
          question.toLowerCase().includes("agent") || 
          question.toLowerCase().includes("connect")) {
        setShowHumanSupport(true);
      }
    }, 1000);
  };
  
  const generateFinancialInsightResponse = (language: 'en' | 'fr' | 'ln'): string => {
    // Get the top spending category
    const topCategory = [...mockFinancialInsights].sort((a, b) => b.percentage - a.percentage)[0];
    
    // Calculate the total spent
    const totalSpent = mockFinancialInsights.reduce((sum, insight) => sum + insight.amount, 0);
    
    // Format currency
    const formatCurrency = (amount: number) => {
      return `${amount.toLocaleString()} F`;
    };
    
    if (language === 'en') {
      return `Based on your transaction history, here's your financial summary for this month:
      
      • You've spent a total of ${formatCurrency(totalSpent)}
      • Your highest spending category is ${topCategory.category} at ${topCategory.percentage}% (${formatCurrency(topCategory.amount)})
      • Transport spending is down 7% compared to last month
      • Food spending is up 3.5% compared to last month
      
      Suggestion: Consider reducing spending on ${topCategory.category} by setting a budget alert. Would you like me to set that up for you?`;
    } else if (language === 'fr') {
      return `Selon votre historique de transactions, voici votre résumé financier pour ce mois-ci:
      
      • Vous avez dépensé un total de ${formatCurrency(totalSpent)}
      • Votre catégorie de dépenses la plus élevée est ${topCategory.category} à ${topCategory.percentage}% (${formatCurrency(topCategory.amount)})
      • Les dépenses de transport ont diminué de 7% par rapport au mois dernier
      • Les dépenses alimentaires ont augmenté de 3,5% par rapport au mois dernier
      
      Suggestion: Envisagez de réduire vos dépenses en ${topCategory.category} en définissant une alerte budgétaire. Voulez-vous que je configure cela pour vous?`;
    } else {
      return `Kolanda historique ya transactions na yo, tala résumé ya financier po na sanza oyo:
      
      • Osili kobimisa total ya ${formatCurrency(totalSpent)}
      • Catégorie oyo obimisi mingi ezali ${topCategory.category} na ${topCategory.percentage}% (${formatCurrency(topCategory.amount)})
      • Mbongo ya transport ekiti na 7% par rapport na sanza eleki
      • Mbongo ya bilei emataki na 3,5% par rapport na sanza eleki
      
      Conseil: Tia likebi na ${topCategory.category} po na kokitisa mbongo oyo ozali kobimisa. Olingi natia alerte po na yo?`;
    }
  };

  const getBotResponse = (userInput: string, language: 'en' | 'fr' | 'ln'): string => {
    // Simple bot responses based on keywords and language
    const input = userInput.toLowerCase();
    
    // Check for financial advice questions
    if (input.includes('finances') || 
        input.includes('spending') || 
        input.includes('expenditure') ||
        input.includes('budget') || 
        input.includes('money') || 
        input.includes('finance') ||
        input.includes('financial') || 
        input.includes('habitudes') ||
        input.includes('depenses') ||
        input.includes('invest') ||
        input.includes('investent') ||
        input.includes('mbongo')) {
      return generateFinancialInsightResponse(language);
    }
    
    // Check for human support request
    if (input.includes('human') || 
        input.includes('agent') || 
        input.includes('person') || 
        input.includes('connect') ||
        input.includes('humain') ||
        input.includes('moto')) {
      if (language === 'en') {
        return "I'll connect you with a human agent right away. Please hold on while I transfer you to our support team.";
      } else if (language === 'fr') {
        return "Je vais vous connecter à un agent humain tout de suite. Veuillez patienter pendant que je vous transfère à notre équipe de support.";
      } else {
        return "Nakotia yo na relation na moto ya véritable sikoyo. Zela mwa moke tango nazali kotia yo en contact na équipe na biso.";
      }
    }
    
    if (language === 'en') {
      if (input.includes('hello') || input.includes('hi') || input.includes('good')) {
        return 'Hello! I\'m Pivie, your personal finance AI assistant. How can I assist you with Pivota today?';
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
        return 'I\'m sorry to hear you\'re having issues. Could you please describe the problem in more detail so I can assist you better? Or would you prefer to speak with a human agent?';
      } else {
        return 'I\'m here to help with any questions about your account, transactions, financial advice, or connecting you to human support. How can I assist you today?';
      }
    } else if (language === 'fr') {
      if (input.includes('bonjour') || input.includes('salut')) {
        return 'Bonjour! Je m\'appelle Pivie, votre assistant IA en finances personnelles. Comment puis-je vous aider avec Pivota aujourd\'hui?';
      } else if (input.includes('réinitialiser') && input.includes('pin')) {
        return 'Pour réinitialiser votre code PIN, allez dans Profil > Sécurité > Réinitialiser PIN. Vous recevrez un OTP sur votre numéro de téléphone enregistré.';
      } else if ((input.includes('transférer') || input.includes('envoyer')) && (input.includes('argent') || input.includes('ami'))) {
        return 'Pour transférer de l\'argent à un ami, appuyez sur "Vers Pivota" sur la page d\'accueil ou utilisez l\'option code QR. Vous aurez besoin de leur identifiant Pivota ou de leur numéro de téléphone.';
      } else if ((input.includes('transaction') || input.includes('historique'))) {
        return 'Vous pouvez consulter votre historique de transactions en appuyant sur l\'onglet Historique dans la navigation inférieure.';
      } else if (input.includes('ajouter') && input.includes('argent')) {
        return 'Pour ajouter de l\'argent à votre compte, appuyez sur le bouton "+ Ajouter de l\'argent" sur la page d\'accueil et suivez les instructions.';
      } else {
        return 'Je suis là pour vous aider avec toutes vos questions concernant votre compte, vos transactions, des conseils financiers, ou pour vous connecter à un support humain. Comment puis-je vous aider aujourd\'hui?';
      }
    } else { // Lingala
      if (input.includes('mbote')) {
        return 'Mbote! Nakoki kosalisa yo ndenge nini na Pivota lelo?';
      } else if ((input.includes('pin') || input.includes('code'))) {
        return 'Mpo na kobongisa PIN na yo, kende na Profil > Sécurité > Kobongisa PIN. Okozua OTP na numéro ya téléphone na yo oyo ekomami.';
      } else if (input.includes('mbongo') || input.includes('transaction')) {
        return 'Okoki kotala historique ya transactions na yo na kokota na onglet Histoire na se ya écran.';
      } else {
        return 'Nazali awa mpo na kosalisa yo na mituna nyonso na yo etaleli compte na yo, transactions, conseil ya finance, to po na kokutanisa yo na moto ya véritable. Nakoki kosalisa yo ndenge nini lelo?';
      }
    }
  };

  const handleCloseHumanSupport = () => {
    setShowHumanSupport(false);
    
    // Add a message to inform the user
    const botResponse: Message = {
      id: Date.now().toString(),
      text: activeLanguage === 'en' 
        ? "I'm back to assist you. How else can I help?"
        : activeLanguage === 'fr'
        ? "Je suis de retour pour vous aider. Comment puis-je vous aider davantage?"
        : "Nazali lisusu awa po na kosalisa yo. Nini mosusu nakoki kosalisa yo?",
      sender: 'bot',
      timestamp: new Date(),
      language: activeLanguage
    };
    
    setMessages(prev => [...prev, botResponse]);
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
            <h1 className="text-2xl font-bold">Chat with Pivie</h1>
          </div>
          
          <Avatar className="h-10 w-10 border border-primary/20">
            <AvatarImage src="/lovable-uploads/ab8d5fef-5952-443a-becb-12a55e92d46a.png" />
            <AvatarFallback><MessageCircle className="text-primary" /></AvatarFallback>
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
        <div className="mb-4 grid grid-cols-3 gap-2">
          <Card className="p-3 flex flex-col items-center hover:bg-muted/30 transition-colors cursor-pointer">
            <Languages size={18} className="mb-1 text-primary" />
            <span className="text-xs text-center">
              {activeLanguage === 'en' ? 'Multilingual' : 
               activeLanguage === 'fr' ? 'Multilingue' : 
               'Minoko Ebele'}
            </span>
          </Card>
          <Card className="p-3 flex flex-col items-center hover:bg-muted/30 transition-colors cursor-pointer">
            <BarChart3 size={18} className="mb-1 text-primary" />
            <span className="text-xs text-center">
              {activeLanguage === 'en' ? 'Finance Tips' : 
               activeLanguage === 'fr' ? 'Conseils' : 
               'Batoli Mbongo'}
            </span>
          </Card>
          <Card className="p-3 flex flex-col items-center hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => setShowHumanSupport(true)}>
            <UserRound size={18} className="mb-1 text-primary" />
            <span className="text-xs text-center">
              {activeLanguage === 'en' ? 'Human Help' : 
               activeLanguage === 'fr' ? 'Agent Humain' : 
               'Moto ya Solo'}
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
                  <AvatarFallback><MessageCircle className="text-primary" /></AvatarFallback>
                </Avatar>
              )}
              
              <div
                className={`py-2 px-4 rounded-lg max-w-[80%] ${
                  message.sender === 'user' 
                    ? 'bg-primary text-white rounded-tr-none'
                    : 'bg-muted rounded-tl-none'
                }`}
              >
                <p className="whitespace-pre-line">{message.text}</p>
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

        {/* Human Support Modal */}
        {showHumanSupport && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md animate-fade-in">
              <CardContent className="p-6 flex flex-col items-center">
                <Avatar className="h-16 w-16 mb-4">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Support" />
                  <AvatarFallback>CS</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold mb-2">Human Support</h3>
                <p className="text-center text-muted-foreground mb-6">
                  {activeLanguage === 'en' 
                    ? "A customer support agent will be with you shortly. Average wait time: 2 minutes."
                    : activeLanguage === 'fr'
                    ? "Un agent de support client sera avec vous sous peu. Temps d'attente moyen: 2 minutes."
                    : "Moto ya support akoya sikoyo. Temps d'attente: miniti 2."}
                </p>
                <div className="flex items-center justify-center w-full space-x-2">
                  <Button variant="outline" onClick={handleCloseHumanSupport}>
                    {activeLanguage === 'en' ? "Cancel" : activeLanguage === 'fr' ? "Annuler" : "Kotika"}
                  </Button>
                  <Button variant="default" onClick={() => {
                    toast({
                      title: activeLanguage === 'en' ? "Support Request Submitted" : activeLanguage === 'fr' ? "Demande de Support Soumise" : "Demande Etindami",
                      description: activeLanguage === 'en' ? "We'll notify you when an agent joins the chat" : activeLanguage === 'fr' ? "Nous vous notifierons quand un agent rejoindra le chat" : "Tokoyebisa yo tango agent akokota na discussion"
                    });
                    handleCloseHumanSupport();
                  }}>
                    {activeLanguage === 'en' ? "Wait for Agent" : activeLanguage === 'fr' ? "Attendre l'Agent" : "Zela Agent"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

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
      <BottomNavigation />
    </div>
  );
};

export default Support;
