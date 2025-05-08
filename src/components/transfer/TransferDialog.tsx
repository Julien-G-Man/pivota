
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

type TransferMethod = "pivota" | "bank" | "mobile";

export function TransferDialog() {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState<TransferMethod>("pivota");
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    toast({
      title: "Transfer initiated",
      description: "Your transfer is being processed",
    });
    setStep(1);
    setAmount("");
    setRecipient("");
    setPassword("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex flex-col items-center justify-center w-full">
          <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 mb-1">
            <Send size={20} className="text-primary" />
          </div>
          <span className="text-xs text-center">To Pivota</span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transfer Money</DialogTitle>
        </DialogHeader>
        
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select transfer method</Label>
              <RadioGroup
                defaultValue="pivota"
                onValueChange={(value) => setMethod(value as TransferMethod)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pivota" id="pivota" />
                  <Label htmlFor="pivota">Pivota Account</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bank" id="bank" />
                  <Label htmlFor="bank">Bank Account</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mobile" id="mobile" />
                  <Label htmlFor="mobile">Mobile Money</Label>
                </div>
              </RadioGroup>
            </div>
            <Button onClick={() => setStep(2)}>Next</Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Enter amount</Label>
              <Input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>
                {method === "pivota" 
                  ? "Recipient's Pivota ID" 
                  : method === "bank" 
                  ? "Bank Account Number" 
                  : "Mobile Money Number"}
              </Label>
              <Input
                type="text"
                placeholder="Enter recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
            <Button onClick={() => setStep(3)}>Next</Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Confirm with password</Label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button onClick={handleSubmit}>Authorize Transfer</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
