
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 px-4 flex flex-col items-center justify-center text-center">
        <div className="space-y-6 max-w-md mx-auto">
          {/* Logo and Tagline */}
          <div className="space-y-4">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              PIVOTA
            </h1>
            <p className="text-xl text-muted-foreground">
              Turn Every Transaction Into Power.
            </p>
            <p className="text-sm italic text-muted-foreground">
              A product by Manova
            </p>
          </div>
          
          {/* Get Started Button */}
          <Button 
            onClick={() => navigate("/register")}
            className="text-lg py-6 px-8 mt-6 rounded-full animate-pulse"
            size="lg"
          >
            Get Started
            <ArrowRight className="ml-2" />
          </Button>
          
          {/* Account Buttons */}
          <div className="space-y-4 pt-10 mt-6">
            <Button 
              onClick={() => navigate("/register")} 
              className="w-full text-lg py-6"
            >
              Create Account
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate("/login")} 
              className="w-full text-lg py-6"
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
