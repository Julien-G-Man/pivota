
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BalanceProps {
  balance: number;
  currency: string;
  className?: string;
}

export default function Balance({ balance, currency, className }: BalanceProps) {
  const [showBalance, setShowBalance] = useState(true);
  
  const formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'narrowSymbol',
  });
  
  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className="text-sm text-primary/70 mb-1 font-medium">Available Balance</div>
      <div className="flex items-center gap-2">
        <div className={`text-4xl font-semibold text-primary transition-all duration-300 ${!showBalance && 'blur-md'}`}>
          {showBalance ? formatter.format(balance) : '••••••'}
        </div>
        <button 
          onClick={() => setShowBalance(!showBalance)} 
          className="text-primary/70 hover:text-primary transition-colors"
        >
          {showBalance ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}

