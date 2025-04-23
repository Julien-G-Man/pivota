
import { CreditCard, Send, Download, Upload, Calendar, Bell } from 'lucide-react';

interface ActionItem {
  name: string;
  icon: React.ElementType;
  color: string;
  onClick: () => void;
}

export default function QuickActions() {
  const actions: ActionItem[] = [
    { 
      name: 'Send Money', 
      icon: Send, 
      color: 'bg-primary/10', 
      onClick: () => console.log('Send Money') 
    },
    { 
      name: 'Pay Bills', 
      icon: CreditCard, 
      color: 'bg-primary/20', 
      onClick: () => console.log('Pay Bills') 
    },
    { 
      name: 'Top Up', 
      icon: Upload, 
      color: 'bg-primary/30', 
      onClick: () => console.log('Top Up') 
    },
    { 
      name: 'Request', 
      icon: Download, 
      color: 'bg-primary/40', 
      onClick: () => console.log('Request') 
    },
    { 
      name: 'Schedule', 
      icon: Calendar, 
      color: 'bg-primary/50', 
      onClick: () => console.log('Schedule') 
    },
    { 
      name: 'Notifications', 
      icon: Bell, 
      color: 'bg-primary/60', 
      onClick: () => console.log('Notifications') 
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
            className={`action-button ${action.color} text-primary hover:bg-primary/10`}
          >
            <action.icon size={24} className="mb-2" />
            <span className="text-xs">{action.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
