
import { CreditCard, Download, Upload, Wallet, Calendar, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { InternationalTransferDialog } from '@/components/transfer/InternationalTransferDialog';

interface ActionItem {
  name: string;
  icon: React.ElementType;
  color: string;
  onClick?: () => void;
  component?: React.ReactNode;
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
      component: <div className="flex flex-col items-center p-3 rounded-lg bg-primary/20 hover:bg-primary/10 transition-colors">
        <Download size={24} className="mb-2" />
        <span className="text-xs">Withdraw</span>
      </div>
    },
    { 
      name: 'Top Up', 
      icon: Upload, 
      color: 'bg-primary/30',
      component: <div className="flex flex-col items-center p-3 rounded-lg bg-primary/30 hover:bg-primary/10 transition-colors">
        <Upload size={24} className="mb-2" />
        <span className="text-xs">Top Up</span>
      </div>
    },
    { 
      name: 'Invest', 
      icon: Wallet, 
      color: 'bg-primary/40',
      component: <div className="flex flex-col items-center p-3 rounded-lg bg-primary/40 hover:bg-primary/10 transition-colors">
        <Wallet size={24} className="mb-2" />
        <span className="text-xs">Invest</span>
      </div>
    },
    { 
      name: 'Schedule', 
      icon: Calendar, 
      color: 'bg-primary/50',
      component: <div className="flex flex-col items-center p-3 rounded-lg bg-primary/50 hover:bg-primary/10 transition-colors">
        <Calendar size={24} className="mb-2" />
        <span className="text-xs">Schedule</span>
      </div>
    },
    { 
      name: 'Int\'l Transfer', 
      icon: Globe, 
      color: 'bg-primary/70', 
      component: <InternationalTransferDialog />
    },
  ];
  
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-3 gap-4">
        {actions.map((action) => (
          <div key={action.name} className="flex items-center justify-center">
            {action.component ? (
              action.component
            ) : (
              <button
                onClick={action.onClick}
                className={`flex flex-col items-center p-3 rounded-lg ${action.color} hover:bg-primary/10 transition-colors`}
              >
                <action.icon size={24} className="mb-2" />
                <span className="text-xs">{action.name}</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
