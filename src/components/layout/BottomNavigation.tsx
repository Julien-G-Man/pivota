
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, CreditCard, Wallet, History, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

const navigationItems: NavigationItem[] = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Pay', path: '/pay', icon: CreditCard },
  { name: 'Wallet', path: '/wallet', icon: Wallet },
  { name: 'History', path: '/history', icon: History },
  { name: 'Profile', path: '/profile', icon: User },
];

export default function BottomNavigation() {
  const [active, setActive] = useState('/');
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t py-2 px-4 flex justify-between items-center z-50">
      {navigationItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={cn('nav-item', active === item.path && 'active')}
          onClick={() => setActive(item.path)}
        >
          <item.icon size={24} />
          <span className="text-xs">{item.name}</span>
        </Link>
      ))}
    </div>
  );
}
