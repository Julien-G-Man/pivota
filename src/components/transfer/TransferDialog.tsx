
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, User } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

// Mock friends data - in a real app, this would come from localStorage or another data source
const mockFriends = [
  { id: '1', name: 'Jean Pierre', username: '@jeanp', avatarSeed: 'Jean' },
  { id: '2', name: 'Marie Konde', username: '@mariek', avatarSeed: 'Marie' },
  { id: '3', name: 'Pascal Obiang', username: '@pascalo', avatarSeed: 'Pascal' }
];

export function TransferDialog() {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [password, setPassword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFriend, setSelectedFriend] = useState<any>(null);
  const { toast } = useToast();

  const filteredFriends = mockFriends.filter(friend => 
    friend.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    friend.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFriendSelect = (friend: any) => {
    setSelectedFriend(friend);
    setStep(2);
  };

  const handleSubmit = () => {
    if (!amount) {
      toast({
        title: "Error",
        description: "Please enter an amount",
        variant: "destructive"
      });
      return;
    }

    if (!password) {
      toast({
        title: "Error",
        description: "Please enter your password",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Transfer Successful",
      description: `${amount} F sent to ${selectedFriend.name}`,
    });
    
    // Reset form
    setStep(1);
    setAmount("");
    setNote("");
    setPassword("");
    setSelectedFriend(null);
    setSearchTerm("");
  };

  const resetForm = () => {
    setStep(1);
    setSelectedFriend(null);
    setAmount("");
    setNote("");
    setPassword("");
    setSearchTerm("");
  };

  return (
    <Dialog onOpenChange={(open) => {
      if (!open) resetForm();
    }}>
      <DialogTrigger asChild>
        <button className="flex flex-col items-center justify-center w-full">
          <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 mb-1">
            <Send size={20} className="text-primary" />
          </div>
          <span className="text-xs text-center">To Friend</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send Money to Friend</DialogTitle>
          <DialogDescription>
            {step === 1 ? "Select a friend to send money to" : 
             step === 2 ? "Enter amount and add a note" : 
             "Confirm transfer details"}
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4 mt-2">
            <div className="relative">
              <Input 
                placeholder="Search friends by name or @username"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-3"
              />
            </div>
            
            <div className="max-h-[300px] overflow-y-auto space-y-2">
              {filteredFriends.length > 0 ? (
                filteredFriends.map((friend) => (
                  <button
                    key={friend.id}
                    className="flex items-center gap-3 w-full p-3 hover:bg-muted rounded-md transition-colors"
                    onClick={() => handleFriendSelect(friend)}
                  >
                    <Avatar>
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${friend.avatarSeed}`} />
                      <AvatarFallback>{friend.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="font-medium">{friend.name}</p>
                      <p className="text-xs text-muted-foreground">{friend.username}</p>
                    </div>
                  </button>
                ))
              ) : searchTerm ? (
                <div className="text-center py-4 text-muted-foreground">
                  No friends found matching "{searchTerm}"
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  Search for friends by name or username
                </div>
              )}
            </div>
          </div>
        )}

        {step === 2 && selectedFriend && (
          <div className="space-y-4 mt-2">
            <div className="flex items-center justify-center mb-4">
              <div className="text-center">
                <Avatar className="h-16 w-16 mx-auto mb-2">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedFriend.avatarSeed}`} />
                  <AvatarFallback>{selectedFriend.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <h3 className="font-medium">{selectedFriend.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedFriend.username}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (F)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="note">Note (Optional)</Label>
              <Input
                id="note"
                placeholder="What's this for?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2 pt-2">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>
              <Button onClick={() => setStep(3)} className="flex-1">Continue</Button>
            </div>
          </div>
        )}

        {step === 3 && selectedFriend && (
          <div className="space-y-4 mt-2">
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">To:</span>
                <span className="font-medium">{selectedFriend.name}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-medium">{amount} F</span>
              </div>
              {note && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Note:</span>
                  <span className="font-medium">{note}</span>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Confirm with password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2 pt-2">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1">Back</Button>
              <Button onClick={handleSubmit} className="flex-1">Send Money</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
