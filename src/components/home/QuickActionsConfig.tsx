
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
  Landmark
} from 'lucide-react';
import { ActionItem } from './types/QuickActionTypes';
import { TransferDialog } from '../transfer/TransferDialog';
import { AddMoneyDialog } from '../transfer/AddMoneyDialog';
import { InternationalTransferDialog } from '../transfer/InternationalTransferDialog';

export const createQuickActions = (toast: any) => {
  const navigate = useNavigate();
  
  const actions: ActionItem[] = [
    {
      name: 'Send',
      icon: Send,
      color: 'text-blue-500',
      component: <TransferDialog />
    },
    {
      name: 'Request',
      icon: ArrowUpRight,
      color: 'text-green-500',
      onClick: () => navigate('/transfer/p2p')
    },
    {
      name: 'P2P',
      icon: Wallet,
      color: 'text-purple-500',
      onClick: () => navigate('/transfer/p2p')
    },
    {
      name: 'Invest',
      icon: Landmark,
      color: 'text-yellow-500',
      onClick: () => navigate('/invest')
    },
    {
      name: 'Deposit',
      icon: PiggyBank,
      color: 'text-blue-400',
      component: <AddMoneyDialog />
    },
    {
      name: 'Withdraw',
      icon: BadgeDollarSign,
      color: 'text-red-500',
      onClick: () => toast({
        title: "Withdrawal",
        description: "Withdrawal feature coming soon!"
      })
    },
    {
      name: 'Card',
      icon: CreditCard,
      color: 'text-indigo-500',
      onClick: () => navigate('/cards')
    },
    {
      name: 'History',
      icon: Receipt,
      color: 'text-gray-500',
      onClick: () => navigate('/history')
    },
    {
      name: 'Airtime',
      icon: Phone,
      color: 'text-pink-500',
      onClick: () => navigate('/airtime')
    },
    {
      name: 'Internet',
      icon: Wifi,
      color: 'text-sky-500',
      onClick: () => navigate('/data')
    },
    {
      name: 'TV',
      icon: Smartphone,
      color: 'text-amber-500',
      special: true,
      onClick: () => toast({
        title: "TV Subscriptions",
        description: "TV subscription feature coming soon!"
      })
    },
    {
      name: 'Utilities',
      icon: Bolt,
      color: 'text-orange-500',
      onClick: () => toast({
        title: "Utilities",
        description: "Utilities payment feature coming soon!"
      })
    }
  ];

  return actions;
};
