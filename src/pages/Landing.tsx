
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-background flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 px-4 flex flex-col items-center justify-center text-center">
        <div className="space-y-6 max-w-md mx-auto">
          {/* Logo and Tagline */}
          <div className="flex flex-col items-center space-y-4">
            <img 
              src="/lovable-uploads/cac4f9d6-8128-47ae-98fe-075b3cd23075.png" 
              alt="Pivota Logo" 
              className="h-24 w-24 mb-2" 
            />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
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
            className="text-lg py-6 px-8 mt-6 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 animate-pulse"
            size="lg"
          >
            Get Started
            <ArrowRight className="ml-2" />
          </Button>
          
          {/* Account Buttons */}
          <div className="space-y-4 pt-10 mt-6">
            <Button 
              onClick={() => navigate("/register")} 
              className="w-full text-lg py-6 bg-gradient-to-r from-blue-600 to-blue-500"
            >
              Create Account
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate("/login")} 
              className="w-full text-lg py-6 border border-blue-200"
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
