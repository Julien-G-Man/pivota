
import { ArrowUp, ArrowDown, Calendar, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

export type TransactionType = 'send' | 'receive' | 'bill' | 'airtime';

interface TransactionItemProps {
  id: string;
  type: TransactionType;
  title: string;
  subtitle: string;
  amount: number;
  currency: string;
  date: Date;
  status?: 'completed' | 'pending' | 'failed';
}

const iconMap = {
  send: ArrowUp,
  receive: ArrowDown,
  bill: CreditCard,
  airtime: Calendar,
};

const typeColors = {
  send: 'text-red-500 bg-red-100',
  receive: 'text-green-600 bg-green-100',
  bill: 'text-pivota-purple bg-pivota-purple-light/20',
  airtime: 'text-pivota-orange bg-pivota-orange/20',
};

export default function TransactionItem({
  type,
  title,
  subtitle,
  amount,
  currency,
  date,
  status = 'completed',
}: TransactionItemProps) {
  const Icon = iconMap[type];
  const colorClasses = typeColors[type];
  
  const formattedAmount = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
  }).format(amount);
  
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);
  
  return (
    <div className="flex items-center p-3 rounded-lg hover:bg-muted/50 transition-colors">
      <div className={cn('p-3 mr-3 rounded-full flex items-center justify-center', colorClasses)}>
        <Icon size={18} />
      </div>
      
      <div className="flex-1">
        <div className="font-medium">{title}</div>
        <div className="text-xs text-muted-foreground">{subtitle}</div>
        <div className="text-xs text-muted-foreground">{formattedDate}</div>
      </div>
      
      <div className={cn('text-right', type === 'send' ? 'text-red-500' : 'text-green-600')}>
        <div className="font-medium">
          {type === 'send' ? '-' : '+'}{formattedAmount}
        </div>
        <div className={cn('text-xs', {
          'text-green-600': status === 'completed',
          'text-amber-500': status === 'pending',
          'text-red-500': status === 'failed',
        })}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      </div>
    </div>
  );
}
