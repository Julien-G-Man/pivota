
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
  GraduationCap,
  UserRound,
  QrCode,
  LineChart,
  PiggyBank
} from 'lucide-react';
import { ActionItem } from './types/QuickActionTypes';

export const createQuickActions = (toast: (props: { title: string; description: string }) => void): ActionItem[] => {
  return [
    { 
      name: 'To Friend', 
      icon: UserRound, 
      color: 'bg-primary/10', 
      onClick: () => window.location.href = '/transfer/p2p'
    },
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
      name: 'Invest', 
      icon: LineChart, 
      color: 'bg-primary/10',
      special: true,
      onClick: () => toast({ title: "Invest", description: "Investment options coming soon!" })
    },
    { 
      name: 'Deposit', 
      icon: PiggyBank, 
      color: 'bg-primary/10',
      onClick: () => toast({ title: "Deposit", description: "Deposit options coming soon!" })
    },
    { 
      name: 'Withdraw', 
      icon: Download, 
      color: 'bg-primary/10',
      onClick: () => toast({ title: "Withdraw", description: "Coming soon!" })
    },
    { 
      name: 'Scan QR', 
      icon: QrCode, 
      color: 'bg-primary/10',
      special: true,
      onClick: () => toast({ title: "QR Scanner", description: "QR scanning will be available soon!" })
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
