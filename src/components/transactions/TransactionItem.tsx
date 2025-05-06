
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
  compact?: boolean;
}

const iconMap = {
  send: ArrowUp,
  receive: ArrowDown,
  bill: CreditCard,
  airtime: Calendar,
};

const typeColors = {
  send: 'text-primary bg-primary/10',
  receive: 'text-primary bg-primary/10',
  bill: 'text-primary bg-primary/10',
  airtime: 'text-primary bg-primary/10',
};

const statusColors = {
  completed: 'text-green-500',
  pending: 'text-amber-500',
  failed: 'text-red-500',
};

export default function TransactionItem({
  type,
  title,
  subtitle,
  amount,
  currency,
  date,
  status = 'completed',
  compact = false,
}: TransactionItemProps) {
  const Icon = iconMap[type];
  const colorClasses = typeColors[type];
  
  const formattedAmount = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  }).format(date);
  
  return (
    <div className="flex items-center p-4 bg-background hover:bg-muted/10 transition-colors">
      <div className={cn('p-3 mr-3 rounded-full flex items-center justify-center', colorClasses)}>
        <Icon size={compact ? 16 : 18} />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm truncate">{title}</div>
        <div className="text-xs text-muted-foreground">
          {formattedDate}
        </div>
      </div>
      
      <div className="text-right">
        <div className={cn("font-medium text-sm", {
          'text-black': type === 'send',
        })}>
          {type === 'send' ? '-' : ''}{currency}{formattedAmount}
        </div>
        <div className={cn('text-xs px-2 py-1 rounded-lg bg-green-100', 
          statusColors[status]
        )}>
          Successful
        </div>
      </div>
    </div>
  );
}
