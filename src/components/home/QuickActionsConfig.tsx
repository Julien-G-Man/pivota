
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
      component: <TransferDialog />
    },
    {
      name: 'Request',
      icon: ArrowUpRight,
      onClick: () => navigate('/transfer/p2p')
    },
    {
      name: 'P2P',
      icon: Wallet,
      onClick: () => navigate('/transfer/p2p')
    },
    {
      name: 'Invest',
      icon: Landmark,
      onClick: () => navigate('/invest')
    },
    {
      name: 'Deposit',
      icon: PiggyBank,
      component: <AddMoneyDialog />
    },
    {
      name: 'Withdraw',
      icon: BadgeDollarSign,
      onClick: () => toast({
        title: "Withdrawal",
        description: "Withdrawal feature coming soon!"
      })
    },
    {
      name: 'Card',
      icon: CreditCard,
      onClick: () => navigate('/cards')
    },
    {
      name: 'History',
      icon: Receipt,
      onClick: () => navigate('/history')
    },
    {
      name: 'Airtime',
      icon: Phone,
      onClick: () => navigate('/airtime')
    },
    {
      name: 'Internet',
      icon: Wifi,
      onClick: () => navigate('/data')
    },
    {
      name: 'TV',
      icon: Smartphone,
      special: true,
      onClick: () => toast({
        title: "TV Subscriptions",
        description: "TV subscription feature coming soon!"
      })
    },
    {
      name: 'Utilities',
      icon: Bolt,
      onClick: () => toast({
        title: "Utilities",
        description: "Utilities payment feature coming soon!"
      })
    }
  ];

  return actions;
};
