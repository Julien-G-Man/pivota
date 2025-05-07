
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
  Bot
} from 'lucide-react';
import { ActionItem } from './types/QuickActionTypes';
import { TransferDialog } from '../transfer/TransferDialog';
import { InternationalTransferDialog } from '../transfer/InternationalTransferDialog';

export const createQuickActions = (toast: any) => {
  const navigate = useNavigate();
  
  const actions: ActionItem[] = [
    {
      name: 'To a Friend',
      icon: Send,
      color: 'text-primary',
      component: <TransferDialog />
    },
    {
      name: 'To MOMO',
      icon: Phone,
      color: 'text-primary',
      onClick: () => navigate('/transfer/momo')
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
      name: 'TV',
      icon: Smartphone,
      color: 'text-primary',
      special: true,
      onClick: () => toast({
        title: "TV Subscriptions",
        description: "TV subscription feature coming soon!"
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
      icon: Bot,
      color: 'text-primary',
      onClick: () => navigate('/invest')
    }
  ];

  return actions;
};
