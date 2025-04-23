
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="text-center max-w-md mx-auto">
        <div className="w-24 h-24 bg-pivota-purple rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl text-white font-bold">404</span>
        </div>
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="flex items-center gap-2">
          <a href="/">
            <ArrowLeft size={16} />
            Return to Home
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
