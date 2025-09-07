import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-24 h-24 bg-gradient-delivery rounded-full flex items-center justify-center mx-auto animate-pulse-glow">
          <AlertTriangle className="w-12 h-12 text-white" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-heading font-bold text-foreground">404</h1>
          <h2 className="text-xl font-heading font-semibold text-foreground">Page Not Found</h2>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-3">
          <Button 
            asChild
            className="bg-gradient-primary hover:opacity-90"
          >
            <a href="/">
              <Home className="w-4 h-4 mr-2" />
              Return to Dashboard
            </a>
          </Button>
          
          <p className="text-sm text-muted-foreground">
            Need help? Contact SyloNow support
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
