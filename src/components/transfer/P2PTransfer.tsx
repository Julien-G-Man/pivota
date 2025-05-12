
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, QrCode, ChevronRight, UserRound, Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface P2PTransferProps {
  children?: React.ReactNode;
}

type TransferMethod = "username" | "phone" | "qrcode" | "new";

const mockedContacts = [
  { id: '1', name: 'Jean Pierre', username: '@jeanp', phone: '+242 06 123 4567', avatarSeed: 'Jean' },
  { id: '2', name: 'Marie Konde', username: '@mariek', phone: '+242 05 765 4321', avatarSeed: 'Marie' },
  { id: '3', name: 'Pascal Obiang', username: '@pascalo', phone: '+242 06 987 6543', avatarSeed: 'Pascal' }
];

export function P2PTransfer({ children }: P2PTransferProps) {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState<TransferMethod>("username");
  const [recipient, setRecipient] = useState("");
  const [newRecipientName, setNewRecipientName] = useState("");
  const [newRecipientPhone, setNewRecipientPhone] = useState("");
  const [newRecipientUsername, setNewRecipientUsername] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [password, setPassword] = useState("");
  const [selectedContact, setSelectedContact] = useState<typeof mockedContacts[0] | null>(null);
  const { toast } = useToast();

  const handleSelectContact = (contact: typeof mockedContacts[0]) => {
    setSelectedContact(contact);
    setStep(3);
  };

  const handleSearch = () => {
    // In a real app, this would query the database
    const foundContact = mockedContacts.find(
      c => c.username.includes(recipient) || c.phone.includes(recipient)
    );
    
    if (foundContact) {
      setSelectedContact(foundContact);
      setStep(3);
    } else {
      toast({
        title: "User not found",
        description: "Please check the username or phone number, or add a new recipient",
        variant: "destructive"
      });
    }
  };

  const handleAddNewRecipient = () => {
    if (!newRecipientName || !newRecipientPhone) {
      toast({
        title: "Missing information",
        description: "Please provide name and phone number",
        variant: "destructive"
      });
      return;
    }
    
    // Create a new contact object for the recipient
    const newContact = {
      id: Date.now().toString(),
      name: newRecipientName,
      username: newRecipientUsername || `@${newRecipientName.toLowerCase().replace(/\s+/g, '')}`,
      phone: newRecipientPhone,
      avatarSeed: newRecipientName
    };
    
    setSelectedContact(newContact);
    setStep(3);
    
    // In a real app, this would save the new contact to the database
    toast({
      title: "Recipient added",
      description: `${newRecipientName} has been added to your contacts`
    });
  };

  const handleSubmit = () => {
    toast({
      title: "Transfer successful",
      description: `${amount} F has been sent to ${selectedContact?.name || recipient}`,
    });
    setStep(1);
    setRecipient("");
    setNewRecipientName("");
    setNewRecipientPhone("");
    setNewRecipientUsername("");
    setAmount("");
    setNote("");
    setPassword("");
    setSelectedContact(null);
  };

  const handleQrScan = () => {
    toast({
      title: "QR Scanner",
      description: "QR scanning will be available soon!",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <button className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
            <Send size={18} />
            <span className="text-sm font-medium">P2P Transfer</span>
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send Money to a Friend</DialogTitle>
        </DialogHeader>
        
        {/* Step 1: Choose method */}
        {step === 1 && (
          <div className="space-y-4">
            <Tabs defaultValue="username" value={method} onValueChange={(v) => setMethod(v as TransferMethod)}>
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="username">Username</TabsTrigger>
                <TabsTrigger value="phone">Phone</TabsTrigger>
                <TabsTrigger value="qrcode">QR Code</TabsTrigger>
                <TabsTrigger value="new">New</TabsTrigger>
              </TabsList>
              
              <TabsContent value="username" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Enter Pivota Username</Label>
                  <Input
                    placeholder="@username"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                  />
                </div>
                <Button onClick={handleSearch} className="w-full">Search</Button>
              </TabsContent>
              
              <TabsContent value="phone" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Enter Phone Number</Label>
                  <Input
                    placeholder="+242 0X XXX XXXX"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                  />
                </div>
                <Button onClick={handleSearch} className="w-full">Search</Button>
              </TabsContent>
              
              <TabsContent value="qrcode" className="space-y-4 mt-4">
                <div className="flex flex-col items-center justify-center py-8">
                  <QrCode size={80} className="mb-4 text-primary" />
                  <p className="text-sm text-center text-muted-foreground">
                    Scan a Pivota QR code to send money instantly
                  </p>
                </div>
                <Button onClick={handleQrScan} className="w-full">Open Scanner</Button>
              </TabsContent>
              
              <TabsContent value="new" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Recipient Name</Label>
                  <Input
                    placeholder="Full Name"
                    value={newRecipientName}
                    onChange={(e) => setNewRecipientName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input
                    placeholder="+242 0X XXX XXXX"
                    value={newRecipientPhone}
                    onChange={(e) => setNewRecipientPhone(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Username (Optional)</Label>
                  <Input
                    placeholder="@username"
                    value={newRecipientUsername}
                    onChange={(e) => setNewRecipientUsername(e.target.value)}
                  />
                </div>
                
                <Button onClick={handleAddNewRecipient} className="w-full">Add Recipient</Button>
              </TabsContent>
            </Tabs>
            
            <div className="space-y-2">
              <Label>Recent Contacts</Label>
              <div className="space-y-2">
                {mockedContacts.map((contact) => (
                  <div 
                    key={contact.id} 
                    className="flex items-center justify-between p-2 border rounded-lg hover:bg-muted/50 cursor-pointer"
                    onClick={() => handleSelectContact(contact)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.avatarSeed}`} />
                        <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{contact.name}</p>
                        <p className="text-xs text-muted-foreground">{contact.username}</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-muted-foreground" />
                  </div>
                ))}
                
                <div 
                  className="flex items-center justify-between p-2 border rounded-lg hover:bg-muted/50 cursor-pointer"
                  onClick={() => setMethod("new")}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Plus size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Add New Recipient</p>
                      <p className="text-xs text-muted-foreground">Create a new contact</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 3: Enter amount and note */}
        {step === 3 && (
          <div className="space-y-4">
            {selectedContact && (
              <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
                <Avatar>
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedContact.avatarSeed}`} />
                  <AvatarFallback>{selectedContact.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedContact.name}</p>
                  <p className="text-xs text-muted-foreground">{selectedContact.username} • {selectedContact.phone}</p>
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label>Enter Amount (F)</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-lg"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Add a note (optional)</Label>
              <Input
                placeholder="What's it for?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
            
            <Button onClick={() => setStep(4)} disabled={!amount || parseFloat(amount) <= 0} className="w-full">
              Continue
            </Button>
          </div>
        )}
        
        {/* Step 4: Review and confirm */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="bg-muted/20 p-4 rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Recipient</span>
                <span className="font-medium">{selectedContact?.name || recipient}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Amount</span>
                <span className="font-medium">{amount} F</span>
              </div>
              
              {note && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Note</span>
                  <span className="font-medium">{note}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Fee</span>
                <span className="font-medium">0 F</span>
              </div>
              
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total</span>
                  <span className="font-bold">{amount} F</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Confirm with PIN</Label>
              <Input
                type="password"
                placeholder="Enter your PIN"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <Button onClick={handleSubmit} disabled={!password} className="w-full">
              Confirm Transfer
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
