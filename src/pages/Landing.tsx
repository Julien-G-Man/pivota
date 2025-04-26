
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background px-4 flex flex-col items-center justify-center">
      <div className="text-center space-y-6 max-w-md mx-auto">
        <div className="space-y-2">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Pivota
          </h1>
          <p className="text-xl text-muted-foreground">
            Send money across Africa, instantly
          </p>
        </div>
        
        <div className="space-y-4 pt-8">
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
  );
}
