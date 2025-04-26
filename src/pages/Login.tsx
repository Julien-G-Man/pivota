
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would be an API call
    localStorage.setItem("user", JSON.stringify({ name, phone }));
    localStorage.setItem("transactionPassword", password);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background px-4">
      <div className="container max-w-md mx-auto pt-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Pivota
          </h1>
          <p className="text-muted-foreground">
            Send money across Africa, instantly
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 rounded-xl shadow-lg">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Transaction Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a transaction password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-background/50"
            />
            <p className="text-xs text-muted-foreground">
              You'll need this password for all transactions
            </p>
          </div>

          <Button type="submit" className="w-full">
            Get Started
          </Button>
        </form>
      </div>
    </div>
  );
}
