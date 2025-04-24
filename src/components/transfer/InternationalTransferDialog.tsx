
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Globe } from "lucide-react";

type TransferMethod = "pivota" | "bank" | "mobile";
type Step = 1 | 2 | 3 | 4;

interface Currency {
  code: string;
  name: string;
  flag: string;
  country: string;
  hasMobileMoney: boolean;
}

export function InternationalTransferDialog() {
  const [step, setStep] = useState<Step>(1);
  const [currency, setCurrency] = useState<Currency | null>(null);
  const [method, setMethod] = useState<TransferMethod>("pivota");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const { toast } = useToast();

  const currencies: Currency[] = [
    { code: "NGN", name: "Naira", flag: "🇳🇬", country: "Nigeria", hasMobileMoney: true },
    { code: "GHS", name: "Cedi", flag: "🇬🇭", country: "Ghana", hasMobileMoney: true },
    { code: "ZAR", name: "Rand", flag: "🇿🇦", country: "South Africa", hasMobileMoney: true },
    { code: "KES", name: "Shilling", flag: "🇰🇪", country: "Kenya", hasMobileMoney: true },
    { code: "XOF", name: "CFA Franc", flag: "🇨🇮", country: "Ivory Coast", hasMobileMoney: true },
    { code: "CDF", name: "Congolese Franc", flag: "🇨🇩", country: "Republic of Congo", hasMobileMoney: true },
    { code: "TZS", name: "Tanzanian Shilling", flag: "🇹🇿", country: "Tanzania", hasMobileMoney: true },
    { code: "EGP", name: "Egyptian Pound", flag: "🇪🇬", country: "Egypt", hasMobileMoney: false },
    { code: "MAD", name: "Dirham", flag: "🇲🇦", country: "Morocco", hasMobileMoney: false },
    { code: "DZD", name: "Algerian Dinar", flag: "🇩🇿", country: "Algeria", hasMobileMoney: false },
    { code: "ETB", name: "Ethiopian Birr", flag: "🇪🇹", country: "Ethiopia", hasMobileMoney: false },
    { code: "UGX", name: "Ugandan Shilling", flag: "🇺🇬", country: "Uganda", hasMobileMoney: false },
  ];

  const handleSelectCurrency = (value: string) => {
    const selected = currencies.find((c) => c.code === value) || null;
    setCurrency(selected);
    setMethod("pivota"); // Reset method when currency changes
    setStep(2);
  };

  const handleSelectMethod = (value: TransferMethod) => {
    setMethod(value);
    setStep(3);
  };

  const handleSubmit = () => {
    toast({
      title: "International Transfer Initiated",
      description: `Transfer of ${amount} ${currency?.code} via ${method} to ${recipient}`,
    });
    setStep(1);
    setCurrency(null);
    setMethod("pivota");
    setAmount("");
    setRecipient("");
  };

  const getAvailableMethods = () => {
    if (!currency) return [];
    
    const methods = [
      { id: "pivota", label: "Pivota International Transfer" },
      { id: "bank", label: "Bank Transfer" }
    ];
    
    if (currency.hasMobileMoney) {
      methods.push({ id: "mobile", label: "Mobile Money" });
    }
    
    return methods;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex flex-col items-center p-3 rounded-lg bg-primary/70 hover:bg-primary/10 transition-colors">
          <Globe size={24} className="mb-2" />
          <span className="text-xs">Int'l Transfer</span>
        </button>
      </DialogTrigger>
      
      <DialogContent>
        <DialogHeader>
          <DialogTitle>International Transfer</DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Select Currency</Label>
              <Select onValueChange={handleSelectCurrency}>
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {currencies.map((curr) => (
                      <SelectItem key={curr.code} value={curr.code}>
                        <div className="flex items-center">
                          <span className="mr-2">{curr.flag}</span>
                          <span>{curr.country} - {curr.code} ({curr.name})</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {step === 2 && currency && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Selected Currency:</Label>
              <div className="p-2 border rounded-md flex items-center">
                <span className="text-xl mr-2">{currency.flag}</span>
                <span>{currency.country} - {currency.code} ({currency.name})</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Select Transfer Method</Label>
              <RadioGroup value={method} onValueChange={(v) => handleSelectMethod(v as TransferMethod)}>
                {getAvailableMethods().map((m) => (
                  <div key={m.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={m.id} id={m.id} />
                    <Label htmlFor={m.id}>{m.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
          </div>
        )}

        {step === 3 && currency && (
          <div className="space-y-4">
            <div className="flex items-center mb-4">
              <span className="text-xl mr-2">{currency.flag}</span> 
              <span>{method === "pivota" ? "Pivota" : method === "bank" ? "Bank" : "Mobile Money"} - {currency.country}</span>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="recipient">
                {method === "pivota" 
                  ? "Recipient Pivota ID" 
                  : method === "bank" 
                    ? "Bank Account Number" 
                    : "Mobile Number"}
              </Label>
              <Input 
                id="recipient"
                placeholder={
                  method === "pivota" 
                    ? "Enter Pivota ID" 
                    : method === "bank" 
                      ? "Enter account number" 
                      : "Enter mobile number"
                }
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount ({currency.code})</Label>
              <Input 
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
              <Button 
                onClick={() => setStep(4)}
                disabled={!recipient || !amount}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 4 && currency && (
          <div className="space-y-4">
            <div className="space-y-2 border rounded-md p-4 bg-muted/20">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Transfer to:</span>
                <span className="font-medium">{recipient}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Method:</span>
                <span className="font-medium capitalize">{method === "pivota" ? "Pivota Transfer" : method === "bank" ? "Bank Transfer" : "Mobile Money"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Currency:</span>
                <span className="font-medium">{currency.flag} {currency.code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Amount:</span>
                <span className="font-medium">{amount} {currency.code}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Enter PIN to confirm</Label>
              <Input id="password" type="password" placeholder="Enter your PIN" />
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(3)}>Back</Button>
              <Button onClick={handleSubmit}>Confirm Transfer</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
