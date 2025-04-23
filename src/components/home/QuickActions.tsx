
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
      color: 'bg-pivota-purple-light/20', 
      onClick: () => console.log('Send Money') 
    },
    { 
      name: 'Pay Bills', 
      icon: CreditCard, 
      color: 'bg-pivota-orange/20', 
      onClick: () => console.log('Pay Bills') 
    },
    { 
      name: 'Top Up', 
      icon: Upload, 
      color: 'bg-pivota-green/20', 
      onClick: () => console.log('Top Up') 
    },
    { 
      name: 'Request', 
      icon: Download, 
      color: 'bg-pivota-gold/20', 
      onClick: () => console.log('Request') 
    },
    { 
      name: 'Schedule', 
      icon: Calendar, 
      color: 'bg-blue-500/20', 
      onClick: () => console.log('Schedule') 
    },
    { 
      name: 'Notifications', 
      icon: Bell, 
      color: 'bg-pink-500/20', 
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
            className={`action-button ${action.color}`}
          >
            <action.icon size={24} className="mb-2" />
            <span className="text-xs">{action.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
