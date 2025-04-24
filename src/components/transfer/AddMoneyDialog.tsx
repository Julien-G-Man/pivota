
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
import { Banknote } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

type AddMoneyMethod = "bank" | "mobile";

export function AddMoneyDialog() {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState<AddMoneyMethod>("bank");
  const [amount, setAmount] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    toast({
      title: "Add money initiated",
      description: "Your request is being processed",
    });
    setStep(1);
    setAmount("");
    setPassword("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
          <Banknote size={18} />
          <span className="text-sm font-medium">Add Money</span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Money</DialogTitle>
        </DialogHeader>
        
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select method</Label>
              <RadioGroup
                defaultValue="bank"
                onValueChange={(value) => setMethod(value as AddMoneyMethod)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bank" id="bank" />
                  <Label htmlFor="bank">Bank Transfer</Label>
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
            <Button onClick={handleSubmit}>Authorize</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
