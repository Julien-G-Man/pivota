
import { CreditCard, Download, Upload, Wallet, Calendar, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ActionItem {
  name: string;
  icon: React.ElementType;
  color: string;
  onClick: () => void;
}

export default function QuickActions() {
  const { toast } = useToast();
  
  const actions: ActionItem[] = [
    { 
      name: 'Pay Bills', 
      icon: CreditCard, 
      color: 'bg-primary/10', 
      onClick: () => toast({ title: "Pay Bills", description: "Coming soon!" })
    },
    { 
      name: 'Withdraw', 
      icon: Download, 
      color: 'bg-primary/20', 
      onClick: () => toast({ title: "Withdraw", description: "Coming soon!" })
    },
    { 
      name: 'Top Up', 
      icon: Upload, 
      color: 'bg-primary/30', 
      onClick: () => toast({ title: "Top Up", description: "Coming soon!" })
    },
    { 
      name: 'Invest', 
      icon: Wallet, 
      color: 'bg-primary/40', 
      onClick: () => toast({ title: "Invest", description: "Coming soon!" })
    },
    { 
      name: 'Schedule', 
      icon: Calendar, 
      color: 'bg-primary/50', 
      onClick: () => toast({ title: "Schedule Payment", description: "Coming soon!" })
    },
    { 
      name: 'History', 
      icon: Bell, 
      color: 'bg-primary/60', 
      onClick: () => toast({ title: "Transaction History", description: "Coming soon!" })
    },
  ];
  
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-3 gap-4">
        {actions.map((action) => (
          <button
            key={action.name}
            onClick={action.onClick}
            className={`flex flex-col items-center p-3 rounded-lg ${action.color} hover:bg-primary/10 transition-colors`}
          >
            <action.icon size={24} className="mb-2" />
            <span className="text-xs">{action.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
