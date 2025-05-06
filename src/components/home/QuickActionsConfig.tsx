
import { 
  Send, 
  Building, 
  Download, 
  Phone, 
  Wifi, 
  Video, 
  Gamepad2, 
  Lock, 
  Award, 
  Megaphone, 
  GraduationCap
} from 'lucide-react';
import { ActionItem } from './types/QuickActionTypes';
import { useNavigate } from 'react-router-dom';

export const createQuickActions = (toast: (props: { title: string; description: string }) => void): ActionItem[] => {
  return [
    { 
      name: 'To Pivota', 
      icon: Send, 
      color: 'bg-primary/10', 
      onClick: () => window.location.href = '/transfer/pivota'
    },
    { 
      name: 'To Bank', 
      icon: Building, 
      color: 'bg-primary/10',
      onClick: () => window.location.href = '/transfer/bank'
    },
    { 
      name: 'Withdraw', 
      icon: Download, 
      color: 'bg-primary/10',
      onClick: () => toast({ title: "Withdraw", description: "Coming soon!" })
    },
    { 
      name: 'Airtime', 
      icon: Phone, 
      color: 'bg-primary/10',
      special: true,
      onClick: () => window.location.href = '/airtime'
    },
    { 
      name: 'Data', 
      icon: Wifi, 
      color: 'bg-primary/10',
      special: true,
      onClick: () => window.location.href = '/data'
    },
    { 
      name: 'Betting', 
      icon: Gamepad2, 
      color: 'bg-primary/10',
      onClick: () => toast({ title: "Betting", description: "Coming soon!" })
    },
    { 
      name: 'TV', 
      icon: Video, 
      color: 'bg-primary/10',
      onClick: () => toast({ title: "TV Subscription", description: "Coming soon!" })
    },
    { 
      name: 'Safebox', 
      icon: Lock, 
      color: 'bg-primary/10',
      onClick: () => toast({ title: "Safebox", description: "Coming soon!" })
    },
    { 
      name: 'Loan', 
      icon: Award, 
      color: 'bg-primary/10',
      onClick: () => toast({ title: "Loan", description: "Coming soon!" })
    },
    { 
      name: 'Invitation', 
      icon: Megaphone, 
      color: 'bg-primary/10',
      onClick: () => toast({ title: "Invitation", description: "Coming soon!" })
    },
    { 
      name: 'More', 
      icon: GraduationCap, 
      color: 'bg-primary/10',
      onClick: () => toast({ title: "More Options", description: "Coming soon!" })
    },
  ];
};
