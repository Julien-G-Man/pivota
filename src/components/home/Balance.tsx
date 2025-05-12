
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
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  });
  
  // Format as "15,000,000.00 FCFA" instead of "FCFA 15,000,000.00"
  const formattedBalance = `${formatter.format(balance)} ${currency}`;
  
  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white/90">Available Balance</span>
        </div>
        <button 
          onClick={() => setShowBalance(!showBalance)} 
          className="text-white/70 hover:text-white transition-colors"
        >
          {showBalance ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      
      <div className={`
        text-4xl font-bold text-white mt-2 w-full
        transition-all duration-300 
        ${!showBalance ? 'blur-md' : ''}
      `}>
        {showBalance ? formattedBalance : '••••••'}
      </div>
    </div>
  );
}
