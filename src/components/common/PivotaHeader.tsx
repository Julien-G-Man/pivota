
import { BellRing, ChevronLeft, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PivotaHeaderProps {
  title: string;
  showIcons?: boolean;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export default function PivotaHeader({ 
  title, 
  showIcons = true, 
  showBackButton = false, 
  onBackClick 
}: PivotaHeaderProps) {
  const { toast } = useToast();
  
  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have 3 unread messages",
    });
  };
  
  return (
    <header className="flex justify-between items-center mb-6">
      <div className="flex items-center">
        {showBackButton && (
          <button 
            onClick={onBackClick}
            className="p-2 mr-2 rounded-full hover:bg-muted transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
        )}
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      
      {showIcons && (
        <div className="flex items-center space-x-4">
          <button
            onClick={() => toast({
              title: "Search",
              description: "Search functionality coming soon!",
            })}
            className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
          >
            <Search size={20} />
          </button>
          <button
            onClick={handleNotificationClick}
            className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors relative"
          >
            <BellRing size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 bg-destructive rounded-full"></span>
          </button>
        </div>
      )}
    </header>
  );
}
