
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
  send: 'text-red-500 bg-red-100',
  receive: 'text-green-600 bg-green-100',
  bill: 'text-primary bg-primary/10',
  airtime: 'text-secondary bg-secondary/20',
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
    <div className={cn(
      "flex items-center p-4 border-b border-border/50 hover:bg-muted/30 transition-colors",
      compact && "py-3"
    )}>
      <div className={cn('p-3 mr-3 rounded-full flex items-center justify-center', colorClasses)}>
        <Icon size={compact ? 16 : 18} />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm truncate">{title}</div>
        <div className={cn(
          "text-xs text-muted-foreground flex items-center gap-1",
          compact && "hidden"
        )}>
          <span>{subtitle}</span>
          <span className="inline-block w-1 h-1 rounded-full bg-muted-foreground mx-1"></span>
          <span>{formattedDate}</span>
        </div>
        {compact && (
          <div className="text-xs text-muted-foreground">{formattedDate}</div>
        )}
      </div>
      
      <div className={cn('text-right', {
        'text-red-500': type === 'send',
        'text-green-600': type === 'receive',
      })}>
        <div className={cn("font-medium", compact ? "text-sm" : "text-base")}>
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
