
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Award, BarChart, CreditCard, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

const navigationItems: NavigationItem[] = [
  { name: 'Home', path: '/home', icon: Home },
  { name: 'Rewards', path: '/rewards', icon: Award },
  { name: 'Finance', path: '/finance', icon: BarChart },
  { name: 'Cards', path: '/cards', icon: CreditCard },
  { name: 'Me', path: '/profile', icon: User },
];

export default function BottomNavigation() {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  
  // Update the active tab when the route changes
  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t py-2 px-4 flex justify-between items-center z-50">
      {navigationItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={cn(
            'flex flex-col items-center text-sm',
            active === item.path ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          <item.icon size={24} />
          <span className="text-xs">{item.name}</span>
        </Link>
      ))}
    </div>
  );
}
