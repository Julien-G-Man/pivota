
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
      <div className="text-sm text-white/80 mb-2 font-medium tracking-wider">
        Available Balance
      </div>
      <div className="flex items-center gap-3">
        <div className={`
          text-4xl font-bold text-white 
          transition-all duration-300 
          ${!showBalance ? 'blur-md' : ''}
        `}>
          {showBalance ? formatter.format(balance) : '••••••'}
        </div>
        <button 
          onClick={() => setShowBalance(!showBalance)} 
          className="text-white/70 hover:text-white/90 transition-colors"
        >
          {showBalance ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
  );
}
