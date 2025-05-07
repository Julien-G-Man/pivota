
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Fingerprint } from "lucide-react";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    // This will be replaced with Supabase auth later
    localStorage.setItem("user", JSON.stringify({ phone }));
    navigate("/home");
  };

  const handleBiometricLogin = () => {
    toast({
      title: "Biometric Login",
      description: "This will be implemented with Supabase authentication",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/10 to-background px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute opacity-20 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/40 to-primary/5 -right-40 -top-40" />
        <div className="absolute opacity-20 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-secondary/40 to-secondary/5 -left-20 -bottom-20" />
      </div>
      
      <div className="container max-w-md mx-auto pt-16 relative z-10">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-primary to-primary/60 inline-block rounded-xl p-3 mb-4 shadow-xl">
            <h1 className="text-4xl font-bold text-white">PIVOTA</h1>
          </div>
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-muted-foreground">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-gradient-to-br from-white/80 to-white/90 dark:from-card dark:to-card/80 p-8 rounded-3xl shadow-2xl backdrop-blur-sm border border-white/20">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-foreground/90 font-medium">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-white/50 dark:bg-background/50 border-primary/10 focus:border-primary/30"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-foreground/90 font-medium">Password</Label>
              <button
                type="button"
                onClick={() => toast({ title: "Reset Password", description: "Password reset feature will be added soon" })}
                className="text-xs text-primary hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/50 dark:bg-background/50 border-primary/10 focus:border-primary/30"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white font-medium py-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Sign In
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-muted" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white/70 dark:bg-card/70 px-2 text-muted-foreground backdrop-blur-sm">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full bg-white/50 dark:bg-background/50 hover:bg-primary/10 border border-primary/20"
            onClick={handleBiometricLogin}
          >
            <Fingerprint className="mr-2 text-primary" />
            Sign in with Fingerprint
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-primary font-medium hover:underline"
            >
              Create Account
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
