
import { useNavigate } from 'react-router-dom';
import {
  Send,
  Wallet,
  CreditCard,
  Receipt,
  Phone,
  Wifi,
  Smartphone,
  Bolt,
  Heart,
  Gift,
  Library,
  Building,
  PiggyBank,
  BadgeDollarSign,
  ArrowUpRight,
  ShoppingCart,
  Plus,
  Landmark,
  MessageSquare,
  QrCode,
  User
} from 'lucide-react';
import { ActionItem } from './types/QuickActionTypes';
import { TransferDialog } from '../transfer/TransferDialog';
import { InternationalTransferDialog } from '../transfer/InternationalTransferDialog';

export const createQuickActions = (toast: any) => {
  const navigate = useNavigate();
  
  const actions: ActionItem[] = [
    {
      name: 'To Friend',
      icon: User,
      color: 'text-primary',
      component: <TransferDialog />
    },
    {
      name: 'Cards',
      icon: CreditCard,
      color: 'text-primary',
      onClick: () => navigate('/cards')
    },
    {
      name: 'To Bank',
      icon: Wallet,
      color: 'text-primary',
      onClick: () => navigate('/transfer/bank')
    },
    {
      name: 'Invest',
      icon: Landmark,
      color: 'text-primary',
      onClick: () => navigate('/invest')
    },
    {
      name: 'Withdraw',
      icon: BadgeDollarSign,
      color: 'text-primary',
      onClick: () => toast({
        title: "Withdrawal",
        description: "Withdrawal feature coming soon!"
      })
    },
    {
      name: 'Deposit',
      icon: PiggyBank,
      color: 'text-primary',
      onClick: () => navigate('/deposit')
    },
    {
      name: 'History',
      icon: Receipt,
      color: 'text-primary',
      onClick: () => navigate('/history')
    },
    {
      name: 'Airtime',
      icon: Phone,
      color: 'text-primary',
      onClick: () => navigate('/airtime')
    },
    {
      name: 'Internet',
      icon: Wifi,
      color: 'text-primary',
      onClick: () => navigate('/data')
    },
    {
      name: 'QR Pay',
      icon: QrCode,
      color: 'text-primary',
      onClick: () => toast({
        title: "QR Code Payment",
        description: "Scan a QR code to make a payment"
      })
    },
    {
      name: 'Utilities',
      icon: Bolt,
      color: 'text-primary',
      onClick: () => toast({
        title: "Utilities",
        description: "Utilities payment feature coming soon!"
      })
    },
    {
      name: 'AI Advisor',
      icon: MessageSquare,
      color: 'text-primary',
      onClick: () => navigate('/invest')
    }
  ];

  return actions;
};
