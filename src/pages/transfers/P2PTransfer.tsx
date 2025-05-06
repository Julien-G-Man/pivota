
import { useState } from 'react';
import { ArrowLeft, QrCode, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import BottomNavigation from '@/components/layout/BottomNavigation';
import PivotaHeader from '@/components/common/PivotaHeader';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { P2PTransfer as P2PTransferDialog } from '@/components/transfer/P2PTransfer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const P2PTransferPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // Mock recent contacts
  const recentContacts = [
    { id: '1', name: 'Jean Pierre', username: '@jeanp', amount: '1,000', date: '2 days ago', avatarSeed: 'Jean' },
    { id: '2', name: 'Marie Konde', username: '@mariek', amount: '500', date: 'Yesterday', avatarSeed: 'Marie' },
    { id: '3', name: 'Pascal Obiang', username: '@pascalo', amount: '2,500', date: 'Today', avatarSeed: 'Pascal' }
  ];

  // Mock all contacts (more extensive list)
  const allContacts = [
    ...recentContacts,
    { id: '4', name: 'Sophie Morel', username: '@sophiem', amount: '', date: '', avatarSeed: 'Sophie' },
    { id: '5', name: 'Kevin Leclerc', username: '@kevinl', amount: '', date: '', avatarSeed: 'Kevin' },
    { id: '6', name: 'Pauline Diatta', username: '@paulined', amount: '', date: '', avatarSeed: 'Pauline' }
  ];

  const handleQrScan = () => {
    toast({
      title: "QR Scanner",
      description: "QR scanning will be available soon!",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container max-w-md mx-auto p-4">
        <PivotaHeader title="Send to Friend" />
        
        <div className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input 
              placeholder="Search by name or @username" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon" onClick={handleQrScan}>
            <QrCode size={18} />
          </Button>
        </div>
        
        <Tabs defaultValue="recent">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="recent" className="flex-1">Recent</TabsTrigger>
            <TabsTrigger value="all" className="flex-1">All Contacts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recent" className="mt-0">
            <div className="space-y-2">
              {recentContacts.map((contact) => (
                <div 
                  key={contact.id} 
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.avatarSeed}`} />
                      <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-xs text-muted-foreground">{contact.username}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm font-medium">{contact.amount} F</p>
                    <p className="text-xs text-muted-foreground">{contact.date}</p>
                  </div>
                </div>
              ))}
              
              <P2PTransferDialog>
                <Button className="w-full mt-4" size="lg">
                  New Transfer
                </Button>
              </P2PTransferDialog>
            </div>
          </TabsContent>
          
          <TabsContent value="all" className="mt-0">
            <div className="space-y-2">
              {allContacts
                .filter(contact => 
                  searchTerm === '' || 
                  contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  contact.username.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((contact) => (
                  <div 
                    key={contact.id} 
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.avatarSeed}`} />
                        <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-xs text-muted-foreground">{contact.username}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      {contact.amount && (
                        <>
                          <p className="text-sm font-medium">{contact.amount} F</p>
                          <p className="text-xs text-muted-foreground">{contact.date}</p>
                        </>
                      )}
                    </div>
                  </div>
              ))}
              
              <P2PTransferDialog>
                <Button className="w-full mt-4" size="lg">
                  New Transfer
                </Button>
              </P2PTransferDialog>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default P2PTransferPage;
